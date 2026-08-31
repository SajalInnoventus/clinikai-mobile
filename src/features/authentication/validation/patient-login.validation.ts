import { PatientLoginForm } from "../types/patient-login.types";

export interface PatientLoginValidationResult {
  isValid: boolean;
  message?: string;
}

function IsValidMobileNumber(mobileNumber: string): boolean {
  return /^[6-9]\d{9}$/.test(mobileNumber);
}

export function validatePatientLogin(
  form: PatientLoginForm,
): PatientLoginValidationResult {
  const mobileNumber = form.mobileNumber.replace(/\D/g, "");

  if (!mobileNumber) {
    return {
      isValid: false,
      message: "Please enter your mobile Number",
    };
  }

  if (!IsValidMobileNumber(mobileNumber)) {
    return {
      isValid: false,
      message: "Please enter a valid 10-digit Mobile Number",
    };
  }
  return {
    isValid: true,
  };
}
