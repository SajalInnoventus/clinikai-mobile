import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MedicalRecord, RecordType } from "@/features/records/mock-records";
import { useRecords } from "@/features/records/records.context";

const TYPE_META: Record<RecordType, { label: string; icon: string }> = {
  prescription: { label: "Prescription", icon: "💊" },
  "lab-report": { label: "Lab Report", icon: "🧪" },
  "x-ray": { label: "X-Ray Report", icon: "🩻" },
  "discharge-summary": { label: "Discharge Summary", icon: "📄" },
  consultation: { label: "Consultation", icon: "📑" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MedicalTimelineScreen() {
  const { records } = useRecords();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sorted = useMemo(
    () =>
      [...records].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [records],
  );

  const countsByType = useMemo(() => {
    const counts: Partial<Record<RecordType, number>> = {};
    for (const r of records) {
      counts[r.type] = (counts[r.type] ?? 0) + 1;
    }
    return counts;
  }, [records]);

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
        <View>
          <Text style={styles.headerTitle}>My Health Locker</Text>
          <Text style={styles.headerSubtitle}>
            {records.length} record{records.length === 1 ? "" : "s"}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryRow}>
          {(Object.keys(TYPE_META) as RecordType[]).map((type) => (
            <View key={type} style={styles.summaryChip}>
              <Text style={styles.summaryIcon}>{TYPE_META[type].icon}</Text>
              <Text style={styles.summaryCount}>{countsByType[type] ?? 0}</Text>
            </View>
          ))}
        </View>

        <Pressable
          style={styles.uploadButton}
          onPress={() => router.push("./upload-document")}
        >
          <Text style={styles.uploadButtonText}>+ Upload New Document</Text>
        </Pressable>

        <View style={styles.timelineWrap}>
          {sorted.map((record, index) => (
            <View key={record.id} style={styles.timelineRow}>
              <View style={styles.timelineRail}>
                <View style={styles.timelineDot} />
                {index < sorted.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              <Pressable
                style={styles.recordCard}
                onPress={() =>
                  setExpandedId((current) =>
                    current === record.id ? null : record.id,
                  )
                }
              >
                <View style={styles.recordTop}>
                  <Text style={styles.recordIcon}>
                    {TYPE_META[record.type].icon}
                  </Text>
                  <View style={styles.recordTopText}>
                    <Text style={styles.recordTitle}>{record.title}</Text>
                    <Text style={styles.recordDate}>
                      {formatDate(record.date)}
                      {record.doctor ? ` · ${record.doctor}` : ""}
                    </Text>
                  </View>
                </View>

                {expandedId === record.id && (
                  <Text style={styles.recordBody}>{record.extractedText}</Text>
                )}
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
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
  headerSubtitle: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryChip: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 12,
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  summaryIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  summaryCount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  uploadButton: {
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#DCE7F7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  uploadButtonText: {
    color: "#1677FF",
    fontSize: 14,
    fontWeight: "700",
  },
  timelineWrap: {
    gap: 0,
  },
  timelineRow: {
    flexDirection: "row",
  },
  timelineRail: {
    width: 24,
    alignItems: "center",
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#1677FF",
    marginTop: 18,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "#DCE7F7",
    marginVertical: 4,
  },
  recordCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  recordTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  recordIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  recordTopText: {
    flex: 1,
  },
  recordTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  recordDate: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },
  recordBody: {
    fontSize: 12,
    lineHeight: 18,
    color: "#334155",
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
});
