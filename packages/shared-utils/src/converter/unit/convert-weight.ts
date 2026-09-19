/**
 * Convert weight between kg, g, lb, oz, ton
 * @module shared-utils/converter/unit
 */
export type WeightUnit = 'kg' | 'g' | 'mg' | 'lb' | 'oz' | 'ton';

const TO_KG: Record<WeightUnit, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  lb: 0.45359237,
  oz: 0.028349523125,
  ton: 1000,
};

export function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  if (!Number.isFinite(value)) return 0;
  const kg = value * TO_KG[from];
  return round4(kg / TO_KG[to]);
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
