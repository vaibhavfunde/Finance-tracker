import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables from .env.local
config({ path: ".env.local" });

export default defineConfig({
 // dialect: "postgresql", // Specify the database dialect
  schema: "./db/schema.ts", // Path to your schema file
  driver: "pg", // PostgreSQL driver
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!, // Ensure DATABASE_URL is defined in your .env.local
  },
  verbose: true, // Enables verbose logging
  strict: true,  // Enforces strict mode
});
