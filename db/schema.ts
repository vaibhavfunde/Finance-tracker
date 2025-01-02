import { pgTable, text } from "drizzle-orm/pg-core";

export const accounts = pgTable("accounts",{
    id:text("id").primaryKey(),
    plaidId:text("plaidId"),
    name:text("name").notNull(),
    userId:text("User_id").notNull(),
  
})