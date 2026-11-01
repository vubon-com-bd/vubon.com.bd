/**
 * Normalize email (lowercase + trim)
 * @module shared-utils/formatter/contact
 */
export function formatEmail(email: string): string {
  return email.trim().toLowerCase();
}
