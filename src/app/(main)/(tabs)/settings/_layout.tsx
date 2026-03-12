import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";

export default function SettingsLayout() {
	const { t } = useTranslation();

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				animation:
					Platform.OS === "android" ? "fade_from_bottom" : "simple_push",
				animationDuration: Platform.OS === "android" ? undefined : 200,
				contentStyle: { backgroundColor: "#141414" },
			}}
		>
			<Stack.Screen
				name="index"
				options={{
					title: t("tabs.settings"),
				}}
			/>
		</Stack>
	);
}
