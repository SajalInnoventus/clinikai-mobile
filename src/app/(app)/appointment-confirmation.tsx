import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
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
} from "@/features/booking/mock.booking.data";
import { useClinikaiTheme } from "@/features/theme/theme.context";

export default function AppointmentConfirmationScreen() {
  const { palette } = useClinikaiTheme();

  const {
    clinicId,
    doctorId,
    date,
    time,
    issue,
    location,
  } = useLocalSearchParams<{
    clinicId: string;
    doctorId: string;
    date: string;
    time: string;
    issue?: string;
    location?: string;
  }>();

  const clinic = getClinicById(clinicId ?? "");
  const doctor = getDoctorById(doctorId ?? "");

  const [isBooking, setIsBooking] = useState(false);

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return "Date not selected";
    }

    const parsedDate = new Date(`${dateString}T00:00:00`);

    return parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleConfirmAppointment = () => {
    if (isBooking) {
      return;
    }

    setIsBooking(true);

    setTimeout(() => {
      router.replace({
        pathname: "./appointment-status",
        params: {
          clinicId: clinicId ?? "",
          doctorId: doctorId ?? "",
          date: date ?? "",
          time: time ?? "",
        },
      });
    }, 800);
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

        <View>
          <Text
            style={[
              styles.headerTitle,
              { color: palette.textPrimary },
            ]}
          >
            Confirm Appointment
          </Text>

          <Text
            style={[
              styles.headerSubtitle,
              { color: palette.textSecondary },
            ]}
          >
            Review your appointment details
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.intro}>
          <View
            style={[
              styles.checkIcon,
              { backgroundColor: palette.azureMuted },
            ]}
          >
            <Ionicons
              name="checkmark"
              size={22}
              color={palette.azure}
            />
          </View>

          <Text
            style={[
              styles.introTitle,
              { color: palette.textPrimary },
            ]}
          >
            Almost done
          </Text>

          <Text
            style={[
              styles.introText,
              { color: palette.textSecondary },
            ]}
          >
            Please check the details below before confirming your
            appointment.
          </Text>
        </View>

        <View
          style={[
            styles.appointmentCard,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
            },
          ]}
        >
          <View style={styles.cardHeader}>
            <Text
              style={[
                styles.cardTitle,
                { color: palette.textPrimary },
              ]}
            >
              Appointment details
            </Text>

            <View
              style={[
                styles.statusBadge,
                { backgroundColor: palette.azureMuted },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: palette.azure },
                ]}
              >
                New
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.detailRow,
              { borderBottomColor: palette.border },
            ]}
          >
            <View
              style={[
                styles.detailIcon,
                { backgroundColor: palette.azureMuted },
              ]}
            >
              <Ionicons
                name="calendar-outline"
                size={19}
                color={palette.azure}
              />
            </View>

            <View style={styles.detailContent}>
              <Text
                style={[
                  styles.detailLabel,
                  { color: palette.textMuted },
                ]}
              >
                Date
              </Text>

              <Text
                style={[
                  styles.detailValue,
                  { color: palette.textPrimary },
                ]}
              >
                {formatDate(date)}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.detailRow,
              { borderBottomColor: palette.border },
            ]}
          >
            <View
              style={[
                styles.detailIcon,
                { backgroundColor: palette.azureMuted },
              ]}
            >
              <Ionicons
                name="time-outline"
                size={19}
                color={palette.azure}
              />
            </View>

            <View style={styles.detailContent}>
              <Text
                style={[
                  styles.detailLabel,
                  { color: palette.textMuted },
                ]}
              >
                Time
              </Text>

              <Text
                style={[
                  styles.detailValue,
                  { color: palette.textPrimary },
                ]}
              >
                {time || "Time not selected"}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.detailRow,
              { borderBottomColor: palette.border },
            ]}
          >
            <View
              style={[
                styles.detailIcon,
                { backgroundColor: palette.azureMuted },
              ]}
            >
              <Ionicons
                name="medical-outline"
                size={19}
                color={palette.azure}
              />
            </View>

            <View style={styles.detailContent}>
              <Text
                style={[
                  styles.detailLabel,
                  { color: palette.textMuted },
                ]}
              >
                Medical issue
              </Text>

              <Text
                style={[
                  styles.detailValue,
                  { color: palette.textPrimary },
                ]}
              >
                {issue || "General consultation"}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View
              style={[
                styles.detailIcon,
                { backgroundColor: palette.azureMuted },
              ]}
            >
              <Ionicons
                name="location-outline"
                size={19}
                color={palette.azure}
              />
            </View>

            <View style={styles.detailContent}>
              <Text
                style={[
                  styles.detailLabel,
                  { color: palette.textMuted },
                ]}
              >
                Location
              </Text>

              <Text
                style={[
                  styles.detailValue,
                  { color: palette.textPrimary },
                ]}
              >
                {clinic?.name ?? "Selected clinic"}
              </Text>

              <Text
                style={[
                  styles.detailSecondary,
                  { color: palette.textSecondary },
                ]}
              >
                {clinic?.address ?? location ?? "Clinic location"}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.doctorCard,
            {
              backgroundColor: palette.cardRaised,
              borderColor: palette.border,
            },
          ]}
        >
          <View
            style={[
              styles.doctorAvatar,
              { backgroundColor: palette.azureMuted },
            ]}
          >
            <Text
              style={[
                styles.doctorAvatarText,
                { color: palette.azure },
              ]}
            >
              {doctor?.name?.replace("Dr. ", "").charAt(0) ?? "D"}
            </Text>
          </View>

          <View style={styles.doctorContent}>
            <Text
              style={[
                styles.doctorLabel,
                { color: palette.textMuted },
              ]}
            >
              Doctor
            </Text>

            <Text
              style={[
                styles.doctorName,
                { color: palette.textPrimary },
              ]}
            >
              {doctor?.name ?? "Selected doctor"}
            </Text>

            <Text
              style={[
                styles.doctorSpecialty,
                { color: palette.textSecondary },
              ]}
            >
              {doctor?.specialty ?? "Specialist"}
            </Text>

            <View style={styles.doctorMeta}>
              <Ionicons
                name="star"
                size={13}
                color={palette.warning}
              />

              <Text
                style={[
                  styles.metaText,
                  { color: palette.textSecondary },
                ]}
              >
                {doctor?.rating ?? "-"}
              </Text>

              <Text
                style={[
                  styles.metaDot,
                  { color: palette.textMuted },
                ]}
              >
                •
              </Text>

              <Text
                style={[
                  styles.metaText,
                  { color: palette.textSecondary },
                ]}
              >
                {doctor?.experienceYears ?? "-"} yrs experience
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.notice,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
            },
          ]}
        >
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={palette.azure}
          />

          <Text
            style={[
              styles.noticeText,
              { color: palette.textSecondary },
            ]}
          >
            Your appointment details will be available in your
            ClinikAI visits after confirmation.
          </Text>
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
        <Pressable
          onPress={handleConfirmAppointment}
          disabled={isBooking}
          style={({ pressed }) => [
            styles.confirmButton,
            {
              backgroundColor: palette.azure,
              opacity: pressed || isBooking ? 0.85 : 1,
            },
          ]}
        >
          <Text
            style={[
              styles.confirmButtonText,
              { color: palette.onAzure },
            ]}
          >
            {isBooking ? "Confirming..." : "Confirm Appointment"}
          </Text>

          {!isBooking && (
            <Ionicons
              name="checkmark-circle-outline"
              size={19}
              color={palette.onAzure}
            />
          )}
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
    paddingBottom: 130,
  },

  intro: {
    alignItems: "center",
    marginBottom: 24,
  },

  checkIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  introTitle: {
    fontSize: 21,
    fontWeight: "800",
  },

  introText: {
    maxWidth: 320,
    marginTop: 6,
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
  },

  appointmentCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  detailIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  detailContent: {
    flex: 1,
    marginLeft: 12,
  },

  detailLabel: {
    fontSize: 11,
  },

  detailValue: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: "600",
  },

  detailSecondary: {
    marginTop: 3,
    fontSize: 12,
  },

  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },

  doctorAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
  },

  doctorAvatarText: {
    fontSize: 20,
    fontWeight: "800",
  },

  doctorContent: {
    flex: 1,
    marginLeft: 13,
  },

  doctorLabel: {
    fontSize: 11,
  },

  doctorName: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "700",
  },

  doctorSpecialty: {
    marginTop: 3,
    fontSize: 13,
  },

  doctorMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  metaText: {
    marginLeft: 4,
    fontSize: 12,
  },

  metaDot: {
    marginHorizontal: 7,
    fontSize: 12,
  },

  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
    padding: 14,
    borderRadius: 15,
    borderWidth: 1,
  },

  noticeText: {
    flex: 1,
    marginLeft: 9,
    fontSize: 12,
    lineHeight: 18,
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

  confirmButton: {
    minHeight: 54,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  confirmButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
});