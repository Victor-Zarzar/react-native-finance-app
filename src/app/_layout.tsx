import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { Suspense } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider } from "@/features/auth/components/provider";
import { DbProvider } from "@/shared/db/provider";
import { NAV_THEME } from "@/shared/lib/theme";
import "@/shared/global.css";
import "../../i18n";

export default function RootLayout() {
	const { colorScheme } = useColorScheme();
	const theme = NAV_THEME[colorScheme ?? "light"];

	return (
		<ThemeProvider value={theme}>
			<StatusBar style={theme.dark ? "light" : "dark"} />
			<Suspense
				fallback={
					<View className="flex-1 justify-center items-center">
						<ActivityIndicator size="large" />
					</View>
				}
			>
				<DbProvider>
					<AuthProvider>
						<Stack screenOptions={{ headerShown: false }}>
							<Stack.Screen name="(auth)" />
							<Stack.Screen name="(main)" />
						</Stack>
					</AuthProvider>
				</DbProvider>
			</Suspense>
		</ThemeProvider>
	);
}
