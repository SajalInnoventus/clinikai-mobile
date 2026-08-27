import { router } from "expo-router";
import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PatientRegistrationForm } from "@/features/authentication/types/patient-registration.types";
import { validatePatientRegistration } from "@/features/authentication/validation/patient-registration.validation";

export default function PatientRegistrationScreen() {
  const [form, setForm] = useState<PatientRegistrationForm>({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    dateOfBirth: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const updateField = (field: keyof PatientRegistrationForm, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleContinue = () => {
    const validationResult = validatePatientRegistration(form, acceptedTerms);

    if (!validationResult.isValid) {
      setErrorMessage(
        validationResult.message ?? "Please check your information.",
      );
      return;
    }

    router.push("./verify-otp");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerSection}>
            <Text style={styles.brandName}>ClinikAI</Text>

            <Text style={styles.title}>Create your account</Text>

            <Text style={styles.description}>
              Create your ClinikAI patient account to manage your appointments
              and healthcare information.
            </Text>
          </View>

          <View style={styles.formSection}>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Full name</Text>

              <TextInput
                value={form.fullName}
                onChangeText={(value) => updateField("fullName", value)}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                autoCorrect={false}
                style={styles.input}
                returnKeyType="next"
                accessibilityLabel="Full name"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Mobile number</Text>

              <TextInput
                value={form.mobileNumber}
                onChangeText={(value) => updateField("mobileNumber", value)}
                placeholder="Enter your mobile number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                maxLength={10}
                style={styles.input}
                accessibilityLabel="Mobile number"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Email address <Text style={styles.optional}>(Optional)</Text>
              </Text>

              <TextInput
                value={form.emailAddress}
                onChangeText={(value) => updateField("emailAddress", value)}
                placeholder="Enter your email address"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                accessibilityLabel="Email address"
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Date of birth</Text>

              <TextInput
                value={form.dateOfBirth}
                onChangeText={(value) => updateField("dateOfBirth", value)}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#9CA3AF"
                keyboardType="numbers-and-punctuation"
                maxLength={10}
                style={styles.input}
                accessibilityLabel="Date of birth"
              />
            </View>

            {errorMessage ? (
              <Text style={styles.errorMessage} accessibilityRole="alert">
                {errorMessage}
              </Text>
            ) : null}

            <Pressable
              style={styles.consentRow}
              onPress={() => setAcceptedTerms((current) => !current)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: acceptedTerms }}
            >
              <View
                style={[
                  styles.checkbox,
                  acceptedTerms && styles.checkboxSelected,
                ]}
              >
                {acceptedTerms ? <Text style={styles.checkmark}>✓</Text> : null}
              </View>

              <Text style={styles.consentText}>
                I agree to the ClinikAI terms and acknowledge the privacy
                information provided by ClinikAI.
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.continueButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleContinue}
              accessibilityRole="button"
              accessibilityLabel="Continue registration"
            >
              <Text style={styles.continueButtonText}>Continue</Text>
            </Pressable>

            <Pressable
              style={styles.loginAction}
              onPress={() => router.push("./login")}
              accessibilityRole="button"
            >
              <Text style={styles.loginText}>
                Already have an account?{" "}
                <Text style={styles.loginLink}>Log in</Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
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

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },

  headerSection: {
    marginBottom: 32,
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

  optional: {
    fontWeight: "400",
    color: "#9CA3AF",
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

  errorMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: "#DC2626",
    marginTop: -8,
  },

  consentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },

  checkboxSelected: {
    backgroundColor: "#1677FF",
    borderColor: "#1677FF",
  },

  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  consentText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,
    color: "#6B7280",
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

  loginAction: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  loginText: {
    fontSize: 14,
    color: "#6B7280",
  },

  loginLink: {
    color: "#1677FF",
    fontWeight: "600",
  },

  buttonPressed: {
    opacity: 0.75,
  },
});
