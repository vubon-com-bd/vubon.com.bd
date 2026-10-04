/**
 * Repeat string N times
 * @module shared-utils/common/string
 */
export function repeat(value: string, count: number): string {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError('count must be a non-negative integer');
  }
  return value.repeat(count);
}
