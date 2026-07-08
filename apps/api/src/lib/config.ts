import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  BETTER_AUTH_SECRET: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),

  BETTER_AUTH_URL: z.url(),

  ALLOWED_ORIGINS: z
    .string()
    .min(1)
    .transform((value) =>
      value.split(",").map((origin) => origin.trim())
    ),
    GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors
  );
  process.exit(1);
}

export const config = {
  isDev: parsed.data.NODE_ENV === "development",
  betterAuthSecret: parsed.data.BETTER_AUTH_SECRET,
  databaseUrl: parsed.data.DATABASE_URL,
  resendApiKey: parsed.data.RESEND_API_KEY,
  betterAuthUrl: parsed.data.BETTER_AUTH_URL,
  allowedOrigins: parsed.data.ALLOWED_ORIGINS,
  googleClientId: parsed.data.GOOGLE_CLIENT_ID,
  googleClientSecret: parsed.data.GOOGLE_CLIENT_SECRET,
};