/**
 * Return on Investment (ROI) in percent
 * @module shared-utils/calculator/finance
 */
export function calculateRoi(investment: number, returnAmount: number): number {
  if (!Number.isFinite(investment) || investment <= 0) return 0;
  if (!Number.isFinite(returnAmount)) return 0;
  const profit = returnAmount - investment;
  return round2((profit / investment) * 100);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
