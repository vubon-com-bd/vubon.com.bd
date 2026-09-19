/**
 * Check if string is a valid URL slug
 * @module shared-utils/validator/identity
 */
import { REGEX } from '@vubon/shared-constants/common';

export function isValidSlug(value: string): boolean {
  if (typeof value !== 'string') return false;
  if (value.length === 0 || value.length > 200) return false;
  return REGEX.SLUG.test(value);
}
