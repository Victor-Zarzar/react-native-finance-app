import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";
import {
	ArrowRightIcon,
	BookOpenIcon,
	LayersIcon,
	SparklesIcon,
	ZapIcon,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { Button } from "@/shared/components/ui/button";
import { Icon } from "@/shared/components/ui/icon";
import { Text } from "@/shared/components/ui/text";
import type { Step } from "@/shared/types/icon";

export default function Home() {
	const { colors } = useTheme();
	const { t } = useTranslation();

	const steps: Step[] = [
		{
			step: "01",
			title: t("step1Title"),
			description: t("step1"),
			icon: LayersIcon,
		},
		{
			step: "02",
			title: t("step2Title"),
			description: t("step2"),
			icon: ZapIcon,
		},
		{
			step: "03",
			title: t("step3Title"),
			description: t("step3"),
			icon: SparklesIcon,
		},
	];

	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: colors.background }}
			contentContainerStyle={{
				flexGrow: 1,
				paddingHorizontal: 16,
				paddingTop: 18,
				paddingBottom: 24,
			}}
			showsVerticalScrollIndicator={false}
		>
			<View className="w-full max-w-sm self-center">
				<View className="gap-2">
					<Text className="text-2xl font-semibold tracking-tight">
						{t("home.title")}
					</Text>

					<Text className="text-sm text-muted-foreground">
						{t("home.subtitle")}
					</Text>
				</View>

				<View className="mt-6 gap-3">
					{steps.map(({ step, title, description, icon }) => (
						<View
							key={step}
							className="rounded-2xl border border-border bg-card p-4"
						>
							<View className="flex-row items-start gap-3">
								<View className="h-10 w-10 items-center justify-center rounded-xl bg-muted">
									<Icon as={icon} className="size-5 text-foreground" />
								</View>

								<View className="flex-1 gap-1">
									<View className="flex-row items-center justify-between">
										<Text className="text-sm font-semibold">{title}</Text>
										<Text className="font-mono text-[10px] font-semibold text-muted-foreground">
											{step}
										</Text>
									</View>

									<Text className="text-sm text-muted-foreground">
										{description}
									</Text>
								</View>
							</View>
						</View>
					))}
				</View>

				<View className="mt-6 gap-3">
					<Link href="https://reactnativereusables.com" asChild>
						<Button className="w-full flex-row items-center justify-between">
							<View className="flex-row items-center gap-2">
								<Icon
									as={BookOpenIcon}
									className="size-4 text-white dark:text-black"
								/>
								<Text>{t("browseDocs")}</Text>
							</View>
							<Icon
								as={ArrowRightIcon}
								className="size-4 text-white dark:text-black"
							/>
						</Button>
					</Link>

					<Link
						href="https://github.com/founded-labs/react-native-reusables"
						asChild
					>
						<Button
							variant="outline"
							className="w-full flex-row items-center justify-between"
						>
							<Text>{t("viewGithub")}</Text>
							<Icon as={ArrowRightIcon} className="size-4" />
						</Button>
					</Link>

					<View className="mt-1 rounded-2xl border border-border bg-card p-4">
						<View className="flex-row items-center gap-3">
							<View className="h-9 w-9 items-center justify-center rounded-xl bg-muted">
								<Icon as={SparklesIcon} className="size-4" />
							</View>
							<Text className="flex-1 text-sm text-muted-foreground">
								{t("home.tip")}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}
