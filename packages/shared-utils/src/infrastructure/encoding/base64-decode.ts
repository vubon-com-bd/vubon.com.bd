/**
 * Decode base64 string to UTF-8 (safe)
 * @module shared-utils/infrastructure/encoding
 */
export function base64Decode(value: string): string {
  try {
    if (typeof globalThis.atob === 'function') {
      return decodeURIComponent(escape(globalThis.atob(value)));
    }
    return Buffer.from(value, 'base64').toString('utf-8');
  } catch {
    return '';
  }
}
