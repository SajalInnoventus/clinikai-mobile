export type RecordType =
  | "prescription"
  | "lab-report"
  | "x-ray"
  | "discharge-summary"
  | "consultation";

export interface MedicalRecord {
  id: string;
  type: RecordType;
  title: string;
  date: string;
  doctor?: string;
  clinic?: string;
  extractedText: string;
  keyFindings?: string[];
}

export const MOCK_RECORDS: MedicalRecord[] = [
  {
    id: "rec-001",
    type: "prescription",
    title: "Prescription — General Consultation",
    date: "2023-03-12",
    doctor: "Dr. Anil Sharma",
    clinic: "NPR Clinic",
    extractedText:
      "Patient presented with fever and body ache. Prescribed: Paracetamol 650mg (twice daily, 5 days), Azithromycin 500mg (once daily, 3 days). Advised rest and hydration.",
    keyFindings: [
      "Paracetamol 650mg — twice daily, 5 days",
      "Azithromycin 500mg — once daily, 3 days",
    ],
  },
  {
    id: "rec-002",
    type: "lab-report",
    title: "Complete Blood Count (CBC)",
    date: "2024-08-24",
    clinic: "ABC Diagnostics",
    extractedText:
      "Hemoglobin: 13.2 g/dL (Normal). WBC count: 7,200/uL (Normal). Platelet count: 240,000/uL (Normal). Fasting blood glucose: 98 mg/dL (Normal). All parameters within normal reference range.",
    keyFindings: [
      "Hemoglobin: 13.2 g/dL (Normal)",
      "Fasting blood glucose: 98 mg/dL (Normal)",
    ],
  },
  {
    id: "rec-003",
    type: "prescription",
    title: "Prescription — Follow-up",
    date: "2024-09-02",
    doctor: "Dr. Anil Sharma",
    clinic: "PZR Clinic",
    extractedText:
      "Follow-up for hypertension monitoring. Blood pressure 128/84. Prescribed: Amlodipine 5mg (once daily, ongoing). Advised low-sodium diet and follow-up in 3 months.",
    keyFindings: ["Amlodipine 5mg — once daily, ongoing"],
  },
  {
    id: "rec-004",
    type: "consultation",
    title: "Consultation Notes",
    date: "2025-01-15",
    doctor: "Dr. Neha Verma",
    clinic: "XYZ Clinic",
    extractedText:
      "Patient reported mild recurring headaches over two weeks, more frequent in the evening. No visual disturbance reported. Advised screen-time reduction and adequate hydration. Recommended follow-up if symptoms persist beyond 4 weeks.",
    keyFindings: ["Recurring headaches — advised screen-time reduction"],
  },
];

export function findRelevantRecords(
  question: string,
  records: MedicalRecord[] = MOCK_RECORDS,
): MedicalRecord[] {
  const q = question.toLowerCase();

  const scored = records.map((record) => {
    let score = 0;
    const haystack =
      `${record.title} ${record.type} ${record.extractedText}`.toLowerCase();

    const keywordGroups: Record<string, string[]> = {
      medicine: ["medicine", "medication", "prescri", "drug", "dose", "dosage"],
      lab: ["blood", "lab", "test", "report", "glucose", "hemoglobin"],
      headache: ["headache", "head ache", "migraine"],
      bp: ["blood pressure", "hypertension", "bp"],
      consultation: ["consult", "doctor said", "visit", "recommend"],
    };

    for (const words of Object.values(keywordGroups)) {
      if (
        words.some((w) => q.includes(w)) &&
        words.some((w) => haystack.includes(w))
      ) {
        score += 2;
      }
    }

    const qWords = q.split(/\s+/).filter((w) => w.length > 3);
    for (const w of qWords) {
      if (haystack.includes(w)) score += 1;
    }

    return { record, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.record);
}
