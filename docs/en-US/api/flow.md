---
title: Flow
---

A Flow is the runtime representation of a graph: it owns the nodes, the links between them, the initial information packets (IIPs) and the state of execution.

The Flow class is built from a `FlowDefinition`, which is the same model used by the flow files themselves:

```yaml
type: flow
nodes:
  - id: Log
    title: Log
    ns: console
    name: log
links:
  - source:
      id: Request
      port: request
    target:
      id: EndRequest
      port: request
providers:
  '@':
    path: './{ns}.{name}.yml'
```

### Creating a flow

```
const Flow = require('@fbpx/flow').Flow

const flow = await Flow.create('my-flow', flowDefinition)
```

### Nodes, links and IIPs

```
flow.addNode(node, nodeDefinition)
flow.removeNode(nodeId)

flow.addLink(link)
flow.removeLink(link)

flow.createIIP(iipDefinition)   // create an IIP
flow.connectIIP(iip)            // connect it to a port
flow.sendIIPs(iipDefinitions)   // create and connect a set of IIPs
flow.clearIIP(iip)
```

### Execution

```
flow.run()      // run the graph
flow.stop()     // stop execution
flow.reset()    // reset counters and state
```

A flow is either `active` (running) or stopped. `runCount` tracks how many times the flow has run.

### Ports

A flow exposes external ports in the same way a node does:

| Property   | Description |
|------------|-------------|
| `inPorts`  | Names of the input ports |
| `outPorts` | Names of the output ports |
| `filled`   | Number of input ports that are filled |
| `ports`    | `{input: {...}, output: {...}}` port objects |

Ports can be added and removed at runtime with `addPort` and `removePort`.
