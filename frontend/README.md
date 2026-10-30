# React + TypeScript + Vite

The frontend uses Biome for linting, formatting, and import organization.
TypeScript checks types during the build.

Run these commands from the project root, where `compose.yaml` lives.

Start the development server:

```sh
docker compose up -d workspace
```

Open <http://localhost:5173> in your browser.

With the container running, check lint rules, formatting, and imports:

```sh
docker compose exec workspace npm run check
```

Apply formatting and safe fixes:

```sh
docker compose exec workspace npm run check:fix
```

Run only lint checks or only formatting:

```sh
docker compose exec workspace npm run lint
docker compose exec workspace npm run format
```

Check TypeScript types and build the frontend:

```sh
docker compose exec workspace npm run build
```

If the container is stopped, replace `exec workspace` with `run --rm workspace`
for these commands. Shared project files remain after the temporary container exits.
