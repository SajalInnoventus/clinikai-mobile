import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Image,
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

import {
  detectLoginMode,
  EmailLoginForm,
} from "@/features/authentication/types/email-login.types";
import { usePatient } from "@/features/patient/patient.context";
import { radius, spacing } from "@/constants/clinikai-theme";
import { useClinikaiTheme } from "@/features/theme/theme.context";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateLogin(form: EmailLoginForm) {
  const identifier = form.identifier.trim();
  const mode = detectLoginMode(identifier);

  if (!identifier) {
    return { isValid: false, message: "Enter your email or mobile number" };
  }

  if (mode === "mobile") {
    if (identifier.length !== 10) {
      return { isValid: false, message: "Enter a valid 10-digit mobile number" };
    }
    return { isValid: true, message: null };
  }

  if (!emailPattern.test(identifier)) {
    return { isValid: false, message: "Enter a valid email address" };
  }
  if (form.password.length < 8) {
    return { isValid: false, message: "Enter your password" };
  }
  return { isValid: true, message: null };
}

export default function PatientLoginScreen() {
  const { palette } = useClinikaiTheme();
  const { profile } = usePatient();
  const { width } = useWindowDimensions();
  const isWideLayout = width >= 900;

  const [form, setForm] = useState<EmailLoginForm>({ identifier: "", password: "" });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginMode = useMemo(() => detectLoginMode(form.identifier), [form.identifier]);

  function updateField(field: keyof EmailLoginForm, value: string) {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  function updateIdentifier(value: string) {
    const nextValue = /^\d*$/.test(value) ? value.slice(0, 10) : value;
    updateField("identifier", nextValue);
  }

  function handleContinue() {
    const validationResult = validateLogin(form);

    if (!validationResult.isValid) {
      setErrorMessage(validationResult.message ?? "We couldn't sign you in.");
      return;
    }

    const mobileNumber =
      loginMode === "mobile" ? form.identifier.trim() : profile.mobileNumber;

    router.push({
      pathname: "./verify-otp",
      params: { mobileNumber },
    });
  }

  function handleGoogleSignIn() {
    setErrorMessage("Google sign-in isn't connected yet.");
  }

  function handleAppleSignIn() {
    setErrorMessage("Apple sign-in isn't connected yet.");
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            isWideLayout ? styles.rowLayout : styles.columnLayout,
          ]}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[
              styles.imagePanel,
              isWideLayout ? styles.imagePanelWide : styles.imagePanelNarrow,
              { backgroundColor: palette.cardRaised },
            ]}
          >
            <Image
              source={require("@/../assets/images/login-hero.jpg")}
              style={styles.heroImage}
              resizeMode="cover"
            />
          </View>

          <View
            style={[
              styles.formPanel,
              isWideLayout ? styles.formPanelWide : styles.formPanelNarrow,
              { backgroundColor: palette.card, borderColor: palette.border },
            ]}
          >
            <View style={styles.headerBlock}>
              <View style={[styles.logoMark, { backgroundColor: palette.azure }]}>
                <Text style={styles.logoGlyph}>C</Text>
              </View>

              <Text style={[styles.title, { color: palette.textPrimary }]}>
                ClinikAI welcomes you
              </Text>
              <Text style={[styles.subtitle, { color: palette.textSecondary }]}>
                Sign in to continue
              </Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: palette.textSecondary }]}>
                Email or mobile number
              </Text>
              <TextInput
                value={form.identifier}
                onChangeText={updateIdentifier}
                placeholder="name@example.com or 10-digit number"
                placeholderTextColor={palette.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={loginMode === "mobile" ? "phone-pad" : "email-address"}
                style={[
                  styles.input,
                  {
                    backgroundColor: palette.background,
                    borderColor: palette.border,
                    color: palette.textPrimary,
                  },
                ]}
                accessibilityLabel="Email or mobile number"
              />
            </View>

            {loginMode === "email" && (
              <View style={styles.fieldGroup}>
                <Text style={[styles.label, { color: palette.textSecondary }]}>Password</Text>
                <View style={styles.passwordRow}>
                  <TextInput
                    value={form.password}
                    onChangeText={(value) => updateField("password", value)}
                    placeholder="Enter your password"
                    placeholderTextColor={palette.textMuted}
                    secureTextEntry={!isPasswordVisible}
                    style={[
                      styles.input,
                      styles.passwordInput,
                      {
                        backgroundColor: palette.background,
                        borderColor: palette.border,
                        color: palette.textPrimary,
                      },
                    ]}
                    accessibilityLabel="Password"
                  />
                  <Pressable
                    onPress={() => setIsPasswordVisible((current) => !current)}
                    style={styles.eyeButton}
                    accessibilityRole="button"
                    accessibilityLabel={isPasswordVisible ? "Hide password" : "Show password"}
                  >
                    <Ionicons
                      name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                      size={18}
                      color={palette.textMuted}
                    />
                  </Pressable>
                </View>
              </View>
            )}

            {errorMessage ? (
              <Text style={[styles.errorMessage, { color: palette.critical }]} accessibilityRole="alert">
                {errorMessage}
              </Text>
            ) : null}

            {loginMode === "email" && (
              <Pressable style={styles.forgotPasswordButton} 
              onPress={() => router.push("./forgot-password")}
              accessibilityRole="button">
                <Text style={[styles.forgotPasswordText, { color: palette.azure }]}>
                  Forgot password?
                </Text>
              </Pressable>
            )}

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: palette.azure },
                pressed && styles.buttonPressed,
              ]}
              onPress={handleContinue}
              accessibilityRole="button"
              accessibilityLabel={loginMode === "mobile" ? "Send OTP" : "Log in"}
            >
              <Text style={[styles.primaryButtonText, { color: palette.onAzure }]}>
                {loginMode === "mobile" ? "Send OTP" : "Log in"}
              </Text>
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: palette.border }]} />
              <Text style={[styles.dividerText, { color: palette.textMuted }]}>or</Text>
              <View style={[styles.dividerLine, { backgroundColor: palette.border }]} />
            </View>

            <Pressable
              style={[styles.socialButton, { borderColor: palette.border }]}
              onPress={handleGoogleSignIn}
              accessibilityRole="button"
              accessibilityLabel="Continue with Google"
            >
              <AntDesign name="google" size={16} color={palette.textPrimary} />
              <Text style={[styles.socialButtonText, { color: palette.textPrimary }]}>
                Continue with Google
              </Text>
            </Pressable>

            <Pressable
              style={[styles.socialButton, { borderColor: palette.border }]}
              onPress={handleAppleSignIn}
              accessibilityRole="button"
              accessibilityLabel="Continue with Apple"
            >
              <AntDesign name="apple" size={16} color={palette.textPrimary} />
              <Text style={[styles.socialButtonText, { color: palette.textPrimary }]}>
                Continue with Apple
              </Text>
            </Pressable>

            <View style={styles.signUpRow}>
              <Text style={[styles.signUpText, { color: palette.textSecondary }]}>
                Don't have an account?
              </Text>
              <Pressable onPress={() => router.push("./register")} accessibilityRole="button">
                <Text style={[styles.signUpLink, { color: palette.azure }]}> Sign up</Text>
              </Pressable>
            </View>

            <Text style={[styles.footerText, { color: palette.textMuted }]}>Privacy · Terms</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: spacing.lg, gap: spacing.lg },
  rowLayout: { flexDirection: "row", alignItems: "stretch" },
  columnLayout: { flexDirection: "column" },
  imagePanel: { borderRadius: radius.xl, overflow: "hidden" },
  imagePanelWide: { flex: 1, minHeight: 560 },
  imagePanelNarrow: { height: 200 },
  heroImage: { width: "100%", height: "100%" },
  formPanel: {
    borderRadius: radius.xl,
    borderWidth: 1,
    padding: spacing.xl + 6,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 4,
  },
  formPanelWide: { flex: 1 },
  formPanelNarrow: { width: "100%" },
  headerBlock: { alignItems: "center", marginBottom: spacing.lg },
  logoMark: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  logoGlyph: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 4, textAlign: "center" },
  subtitle: { fontSize: 13, textAlign: "center" },
  fieldGroup: { marginBottom: spacing.md },
  label: { fontSize: 12, fontWeight: "600", marginBottom: spacing.xs + 2 },
  input: {
    height: 46,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    fontSize: 14,
  },
  passwordRow: { position: "relative", justifyContent: "center" },
  passwordInput: { paddingRight: 42 },
  eyeButton: { position: "absolute", right: 12 },
  errorMessage: { fontSize: 12, marginBottom: spacing.sm },
  forgotPasswordButton: { alignSelf: "flex-end", marginBottom: spacing.lg },
  forgotPasswordText: { fontSize: 12, fontWeight: "600" },
  primaryButton: {
    height: 46,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  primaryButtonText: { fontSize: 14, fontWeight: "600" },
  buttonPressed: { opacity: 0.8 },
  dividerRow: { flexDirection: "row", alignItems: "center", marginBottom: spacing.lg, gap: spacing.sm },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { fontSize: 11 },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    height: 44,
    borderWidth: 1,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
  socialButtonText: { fontSize: 13, fontWeight: "500" },
  signUpRow: { flexDirection: "row", justifyContent: "center", marginTop: spacing.md, marginBottom: spacing.sm },
  signUpText: { fontSize: 12 },
  signUpLink: { fontSize: 12, fontWeight: "600" },
  footerText: { fontSize: 11, textAlign: "center" },
});