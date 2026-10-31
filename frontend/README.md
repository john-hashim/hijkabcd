# React + TypeScript + Vite

The frontend uses Biome for linting, formatting, and import organization.
TypeScript checks types during the build.

Tailwind CSS is configured through `@tailwindcss/vite` and imported in
`src/index.css`. Use utility classes directly in JSX, for example
`className="flex items-center gap-4"`. Biome supports Tailwind CSS directives.

State lives in `src/store`, with typed slices in `src/store/slices` and focused
selector hooks exported from `src/store/index.ts`. The basic `appSlice` is available through `useAppStore`; Redux DevTools
integration is enabled in development.

`src/api/index.ts` defines the shared Axios client, `src/api/endpoints.ts` holds
future endpoint paths, and `src/api/services/app.ts` is the service placeholder.
No backend calls are implemented. Future requests should follow
component → store action → service → shared client and endpoint constants.

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
