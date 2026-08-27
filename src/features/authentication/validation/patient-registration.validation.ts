import { PatientRegistrationForm } from "../types/patient-registration.types";

export interface PatientRegistrationValidationResult {
  isValid: boolean;
  message?: string;
}

function isValidFullName(fullName: string): boolean {
  const normalizedName = fullName.trim();

  if (normalizedName.length < 2) {
    return false;
  }

  return /^[A-Za-z]+(?:[\s'-][A-Za-z]+)*$/.test(normalizedName);
}

function isValidMobileNumber(mobileNumber: string): boolean {
  const normalizedMobileNumber = mobileNumber.replace(/\D/g, "");

  return /^[6-9]\d{9}$/.test(normalizedMobileNumber);
}

function isValidEmailAddress(emailAddress: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
}

function isValidDateOfBirth(dateOfBirth: string): boolean {
  const normalizedDate = dateOfBirth.trim();

  // Require DD/MM/YYYY format.
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(normalizedDate)) {
    return false;
  }

  const [dayString, monthString, yearString] = normalizedDate.split("/");

  const day = Number(dayString);
  const month = Number(monthString);
  const year = Number(yearString);

  if (month < 1 || month > 12 || day < 1 || year < 1900) {
    return false;
  }

  const date = new Date(year, month - 1, day);

  // Prevent invalid calendar dates such as 31/02/2020.
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false;
  }

  // Date of birth cannot be in the future.
  const today = new Date();

  if (date > today) {
    return false;
  }

  return true;
}

export function validatePatientRegistration(
  form: PatientRegistrationForm,
  termsAccepted: boolean,
): PatientRegistrationValidationResult {
  const fullName = form.fullName.trim();
  const mobileNumber = form.mobileNumber.replace(/\D/g, "");
  const emailAddress = form.emailAddress.trim();
  const dateOfBirth = form.dateOfBirth.trim();

  if (!fullName) {
    return {
      isValid: false,
      message: "Please enter your full name.",
    };
  }

  if (!isValidFullName(fullName)) {
    return {
      isValid: false,
      message: "Please enter a valid full name.",
    };
  }

  if (!mobileNumber) {
    return {
      isValid: false,
      message: "Please enter your mobile number.",
    };
  }

  if (!isValidMobileNumber(mobileNumber)) {
    return {
      isValid: false,
      message: "Please enter a valid 10-digit mobile number.",
    };
  }

  if (emailAddress && !isValidEmailAddress(emailAddress)) {
    return {
      isValid: false,
      message: "Please enter a valid email address.",
    };
  }

  if (!dateOfBirth) {
    return {
      isValid: false,
      message: "Please enter your date of birth.",
    };
  }

  if (!isValidDateOfBirth(dateOfBirth)) {
    return {
      isValid: false,
      message: "Please enter a valid date of birth in DD/MM/YYYY format.",
    };
  }

  if (!termsAccepted) {
    return {
      isValid: false,
      message: "Please accept the terms to continue.",
    };
  }

  return {
    isValid: true,
  };
}
