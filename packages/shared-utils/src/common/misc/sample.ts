/**
 * Sample N random unique elements from array
 * @module shared-utils/common/misc
 *
 * ⚠️ NOT for cryptographic use.
 */
export function sample<T>(items: readonly T[], count: number): T[] {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError('count must be a non-negative integer');
  }
  if (count >= items.length) return [...items];

  const result: T[] = [];
  const taken = new Set<number>();

  while (result.length < count) {
    const idx = Math.floor(Math.random() * items.length);
    if (!taken.has(idx)) {
      taken.add(idx);
      result.push(items[idx]);
    }
  }

  return result;
}
