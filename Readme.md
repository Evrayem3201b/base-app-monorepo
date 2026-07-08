# 🚀 Base App API

A production-ready, reusable Hono backend template for mobile and web apps — authentication, authorization, database, and email all wired together so new projects start from a working foundation instead of boilerplate.

Part of a pnpm monorepo alongside `apps/app` (Expo) and `packages/shared` (shared types, Zod schemas, constants).

---

## ✨ Tech Stack

| Layer | Choice |
|---|---|
| Framework | [Hono](https://hono.dev) — fast, typed, edge/Node-portable |
| Auth | [Better Auth](https://better-auth.com) — email/password, social, admin roles, Expo support |
| ORM | [Drizzle](https://orm.drizzle.team) — type-safe SQL |
| Database | [Neon](https://neon.tech) — serverless Postgres |
| Email | [Resend](https://resend.com) — verification, password reset |
| Validation | [Zod v4](https://zod.dev) — env vars, request bodies, forms |
| Type-safe client | Hono RPC (`hc<AppType>`) — end-to-end types from API to Expo, no manual fetch typing |

---

## 📁 Project Structure

```text
apps/api
├── drizzle/                 # generated SQL migrations + snapshots
├── src/
│   ├── db/
│   │   └── schema.ts        # Drizzle table definitions
│   ├── lib/
│   │   ├── auth.ts          # Better Auth config (providers, plugins, hooks)
│   │   ├── authz.ts         # ownership-check helpers (isPrivileged, ownershipFilter)
│   │   ├── config.ts        # Zod-validated environment config — single source of truth
│   │   ├── db.ts            # Drizzle + node-postgres client
│   │   ├── email.ts         # Resend wrapper
│   │   └── permissions.ts   # role/access-control definitions (admin plugin)
│   ├── middleware/
│   │   └── auth.ts          # requireAuth(roles?) — session + role gate
│   ├── routes/
│   │   └── hello.ts         # example route — copy this pattern for new resources
│   ├── app.ts                # the Hono app itself (single chained instance)
│   └── index.ts              # local dev entrypoint (serve() via @hono/node-server)
├── .env.example
├── drizzle.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Install dependencies (from the monorepo root)

```bash
pnpm install
```

Always run installs from the repo root, not from inside `apps/api` — this is a pnpm workspace, and `packages/shared` needs to resolve correctly across all apps.

### 2. Configure environment variables

```bash
cp apps/api/.env.example apps/api/.env
```

Fill in every value — the server **will not start** with missing or invalid env vars (see [Environment Validation](#-environment-validation) below).

```env
NODE_ENV=development

BETTER_AUTH_SECRET=
DATABASE_URL=

RESEND_API_KEY=

BETTER_AUTH_URL=http://192.168.x.x:3001
ALLOWED_ORIGINS=http://localhost:8081,http://192.168.x.x:8081

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 3. Configure shared app info

Edit `packages/shared/src/constants/APP_DATA.ts` — app name, branding, email subject lines, and anything else referenced across both `api` and `app`.

### 4. Push the database schema

```bash
cd apps/api
pnpm db:push
```

### 5. Run the server

```bash
pnpm dev
```

---

## 🔐 Authentication

Powered by **Better Auth**, mounted inside Hono at `/api/auth/**` — Better Auth has no server of its own; Hono is what actually listens on the port and routes requests to it.

**Included:**
- Email/password sign-up, sign-in, sign-out
- Email verification (Resend) — required before first sign-in
- Password reset ("forgot password")
- Change password (with automatic revocation of other sessions)
- Delete account (password-confirmed)
- Google social sign-in
- Rate limiting (global + stricter on `/sign-in/email`)
- Expo client integration (`@better-auth/expo`, SecureStore-backed sessions)

**Client-side (Expo):** `authClient` in `apps/app/lib/auth/auth-client.ts` wraps all of this — session state is reactive via `authClient.useSession()`, with `refetchOnWindowFocus` enabled and a global `fetchOptions.onError` handler that redirects to the auth screen on a revoked/expired session — but explicitly *not* on sign-in/sign-up failures, which stay local as form errors.

---

## 👮 Authorization

Two distinct layers — **both are required**, one is not a substitute for the other:

### 1. Role-based access — "is this user allowed to act on this kind of resource?"

```ts
import { requireAuth } from "../middleware/auth.js";

app.get("/admin/users", requireAuth(["admin"]), async (c) => {
  // only admins reach here
});

app.get("/me", requireAuth(), async (c) => {
  // any authenticated user reaches here
});
```

`requireAuth()` handles both authentication (is there a valid session?) and, optionally, role authorization (is this role in the allowed list?) in a single middleware — one `getSession` call, no duplicated logic.

### 2. Ownership checks — "does this specific record belong to this specific user?"

A role check alone does **not** stop customer A from reading customer B's record by guessing an ID (an IDOR vulnerability). Every route touching a specific record needs both checks:

```ts
import { ownershipFilter } from "../lib/authz.js";

app.get("/orders/:id", requireAuth(), async (c) => {
  const user = c.get("user");

  const order = await db.query.orders.findFirst({
    where: and(
      eq(orders.id, c.req.param("id")),
      ownershipFilter(orders, user) // undefined for admin/staff, scoped for everyone else
    ),
  });

  if (!order) return c.json({ error: "Not Found" }, 404); // never 403 — don't confirm existence
  return c.json(order);
});
```

Apply this to every `GET /:id`, `PUT`, `PATCH`, `DELETE`, and list endpoint that returns user-owned data — see `src/lib/authz.ts`.

---

## 🌎 Environment Validation

`src/lib/config.ts` validates every required env var with Zod at startup — the process throws immediately with a clear error listing exactly which vars are missing or malformed, rather than failing silently later with an obscure `undefined` deep in some unrelated module.

**Every other file imports from `config`, never from `process.env` directly** — this is a hard rule in this codebase. It keeps env access centralized, typed, and validated in one place.

```ts
import { config } from "./lib/config.js";
// config.databaseUrl, config.allowedOrigins, config.betterAuthUrl, ...
```

---

## 🗄️ Database

- **Neon** (serverless Postgres) — no local Postgres/Docker needed, even for local dev; point `DATABASE_URL` at your Neon project's pooled connection string.
- **Drizzle ORM**, `node-postgres` driver (this app runs on a persistent Node server, not edge — `neon-http`/`neon-websockets` are for edge runtimes and aren't used here).

```bash
pnpm db:generate   # generate a migration from schema changes
pnpm db:push       # push schema directly (fast iteration, no migration file)
pnpm db:migrate    # apply generated migrations (safer for real user data)
pnpm db:studio     # open Drizzle Studio against your Neon DB
```

Use `db:push` early in a project; switch to `generate`/`migrate` once real user data exists and you need reviewable, reversible schema history.

---

## 🔌 Type-Safe Client (Hono RPC)

`app.ts` is written as a **single continuous method chain** starting from `new Hono()` — this is required, not stylistic. Reassigning or splitting the chain across statements breaks TypeScript's route-type accumulation, and `AppType` will silently degrade to `unknown` on the client with no error at the call site.

```ts
// ✅ correct — one chain
const app = new Hono()
  .use("/*", cors(...))
  .get("/api/health", ...)
  .route("/api/hello", helloRoute);

export type AppType = typeof app;
```

```ts
// ❌ breaks type inference — app's type is locked in before the chain runs
const app = new Hono();
app.use("/*", cors(...)).get("/api/health", ...);
```

Consumed from Expo via `hc<AppType>()` — see `apps/app/lib/auth/api-client.ts`. Full autocomplete and compile-time errors for every route, no manually maintained request/response types.

---

## 📧 Email

Resend-backed, used for verification and password-reset emails (`src/lib/email.ts`). Free tier: 3,000 emails/month, 100/day. The default `onboarding@resend.dev` sender only delivers to your own account email — verify a real domain in Resend before sending to arbitrary users.

---

## 🚢 Deployment (Vercel)

This app deploys as a Vercel serverless function. Two things that are **not optional**:

1. **All environment variables must be set in the Vercel dashboard** (Settings → Environment Variables) — `.env` files are never uploaded or read by Vercel.
2. **`hono/vercel`'s `handle()` adapter wraps the exported app** — a bare `export default app` will crash with `headers.get is not a function` under Vercel's Node runtime, since it needs a proper Web-standard `Request`/`Response` bridge.

```ts
import { handle } from "hono/vercel";
// ...
export default handle(app);
```

Set `BETTER_AUTH_URL` and `ALLOWED_ORIGINS` to your real deployed domain — never LAN IPs or `localhost` — in production.

---

## 🧪 Local Development on a Physical Device

- Use your computer's **LAN IP**, never `localhost` — on a physical phone, `localhost` refers to the phone itself.
- Android **emulator** specifically: use `10.0.2.2` instead (a reserved alias for the host machine) — this does not apply to physical devices.
- Confirm your phone and computer are on the same Wi-Fi network (not a guest network with client isolation).
- Allow the API port through your firewall (`sudo ufw allow 3001` on Linux).
- Add the LAN origin to both `ALLOWED_ORIGINS` (server) and `trustedOrigins` in `auth.ts` — CORS and Better Auth's origin check are separate mechanisms and both need it.

```env
BETTER_AUTH_URL=http://192.168.1.11:3001
ALLOWED_ORIGINS=http://localhost:8081,http://192.168.1.11:8081,http://192.168.1.11:3001
```

---

## 🧱 Adding a New Route

1. Create `src/routes/yourResource.ts`, following `hello.ts`'s pattern — a chained `new Hono()` instance, default-exported.
2. For anything touching user data, apply `requireAuth()` **and**, if the record is user-owned, `ownershipFilter()` from `authz.ts`.
3. Validate request bodies with a Zod schema — put shared schemas in `packages/shared/src/schemas/` if both `api` and `app` need them.
4. Mount it in `app.ts`, as part of the existing chain — never as a separate `app.route(...)` statement outside the chain.
5. If it returns new data shapes the Expo app will consume, the Hono RPC client (`AppType`) picks it up automatically — no manual client-side typing needed.

---

## 🤝 Contributing

Extend this template with new modules, middleware, and routes while keeping to the existing patterns above — particularly the single-chain `app.ts`, centralized `config.ts`, and the role + ownership authorization split. These aren't stylistic preferences; breaking them reintroduces bugs this template was specifically built to avoid.

---

Built with Hono, Better Auth, Drizzle ORM, Neon, Resend, and Zod.