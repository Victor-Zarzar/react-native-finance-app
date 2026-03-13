import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Text } from "@/shared/components/ui/text";
import { createPasswordResetToken } from "@/features/auth/services/userService";

export function ForgotPasswordForm() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function onSubmit() {
		if (!email) return;
		setLoading(true);
		try {
			const token = await createPasswordResetToken(email);
			router.push({ pathname: "/(auth)/reset-password", params: { token } });
		} finally {
			setLoading(false);
		}
	}

	return (
		<View className="gap-6">
			<Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
				<CardHeader>
					<CardTitle className="text-center text-xl sm:text-left">
						Forgot password?
					</CardTitle>
					<CardDescription className="text-center sm:text-left">
						Enter your email to reset your password
					</CardDescription>
				</CardHeader>
				<CardContent className="gap-6">
					<View className="gap-6">
						<View className="gap-1.5">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="m@example.com"
								keyboardType="email-address"
								autoComplete="email"
								autoCapitalize="none"
								returnKeyType="send"
								onSubmitEditing={onSubmit}
								value={email}
								onChangeText={setEmail}
							/>
						</View>
						<Button className="w-full" onPress={onSubmit} disabled={loading}>
							<Text>Reset your password</Text>
						</Button>
					</View>
				</CardContent>
			</Card>
		</View>
	);
}
