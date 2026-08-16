---
title: Getting Started
---

Let's create our first FBPX project!

After you've installed the fbpx cli, you can test it by writing your first .fbp file.

Open a blank file with an .fbp extension. e.g. `hello_world.fbp`

```
provider ./{ns}.{name}.yml

'Hello World!' -> msg Log(console/log)
```

Save the file and close it.

We have now defined a flow which will receive a `Hello World!` message on it's `msg` port.

The provider is mandatory and specifies how to resolve the nodes we are using within our flow definition.

Before running it we can inspect the flow to see what we have defined:
```
$ fbpx convert hello_world.fbp --yaml
type: flow
nodes:
  - id: Log
    title: Log
    ns: console
    name: log
links: []
providers:
  '@':
    path: './{ns}.{name}.yml'

```

We have defined one node and do not have any links yet.
The `@` indicates the default provider for this flow file is `{ns}.{name}.yml`

The input we have defined in the flow definition is not present, this is by intention.
You can verify whether the input is actually detected by running:
```
 $ fbpx input hello_world.fbp 

 Input Data

┌────────────────┬──────┬─────────┐
│ Data           │ Port │ Process │
├────────────────┼──────┼─────────┤
│ "Hello World!" │ msg  │ Log     │
└────────────────┴──────┴─────────┘
```

So now try running the flow:
```
$ fbpx run hello_world.fbp 
ENOENT: no such file or directory, open './console.log.yml'
```

This is kind of expected, we have specified how to resolve the nodes, but did not create a node definition file yet.

So let's create it:
console.log.yml
```
title: My Console Log Node
ns: console
name: log
ports:
  input:
    msg:
      type: string
fn: "console.log($.msg)"
```
The `ns` and `name` pair are mandatory and must match what was specified in the provider uri.

The ports describe what input we expect.

`fn` contains the function body of which the contents will be evaluated.

The '$' namespace contains the `Packet` api and gives access to the current input data. 
In this case we directly refer to the contents of packet arriving at the `msg` port and log it's contents.

Having created our node definition, the flow can now be executed.

```bash
$ fbpx run hello_world.fbp 
Hello World!
```

### Creating Links

In order to create something more interesting let's add some more nodes.

FBPX is all about utilizing the vast amount of JavaScript packages already available on the internet.

It's main concept is not to write code, but using existing functionality and wrapping it in such a way the packages can be composed into graphs.

So let's pick an interesting package from npm. e.g. https://www.npmjs.com/package/say
Instead of just logging `Hello World!` it would be nice to actually hear it.

In order to use packages, we first must have a `package.json` file as `fbpx` will expect it to be present and store the dependencies.

You can create one by executing `npm init -y` inside your project directory.
```
$ npm init -y
```

We can either directly install the package through npm or use `fbpx install hello_world.fbp' to install all the dependencies used by the nodes defined in the flow file.

Create a new file following our provider's resolve pattern (`./{ns}.{name}.yml`) to contain our `Say.js` node definition.

console.say.yml
```
title: Say.js
ns: console
name: say
ports:
  input:
    msg:
      type: string
dependencies:
  npm:
    say: 'latest'
fn: 'say.speak($.msg)'
```

We now have declared a dependencies of the type 'npm'.
All dependencies will be available by their name, and converted to an underscored string if necessary.

Having defined our say component, let's add it to our flow definition:
```
provider ./{ns}.{name}.yml

'Hello World!' -> msg SayIt(console/say)

```

First make sure we have installed the dependencies by running:
```
fbpx install hello_world.fbp 
+ say@0.15.0
added 2 packages from 2 contributors and audited 2 packages in 1.134s
found 0 vulnerabilities
```
Note: In able to run say.js festival must be installed. On ubuntu this is as easy as running `apt install festival`

Now run the flow file again:
```
$ fbpx run hello_world.fbp 
```

If all went well you'll hear `Hello World!`

### Using context

Instead of specifying input in the flow definition file, we can very easily convert it to context which will be stored within the flow:
```
provider ./{ns}.{name}.yml

'Hello World!' -> @msg Log(console/log)
```
All that has to be done is prepending an `@` to the port.

```
$ fbpx input hello_world.fbp 

 Input Data

┌──────┬──────┬─────────┐
│ Data │ Port │ Process │
└──────┴──────┴─────────┘

```
The input data is now empty.

Instead the context is now specified within the flow:
```
$ fbpx convert hello_world.fbp --yaml
type: flow
nodes:
  - id: SayIt
    title: SayIt
    ns: console
    name: say
    context:
      msg: Hello World!
links: []
providers:
  '@':
    path: './{ns}.{name}.yml'

```
So when this definition is distributed it will contain the desired context.

In this case the node will automatically run, because the input of the port is fulfilled by this context. (try running the flow again).


### Making a request

Let's make a request to fetch data, in order to do this we would need a request library and a target url.
In this case we'll load a news feed from cnn: http://rss.cnn.com/rss/edition_world.rss

So instead of a hello world, the headlines are read to us.


```
title: Request
ns: network
name: request
ports:
  input:
    method:
      type: string
      default: GET
      enum:
        - POST
        - GET
    data:
      type: object
      required: false
    uri:
      type: string
  output:
    out:
      type: any
dependencies:
  npm:
    request: latest
fn: |
  output = () => {
    request({
      method: $.method,
      uri: $.uri
    }, ({ body }) => {
      output({
        out: $.create(body)
      })
    })
  }
```


