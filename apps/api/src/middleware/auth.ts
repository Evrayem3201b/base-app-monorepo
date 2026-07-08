// api/src/middleware/auth.ts
import { createMiddleware } from "hono/factory";
import { auth } from "../lib/auth.js";

type Env = {
  Variables: {
    user: typeof auth.$Infer.Session.user;
  };
};

export const requireAuth = (allowedRoles?: string[]) =>
  createMiddleware<Env>(async (c, next) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    if (allowedRoles && !allowedRoles.includes((session.user as any).role)) {
      return c.json({ error: "Forbidden" }, 403);
    }

    c.set("user", session.user);
    await next();
  });