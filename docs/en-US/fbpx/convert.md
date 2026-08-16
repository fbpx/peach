---
title: Convert
---

# Convert/Inspect

Convert the flow file into different formats.

```
$ fbpx convert --help

  Usage: convert|c [options]

  Convert file

  Options:

    -j, --json   JSON Format
    -y, --yaml   YAML Format
    -b, --bare   Do not validate
    -u, --uuid   generate uuids
    -n, --noflo  show JSON (noflo)
    -h, --help   output usage information
```

Yaml:
```
$ fbpx convert test.fbp -y
type: flow
nodes:
  - id: Request
    title: Request
    ns: superagent
    name: api
  - id: EndRequest
    title: EndRequest
    ns: superagent
    name: end
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
    metadata:
      title: Request request -> request EndRequest
  - source:
      id: EndRequest
      port: res
      setting:
        index: text
    target:
      id: Log
      port: msg
    metadata:
      title: EndRequest res -> msg Log
title: Example flow!
providers:
  '@':
    url: 'https://api.fbpx.io/v1/nodes/rhalff/{ns}/{name}'
```
