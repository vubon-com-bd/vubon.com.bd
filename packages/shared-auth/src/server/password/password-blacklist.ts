/**
 * Small hardcoded list of common passwords.
 * In production, load from a larger list / external service.
 */
const COMMON_PASSWORDS = new Set<string>([
  'password',
  'password1',
  'password123',
  '12345678',
  '123456789',
  'qwerty123',
  'admin123',
  'letmein',
  'welcome1',
  'iloveyou',
  'monkey123',
  'dragon123',
]);

export function isBlacklistedPassword(plain: string): boolean {
  return COMMON_PASSWORDS.has(plain.toLowerCase());
}
