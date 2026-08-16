---
title: Link
---

A Link represents a connection between two nodes: it transports packets from an output port of one node to an input port of another.

Links are created from the plain link objects that appear in the flow model. In a flow definition, a link is written as a `source` and `target` pair:

```yaml
links:
  - source:
      id: Request
      port: request
    target:
      id: EndRequest
      port: request
    metadata:
      title: Request request -> request EndRequest
```

### Creating a link

```
const Link = require('@fbpx/flow').Link

const link = Link.create({
  source: {id: 'Request', port: 'request'},
  target: {id: 'EndRequest', port: 'request'}
})
```

`Link.create(linkDefinition)` builds a `Link` instance from a plain definition. `source` and `target` default to empty objects when omitted, and `build()` validates the definition (`validate.link`) before wiring it up.

### Source and target

A link has two `Connector` endpoints, exposed as `link.source` and `link.target`. Each connector is wired to a node id and a port:

```
link.setSource(sourceId, port, settings, action)
link.setTarget(targetId, port, settings, action)
link.setSourcePid(pid)
link.setTargetPid(pid)
```

Settings passed along configure the connector (e.g. an indexed port setting such as `index`). Port indexes are expressed through settings in the definition:

```yaml
links:
  - source:
      id: EndRequest
      port: res
      setting:
        index: text
    target:
      id: Log
      port: msg
```

### Metadata

```
link.setMetadata(metadata)   // replace all metadata
link.setMeta(key, val)       // set a single item
link.setTitle(title)         // set the 'title' metadata item
link.hasMetadata()           // true if metadata exists
```

### Tracking

Each link counts the packets that flow over it:

| Property | Description |
|----------|-------------|
| `fills`  | Number of packets received |
| `writes` | Number of packets sent |
| `data`   | Data packet currently on the link |

`link.clear()` resets the counters.

### Serialization

```
link.toJSON()
```

`toJSON()` returns a plain object with the link `id`, `source`, `target`, optional `metadata`, `fills`, `writes`, and `data`.
