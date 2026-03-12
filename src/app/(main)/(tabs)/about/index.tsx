import { useTheme } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Linking, Pressable, View } from "react-native";
import { Text } from "@/shared/components/ui/text";

export default function About() {
	const { colors } = useTheme();
	const { t } = useTranslation();

	const handleOpenWebsite = () => {
		Linking.openURL("https://www.victorzarzar.com.br");
	};

	return (
		<View
			style={{ flex: 1, backgroundColor: colors.background }}
			className="px-6 pt-16"
		>
			<View className="self-center w-full max-w-md gap-4">
				<Text className="text-3xl font-semibold tracking-tight text-foreground">
					{t("about.title")}
				</Text>

				<Text className="text-base leading-relaxed text-muted-foreground">
					{t("about.description")}
				</Text>

				<View className="h-px bg-border opacity-40 my-2" />

				<Pressable onPress={handleOpenWebsite}>
					<Text className="text-sm text-muted-foreground">
						{t("about.developedBy")}
					</Text>

					<Text className="text-base font-medium text-primary underline">
						{t("about.url")}
					</Text>
				</Pressable>
			</View>
		</View>
	);
}
