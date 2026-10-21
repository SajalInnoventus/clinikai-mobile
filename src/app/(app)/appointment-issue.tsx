import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useClinikaiTheme } from "@/features/theme/theme.context";

const medicalIssues = [
  {
    title: "Fever",
    icon: "thermometer-outline" as const,
  },
  {
    title: "Cold / Cough",
    icon: "cloud-outline" as const,
  },
  {
    title: "Baby / Child Care",
    icon: "happy-outline" as const,
  },
  {
    title: "Pregnancy",
    icon: "heart-outline" as const,
  },
  {
    title: "General Consultation",
    icon: "medical-outline" as const,
  },
  {
    title: "Follow-up",
    icon: "refresh-outline" as const,
  },
  {
    title: "Skin Problem",
    icon: "body-outline" as const,
  },
  {
    title: "Stomach Problem",
    icon: "nutrition-outline" as const,
  },
  {
    title: "Pain / Injury",
    icon: "bandage-outline" as const,
  },
  {
    title: "Other",
    icon: "ellipsis-horizontal-circle-outline" as const,
  },
];

export default function AppointmentIssueScreen() {
  const { palette } = useClinikaiTheme();

  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  function toggleIssue(issue: string) {
    setSelectedIssues((current) => {
      if (current.includes(issue)) {
        return current.filter((item) => item !== issue);
      }

      return [...current, issue];
    });
  }

  function handleContinue() {
    if (selectedIssues.length === 0) {
      return;
    }

    router.push({
      pathname: "./appointment-location",
      params: {
        issues: JSON.stringify(selectedIssues),
        description,
      },
    });
  }

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: palette.background },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={palette.textPrimary}
            />
          </Pressable>

          <Text
            style={[
              styles.headerTitle,
              { color: palette.textPrimary },
            ]}
          >
            Medical Issue
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.progressRow}>
          <View
            style={[
              styles.progressActive,
              { backgroundColor: palette.azure },
            ]}
          />
          <View
            style={[
              styles.progressActive,
              { backgroundColor: palette.azure },
            ]}
          />
          <View
            style={[
              styles.progressInactive,
              { backgroundColor: palette.border },
            ]}
          />
          <View
            style={[
              styles.progressInactive,
              { backgroundColor: palette.border },
            ]}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <Text
            style={[
              styles.title,
              { color: palette.textPrimary },
            ]}
          >
            What brings you in?
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: palette.textSecondary },
            ]}
          >
            Select one or more reasons for your appointment.
          </Text>

          <View style={styles.issueGrid}>
            {medicalIssues.map((issue) => {
              const selected = selectedIssues.includes(issue.title);

              return (
                <Pressable
                  key={issue.title}
                  onPress={() => toggleIssue(issue.title)}
                  style={[
                    styles.issueCard,
                    {
                      backgroundColor: palette.card,
                      borderColor: selected
                        ? palette.azure
                        : palette.border,
                    },
                    selected && {
                      backgroundColor: palette.azureMuted,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected }}
                  accessibilityLabel={issue.title}
                >
                  <View
                    style={[
                      styles.issueIcon,
                      {
                        backgroundColor: selected
                          ? palette.azure
                          : palette.cardRaised,
                      },
                    ]}
                  >
                    <Ionicons
                      name={issue.icon}
                      size={20}
                      color={
                        selected
                          ? palette.onAzure
                          : palette.textSecondary
                      }
                    />
                  </View>

                  <Text
                    style={[
                      styles.issueText,
                      {
                        color: selected
                          ? palette.azure
                          : palette.textPrimary,
                      },
                    ]}
                  >
                    {issue.title}
                  </Text>

                  {selected && (
                    <View
                      style={[
                        styles.selectedMark,
                        { backgroundColor: palette.azure },
                      ]}
                    >
                      <Ionicons
                        name="checkmark"
                        size={13}
                        color={palette.onAzure}
                      />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.detailsSection}>
            <Text
              style={[
                styles.detailsLabel,
                { color: palette.textPrimary },
              ]}
            >
              Anything else you want us to know?
            </Text>

            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Briefly describe your problem..."
              placeholderTextColor={palette.textMuted}
              multiline
              textAlignVertical="top"
              style={[
                styles.detailsBox,
                {
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                  color: palette.textPrimary,
                },
              ]}
              accessibilityLabel="Additional medical information"
            />

            <Text
              style={[
                styles.optionalText,
                { color: palette.textMuted },
              ]}
            >
              Optional
            </Text>
          </View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            { backgroundColor: palette.background },
          ]}
        >
          <Pressable
            onPress={handleContinue}
            disabled={selectedIssues.length === 0}
            style={[
              styles.continueButton,
              {
                backgroundColor:
                  selectedIssues.length > 0
                    ? palette.azure
                    : palette.cardRaised,
              },
            ]}
          >
            <Text
              style={[
                styles.continueText,
                {
                  color:
                    selectedIssues.length > 0
                      ? palette.onAzure
                      : palette.textMuted,
                },
              ]}
            >
              Continue
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color={
                selectedIssues.length > 0
                  ? palette.onAzure
                  : palette.textMuted
              }
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  headerSpacer: {
    width: 40,
  },
  progressRow: {
    flexDirection: "row",
    gap: 6,
    marginTop: 4,
  },
  progressActive: {
    flex: 1,
    height: 4,
    borderRadius: 4,
  },
  progressInactive: {
    flex: 1,
    height: 4,
    borderRadius: 4,
  },
  scrollContent: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 25,
    lineHeight: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 24,
  },
  issueGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  issueCard: {
    width: "48%",
    minHeight: 112,
    borderWidth: 1,
    borderRadius: 17,
    padding: 13,
    justifyContent: "center",
    position: "relative",
  },
  issueIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  issueText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },
  selectedMark: {
    position: "absolute",
    right: 10,
    top: 10,
    width: 21,
    height: 21,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsSection: {
    marginTop: 28,
  },
  detailsLabel: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 9,
  },
  detailsBox: {
    minHeight: 110,
    borderWidth: 1,
    borderRadius: 15,
    padding: 14,
    fontSize: 14,
    lineHeight: 21,
  },
  optionalText: {
    fontSize: 11,
    marginTop: 6,
  },
  footer: {
    paddingTop: 10,
    paddingBottom: 14,
  },
  continueButton: {
    height: 52,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  continueText: {
    fontSize: 15,
    fontWeight: "700",
  },
});