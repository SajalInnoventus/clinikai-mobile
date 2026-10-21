export const HIDDEN_APP_NAVIGATION_ROUTES = new Set([
  "clinikAi-assistant",
  "appointment-confirmation",
  "booking-confirmation",
  "patient-welcome",
  "check-in",
]);

export function shouldShowAppNavigation(routeName: string): boolean {
  return !HIDDEN_APP_NAVIGATION_ROUTES.has(routeName);
}