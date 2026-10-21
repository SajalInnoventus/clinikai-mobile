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
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { radius, spacing } from "@/constants/clinikai-theme";
import { useClinikaiTheme } from "@/features/theme/theme.context";

export default function ForgotPasswordScreen() {
  const { width } = useWindowDimensions();
  const { palette } = useClinikaiTheme();

  const isWideScreen = width >= 900;

  const [emailAddress, setEmailAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmailAddress(value);

    if (errorMessage) {
      setErrorMessage("");
    }

    if (submitted) {
      setSubmitted(false);
    }
  };

  const handleSendResetLink = () => {
    const normalizedEmail = emailAddress.trim();

    if (!normalizedEmail) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setErrorMessage("");
    setSubmitted(true);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: palette.background },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            isWideScreen && styles.wideScrollContent,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.pageContainer,
              isWideScreen && styles.widePageContainer,
            ]}
          >
            <Pressable
              onPress={() => router.push("./login")}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Back to login"
            >
              <Text
                style={[
                  styles.backArrow,
                  { color: palette.textPrimary },
                ]}
              >
                ←
              </Text>

              <Text
                style={[
                  styles.backText,
                  { color: palette.textSecondary },
                ]}
              >
                Back to login
              </Text>
            </Pressable>

            <View style={styles.headerSection}>
              <View
                style={[
                  styles.logoMark,
                  { backgroundColor: palette.azureMuted },
                ]}
              >
                <Text
                  style={[
                    styles.logoText,
                    { color: palette.azure },
                  ]}
                >
                  C
                </Text>
              </View>

              <Text
                style={[
                  styles.title,
                  { color: palette.textPrimary },
                ]}
              >
                Forgot your password?
              </Text>

              <Text
                style={[
                  styles.description,
                  { color: palette.textSecondary },
                ]}
              >
                Enter the email address associated with your ClinikAI
                account and we'll help you reset your password.
              </Text>
            </View>

            <View
              style={[
                styles.formCard,
                {
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                },
              ]}
            >
              {submitted ? (
                <View style={styles.successContainer}>
                  <View
                    style={[
                      styles.successIcon,
                      { backgroundColor: palette.success },
                    ]}
                  >
                    <Text style={styles.successIconText}>✓</Text>
                  </View>

                  <Text
                    style={[
                      styles.successTitle,
                      { color: palette.textPrimary },
                    ]}
                  >
                    Check your email
                  </Text>

                  <Text
                    style={[
                      styles.successMessage,
                      { color: palette.textSecondary },
                    ]}
                  >
                    If an account exists for {emailAddress.trim()},
                    we'll send instructions to reset your password.
                  </Text>

                  <Pressable
                    onPress={() => router.push("./login")}
                    style={({ pressed }) => [
                      styles.primaryButton,
                      { backgroundColor: palette.azure },
                      pressed && styles.buttonPressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel="Back to login"
                  >
                    <Text
                      style={[
                        styles.primaryButtonText,
                        { color: palette.onAzure },
                      ]}
                    >
                      Back to login
                    </Text>
                  </Pressable>
                </View>
              ) : (
                <>
                  <View style={styles.fieldContainer}>
                    <Text
                      style={[
                        styles.label,
                        { color: palette.textPrimary },
                      ]}
                    >
                      Email address
                    </Text>

                    <TextInput
                      value={emailAddress}
                      onChangeText={handleEmailChange}
                      placeholder="Enter your email address"
                      placeholderTextColor={palette.textMuted}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="email"
                      style={[
                        styles.input,
                        {
                          color: palette.textPrimary,
                          backgroundColor: palette.cardRaised,
                          borderColor: errorMessage
                            ? palette.critical
                            : palette.border,
                        },
                      ]}
                      accessibilityLabel="Email address"
                    />

                    {errorMessage ? (
                      <Text
                        style={[
                          styles.errorMessage,
                          { color: palette.critical },
                        ]}
                        accessibilityRole="alert"
                      >
                        {errorMessage}
                      </Text>
                    ) : null}
                  </View>

                  <Pressable
                    onPress={handleSendResetLink}
                    style={({ pressed }) => [
                      styles.primaryButton,
                      { backgroundColor: palette.azure },
                      pressed && styles.buttonPressed,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel="Send password reset link"
                  >
                    <Text
                      style={[
                        styles.primaryButtonText,
                        { color: palette.onAzure },
                      ]}
                    >
                      Send reset link
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => router.push("./login")}
                    style={styles.loginAction}
                    accessibilityRole="button"
                  >
                    <Text
                      style={[
                        styles.loginText,
                        { color: palette.textSecondary },
                      ]}
                    >
                      Remember your password?{" "}
                      <Text
                        style={[
                          styles.loginLink,
                          { color: palette.azure },
                        ]}
                      >
                        Log in
                      </Text>
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },

  wideScrollContent: {
    justifyContent: "center",
  },

  pageContainer: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },

  widePageContainer: {
    maxWidth: 560,
  },

  backButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    minHeight: 44,
    marginBottom: spacing.xxl,
  },

  backArrow: {
    fontSize: 22,
    lineHeight: 24,
  },

  backText: {
    fontSize: 14,
    fontWeight: "500",
  },

  headerSection: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },

  logoMark: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },

  logoText: {
    fontSize: 24,
    fontWeight: "800",
  },

  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: spacing.md,
  },

  description: {
    maxWidth: 440,
    fontSize: 15,
    lineHeight: 23,
    textAlign: "center",
  },

  formCard: {
    width: "100%",
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.xxl,
  },

  fieldContainer: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },

  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
  },

  errorMessage: {
    fontSize: 13,
    lineHeight: 19,
  },

  primaryButton: {
    height: 54,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    fontSize: 15,
    fontWeight: "600",
  },

  loginAction: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
  },

  loginText: {
    fontSize: 14,
  },

  loginLink: {
    fontWeight: "600",
  },

  buttonPressed: {
    opacity: 0.75,
  },

  successContainer: {
    alignItems: "center",
  },

  successIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.full,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },

  successIconText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },

  successTitle: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    marginBottom: spacing.sm,
    textAlign: "center",
  },

  successMessage: {
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
});