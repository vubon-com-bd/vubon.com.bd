/**
 * Sign of a number (-1, 0, 1)
 * @module shared-utils/common/number
 */
export function sign(value: number): -1 | 0 | 1 {
  if (value > 0) return 1;
  if (value < 0) return -1;
  return 0;
}
