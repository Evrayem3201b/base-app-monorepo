import zod  from "zod";

export const createUserSchema = zod.object({
    name: zod.string().min(2).max(100),
    email: zod.email(),
    password: zod.string().min(6).max(100),
})

export const updateUserSchema = zod.object({
    name: zod.string().min(2).max(100).optional(),
    email: zod.email().optional(),
    password: zod.string().min(6).max(100).optional(),
})