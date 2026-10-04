/**
 * Compound interest (with n compounding periods/year)
 * @module shared-utils/calculator/finance
 */
export interface CompoundInterestInput {
  readonly principal: number;
  readonly ratePercent: number;
  readonly timeYears: number;
  readonly compoundsPerYear: number;
}

export interface CompoundInterestResult {
  readonly totalAmount: number;
  readonly interest: number;
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const { principal, ratePercent, timeYears, compoundsPerYear } = input;
  if (principal <= 0 || ratePercent < 0 || timeYears <= 0 || compoundsPerYear < 1) {
    return { totalAmount: 0, interest: 0 };
  }
  const r = ratePercent / 100;
  const n = Math.floor(compoundsPerYear);
  const amount = principal * Math.pow(1 + r / n, n * timeYears);
  return {
    totalAmount: round2(amount),
    interest: round2(amount - principal),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
