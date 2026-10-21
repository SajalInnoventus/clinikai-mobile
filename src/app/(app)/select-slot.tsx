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
  getDoctorById,
  getSlotsForDoctor,
} from "@/features/booking/mock.booking.data";
import { useClinikaiTheme } from "@/features/theme/theme.context";

export default function SelectDateTimeScreen() {
  const { palette } = useClinikaiTheme();

  const {
    clinicId,
    doctorId,
    issue,
    location,
  } = useLocalSearchParams<{
    clinicId: string;
    doctorId: string;
    issue?: string;
    location?: string;
  }>();

  const clinic = getClinicById(clinicId ?? "");
  const doctor = getDoctorById(doctorId ?? "");

  const slots = useMemo(
    () => getSlotsForDoctor(doctorId ?? ""),
    [doctorId],
  );

  const availableDates = useMemo(() => {
    const uniqueDates = Array.from(
      new Set(slots.map((slot) => slot.date)),
    );

    return uniqueDates;
  }, [slots]);

  const [selectedDate, setSelectedDate] = useState(
    availableDates[0] ?? "",
  );

  const [selectedSlotId, setSelectedSlotId] = useState("");

  const selectedDateSlots = useMemo(
    () => slots.filter((slot) => slot.date === selectedDate),
    [slots, selectedDate],
  );

  const selectedSlot = slots.find(
    (slot) => slot.id === selectedSlotId,
  );

  const formatDate = (dateString: string) => {
    const date = new Date(`${dateString}T00:00:00`);

    return {
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      date: date.toLocaleDateString("en-US", {
        day: "numeric",
      }),
      month: date.toLocaleDateString("en-US", {
        month: "short",
      }),
    };
  };

  const handleContinue = () => {
    if (!selectedSlot) {
      return;
    }

    router.push({
      pathname: "./appointment-confirmation",
      params: {
        clinicId: clinicId ?? "",
        doctorId: doctorId ?? "",
        date: selectedSlot.date,
        time: selectedSlot.time,
        issue: issue ?? "",
        location: location ?? "",
      },
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: palette.background },
      ]}
    >
      <View
        style={[
          styles.header,
          { borderBottomColor: palette.border },
        ]}
      >
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backButton}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={palette.textPrimary}
          />
        </Pressable>

        <View style={styles.headerContent}>
          <Text
            style={[
              styles.headerTitle,
              { color: palette.textPrimary },
            ]}
          >
            Date & Time
          </Text>

          <Text
            style={[
              styles.headerSubtitle,
              { color: palette.textSecondary },
            ]}
            numberOfLines={1}
          >
            Choose when you want to visit
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.doctorCard,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
            },
          ]}
        >
          <View
            style={[
              styles.avatar,
              { backgroundColor: palette.azureMuted },
            ]}
          >
            <Text
              style={[
                styles.avatarText,
                { color: palette.azure },
              ]}
            >
              {doctor?.name
                ?.replace("Dr. ", "")
                .charAt(0) ?? "D"}
            </Text>
          </View>

          <View style={styles.doctorInfo}>
            <Text
              style={[
                styles.doctorName,
                { color: palette.textPrimary },
              ]}
            >
              {doctor?.name ?? "Doctor"}
            </Text>

            <Text
              style={[
                styles.doctorSpecialty,
                { color: palette.textSecondary },
              ]}
            >
              {doctor?.specialty ?? "Specialist"}
            </Text>

            <View style={styles.doctorMetaRow}>
              <Ionicons
                name="star"
                size={14}
                color={palette.warning}
              />

              <Text
                style={[
                  styles.doctorMeta,
                  { color: palette.textSecondary },
                ]}
              >
                {doctor?.rating ?? "-"}
              </Text>

              <Text
                style={[
                  styles.metaSeparator,
                  { color: palette.textMuted },
                ]}
              >
                •
              </Text>

              <Text
                style={[
                  styles.doctorMeta,
                  { color: palette.textSecondary },
                ]}
              >
                {doctor?.experienceYears ?? "-"} yrs experience
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              { color: palette.textPrimary },
            ]}
          >
            Select date
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}
          >
            {availableDates.map((date) => {
              const formattedDate = formatDate(date);
              const isSelected = selectedDate === date;

              return (
                <Pressable
                  key={date}
                  onPress={() => {
                    setSelectedDate(date);
                    setSelectedSlotId("");
                  }}
                  style={[
                    styles.dateCard,
                    {
                      backgroundColor: isSelected
                        ? palette.azure
                        : palette.card,
                      borderColor: isSelected
                        ? palette.azure
                        : palette.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dateDay,
                      {
                        color: isSelected
                          ? palette.onAzure
                          : palette.textSecondary,
                      },
                    ]}
                  >
                    {formattedDate.day}
                  </Text>

                  <Text
                    style={[
                      styles.dateNumber,
                      {
                        color: isSelected
                          ? palette.onAzure
                          : palette.textPrimary,
                      },
                    ]}
                  >
                    {formattedDate.date}
                  </Text>

                  <Text
                    style={[
                      styles.dateMonth,
                      {
                        color: isSelected
                          ? palette.onAzure
                          : palette.textSecondary,
                      },
                    ]}
                  >
                    {formattedDate.month}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.timeHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: palette.textPrimary },
              ]}
            >
              Available time
            </Text>

            <Text
              style={[
                styles.slotCount,
                { color: palette.textSecondary },
              ]}
            >
              {selectedDateSlots.length} slots
            </Text>
          </View>

          <View style={styles.timeGrid}>
            {selectedDateSlots.map((slot) => {
              const isSelected = selectedSlotId === slot.id;

              return (
                <Pressable
                  key={slot.id}
                  onPress={() => setSelectedSlotId(slot.id)}
                  style={[
                    styles.timeSlot,
                    {
                      backgroundColor: isSelected
                        ? palette.azure
                        : palette.card,
                      borderColor: isSelected
                        ? palette.azure
                        : palette.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.timeText,
                      {
                        color: isSelected
                          ? palette.onAzure
                          : palette.textPrimary,
                      },
                    ]}
                  >
                    {slot.time}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View
          style={[
            styles.clinicInfo,
            {
              backgroundColor: palette.cardRaised,
              borderColor: palette.border,
            },
          ]}
        >
          <Ionicons
            name="location-outline"
            size={19}
            color={palette.azure}
          />

          <View style={styles.clinicInfoText}>
            <Text
              style={[
                styles.clinicName,
                { color: palette.textPrimary },
              ]}
            >
              {clinic?.name ?? "Selected clinic"}
            </Text>

            <Text
              style={[
                styles.clinicAddress,
                { color: palette.textSecondary },
              ]}
            >
              {clinic?.address ?? location ?? "Clinic location"}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          {
            backgroundColor: palette.background,
            borderTopColor: palette.border,
          },
        ]}
      >
        <View style={styles.selectionSummary}>
          <Text
            style={[
              styles.summaryLabel,
              { color: palette.textSecondary },
            ]}
          >
            Selected time
          </Text>

          <Text
            style={[
              styles.summaryValue,
              { color: palette.textPrimary },
            ]}
          >
            {selectedSlot
              ? `${formatDate(selectedSlot.date).day}, ${formatDate(selectedSlot.date).date} ${formatDate(selectedSlot.date).month} · ${selectedSlot.time}`
              : "Select a date and time"}
          </Text>
        </View>

        <Pressable
          disabled={!selectedSlot}
          onPress={handleContinue}
          style={({ pressed }) => [
            styles.continueButton,
            {
              backgroundColor: selectedSlot
                ? palette.azure
                : palette.border,
              opacity: pressed && selectedSlot ? 0.85 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.continueButtonText,
              {
                color: selectedSlot
                  ? palette.onAzure
                  : palette.textMuted,
              },
            ]}
          >
            Continue
          </Text>

          <Ionicons
            name="arrow-forward"
            size={18}
            color={
              selectedSlot
                ? palette.onAzure
                : palette.textMuted
            }
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  headerContent: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 13,
  },

  content: {
    padding: 20,
    paddingBottom: 150,
  },

  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "700",
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 14,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: "700",
  },

  doctorSpecialty: {
    marginTop: 3,
    fontSize: 13,
  },

  doctorMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  doctorMeta: {
    marginLeft: 4,
    fontSize: 12,
  },

  metaSeparator: {
    marginHorizontal: 7,
    fontSize: 12,
  },

  section: {
    marginTop: 26,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  dateList: {
    gap: 10,
    paddingTop: 14,
  },

  dateCard: {
    width: 78,
    minHeight: 94,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  dateDay: {
    fontSize: 12,
    fontWeight: "600",
  },

  dateNumber: {
    marginTop: 5,
    fontSize: 22,
    fontWeight: "800",
  },

  dateMonth: {
    marginTop: 2,
    fontSize: 12,
  },

  timeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  slotCount: {
    fontSize: 12,
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },

  timeSlot: {
    width: "31%",
    minHeight: 48,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  timeText: {
    fontSize: 13,
    fontWeight: "600",
  },

  clinicInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 26,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
  },

  clinicInfoText: {
    flex: 1,
    marginLeft: 10,
  },

  clinicName: {
    fontSize: 14,
    fontWeight: "700",
  },

  clinicAddress: {
    marginTop: 3,
    fontSize: 12,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  selectionSummary: {
    marginBottom: 10,
  },

  summaryLabel: {
    fontSize: 11,
  },

  summaryValue: {
    marginTop: 3,
    fontSize: 13,
    fontWeight: "600",
  },

  continueButton: {
    minHeight: 52,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  continueButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
});