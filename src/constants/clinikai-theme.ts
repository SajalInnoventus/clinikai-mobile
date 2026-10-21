import { Platform } from "react-native";
export type ColorScheme = "light" | "dark";

export interface ClinikaiPalette {
  background: string;
  card: string;
  cardRaised: string;
  border: string;

  azure: string;
  azureMuted: string;
  onAzure: string;

  mitra: string;
  mitraMuted: string;
  onMitra: string;

  success: string;
  successMuted: string;
  warning: string;
  warningMuted: string;
  critical: string;
  criticalMuted: string;

  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

export const lightPalette: ClinikaiPalette = {
  background: "#F6F8FC",
  card: "#FFFFFF",
  cardRaised: "#F1F4F9",
  border: "#E4E7EC",

  azure: "#450920",
  azureMuted: "#E8F2FF",
  onAzure: "#FFFFFF",

  mitra: "#7C3AED",
  mitraMuted: "#F1E8FE",
  onMitra: "#FFFFFF",

  success: "#12B76A",
  successMuted: "#E7F8EF",
  warning: "#F79009",
  warningMuted: "#FEF0DC",
  critical: "#F04438",
  criticalMuted: "#FDEAE9",

  textPrimary: "#111827",
  textSecondary: "#667085",
  textMuted: "#98A2B3",
};

export const darkPalette: ClinikaiPalette = {
  background: "#0D1017",
  card: "#161B24",
  cardRaised: "#1D232F",
  border: "#2A303C",

  azure: "#1677FF",
  azureMuted: "#122A4A",
  onAzure: "#FFFFFF",

  mitra: "#8B5CF6",
  mitraMuted: "#2C1F49",
  onMitra: "#FFFFFF",

  success: "#12B76A",
  successMuted: "#0F2E22",
  warning: "#F79009",
  warningMuted: "#3A2A0E",
  critical: "#F04438",
  criticalMuted: "#3A1917",

  textPrimary: "#F2F4F7",
  textSecondary: "#9AA2B1",
  textMuted: "#667085",
};

export function getPalette(scheme: ColorScheme): ClinikaiPalette {
  return scheme === "dark" ? darkPalette : lightPalette;
}

export const aiGradient = {
  light: ["#1677FF", "#7C3AED"],
  dark: ["#1677FF", "#8B5CF6"],
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 22,
  full: 999,
};

export const typography = {
  greeting: { fontSize: 13, fontWeight: "500" as const },
  name: { fontSize: 22, fontWeight: "700" as const },
  screenTitle: { fontSize: 18, fontWeight: "600" as const },
  cardTitle: { fontSize: 15, fontWeight: "600" as const },
  cardSubtitle: { fontSize: 12, fontWeight: "400" as const },
  body: { fontSize: 13, fontWeight: "400" as const },
  caption: { fontSize: 11, fontWeight: "500" as const },
};
export type ThemeColor =
  | "background"
  | "backgroundSelected"
  | "backgroundElement"
  | "text"
  | "textSecondary";

export const Colors = {
  light: {
    background: lightPalette.background,
    backgroundSelected: lightPalette.cardRaised,
    backgroundElement: lightPalette.card,
    text: lightPalette.textPrimary,
    textSecondary: lightPalette.textSecondary,
  },

  dark: {
    background: darkPalette.background,
    backgroundSelected: darkPalette.cardRaised,
    backgroundElement: darkPalette.card,
    text: darkPalette.textPrimary,
    textSecondary: darkPalette.textSecondary,
  },
} as const;

export const Spacing = {
  half: spacing.xs,
  two: spacing.sm,
  three: spacing.md,
  four: spacing.lg,
  five: spacing.xl,
} as const;

export const Fonts = {
  mono: Platform.select({
    ios: "Menlo",
    android: "monospace",
    default: "monospace",
  }),
} as const;