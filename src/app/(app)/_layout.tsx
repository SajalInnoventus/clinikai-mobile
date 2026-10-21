import { Stack } from "expo-router";

import { RecordsProvider } from "@/features/records/records.context";

export default function AppGroupLayout() {
  return (
    <RecordsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RecordsProvider>
  );
}
