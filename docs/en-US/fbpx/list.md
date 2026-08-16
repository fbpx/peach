---
title: List / Info
---

Search for available node definitions.

Without any arguments will show all available nodes:
```
$ fbpx list | more

 canvas/beginPath

┌──────────────┬───────────────────────────────────┐
│ Begin Path   │ "Begin path"                      │
├──────────────┼───────────────────────────────────┤
│ Input Ports  │ <CanvasRenderingContext2D>context │
├──────────────┼───────────────────────────────────┤
│ Output Ports │ <CanvasRenderingContext2D>context │
└──────────────┴───────────────────────────────────┘


 canvas/clearRect

┌─────────────────┬────────────────────────────────────────────────────────────────────────────────────────┐
│ Clear Rectangle │ "Sets all pixels in the rectangle defin…                                               │
├─────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
│ Input Ports     │ <CanvasRenderingContext2D>context, <number>x, <number>y, <number>width, <number>height │
├─────────────────┼────────────────────────────────────────────────────────────────────────────────────────┤
│ Output Ports    │ <CanvasRenderingContext2D>context                                                      │
└─────────────────┴────────────────────────────────────────────────────────────────────────────────────────┘


 canvas/clip

┌──────────────┬───────────────────────────────────┐
│ Clip         │ "Clip"                            │
├──────────────┼───────────────────────────────────┤
│ Input Ports  │ <CanvasRenderingContext2D>context │
├──────────────┼───────────────────────────────────┤
│ Output Ports │ <CanvasRenderingContext2D>context │
└──────────────┴───────────────────────────────────┘

 ...

```

It's also possible to only search by provider, or directly target a specific node.
