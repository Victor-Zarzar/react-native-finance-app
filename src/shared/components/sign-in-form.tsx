import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router/build/hooks";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, type TextInput, View } from "react-native";
import { type SignInSchema, signInSchema } from "@/features/auth/schemas/user";
import { SocialConnections } from "@/shared/components/social-connections";
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
import { Separator } from "@/shared/components/ui/separator";
import { Text } from "@/shared/components/ui/text";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function SignInForm() {
	const router = useRouter();
	const { signIn } = useAuth();
	const passwordInputRef = React.useRef<TextInput>(null);

	const {
		control,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: { email: "", password: "" },
	});

	async function onSubmit({ email, password }: SignInSchema) {
		try {
			await signIn(email, password);
			router.replace("/(main)/(tabs)/home");
		} catch (err) {
			setError("root", {
				message: err instanceof Error ? err.message : "Something went wrong",
			});
		}
	}

	return (
		<View className="gap-6">
			<Card className="border-border/0 sm:border-border shadow-none sm:shadow-sm sm:shadow-black/5">
				<CardHeader>
					<CardTitle className="text-center text-xl sm:text-left">
						Sign in to your app
					</CardTitle>
					<CardDescription className="text-center sm:text-left">
						Welcome back! Please sign in to continue
					</CardDescription>
				</CardHeader>
				<CardContent className="gap-6">
					<View className="gap-6">
						<View className="gap-1.5">
							<Label htmlFor="email">Email</Label>
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, value } }) => (
									<Input
										id="email"
										placeholder="m@example.com"
										keyboardType="email-address"
										autoComplete="email"
										autoCapitalize="none"
										returnKeyType="next"
										submitBehavior="submit"
										onSubmitEditing={() => passwordInputRef.current?.focus()}
										onChangeText={onChange}
										value={value}
									/>
								)}
							/>
							{errors.email && (
								<Text className="text-destructive text-sm">
									{errors.email.message}
								</Text>
							)}
						</View>

						<View className="gap-1.5">
							<View className="flex-row items-center">
								<Label htmlFor="password">Password</Label>
								<Button
									variant="link"
									size="sm"
									className="web:h-fit ml-auto h-4 px-1 py-0 sm:h-4"
									onPress={() => router.push("/(auth)/forgot-password")}
								>
									<Text className="font-normal leading-4">
										Forgot your password?
									</Text>
								</Button>
							</View>
							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, value } }) => (
									<Input
										ref={passwordInputRef}
										id="password"
										secureTextEntry
										returnKeyType="send"
										onSubmitEditing={handleSubmit(onSubmit)}
										onChangeText={onChange}
										value={value}
									/>
								)}
							/>
							{errors.password && (
								<Text className="text-destructive text-sm">
									{errors.password.message}
								</Text>
							)}
						</View>

						{errors.root && (
							<Text className="text-destructive text-center text-sm">
								{errors.root.message}
							</Text>
						)}

						<Button
							className="w-full"
							onPress={handleSubmit(onSubmit)}
							disabled={isSubmitting}
						>
							<Text>{isSubmitting ? "Signing in..." : "Continue"}</Text>
						</Button>
					</View>

					<Text className="text-center text-sm">
						Don't have an account?{" "}
						<Pressable onPress={() => router.push("/(auth)/signup")}>
							<Text className="text-sm underline underline-offset-4">
								Sign up
							</Text>
						</Pressable>
					</Text>

					<View className="flex-row items-center">
						<Separator className="flex-1" />
						<Text className="text-muted-foreground px-4 text-sm">or</Text>
						<Separator className="flex-1" />
					</View>
					<SocialConnections />
				</CardContent>
			</Card>
		</View>
	);
}
