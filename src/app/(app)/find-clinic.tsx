import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
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

type Doctor = {
  id: string;
  name: string;
  qualification: string;
  experience: string;
  experienceYears: number;
  specialty: string;
  rating: string;
  reviews: string;
  score: number;
};

type Clinic = {
  id: string;
  name: string;
  type: "Clinic" | "Hospital";
  location: string;
  distance: string;
  rating: string;
  reviews: string;
  specialties: string[];
  open: boolean;
  doctors: Doctor[];
};

const clinics: Clinic[] = [
  {
    id: "clinic-001",
    name: "ClinikAI Care Center",
    type: "Clinic",
    location: "Sector 62, Noida",
    distance: "1.8 km",
    rating: "4.8",
    reviews: "324",
    specialties: ["General Medicine", "Pediatrics"],
    open: true,
    doctors: [
      {
        id: "doctor-001",
        name: "Dr. Priya Sharma",
        qualification: "MBBS, MD",
        experience: "12 yrs experience",
        experienceYears: 12,
        specialty: "General Medicine",
        rating: "4.9",
        reviews: "218",
        score: 98,
      },
      {
        id: "doctor-002",
        name: "Dr. Rahul Verma",
        qualification: "MBBS, MD",
        experience: "9 yrs experience",
        experienceYears: 9,
        specialty: "General Medicine",
        rating: "4.8",
        reviews: "174",
        score: 94,
      },
      {
        id: "doctor-003",
        name: "Dr. Neha Singh",
        qualification: "MBBS, DNB",
        experience: "7 yrs experience",
        experienceYears: 7,
        specialty: "Pediatrics",
        rating: "4.7",
        reviews: "143",
        score: 91,
      },
    ],
  },
  {
    id: "hospital-001",
    name: "Fortis Hospital Noida",
    type: "Hospital",
    location: "Sector 62, Noida",
    distance: "3.2 km",
    rating: "4.6",
    reviews: "1.2K",
    specialties: ["Multi-Specialty", "Emergency"],
    open: true,
    doctors: [
      {
        id: "doctor-004",
        name: "Dr. Amit Kapoor",
        qualification: "MBBS, MD",
        experience: "16 yrs experience",
        experienceYears: 16,
        specialty: "Internal Medicine",
        rating: "4.9",
        reviews: "492",
        score: 99,
      },
      {
        id: "doctor-005",
        name: "Dr. Ananya Mehta",
        qualification: "MBBS, DNB",
        experience: "11 yrs experience",
        experienceYears: 11,
        specialty: "General Medicine",
        rating: "4.8",
        reviews: "351",
        score: 96,
      },
      {
        id: "doctor-006",
        name: "Dr. Rohan Malhotra",
        qualification: "MBBS, MD",
        experience: "8 yrs experience",
        experienceYears: 8,
        specialty: "General Medicine",
        rating: "4.7",
        reviews: "286",
        score: 92,
      },
    ],
  },
  {
    id: "clinic-002",
    name: "Apollo Clinic",
    type: "Clinic",
    location: "Sector 50, Noida",
    distance: "4.5 km",
    rating: "4.5",
    reviews: "286",
    specialties: ["General Medicine", "Women's Health"],
    open: true,
    doctors: [
      {
        id: "doctor-007",
        name: "Dr. Meera Khanna",
        qualification: "MBBS, MD",
        experience: "14 yrs experience",
        experienceYears: 14,
        specialty: "General Medicine",
        rating: "4.9",
        reviews: "312",
        score: 97,
      },
      {
        id: "doctor-008",
        name: "Dr. Kavita Rao",
        qualification: "MBBS, MS",
        experience: "10 yrs experience",
        experienceYears: 10,
        specialty: "Women's Health",
        rating: "4.8",
        reviews: "264",
        score: 94,
      },
      {
        id: "doctor-009",
        name: "Dr. Arjun Bhatia",
        qualification: "MBBS, MD",
        experience: "8 yrs experience",
        experienceYears: 8,
        specialty: "General Medicine",
        rating: "4.7",
        reviews: "198",
        score: 90,
      },
    ],
  },
  {
    id: "hospital-002",
    name: "Max Super Speciality Hospital",
    type: "Hospital",
    location: "Vaishali, Ghaziabad",
    distance: "7.1 km",
    rating: "4.7",
    reviews: "890",
    specialties: ["Multi-Specialty", "Pediatrics"],
    open: true,
    doctors: [
      {
        id: "doctor-010",
        name: "Dr. Sanjay Arora",
        qualification: "MBBS, MD",
        experience: "18 yrs experience",
        experienceYears: 18,
        specialty: "Internal Medicine",
        rating: "4.9",
        reviews: "624",
        score: 100,
      },
      {
        id: "doctor-011",
        name: "Dr. Ritu Sharma",
        qualification: "MBBS, DNB",
        experience: "13 yrs experience",
        experienceYears: 13,
        specialty: "Pediatrics",
        rating: "4.8",
        reviews: "438",
        score: 96,
      },
      {
        id: "doctor-012",
        name: "Dr. Vivek Jain",
        qualification: "MBBS, MD",
        experience: "10 yrs experience",
        experienceYears: 10,
        specialty: "General Medicine",
        rating: "4.7",
        reviews: "326",
        score: 92,
      },
    ],
  },
];

export default function FindClinicScreen() {
  const { palette } = useClinikaiTheme();

  const { issue, location } = useLocalSearchParams<{
    issue?: string;
    location?: string;
  }>();

  const [search, setSearch] = useState("");
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(
    null,
  );

  const filteredClinics = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return clinics;
    }

    return clinics.filter((clinic) => {
      return (
        clinic.name.toLowerCase().includes(query) ||
        clinic.location.toLowerCase().includes(query) ||
        clinic.specialties.some((specialty) =>
          specialty.toLowerCase().includes(query),
        ) ||
        clinic.doctors.some(
          (doctor) =>
            doctor.name.toLowerCase().includes(query) ||
            doctor.specialty.toLowerCase().includes(query) ||
            doctor.qualification.toLowerCase().includes(query),
        )
      );
    });
  }, [search]);

  function handleClinicPress(clinicId: string) {
    setSelectedClinicId((currentId) =>
      currentId === clinicId ? null : clinicId,
    );
  }

  function handleContinue() {
    if (!selectedClinicId) {
      return;
    }

    const clinic = clinics.find((item) => item.id === selectedClinicId);

    if (!clinic) {
      return;
    }

    router.push({
      pathname: "./select-doctor",
      params: {
        issue: issue ?? "",
        location: location ?? "",
        clinicId: clinic.id,
        clinicName: clinic.name,
        clinicLocation: clinic.location,
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
            Find Clinic
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.progressRow}>
          {[0, 1, 2, 3].map((item) => (
            <View
              key={item}
              style={[
                styles.progressActive,
                { backgroundColor: palette.azure },
              ]}
            />
          ))}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <Text
            style={[
              styles.title,
              { color: palette.textPrimary },
            ]}
          >
            Choose a clinic or hospital
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: palette.textSecondary },
            ]}
          >
            Compare nearby clinics and the doctors available for your
            condition.
          </Text>

          <View
            style={[
              styles.summaryCard,
              { backgroundColor: palette.cardRaised },
            ]}
          >
            <View style={styles.summaryRow}>
              <Ionicons
                name="medical-outline"
                size={18}
                color={palette.azure}
              />

              <View style={styles.summaryContent}>
                <Text
                  style={[
                    styles.summaryLabel,
                    { color: palette.textSecondary },
                  ]}
                >
                  Medical issue
                </Text>

                <Text
                  style={[
                    styles.summaryValue,
                    { color: palette.textPrimary },
                  ]}
                >
                  {issue || "General consultation"}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.summaryDivider,
                { backgroundColor: palette.border },
              ]}
            />

            <View style={styles.summaryRow}>
              <Ionicons
                name="location-outline"
                size={18}
                color={palette.azure}
              />

              <View style={styles.summaryContent}>
                <Text
                  style={[
                    styles.summaryLabel,
                    { color: palette.textSecondary },
                  ]}
                >
                  Location
                </Text>

                <Text
                  style={[
                    styles.summaryValue,
                    { color: palette.textPrimary },
                  ]}
                >
                  {location || "Selected location"}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={[
              styles.searchContainer,
              {
                backgroundColor: palette.card,
                borderColor: palette.border,
              },
            ]}
          >
            <Ionicons
              name="search-outline"
              size={19}
              color={palette.textMuted}
            />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search clinic, hospital or doctor"
              placeholderTextColor={palette.textMuted}
              style={[
                styles.searchInput,
                { color: palette.textPrimary },
              ]}
            />

            {search.length > 0 && (
              <Pressable
                onPress={() => setSearch("")}
                accessibilityRole="button"
                accessibilityLabel="Clear search"
              >
                <Ionicons
                  name="close-circle"
                  size={19}
                  color={palette.textMuted}
                />
              </Pressable>
            )}
          </View>

          <View style={styles.resultHeader}>
            <Text
              style={[
                styles.resultTitle,
                { color: palette.textPrimary },
              ]}
            >
              Nearby healthcare
            </Text>

            <Text
              style={[
                styles.resultCount,
                { color: palette.textSecondary },
              ]}
            >
              {filteredClinics.length} available
            </Text>
          </View>

          <View style={styles.clinicList}>
            {filteredClinics.map((clinic) => {
              const selected = selectedClinicId === clinic.id;

              return (
                <Pressable
                  key={clinic.id}
                  onPress={() => handleClinicPress(clinic.id)}
                  style={[
                    styles.clinicCard,
                    {
                      backgroundColor: selected
                        ? palette.azureMuted
                        : palette.card,
                      borderColor: selected
                        ? palette.azure
                        : palette.border,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`View ${clinic.name} and recommended doctors`}
                >
                  <View style={styles.clinicMainRow}>
                    <View
                      style={[
                        styles.clinicIcon,
                        { backgroundColor: palette.cardRaised },
                      ]}
                    >
                      <Ionicons
                        name={
                          clinic.type === "Hospital"
                            ? "business-outline"
                            : "medkit-outline"
                        }
                        size={24}
                        color={palette.azure}
                      />
                    </View>

                    <View style={styles.clinicContent}>
                      <View style={styles.clinicNameRow}>
                        <Text
                          style={[
                            styles.clinicName,
                            { color: palette.textPrimary },
                          ]}
                        >
                          {clinic.name}
                        </Text>

                        <Ionicons
                          name={
                            selected
                              ? "chevron-up"
                              : "chevron-down"
                          }
                          size={19}
                          color={palette.textMuted}
                        />
                      </View>

                      <View style={styles.typeRow}>
                        <Text
                          style={[
                            styles.typeText,
                            { color: palette.textSecondary },
                          ]}
                        >
                          {clinic.type}
                        </Text>

                        <View
                          style={[
                            styles.dot,
                            { backgroundColor: palette.textMuted },
                          ]}
                        />

                        <Text
                          style={[
                            styles.typeText,
                            { color: palette.textSecondary },
                          ]}
                        >
                          {clinic.distance}
                        </Text>
                      </View>

                      <View style={styles.locationRow}>
                        <Ionicons
                          name="location-outline"
                          size={14}
                          color={palette.textMuted}
                        />

                        <Text
                          style={[
                            styles.locationText,
                            { color: palette.textSecondary },
                          ]}
                        >
                          {clinic.location}
                        </Text>
                      </View>

                      <View style={styles.bottomRow}>
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
                            {clinic.rating}
                          </Text>

                          <Text
                            style={[
                              styles.reviewText,
                              { color: palette.textMuted },
                            ]}
                          >
                            ({clinic.reviews})
                          </Text>
                        </View>

                        <View style={styles.specialtyRow}>
                          {clinic.specialties.slice(0, 2).map(
                            (specialty) => (
                              <View
                                key={specialty}
                                style={[
                                  styles.specialtyBadge,
                                  {
                                    backgroundColor:
                                      palette.cardRaised,
                                  },
                                ]}
                              >
                                <Text
                                  style={[
                                    styles.specialtyText,
                                    {
                                      color:
                                        palette.textSecondary,
                                    },
                                  ]}
                                  numberOfLines={1}
                                >
                                  {specialty}
                                </Text>
                              </View>
                            ),
                          )}
                        </View>
                      </View>

                      <View style={styles.openRow}>
                        <View
                          style={[
                            styles.openDot,
                            {
                              backgroundColor: clinic.open
                                ? palette.success
                                : palette.critical,
                            },
                          ]}
                        />

                        <Text
                          style={[
                            styles.openText,
                            {
                              color: clinic.open
                                ? palette.success
                                : palette.critical,
                            },
                          ]}
                        >
                          {clinic.open ? "Open now" : "Closed"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {selected && (
                    <View
                      style={[
                        styles.recommendationSection,
                        { borderTopColor: palette.border },
                      ]}
                    >
                      <View style={styles.recommendationHeader}>
                        <View style={styles.recommendationTitleRow}>
                          <Ionicons
                            name="sparkles-outline"
                            size={17}
                            color={palette.azure}
                          />

                          <Text
                            style={[
                              styles.recommendationTitle,
                              { color: palette.textPrimary },
                            ]}
                          >
                            Top doctors for your condition
                          </Text>
                        </View>

                        <Text
                          style={[
                            styles.recommendationSubtitle,
                            { color: palette.textSecondary },
                          ]}
                        >
                          Recommended
                        </Text>
                      </View>

                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={
                          styles.doctorScrollContent
                        }
                      >
                        {clinic.doctors
                          .sort((a, b) => b.score - a.score)
                          .slice(0, 3)
                          .map((doctor, index) => (
                            <View
                              key={doctor.id}
                              style={[
                                styles.doctorCard,
                                {
                                  backgroundColor:
                                    palette.card,
                                  borderColor:
                                    palette.border,
                                },
                              ]}
                            >
                              <View style={styles.doctorTopRow}>
                                <View
                                  style={[
                                    styles.doctorAvatar,
                                    {
                                      backgroundColor:
                                        palette.azureMuted,
                                    },
                                  ]}
                                >
                                  <Ionicons
                                    name="person"
                                    size={21}
                                    color={palette.azure}
                                  />
                                </View>

                                <View
                                  style={[
                                    styles.rankBadge,
                                    {
                                      backgroundColor:
                                        palette.azure,
                                    },
                                  ]}
                                >
                                  <Text
                                    style={[
                                      styles.rankText,
                                      {
                                        color:
                                          palette.onAzure,
                                      },
                                    ]}
                                  >
                                    #{index + 1}
                                  </Text>
                                </View>
                              </View>

                              <Text
                                style={[
                                  styles.doctorName,
                                  { color: palette.textPrimary },
                                ]}
                                numberOfLines={2}
                              >
                                {doctor.name}
                              </Text>

                              <Text
                                style={[
                                  styles.doctorQualification,
                                  {
                                    color:
                                      palette.textSecondary,
                                  },
                                ]}
                                numberOfLines={1}
                              >
                                {doctor.qualification}
                              </Text>

                              <View style={styles.doctorInfoRow}>
                                <Ionicons
                                  name="briefcase-outline"
                                  size={13}
                                  color={palette.textMuted}
                                />

                                <Text
                                  style={[
                                    styles.doctorInfoText,
                                    {
                                      color:
                                        palette.textSecondary,
                                    },
                                  ]}
                                >
                                  {doctor.experience}
                                </Text>
                              </View>

                              <View style={styles.doctorInfoRow}>
                                <Ionicons
                                  name="medical-outline"
                                  size={13}
                                  color={palette.textMuted}
                                />

                                <Text
                                  style={[
                                    styles.doctorInfoText,
                                    {
                                      color:
                                        palette.textSecondary,
                                    },
                                  ]}
                                  numberOfLines={1}
                                >
                                  {doctor.specialty}
                                </Text>
                              </View>

                              <View
                                style={[
                                  styles.doctorRatingRow,
                                  {
                                    borderTopColor:
                                      palette.border,
                                  },
                                ]}
                              >
                                <View
                                  style={styles.ratingRow}
                                >
                                  <Ionicons
                                    name="star"
                                    size={13}
                                    color={palette.warning}
                                  />

                                  <Text
                                    style={[
                                      styles.doctorRating,
                                      {
                                        color:
                                          palette.textPrimary,
                                      },
                                    ]}
                                  >
                                    {doctor.rating}
                                  </Text>

                                  <Text
                                    style={[
                                      styles.doctorReviews,
                                      {
                                        color:
                                          palette.textMuted,
                                      },
                                    ]}
                                  >
                                    ({doctor.reviews})
                                  </Text>
                                </View>
                              </View>
                            </View>
                          ))}
                      </ScrollView>

                      <Text
                        style={[
                          styles.recommendationNote,
                          { color: palette.textMuted },
                        ]}
                      >
                        Ranked using relevant specialty, qualification,
                        experience and patient ratings.
                      </Text>
                    </View>
                  )}
                </Pressable>
              );
            })}

            {filteredClinics.length === 0 && (
              <View style={styles.emptyState}>
                <Ionicons
                  name="search-outline"
                  size={30}
                  color={palette.textMuted}
                />

                <Text
                  style={[
                    styles.emptyTitle,
                    { color: palette.textPrimary },
                  ]}
                >
                  No clinics found
                </Text>

                <Text
                  style={[
                    styles.emptySubtitle,
                    { color: palette.textSecondary },
                  ]}
                >
                  Try searching with another clinic name, specialty or
                  doctor.
                </Text>
              </View>
            )}
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
            disabled={!selectedClinicId}
            style={[
              styles.continueButton,
              {
                backgroundColor: selectedClinicId
                  ? palette.azure
                  : palette.cardRaised,
              },
            ]}
          >
            <Text
              style={[
                styles.continueText,
                {
                  color: selectedClinicId
                    ? palette.onAzure
                    : palette.textMuted,
                },
              ]}
            >
              Select Clinic
            </Text>

            <Ionicons
              name="arrow-forward"
              size={19}
              color={
                selectedClinicId
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

  scrollContent: {
    paddingTop: 28,
    paddingBottom: 30,
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

  summaryCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  summaryContent: {
    flex: 1,
    marginLeft: 10,
  },

  summaryLabel: {
    fontSize: 11,
    marginBottom: 2,
  },

  summaryValue: {
    fontSize: 13,
    fontWeight: "600",
  },

  summaryDivider: {
    height: 1,
    marginVertical: 12,
    marginLeft: 28,
  },

  searchContainer: {
    height: 50,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 14,
  },

  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 11,
  },

  resultTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  resultCount: {
    fontSize: 12,
  },

  clinicList: {
    gap: 11,
  },

  clinicCard: {
    borderWidth: 1,
    borderRadius: 17,
    padding: 14,
  },

  clinicMainRow: {
    flexDirection: "row",
  },

  clinicIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  clinicContent: {
    flex: 1,
  },

  clinicNameRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },

  clinicName: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 20,
  },

  typeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 6,
  },

  typeText: {
    fontSize: 11,
  },

  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 7,
  },

  locationText: {
    fontSize: 12,
  },

  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
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

  reviewText: {
    fontSize: 11,
  },

  specialtyRow: {
    flexDirection: "row",
    gap: 5,
    flexShrink: 1,
  },

  specialtyBadge: {
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,
    maxWidth: 125,
  },

  specialtyText: {
    fontSize: 9,
    fontWeight: "500",
  },

  openRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 9,
  },

  openDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  openText: {
    fontSize: 10,
    fontWeight: "600",
  },

  recommendationSection: {
    borderTopWidth: 1,
    marginTop: 14,
    paddingTop: 14,
  },

  recommendationHeader: {
    marginBottom: 11,
  },

  recommendationTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  recommendationTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  recommendationSubtitle: {
    fontSize: 11,
    marginTop: 3,
    marginLeft: 23,
  },

  doctorScrollContent: {
    gap: 9,
    paddingRight: 4,
  },

  doctorCard: {
    width: 178,
    minHeight: 190,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
  },

  doctorTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  doctorAvatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  rankBadge: {
    minWidth: 28,
    height: 24,
    paddingHorizontal: 7,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  rankText: {
    fontSize: 10,
    fontWeight: "700",
  },

  doctorName: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    marginTop: 10,
  },

  doctorQualification: {
    fontSize: 11,
    marginTop: 2,
  },

  doctorInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },

  doctorInfoText: {
    flex: 1,
    fontSize: 10,
  },

  doctorRatingRow: {
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 9,
  },

  doctorRating: {
    fontSize: 11,
    fontWeight: "700",
  },

  doctorReviews: {
    fontSize: 10,
  },

  recommendationNote: {
    fontSize: 10,
    lineHeight: 15,
    marginTop: 10,
  },

  emptyState: {
    alignItems: "center",
    paddingVertical: 50,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
  },

  emptySubtitle: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
    marginTop: 5,
    maxWidth: 280,
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