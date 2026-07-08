import zod from 'zod';

declare const APP_NAME = "Base App";

declare const createUserSchema: zod.ZodObject<{
    name: zod.ZodString;
    email: zod.ZodEmail;
    password: zod.ZodString;
}, zod.z.core.$strip>;
declare const updateUserSchema: zod.ZodObject<{
    name: zod.ZodOptional<zod.ZodString>;
    email: zod.ZodOptional<zod.ZodEmail>;
    password: zod.ZodOptional<zod.ZodString>;
}, zod.z.core.$strip>;

type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

export { APP_NAME, type User, createUserSchema, updateUserSchema };
