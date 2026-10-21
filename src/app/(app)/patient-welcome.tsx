import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRecords } from "@/features/records/records.context";

const PRIMARY = "#450920";

type RecordItem = {
  id: string;
  title?: string;
  type?: string;
  date?: string;
  description?: string;
};

const RECORD_TYPE_CONFIG: Record<
  string,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
  }
> = {
  prescription: {
    label: "Prescriptions",
    icon: "medkit-outline",
  },
  lab: {
    label: "Lab Reports",
    icon: "flask-outline",
  },
  scan: {
    label: "Scans & X-Rays",
    icon: "scan-outline",
  },
  consultation: {
    label: "Consultations",
    icon: "document-text-outline",
  },
  other: {
    label: "Other Documents",
    icon: "document-outline",
  },
};

export default function MedicalTimelineScreen() {
  const { records } = useRecords();

  const groupedRecords = groupRecords(records as RecordItem[]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={24} color={PRIMARY} />
        </Pressable>

        <Text style={styles.headerTitle}>Health Locker</Text>

        <Pressable
          onPress={() => router.push("./upload-document" as never)}
          style={styles.addButton}
          accessibilityRole="button"
          accessibilityLabel="Upload document"
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introCard}>
          <View style={styles.introIcon}>
            <Ionicons name="shield-checkmark-outline" size={25} color={PRIMARY} />
          </View>

          <View style={styles.introContent}>
            <Text style={styles.introTitle}>Your health records</Text>
            <Text style={styles.introDescription}>
              Keep your medical documents organised in one secure place.
            </Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{records.length}</Text>
            <Text style={styles.summaryLabel}>Total records</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {new Set(
                (records as RecordItem[]).map(
                  (record) => normalizeType(record.type),
                ),
              ).size}
            </Text>
            <Text style={styles.summaryLabel}>Categories</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Medical Records</Text>

          <Pressable
            onPress={() => router.push("./upload-document" as never)}
            accessibilityRole="button"
          >
            <Text style={styles.uploadText}>Upload</Text>
          </Pressable>
        </View>

        {records.length === 0 ? (
          <EmptyState />
        ) : (
          <View style={styles.recordsContainer}>
            {Object.entries(groupedRecords).map(([type, items]) => {
              if (items.length === 0) {
                return null;
              }

              const config =
                RECORD_TYPE_CONFIG[type] ?? RECORD_TYPE_CONFIG.other;

              return (
                <View key={type} style={styles.categorySection}>
                  <View style={styles.categoryHeader}>
                    <View style={styles.categoryIcon}>
                      <Ionicons
                        name={config.icon}
                        size={19}
                        color={PRIMARY}
                      />
                    </View>

                    <Text style={styles.categoryTitle}>{config.label}</Text>

                    <View style={styles.countBadge}>
                      <Text style={styles.countText}>{items.length}</Text>
                    </View>
                  </View>

                  <View style={styles.recordCard}>
                    {items.map((record, index) => (
                      <RecordRow
                        key={record.id}
                        record={record}
                        last={index === items.length - 1}
                      />
                    ))}
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function RecordRow({
  record,
  last,
}: {
  record: RecordItem;
  last: boolean;
}) {
  const type = normalizeType(record.type);
  const config = RECORD_TYPE_CONFIG[type] ?? RECORD_TYPE_CONFIG.other;

  return (
    <Pressable
      style={[styles.recordRow, !last && styles.recordRowBorder]}
      onPress={() => router.push(`./record/${record.id}` as never)}
      accessibilityRole="button"
      accessibilityLabel={`Open ${record.title ?? "medical record"}`}
    >
      <View style={styles.recordIcon}>
        <Ionicons name={config.icon} size={20} color={PRIMARY} />
      </View>

      <View style={styles.recordDetails}>
        <Text style={styles.recordTitle} numberOfLines={1}>
          {record.title || "Medical document"}
        </Text>

        {record.description ? (
          <Text style={styles.recordDescription} numberOfLines={1}>
            {record.description}
          </Text>
        ) : null}

        {record.date ? (
          <Text style={styles.recordDate}>{record.date}</Text>
        ) : null}
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#98A2B3"
      />
    </Pressable>
  );
}

function EmptyState() {
  return (
    <View style={styles.emptyCard}>
      <View style={styles.emptyIcon}>
        <Ionicons name="folder-open-outline" size={34} color={PRIMARY} />
      </View>

      <Text style={styles.emptyTitle}>Your Health Locker is empty</Text>

      <Text style={styles.emptyDescription}>
        Upload prescriptions, lab reports, scans, consultation records and
        other medical documents to keep your health history organised.
      </Text>

      <Pressable
        style={styles.emptyButton}
        onPress={() => router.push("./upload-document" as never)}
        accessibilityRole="button"
        accessibilityLabel="Upload medical document"
      >
        <Ionicons name="cloud-upload-outline" size={18} color="#FFFFFF" />
        <Text style={styles.emptyButtonText}>Upload a document</Text>
      </Pressable>
    </View>
  );
}

function normalizeType(type?: string) {
  const normalized = type?.toLowerCase().trim();

  if (!normalized) {
    return "other";
  }

  if (
    normalized.includes("prescription") ||
    normalized.includes("medicine") ||
    normalized.includes("medication")
  ) {
    return "prescription";
  }

  if (
    normalized.includes("lab") ||
    normalized.includes("blood") ||
    normalized.includes("test")
  ) {
    return "lab";
  }

  if (
    normalized.includes("scan") ||
    normalized.includes("x-ray") ||
    normalized.includes("xray") ||
    normalized.includes("radiology")
  ) {
    return "scan";
  }

  if (
    normalized.includes("consultation") ||
    normalized.includes("consult")
  ) {
    return "consultation";
  }

  return "other";
}

function groupRecords(records: RecordItem[]) {
  return records.reduce<Record<string, RecordItem[]>>((groups, record) => {
    const type = normalizeType(record.type);

    if (!groups[type]) {
      groups[type] = [];
    }

    groups[type].push(record);

    return groups;
  }, {});
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginLeft: 4,
  },

  addButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  introCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 14,
  },

  introIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F8E9EE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  introContent: {
    flex: 1,
  },

  introTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 3,
  },

  introDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#64748B",
  },

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 26,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: PRIMARY,
  },

  summaryLabel: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 4,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  uploadText: {
    fontSize: 13,
    fontWeight: "600",
    color: PRIMARY,
  },

  recordsContainer: {
    gap: 22,
  },

  categorySection: {
    gap: 10,
  },

  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  categoryIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#F8E9EE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  categoryTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
  },

  countBadge: {
    minWidth: 26,
    height: 24,
    paddingHorizontal: 7,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },

  countText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
  },

  recordCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },

  recordRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  recordRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  recordIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#F8E9EE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  recordDetails: {
    flex: 1,
    marginRight: 10,
  },

  recordTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  recordDescription: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },

  recordDate: {
    fontSize: 11,
    color: "#98A2B3",
    marginTop: 4,
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 24,
    paddingVertical: 34,
    alignItems: "center",
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: "#F8E9EE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },

  emptyDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
  },

  emptyButton: {
    height: 46,
    paddingHorizontal: 18,
    borderRadius: 13,
    backgroundColor: PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
});