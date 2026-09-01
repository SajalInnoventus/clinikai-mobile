import { PatientLoginForm } from "@/features/authentication/types/patient-login.types";
import { validatePatientLogin } from "@/features/authentication/validation/patient-login.validation";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PatientLoginScreen() {
  const [form, setForm] = useState<PatientLoginForm>({
    mobileNumber: "",
  });
  const [errorMessage, SetErrorMessage] = useState("");
  const UpdateMobileNumber = (value: string) => {
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 10);

    setForm((currentForm) => ({
      ...currentForm,
      mobileNumber: sanitizedValue,
    }));

    if (errorMessage) {
      SetErrorMessage("");
    }
  };
  const handleContinue = () => {
    const validationResult = validatePatientLogin(form);

    if (!validationResult.isValid) {
      SetErrorMessage(
        validationResult.message ?? "Please check your Mobile Number",
      );
      return;
    }
    router.push({
  pathname: "./verify-otp",
  params: {
    mobileNumber: form.mobileNumber,
  },
});
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>

          <View style={styles.headerSection}>
            <Text style={styles.brandName}> ClinikAI</Text>

            <Text style={styles.title}>Welcome Back</Text>

            <Text style={styles.description}>
              Enter your Registered Mobile Numebr to Continue your ClinikAI
              Profile.
            </Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Mobile Number</Text>

              <TextInput
                value={form.mobileNumber}
                onChangeText={UpdateMobileNumber}
                placeholder="Enter Your Mobile Number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                maxLength={10}
                style={[styles.input, errorMessage && styles.inputError]}
                returnKeyType="done"
                onSubmitEditing={handleContinue}
                accessibilityLabel="Mobile Number"
                autoComplete="tel"
              />

              {errorMessage ? (
                <Text style={styles.errorMessage} accessibilityRole="alert">
                  {errorMessage}
                </Text>
              ) : null}
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.continueButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleContinue}
              accessibilityRole="button"
              accessibilityLabel="Continue Login"
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </Pressable>
            <View style={styles.registrationContainer}>
              <Text style={styles.registrationText}>
                Don't have an account?
              </Text>

              <Pressable
                onPress={() => router.push("./register")}
                accessibilityRole="button"
                accessibilityLabel="Create a New Account"
              >
                <Text style={styles.registrationLink}> Create account</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  keyboardContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  backButtonText: {
    fontSize: 34,
    lineHeight: 36,
    color: "#111827",
  },

  headerSection: {
    marginBottom: 40,
  },

  brandName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1677FF",
    marginBottom: 28,
  },

  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#6B7280",
  },

  formSection: {
    gap: 20,
  },

  fieldContainer: {
    gap: 8,
  },

  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
  },

  inputError: {
    borderColor: "#DC2626",
  },

  errorMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: "#DC2626",
  },

  continueButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#1677FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  buttonPressed: {
    opacity: 0.75,
  },

  registrationContainer: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  registrationText: {
    fontSize: 14,
    color: "#6B7280",
  },

  registrationLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1677FF",
  },
});
