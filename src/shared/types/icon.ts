import type { LucideIcon } from "lucide-react-native";
import type { SvgProps } from "react-native-svg";

export type Step = {
	step: string;
	title: string;
	description: string;
	icon: LucideIcon;
};

export type SvgComponentProps = SvgProps & {
	xmlns?: string;
};
