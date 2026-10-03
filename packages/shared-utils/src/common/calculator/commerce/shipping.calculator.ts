export interface ShippingRateInput {
  readonly baseRate: number;
  readonly perKgRate: number;
  readonly weightKg: number;
}

export function calculateShipping(input: ShippingRateInput): number {
  const extraWeight = Math.max(0, input.weightKg - 1);
  return Number((input.baseRate + extraWeight * input.perKgRate).toFixed(2));
}

export function calculateFee(
  amount: number,
  feePercent: number,
  fixedFee = 0,
): number {
  return Number((amount * (feePercent / 100) + fixedFee).toFixed(2));
}
