/**
 * Calculate subtotal from line items (price × quantity)
 * @module shared-utils/calculator/commerce
 */
export interface SubtotalLine {
  readonly unitPrice: number;
  readonly quantity: number;
}

export function calculateSubtotal(lines: readonly SubtotalLine[]): number {
  if (!Array.isArray(lines)) return 0;
  let total = 0;
  for (const line of lines) {
    if (!Number.isFinite(line.unitPrice) || !Number.isFinite(line.quantity)) continue;
    if (line.unitPrice < 0 || line.quantity < 0) continue;
    total += line.unitPrice * line.quantity;
  }
  return round2(total);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
