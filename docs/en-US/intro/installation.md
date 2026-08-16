---
title: Installation
---

The main command line tool for FBPX is `fbpx`, you can install it using npm.


```
$ npm i @fbpx/cli -g
```

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
