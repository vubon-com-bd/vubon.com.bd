/**
 * Format SKU (normalize separators)
 * @module shared-utils/formatter/business
 */
export function formatSku(sku: string): string {
  const cleaned = sku.replace(/[^A-Za-z0-9-]/g, '').toUpperCase();
  return cleaned.replace(/-+/g, '-').replace(/^-|-$/g, '');
}
