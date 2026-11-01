/**
 * Net Present Value
 * @module shared-utils/calculator/finance
 */
export function calculateNpv(cashFlows: readonly number[], discountRatePercent: number): number {
  if (!Array.isArray(cashFlows) || cashFlows.length === 0) return 0;
  const r = discountRatePercent / 100;
  let npv = 0;
  for (let t = 0; t < cashFlows.length; t++) {
    npv += cashFlows[t] / Math.pow(1 + r, t);
  }
  return round2(npv);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
