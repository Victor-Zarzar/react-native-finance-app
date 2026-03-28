import { eq } from "drizzle-orm";
import * as Crypto from "expo-crypto";
import argon2 from "react-native-argon2";
import { db } from "@/shared/db/client";
import { passwordResetTokens, sessions, users } from "@/shared/db/schema";
import type { AuthUser } from "../types/auth";

function bytesToHex(bytes: Uint8Array): string {
	return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function createSaltHex(size = 16): Promise<string> {
	const bytes = Crypto.getRandomBytes(size);
	return bytesToHex(bytes);
}

async function hashPassword(password: string): Promise<string> {
	const saltHex = await createSaltHex(16);

	const result = await argon2(password, saltHex, {
		iterations: 2,
		memory: 19 * 1024,
		parallelism: 1,
		hashLength: 32,
		mode: "argon2id",
		saltEncoding: "hex",
	});

	return result.encodedHash;
}

async function verifyPassword(
	password: string,
	encodedHash: string,
): Promise<boolean> {
	const parts = encodedHash.split("$");

	if (parts.length < 6) {
		return false;
	}

	const paramsPart = parts[3];
	const saltBase64 = parts[4];

	const params = Object.fromEntries(
		paramsPart.split(",").map((entry) => {
			const [key, value] = entry.split("=");
			return [key, Number(value)];
		}),
	);

	const saltHex = bytesToHex(
		Uint8Array.from(atob(saltBase64), (char) => char.charCodeAt(0)),
	);

	const result = await argon2(password, saltHex, {
		iterations: params.t,
		memory: params.m,
		parallelism: params.p,
		hashLength: 32,
		mode: "argon2id",
		saltEncoding: "hex",
	});

	return result.encodedHash === encodedHash;
}

export async function getSessionUser(): Promise<AuthUser | null> {
	const [session] = await db.select().from(sessions).limit(1);
	if (!session) return null;

	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.id, Number(session.userId)))
		.limit(1);

	if (!user) return null;
	return { id: user.id, email: user.email, avatar_url: user.avatar_url };
}

export async function signUpUser(
	email: string,
	password: string,
): Promise<AuthUser> {
	const existing = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	if (existing.length) {
		throw new Error("Email already in use");
	}

	const passwordHash = await hashPassword(password);
	const now = Date.now();

	const [user] = await db
		.insert(users)
		.values({
			email,
			passwordHash,
			createdAt: now,
			avatar_url: "",
		})
		.returning();

	await db.insert(sessions).values({
		userId: String(user.id),
		createdAt: now,
	});

	return { id: user.id, email: user.email, avatar_url: user.avatar_url };
}

export async function signInUser(
	email: string,
	password: string,
): Promise<AuthUser> {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	if (!user) {
		throw new Error("Invalid credentials");
	}

	const isValid = await verifyPassword(password, user.passwordHash);

	if (!isValid) {
		throw new Error("Invalid credentials");
	}

	await db.delete(sessions).where(eq(sessions.userId, String(user.id)));
	await db.insert(sessions).values({
		userId: String(user.id),
		createdAt: Date.now(),
	});

	return { id: user.id, email: user.email, avatar_url: user.avatar_url };
}

export async function signOutUser(userId: number): Promise<void> {
	await db.delete(sessions).where(eq(sessions.userId, String(userId)));
}

export async function createPasswordResetToken(email: string): Promise<string> {
	const [user] = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	if (!user) return "ok";

	const randomBytes = Crypto.getRandomBytes(32);
	const token = bytesToHex(randomBytes);

	await db
		.delete(passwordResetTokens)
		.where(eq(passwordResetTokens.userId, String(user.id)));

	await db.insert(passwordResetTokens).values({
		userId: String(user.id),
		token,
		createdAt: Date.now(),
	});

	return token;
}

export async function resetPassword(
	token: string,
	newPassword: string,
): Promise<void> {
	const [resetToken] = await db
		.select()
		.from(passwordResetTokens)
		.where(eq(passwordResetTokens.token, token))
		.limit(1);

	if (!resetToken) throw new Error("Invalid or expired token");

	const FIFTEEN_MINUTES = 15 * 60 * 1000;
	if (Date.now() - resetToken.createdAt > FIFTEEN_MINUTES) {
		await db
			.delete(passwordResetTokens)
			.where(eq(passwordResetTokens.token, token));
		throw new Error("Token expired");
	}

	const passwordHash = await hashPassword(newPassword);

	await db
		.update(users)
		.set({ passwordHash })
		.where(eq(users.id, Number(resetToken.userId)));

	await db
		.delete(passwordResetTokens)
		.where(eq(passwordResetTokens.token, token));
}
