/**
 * Encode string to base64 (UTF-8 safe)
 * @module shared-utils/infrastructure/encoding
 */
export function base64Encode(value: string): string {
  if (typeof globalThis.btoa === 'function') {
    return globalThis.btoa(unescape(encodeURIComponent(value)));
  }
  return Buffer.from(value, 'utf-8').toString('base64');
}
