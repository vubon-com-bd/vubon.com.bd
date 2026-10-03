/**
 * Convert currency using a rate map (no hardcoded rates)
 * @module shared-utils/converter/currency
 *
 * Rate map: { USD: 110, EUR: 120, ... } — 1 unit = X BDT (base)
 */
export type CurrencyRateMap = Readonly<Record<string, number>>;

export function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates: CurrencyRateMap
): number {
  if (!Number.isFinite(amount)) return 0;
  if (from === to) return round2(amount);

  const fromRate = rates[from];
  const toRate = rates[to];
  if (!fromRate || !toRate || fromRate <= 0 || toRate <= 0) {
    throw new Error(`Missing rate for ${from} or ${to}`);
  }

  const inBase = amount * fromRate;
  return round2(inBase / toRate);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
