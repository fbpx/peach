---
title: Deploy
---

Use deploy to send the nodes to the api hosted at `https://api.fbpx.io`

Each deploy will create a new release.

Given you are within a project directory:

```
$ DEBUG=* fbpx deploy --verbose
  superagent PUT https://api.fbpx.io/v1/projects/rhalff +0ms
  superagent PUT https://api.fbpx.io/v1/projects/rhalff -> 200 +1s
info Project twitter updated successfully.  
```

This will have deployed the latest code which is then accessible through the api.

The git backed storage will have tagged a new release automatically.

Deployed nodes will be accessible from flow files by their provider url:

e.g.
```
provider https://api.fbpx.io/v1/nodes/rhalff/{ns}/{name}
```
