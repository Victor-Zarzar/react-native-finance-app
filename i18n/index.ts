import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import type { Locale } from "@/shared/types/locale";
import translationEn from "./locales/en-US/translation.json";
import translationEs from "./locales/es-ES/translation.json";
import translationPt from "./locales/pt-BR/translation.json";

export const resources = {
	"pt-BR": { translation: translationPt },
	"en-US": { translation: translationEn },
	"es-ES": { translation: translationEs },
} as const;

const initI18n = async () => {
	let savedLanguage = (await AsyncStorage.getItem("language")) as Locale | null;

	if (!savedLanguage) {
		savedLanguage = Localization.getLocales()[0]?.languageTag as Locale;
	}

	i18n.use(initReactI18next).init({
		compatibilityJSON: "v4",
		resources,
		lng: savedLanguage,
		fallbackLng: "en-US",
		interpolation: {
			escapeValue: false,
		},
	});
};

initI18n();

export default i18n;
