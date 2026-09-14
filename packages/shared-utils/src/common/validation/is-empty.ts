/**
 * Check if value is empty (nil, '', [], {}, or Map/Set size 0)
 * @module shared-utils/common/validation
 */
import { isNil } from './is-nil';

export function isEmpty(value: unknown): boolean {
  if (isNil(value)) return true;
  if (typeof value === 'string') return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (value instanceof Map || value instanceof Set) return value.size === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}
