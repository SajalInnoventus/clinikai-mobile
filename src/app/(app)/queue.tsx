import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface QueueStatus {
  tokenNumber: string;
  currentlyServing: number;
  patientToken: number;
  estimatedWaitMinutes: number;
  averageConsultationMinutes: number;
  status: "waiting" | "almost-ready" | "called";
}

const INITIAL_QUEUE_STATUS: QueueStatus = {
  tokenNumber: "A-24",
  currentlyServing: 20,
  patientToken: 24,
  estimatedWaitMinutes: 18,
  averageConsultationMinutes: 6,
  status: "waiting",
};

export default function PatientQueueScreen() {
  const [queueStatus, setQueueStatus] = useState(INITIAL_QUEUE_STATUS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const patientsAhead = Math.max(
    queueStatus.patientToken - queueStatus.currentlyServing - 1,
    0,
  );

  const queueProgress = useMemo(() => {
    const totalQueueDistance =
      queueStatus.patientToken - INITIAL_QUEUE_STATUS.currentlyServing;

    if (totalQueueDistance <= 0) {
      return 1;
    }

    const completed =
      queueStatus.currentlyServing - INITIAL_QUEUE_STATUS.currentlyServing;

    return Math.min(Math.max(completed / totalQueueDistance, 0), 1);
  }, [queueStatus.currentlyServing, queueStatus.patientToken]);

  const refreshQueueStatus = async () => {
    setIsRefreshing(true);

    
    await new Promise((resolve) => setTimeout(resolve, 800));

    setQueueStatus((currentStatus) => {
      if (currentStatus.currentlyServing >= currentStatus.patientToken) {
        return {
          ...currentStatus,
          status: "called",
          estimatedWaitMinutes: 0,
        };
      }

      const nextServingToken = currentStatus.currentlyServing + 1;
      const remainingPatients =
        currentStatus.patientToken - nextServingToken - 1;

      return {
        ...currentStatus,
        currentlyServing: nextServingToken,
        estimatedWaitMinutes: Math.max(
          remainingPatients * currentStatus.averageConsultationMinutes,
          0,
        ),
        status: remainingPatients <= 1 ? "almost-ready" : "waiting",
      };
    });

    setIsRefreshing(false);
  };

  useEffect(() => {
    if (queueStatus.status !== "waiting") {
      return;
    }

    const interval = setInterval(() => {
      refreshQueueStatus();
    }, 30000);

    return () => clearInterval(interval);
  }, [queueStatus.status]);

  const getStatusMessage = () => {
    switch (queueStatus.status) {
      case "called":
        return "It's your turn. Please proceed to the consultation area.";

      case "almost-ready":
        return "You're almost next. Please stay close to the consultation area.";

      default:
        return "You're safely in the queue. We'll keep you updated.";
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshQueueStatus}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Text style={styles.backButtonText}>‹</Text>
          </Pressable>

          <Text style={styles.headerTitle}>Live Queue</Text>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.clinicHeader}>
          <Text style={styles.clinicName}>ClinikAI Care Centre</Text>
          <Text style={styles.departmentName}>General Consultation</Text>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.statusLabel}>QUEUE STATUS</Text>

              <Text style={styles.statusTitle}>
                {queueStatus.status === "called"
                  ? "Your turn"
                  : queueStatus.status === "almost-ready"
                    ? "Almost your turn"
                    : "You're in the queue"}
              </Text>
            </View>

            <View
              style={[
                styles.statusIndicator,
                queueStatus.status === "called" && styles.statusIndicatorActive,
              ]}
            >
              <View style={styles.statusIndicatorDot} />
            </View>
          </View>

          <Text style={styles.statusMessage}>{getStatusMessage()}</Text>
        </View>

        <View style={styles.tokenCard}>
          <Text style={styles.tokenLabel}>YOUR TOKEN</Text>

          <Text style={styles.tokenNumber}>{queueStatus.tokenNumber}</Text>

          <View style={styles.queueProgressTrack}>
            <View
              style={[
                styles.queueProgress,
                { width: `${Math.max(queueProgress * 100, 8)}%` },
              ]}
            />
          </View>

          <View style={styles.progressLabels}>
            <Text style={styles.progressLabel}>
              Now serving A-{queueStatus.currentlyServing}
            </Text>

            <Text style={styles.progressLabel}>
              Your token A-{queueStatus.patientToken}
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <QueueStat value={String(patientsAhead)} label="Patients ahead" />

          <View style={styles.statDivider} />

          <QueueStat
            value={`~${queueStatus.estimatedWaitMinutes}`}
            label="Minutes remaining"
          />

          <View style={styles.statDivider} />

          <QueueStat
            value={`A-${queueStatus.currentlyServing}`}
            label="Now serving"
          />
        </View>

        <View style={styles.informationCard}>
          <Text style={styles.cardTitle}>How the estimate works</Text>

          <Text style={styles.cardDescription}>
            Your estimated waiting time is based on the number of patients ahead
            of you and the clinic's average consultation time. The actual time
            may change depending on consultation length and priority cases.
          </Text>
        </View>

        <View style={styles.actionCard}>
          <Text style={styles.cardTitle}>While you wait</Text>

          <Text style={styles.cardDescription}>
            Explore ClinikAI's waiting-room experience instead of constantly
            checking the queue.
          </Text>

          <View style={styles.actionGrid}>
            <QueueAction
              title="Ask ClinikAI"
              description="Health FAQ"
              onPress={() => router.push("/(app)/clinikAi-assistant")}
            />

            <QueueAction
              title="Health Quiz"
              description="Learn & play"
              onPress={() => router.push("/(app)/health-quiz")}
            />

            <QueueAction
              title="Health Games"
              description="Pass the time"
              onPress={() => router.push("/(app)/health-games")}
            />

            <QueueAction
              title="Amenities"
              description="Clinic facilities"
              onPress={() => router.push("/(app)/amenities")}
            />
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.refreshButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={refreshQueueStatus}
          accessibilityRole="button"
          accessibilityLabel="Refresh queue status"
        >
          <Text style={styles.refreshButtonText}>Refresh queue status</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

interface QueueStatProps {
  value: string;
  label: string;
}

function QueueStat({ value, label }: QueueStatProps) {
  return (
    <View style={styles.queueStat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

interface QueueActionProps {
  title: string;
  description: string;
  onPress: () => void;
}

function QueueAction({ title, description, onPress }: QueueActionProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.actionButton,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Text style={styles.actionTitle}>{title}</Text>
      <Text style={styles.actionDescription}>{description}</Text>
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
    paddingTop: 12,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  backButtonText: {
    fontSize: 34,
    lineHeight: 36,
    color: "#0F172A",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  headerSpacer: {
    width: 44,
  },

  clinicHeader: {
    marginBottom: 20,
  },

  clinicName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
  },

  departmentName: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
  },

  statusCard: {
    backgroundColor: "#EFF6FF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },

  statusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusLabel: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#64748B",
  },

  statusTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 5,
  },

  statusIndicator: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
  },

  statusIndicatorActive: {
    backgroundColor: "#DCFCE7",
  },

  statusIndicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#1677FF",
  },

  statusMessage: {
    fontSize: 13,
    lineHeight: 19,
    color: "#475569",
    marginTop: 14,
  },

  tokenCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  tokenLabel: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    color: "#64748B",
  },

  tokenNumber: {
    fontSize: 42,
    fontWeight: "800",
    color: "#1677FF",
    marginTop: 4,
    marginBottom: 22,
  },

  queueProgressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },

  queueProgress: {
    height: "100%",
    borderRadius: 4,
    backgroundColor: "#1677FF",
  },

  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
  },

  progressLabel: {
    fontSize: 11,
    color: "#64748B",
  },

  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  queueStat: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  statLabel: {
    fontSize: 11,
    color: "#64748B",
    textAlign: "center",
    marginTop: 5,
  },

  statDivider: {
    width: 1,
    backgroundColor: "#E2E8F0",
  },

  informationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 8,
  },

  cardDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
  },

  actionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },

  actionButton: {
    width: "48%",
    minHeight: 76,
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  actionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1677FF",
  },

  actionDescription: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 5,
  },

  refreshButton: {
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    marginTop: 16,
  },

  refreshButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  buttonPressed: {
    opacity: 0.7,
  },
});
