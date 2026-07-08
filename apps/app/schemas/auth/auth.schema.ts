// schemas/auth/authSchemas.ts
import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Please enter a valid email address.").trim().toLowerCase(),
  password: z.string().min(1, "Please enter your password."),
});

export const signUpSchema = signInSchema.extend({
  name: z.string().trim().min(1, "Please enter your name."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters."),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInOrSignUp = z.infer<typeof signInSchema> | z.infer<typeof signUpSchema>;


// lib/auth/authSchemas.ts (add alongside signInSchema/signUpSchema)
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Please enter your current password."),
    newPassword: z.string().min(8, "New password must be at least 8 characters."),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from your current password.",
    path: ["newPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;