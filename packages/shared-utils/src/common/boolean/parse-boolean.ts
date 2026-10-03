/**
 * Parse string/number to boolean (strict)
 * @module shared-utils/common/boolean
 *
 * @example
 * parseBoolean('true')  // true
 * parseBoolean('1')     // true
 * parseBoolean('yes')   // true
 * parseBoolean('no')    // false
 * parseBoolean('xyz')   // fallback (default false)
 */
const TRUE_VALUES = new Set(['true', '1', 'yes', 'y', 'on']);
const FALSE_VALUES = new Set(['false', '0', 'no', 'n', 'off', '']);

export function parseBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value !== 0;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (TRUE_VALUES.has(normalized)) return true;
    if (FALSE_VALUES.has(normalized)) return false;
  }
  return fallback;
}
