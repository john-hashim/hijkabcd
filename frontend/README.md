# React + TypeScript + Vite

The frontend uses Biome for linting, formatting, and import organization.
TypeScript checks types during the build.

Tailwind CSS is configured through `@tailwindcss/vite` and imported in
`src/index.css`. Use utility classes directly in JSX, for example
`className="flex items-center gap-4"`. Biome supports Tailwind CSS directives.

State lives in `src/store`, with typed slices in `src/store/slices` and focused
selector hooks exported from `src/store/index.ts`. The basic `appSlice` is available through `useAppStore`; Redux DevTools
integration is enabled in development.

`src/api/index.ts` defines the shared Axios client and `src/api/endpoints.ts`
holds endpoint paths. Requests follow component → store action → service →
shared client and endpoint constants.

Wind actuals are available through `useAppStore()`:

```ts
const {
  windActuals,
  windActualsDate,
  isLoadingWindActuals,
  windActualsError,
  fetchWindActuals,
} = useAppStore();

// Call from the date-selection handler, not during rendering.
await fetchWindActuals("2026-01-14");
```

The action calls `GET /api/wind/actuals?date=2026-01-14` and stores the readings
in chronological order. Starting a request clears previous readings and errors;
only the latest request may update the result. A successful empty response is
an empty array with no error. Components can distinguish it from the initial
state using `windActualsDate` and from loading using `isLoadingWindActuals`.
`src/features/wind/components/WindDashboard.tsx` displays these readings in a
table after a user selects a delivery date and clicks Load actuals. `App.tsx`
renders the dashboard. Loading, error/retry, and empty states are included.

In development, Vite proxies `/api` to `http://localhost:8000`. Docker Compose
sets `API_PROXY_TARGET=http://backend:8000` so Vite reaches the backend container.
After changing Compose settings, run `docker compose up -d workspace` to apply
them. The backend must also be running: `docker compose up -d backend`.

For a separately deployed backend, set `VITE_API_BASE_URL` to its public base URL
including `/api` before building (see `.env.example`), and configure the backend
to allow the frontend origin through CORS. Vite's development proxy is not part
of the production build.

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
