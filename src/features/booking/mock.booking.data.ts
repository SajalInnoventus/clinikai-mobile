export interface Clinic {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  rating: number;
}

export interface Doctor {
  id: string;
  clinicId: string;
  name: string;
  specialty: string;
  experienceYears: number;
  rating: number;
}

export interface TimeSlot {
  id: string;
  doctorId: string;
  date: string;
  time: string;
}

export const MOCK_CLINICS: Clinic[] = [
  {
    id: "clinic-001",
    name: "ABC Clinic",
    address: "MG Road, Sector 14",
    distanceKm: 1.2,
    rating: 4.6,
  },
  {
    id: "clinic-002",
    name: "Sunrise Family Care",
    address: "Civil Lines, Near City Park",
    distanceKm: 2.8,
    rating: 4.4,
  },
  {
    id: "clinic-003",
    name: "Wellness Point Clinic",
    address: "Shastri Nagar, Main Road",
    distanceKm: 3.5,
    rating: 4.7,
  },
];

export const MOCK_DOCTORS: Doctor[] = [
    {
    id: "doc-001",
    clinicId: "clinic-001",
    name: "Dr. Anil Sharma",
    specialty: "General Physician",
    experienceYears: 14,
    rating: 4.8,
  },
  {
    id: "doc-002",
    clinicId: "clinic-001",
    name: "Dr. Neha Verma",
    specialty: "Pediatrics",
    experienceYears: 8,
    rating: 4.7,
  },
  {
    id: "doc-003",
    clinicId: "clinic-001",
    name: "Dr. Riya Kapoor",
    specialty: "Dermatology",
    experienceYears: 10,
    rating: 4.6,
  },
  {
    id: "doc-004",
    clinicId: "clinic-002",
    name: "Dr. Rakesh Gupta",
    specialty: "Family Medicine",
    experienceYears: 11,
    rating: 4.5,
  },
  {
    id: "doc-005",
    clinicId: "clinic-002",
    name: "Dr. Priya Mehta",
    specialty: "Gynecology",
    experienceYears: 12,
    rating: 4.8,
  },
  {
    id: "doc-006",
    clinicId: "clinic-002",
    name: "Dr. Kavita Singh",
    specialty: "Pediatrics",
    experienceYears: 9,
    rating: 4.7,
  },

    {
    id: "doc-007",
    clinicId: "clinic-003",
    name: "Dr. Priya Nair",
    specialty: "Internal Medicine",
    experienceYears: 9,
    rating: 4.7,
  },
  {
    id: "doc-008",
    clinicId: "clinic-003",
    name: "Dr. Arjun Malhotra",
    specialty: "Orthopedics",
    experienceYears: 15,
    rating: 4.9,
  },
  {
    id: "doc-009",
    clinicId: "clinic-003",
    name: "Dr. Sameer Khanna",
    specialty: "Gastroenterology",
    experienceYears: 13,
    rating: 4.8,
  },
];

const TIMES = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:30 AM",
  "3:00 PM",
  "3:30 PM",
  "4:30 PM",
];

export function getSlotsForDoctor(doctorId: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const today = new Date();

  for (let dayOffset = 0; dayOffset < 3; dayOffset++) {
    const date = new Date(today);
    date.setDate(today.getDate() + dayOffset);

    const iso = date.toISOString().split("T")[0];

    const dayTimes = TIMES.filter((_, index) => (index + dayOffset) % 3 !== 0);

    dayTimes.forEach((time, index) => {
      slots.push({
        id: `${doctorId}-${iso}-${index}`,
        doctorId,
        date: iso,
        time,
      });
    });
  }

  return slots;
}

export function getClinicById(id: string): Clinic | undefined {
  return MOCK_CLINICS.find((clinic) => clinic.id === id);
}

export function getDoctorById(id: string): Doctor | undefined {
  return MOCK_DOCTORS.find((doctor) => doctor.id === id);
}

export function getDoctorsByClinic(clinicId: string): Doctor[] {
  return MOCK_DOCTORS.filter((doctor) => doctor.clinicId === clinicId);
}