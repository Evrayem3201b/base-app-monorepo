// app/lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";
import { adminClient } from "better-auth/client/plugins";
import { router } from "expo-router";



export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_BETTER_AUTH_URL!, // your API's address
  sessionOptions: {
    refetchOnWindowFocus: true, // revalidates when app regains foreground — no manual AppState listener needed
    refetchWhenOffline: false,
  },
  fetchOptions: {
    onError(ctx) {
      if (ctx.response?.status === 401 || ctx.response?.status === 403) {
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