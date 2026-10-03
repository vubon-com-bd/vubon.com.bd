/**
 * Format an order ID for display
 * @module shared-utils/formatter/business
 */
export function formatOrderId(id: string, prefix = 'ORD'): string {
  const cleaned = id.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  if (!cleaned) return prefix;
  return `${prefix}-${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}`.toUpperCase();
}
