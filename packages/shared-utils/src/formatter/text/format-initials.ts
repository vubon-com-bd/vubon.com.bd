/**
 * Format initials from a name
 * @module shared-utils/formatter/text
 */
export function formatInitials(name: string, max = 2): string {
  if (!name) return '';
  if (!Number.isInteger(max) || max < 1) {
    throw new RangeError('max must be a positive integer');
  }

  const parts = name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, max).map((p) => p.charAt(0).toUpperCase());
  return initials.join('');
}
