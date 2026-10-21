import { PatientRegistrationForm } from "@/features/authentication/types/patient-registration.types";
import { getPasswordStrength } from "@/features/authentication/utils/password-strength";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationResult {
  isValid: boolean;
  message: string | null;
}

export function validatePatientRegistration(
  form: PatientRegistrationForm,
  acceptedTerms: boolean,
): ValidationResult {
  if (!form.fullName.trim()) {
    return { isValid: false, message: "Enter your full name" };
  }

  if (!emailPattern.test(form.email.trim())) {
    return { isValid: false, message: "Enter a valid email address" };
  }

  if (getPasswordStrength(form.password) !== "strong") {
    return {
      isValid: false,
      message: "Choose a stronger password: 8+ characters with upper, lower, a number and a symbol",
    };
  }

  if (form.password !== form.confirmPassword) {
    return { isValid: false, message: "Passwords do not match" };
  }

  if (!form.mobileNumber || form.mobileNumber.length !== 10) {
    return { isValid: false, message: "Enter a valid 10-digit mobile number" };
  }

  if (!acceptedTerms) {
    return { isValid: false, message: "Please accept the terms to continue" };
  }

  return { isValid: true, message: null };
}