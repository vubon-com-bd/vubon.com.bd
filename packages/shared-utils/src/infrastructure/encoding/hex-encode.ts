/**
 * Encode string to hex
 * @module shared-utils/infrastructure/encoding
 */
export function hexEncode(value: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(value);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
