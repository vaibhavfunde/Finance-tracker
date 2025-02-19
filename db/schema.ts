import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    plaidId: text("plaidId"),
    name: text("name").notNull(),
    userId: text("User_id").notNull(),
});

// One-to-many relation: one account has many transactions
export const accountsRelations = relations(accounts, ({ many }) => ({
    transactions: many(transactions),
}));

export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    plaidId: text("plaidId"),
    name: text("name").notNull(),
    userId: text("User_id").notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    transactions: many(transactions),
}));

export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable("transactions", {
    id: text("id").primaryKey(),
    amount: integer("amount").notNull(),
    payee: text("payee").notNull(),
    notes: text("notes"),
    date: timestamp("date", { mode: "date" }).notNull(),
    accountId: text("account_id").references(() => accounts.id, {
        onDelete: "cascade",
    }).notNull(),
    categoryId: text("category_id").references(() => categories.id, {
        onDelete: "set null",
    }),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
    accounts: one(accounts, {
        fields: [transactions.accountId],
        references: [accounts.id],
    }),
    categories: one(categories, {
        fields: [transactions.categoryId],
        references: [categories.id],
    }),
}));

// Fix typo here
export const insertTransactionSchema = createInsertSchema(transactions, {
    date: z.coerce.date(),
});


// import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
// import { createInsertSchema } from "drizzle-zod";
// import { relations } from "drizzle-orm";
// import { z } from "zod";

// export const accounts = pgTable("accounts", {
//     id: text("id").primaryKey(),
//     plaidId: text("plaidId"),
//     name: text("name").notNull(),
//     userId: text("user_Id").notNull(), // Corrected here
// });

// // One-to-many relation: one account has many transactions
// export const accountsRelations = relations(accounts, ({ many }) => ({
//     transactions: many(transactions),
// }));

// export const insertAccountSchema = createInsertSchema(accounts);

// export const categories = pgTable("categories", {
//     id: text("id").primaryKey(),
//     plaidId: text("plaidId"),
//     name: text("name").notNull(),
//     userId: text("user_Id").notNull(), // Corrected here
// });

// export const categoriesRelations = relations(categories, ({ many }) => ({
//     transactions: many(transactions),
// }));

// export const insertCategorySchema = createInsertSchema(categories);

// export const transactions = pgTable("transactions", {
//     id: text("id").primaryKey(),
//     amount: integer("amount").notNull(),
//     payee: text("payee").notNull(),
//     notes: text("notes"),
//     date: timestamp("date", { mode: "date" }).notNull(),
//     accountId: text("account_id").references(() => accounts.id, {
//         onDelete: "cascade",
//     }).notNull(),
//     categoryId: text("category_id").references(() => categories.id, {
//         onDelete: "set null",
//     }),
// });

// export const transactionsRelations = relations(transactions, ({ one }) => ({
//     accounts: one(accounts, {
//         fields: [transactions.accountId],
//         references: [accounts.id],
//     }),
//     categories: one(categories, {
//         fields: [transactions.categoryId],
//         references: [categories.id],
//     }),
// }));

// // Fix typo here
// export const insertTransactionSchema = createInsertSchema(transactions, {
//     date: z.coerce.date(),
// });
