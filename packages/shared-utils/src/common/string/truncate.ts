/**
 * Truncate string to max length with suffix
 * @module shared-utils/common/string
 */
export function truncate(value: string, maxLength: number, suffix = '…'): string {
  if (maxLength < 0) throw new RangeError('maxLength must be >= 0');
  if (value.length <= maxLength) return value;
  if (maxLength <= suffix.length) return suffix.slice(0, maxLength);
  return value.slice(0, maxLength - suffix.length) + suffix;
}
