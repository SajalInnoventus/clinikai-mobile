import { router } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FloatingMitraButton() {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      style={[
        styles.button,
        { bottom: insets.bottom + 92 },
      ]}
      onPress={() => router.push("/(app)/clinikAi-assistant" as never)}
      accessibilityRole="button"
      accessibilityLabel="Open Mitra AI assistant"
      accessibilityHint="Opens the assistant without replacing the current screen"
    >
      <Image
        source={require("@/../assets/images/clinikai-ai-logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 18,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    zIndex: 20,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  logo: {
    width: 48,
    height: 48,
  },
});