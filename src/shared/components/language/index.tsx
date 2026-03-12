import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, View } from "react-native";
import Brasil from "@/shared/components/language/flags/Brasil";
import Spain from "@/shared/components/language/flags/Spain";
import USA from "@/shared/components/language/flags/USA";
import { Text } from "@/shared/components/ui/text";

const FLAGS = [
	{ component: Brasil, lang: "pt-BR", label: "Brasil" },
	{ component: USA, lang: "en-US", label: "USA" },
	{ component: Spain, lang: "es-ES", label: "Spain" },
] as const;

export function LanguagePicker({
	showLabel = true,
	className,
}: {
	showLabel?: boolean;
	className?: string;
}) {
	const { i18n, t } = useTranslation();

	async function changeLanguage(lang: string) {
		await AsyncStorage.setItem("language", lang);
		i18n.changeLanguage(lang);
	}

	return (
		<View className={className}>
			{showLabel ? (
				<Text className="text-sm font-medium">{t("language.label")}</Text>
			) : null}

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ gap: 12, paddingVertical: 10 }}
			>
				{FLAGS.map(({ component: Flag, lang, label }) => {
					const selected = i18n.language === lang;

					return (
						<Pressable
							key={lang}
							onPress={() => changeLanguage(lang)}
							className={[
								"rounded-2xl bg-background p-2",
								selected ? "border-primary bg-primary/10" : "opacity-70",
							].join(" ")}
							accessibilityRole="button"
							accessibilityLabel={label}
						>
							<Flag width={42} height={42} />
						</Pressable>
					);
				})}
			</ScrollView>
		</View>
	);
}
