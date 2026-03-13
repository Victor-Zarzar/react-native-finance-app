import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useSQLiteContext } from "expo-sqlite";
import type React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import migrations from "../../../drizzle/migrations";
import * as schema from "./schema";

export function MigrationGate({ children }: { children: React.ReactNode }) {
	const sqlite = useSQLiteContext();
	const db = drizzle(sqlite, { schema });
	const { success, error } = useMigrations(db, migrations);

	if (error) {
		return (
			<View className="flex-1 justify-center items-center">
				<Text className="text-red-500">Migration error: {error.message}</Text>
			</View>
		);
	}

	if (!success) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	}

	return <>{children}</>;
}
