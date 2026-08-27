export interface PatientRegistrationForm {
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  dateOfBirth: string;
}

export interface PatientRegistrationRequest {
  fullName: string;
  mobileNumber: string;
  emailAddress?: string;
  dateOfBirth: string;
  termsAccepted: boolean;
}