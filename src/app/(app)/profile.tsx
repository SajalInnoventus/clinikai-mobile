import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@expo/ui/community/datetime-picker";
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

import { usePatient } from "@/features/patient/patient.context";
import { useRecords } from "@/features/records/records.context";
import { useClinikaiTheme } from "@/features/theme/theme.context";

const PRIMARY = "#450920";

const genderOptions = ["Male", "Female", "Other"];

function formatDateOfBirth(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function parseDateOfBirth(value: string) {
  const parts = value.split("/").map(Number);

  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return new Date();
  }

  const [day, month, year] = parts;

  return new Date(year, month - 1, day);
}

export default function PatientProfileScreen() {
  const { palette } = useClinikaiTheme();
  const { profile, updateProfile } = usePatient();
  const { records } = useRecords();

  const initial = profile.fullName.trim().charAt(0).toUpperCase() || "P";

  const [isEditing, setIsEditing] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const [fullName, setFullName] = useState(profile.fullName);
  const [emailAddress, setEmailAddress] = useState(profile.emailAddress);
  const [dateOfBirth, setDateOfBirth] = useState(profile.dateOfBirth);
  const [gender, setGender] = useState(profile.gender ?? "");
  const [bloodGroup, setBloodGroup] = useState(profile.bloodGroup ?? "");
  const [emergencyContactName, setEmergencyContactName] = useState(
    profile.emergencyContactName ?? "",
  );
  const [emergencyContactNumber, setEmergencyContactNumber] = useState(
    profile.emergencyContactNumber ?? "",
  );
  const [allergies, setAllergies] = useState(profile.allergies.join(", "));
  const [chronicConditions, setChronicConditions] = useState(
    profile.chronicConditions.join(", "),
  );

  function startEditing() {
    setFullName(profile.fullName);
    setEmailAddress(profile.emailAddress);
    setDateOfBirth(profile.dateOfBirth);
    setGender(profile.gender ?? "");
    setBloodGroup(profile.bloodGroup ?? "");
    setEmergencyContactName(profile.emergencyContactName ?? "");
    setEmergencyContactNumber(profile.emergencyContactNumber ?? "");
    setAllergies(profile.allergies.join(", "));
    setChronicConditions(profile.chronicConditions.join(", "));
    setIsEditing(true);
  }

  function cancelEditing() {
    setFullName(profile.fullName);
    setEmailAddress(profile.emailAddress);
    setDateOfBirth(profile.dateOfBirth);
    setGender(profile.gender ?? "");
    setBloodGroup(profile.bloodGroup ?? "");
    setEmergencyContactName(profile.emergencyContactName ?? "");
    setEmergencyContactNumber(profile.emergencyContactNumber ?? "");
    setAllergies(profile.allergies.join(", "));
    setChronicConditions(profile.chronicConditions.join(", "));
    setIsEditing(false);
    setIsDatePickerVisible(false);
  }

  function saveProfile() {
    const cleanedAllergies = allergies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const cleanedConditions = chronicConditions
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    updateProfile({
      fullName: fullName.trim(),
      emailAddress: emailAddress.trim(),
      dateOfBirth: dateOfBirth.trim(),
      gender: gender || undefined,
      bloodGroup: bloodGroup.trim() || undefined,
      emergencyContactName: emergencyContactName.trim() || undefined,
      emergencyContactNumber: emergencyContactNumber.trim() || undefined,
      allergies: cleanedAllergies,
      chronicConditions: cleanedConditions,
    });

    setIsEditing(false);
    setIsDatePickerVisible(false);
  }

  function handleDateChange(date?: Date) {
    if (!date) {
      return;
    }

    setDateOfBirth(formatDateOfBirth(date));
    setIsDatePickerVisible(false);
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: palette.background }]}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: palette.card,
              borderBottomColor: palette.border,
            },
          ]}
        >
          <Pressable
            onPress={() => {
              if (isEditing) {
                cancelEditing();
                return;
              }

              router.back();
            }}
            style={styles.headerButton}
            accessibilityRole="button"
            accessibilityLabel={isEditing ? "Cancel editing" : "Go back"}
          >
            <Ionicons
              name={isEditing ? "close-outline" : "chevron-back"}
              size={24}
              color={palette.textPrimary}
            />
          </Pressable>

          <Text style={[styles.headerTitle, { color: palette.textPrimary }]}>
            Profile
          </Text>

          <Pressable
            onPress={isEditing ? saveProfile : startEditing}
            style={styles.headerButton}
            accessibilityRole="button"
            accessibilityLabel={isEditing ? "Save profile" : "Edit profile"}
          >
            <Ionicons
              name={isEditing ? "checkmark" : "create-outline"}
              size={22}
              color={PRIMARY}
            />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.identityCard}>
            <View
              style={[
                styles.avatar,
                { backgroundColor: palette.azureMuted },
              ]}
            >
              <Text style={[styles.avatarText, { color: PRIMARY }]}>
                {initial}
              </Text>
            </View>

            <Text
              style={[styles.patientName, { color: palette.textPrimary }]}
            >
              {profile.fullName}
            </Text>

            <Text
              style={[styles.patientId, { color: palette.textSecondary }]}
            >
              Patient ID: {profile.patientId}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                },
              ]}
            >
              <Text
                style={[styles.statValue, { color: palette.textPrimary }]}
              >
                {records.length}
              </Text>

              <Text
                style={[styles.statLabel, { color: palette.textSecondary }]}
              >
                Records
              </Text>
            </View>

            <View
              style={[
                styles.statCard,
                {
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                },
              ]}
            >
              <Text
                style={[styles.statValue, { color: palette.textPrimary }]}
              >
                {profile.bloodGroup ?? "—"}
              </Text>

              <Text
                style={[styles.statLabel, { color: palette.textSecondary }]}
              >
                Blood Group
              </Text>
            </View>
          </View>

          <SectionTitle title="Personal Information" palette={palette} />

          <View
            style={[
              styles.card,
              {
                backgroundColor: palette.card,
                borderColor: palette.border,
              },
            ]}
          >
            {isEditing ? (
              <>
                <EditField
                  label="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                  palette={palette}
                  autoCapitalize="words"
                />

                <EditField
                  label="Email Address"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  palette={palette}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <View style={styles.editField}>
                  <Text
                    style={[
                      styles.editLabel,
                      { color: palette.textSecondary },
                    ]}
                  >
                    Mobile Number
                  </Text>

                  <View
                    style={[
                      styles.readOnlyInput,
                      {
                        backgroundColor: palette.background,
                        borderColor: palette.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.readOnlyText,
                        { color: palette.textPrimary },
                      ]}
                    >
                      {profile.mobileNumber}
                    </Text>

                    <View style={styles.verifiedBadge}>
                      <Ionicons
                        name="checkmark-circle"
                        size={15}
                        color="#12B76A"
                      />
                      <Text style={styles.verifiedText}>Verified</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.editField}>
                  <Text
                    style={[
                      styles.editLabel,
                      { color: palette.textSecondary },
                    ]}
                  >
                    Date of Birth
                  </Text>

                  <Pressable
                    onPress={() => setIsDatePickerVisible(true)}
                    style={[
                      styles.editInput,
                      {
                        backgroundColor: palette.background,
                        borderColor: palette.border,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.inputText,
                        { color: palette.textPrimary },
                      ]}
                    >
                      {dateOfBirth || "DD/MM/YYYY"}
                    </Text>

                    <Ionicons
                      name="calendar-outline"
                      size={18}
                      color={palette.textSecondary}
                    />
                  </Pressable>

                  {isDatePickerVisible && Platform.OS !== "web" ? (
                    <DateTimePicker
                      value={parseDateOfBirth(dateOfBirth)}
                      mode="date"
                      presentation={
                        Platform.OS === "android" ? "dialog" : "inline"
                      }
                      maximumDate={new Date()}
                      onValueChange={(_, date) => handleDateChange(date)}
                      onDismiss={() => setIsDatePickerVisible(false)}
                    />
                  ) : null}
                </View>

                {Platform.OS === "web" ? (
                  <View style={styles.editField}>
                    <Text
                      style={[
                        styles.editLabel,
                        { color: palette.textSecondary },
                      ]}
                    >
                      Date of Birth
                    </Text>

                    <input
                      type="date"
                      value={
                        dateOfBirth
                          ? (() => {
                              const date = parseDateOfBirth(dateOfBirth);
                              const year = date.getFullYear();
                              const month = String(
                                date.getMonth() + 1,
                              ).padStart(2, "0");
                              const day = String(date.getDate()).padStart(
                                2,
                                "0",
                              );

                              return `${year}-${month}-${day}`;
                            })()
                          : ""
                      }
                      max={new Date().toISOString().split("T")[0]}
                      onChange={(event) => {
                        const value = event.target.value;

                        if (!value) {
                          setDateOfBirth("");
                          return;
                        }

                        const [year, month, day] = value.split("-");

                        setDateOfBirth(`${day}/${month}/${year}`);
                      }}
                      style={{
                        width: "100%",
                        height: 46,
                        borderWidth: 1,
                        borderStyle: "solid",
                        borderColor: palette.border,
                        borderRadius: 14,
                        backgroundColor: palette.background,
                        paddingLeft: 12,
                        paddingRight: 12,
                        fontSize: 14,
                        color: palette.textPrimary,
                        boxSizing: "border-box",
                      }}
                    />
                  </View>
                ) : null}

                <View style={styles.editField}>
                  <Text
                    style={[
                      styles.editLabel,
                      { color: palette.textSecondary },
                    ]}
                  >
                    Gender
                  </Text>

                  <View style={styles.genderRow}>
                    {genderOptions.map((option) => {
                      const selected = gender === option;

                      return (
                        <Pressable
                          key={option}
                          onPress={() => setGender(option)}
                          style={[
                            styles.genderOption,
                            {
                              backgroundColor: selected
                                ? PRIMARY
                                : palette.background,
                              borderColor: selected
                                ? PRIMARY
                                : palette.border,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.genderText,
                              {
                                color: selected
                                  ? "#FFFFFF"
                                  : palette.textPrimary,
                              },
                            ]}
                          >
                            {option}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              </>
            ) : (
              <>
                <InfoRow
                  label="Mobile Number"
                  value={profile.mobileNumber}
                  palette={palette}
                  verified
                />
                <InfoRow
                  label="Email Address"
                  value={profile.emailAddress}
                  palette={palette}
                />
                <InfoRow
                  label="Date of Birth"
                  value={profile.dateOfBirth}
                  palette={palette}
                />
                <InfoRow
                  label="Gender"
                  value={profile.gender ?? "—"}
                  palette={palette}
                  last
                />
              </>
            )}
          </View>

          <SectionTitle title="Emergency Contact" palette={palette} />

          <View
            style={[
              styles.card,
              {
                backgroundColor: palette.card,
                borderColor: palette.border,
              },
            ]}
          >
            {isEditing ? (
              <>
                <EditField
                  label="Name"
                  value={emergencyContactName}
                  onChangeText={setEmergencyContactName}
                  palette={palette}
                  autoCapitalize="words"
                />

                <EditField
                  label="Number"
                  value={emergencyContactNumber}
                  onChangeText={(value) =>
                    setEmergencyContactNumber(
                      value.replace(/\D/g, "").slice(0, 10),
                    )
                  }
                  palette={palette}
                  keyboardType="phone-pad"
                  maxLength={10}
                  last
                />
              </>
            ) : (
              <>
                <InfoRow
                  label="Name"
                  value={profile.emergencyContactName ?? "—"}
                  palette={palette}
                />
                <InfoRow
                  label="Number"
                  value={profile.emergencyContactNumber ?? "—"}
                  palette={palette}
                  last
                />
              </>
            )}
          </View>

          <SectionTitle title="Medical Information" palette={palette} />

          <View
            style={[
              styles.card,
              {
                backgroundColor: palette.card,
                borderColor: palette.border,
              },
            ]}
          >
            {isEditing ? (
              <>
                <EditField
                  label="Blood Group"
                  value={bloodGroup}
                  onChangeText={setBloodGroup}
                  palette={palette}
                  placeholder="e.g. O+"
                />

                <EditField
                  label="Allergies"
                  value={allergies}
                  onChangeText={setAllergies}
                  palette={palette}
                  placeholder="Separate multiple items with commas"
                />

                <EditField
                  label="Chronic Conditions"
                  value={chronicConditions}
                  onChangeText={setChronicConditions}
                  palette={palette}
                  placeholder="Separate multiple conditions with commas"
                  multiline
                  last
                />
              </>
            ) : (
              <>
                <InfoRow
                  label="Blood Group"
                  value={profile.bloodGroup ?? "—"}
                  palette={palette}
                />

                <InfoRow
                  label="Allergies"
                  value={
                    profile.allergies.length > 0
                      ? profile.allergies.join(", ")
                      : "—"
                  }
                  palette={palette}
                />

                <InfoRow
                  label="Conditions"
                  value={
                    profile.chronicConditions.length > 0
                      ? profile.chronicConditions.join(", ")
                      : "—"
                  }
                  palette={palette}
                  last
                />
              </>
            )}
          </View>

          {isEditing ? (
            <View style={styles.saveSection}>
              <Pressable
                onPress={saveProfile}
                style={({ pressed }) => [
                  styles.saveButton,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </Pressable>

              <Pressable
                onPress={cancelEditing}
                style={styles.cancelButton}
              >
                <Text
                  style={[
                    styles.cancelButtonText,
                    { color: palette.textSecondary },
                  ]}
                >
                  Cancel
                </Text>
              </Pressable>
            </View>
          ) : (
            <>
              <SectionTitle title="Manage" palette={palette} />

              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                  },
                ]}
              >
                <ActionRow
                  label="My Health Locker"
                  onPress={() => router.push("./medical-timeline")}
                  palette={palette}
                />

                <ActionRow
                  label="Upload a Document"
                  onPress={() => router.push("./upload-document")}
                  palette={palette}
                />

                <ActionRow
                  label="Family / Caregiver Access"
                  description="Coming soon"
                  disabled
                  palette={palette}
                />

                <ActionRow
                  label="Language"
                  description="English"
                  disabled
                  palette={palette}
                />

                <ActionRow
                  label="Log Out"
                  onPress={() => router.replace("/")}
                  destructive
                  last
                  palette={palette}
                />
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SectionTitle({
  title,
  palette,
}: {
  title: string;
  palette: {
    textSecondary: string;
  };
}) {
  return (
    <Text style={[styles.sectionLabel, { color: palette.textSecondary }]}>
      {title}
    </Text>
  );
}

function InfoRow({
  label,
  value,
  palette,
  verified,
  last,
}: {
  label: string;
  value: string;
  palette: {
    textPrimary: string;
    textSecondary: string;
    border: string;
  };
  verified?: boolean;
  last?: boolean;
}) {
  return (
    <View
      style={[
        styles.infoRow,
        { borderBottomColor: palette.border },
        last && styles.infoRowLast,
      ]}
    >
      <Text style={[styles.infoLabel, { color: palette.textSecondary }]}>
        {label}
      </Text>

      <View style={styles.infoValueContainer}>
        <Text
          style={[styles.infoValue, { color: palette.textPrimary }]}
          numberOfLines={2}
        >
          {value}
        </Text>

        {verified ? (
          <Ionicons name="checkmark-circle" size={15} color="#12B76A" />
        ) : null}
      </View>
    </View>
  );
}

function EditField({
  label,
  value,
  onChangeText,
  palette,
  last,
  placeholder,
  multiline,
  keyboardType,
  autoCapitalize,
  maxLength,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  palette: {
    textSecondary: string;
    textPrimary: string;
    textMuted: string;
    background: string;
    border: string;
  };
  last?: boolean;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
}) {
  return (
    <View style={[styles.editField, last && styles.editFieldLast]}>
      <Text style={[styles.editLabel, { color: palette.textSecondary }]}>
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={palette.textMuted}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        style={[
          styles.editInput,
          {
            backgroundColor: palette.background,
            borderColor: palette.border,
            color: palette.textPrimary,
          },
          multiline && styles.multilineInput,
        ]}
      />
    </View>
  );
}

function ActionRow({
  label,
  description,
  onPress,
  disabled,
  destructive,
  last,
  palette,
}: {
  label: string;
  description?: string;
  onPress?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  last?: boolean;
  palette: {
    textPrimary: string;
    textSecondary: string;
    border: string;
  };
}) {
  return (
    <Pressable
      style={[
        styles.actionRow,
        { borderBottomColor: palette.border },
        last && styles.actionRowLast,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text
        style={[
          styles.actionLabel,
          { color: palette.textPrimary },
          destructive && styles.actionLabelDestructive,
          disabled && styles.actionLabelDisabled,
        ]}
      >
        {label}
      </Text>

      {description ? (
        <Text
          style={[styles.actionDescription, { color: palette.textSecondary }]}
        >
          {description}
        </Text>
      ) : (
        !disabled && (
          <Ionicons
            name="chevron-forward"
            size={18}
            color={palette.textSecondary}
          />
        )
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  flex: {
    flex: 1,
  },

  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    borderBottomWidth: 1,
  },

  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  identityCard: {
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 30,
    fontWeight: "700",
  },

  patientName: {
    fontSize: 19,
    fontWeight: "700",
  },

  patientId: {
    fontSize: 12,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 26,
  },

  statCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },

  statLabel: {
    fontSize: 11,
    marginTop: 4,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
    marginTop: 4,
  },

  card: {
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    marginBottom: 24,
  },

  infoRow: {
    minHeight: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },

  infoRowLast: {
    borderBottomWidth: 0,
  },

  infoLabel: {
    fontSize: 13,
    flexShrink: 0,
  },

  infoValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    maxWidth: "62%",
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "right",
  },

  editField: {
    paddingVertical: 12,
    borderBottomWidth: 1,
  },

  editFieldLast: {
    borderBottomWidth: 0,
  },

  editLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 7,
  },

  editInput: {
    height: 46,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    fontSize: 14,
  },

  multilineInput: {
    minHeight: 80,
    paddingTop: 12,
  },

  readOnlyInput: {
    minHeight: 46,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  readOnlyText: {
    fontSize: 14,
    fontWeight: "500",
  },

  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  verifiedText: {
    color: "#12B76A",
    fontSize: 11,
    fontWeight: "600",
  },

  inputText: {
    fontSize: 14,
  },

  genderRow: {
    flexDirection: "row",
    gap: 8,
  },

  genderOption: {
    flex: 1,
    height: 42,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  genderText: {
    fontSize: 13,
    fontWeight: "600",
  },

  saveSection: {
    marginTop: -4,
    marginBottom: 20,
  },

  saveButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  cancelButton: {
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },

  buttonPressed: {
    opacity: 0.75,
  },

  actionRow: {
    minHeight: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
  },

  actionRowLast: {
    borderBottomWidth: 0,
  },

  actionLabel: {
    fontSize: 14,
    fontWeight: "600",
  },

  actionLabelDestructive: {
    color: "#DC2626",
  },

  actionLabelDisabled: {
    color: "#94A3B8",
  },

  actionDescription: {
    fontSize: 12,
  },
});