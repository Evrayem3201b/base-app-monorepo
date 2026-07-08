import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql", // This is correct
  dbCredentials: {
    // Ensure this matches the DATABASE_URL in your .env file
    url: process.env.DATABASE_URL!,
  },
});