/**
 * Format an invoice ID
 * @module shared-utils/formatter/business
 */
export function formatInvoiceId(id: string, prefix = 'INV'): string {
  const cleaned = id.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
  const year = new Date().getFullYear();
  if (!cleaned) return `${prefix}-${year}`;
  return `${prefix}-${year}-${cleaned.slice(0, 6)}`;
}
