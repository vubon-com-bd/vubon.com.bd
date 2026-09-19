/**
 * Generic input sanitizer: trim + strip control chars
 * @module shared-utils/security/sanitize
 */
export function sanitizeInput(input: string, maxLength = 10000): string {
  if (typeof input !== 'string') return '';
  if (!Number.isInteger(maxLength) || maxLength < 1) {
    throw new RangeError('maxLength must be a positive integer');
  }
  const trimmed = input.trim();
  const stripped = trimmed.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  return stripped.length > maxLength ? stripped.slice(0, maxLength) : stripped;
}
