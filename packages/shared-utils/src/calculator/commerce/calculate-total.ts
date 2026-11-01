/**
 * Calculate final order total
 * @module shared-utils/calculator/commerce
 */
export interface TotalInput {
  readonly subtotal: number;
  readonly discount?: number;
  readonly tax?: number;
  readonly shipping?: number;
  readonly codCharge?: number;
  readonly otherCharges?: number;
}

export function calculateTotal(input: TotalInput): number {
  const { subtotal, discount = 0, tax = 0, shipping = 0, codCharge = 0, otherCharges = 0 } = input;

  if (!Number.isFinite(subtotal) || subtotal < 0) return 0;

  const safe = (n: number): number => (Number.isFinite(n) && n > 0 ? n : 0);
  const total =
    subtotal - safe(discount) + safe(tax) + safe(shipping) + safe(codCharge) + safe(otherCharges);
  return round2(Math.max(0, total));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
