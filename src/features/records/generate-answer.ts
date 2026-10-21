import { findRelevantRecords, MedicalRecord } from "./mock-records";

export interface ClinikAiAnswer {
  text: string;
  sources: MedicalRecord[];
  hasInformation: boolean;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}


export function generateAnswer(
  question: string,
  records?: MedicalRecord[],
): ClinikAiAnswer {
  const relevant = findRelevantRecords(question, records);

  if (relevant.length === 0) {
    return {
      text: "I couldn't find anything in your uploaded records that answers this. You can upload a related document, or ask your doctor directly during your visit.",
      sources: [],
      hasInformation: false,
    };
  }

  const lines = relevant.map((r) => {
    const detail = r.keyFindings?.length
      ? r.keyFindings.join("; ")
      : r.extractedText;
    return `Based on your ${r.type.replace("-", " ")} from ${formatDate(r.date)}${
      r.doctor ? ` (${r.doctor})` : ""
    }: ${detail}.`;
  });

  return {
    text: lines.join("\n\n"),
    sources: relevant,
    hasInformation: true,
  };
}

export const SUGGESTED_QUESTIONS = [
  "What medicines was I taking last year?",
  "When was my last blood test?",
  "What did my previous lab report say?",
  "What was the doctor's recommendation for my headaches?",
];
