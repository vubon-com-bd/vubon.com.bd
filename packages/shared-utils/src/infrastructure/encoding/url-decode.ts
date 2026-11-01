/**
 * Decode URL-encoded string (safe)
 * @module shared-utils/infrastructure/encoding
 */
export function urlDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
