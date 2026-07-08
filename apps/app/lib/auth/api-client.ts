import {hc} from "hono/client"
import type { AppType } from "@backend/app";

export const apiClient = hc<AppType>(process.env.EXPO_PUBLIC_BETTER_AUTH_URL!);

