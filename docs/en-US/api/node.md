---
title: Node
---

# Node Functions

There are several ways of defining the functionality within the node.

These functions are very convenient in many cases, they are however also limited.
If orchestration between ports becomes important, you should use the class variant.

e.g. if the node will only require some settings and one main input port, the function type is convenient.

The function runs, executes and is ready for the next call.

### The injected namespace

The `fn` body is evaluated in a sandbox that provides the following variables:

| Variable | Description |
|----------|-------------|
| `$`      | The Packet API and current input data: `$.msg` refers to the packet arriving at the `msg` port, `$.get('port')` reads a port, `$.create(value)` wraps a value in a packet |
| `output` | An object that is populated with output values |
| `cb`     | Callback that sends output packets: `cb({ out: packet })` |
| `on`     | Event handling, e.g. `on.input.in = () => { ... }` for port boxes |
| `state`  | Shared node state |

### Just the function body

This is the easiest form, you assign the port output to the `output` variable.

```
output = {
  in: $.create('My Result')
}
```

### output as a function

```
output = () => {

  cb({
    out: $.create('My Result')
  })
}
```

### Port Boxes

```
on.input.in = () => {
  output({
    out: $.create('My Result')
  })
}
```

These port functions can also be defined within the port definition itself, e.g.
```
ports:
  input:
    in:
      type: string
      fn: |
        output({
          out: $.create('My Result')
        })
```

### Dependencies

Dependencies declared under `dependencies.npm` are available inside the `fn` body by their name, converted to an underscored string if necessary. `rss-parser` becomes `rss_parser`, `say` stays `say`.

```
dependencies:
  npm:
    say: 'latest'
fn: 'say.speak($.msg)'
```

### The class variant

When orchestration between ports becomes important — coordinating multiple inputs or running longer-lived logic — a node can be defined as a class instead of a function. The class extends the node base class and implements its lifecycle:

```
start()     // called when the node starts
hold()      // called when input is pending
release()   // called when the node releases control
complete()  // called when processing completes
```
