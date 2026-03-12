import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { NAV_THEME } from "@/shared/lib/theme";
import "@/shared/global.css";
import "../../i18n";

export default function RootLayout() {
	const { colorScheme } = useColorScheme();
	const theme = NAV_THEME[colorScheme ?? "light"];

	return (
		<ThemeProvider value={theme}>
			<StatusBar style={theme.dark ? "light" : "dark"} />
			<Stack
				screenOptions={{
					headerShown: false,
					contentStyle: { backgroundColor: theme.colors.background },
				}}
			>
				<Stack.Screen name="(main)" />
			</Stack>
		</ThemeProvider>
	);
}
