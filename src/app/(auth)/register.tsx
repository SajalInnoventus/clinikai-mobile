// src/app/(auth)/register.tsx

import { AntDesign, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@expo/ui/community/datetime-picker";
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

import { PatientRegistrationForm } from "@/features/authentication/types/patient-registration.types";
import { validatePatientRegistration } from "@/features/authentication/validation/patient-registration.validation";
import { getPasswordStrength } from "@/features/authentication/utils/password-strength";
import { usePatient } from "@/features/patient/patient.context";
import { radius, spacing } from "@/constants/clinikai-theme";
import { useClinikaiTheme } from "@/features/theme/theme.context";

const emptyForm: PatientRegistrationForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobileNumber: "",
  dateOfBirth: "",
  gender: "",
};

const genderOptions = ["Male", "Female", "Other"];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function parseDob(dob: string) {
  const [day, month, year] = dob.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function toDobString(date: Date) {
  return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join("/");
}

function toIsoDateString(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export default function PatientRegistrationScreen() {
  const { palette } = useClinikaiTheme();
  const { updateProfile } = usePatient();
  const { width } = useWindowDimensions();
  const isWideLayout = width >= 900;

  const [form, setForm] = useState<PatientRegistrationForm>(emptyForm);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const today = new Date();
  const minimumDob = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
  const defaultDob = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  const passwordStrength = useMemo(
    () => (form.password ? getPasswordStrength(form.password) : null),
    [form.password],
  );

  function updateField(field: keyof PatientRegistrationForm, value: string) {
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
    if (errorMessage) {
      setErrorMessage("");
    }
  }

  function handleDobPicked(date: Date) {
    updateField("dateOfBirth", toDobString(date));
    setIsDatePickerVisible(false);
  }

  function handleContinue() {
    const result = validatePatientRegistration(form, acceptedTerms);

    if (!result.isValid) {
      setErrorMessage(result.message ?? "Please check your information.");
      return;
    }

    updateProfile({
      fullName: form.fullName,
      emailAddress: form.email,
      mobileNumber: form.mobileNumber,
      dateOfBirth: form.dateOfBirth,
      gender: form.gender || undefined,
    });

    router.push("/(auth)/verify-otp");
  }

  function handleGoogleSignUp() {
    setErrorMessage("Google sign-up isn't connected yet.");
  }

  function handleAppleSignUp() {
    setErrorMessage("Apple sign-up isn't connected yet.");
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
              source={require("@/../assets/images/signup-hero.jpg")}
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
                Create your account
              </Text>
              <Text style={[styles.subtitle, { color: palette.textSecondary }]}>
                Mitra uses this to personalize your care from day one.
              </Text>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: palette.textSecondary }]}>Full name</Text>
              <TextInput
                value={form.fullName}
                onChangeText={(value) => updateField("fullName", value)}
                placeholder="Enter your full name"
                placeholderTextColor={palette.textMuted}
                autoCapitalize="words"
                autoCorrect={false}
                style={[
                  styles.input,
                  {
                    backgroundColor: palette.background,
                    borderColor: palette.border,
                    color: palette.textPrimary,
                  },
                ]}
                accessibilityLabel="Full name"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: palette.textSecondary }]}>Email</Text>
              <TextInput
                value={form.email}
                onChangeText={(value) => updateField("email", value)}
                placeholder="name@example.com"
                placeholderTextColor={palette.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={[
                  styles.input,
                  {
                    backgroundColor: palette.background,
                    borderColor: palette.border,
                    color: palette.textPrimary,
                  },
                ]}
                accessibilityLabel="Email"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: palette.textSecondary }]}>Password</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  value={form.password}
                  onChangeText={(value) => updateField("password", value)}
                  placeholder="At least 8 characters"
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

              {passwordStrength && (
                <View style={styles.strengthWrap}>
                  <View style={styles.strengthTrack}>
                    {[0, 1, 2].map((segmentIndex) => {
                      const filledSegments =
                        passwordStrength === "weak" ? 1 : passwordStrength === "medium" ? 2 : 3;
                      const segmentColor =
                        passwordStrength === "weak"
                          ? palette.critical
                          : passwordStrength === "medium"
                            ? palette.warning
                            : palette.success;

                      return (
                        <View
                          key={segmentIndex}
                          style={[
                            styles.strengthSegment,
                            {
                              backgroundColor:
                                segmentIndex < filledSegments ? segmentColor : palette.border,
                            },
                          ]}
                        />
                      );
                    })}
                  </View>
                  <Text
                    style={[
                      styles.strengthLabel,
                      {
                        color:
                          passwordStrength === "weak"
                            ? palette.critical
                            : passwordStrength === "medium"
                              ? palette.warning
                              : palette.success,
                      },
                    ]}
                  >
                    {passwordStrength === "weak"
                      ? "Weak"
                      : passwordStrength === "medium"
                        ? "Medium"
                        : "Strong"}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: palette.textSecondary }]}>
                Confirm password
              </Text>
              <TextInput
                value={form.confirmPassword}
                onChangeText={(value) => updateField("confirmPassword", value)}
                placeholder="Re-enter your password"
                placeholderTextColor={palette.textMuted}
                secureTextEntry={!isPasswordVisible}
                style={[
                  styles.input,
                  {
                    backgroundColor: palette.background,
                    borderColor: palette.border,
                    color: palette.textPrimary,
                  },
                ]}
                accessibilityLabel="Confirm password"
              />
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: palette.textSecondary }]}>
                Date of birth
              </Text>

              {Platform.OS === "web" ? (
                <input
                  type="date"
                  value={form.dateOfBirth ? toIsoDateString(parseDob(form.dateOfBirth)) : ""}
                  min={toIsoDateString(minimumDob)}
                  max={toIsoDateString(today)}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (!value) {
                      updateField("dateOfBirth", "");
                      return;
                    }
                    const [year, month, day] = value.split("-");
                    updateField("dateOfBirth", `${day}/${month}/${year}`);
                  }}
                  style={{
                    width: "100%",
                    height: 46,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: palette.border,
                    borderRadius: radius.md,
                    backgroundColor: palette.background,
                    paddingLeft: spacing.md,
                    paddingRight: spacing.md,
                    fontSize: 14,
                    color: palette.textPrimary,
                    boxSizing: "border-box",
                  }}
                  aria-label="Date of birth"
                />
              ) : (
                <>
                  <Pressable
                    style={[
                      styles.input,
                      styles.dobInput,
                      { backgroundColor: palette.background, borderColor: palette.border },
                    ]}
                    onPress={() => setIsDatePickerVisible(true)}
                    accessibilityRole="button"
                    accessibilityLabel="Select date of birth"
                  >
                    <Text
                      style={{
                        color: form.dateOfBirth ? palette.textPrimary : palette.textMuted,
                        fontSize: 14,
                      }}
                    >
                      {form.dateOfBirth || "DD/MM/YYYY"}
                    </Text>
                  </Pressable>

                  {isDatePickerVisible && (
                    <DateTimePicker
                      value={form.dateOfBirth ? parseDob(form.dateOfBirth) : defaultDob}
                      mode="date"
                      presentation={Platform.OS === "android" ? "dialog" : "inline"}
                      minimumDate={minimumDob}
                      maximumDate={today}
                      onValueChange={(_, date) => {
                        if (!date) return;
                        handleDobPicked(date);
                        if (Platform.OS === "android") {
                          setIsDatePickerVisible(false);
                        }
                      }}
                      onDismiss={() => setIsDatePickerVisible(false)}
                    />
                  )}
                </>
              )}
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: palette.textSecondary }]}>Gender</Text>
              <View style={styles.genderRow}>
                {genderOptions.map((option) => {
                  const isSelected = form.gender === option;
                  return (
                    <Pressable
                      key={option}
                      onPress={() => updateField("gender", option)}
                      style={[
                        styles.genderOption,
                        { borderColor: palette.border },
                        isSelected && {
                          backgroundColor: palette.azure,
                          borderColor: palette.azure,
                        },
                      ]}
                      accessibilityRole="button"
                      accessibilityLabel={option}
                    >
                      <Text
                        style={[
                          styles.genderOptionText,
                          { color: isSelected ? palette.onAzure : palette.textPrimary },
                        ]}
                      >
                        {option}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={[styles.label, { color: palette.textSecondary }]}>
                Mobile number
              </Text>
              <TextInput
                value={form.mobileNumber}
                onChangeText={(value) =>
                  updateField("mobileNumber", value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="Enter your mobile number"
                placeholderTextColor={palette.textMuted}
                keyboardType="phone-pad"
                maxLength={10}
                style={[
                  styles.input,
                  {
                    backgroundColor: palette.background,
                    borderColor: palette.border,
                    color: palette.textPrimary,
                  },
                ]}
                accessibilityLabel="Mobile number"
              />
            </View>

            {errorMessage ? (
              <Text style={[styles.errorMessage, { color: palette.critical }]} accessibilityRole="alert">
                {errorMessage}
              </Text>
            ) : null}

            <Pressable
              style={styles.consentRow}
              onPress={() => setAcceptedTerms((prev) => !prev)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: acceptedTerms }}
            >
              <View
                style={[
                  styles.checkbox,
                  { borderColor: palette.border },
                  acceptedTerms && { backgroundColor: palette.azure, borderColor: palette.azure },
                ]}
              >
                {acceptedTerms ? <Text style={styles.checkmark}>✓</Text> : null}
              </View>
              <Text style={[styles.consentText, { color: palette.textSecondary }]}>
                I agree to the ClinikAI terms and acknowledge the privacy information provided
                by ClinikAI.
              </Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.primaryButton,
                { backgroundColor: palette.azure },
                pressed && styles.buttonPressed,
              ]}
              onPress={handleContinue}
              accessibilityRole="button"
              accessibilityLabel="Create account"
            >
              <Text style={[styles.primaryButtonText, { color: palette.onAzure }]}>
                Create account
              </Text>
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={[styles.dividerLine, { backgroundColor: palette.border }]} />
              <Text style={[styles.dividerText, { color: palette.textMuted }]}>or</Text>
              <View style={[styles.dividerLine, { backgroundColor: palette.border }]} />
            </View>

            <Pressable
              style={[styles.socialButton, { borderColor: palette.border }]}
              onPress={handleGoogleSignUp}
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
              onPress={handleAppleSignUp}
              accessibilityRole="button"
              accessibilityLabel="Continue with Apple"
            >
              <AntDesign name="apple" size={16} color={palette.textPrimary} />
              <Text style={[styles.socialButtonText, { color: palette.textPrimary }]}>
                Continue with Apple
              </Text>
            </Pressable>

            <View style={styles.signInRow}>
              <Text style={[styles.signInText, { color: palette.textSecondary }]}>
                Already have an account?
              </Text>
              <Pressable onPress={() => router.push("./login")} accessibilityRole="button">
                <Text style={[styles.signInLink, { color: palette.azure }]}> Log in</Text>
              </Pressable>
            </View>
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
  imagePanelWide: { flex: 1, minHeight: 720 },
  imagePanelNarrow: { height: 180 },
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
  dobInput: { justifyContent: "center" },
  passwordRow: { position: "relative", justifyContent: "center" },
  passwordInput: { paddingRight: 42 },
  eyeButton: { position: "absolute", right: 12 },
  strengthWrap: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.sm },
  strengthTrack: { flex: 1, flexDirection: "row", gap: 4 },
  strengthSegment: { flex: 1, height: 4, borderRadius: 2 },
  strengthLabel: { fontSize: 11, fontWeight: "600", width: 50 },
  genderRow: { flexDirection: "row", gap: spacing.sm },
  genderOption: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  genderOptionText: { fontSize: 13, fontWeight: "600" },
  errorMessage: { fontSize: 12, marginBottom: spacing.sm },
  consentRow: { flexDirection: "row", alignItems: "flex-start", gap: spacing.sm, marginBottom: spacing.lg },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  checkmark: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  consentText: { flex: 1, fontSize: 12, lineHeight: 18 },
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
  signInRow: { flexDirection: "row", justifyContent: "center", marginTop: spacing.md },
  signInText: { fontSize: 12 },
  signInLink: { fontSize: 12, fontWeight: "600" },
});