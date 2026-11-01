/**
 * Generic mask: keep last N chars, rest replaced
 * @module shared-utils/security/mask
 */
export function maskGeneric(value: string, visible = 4, maskChar = '*'): string {
  if (!value) return '';
  if (!Number.isInteger(visible) || visible < 0) {
    throw new RangeError('visible must be a non-negative integer');
  }
  if (value.length <= visible) return value;
  return maskChar.repeat(value.length - visible) + value.slice(-visible);
}
