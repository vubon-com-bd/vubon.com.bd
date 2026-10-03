/**
 * Format product ID for display
 * @module shared-utils/formatter/business
 */
export function formatProductId(id: string, prefix = 'PRD'): string {
  const cleaned = id.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (!cleaned) return prefix;
  return `${prefix}-${cleaned.slice(0, 6)}`;
}
