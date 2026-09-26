/**
 * Parse BDT formatted string back to number
 * @module shared-utils/bd/currency
 */
export function parseBdt(value: string): number | null {
  if (typeof value !== 'string' || value.length === 0) return null;
  const cleaned = value.replace(/[৳\s,]/g, '').replace(/^৳/, '');
  if (cleaned === '' || cleaned === '-') return null;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}
