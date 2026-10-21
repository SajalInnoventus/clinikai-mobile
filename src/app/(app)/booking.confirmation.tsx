import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { getClinicById, getDoctorById } from "@/features/booking/mock.booking.data";
import { useVisit } from "@/features/visit/visit.context";

function formatFullDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BookingConfirmationScreen() {
  const { clinicId, doctorId, date, time } = useLocalSearchParams<{
    clinicId: string;
    doctorId: string;
    date: string;
    time: string;
  }>();

  const clinic = getClinicById(clinicId ?? "");
  const doctor = getDoctorById(doctorId ?? "");
  const { bookAppointment } = useVisit();

  
  const recordedKey = useRef<string | null>(null);

  useEffect(() => {
    if (!clinic || !doctor || !date || !time) return;

    const key = `${clinic.id}-${doctor.id}-${date}-${time}`;
    if (recordedKey.current === key) return;
    recordedKey.current = key;

    bookAppointment({
      clinicName: clinic.name,
      clinicAddress: clinic.address,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date,
      time,
    });
  }, [clinic, doctor, date, time, bookAppointment]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.successBadge}>
          <Text style={styles.successBadgeIcon}>✓</Text>
        </View>

        <Text style={styles.title}>Appointment Confirmed</Text>
        <Text style={styles.subtitle}>
          You're all set. We'll remind you before your visit.
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Doctor</Text>
            <Text style={styles.rowValue}>{doctor?.name ?? "—"}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Specialty</Text>
            <Text style={styles.rowValue}>{doctor?.specialty ?? "—"}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Clinic</Text>
            <Text style={styles.rowValue}>{clinic?.name ?? "—"}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Address</Text>
            <Text style={styles.rowValue}>{clinic?.address ?? "—"}</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Date</Text>
            <Text style={styles.rowValue}>
              {date ? formatFullDate(date) : "—"}
            </Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Time</Text>
            <Text style={styles.rowValue}>{time ?? "—"}</Text>
          </View>
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipText}>
            💡 Tip: Tap "I'm on my way" on the day of your visit and we'll
            prepare your check-in.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable
          style={styles.primaryButton}
          onPress={() => router.push("./home")}
        >
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "space-between",
  },
  content: {
    padding: 24,
    alignItems: "center",
  },
  successBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 20,
  },
  successBadgeIcon: {
    fontSize: 30,
    color: "#10B981",
    fontWeight: "700",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 28,
  },
  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  rowLabel: {
    fontSize: 13,
    color: "#64748B",
  },
  rowValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    maxWidth: "60%",
    textAlign: "right",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
  },
  tipCard: {
    width: "100%",
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 14,
    marginTop: 20,
  },
  tipText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#1677FF",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  primaryButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#1677FF",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
