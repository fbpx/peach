---
title: Serve 
---

The serve command will start a fbpx nodejs runtime, with or without a pre-existing graph.

This runtime is compatible with the fbp protocol.

Below you'll find all current options:

```
$ fbpx serve --help

  Usage: serve [options] <file>

  Options:

    -t, --type [name]                 Runtime type fbpx, noflo-nodejs (default: fbpx-nodejs)
    -c, --cache                       cache components
    -x, --compat                      stay compatible with noflo format
    -y, --proxy                       expose /proxy to proxy requests to e.g. a browser
    -r, --proxy-server [runtime-url]  proxy nodejs runtime
    -s, --secure                      secure wss or ws
    -n, --start                       start graph immediately (now)
    -u, --uppercase                   force ports uppercase
    -h, --host [name]                 hostname
    -p, --port [name]                 port
    -I, --no-ids                      do not use uuids
    -b, --bail                        bail on errors
    -i, --interface [name]            choose a webserver interface
    -l, --loader [loader]             loader `remote` or `npm` (default: npm)
    -L, --loglevel [level]            Log level
    -f, --flowhub                     ping flowhub
    -v, --verbose                     verbose output
    -h, --help                        output usage information

```

If you specify an .fbp file on the command line the runtime will serve the graph as it's main one.

The started runtime however is not limited to running just one main graph there can be several.

Once the runtime has started it will be inspectable using the fbp protocol, this is accessible through the websocket clients.

### Clients

When a the runtime is up and running, the graphs of the runtime can be connected to by any client understanding the fbp protocol.

Currently these are
 - fbpx cli using the `runtime` action
 - https://fbpx.io
 - https://app.flowhub.com

