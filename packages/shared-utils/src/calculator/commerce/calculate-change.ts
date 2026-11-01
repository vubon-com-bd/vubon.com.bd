/**
 * Calculate change due (cash handed vs amount due)
 * @module shared-utils/calculator/commerce
 */
export function calculateChange(amountDue: number, cashHanded: number): number {
  if (!Number.isFinite(amountDue) || !Number.isFinite(cashHanded)) return 0;
  if (cashHanded < amountDue) return 0;
  return round2(cashHanded - amountDue);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
