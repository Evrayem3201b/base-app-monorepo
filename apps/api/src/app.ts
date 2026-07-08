import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

import helloRoute from "./routes/hello.js";
import { auth } from "./lib/auth.js";
import { config } from "./lib/config.js";
import { requireAuth } from "./middleware/auth.js";

const app = new Hono();

app
  .use("/*", logger())
  .use("/*", secureHeaders())
  .use(
    "/*",
    cors({
      origin: config.allowedOrigins,
      credentials: true,
    })
  )
  .get("/api/health", (c) => c.json({ status: "ok" }))
  .get("/api/user", requireAuth(), (c) => {
    const user = c.get("user");

    if (!user) {
      return c.body(null, 401);
    }

    return c.json({ user });
  })
  .route("/api/hello", helloRoute)
  .on(["GET", "POST"], "/api/auth/**", (c) => auth.handler(c.req.raw))
  .onError((err, c) => {
    console.error(err);
    return c.json({ error: "Internal Server Error" }, 500);
  })
  .notFound((c) => c.json({ error: "Not Found" }, 404));

export type AppType = typeof app;
export default app;