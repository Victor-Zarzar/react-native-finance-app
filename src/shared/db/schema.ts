import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id").primaryKey().notNull(),
	email: text("email").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
	avatar_url: text("avatar_url").notNull().default(""),
	createdAt: integer("created_at").notNull(),
});

export const sessions = sqliteTable("sessions", {
	id: integer("id").primaryKey().notNull(),
	userId: text("user_id").notNull(),
	createdAt: integer("created_at").notNull(),
});

export const passwordResets = sqliteTable("password_resets", {
	id: integer("id").primaryKey().notNull(),
	email: text("email").notNull(),
	code: text("code").notNull(),
	expiresAt: integer("expires_at").notNull(),
});

export const passwordResetTokens = sqliteTable("password_reset_tokens", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	userId: text("user_id").notNull(),
	token: text("token").notNull().unique(),
	createdAt: integer("created_at").notNull(),
});

export const items = sqliteTable("items", {
	id: integer("id").primaryKey().notNull(),
	title: text("title").notNull(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
});
