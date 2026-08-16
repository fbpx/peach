---
title: Browserify
---

[Browserifies](http://browserify.org/) the flow file.

The generated bundle can be included from the browser and executes the flow.


Prior to using this command make sure you're around a package.json file.

```
$ fbpx browserify test.fbp
ERR! fbpx browserify requires @fbpx/flow to be installed.
        Run npm install @fbpx/flow --save-dev to do so
```

Run `npm install @fbpx/flow` so browserify will know where to find it.

