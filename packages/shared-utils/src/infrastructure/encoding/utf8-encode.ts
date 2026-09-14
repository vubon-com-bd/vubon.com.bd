/**
 * Encode string to UTF-8 bytes
 * @module shared-utils/infrastructure/encoding
 */
export function utf8Encode(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

/**
 * Decode UTF-8 bytes to string
 * @module shared-utils/infrastructure/encoding
 */
export function utf8Decode(bytes: Uint8Array): string {
  return new TextDecoder('utf-8', { fatal: false }).decode(bytes);
}
