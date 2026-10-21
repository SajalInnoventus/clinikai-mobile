import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import {
  ClinikaiPalette,
  ColorScheme,
  getPalette,
} from "@/constants/clinikai-theme";

type ThemePreference = "light" | "dark" | "system";

interface ThemeContextValue {
  scheme: ColorScheme;
  palette: ClinikaiPalette;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();

  const [preference, setPreference] =
    useState<ThemePreference>("system");

  const scheme: ColorScheme =
    preference === "system"
      ? systemScheme === "dark"
        ? "dark"
        : "light"
      : preference;

  const palette = useMemo(
    () => getPalette(scheme),
    [scheme],
  );

  const value = useMemo(
    () => ({
      scheme,
      palette,
      preference,
      setPreference,
    }),
    [scheme, palette, preference],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useClinikaiTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useClinikaiTheme must be used within a ThemeProvider",
    );
  }

  return context;
}