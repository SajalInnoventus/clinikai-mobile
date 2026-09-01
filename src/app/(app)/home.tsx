import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface QueueStatus {
  tokenNumber: string;
  currentlyServing: string;
  patientsAhead: number;
  estimatedWaitMinutes: number;
  status: "waiting" | "almost-ready" | "called";
}

const MOCK_QUEUE_STATUS: QueueStatus = {
  tokenNumber: "A-24",
  currentlyServing: "A-20",
  patientsAhead: 3,
  estimatedWaitMinutes: 18,
  status: "waiting",
};

export default function PatientHomeScreen() {
  const queue = MOCK_QUEUE_STATUS;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good afternoon</Text>
            <Text style={styles.patientName}>Welcome to ClinikAI</Text>
          </View>

          <Pressable
            style={styles.profileButton}
            accessibilityRole="button"
            accessibilityLabel="Open profile"
          >
            <Text style={styles.profileInitial}>S</Text>
          </Pressable>
        </View>

        <View style={styles.clinicCard}>
          <View style={styles.clinicHeader}>
            <View>
              <Text style={styles.clinicLabel}>CURRENT VISIT</Text>
              <Text style={styles.clinicName}>ClinikAI Care Centre</Text>
            </View>

            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Checked in</Text>
            </View>
          </View>

          <Text style={styles.doctorText}>
            Your consultation is currently in the queue
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your queue</Text>

          <Pressable
            onPress={() => router.push("./queue")}
            accessibilityRole="button"
          >
            <Text style={styles.viewDetails}>View details</Text>
          </Pressable>
        </View>

        <View style={styles.queueCard}>
          <View style={styles.queueTopRow}>
            <View>
              <Text style={styles.queueLabel}>YOUR TOKEN</Text>
              <Text style={styles.tokenNumber}>{queue.tokenNumber}</Text>
            </View>

            <View style={styles.waitingBadge}>
              <Text style={styles.waitingBadgeText}>WAITING</Text>
            </View>
          </View>

          <View style={styles.queueDivider} />

          <View style={styles.queueStats}>
            <View style={styles.queueStat}>
              <Text style={styles.statValue}>{queue.patientsAhead}</Text>
              <Text style={styles.statLabel}>Ahead of you</Text>
            </View>

            <View style={styles.statSeparator} />

            <View style={styles.queueStat}>
              <Text style={styles.statValue}>
                ~{queue.estimatedWaitMinutes} min
              </Text>
              <Text style={styles.statLabel}>Estimated wait</Text>
            </View>

            <View style={styles.statSeparator} />

            <View style={styles.queueStat}>
              <Text style={styles.statValue}>{queue.currentlyServing}</Text>
              <Text style={styles.statLabel}>Now serving</Text>
            </View>
          </View>

          <View style={styles.queueMessage}>
            <Text style={styles.queueMessageText}>
              You're in the queue. We'll notify you when you're getting close.
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>While you wait</Text>

        <View style={styles.experienceGrid}>
          <ExperienceCard
            icon="AI"
            title="Ask ClinikAI"
            description="Get answers to common health questions."
            onPress={() => router.push("./clinikAi-assistant")}
          />

          <ExperienceCard
            icon="Q"
            title="Health Quiz"
            description="Test your health knowledge."
            onPress={() => router.push("./health-quiz")}
          />

          <ExperienceCard
            icon="🎮"
            title="Health Games"
            description="Play something useful while waiting."
            onPress={() => router.push("./health-games")}
          />

          <ExperienceCard
            icon="☕"
            title="Amenities"
            description="Tea, coffee, water and clinic facilities."
            onPress={() => router.push("./amenities")}
          />
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Your visit</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Appointment</Text>
            <Text style={styles.infoValue}>Today, 3:30 PM</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Department</Text>
            <Text style={styles.infoValue}>General Consultation</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Queue token</Text>
            <Text style={styles.infoValue}>{queue.tokenNumber}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface ExperienceCardProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

function ExperienceCard({
  icon,
  title,
  description,
  onPress,
}: ExperienceCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.experienceCard,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={styles.experienceIcon}>
        <Text style={styles.experienceIconText}>{icon}</Text>
      </View>

      <Text style={styles.experienceTitle}>{title}</Text>

      <Text style={styles.experienceDescription}>{description}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  greeting: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },

  patientName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E0EDFF",
    alignItems: "center",
    justifyContent: "center",
  },

  profileInitial: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1677FF",
  },

  clinicCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  clinicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  clinicLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#64748B",
    marginBottom: 6,
  },

  clinicName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 6,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#047857",
  },

  doctorText: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 14,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  viewDetails: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1677FF",
  },

  queueCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#DCE7F7",
  },

  queueTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  queueLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#64748B",
  },

  tokenNumber: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1677FF",
    marginTop: 4,
  },

  waitingBadge: {
    backgroundColor: "#FFF7ED",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  waitingBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#C2410C",
  },

  queueDivider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 18,
  },

  queueStats: {
    flexDirection: "row",
    alignItems: "center",
  },

  queueStat: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },

  statLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
    textAlign: "center",
  },

  statSeparator: {
    width: 1,
    height: 35,
    backgroundColor: "#E2E8F0",
  },

  queueMessage: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    marginTop: 18,
  },

  queueMessageText: {
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
    textAlign: "center",
  },

  experienceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  experienceCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    minHeight: 160,
  },

  cardPressed: {
    opacity: 0.75,
  },

  experienceIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  experienceIconText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1677FF",
  },

  experienceTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },

  experienceDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#64748B",
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  infoTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  infoLabel: {
    fontSize: 13,
    color: "#64748B",
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    maxWidth: "60%",
    textAlign: "right",
  },
});
