import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import type React from "react";
import { MigrationGate } from "./db-migration";

function DrizzleStudio() {
	const db = useSQLiteContext();
	useDrizzleStudio(db);
	return null;
}

export function DbProvider({ children }: { children: React.ReactNode }) {
	return (
		<SQLiteProvider databaseName="app.db" useSuspense>
			<DrizzleStudio />
			<MigrationGate>{children}</MigrationGate>
		</SQLiteProvider>
	);
}
