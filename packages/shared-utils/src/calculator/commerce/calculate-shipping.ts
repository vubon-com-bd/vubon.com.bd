/**
 * Calculate shipping cost with free-shipping threshold
 * @module shared-utils/calculator/commerce
 */
export interface ShippingInput {
  readonly subtotal: number;
  readonly baseCost: number;
  readonly freeAbove?: number;
}

export function calculateShipping(input: ShippingInput): number {
  const { subtotal, baseCost, freeAbove } = input;
  if (!Number.isFinite(baseCost) || baseCost < 0) return 0;
  if (
    freeAbove !== undefined &&
    Number.isFinite(freeAbove) &&
    freeAbove > 0 &&
    subtotal >= freeAbove
  ) {
    return 0;
  }
  return round2(baseCost);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
