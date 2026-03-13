import type React from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "@/features/auth/context/context";
import type { AuthUser } from "@/features/auth/types/auth";
import {
	getSessionUser,
	signInUser,
	signOutUser,
	signUpUser,
} from "../services/userService";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		getSessionUser()
			.then(setUser)
			.finally(() => setIsAuthenticated(false));
	}, []);

	async function signIn(email: string, password: string): Promise<void> {
		const user = await signInUser(email, password);
		setUser(user);
	}

	async function signUp(email: string, password: string): Promise<void> {
		const user = await signUpUser(email, password);
		setUser(user);
	}

	async function signOut(): Promise<void> {
		if (!user) return;
		await signOutUser(user.id);
		setUser(null);
	}

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated, signIn, signUp, signOut }}
		>
			{children}
		</AuthContext.Provider>
	);
}
