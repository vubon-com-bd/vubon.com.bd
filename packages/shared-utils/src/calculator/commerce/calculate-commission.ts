/**
 * Calculate commission amount
 * @module shared-utils/calculator/commerce
 */
export interface CommissionInput {
  readonly amount: number;
  readonly type: 'percentage' | 'fixed';
  readonly value: number;
  readonly minAmount?: number;
  readonly maxAmount?: number;
}

export function calculateCommission(input: CommissionInput): number {
  const { amount, type, value, minAmount, maxAmount } = input;
  if (!Number.isFinite(amount) || amount <= 0) return 0;
  if (!Number.isFinite(value) || value < 0) return 0;

  let commission = type === 'percentage' ? (amount * value) / 100 : value;
  if (minAmount !== undefined) commission = Math.max(commission, minAmount);
  if (maxAmount !== undefined) commission = Math.min(commission, maxAmount);
  return round2(Math.min(commission, amount));
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
