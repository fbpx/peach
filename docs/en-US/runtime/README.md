---
title: FBPX Runtime
---

Runtime to be used with the noflo fbp protocol:

http://noflojs.org/documentation/protocol/

Installation:

```
npm install
```

Test:
```
npm test
```

Usage:
```
 Usage: fbpx-server [options] <file ...>

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    -t, --type [name]           Runtime type fbpx, noflo-nodejs (default: fbpx-nodejs)
    -c, --cache                 cache components
    -x, --compat                stay compatible with noflo format
    -p, --proxy                 expose /proxy to proxy requests to e.g. a browser
    -r, --proxy-server [url]    proxy nodejs runtime
    -s, --secure                secure wss or ws
    -S, --secret                secret to be send with each request to the runtime
    -n, --start                 start graph immediately (now)
    -u, --uppercase             force ports uppercase
    -h, --host [name]           hostname
    -p, --port [name]           port
    -I, --no-ids                do not use uuids
    -b, --bail                  bail on errors
    -i, --interface [name]      choose a webserver interface
    -l, --loader [loader]       loader `remote` or `npm` (default: npm)
    -L, --loglevel [level]      Log level
    -f, --flowhub               ping flowhub
    -v, --verbose               verbose output
    -C, --create-cert           Create SSL certificate for websocket host.
```


