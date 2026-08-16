---
title: Express
---

Example of running an express webserver and serving some routes.

```
title: Express Server
ns: express
name: example

provider https://api.fbpx.io/v1/nodes/rhalff/{ns}/{name}

Express(express/app), Listen(express/listen)
HomeRoute(express/get), SendHome(express/send)
AboutRoute(express/get), SendAbout(express/send)

'8080' -> port Listen
Express app -> app Listen

'/' -> path HomeRoute
Express app -> app HomeRoute
HomeRoute res -> res SendHome
'Home' -> ^body SendHome

'/about' -> path AboutRoute
Express app -> app AboutRoute
AboutRoute res -> res SendAbout
'About' -> ^body SendAbout
```
