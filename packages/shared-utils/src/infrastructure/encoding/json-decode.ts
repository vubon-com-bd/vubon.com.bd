/**
 * Safe JSON parse (returns null on failure)
 * @module shared-utils/infrastructure/encoding
 */
export function jsonDecode<T = unknown>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}
