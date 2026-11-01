/**
 * Encode string for use in URLs
 * @module shared-utils/infrastructure/encoding
 */
export function urlEncode(value: string): string {
  return encodeURIComponent(value);
}
