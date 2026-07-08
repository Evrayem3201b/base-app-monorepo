// app/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { adminClient } from "better-auth/client/plugins";
import { router } from "expo-router";

const AUTH_ATTEMPT_PATHS = ["/sign-in", "/sign-up", "/forget-password", "/reset-password"];


export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_URL!, // your API's address
  sessionOptions: {
    refetchOnWindowFocus: true, // revalidates when app regains foreground — no manual AppState listener needed
    refetchWhenOffline: false,
  },
  fetchOptions: {
    onError(ctx) {
      const isAuthAttempt = AUTH_ATTEMPT_PATHS.some((path) =>
        ctx.request.url.toString().includes(path)
      );

      // Only redirect for session-loss on ALREADY authenticated calls
      // (e.g. get-session, update-user, delete-user) — never for the
      // sign-in/sign-up attempt itself, where a 401/403 is an expected,
      // user-facing validation error, not a revoked session.
      if (!isAuthAttempt && (ctx.response?.status === 401 || ctx.response?.status === 403)) {
        router.replace("/(auth)/AuthScreen");
      }
    },
  },
  plugins: [
    expoClient({
      scheme: "app", // must match app.json's "scheme" field
      storagePrefix: "app", // must match app.json's "scheme" field
      storage: SecureStore,
    }),
    adminClient(),
  ],
});