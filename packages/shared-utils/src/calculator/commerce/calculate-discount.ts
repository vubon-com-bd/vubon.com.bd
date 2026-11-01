/**
 * Calculate discount amount from type + value
 * @module shared-utils/calculator/commerce
 */
export type DiscountType = 'percentage' | 'fixed';

export interface DiscountInput {
  readonly subtotal: number;
  readonly type: DiscountType;
  readonly value: number;
  readonly maxDiscount?: number;
}

export function calculateDiscount(input: DiscountInput): number {
  const { subtotal, type, value, maxDiscount } = input;
  if (!Number.isFinite(subtotal) || subtotal <= 0) return 0;
  if (!Number.isFinite(value) || value <= 0) return 0;

  let amount = type === 'percentage' ? (subtotal * value) / 100 : value;

  if (maxDiscount !== undefined && Number.isFinite(maxDiscount) && maxDiscount > 0) {
    amount = Math.min(amount, maxDiscount);
  }

  amount = Math.min(amount, subtotal);
  return round2(amount);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
