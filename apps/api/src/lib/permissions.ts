// api/src/lib/permissions.ts
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  //orders: ["view", "update", "delete"],
  //menu: ["create", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const staff = ac.newRole({
  //orders: ["view", "update"],
});

export const admin = ac.newRole({
    ...ac.statements, // includes default admin abilities (ban users, etc.)
  //orders: ["view", "update", "delete"],
  //menu: ["create", "update", "delete"],
});

export const customer = ac.newRole({});