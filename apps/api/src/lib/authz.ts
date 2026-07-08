import { eq } from "drizzle-orm";

// api/src/lib/authz.ts
export function isPrivileged(user: { role?: string }, roles: string[] = ["admin", "staff"]) {
  return roles.includes((user as any).role);
}

export function ownershipFilter(
  table: { userId: any },
  user: { id: string; role?: string },
  privilegedRoles?: string[]
) {
  return isPrivileged(user, privilegedRoles) ? undefined : eq(table.userId, user.id);
}

// Usage 
// const where = and(
//   eq(orders.id, c.req.param("id")),
//   ownershipFilter(orders, user)
// );