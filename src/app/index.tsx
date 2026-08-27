import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push("/register");
  };

  const handleLogin = () => {
    router.push("./login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>C</Text>
          </View>

          <Text style={styles.brandName}>ClinikAI</Text>

          <Text style={styles.tagline}>
            Your health.{"\n"}
            Organized. Connected.
          </Text>
        </View>

        <View style={styles.messageSection}>
          <Text style={styles.title}>
            Your healthcare journey,{"\n"}
            all in one place.
          </Text>

          <Text style={styles.description}>
            Manage appointments, medical records, prescriptions and your
            healthcare information with ClinikAI.
          </Text>
        </View>

        <View style={styles.actionSection}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleGetStarted}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.secondaryButtonText}>
              Already have an account?{" "}
              <Text style={styles.loginText}>Log in</Text>
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    justifyContent: "space-between",
  },

  brandSection: {
    alignItems: "center",
    paddingTop: 40,
  },

  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#1677FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "700",
  },

  brandName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  tagline: {
    textAlign: "center",
    fontSize: 15,
    lineHeight: 22,
    color: "#6B7280",
  },

  messageSection: {
    alignItems: "center",
    paddingHorizontal: 8,
  },

  title: {
    textAlign: "center",
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },

  description: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    color: "#6B7280",
  },

  actionSection: {
    gap: 14,
  },

  primaryButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#1677FF",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#6B7280",
    fontSize: 14,
  },

  loginText: {
    color: "#1677FF",
    fontWeight: "600",
  },

  buttonPressed: {
    opacity: 0.75,
  },
});
