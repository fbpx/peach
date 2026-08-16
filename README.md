# peach — FBPX documentation server

<p align="center">
  <img src="assets/fbpx.png" width="120" alt="FBPX logo" />
</p>

**peach** is the docs server behind [https://docs.fbpx.io](https://docs.fbpx.io). It is a Go fork of [ASoulDocs](https://asouldocs.dev/) (a flamego + goldmark static docs server) that ships the **FBPX** documentation and branding inside the Docker image — content and site, in one deployable.

Everything needed to render the site is in this repository:

- `docs/` — the documentation content (`toc.ini` defines the sidebar; `en-US/` holds the pages).
- `custom/` — the FBPX branding that overrides the engine's default templates, locale strings and assets (`custom/app.ini`, `custom/templates/`, `custom/locale/`, `custom/public/`).
- The engine itself — the ASoulDocs fork under `internal/`, `templates/`, `public/`, `conf/`.

## Run

The published image is self-contained (binary + `docs/` + `custom/` baked in):

```bash
docker run -p 5555:5555 ghcr.io/fbpx/peach:main
```

Then open http://localhost:5555.

## Build and verify locally

```bash
docker build -t fbpx-peach:local .
docker run --rm -p 5556:5555 fbpx-peach:local
```

`curl -s localhost:5556/docs/intro/getting_started` should return the page; the container logs print the parsed table of contents on startup.

## Deploy

Pushing to `main` triggers [`.github/workflows/docker.publish.yml`](.github/workflows/docker.publish.yml), which builds the image and publishes it to `ghcr.io/fbpx/peach:main`. The production host runs it via `../fbpx/docker-compose.yml` (service `fbpx-docs`) behind Traefik at docs.fbpx.io.

To change the docs: edit `docs/` (add a page to `toc.ini` for it to appear in the sidebar) or the branding in `custom/`, then push.

## License

MIT — see [LICENSE](LICENSE). This project is a fork of [ASoulDocs](https://github.com/asoul-sig/asouldocs), released under the same MIT license.
