# 🚀 Base App API

A production-ready backend template built for modern mobile applications.

It comes preconfigured with a complete authentication system, database layer, email verification, and API framework so you can start building features immediately instead of spending hours on boilerplate.

---

# ✨ Tech Stack

- ⚡ **Hono** — Fast, lightweight web framework
- 🔐 **Better Auth** — Secure authentication
- 🗄️ **Drizzle ORM** — Type-safe SQL ORM
- 🌿 **Neon** — Serverless PostgreSQL
- 📧 **Resend** — Email verification & transactional emails
- 🔒 **Zod** — Runtime validation
- 🌎 **Environment validation** — Fail fast on invalid configuration

---

# 📁 Project Structure

```text

├── 📁 drizzle
│   ├── 📁 meta
│   │   ├── ⚙️ 0000_snapshot.json
│   │   ├── ⚙️ 0001_snapshot.json
│   │   └── ⚙️ _journal.json
│   ├── 📄 0000_past_adam_warlock.sql
│   └── 📄 0001_jittery_korath.sql
├── 📁 src
│   ├── 📁 db
│   │   └── 📄 schema.ts
│   ├── 📁 lib
│   │   ├── 📄 api-client.ts
│   │   ├── 📄 auth.ts
│   │   ├── 📄 config.ts
│   │   ├── 📄 db.ts
│   │   ├── 📄 email.ts
│   │   └── 📄 permissions.ts
│   ├── 📁 middleware
│   │   ├── 📄 auth.ts
│   │   └── 📄 requireRole.ts
│   ├── 📁 routes
│   │   ├── 📄 hello.ts
│   │   └── 📄 users.ts
│   └── 📄 index.ts
├── ⚙️ .env-template
├── ⚙️ .gitignore
├── 📝 ReadMe.md
├── 📄 drizzle.config.ts
├── ⚙️ package.json
├── ⚙️ pnpm-lock.yaml
└── ⚙️ tsconfig.json
```

---

# 🚀 Getting Started

## 1. Install dependencies

```bash
pnpm install
```

---

## 2. Configure environment variables

Rename

```text
.env.template
```

to

```text
.env
```

Then fill in all required values.

Example:

```env
BETTER_AUTH_SECRET=

DATABASE_URL=

BETTER_AUTH_URL=http://192.168.x.x:3001

RESEND_API_KEY=

ALLOWED_ORIGINS=http://localhost:8081,http://192.168.x.x:8081
```

---

## 3. Configure the application

Update the shared application information in

```text
shared/src/constants/APP_DATA.ts
```

Things such as

- App name
- Company name
- Branding
- Email subjects
- Shared constants

are defined there.

---

## 4. Run the API

```bash
pnpm dev
```

The server should start on

```
http://localhost:3001
```

(or your configured host).

---

# 🔐 Authentication

Authentication is powered by **Better Auth**.

Features included:

- Email & Password Authentication
- Email Verification
- Session Management
- Role-based Authorization
- Secure Cookies
- Expo Integration

---

# 📧 Email Verification

Email verification is configured using **Resend**.

Don't forget to set

```env
RESEND_API_KEY=
```

If you're using Resend in production, verify your sending domain first.

---

# 🗄️ Database

This template uses

- Neon PostgreSQL
- Drizzle ORM

Run migrations with

```bash
pnpm drizzle-kit push
```

or your preferred migration workflow.

---

# 👮 Route Protection

Protect routes using the included middleware.

Example:

```ts
import { requireRole } from "../middleware/requireRole";

app.post(
  "/",
  requireRole(["admin"]),
  sValidator("json", createMenuItemSchema),
  async (c) => {
    // Create menu item
  }
);
```

Multiple roles are also supported:

```ts
requireRole(["admin", "manager"])
```

---

# ⚠️ Important Configuration

## API URL

The backend URL **must** match the frontend configuration.

### API

```env
BETTER_AUTH_URL=http://192.168.x.x:3001
```

### Expo

```env
EXPO_PUBLIC_API_URL=http://192.168.x.x:3001
```

These should always point to the same server.

---

## Server Port

The port configured in

```text
src/index.ts
```

must match the port inside

```env
BETTER_AUTH_URL
```

Example

```ts
const port = 3001;
```
↓

```env
BETTER_AUTH_URL=http://192.168.x.x:3001
```

add this to the index.ts to start the server locally

```ts
const port = 3001;
serve({ fetch: app.fetch, port, hostname: "0.0.0.0" }, (info) => {
  console.log(`Server running on ${config.betterAuthUrl}`);
});
```

---

## Allowed Origins

Remember to configure

```env
ALLOWED_ORIGINS=
```

Example:

```env
ALLOWED_ORIGINS=http://localhost:8081,http://192.168.x.x:8081
```

---

# 🧪 Development Notes

If you're running on a physical Expo device:

- Use your computer's LAN IP.
- Do **not** use `localhost`.
- Ensure your firewall allows the API port.
- Ensure your phone and computer are on the same network.

Example:

```env
BETTER_AUTH_URL=http://192.168.1.11:3001
```

---

# 🤝 Contributing

Feel free to extend the template with additional modules, middleware, and integrations while keeping the architecture clean and modular.

---

Built with ❤️ using Hono, Better Auth, Drizzle ORM, Neon, and Expo.
