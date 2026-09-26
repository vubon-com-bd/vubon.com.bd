/**
 * Safe JSON stringify (returns null on failure)
 * @module shared-utils/infrastructure/encoding
 */
export function jsonEncode(value: unknown): string | null {
  try {
    const result = JSON.stringify(value);
    return result === undefined ? null : result;
  } catch {
    return null;
  }
}
