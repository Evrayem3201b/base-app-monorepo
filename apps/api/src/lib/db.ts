import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db/schema.js";
import { config } from "./config.js";

if (!config.databaseUrl) {
  throw new Error("DATABASE_URL is missing from environment variables");
}

// Connect using Neon's serverless HTTP client
const client = neon(config.databaseUrl);

export const db = drizzle({ client, schema });