/**
 * Mask a string showing only the last N characters
 * @module shared-utils/common/string
 *
 * @example
 * mask('1234567890', 4)  // '******7890'
 */
export function mask(value: string, visibleChars = 4, maskChar = '*'): string {
  if (visibleChars < 0) throw new RangeError('visibleChars must be >= 0');
  if (value.length <= visibleChars) return value;
  const hidden = maskChar.repeat(value.length - visibleChars);
  return hidden + value.slice(-visibleChars);
}
