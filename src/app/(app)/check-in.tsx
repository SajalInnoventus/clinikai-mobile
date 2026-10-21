import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useVisit } from "@/features/visit/visit.context";

type CheckInStage = "confirm" | "checking-in" | "checked-in";


function generateToken(): { display: string; patientNumber: number } {
  const patientNumber = 20 + Math.floor(Math.random() * 8); 
  return { display: `A-${patientNumber}`, patientNumber };
}

export default function CheckInScreen() {
  const { upcomingAppointment, checkIn } = useVisit();

  const [stage, setStage] = useState<CheckInStage>("confirm");
  const [token, setToken] = useState<{ display: string; patientNumber: number } | null>(
    null,
  );
  
  const [appointmentSnapshot, setAppointmentSnapshot] = useState(upcomingAppointment);

  const displayAppointment = appointmentSnapshot ?? upcomingAppointment;

  const handleCheckIn = () => {
    setAppointmentSnapshot(upcomingAppointment);
    setStage("checking-in");

    
    setTimeout(() => {
      const newToken = generateToken();
      setToken(newToken);
      checkIn({ tokenNumber: newToken.display, patientToken: newToken.patientNumber });
      setStage("checked-in");
    }, 1200);
  };

  const handleViewQueue = () => {
    if (!token) return;
    router.push({
      pathname: "./queue",
      params: { tokenNumber: token.display, patientToken: String(token.patientNumber) },
    });
  };

  if (!upcomingAppointment && stage === "confirm") {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Check In</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>📅</Text>
          </View>
          <Text style={styles.title}>No appointment to check in for</Text>
          <Text style={styles.subtitle}>
            Book an appointment first, then come back here on the day of your visit.
          </Text>
        </View>

        <View style={styles.footer}>
          <Pressable style={styles.primaryButton} onPress={() => router.push("./find-clinic")}>
            <Text style={styles.primaryButtonText}>Book an Appointment</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Check In</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.visitCard}>
          <Text style={styles.visitLabel}>TODAY'S APPOINTMENT</Text>
          <Text style={styles.visitDoctor}>{displayAppointment?.doctorName ?? "—"}</Text>
          <Text style={styles.visitMeta}>
            {displayAppointment
              ? `${displayAppointment.clinicName} · ${displayAppointment.time}`
              : "—"}
          </Text>
        </View>

        {stage === "confirm" && (
          <>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>📍</Text>
            </View>
            <Text style={styles.title}>You've arrived at the clinic</Text>
            <Text style={styles.subtitle}>
              Check in now to join the queue and get your token number.
            </Text>
          </>
        )}

        {stage === "checking-in" && (
          <>
            <ActivityIndicator size="large" color="#1677FF" style={styles.spinner} />
            <Text style={styles.title}>Checking you in…</Text>
            <Text style={styles.subtitle}>Assigning your queue token</Text>
          </>
        )}

        {stage === "checked-in" && token && (
          <>
            <View style={[styles.iconCircle, styles.iconCircleSuccess]}>
              <Text style={styles.iconText}>✓</Text>
            </View>
            <Text style={styles.title}>You're checked in</Text>
            <Text style={styles.subtitle}>Here's your queue token</Text>

            <View style={styles.tokenCard}>
              <Text style={styles.tokenLabel}>YOUR TOKEN</Text>
              <Text style={styles.tokenNumber}>{token.display}</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.footer}>
        {stage === "confirm" && (
          <Pressable style={styles.primaryButton} onPress={handleCheckIn}>
            <Text style={styles.primaryButtonText}>Check In</Text>
          </Pressable>
        )}

        {stage === "checking-in" && (
          <View style={[styles.primaryButton, styles.primaryButtonDisabled]}>
            <Text style={styles.primaryButtonText}>Checking in…</Text>
          </View>
        )}

        {stage === "checked-in" && (
          <Pressable style={styles.primaryButton} onPress={handleViewQueue}>
            <Text style={styles.primaryButtonText}>View Live Queue</Text>
          </Pressable>
        )}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },
  backButtonText: {
    fontSize: 26,
    color: "#1677FF",
    marginTop: -2,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  visitCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 40,
  },
  visitLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#64748B",
    marginBottom: 6,
  },
  visitDoctor: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  visitMeta: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  iconCircleSuccess: {
    backgroundColor: "#ECFDF5",
  },
  iconText: {
    fontSize: 30,
  },
  spinner: {
    marginBottom: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 6,
  },
  tokenCard: {
    marginTop: 28,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  tokenLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#64748B",
  },
  tokenNumber: {
    fontSize: 40,
    fontWeight: "800",
    color: "#1677FF",
    marginTop: 6,
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
  primaryButtonDisabled: {
    backgroundColor: "#93C5FD",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
