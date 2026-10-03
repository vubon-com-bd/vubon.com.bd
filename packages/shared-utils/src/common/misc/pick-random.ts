/**
 * Pick a random element from array (returns undefined for empty)
 * @module shared-utils/common/misc
 *
 * ⚠️ NOT for cryptographic use.
 */
export function pickRandom<T>(items: readonly T[]): T | undefined {
  if (items.length === 0) return undefined;
  return items[Math.floor(Math.random() * items.length)];
}
