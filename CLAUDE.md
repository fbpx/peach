# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The docs server behind https://docs.fbpx.io: a Go fork of ASoulDocs (the `peach` container) that serves the **FBPX** documentation. Everything the site needs is in this repo and baked into the image:

- `docs/` — the documentation content (`toc.ini` defines the sidebar; `en-US/` holds the pages).
- `custom/` — the FBPX branding that overrides the engine's embedded templates, locale and assets (`custom/app.ini` is the runtime config, loaded on top of the embedded `conf/app.ini`).
- The engine itself — flamego web server, goldmark markdown, embedded templates/public/locale via `embed.FS` (`templates/`, `public/`, `conf/`, `internal/`).

There is no separate docs repo anymore; the old `fbpx/docs` remote content + `custom/` volume mount were consolidated here. Do not reintroduce a remote-git `[docs] TYPE` or a mounted `custom/` volume.

## Layout

- `docs/toc.ini` — the navigation definition (AsoulDocs `-:` auto-increment format). Section order and page order in the sidebar are defined here; each page's filename maps to its URL slug. **A new page will not appear in the site until it is added to `toc.ini`.** The docs store is `[docs] TYPE = local, TARGET = ./docs` (see `custom/app.ini`).
- `docs/en-US/` — the pages, grouped into `intro/`, `fbpx/` (CLI commands), `api/` (flow runtime concepts), `runtime/`, `examples/`.
- `docs/examples/hello_world/` — a complete, runnable FBPX project (an `.fbp` flow, its node-definition YAMLs, `package.json`, test script), served statically under `/examples/hello_world/`. This is the working reference for how flows and nodes actually behave; doc examples should stay consistent with it.
- `custom/app.ini` — overrides the embedded `conf/app.ini`. Keys use the same names as the embedded file (`ENV`, `HTTP_ADDR`, `HTTP_PORT`, `[site] DESCRIPTION`/`EXTERNAL_URL`, `[docs] TYPE`/`TARGET`). `conf.Init` merges embedded + custom (custom wins).
- `custom/templates/`, `custom/locale/`, `custom/public/` — override the engine's embedded templates, i18n strings and static assets (served first, then docs root, then embedded).

## Build / run / deploy

- There is no build step for the docs content; the site is rendered by the `asouldocs` binary (Taskfile `build` → `go build ... -o asouldocs`).
- Local verification: `docker build -t fbpx-peach:local .` then `docker run --rm -p 5556:5555 fbpx-peach:local`; the container logs print the parsed TOC on startup.
- Deploy: pushing to `main` triggers `.github/workflows/docker.publish.yml`, which publishes `ghcr.io/fbpx/peach:main`. Production runs it via `../fbpx/docker-compose.yml` (service `fbpx-docs`) behind Traefik at docs.fbpx.io. To ship a content change: edit `docs/`, commit, push.

## Doc conventions

- Every page starts with YAML frontmatter containing a `title`.
- Cross-links use absolute site paths: `[login](/docs/fbpx/login)`.
- The command examples are real CLI output; verify changes against an actual `.fbp` file before editing them.
- **Branding**: the project is **FBPX** — never Chiχ / `chix` (that was the old name). The logo is `assets/fbpx.svg` / `assets/fbpx.png`, copied from `../fbpx/fbpx-ui/dist/browser/assets/images/` (and mirrored into `custom/public/img/`).
- **CLI docs must match source**: keep the `--help` blocks in `docs/en-US/fbpx/*.md` and `docs/en-US/runtime/README.md` in sync with `../fbpx/packages/cli/src/cli.ts` (commands) and `../fbpx/packages/runtime/src/cli.ts` (runtime options).

## FBPX concepts that span many pages

- **Flow files (`.fbp`)**: textual graph definitions. A `provider` line at the top declares how nodes are resolved, e.g. `provider ./{ns}.{name}.yml` or a remote `https://api.fbpx.io/v1/nodes/{user}/{ns}/{name}`. Nodes are written `Name(ns/name)`; connections are `A out -> in B`; input (IIP) is a quoted literal feeding a port (`'value' -> msg Node`); prepending `@` to the port (or `^` in a connection target) turns input into context stored in the graph: `'value' -> @msg Node`.
- **Node definitions (YAML)**: resolved by the provider's pattern. Schema: `title`, `ns`, `name` (must match the provider URI), `ports.input`/`ports.output` (each port has `type` plus optional `default`, `enum`, `required`, `fn`), `dependencies.npm`, and `fn`.
- **The `fn` body**: the `$` namespace is the Packet API (`$.msg` for a port's value, `$.get('port')`, `$.create(value)`). Three supported styles: assign `output = { ... }`; define `output = () => { ... cb({ out: ... }) }`; or use port boxes `on.input.in = () => { ... }`. `cb({ out: ... })` emits packets on named output ports.
- **npm dependencies**: declared under `dependencies.npm`, installed with `fbpx install`. Inside `fn` they are available by underscored name (`rss-parser` → `rss_parser`).
- **Debugging**: run with `DEBUG=* fbpx run file.fbp`. Namespaces: `fbpx:io`, `fbpx:inputPort`, `fbpx:connector`, `fbpx:pm`, `fbpx:packet`, `fbpx:actor`, `fbpx:node`, `fbpx:outputPort`.

## CLI surface documented

`run|r`, `graph|g`, `input`, `login`, `deps`, `deploy`, `tokens`, `list|info`, `convert|c`, `compile`, `install|i`, `browserify|brsf`, `flowhub`, `runtime`, `cert`, `config`, `serve`.

- `fbpx convert --yaml`/`--json` dumps the parsed graph (also validates the file).
- `fbpx compile` is run from a project directory (layout: `graphs/*.fbp` + `nodes/<name>/node.js|node.json`) and reduces everything to a single `x.json`; `fbpx deploy` then pushes the project to https://api.fbpx.io, tagging a release. Deployed nodes are referenced via a remote provider URL.
- `fbpx graph` emits a dot graph, usually piped to graphviz: `fbpx graph test.fbp | dot -Tsvg`.

## Running the example project

`docs/examples/hello_world/` is self-contained. It needs the CLI installed globally (`npm i @fbpx/cli -g`); the `say` node additionally requires `festival` (e.g. `apt install festival` on Ubuntu). Useful for sanity-checking doc examples:

- `fbpx run hello_world.fbp` — execute the flow
- `fbpx convert hello_world.fbp --yaml` — inspect the parsed graph
- `fbpx input hello_world.fbp` — show the declared input
