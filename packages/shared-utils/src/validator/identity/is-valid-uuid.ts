/**
 * Check if string is a valid UUID (v1-v5)
 * @module shared-utils/validator/identity
 */
import { REGEX } from '@vubon/shared-constants/common';

export function isValidUuid(value: string): boolean {
  if (typeof value !== 'string') return false;
  return REGEX.UUID.test(value);
}
