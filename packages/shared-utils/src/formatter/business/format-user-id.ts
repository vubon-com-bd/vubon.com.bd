/**
 * Format user ID for display
 * @module shared-utils/formatter/business
 */
export function formatUserId(id: string, prefix = 'USR'): string {
  const cleaned = id.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (!cleaned) return prefix;
  return `${prefix}-${cleaned.slice(0, 8)}`;
}
