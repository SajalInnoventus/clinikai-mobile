import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome back</Text>

        <Text style={styles.description}>
          Sign in to continue to ClinikAI OS.
        </Text>

        <Text style={styles.label}>Mobile number</Text>

        <TextInput
          style={styles.input}
          placeholder="+91 XXXXX XXXXX"
          keyboardType="phone-pad"
          placeholderTextColor="#9CA3AF"
        />

        <Pressable
          style={styles.button}
          onPress={() => router.replace("/(app)/home")}
        >
          <Text style={styles.buttonText}>
            Continue
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/(auth)/register")}
        >
          <Text style={styles.registerText}>
            Don't have an account?{" "}
            <Text style={styles.registerLink}>
              Create account
            </Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    marginTop: 8,
    marginBottom: 36,
    fontSize: 16,
    color: "#6B7280",
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
  },

  button: {
    height: 54,
    marginTop: 20,
    borderRadius: 14,
    backgroundColor: "#1677FF",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },

  registerText: {
    marginTop: 24,
    textAlign: "center",
    color: "#6B7280",
  },

  registerLink: {
    color: "#1677FF",
    fontWeight: "600",
  },
});