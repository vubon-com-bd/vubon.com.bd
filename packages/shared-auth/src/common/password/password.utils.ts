import { hashPassword as sharedHashPassword } from '@vubon/shared-utils/security/password';
import type { PasswordHashResult } from './password.types';

/**
 * Hash password using shared-utils PBKDF2 implementation.
 * ⚠️ SERVER-ONLY. Never call on the client.
 */
export async function hashPassword(
  plainPassword: string,
  iterations = 100_000
): Promise<PasswordHashResult> {
  return sharedHashPassword(plainPassword, iterations);
}

/**
 * Constant-time string comparison for password/token equality.
 */
export function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Mask an email for logs (e.g. `ab***@example.com`). */
export function maskEmail(email: string): string {
  const at = email.indexOf('@');
  if (at <= 0) return '***';
  const name = email.slice(0, at);
  const domain = email.slice(at);
  const visible = name.slice(0, Math.min(2, name.length));
  return `${visible}***${domain}`;
}
