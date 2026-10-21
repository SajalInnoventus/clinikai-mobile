import type { Doctor } from "./mock.booking.data";

type DoctorRecommendation = {
  doctor: Doctor;
  relevanceScore: number;
};

const SPECIALTY_MATCHES: Record<string, string[]> = {
  fever: [
    "general physician",
    "internal medicine",
    "family medicine",
  ],

  "cold / cough": [
    "general physician",
    "internal medicine",
    "pulmonology",
    "family medicine",
  ],

  "baby / child care": [
    "pediatrics",
    "paediatrics",
    "child specialist",
  ],

  pregnancy: [
    "obstetrics",
    "gynecology",
    "gynaecology",
    "obstetrics & gynecology",
    "obstetrics and gynecology",
  ],

  "general consultation": [
    "general physician",
    "internal medicine",
    "family medicine",
  ],

  "skin problem": [
    "dermatology",
    "dermatologist",
  ],

  "stomach problem": [
    "gastroenterology",
    "general physician",
    "internal medicine",
    "family medicine",
  ],

  "pain / injury": [
    "orthopedics",
    "orthopaedics",
    "sports medicine",
    "general physician",
  ],

  "follow-up": [
    "general physician",
    "internal medicine",
    "family medicine",
  ],

  other: [
    "general physician",
    "internal medicine",
    "family medicine",
  ],
};

function normalizeIssue(issue: string): string[] {
  return issue
    .split(/[,|]/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function normalizeSpecialty(specialty: string): string {
  return specialty.trim().toLowerCase();
}

function calculateDoctorScore(
  doctor: Doctor,
  selectedIssues: string[],
): number {
  const specialty = normalizeSpecialty(doctor.specialty);

  const relevanceScore = selectedIssues.reduce((highestScore, issue) => {
    const matchingSpecialties = SPECIALTY_MATCHES[issue] ?? [];

    const exactMatch = matchingSpecialties.some(
      (matchingSpecialty) => specialty === matchingSpecialty,
    );

    const partialMatch = matchingSpecialties.some(
      (matchingSpecialty) =>
        specialty.includes(matchingSpecialty) ||
        matchingSpecialty.includes(specialty),
    );

    if (exactMatch) {
      return Math.max(highestScore, 100);
    }

    if (partialMatch) {
      return Math.max(highestScore, 75);
    }

    return highestScore;
  }, 0);

  const experienceScore = Math.min(doctor.experienceYears, 20) * 1.5;
  const ratingScore = doctor.rating * 10;

  return relevanceScore + experienceScore + ratingScore;
}

export function getRecommendedDoctors(
  doctors: Doctor[],
  issue?: string,
): Doctor[] {
  if (!issue) {
    return [...doctors].sort(
      (firstDoctor, secondDoctor) =>
        secondDoctor.rating - firstDoctor.rating ||
        secondDoctor.experienceYears - firstDoctor.experienceYears,
    );
  }

  const selectedIssues = normalizeIssue(issue);

  const scoredDoctors: DoctorRecommendation[] = doctors.map((doctor) => ({
    doctor,
    relevanceScore: calculateDoctorScore(doctor, selectedIssues),
  }));

  return scoredDoctors
    .sort(
      (firstDoctor, secondDoctor) =>
        secondDoctor.relevanceScore - firstDoctor.relevanceScore ||
        secondDoctor.doctor.rating - firstDoctor.doctor.rating ||
        secondDoctor.doctor.experienceYears -
          firstDoctor.doctor.experienceYears,
    )
    .map(({ doctor }) => doctor);
}