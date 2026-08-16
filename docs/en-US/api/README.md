---
title: API
---

The API reference covers the `@fbpx/flow` runtime, which is the engine that executes FBPX flows. It documents the core data structures that make up a running graph.

- [Node](/docs/api/node) — defining node functionality
- [Port](/docs/api/port) — input and output ports, the port schema, and port events
- [Packet](/docs/api/packet) — the unit of data that flows through a graph
- [Link](/docs/api/link) — connections between nodes
- [Flow](/docs/api/flow) — the runtime representation of a graph

The runtime is available from npm as `@fbpx/flow`:

```
const {Flow, Link, Packet, InputPort, OutputPort} = require('@fbpx/flow')
```
