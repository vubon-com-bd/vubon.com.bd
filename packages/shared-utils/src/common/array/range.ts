/**
 * Generate an array of numbers
 * @module shared-utils/common/array
 *
 * @example
 * range(0, 5)      // [0,1,2,3,4]
 * range(0, 10, 2)  // [0,2,4,6,8]
 */
export function range(start: number, end: number, step = 1): number[] {
  if (step === 0) throw new RangeError('Step cannot be zero');
  const result: number[] = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) result.push(i);
  } else {
    for (let i = start; i > end; i += step) result.push(i);
  }
  return result;
}
