import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function AuthLayout() {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) return <Redirect href="/(main)/(tabs)/home" />;

	return <Stack screenOptions={{ headerShown: true }} />;
}
