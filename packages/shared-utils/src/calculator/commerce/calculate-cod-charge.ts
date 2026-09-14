/**
 * Calculate Cash-on-Delivery charge
 * @module shared-utils/calculator/commerce
 */
export interface CodInput {
  readonly amount: number;
  readonly chargeType: 'fixed' | 'percentage';
  readonly chargeValue: number;
  readonly maxCharge?: number;
}

export function calculateCodCharge(input: CodInput): number {
  const { amount, chargeType, chargeValue, maxCharge } = input;
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  if (!Number.isFinite(chargeValue) || chargeValue < 0) return 0;

  let charge = chargeType === 'percentage' ? (amount * chargeValue) / 100 : chargeValue;
  if (maxCharge !== undefined && Number.isFinite(maxCharge) && maxCharge > 0) {
    charge = Math.min(charge, maxCharge);
  }
  return round2(charge);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
