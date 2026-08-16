---
title: Run
---

Run the graph.

example.fbp
```
title: Example flow

provider https://api.fbpx.io/v1/nodes/rhalff/{ns}/{name}

Request(superagent/api)
EndRequest(superagent/end)

'http://example.com' -> url Request

Request request -> request EndRequest
EndRequest res [text] -> msg Log(console/log)
```


```
$ fbpx run test.fbp
<!doctype html>
<html>
<head>
    <title>Example Domain</title>
    ...
```

### Debug

Using the DEBUG environment variable, you'll see a lot of debugging information:
```
$ DEBUG=* fbpx run test.fbp
```

Under the hood `@fbpx/flow` is using the [debug](https://www.npmjs.com/package/debug) package.
Which makes it possible to select what kind of debug messages you want to see.

Some of the more common namespaces are:

- fbpx:io
- fbpx:inputPort
- fbpx:connector
- fbpx:pm
- fbpx:packet
- fbpx:actor
- fbpx:node
- fbpx:outputPort


 It's also possible to run with `--debug` flag. This will print a report after execution or when you manually stop the flow using `^C`:
 
```
Node:
┌────────────┬─────────┬──────┬─────────┬────────┬──────────┬──────────────┐
│ Identifier │ ns      │ name │ status  │ filled │ RunCount │ Output count │
├────────────┼─────────┼──────┼─────────┼────────┼──────────┼──────────────┤
│ Log        │ console │ log  │ running │ 0      │ 1        │ 0            │
└────────────┴─────────┴──────┴─────────┴────────┴──────────┴──────────────┘
Ports:
┌──────┬───────┬───────┬─────────┬─────────┬─────────┬─────────┬───────┬───────┬──────────┬─────────────┐
│ name │ async │ state │ indexed │ default │ context │ persist │ fills │ reads │ RunCount │ connections │
├──────┼───────┼───────┼─────────┼─────────┼─────────┼─────────┼───────┼───────┼──────────┼─────────────┤
│ msg  │ true  │ open  │ false   │         │         │ false   │ 1     │ 1     │ 1        │ 1           │
└──────┴───────┴───────┴─────────┴─────────┴─────────┴─────────┴───────┴───────┴──────────┴─────────────┘

Node:
┌────────────┬────────────┬──────┬─────────┬────────┬──────────┬──────────────┐
│ Identifier │ ns         │ name │ status  │ filled │ RunCount │ Output count │
├────────────┼────────────┼──────┼─────────┼────────┼──────────┼──────────────┤
│ EndRequest │ superagent │ end  │ running │ 0      │ 1        │ 0            │
└────────────┴────────────┴──────┴─────────┴────────┴──────────┴──────────────┘
Ports:
┌─────────┬───────┬───────┬─────────┬─────────┬─────────┬─────────┬───────┬───────┬──────────┬─────────────┐
│ name    │ async │ state │ indexed │ default │ context │ persist │ fills │ reads │ RunCount │ connections │
├─────────┼───────┼───────┼─────────┼─────────┼─────────┼─────────┼───────┼───────┼──────────┼─────────────┤
│ request │ false │ open  │ false   │         │         │ false   │ 1     │ 1     │ 0        │ 1           │
└─────────┴───────┴───────┴─────────┴─────────┴─────────┴─────────┴───────┴───────┴──────────┴─────────────┘

Node:
┌────────────┬────────────┬──────┬─────────┬────────┬──────────┬──────────────┐
│ Identifier │ ns         │ name │ status  │ filled │ RunCount │ Output count │
├────────────┼────────────┼──────┼─────────┼────────┼──────────┼──────────────┤
│ Request    │ superagent │ api  │ running │ 2      │ 1        │ 0            │
└────────────┴────────────┴──────┴─────────┴────────┴──────────┴──────────────┘
 
```
