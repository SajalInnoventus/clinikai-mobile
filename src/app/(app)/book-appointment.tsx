import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useClinikaiTheme } from "@/features/theme/theme.context";

export default function BookAppointmentScreen() {
  const { palette } = useClinikaiTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: palette.background }]}>
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

          <Text style={[styles.headerTitle, { color: palette.textPrimary }]}>
            Book Appointment
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.progressRow}>
          <View style={[styles.progressActive, { backgroundColor: palette.azure }]} />
          <View style={[styles.progressInactive, { backgroundColor: palette.border }]} />
          <View style={[styles.progressInactive, { backgroundColor: palette.border }]} />
          <View style={[styles.progressInactive, { backgroundColor: palette.border }]} />
        </View>

        <View style={styles.content}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: palette.azureMuted },
            ]}
          >
            <Ionicons
              name="calendar-outline"
              size={30}
              color={palette.azure}
            />
          </View>

          <Text style={[styles.title, { color: palette.textPrimary }]}>
            Who is this appointment for?
          </Text>

          <Text style={[styles.subtitle, { color: palette.textSecondary }]}>
            Select who will be visiting the clinic for this appointment.
          </Text>

          <View style={styles.options}>
            <Pressable
              style={[
                styles.option,
                {
                  backgroundColor: palette.card,
                  borderColor: palette.azure,
                },
              ]}
              onPress={() => router.push("./appointment-issue")}
            >
              <View
                style={[
                  styles.optionIcon,
                  { backgroundColor: palette.azureMuted },
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={23}
                  color={palette.azure}
                />
              </View>

              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionTitle,
                    { color: palette.textPrimary },
                  ]}
                >
                  Myself
                </Text>

                <Text
                  style={[
                    styles.optionDescription,
                    { color: palette.textSecondary },
                  ]}
                >
                  Book an appointment for yourself
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={palette.textMuted}
              />
            </Pressable>

            <Pressable
              style={[
                styles.option,
                {
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                },
              ]}
              onPress={() => {}}
            >
              <View
                style={[
                  styles.optionIcon,
                  { backgroundColor: palette.cardRaised },
                ]}
              >
                <Ionicons
                  name="people-outline"
                  size={23}
                  color={palette.textSecondary}
                />
              </View>

              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionTitle,
                    { color: palette.textPrimary },
                  ]}
                >
                  Family member
                </Text>

                <Text
                  style={[
                    styles.optionDescription,
                    { color: palette.textSecondary },
                  ]}
                >
                  Book for a family member
                </Text>
              </View>

              <Text
                style={[
                  styles.comingSoon,
                  { color: palette.textMuted },
                ]}
              >
                Soon
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.option,
                {
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                },
              ]}
              onPress={() => {}}
            >
              <View
                style={[
                  styles.optionIcon,
                  { backgroundColor: palette.cardRaised },
                ]}
              >
                <Ionicons
                  name="heart-outline"
                  size={23}
                  color={palette.textSecondary}
                />
              </View>

              <View style={styles.optionContent}>
                <Text
                  style={[
                    styles.optionTitle,
                    { color: palette.textPrimary },
                  ]}
                >
                  Someone else
                </Text>

                <Text
                  style={[
                    styles.optionDescription,
                    { color: palette.textSecondary },
                  ]}
                >
                  Book for another person
                </Text>
              </View>

              <Text
                style={[
                  styles.comingSoon,
                  { color: palette.textMuted },
                ]}
              >
                Soon
              </Text>
            </Pressable>
          </View>
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
  content: {
    paddingTop: 34,
  },
  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
    marginBottom: 28,
  },
  options: {
    gap: 12,
  },
  option: {
    minHeight: 82,
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  optionIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 12,
    lineHeight: 17,
  },
  comingSoon: {
    fontSize: 11,
    fontWeight: "600",
  },
});