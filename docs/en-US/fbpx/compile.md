---
title: Compile
---

The compile action is meant to be run from a project directory.

It takes all flows and nodes defined in the project and reduces it to a single `x.json` file.

It also creates `.js` files for each node and flow, ensuring the package can be installed as a proper npm package also.

An example project structure looks like:
```
.
├── graphs
│   └── twitter.fbp
├── LICENSE
├── nodes
│   ├── api
│   │   ├── node.js
│   │   └── node.json
│   ├── onData
│   │   ├── node.js
│   │   └── node.json
│   ├── search
│   │   ├── node.js
│   │   └── node.json
│   ├── statusesFilter
│   │   ├── node.js
│   │   └── node.json
│   ├── statusesSample
│   │   ├── node.js
│   │   └── node.json
│   ├── statusus
│   │   └── sample
│   │       ├── node.js
│   │       └── node.json
│   ├── stream
│   │   ├── node.js
│   │   └── node.json
│   ├── updateStatus
│   │   ├── node.js
│   │   └── node.json
│   ├── user
│   │   ├── node.js
│   │   └── node.json
│   └── verifyCredentials
│       ├── node.js
│       └── node.json
├── package.json
├── README.md
├── test
│   └── nodes.yaml
└── x.json
```

After running `compile` the project can be deployed using [fbpx deploy](https://docs.fbpx.io/docs/fbpx/deploy)
