import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
	const { t } = useTranslation();

	return (
		<NativeTabs>
			<NativeTabs.Trigger name="home">
				<NativeTabs.Trigger.Label>{t("tabs.home")}</NativeTabs.Trigger.Label>
				<NativeTabs.Trigger.Icon sf="house.fill" md="home" />
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name="about">
				<NativeTabs.Trigger.Icon sf="info.circle.fill" md="info" />
				<NativeTabs.Trigger.Label>{t("tabs.about")}</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>

			<NativeTabs.Trigger name="settings">
				<NativeTabs.Trigger.Icon sf="gear" md="settings" />
				<NativeTabs.Trigger.Label>
					{t("tabs.settings")}
				</NativeTabs.Trigger.Label>
			</NativeTabs.Trigger>
		</NativeTabs>
	);
}
