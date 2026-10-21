import { Stack } from "expo-router";

import { PatientProvider } from "@/features/patient/patient.context";
import { VisitProvider } from "@/features/visit/visit.context";
import { ThemeProvider } from "@/features/theme/theme.context";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <PatientProvider>
        <VisitProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(app)" />
          </Stack>
        </VisitProvider>
      </PatientProvider>
    </ThemeProvider>
  );
}