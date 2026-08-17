---
title: Intro
---

# FBPX

FBPX is a flow-based programming toolkit for the JavaScript ecosystem. Instead of writing an application as a sequence of statements, you describe it as a **graph**: a set of nodes — small, reusable pieces of functionality — wired together by links over which data packets flow.

The whole graph lives in a plain-text `.fbp` file, so your architecture is versioned, reviewed, and diffed like any other source code.

## What it looks like

The smallest useful flow reads like this:

```
provider ./{ns}.{name}.yml

'Hello World!' -> msg Log(console/log)
```

One node — `Log`, of kind `console/log` — receives a single packet (`Hello World!`) on its `msg` port and logs it.

The same idea at slightly larger scale: the [`hello_world` example](/docs/examples/hello_world) on this site parses a live RSS feed, logs every headline, and reads each one aloud.

```
provider ./{ns}.{name}.yml

"http://rss.cnn.com/rss/edition_world.rss" -> url Rss(network/rss)

Rss out -> msg Log(console/log) out -> msg SayIt(console/say)
```

## The pieces

**Nodes** are the building blocks. A node definition is a YAML file that declares its input and output ports plus the function that runs when data arrives. Nodes are resolved by a `provider` line — either from local files or from a remote registry:

- `provider ./{ns}.{name}.yml` — resolve nodes from local YAML files
- `provider https://api.fbpx.io/v1/nodes/{user}/{ns}/{name}` — resolve nodes from the registry

**Links** connect one node's output port to another node's input port: `Rss out -> msg Log`.

**Input (IIP)** is a literal value fed directly into a port: `'Hello World!' -> msg Log`. Prepending `@` to the port — `'Hello World!' -> @msg Log` — turns the input into *context*, stored inside the flow definition itself so it travels with the flow.

## The graph is executable

The graph is not just a diagram. A single runtime, [`@fbpx/flow`](/docs/api), executes the same `.fbp` file on the command line, inside a server, or in a browser — and the CLI covers the whole lifecycle around it:

- [`fbpx run`](/docs/fbpx/run) — execute a flow
- [`fbpx graph`](/docs/fbpx/graph) — render a flow as a dot graph
- [`fbpx convert`](/docs/fbpx/convert) — inspect the parsed graph
- [`fbpx install`](/docs/fbpx/install) — install node dependencies
- [`fbpx deploy`](/docs/fbpx/deploy) — publish a flow to the registry
- [`fbpx serve`](/docs/fbpx/serve) — expose a flow over the FBP protocol

Because nodes are just npm packages behind a small protocol, the entire npm ecosystem is available as a component library. The heavy lifting of a flow is usually done by existing packages — wrapped in a thin node definition and composed into a graph.

## Get started

FBPX is in active development; expect the surface to move as the ecosystem matures.

- [Install the CLI](/docs/intro/installation)
- [Write your first flow](/docs/intro/getting_started)
- Browse the [CLI reference](/docs/fbpx), the [flow API](/docs/api), and the [examples](/docs/examples)
