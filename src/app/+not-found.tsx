import { useTheme } from "@react-navigation/native";
import { Link, Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button } from "@/shared/components/ui/button";
import { Text } from "@/shared/components/ui/text";

export default function NotFoundScreen() {
	const { colors } = useTheme();
	const { t } = useTranslation();

	return (
		<>
			<Stack.Screen options={{ title: t("notFound.headerTitle") }} />

			<View
				style={{ flex: 1, backgroundColor: colors.background }}
				className="px-6"
			>
				<View className="flex-1 items-center justify-center gap-6">
					<View className="rounded-2xl border border-border bg-card px-5 py-3">
						<Text className="text-2xl font-semibold text-foreground">
							{t("notFound.code")}
						</Text>
					</View>

					<View className="items-center gap-2">
						<Text className="text-xl font-semibold text-foreground text-center">
							{t("notFound.title")}
						</Text>

						<Text className="text-muted-foreground text-center leading-6 max-w-md">
							{t("notFound.description")}
						</Text>
					</View>

					<View className="w-full max-w-sm gap-3">
						<Link href="/">
							<Button className="w-full rounded-2xl">
								<Text className="text-primary-foreground">
									{t("notFound.actions.goHome")}
								</Text>
							</Button>
						</Link>

						<Link href="/">
							<Text className="text-center text-muted-foreground underline">
								{t("notFound.actions.tryAgain")}
							</Text>
						</Link>
					</View>
				</View>
			</View>
		</>
	);
}
