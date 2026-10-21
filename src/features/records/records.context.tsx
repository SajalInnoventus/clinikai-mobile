import { createContext, ReactNode, useContext, useMemo, useState } from "react";

import { MedicalRecord, MOCK_RECORDS } from "./mock-records";

interface RecordsContextValue {
  records: MedicalRecord[];
  addRecord: (record: MedicalRecord) => void;
}

const RecordsContext = createContext<RecordsContextValue | null>(null);

export function RecordsProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<MedicalRecord[]>(MOCK_RECORDS);

  const addRecord = (record: MedicalRecord) => {
    setRecords((current) => [record, ...current]);
  };

  const value = useMemo(() => ({ records, addRecord }), [records]);

  return (
    <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
  );
}

export function useRecords() {
  const context = useContext(RecordsContext);
  if (!context) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }
  return context;
}
