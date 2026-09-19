/**
 * Check if string is a valid email (basic)
 * @module shared-utils/validator/identity
 *
 * Values আসে shared-constants/common/regex.constants থেকে।
 */
import { REGEX } from '@vubon/shared-constants/common';

export function isValidEmail(value: string): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length < 3 || trimmed.length > 254) return false;
  return REGEX.EMAIL.test(trimmed);
}
