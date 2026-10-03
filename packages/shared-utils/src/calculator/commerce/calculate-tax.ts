/**
 * Calculate tax amount
 * @module shared-utils/calculator/commerce
 */
export interface TaxInput {
  readonly amount: number;
  readonly ratePercent: number;
  readonly inclusive?: boolean;
}

export interface TaxResult {
  readonly taxAmount: number;
  readonly netAmount: number;
  readonly grossAmount: number;
}

export function calculateTax(input: TaxInput): TaxResult {
  const { amount, ratePercent, inclusive = false } = input;
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isFinite(ratePercent) || ratePercent < 0) {
    return { taxAmount: 0, netAmount: 0, grossAmount: 0 };
  }

  if (inclusive) {
    const netAmount = amount / (1 + ratePercent / 100);
    const taxAmount = amount - netAmount;
    return {
      taxAmount: round2(taxAmount),
      netAmount: round2(netAmount),
      grossAmount: round2(amount),
    };
  }

  const taxAmount = (amount * ratePercent) / 100;
  return {
    taxAmount: round2(taxAmount),
    netAmount: round2(amount),
    grossAmount: round2(amount + taxAmount),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
