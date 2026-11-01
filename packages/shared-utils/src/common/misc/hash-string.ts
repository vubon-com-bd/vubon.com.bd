/**
 * Fast non-cryptographic string hash (djb2 algorithm)
 * @module shared-utils/common/misc
 *
 * ⚠️ NOT for cryptographic use. For cache keys only.
 */
export function hashString(value: string): number {
  let hash = 5381;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 33) ^ value.charCodeAt(i);
  }
  // Convert to unsigned 32-bit integer
  return hash >>> 0;
}
