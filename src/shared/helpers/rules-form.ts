import { z } from "zod";

export const MIN_PASSWORD = 10;
export const MAX_PASSWORD = 128;

const COMMON_PASSWORDS = new Set([
	"12345678",
	"123456789",
	"1234567890",
	"password",
	"password123",
	"qwerty123",
	"admin123",
	"letmein",
	"11111111",
]);

export const gmailEmail = z
	.string()
	.trim()
	.toLowerCase()
	.email("Invalid email")
	.refine((email) => email.endsWith("@gmail.com"), {
		message: "Only @gmail.com emails are allowed",
	})
	.refine((email) => !email.includes("+"), {
		message: "Gmail aliases using '+' are not allowed",
	});

export const strongPassword = z
	.string()
	.min(MIN_PASSWORD, `Password must be at least ${MIN_PASSWORD} characters`)
	.max(MAX_PASSWORD, `Password must be at most ${MAX_PASSWORD} characters`)
	.refine((val) => !/\s/.test(val), {
		message: "Password cannot contain spaces",
	})
	.refine((val) => /[a-z]/.test(val), {
		message: "Password must include at least 1 lowercase letter",
	})
	.refine((val) => /[A-Z]/.test(val), {
		message: "Password must include at least 1 uppercase letter",
	})
	.refine((val) => /\d/.test(val), {
		message: "Password must include at least 1 number",
	})
	.refine((val) => /[^A-Za-z0-9]/.test(val), {
		message: "Password must include at least 1 special character",
	})
	.refine((val) => !COMMON_PASSWORDS.has(val.toLowerCase()), {
		message: "Password is too common",
	});
