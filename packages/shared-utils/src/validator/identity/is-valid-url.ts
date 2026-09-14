/**
 * Check if string is a valid URL
 * @module shared-utils/validator/identity
 */
export function isValidUrl(value: string): boolean {
  if (typeof value !== 'string') return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}
