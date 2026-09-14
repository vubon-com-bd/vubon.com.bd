/**
 * Payback period in years (cumulative cash flow ≥ initial investment)
 * @module shared-utils/calculator/finance
 */
export function calculatePaybackPeriod(
  initialInvestment: number,
  annualCashFlows: readonly number[]
): number {
  if (initialInvestment <= 0 || !Array.isArray(annualCashFlows) || annualCashFlows.length === 0) {
    return 0;
  }
  let cumulative = 0;
  let years = 0;
  for (const cash of annualCashFlows) {
    if (cumulative >= initialInvestment) break;
    cumulative += cash;
    years += 1;
  }
  if (cumulative < initialInvestment) return Infinity;
  return years;
}
