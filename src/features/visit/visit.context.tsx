import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export interface UpcomingAppointment {
  clinicName: string;
  clinicAddress: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string; 
  time: string;
}

export interface CurrentVisit {
  tokenNumber: string;
  patientToken: number;
  clinicName: string;
  doctorName: string;
  checkedInAt: string; 
}

export interface PastAppointment {
  id: string;
  clinicName: string;
  doctorName: string;
  date: string; 
  outcome: string; 
}

interface VisitContextValue {
  upcomingAppointment: UpcomingAppointment | null;
  currentVisit: CurrentVisit | null;
  pastAppointments: PastAppointment[];
  bookAppointment: (appointment: UpcomingAppointment) => void;
  checkIn: (token: { tokenNumber: string; patientToken: number }) => void;
  completeVisit: () => void;
}


const VisitContext = createContext<VisitContextValue | null>(null);

export function VisitProvider({ children }: { children: ReactNode }) {
  const [upcomingAppointment, setUpcomingAppointment] =
    useState<UpcomingAppointment | null>(null);
  const [currentVisit, setCurrentVisit] = useState<CurrentVisit | null>(null);
  const [pastAppointments, setPastAppointments] = useState<PastAppointment[]>(
    [],
  );

  function bookAppointment(appointment: UpcomingAppointment) {
    setUpcomingAppointment(appointment);
  }

  function checkIn(token: { tokenNumber: string; patientToken: number }) {
    if (!upcomingAppointment) return;

    setCurrentVisit({
      tokenNumber: token.tokenNumber,
      patientToken: token.patientToken,
      clinicName: upcomingAppointment.clinicName,
      doctorName: upcomingAppointment.doctorName,
      checkedInAt: new Date().toISOString(),
    });
    setUpcomingAppointment(null);
  }

  function completeVisit() {
    if (!currentVisit) return;

    setPastAppointments((prev) => [
      {
        id: `visit-${Date.now()}`,
        clinicName: currentVisit.clinicName,
        doctorName: currentVisit.doctorName,
        date: new Date().toISOString().split("T")[0],
        outcome: "Consultation completed",
      },
      ...prev,
    ]);
    setCurrentVisit(null);
  }

  const value = useMemo(
    () => ({
      upcomingAppointment,
      currentVisit,
      pastAppointments,
      bookAppointment,
      checkIn,
      completeVisit,
    }),
    [upcomingAppointment, currentVisit, pastAppointments],
  );

  return (
    <VisitContext.Provider value={value}>{children}</VisitContext.Provider>
  );
}

export function useVisit() {
  const context = useContext(VisitContext);
  if (!context) {
    throw new Error("useVisit must be used within a VisitProvider");
  }
  return context;
}
