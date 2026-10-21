import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
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

import { radius, spacing } from "@/constants/clinikai-theme";
import { useClinikaiTheme } from "@/features/theme/theme.context";

const OTP_LENGTH = 6;
const RESEND_COUNTDOWN_SECONDS = 30;

export default function OtpVerificationScreen() {
  const { palette } = useClinikaiTheme();

  const { mobileNumber } = useLocalSearchParams<{
    mobileNumber?: string;
  }>();

  const [otp, setOtp] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(
    RESEND_COUNTDOWN_SECONDS,
  );
  const [errorMessage, setErrorMessage] = useState("");

  const otpInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (remainingSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setRemainingSeconds((currentSeconds) => currentSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  function handleOtpChange(value: string) {
    const sanitizedOtp = value.replace(/\D/g, "").slice(0, OTP_LENGTH);

    setOtp(sanitizedOtp);

    if (errorMessage) {
      setErrorMessage("");
    }
  }

  function handleVerifyOtp() {
    if (otp.length !== OTP_LENGTH) {
      setErrorMessage("Please enter the 6-digit OTP.");
      return;
    }
    router.replace("/(app)");
  }

  function handleResendOtp() {
    if (remainingSeconds > 0) {
      return;
    }

    setOtp("");
    setErrorMessage("");
    setRemainingSeconds(RESEND_COUNTDOWN_SECONDS);

      }

  function handleBack() {
    router.back();
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: palette.background,
        },
      ]}
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
        
          <Pressable
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
            onPress={handleBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text
              style={[
                styles.backButtonText,
                {
                  color: palette.textPrimary,
                },
              ]}
            >
              ‹
            </Text>
          </Pressable>

          
          <View style={styles.headerSection}>
            <View
              style={[
                styles.logoMark,
                {
                  backgroundColor: palette.azure,
                },
              ]}
            >
              <Text
                style={[
                  styles.logoText,
                  {
                    color: palette.onAzure,
                  },
                ]}
              >
                C
              </Text>
            </View>

            <Text
              style={[
                styles.brandName,
                {
                  color: palette.textPrimary,
                },
              ]}
            >
              ClinikAI
            </Text>

            <Text
              style={[
                styles.title,
                {
                  color: palette.textPrimary,
                },
              ]}
            >
              Verify your mobile number
            </Text>

            <Text
              style={[
                styles.description,
                {
                  color: palette.textSecondary,
                },
              ]}
            >
              Enter the 6-digit verification code sent to{" "}
              {mobileNumber ? `+91 ${mobileNumber}` : "your mobile number"}.
            </Text>
          </View>

          {/* OTP Form */}
          <View style={styles.formSection}>
            <Text
              style={[
                styles.label,
                {
                  color: palette.textSecondary,
                },
              ]}
            >
              Verification code
            </Text>

            <Pressable
              onPress={() => otpInputRef.current?.focus()}
              style={styles.otpContainer}
              accessibilityRole="button"
              accessibilityLabel="Enter verification code"
            >
              {Array.from({ length: OTP_LENGTH }).map((_, index) => {
                const isFilled = Boolean(otp[index]);
                const isActive = index === otp.length;

                return (
                  <View
                    key={index}
                    style={[
                      styles.otpBox,
                      {
                        backgroundColor: palette.card,
                        borderColor: palette.border,
                      },
                      isFilled && {
                        borderColor: palette.azure,
                      },
                      isActive && {
                        borderColor: palette.azure,
                        borderWidth: 2,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.otpText,
                        {
                          color: palette.textPrimary,
                        },
                      ]}
                    >
                      {otp[index] ?? ""}
                    </Text>
                  </View>
                );
              })}
            </Pressable>

            <TextInput
              ref={otpInputRef}
              value={otp}
              onChangeText={handleOtpChange}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              maxLength={OTP_LENGTH}
              style={styles.hiddenInput}
              autoFocus
              accessibilityLabel="Enter verification code"
            />

            {/* Error */}
            {errorMessage ? (
              <Text
                style={[
                  styles.errorMessage,
                  {
                    color: palette.critical,
                  },
                ]}
                accessibilityRole="alert"
              >
                {errorMessage}
              </Text>
            ) : null}

            {/* Verify */}
            <Pressable
              style={({ pressed }) => [
                styles.verifyButton,
                {
                  backgroundColor: palette.azure,
                },
                pressed && styles.buttonPressed,
              ]}
              onPress={handleVerifyOtp}
              accessibilityRole="button"
              accessibilityLabel="Verify OTP"
            >
              <Text
                style={[
                  styles.verifyButtonText,
                  {
                    color: palette.onAzure,
                  },
                ]}
              >
                Verify
              </Text>
            </Pressable>

            {/* Resend */}
            <View style={styles.resendContainer}>
              {remainingSeconds > 0 ? (
                <Text
                  style={[
                    styles.resendText,
                    {
                      color: palette.textSecondary,
                    },
                  ]}
                >
                  Resend code in {remainingSeconds}s
                </Text>
              ) : (
                <Pressable
                  onPress={handleResendOtp}
                  accessibilityRole="button"
                  accessibilityLabel="Resend OTP"
                >
                  <Text
                    style={[
                      styles.resendLink,
                      {
                        color: palette.azure,
                      },
                    ]}
                  >
                    Resend code
                  </Text>
                </Pressable>
              )}
            </View>
          </View>

          <View
            style={[
              styles.securityCard,
              {
                backgroundColor: palette.cardRaised,
                borderColor: palette.border,
              },
            ]}
          >
            <Text
              style={[
                styles.securityTitle,
                {
                  color: palette.textPrimary,
                },
              ]}
            >
              Your account is protected
            </Text>

            <Text
              style={[
                styles.securityText,
                {
                  color: palette.textSecondary,
                },
              ]}
            >
              Mobile verification helps keep your ClinikAI health records
              secure and ensures that only you can access your account.
            </Text>
          </View>
        </View>
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

  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },

  backButtonText: {
    fontSize: 36,
    lineHeight: 38,
    fontWeight: "300",
  },

  logoMark: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },

  logoText: {
    fontSize: 18,
    fontWeight: "700",
  },

  brandName: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: spacing.xl,
  },

  headerSection: {
    marginBottom: spacing.xxl,
  },

  title: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },

  description: {
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 520,
  },

  formSection: {
    gap: spacing.md,
  },

  label: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
    alignSelf: "flex-start",
  },

  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },

  otpText: {
    fontSize: 22,
    fontWeight: "600",
  },

  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },

  errorMessage: {
    fontSize: 12,
    lineHeight: 18,
  },

  verifyButton: {
    height: 52,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
  },

  verifyButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },

  buttonPressed: {
    opacity: 0.78,
  },

  resendContainer: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  resendText: {
    fontSize: 13,
  },

  resendLink: {
    fontSize: 13,
    fontWeight: "700",
  },

  securityCard: {
    marginTop: "auto",
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },

  securityTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },

  securityText: {
    fontSize: 11,
    lineHeight: 17,
  },

  pressed: {
    opacity: 0.65,
  },
});