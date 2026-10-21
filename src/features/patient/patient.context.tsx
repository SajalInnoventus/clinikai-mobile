import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export interface PatientProfile {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  dateOfBirth: string;
  patientId: string;
  bloodGroup?: string;
  gender?: string;
  allergies: string[];
  chronicConditions: string[];
  emergencyContactName?: string;
  emergencyContactNumber?: string;
}

export function calculateAge(dobDdMmYyyy: string): number | null {
  const parts = dobDdMmYyyy.split("/").map(Number);
  if (parts.length !== 3 || parts.some((p) => Number.isNaN(p))) return null;

  const [day, month, year] = parts;
  const dob = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasHadBirthdayThisYear) age -= 1;
  return age;
}

const DEFAULT_PROFILE: PatientProfile = {
  fullName: "Shekhar Sharma",
  mobileNumber: "+91 8810323053",
  emailAddress: "shekhar.sharma@example.com",
  dateOfBirth: "01/03/1999",
  patientId: "CLK-100482",
  bloodGroup: "O+",
  gender: "Male",
  allergies: ["Penicillin"],
  chronicConditions: ["Hypertension"],
  emergencyContactName: "Mohit Sharma",
  emergencyContactNumber: "+91 91234 56789",
};

interface PatientContextValue {
  profile: PatientProfile;
  updateProfile: (updates: Partial<PatientProfile>) => void;
}

const PatientContext = createContext<PatientContextValue | null>(null);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<PatientProfile>(DEFAULT_PROFILE);

  const updateProfile = (updates: Partial<PatientProfile>) => {
    setProfile((current) => ({ ...current, ...updates }));
  };

  const value = useMemo(() => ({ profile, updateProfile }), [profile]);

  return (
    <PatientContext.Provider value={value}>{children}</PatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatient must be used within a PatientProvider");
  }
  return context;
}
