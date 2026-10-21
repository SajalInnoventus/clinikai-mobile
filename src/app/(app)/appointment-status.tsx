import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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

export default function AppointmentStatusScreen() {
  const { palette } = useClinikaiTheme();

  const {
    clinicId,
    doctorId,
    date,
    time,
  } = useLocalSearchParams<{
    clinicId: string;
    doctorId: string;
    date: string;
    time: string;
  }>();

  const clinic = getClinicById(clinicId ?? "");
  const doctor = getDoctorById(doctorId ?? "");

  const formatDate = (dateString?: string) => {
    if (!dateString) {
      return "Date not available";
    }

    const parsedDate = new Date(`${dateString}T00:00:00`);

    return parsedDate.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleHome = () => {
    router.replace("/");
  };

  const handleViewAppointment = () => {
    router.push("/(app)/queue");
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: palette.background },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.successSection}>
          <View
            style={[
              styles.successCircle,
              { backgroundColor: palette.azureMuted },
            ]}
          >
            <Ionicons
              name="checkmark"
              size={42}
              color={palette.azure}
            />
          </View>

          <Text
            style={[
              styles.successTitle,
              { color: palette.textPrimary },
            ]}
          >
            Appointment booked
          </Text>

          <Text
            style={[
              styles.successSubtitle,
              { color: palette.textSecondary },
            ]}
          >
            Your appointment has been successfully scheduled.
          </Text>
        </View>

        <View
          style={[
            styles.statusCard,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
            },
          ]}
        >
          <View style={styles.statusHeader}>
            <View>
              <Text
                style={[
                  styles.statusLabel,
                  { color: palette.textMuted },
                ]}
              >
                Appointment status
              </Text>

              <Text
                style={[
                  styles.statusTitle,
                  { color: palette.textPrimary },
                ]}
              >
                Scheduled
              </Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                { backgroundColor: palette.azureMuted },
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: palette.success },
                ]}
              />

              <Text
                style={[
                  styles.statusBadgeText,
                  { color: palette.textPrimary },
                ]}
              >
                Confirmed
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.divider,
              { backgroundColor: palette.border },
            ]}
          />

          <View style={styles.appointmentDate}>
            <View
              style={[
                styles.dateIcon,
                { backgroundColor: palette.azureMuted },
              ]}
            >
              <Ionicons
                name="calendar"
                size={22}
                color={palette.azure}
              />
            </View>

            <View style={styles.dateContent}>
              <Text
                style={[
                  styles.dateLabel,
                  { color: palette.textMuted },
                ]}
              >
                Appointment
              </Text>

              <Text
                style={[
                  styles.dateValue,
                  { color: palette.textPrimary },
                ]}
              >
                {formatDate(date)}
              </Text>

              <Text
                style={[
                  styles.timeValue,
                  { color: palette.azure },
                ]}
              >
                {time || "Time not available"}
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
              {doctor?.name?.replace("Dr. ", "").charAt(0) ?? "D"}
            </Text>
          </View>

          <View style={styles.doctorInfo}>
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

            <View style={styles.ratingRow}>
              <Ionicons
                name="star"
                size={13}
                color={palette.warning}
              />

              <Text
                style={[
                  styles.ratingText,
                  { color: palette.textSecondary },
                ]}
              >
                {doctor?.rating ?? "-"}
              </Text>

              <Text
                style={[
                  styles.dot,
                  { color: palette.textMuted },
                ]}
              >
                •
              </Text>

              <Text
                style={[
                  styles.ratingText,
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
              { backgroundColor: palette.azureMuted },
            ]}
          >
            <Ionicons
              name="location"
              size={21}
              color={palette.azure}
            />
          </View>

          <View style={styles.clinicInfo}>
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
              {clinic?.address ?? "Clinic location"}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.infoCard,
            {
              backgroundColor: palette.card,
              borderColor: palette.border,
            },
          ]}
        >
          <Ionicons
            name="notifications-outline"
            size={20}
            color={palette.azure}
          />

          <Text
            style={[
              styles.infoText,
              { color: palette.textSecondary },
            ]}
          >
            We'll remind you about your appointment and keep you
            updated when it's almost time for your visit.
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
          onPress={handleViewAppointment}
          style={[
            styles.secondaryButton,
            { borderColor: palette.azure },
          ]}
        >
          <Text
            style={[
              styles.secondaryButtonText,
              { color: palette.azure },
            ]}
          >
            View Appointment
          </Text>
        </Pressable>

        <Pressable
          onPress={handleHome}
          style={[
            styles.primaryButton,
            { backgroundColor: palette.azure },
          ]}
        >
          <Text
            style={[
              styles.primaryButtonText,
              { color: palette.onAzure },
            ]}
          >
            Go to Home
          </Text>

          <Ionicons
            name="arrow-forward"
            size={18}
            color={palette.onAzure}
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

  content: {
    padding: 20,
    paddingBottom: 160,
  },

  successSection: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 28,
  },

  successCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  successTitle: {
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
  },

  successSubtitle: {
    maxWidth: 310,
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },

  statusCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 17,
  },

  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusLabel: {
    fontSize: 11,
  },

  statusTitle: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: "800",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 12,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },

  statusBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 16,
  },

  appointmentDate: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  dateContent: {
    flex: 1,
    marginLeft: 12,
  },

  dateLabel: {
    fontSize: 11,
  },

  dateValue: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: "600",
  },

  timeValue: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: "700",
  },

  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 21,
    fontWeight: "800",
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 13,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: "700",
  },

  doctorSpecialty: {
    marginTop: 3,
    fontSize: 13,
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 12,
  },

  dot: {
    marginHorizontal: 7,
    fontSize: 12,
  },

  clinicCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },

  clinicIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  clinicInfo: {
    flex: 1,
    marginLeft: 12,
  },

  clinicName: {
    fontSize: 15,
    fontWeight: "700",
  },

  clinicAddress: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 17,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 16,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
  },

  infoText: {
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

  secondaryButton: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },

  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "700",
  },

  primaryButton: {
    minHeight: 52,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  primaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
  },
});