// src/constants/APP_DATA.ts
var APP_NAME = "Base App";

// src/schemas/users.schemas.ts
import zod from "zod";
var createUserSchema = zod.object({
  name: zod.string().min(2).max(100),
  email: zod.email(),
  password: zod.string().min(6).max(100)
});
var updateUserSchema = zod.object({
  name: zod.string().min(2).max(100).optional(),
  email: zod.email().optional(),
  password: zod.string().min(6).max(100).optional()
});
export {
  APP_NAME,
  createUserSchema,
  updateUserSchema
};
