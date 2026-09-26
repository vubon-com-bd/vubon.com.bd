/**
 * Decode hex string to UTF-8 (safe)
 * @module shared-utils/infrastructure/encoding
 */
export function hexDecode(value: string): string {
  try {
    if (value.length % 2 !== 0) return '';
    const bytes = new Uint8Array(value.length / 2);
    for (let i = 0; i < bytes.length; i++) {
      const byte = parseInt(value.substr(i * 2, 2), 16);
      if (Number.isNaN(byte)) return '';
      bytes[i] = byte;
    }
    return new TextDecoder().decode(bytes);
  } catch {
    return '';
  }
}
