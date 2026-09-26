/**
 * Parse a money string back to a number (safe, returns null on failure)
 * @module shared-utils/formatter/money
 */
export function parseMoney(value: string): number | null {
  if (typeof value !== 'string' || value.length === 0) return null;

  const cleaned = value
    .replace(/[^\d.,\-]/g, '')
    .replace(/,(?=\d{3}\b)/g, '')
    .replace(',', '.');

  if (cleaned === '' || cleaned === '-' || cleaned === '.') return null;

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}
