import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MedicalRecord, RecordType } from "@/features/records/mock-records";
import { useRecords } from "@/features/records/records.context";

type Stage = "select-type" | "capture" | "processing" | "review" | "saved";

interface DocTypeOption {
  type: RecordType;
  label: string;
  icon: string;
}

const DOC_TYPES: DocTypeOption[] = [
  { type: "prescription", label: "Prescription", icon: "💊" },
  { type: "lab-report", label: "Lab Report", icon: "🧪" },
  { type: "x-ray", label: "X-Ray Report", icon: "🩻" },
  { type: "discharge-summary", label: "Discharge Summary", icon: "📄" },
  { type: "consultation", label: "Consultation Notes", icon: "📑" },
];

function simulateExtraction(type: RecordType): Omit<MedicalRecord, "id"> {
  const today = new Date().toISOString().split("T")[0];

  const templates: Record<RecordType, Omit<MedicalRecord, "id">> = {
    prescription: {
      type: "prescription",
      title: "Prescription — Uploaded Document",
      date: today,
      doctor: "Dr. Anil Sharma",
      clinic: "ABC Clinic",
      extractedText:
        "Patient presented with mild throat irritation. Prescribed: Cetirizine 10mg (once daily, 5 days), Warm saline gargle twice daily.",
      keyFindings: ["Cetirizine 10mg — once daily, 5 days"],
    },
    "lab-report": {
      type: "lab-report",
      title: "Lab Report — Uploaded Document",
      date: today,
      clinic: "ABC Diagnostics",
      extractedText:
        "Lipid profile: Total cholesterol 182 mg/dL (Normal). LDL 104 mg/dL (Normal). HDL 48 mg/dL (Normal). Triglycerides 130 mg/dL (Normal).",
      keyFindings: ["Total cholesterol: 182 mg/dL (Normal)"],
    },
    "x-ray": {
      type: "x-ray",
      title: "X-Ray Report — Uploaded Document",
      date: today,
      clinic: "ABC Diagnostics",
      extractedText:
        "Chest X-ray (PA view). Lung fields clear. No evidence of consolidation or effusion. Cardiac silhouette normal.",
      keyFindings: ["Chest X-ray — no abnormality detected"],
    },
    "discharge-summary": {
      type: "discharge-summary",
      title: "Discharge Summary — Uploaded Document",
      date: today,
      clinic: "ABC Hospital",
      extractedText:
        "Admitted for observation following mild dehydration. Treated with IV fluids. Discharged in stable condition with advice to maintain oral hydration.",
      keyFindings: ["Discharged stable — advised hydration"],
    },
    consultation: {
      type: "consultation",
      title: "Consultation Notes — Uploaded Document",
      date: today,
      doctor: "Dr. Neha Verma",
      clinic: "ABC Clinic",
      extractedText:
        "Routine check-up. No active complaints. Advised annual health screening and continued current medication.",
      keyFindings: ["Routine check-up — no active complaints"],
    },
  };

  return templates[type];
}

export default function UploadDocumentScreen() {
  const { addRecord } = useRecords();
  const [stage, setStage] = useState<Stage>("select-type");
  const [selectedType, setSelectedType] = useState<RecordType | null>(null);
  const [extracted, setExtracted] = useState<Omit<MedicalRecord, "id"> | null>(
    null,
  );

  const handleSelectType = (type: RecordType) => {
    setSelectedType(type);
    setStage("capture");
  };

  const handleCapture = () => {
    setStage("processing");
    setTimeout(() => {
      if (selectedType) {
        setExtracted(simulateExtraction(selectedType));
      }
      setStage("review");
    }, 1600);
  };

  const handleConfirm = () => {
    if (!extracted) return;
    addRecord({ ...extracted, id: `rec-upload-${Date.now()}` });
    setStage("saved");
  };

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
        <Text style={styles.headerTitle}>Upload Medical Document</Text>
      </View>

      {stage === "select-type" && (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionLabel}>What kind of document is this?</Text>
          <View style={styles.typeGrid}>
            {DOC_TYPES.map((option) => (
              <Pressable
                key={option.type}
                style={({ pressed }) => [
                  styles.typeCard,
                  pressed && styles.cardPressed,
                ]}
                onPress={() => handleSelectType(option.type)}
              >
                <Text style={styles.typeIcon}>{option.icon}</Text>
                <Text style={styles.typeLabel}>{option.label}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}

      {stage === "capture" && selectedType && (
        <View style={styles.centeredContent}>
          <View style={styles.captureFrame}>
            <Text style={styles.captureIcon}>📷</Text>
            <Text style={styles.captureHint}>
              Position the {DOC_TYPES.find((d) => d.type === selectedType)?.label.toLowerCase()}{" "}
              within the frame
            </Text>
          </View>
          <Pressable style={styles.primaryButton} onPress={handleCapture}>
            <Text style={styles.primaryButtonText}>Capture Document</Text>
          </Pressable>
          <Pressable onPress={() => setStage("select-type")}>
            <Text style={styles.linkText}>Change document type</Text>
          </Pressable>
        </View>
      )}

      {stage === "processing" && (
        <View style={styles.centeredContent}>
          <ActivityIndicator size="large" color="#1677FF" style={styles.spinner} />
          <Text style={styles.title}>Reading your document…</Text>
          <Text style={styles.subtitle}>
            ClinikAI is extracting the relevant medical information
          </Text>
        </View>
      )}

      {stage === "review" && extracted && (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionLabel}>Extracted information</Text>
          <Text style={styles.reviewHint}>
            Review what ClinikAI found. This will be added to your medical
            timeline.
          </Text>

          <View style={styles.reviewCard}>
            <Text style={styles.reviewTitle}>{extracted.title}</Text>
            <Text style={styles.reviewMeta}>
              {new Date(extracted.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              {extracted.doctor ? ` · ${extracted.doctor}` : ""}
            </Text>

            <View style={styles.divider} />

            <Text style={styles.reviewBody}>{extracted.extractedText}</Text>

            {extracted.keyFindings && extracted.keyFindings.length > 0 && (
              <View style={styles.findingsWrap}>
                {extracted.keyFindings.map((finding) => (
                  <View key={finding} style={styles.findingChip}>
                    <Text style={styles.findingChipText}>{finding}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <Pressable style={styles.primaryButton} onPress={handleConfirm}>
            <Text style={styles.primaryButtonText}>
              Looks Good — Add to My Records
            </Text>
          </Pressable>
        </ScrollView>
      )}

      {stage === "saved" && (
        <View style={styles.centeredContent}>
          <View style={styles.successBadge}>
            <Text style={styles.successBadgeIcon}>✓</Text>
          </View>
          <Text style={styles.title}>Added to your timeline</Text>
          <Text style={styles.subtitle}>
            You can now ask ClinikAI about this document.
          </Text>

          <Pressable
            style={styles.primaryButton}
            onPress={() => router.push("./medical-timeline")}
          >
            <Text style={styles.primaryButtonText}>View Medical Timeline</Text>
          </Pressable>
          <Pressable onPress={() => router.push("./clinikAi-assistant")}>
            <Text style={styles.linkText}>Ask ClinikAI about it</Text>
          </Pressable>
        </View>
      )}
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
  content: {
    padding: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  reviewHint: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 16,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  typeCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
  },
  cardPressed: {
    opacity: 0.75,
  },
  typeIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  typeLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
  },
  centeredContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 16,
  },
  captureFrame: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    borderStyle: "dashed",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  captureIcon: {
    fontSize: 44,
    marginBottom: 12,
  },
  captureHint: {
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
  },
  spinner: {
    marginBottom: 4,
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
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  reviewMeta: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 14,
  },
  reviewBody: {
    fontSize: 13,
    lineHeight: 20,
    color: "#334155",
  },
  findingsWrap: {
    marginTop: 14,
    gap: 8,
  },
  findingChip: {
    backgroundColor: "#EFF6FF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  findingChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#1677FF",
  },
  primaryButton: {
    width: "100%",
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
  linkText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1677FF",
    marginTop: 4,
  },
  successBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
  },
  successBadgeIcon: {
    fontSize: 30,
    color: "#10B981",
    fontWeight: "700",
  },
});
