---
title: Hello World
---

The `hello_world` project is the flow shown on the homepage. It reads a live news feed, logs every headline, and reads each one aloud.

The complete project ships in this repository and can be copied and run as-is:

- [`hello_world.fbp`](/examples/hello_world/hello_world.fbp) — the flow definition
- `console.log.yml`, `console.say.yml`, `network.rss.yml` — the node definitions
- `package.json` — declares the npm dependencies (`rss-parser`, `say`, `request`)

## The flow

```
provider ./{ns}.{name}.yml

"http://rss.cnn.com/rss/edition_world.rss" -> url Rss(network/rss)

Rss out -> msg Log(console/log) out -> msg SayIt(console/say)
```

Three nodes are connected in a chain.

### Rss(network/rss)

Receives a feed URL on its `url` port. Its `fn` uses the `rss-parser` package to fetch and parse the feed, then emits one packet through its `out` port per item — first the feed title, then the title of every headline.

### Log(console/log)

Logs whatever arrives on its `msg` port to the console, then forwards the packet on its `out` port. This is the node every flow uses to see what is happening.

### SayIt(console/say)

The same message is spoken aloud with the `say` package, so you can hear the news rather than just read it.

## Run it

From inside the project directory:

```
$ npm install
$ fbpx install hello_world.fbp
$ fbpx run hello_world.fbp
```

The `SayIt` node needs a text-to-speech engine on the host. On Ubuntu:

```
$ apt install festival
```

## Inspect it

```
$ fbpx convert hello_world.fbp --yaml
$ fbpx graph hello_world.fbp | dot -Tsvg > hello_world.svg
```
