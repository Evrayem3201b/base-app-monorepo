import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db.js";
import { expo } from "@better-auth/expo";
import { admin as adminPlugin } from "better-auth/plugins/admin";
import { ac, admin, staff, customer } from "./permissions.js";
import { config } from "./config.js";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  secret: config.betterAuthSecret,
  baseURL: config.betterAuthUrl,
   trustedOrigins: [
    ...config.allowedOrigins,
    "app://",
    ...(config.isDev ? ["exp://", "exp://**"] : []),
  ],
  logger: {
    level: "debug", 
    disabled: false,
  },
  socialProviders: {
    google: {
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // set to true if you want to require email verification for sign-in
    revokeSessionsOnPasswordReset: true,
  },
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url }) => {
  //     await sendEmail({
  //       to: user.email,
  //       subject: `Verify your ${APP_NAME} account`,
  //       html: `Click to verify: <a href="${url}">${url}</a>`,
  //     });
  //   },
  //   sendOnSignUp: true,
  //   autoSignInAfterVerification: true,
  // },
  advanced: {
        cookies: {
            session_token: {
                attributes: {
                    sameSite: "none", // Critical if frontend & backend are on different domains
                    secure: true,
                    httpOnly: true,
                },
            },
        },
    },
  rateLimit: {
    enabled: true,
    window: 60,        // time window in seconds
    max: 10,           // max requests per window per IP
    customRules: {
    "/sign-in/email": {
      window: 60,
      max: 5, // stricter: only 5 sign-in attempts per minute per IP
    },
  },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [
    expo(),
    adminPlugin({
      ac,
      roles: { admin, staff, customer },
      defaultRole: "user",
    }),
  ]
  // databaseHooks: {
  //   user: {
  //     create: {
  //       // runs AFTER a new user is inserted
  //       // after: async (user) => {
  //       //   await db.insert(loyaltyAccounts).values({
  //       //     id: crypto.randomUUID(),
  //       //     userId: user.id,
  //       //   });
  //       // },
  //     },
  //   },
});