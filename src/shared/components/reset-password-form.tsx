import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle2, XCircle } from "lucide-react-native";
import { useState } from "react";
import { View } from "react-native";
import { resetPassword } from "@/features/auth/services/userService";
import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Text } from "@/shared/components/ui/text";

export function ResetPasswordForm() {
	const { token } = useLocalSearchParams<{ token: string }>();
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState<{
		type: "success" | "error";
		message: string;
	} | null>(null);
	const router = useRouter();

	async function onSubmit() {
		if (!password || !token) return;
		setLoading(true);
		setAlert(null);
		try {
			await resetPassword(token, password);
			setAlert({ type: "success", message: "Password updated successfully!" });
			setTimeout(() => router.replace("/(auth)/signin"), 2000);
		} catch (err) {
			setAlert({ type: "error", message: (err as Error).message });
		} finally {
			setLoading(false);
		}
	}

	return (
		<View className="gap-6 mt-20">
			{alert && (
				<Alert
					className="w-3/4 mx-auto"
					icon={alert.type === "success" ? CheckCircle2 : XCircle}
				>
					<AlertTitle>
						{alert.type === "success" ? "Success" : "Error"}
					</AlertTitle>
					<AlertDescription>{alert.message}</AlertDescription>
				</Alert>
			)}

			<Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
				<CardHeader>
					<CardTitle className="text-center text-xl sm:text-left">
						Reset password
					</CardTitle>
				</CardHeader>
				<CardContent className="gap-6">
					<View className="gap-6">
						<View className="gap-1.5">
							<Label htmlFor="password">New password</Label>
							<Input
								id="password"
								placeholder="New password"
								secureTextEntry
								value={password}
								onChangeText={setPassword}
								returnKeyType="send"
								onSubmitEditing={onSubmit}
							/>
						</View>
						<Button className="w-full" onPress={onSubmit} disabled={loading}>
							<Text>Save new password</Text>
						</Button>
					</View>
				</CardContent>
			</Card>
		</View>
	);
}
