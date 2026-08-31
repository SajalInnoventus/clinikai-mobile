import { router } from "expo-router";
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

const OTP_LENGTH = 6;
const RESEND_COUNTDOWN_SECONDS = 30;

export default function OtpVerificationScreen() {
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

  const handleOtpChange = (value: string) => {
    const sanitizedOtp = value.replace(/\D/g, "").slice(0, OTP_LENGTH);

    setOtp(sanitizedOtp);

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length !== OTP_LENGTH) {
      setErrorMessage("Please enter the 6-digit OTP.");
      return;
    }

    router.replace("/");
  };

  const handleResendOtp = () => {
    if (remainingSeconds > 0) {
      return;
    }

    setOtp("");
    setErrorMessage("");
    setRemainingSeconds(RESEND_COUNTDOWN_SECONDS);
  };

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
            <Text style={styles.brandName}>ClinikAI</Text>

            <Text style={styles.title}>Verify your mobile number</Text>

            <Text style={styles.description}>
              Enter the 6-digit verification code sent to your mobile number.
            </Text>
          </View>

          <View style={styles.formSection}>
            <Text style={styles.label}>Verification code</Text>

            <Pressable
              onPress={() => otpInputRef.current?.focus()}
              style={styles.otpContainer}
            >
              {Array.from({ length: OTP_LENGTH }).map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.otpBox,
                    otp[index] && styles.otpBoxFilled,
                    index === otp.length && styles.otpBoxActive,
                  ]}
                >
                  <Text style={styles.otpText}>{otp[index] ?? ""}</Text>
                </View>
              ))}
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

            {errorMessage ? (
              <Text style={styles.errorMessage} accessibilityRole="alert">
                {errorMessage}
              </Text>
            ) : null}

            <Pressable
              style={({ pressed }) => [
                styles.verifyButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleVerifyOtp}
              accessibilityRole="button"
              accessibilityLabel="Verify OTP"
            >
              <Text style={styles.verifyButtonText}>Verify</Text>
            </Pressable>

            <View style={styles.resendContainer}>
              {remainingSeconds > 0 ? (
                <Text style={styles.resendText}>
                  Resend code in {remainingSeconds}s
                </Text>
              ) : (
                <Pressable
                  onPress={handleResendOtp}
                  accessibilityRole="button"
                  accessibilityLabel="Resend OTP"
                >
                  <Text style={styles.resendLink}>Resend code</Text>
                </Pressable>
              )}
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
    gap: 16,
  },

  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
    color: "#374151",
  },

  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },

  otpBox: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  otpBoxFilled: {
    borderColor: "#1677FF",
  },

  otpBoxActive: {
    borderColor: "#1677FF",
    borderWidth: 2,
  },

  otpText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
  },

  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },

  errorMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: "#DC2626",
  },

  verifyButton: {
    height: 54,
    borderRadius: 14,
    backgroundColor: "#1677FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  buttonPressed: {
    opacity: 0.75,
  },

  resendContainer: {
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  resendText: {
    fontSize: 14,
    color: "#6B7280",
  },

  resendLink: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1677FF",
  },
});
