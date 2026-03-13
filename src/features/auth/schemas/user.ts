import { z } from "zod";
import { gmailEmail, strongPassword } from "@/features/auth/hooks/rules";

export const signInSchema = z.object({
	email: gmailEmail,
	password: z.string().min(1, "Password is required"),
});

export const signUpSchema = z.object({
	email: gmailEmail,
	password: strongPassword,
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
