import { useTheme } from "@react-navigation/native";
import { useColorScheme } from "nativewind";
import type React from "react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Platform, Pressable, View } from "react-native";
import { LanguagePicker } from "@/shared/components/language";
import { Button } from "@/shared/components/ui/button";
import { Icon } from "@/shared/components/ui/icon";
import { Text } from "@/shared/components/ui/text";
import { THEME_ICONS } from "@/shared/constants/theme-icon";

const LANG_OPTIONS = [
	{ code: "pt-BR", labelKey: "language.ptBR" },
	{ code: "en-US", labelKey: "language.enUS" },
	{ code: "es-ES", labelKey: "language.esES" },
] as const;

function Card({
	title,
	description,
	children,
}: {
	title: string;
	description?: string;
	children: React.ReactNode;
}) {
	return (
		<View className="w-full rounded-2xl border border-border bg-card p-4">
			<View className="gap-1">
				<Text className="text-base font-semibold">{title}</Text>
				{!!description && (
					<Text className="text-sm text-muted-foreground">{description}</Text>
				)}
			</View>

			<View className="mt-4">{children}</View>
		</View>
	);
}

function ThemeToggle() {
	const { colorScheme, toggleColorScheme } = useColorScheme();

	return (
		<Button
			onPressIn={toggleColorScheme}
			size="icon"
			variant="ghost"
			className="ios:size-9 rounded-full"
		>
			<Icon as={THEME_ICONS[colorScheme ?? "light"]} className="size-5" />
		</Button>
	);
}

export default function Settings() {
	const { colors } = useTheme();
	const { t, i18n } = useTranslation();
	const [langModalOpen, setLangModalOpen] = useState(false);

	const currentLangLabel = useMemo(() => {
		const match = LANG_OPTIONS.find((o) => o.code === i18n.language);
		if (!match) return i18n.language;
		return t(match.labelKey);
	}, [i18n.language, t]);

	function changeLanguage(code: string) {
		i18n.changeLanguage(code);
		setLangModalOpen(false);
	}

	return (
		<View style={{ flex: 1, backgroundColor: colors.background }}>
			<View className="flex-1 px-5 pt-6 gap-4">
				<View className="gap-1">
					<Text className="text-2xl font-bold">{t("settings.title")}</Text>
					<Text className="text-sm text-muted-foreground">
						{t("settings.subtitle")}
					</Text>
				</View>

				<Card
					title={t("settings.appearance.title")}
					description={t("settings.appearance.description")}
				>
					<View className="flex-row items-center justify-between">
						<View className="gap-0.5">
							<Text className="text-sm font-medium">{t("theme.label")}</Text>
							<Text className="text-xs text-muted-foreground">
								{t("theme.hint")}
							</Text>
						</View>

						<ThemeToggle />
					</View>
				</Card>

				<Card
					title={t("settings.language.title")}
					description={t("settings.language.description")}
				>
					<LanguagePicker showLabel={false} />
					<Text className="text-xs text-muted-foreground">
						{t("language.current", { lang: currentLangLabel })}
					</Text>
				</Card>

				<Modal
					visible={langModalOpen}
					animationType="slide"
					transparent
					onRequestClose={() => setLangModalOpen(false)}
				>
					<Pressable
						onPress={() => setLangModalOpen(false)}
						className="flex-1 bg-black/40"
					/>

					<View className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-card p-5 border border-border">
						<View className="gap-1">
							<Text className="text-lg font-semibold">
								{t("language.selectTitle")}
							</Text>
							<Text className="text-sm text-muted-foreground">
								{t("language.selectSubtitle")}
							</Text>
						</View>

						<View className="mt-4 gap-2">
							{LANG_OPTIONS.map((opt) => {
								const selected = i18n.language === opt.code;

								return (
									<Pressable
										key={opt.code}
										onPress={() => changeLanguage(opt.code)}
										className={[
											"rounded-2xl border px-4 py-3 flex-row items-center justify-between",
											selected
												? "border-primary bg-primary/10"
												: "border-border",
										].join(" ")}
									>
										<Text className="text-sm font-medium">
											{t(opt.labelKey)}
										</Text>
										{selected ? (
											<Text className="text-sm text-primary">
												{t("common.selected")}
											</Text>
										) : (
											<Text className="text-sm text-muted-foreground">
												{opt.code}
											</Text>
										)}
									</Pressable>
								);
							})}
						</View>

						<View className="mt-4">
							<Button
								variant="ghost"
								onPress={() => setLangModalOpen(false)}
								className="w-full rounded-2xl"
							>
								<Text>{t("common.close")}</Text>
							</Button>
						</View>

						{Platform.OS === "ios" ? <View className="h-2" /> : null}
					</View>
				</Modal>
			</View>
		</View>
	);
}
