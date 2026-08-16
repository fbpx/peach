---
title: FBPX
---

FBPX is the main command line program of the FBPX ecosystem.

The following commands are available:

- [login](/docs/fbpx/login)
- [run](/docs/fbpx/run)
- [serve](/docs/fbpx/serve)
- [graph](/docs/fbpx/graph)
- [input](/docs/fbpx/input)
- [deps](/docs/fbpx/deps)
- [tokens](/docs/fbpx/tokens)
- [list/info](/docs/fbpx/list)
- [convert](/docs/fbpx/convert)
- [compile](/docs/fbpx/compile)
- [install](/docs/fbpx/install)
- [browserify](/docs/fbpx/browserify)
- [deploy](/docs/fbpx/deploy)

Other actions are available through `runtime`, `flowhub`, `cert`, and `config`.


```
 $ fbpx --help

  Usage: fbpx [options] [file ...]

  Options:

    -v, --verbose        verbose output
    -C, --nocache        do not read/write cache
    -P, --purge          purge cache file
    -l, --log [level]    log [level]
    -V, --version        output the version number
    -h, --help           output usage information

  Commands:

    run|r [file]            Run graph
    graph|g [file]          Show Graph
    input                   Show input data
    login                   Login to api.fbpx.io to set token
    deps                    Show dependencies
    deploy                  Deploy nodes to api.
    tokens                  Debug lexer tokens
    list|info               List available nodes
    compile                 Compile nodes
    convert|c [file]        Convert file
    install|i [file]        Load node definitions & install requirements
    browserify|brsf [file]  Create a browserified bundle
    flowhub                 Interact with flowhub
    runtime                 Manage registered runtimes
    cert                    Create and list SSL certificates
    config                  Show configuration
    serve [file]            Start an FBPX runtime
```
