/**
 * Calculate shipping cost from weight + rate + zone
 * @module shared-utils/calculator/logistics
 */
export interface ShippingCostInput {
  readonly actualWeightKg: number;
  readonly volumetricWeightKg?: number;
  readonly baseRate: number;
  readonly perKgRate?: number;
  readonly zoneMultiplier?: number;
}

export function calculateShippingCost(input: ShippingCostInput): number {
  const { actualWeightKg, volumetricWeightKg, baseRate, perKgRate = 0, zoneMultiplier = 1 } = input;

  if (!Number.isFinite(baseRate) || baseRate < 0) return 0;
  if (!Number.isFinite(zoneMultiplier) || zoneMultiplier <= 0) return 0;

  const chargeableWeight = Math.max(
    Number.isFinite(actualWeightKg) ? actualWeightKg : 0,
    volumetricWeightKg !== undefined && Number.isFinite(volumetricWeightKg) ? volumetricWeightKg : 0
  );

  const total = (baseRate + chargeableWeight * perKgRate) * zoneMultiplier;
  return round2(total);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
