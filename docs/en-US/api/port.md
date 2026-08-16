---
title: Port
---

Ports are the input and output endpoints of a node. Input ports receive packets, output ports send them. In a node definition, ports are declared under `ports.input` and `ports.output`:

```yaml
title: My Console Log Node
ns: console
name: log
ports:
  input:
    msg:
      type: string
  output:
    out:
      type: string
fn: |
  output = () => {
    console.log($.msg)
    cb({ out: $.get('msg') })
  }
```

### Port schema

Each port follows the JSON Schema-based `Port` model. Common properties:

| Property      | Description |
|---------------|-------------|
| `type`        | Data type: `string`, `number`, `boolean`, `array`, `object`, `any`, `function` (required) |
| `required`    | Whether the port must be filled (`false` makes it optional) |
| `default`     | Default value used when no data arrives |
| `context`     | Initial value stored in the node |
| `persist`     | Keep the last value so `read()` can be called again |
| `title`       | Display name |
| `description` | Port description |
| `enum`        | Allowed values |

Any standard JSON Schema constraint (`minimum`, `maximum`, `pattern`, `minLength`, `items`, `properties`, …) can also be used for validation.

### InputPort

Created for each port in `ports.input`. Packets arriving over connected links are queued on the port.

```
port.fill(packet)     // push a packet onto the queue
port.read()           // shift and return the first packet (increments reads)
port.peek()           // look at the first packet without consuming it
port.isFilled()       // whether data is available
```

`read()` returns a `Packet`; it throws when the queue is empty and the port has no `context`, `default`, or `persist` to fall back on. `isFilled()` returns one of the port states (`EMPTY`, `FILLED`, `PERSIST`, `DIRECT`, `CONTEXT`, `DEFAULT`, `NOT_REQUIRED`).

Context, default and persist:

```
port.setContext(value)   // set the initial/context value
port.clearContext()
port.setDefault(value)
port.clearDefault()
port.persist = true      // keep the last value
port.setPersist(value)
```

Properties:

| Property  | Description |
|-----------|-------------|
| `data`    | Queue of received packets |
| `fills`   | Number of packets received |
| `reads`   | Number of packets read |
| `required`| Whether the port is required |
| `type`    | Port data type |
| `context` | The context packet, if set |

### OutputPort

Created for each port in `ports.output`. Packets written to an output port are forwarded to every connected link.

```
port.write(packet)   // send a packet to all connected links
```

`write()` accepts a `Packet` or a plain value (which is wrapped). Each connected link receives a clone of the packet. `fills` counts the writes.

### Events

```
  /**
   * Fill event
   *
   * @event Port#fill
   * @type {object}
   */
  public static readonly FILL = 'fill'

  /**
   * Data event
   *
   * @event Port#data
   * @type {Packet}
   */
  public static readonly DATA = 'data'
```

Input ports emit `fill` when a packet is queued. Output ports emit `data` when a packet is written.
