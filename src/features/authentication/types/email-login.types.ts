export interface EmailLoginForm {
  identifier: string;
  password: string;
}

export type LoginMode = "mobile" | "email";

export function detectLoginMode(identifier: string): LoginMode {
  const trimmed = identifier.trim();
  if (trimmed.length > 0 && /^\d+$/.test(trimmed)) {
    return "mobile";
  }
  return "email";
}