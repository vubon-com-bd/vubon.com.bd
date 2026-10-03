/**
 * Simple interest = P × R × T / 100
 * @module shared-utils/calculator/finance
 */
export function calculateInterest(
  principal: number,
  ratePercent: number,
  timeYears: number
): number {
  if (principal <= 0 || ratePercent < 0 || timeYears <= 0) return 0;
  return round2((principal * ratePercent * timeYears) / 100);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
