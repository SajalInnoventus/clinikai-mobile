import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getClinicById,
  getDoctorsByClinic,
} from "@/features/booking/mock.booking.data";
import { getRecommendedDoctors } from "@/features/booking/doctor-recommendation";
import { useClinikaiTheme } from "@/features/theme/theme.context";

export default function SelectDoctorScreen() {
  const { palette } = useClinikaiTheme();

  const { clinicId, issue, location } = useLocalSearchParams<{
    clinicId?: string;
    issue?: string;
    location?: string;
  }>();

  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(
    null,
  );

  const clinic = getClinicById(clinicId ?? "");

  const doctors = getDoctorsByClinic(clinicId ?? "");

  const recommendedDoctors = useMemo(() => {
    return getRecommendedDoctors(doctors, issue);
  }, [doctors, issue]);

  const selectedDoctor = doctors.find(
    (doctor) => doctor.id === selectedDoctorId,
  );

  function getInitials(name: string) {
    return name
      .replace("Dr. ", "")
      .split(" ")
      .map((part) => part.charAt(0))
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  function handleContinue() {
    if (!selectedDoctorId) {
      return;
    }

    router.push({
      pathname: "./select-slot",
      params: {
        clinicId: clinicId ?? "",
        doctorId: selectedDoctorId,
        issue: issue ?? "",
        location: location ?? "",
      },
    });
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.backButton}
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
            Select Doctor
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
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text
            style={[
              styles.title,
              { color: palette.textPrimary },
            ]}
          >
            Choose your doctor
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: palette.textSecondary },
            ]}
          >
            We’ve ranked doctors based on your medical issue, experience and
            patient rating.
          </Text>

          {clinic && (
            <View
              style={[
                styles.clinicCard,
                {
                  backgroundColor: palette.card,
                  borderColor: palette.border,
                },
              ]}
            >
              <View
                style={[
                  styles.clinicIcon,
                  {
                    backgroundColor: palette.azureMuted,
                  },
                ]}
              >
                <Ionicons
                  name="medical-outline"
                  size={23}
                  color={palette.azure}
                />
              </View>

              <View style={styles.clinicContent}>
                <Text
                  style={[
                    styles.clinicName,
                    { color: palette.textPrimary },
                  ]}
                  numberOfLines={2}
                >
                  {clinic.name}
                </Text>

                <View style={styles.clinicLocationRow}>
                  <Ionicons
                    name="location-outline"
                    size={14}
                    color={palette.textMuted}
                  />

                  <Text
                    style={[
                      styles.clinicLocation,
                      { color: palette.textSecondary },
                    ]}
                    numberOfLines={1}
                  >
                    {clinic.address}
                  </Text>
                </View>

                <View style={styles.clinicMetaRow}>
                  <View style={styles.ratingRow}>
                    <Ionicons
                      name="star"
                      size={14}
                      color={palette.warning}
                    />

                    <Text
                      style={[
                        styles.ratingText,
                        { color: palette.textPrimary },
                      ]}
                    >
                      {clinic.rating.toFixed(1)}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.distanceBadge,
                      {
                        backgroundColor: palette.cardRaised,
                      },
                    ]}
                  >
                    <Ionicons
                      name="navigate-outline"
                      size={12}
                      color={palette.azure}
                    />

                    <Text
                      style={[
                        styles.distanceText,
                        { color: palette.textSecondary },
                      ]}
                    >
                      {clinic.distanceKm.toFixed(1)} km
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {issue ? (
            <View
              style={[
                styles.issueCard,
                {
                  backgroundColor: palette.azureMuted,
                },
              ]}
            >
              <Ionicons
                name="medical-outline"
                size={18}
                color={palette.azure}
              />

              <View style={styles.issueContent}>
                <Text
                  style={[
                    styles.issueLabel,
                    { color: palette.textSecondary },
                  ]}
                >
                  Appointment for
                </Text>

                <Text
                  style={[
                    styles.issueValue,
                    { color: palette.textPrimary },
                  ]}
                  numberOfLines={2}
                >
                  {issue}
                </Text>
              </View>
            </View>
          ) : null}

          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderContent}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: palette.textPrimary },
                ]}
              >
                Recommended doctors
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: palette.textSecondary },
                ]}
              >
                {recommendedDoctors.length} doctors available
              </Text>
            </View>

            <View
              style={[
                styles.recommendedBadge,
                {
                  backgroundColor: palette.azureMuted,
                },
              ]}
            >
              <Ionicons
                name="sparkles-outline"
                size={14}
                color={palette.azure}
              />

              <Text
                style={[
                  styles.recommendedText,
                  { color: palette.azure },
                ]}
              >
                For you
              </Text>
            </View>
          </View>

          <View style={styles.doctorList}>
            {recommendedDoctors.map((doctor, index) => {
              const selected = selectedDoctorId === doctor.id;

              return (
                <Pressable
                  key={doctor.id}
                  onPress={() => setSelectedDoctorId(doctor.id)}
                  style={({ pressed }) => [
                    styles.doctorCard,
                    {
                      backgroundColor: selected
                        ? palette.azureMuted
                        : palette.card,
                      borderColor: selected
                        ? palette.azure
                        : palette.border,
                    },
                    pressed && styles.cardPressed,
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Select ${doctor.name}`}
                >
                  {index === 0 && (
                    <View
                      style={[
                        styles.topDoctorBadge,
                        {
                          backgroundColor: palette.azure,
                        },
                      ]}
                    >
                      <Ionicons
                        name="sparkles"
                        size={12}
                        color={palette.onAzure}
                      />

                      <Text
                        style={[
                          styles.topDoctorText,
                          { color: palette.onAzure },
                        ]}
                      >
                        Best match for your issue
                      </Text>
                    </View>
                  )}

                  <View style={styles.doctorMainRow}>
                    <View
                      style={[
                        styles.avatar,
                        {
                          backgroundColor: palette.azureMuted,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.avatarText,
                          { color: palette.azure },
                        ]}
                      >
                        {getInitials(doctor.name)}
                      </Text>
                    </View>

                    <View style={styles.doctorInfo}>
                      <View style={styles.doctorNameRow}>
                        <Text
                          style={[
                            styles.doctorName,
                            { color: palette.textPrimary },
                          ]}
                          numberOfLines={1}
                        >
                          {doctor.name}
                        </Text>

                        {selected && (
                          <Ionicons
                            name="checkmark-circle"
                            size={21}
                            color={palette.azure}
                          />
                        )}
                      </View>

                      <Text
                        style={[
                          styles.doctorSpecialty,
                          { color: palette.textSecondary },
                        ]}
                      >
                        {doctor.specialty}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.doctorStats,
                      {
                        borderTopColor: palette.border,
                      },
                    ]}
                  >
                    <View style={styles.statItem}>
                      <Ionicons
                        name="briefcase-outline"
                        size={15}
                        color={palette.textMuted}
                      />

                      <View>
                        <Text
                          style={[
                            styles.statValue,
                            { color: palette.textPrimary },
                          ]}
                        >
                          {doctor.experienceYears} yrs
                        </Text>

                        <Text
                          style={[
                            styles.statLabel,
                            { color: palette.textMuted },
                          ]}
                        >
                          Experience
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[
                        styles.statDivider,
                        {
                          backgroundColor: palette.border,
                        },
                      ]}
                    />

                    <View style={styles.statItem}>
                      <Ionicons
                        name="star"
                        size={15}
                        color={palette.warning}
                      />

                      <View>
                        <Text
                          style={[
                            styles.statValue,
                            { color: palette.textPrimary },
                          ]}
                        >
                          {doctor.rating.toFixed(1)}
                        </Text>

                        <Text
                          style={[
                            styles.statLabel,
                            { color: palette.textMuted },
                          ]}
                        >
                          Patient rating
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.selectionRow}>
                    <Text
                      style={[
                        styles.selectionText,
                        {
                          color: selected
                            ? palette.azure
                            : palette.textSecondary,
                        },
                      ]}
                    >
                      {selected
                        ? "Doctor selected"
                        : "Tap to select this doctor"}
                    </Text>

                    <Ionicons
                      name={
                        selected
                          ? "checkmark-circle"
                          : "chevron-forward"
                      }
                      size={18}
                      color={
                        selected
                          ? palette.azure
                          : palette.textMuted
                      }
                    />
                  </View>
                </Pressable>
              );
            })}

            {recommendedDoctors.length === 0 && (
              <View
                style={[
                  styles.emptyCard,
                  {
                    backgroundColor: palette.card,
                    borderColor: palette.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.emptyIcon,
                    {
                      backgroundColor: palette.azureMuted,
                    },
                  ]}
                >
                  <Ionicons
                    name="person-outline"
                    size={24}
                    color={palette.azure}
                  />
                </View>

                <Text
                  style={[
                    styles.emptyTitle,
                    { color: palette.textPrimary },
                  ]}
                >
                  No doctors available
                </Text>

                <Text
                  style={[
                    styles.emptyText,
                    { color: palette.textSecondary },
                  ]}
                >
                  There are no available doctors at this clinic right now.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View
          style={[
            styles.footer,
            {
              backgroundColor: palette.background,
            },
          ]}
        >
          {selectedDoctor && (
            <View style={styles.selectedDoctorPreview}>
              <View
                style={[
                  styles.selectedDoctorAvatar,
                  {
                    backgroundColor: palette.azureMuted,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.selectedDoctorInitials,
                    { color: palette.azure },
                  ]}
                >
                  {getInitials(selectedDoctor.name)}
                </Text>
              </View>

              <View style={styles.selectedDoctorContent}>
                <Text
                  style={[
                    styles.selectedDoctorLabel,
                    { color: palette.textMuted },
                  ]}
                >
                  Selected doctor
                </Text>

                <Text
                  style={[
                    styles.selectedDoctorName,
                    { color: palette.textPrimary },
                  ]}
                  numberOfLines={1}
                >
                  {selectedDoctor.name}
                </Text>
              </View>

              <Ionicons
                name="checkmark-circle"
                size={21}
                color={palette.azure}
              />
            </View>
          )}

          <Pressable
            onPress={handleContinue}
            disabled={!selectedDoctorId}
            style={[
              styles.continueButton,
              {
                backgroundColor: selectedDoctorId
                  ? palette.azure
                  : palette.cardRaised,
              },
            ]}
          >
            <Text
              style={[
                styles.continueText,
                {
                  color: selectedDoctorId
                    ? palette.onAzure
                    : palette.textMuted,
                },
              ]}
            >
              Continue to Date & Time
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color={
                selectedDoctorId
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
    paddingTop: 28,
    paddingBottom: 150,
  },

  title: {
    fontSize: 25,
    lineHeight: 32,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 7,
    marginBottom: 20,
  },

  clinicCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 17,
    padding: 14,
    marginBottom: 10,
  },

  clinicIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  clinicContent: {
    flex: 1,
  },

  clinicName: {
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },

  clinicLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 5,
  },

  clinicLocation: {
    flex: 1,
    fontSize: 12,
  },

  clinicMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 9,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  ratingText: {
    fontSize: 12,
    fontWeight: "700",
  },

  distanceBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },

  distanceText: {
    fontSize: 10,
    fontWeight: "600",
  },

  issueCard: {
    minHeight: 52,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginBottom: 25,
  },

  issueContent: {
    flex: 1,
  },

  issueLabel: {
    fontSize: 10,
    marginBottom: 2,
  },

  issueValue: {
    fontSize: 12,
    fontWeight: "600",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 11,
  },

  sectionHeaderContent: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  sectionSubtitle: {
    fontSize: 11,
    marginTop: 3,
  },

  recommendedBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 9,
    marginLeft: 10,
  },

  recommendedText: {
    fontSize: 10,
    fontWeight: "700",
  },

  doctorList: {
    gap: 12,
  },

  doctorCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
  },

  cardPressed: {
    opacity: 0.8,
  },

  topDoctorBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 12,
  },

  topDoctorText: {
    fontSize: 10,
    fontWeight: "700",
  },

  doctorMainRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "800",
  },

  doctorInfo: {
    flex: 1,
  },

  doctorNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  doctorName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
  },

  doctorSpecialty: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },

  doctorStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 13,
    borderTopWidth: 1,
  },

  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  statValue: {
    fontSize: 12,
    fontWeight: "700",
  },

  statLabel: {
    fontSize: 9,
    marginTop: 1,
  },

  statDivider: {
    width: 1,
    height: 28,
    marginHorizontal: 10,
  },

  selectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 13,
  },

  selectionText: {
    fontSize: 11,
    fontWeight: "600",
  },

  emptyCard: {
    borderWidth: 1,
    borderRadius: 17,
    padding: 25,
    alignItems: "center",
  },

  emptyIcon: {
    width: 48,
    height: 48,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 12,
  },

  emptyText: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 5,
    maxWidth: 270,
  },

  footer: {
    paddingTop: 9,
    paddingBottom: 14,
  },

  selectedDoctorPreview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },

  selectedDoctorAvatar: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  selectedDoctorInitials: {
    fontSize: 12,
    fontWeight: "800",
  },

  selectedDoctorContent: {
    flex: 1,
  },

  selectedDoctorLabel: {
    fontSize: 9,
  },

  selectedDoctorName: {
    fontSize: 12,
    fontWeight: "700",
    marginTop: 1,
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