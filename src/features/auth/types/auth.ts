export type AuthContextType = {
	user: AuthUser | null;
	isAuthenticated: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
};

export type AuthUser = {
	id: number;
	email: string;
	avatar_url: string;
};
