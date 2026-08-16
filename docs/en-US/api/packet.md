---
title: Packet
---

A Packet wraps the data that flows through a graph.

Packets are the unit of communication in FBPX: they travel over links from the output ports of one node to the input ports of another. The packet tracks its own type, ownership, history and metadata.

The packet is always owned by exactly one owner at a time. In order to read or write a packet, the owner must identify itself by passing itself as the first argument to any of the methods.

### Creating a packet

```
const Packet = require('@fbpx/flow').Packet

const p = new Packet('Hello World!')
const q = Packet.create({greeting: 'Hello'}, 'object')
```

`new Packet(data, type, n, c, pp)`:

| Argument | Description |
|----------|-------------|
| `data`   | The data to wrap in the packet |
| `type`   | Packet type; when omitted it is derived from the data using `typeof` |
| `n`      | Packet number; defaults to an auto-incrementing counter |
| `c`      | Clone version number |
| `pp`     | JSON pointer path; defaults to `/.` |

`Packet.create(...)` is a factory method with the same signature.

### Reading and writing

The packet's `data` property is protected — accessing it directly throws an error. Data is accessed through the packet API instead:

```
p.read()          // returns the packet data
p.write(owner, 'new value')  // sets the packet data
```

`read()` and `write()` are ownership-gated: if the packet has an owner, only that owner may read or write it.

### Ownership

Packets are passed between nodes, and ownership moves along with them.

```
p.setOwner(node)   // transfer ownership
p.isOwner(node)    // true if node owns the packet
p.hasOwner()       // true if the packet has an owner
p.release()        // release ownership
```

### Pointers

A packet carries a JSON pointer (`pointerPath`, default `/.`). The pointer allows navigating into nested data without extracting the whole packet:

```
p.point(owner, '/address/city')
p.read()            // reads only the data at the pointer path
```

A pointer that does not start with a slash is resolved relative to the current position; an empty pointer refers to the root.

### Metadata

Packets can carry namespaced metadata:

```
p.meta('ns', 'key', value)  // set
p.meta('ns', 'key')         // get
p.hasMeta('ns', 'key')      // check
p.removeMeta('ns', 'key')   // remove
```

### Types

`PacketType` is a `string` or an object keyed by port name. The type defaults to the JavaScript `typeof` of the wrapped data (`string`, `number`, `boolean`, `object`, `array`, etc.), and can be overridden when creating a packet or via `write()`.

### Serialization

```
p.toJSON()   // packet data at the current pointer
p.export()   // plain object including all metadata
p.dump()     // JSON string representation
```

### Other properties

| Property     | Description |
|--------------|-------------|
| `type`       | Current packet type |
| `nr`         | Unique packet number |
| `c`          | Clone version counter |
| `pointerPath`| JSON pointer path |
| `trail`      | Ownership history |
| `created_at` | Creation timestamp |
| `updated_at` | Last write timestamp |
