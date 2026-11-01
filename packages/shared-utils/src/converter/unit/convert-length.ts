/**
 * Convert length between m, cm, mm, km, in, ft, yd, mi
 * @module shared-utils/converter/unit
 */
export type LengthUnit = 'm' | 'cm' | 'mm' | 'km' | 'in' | 'ft' | 'yd' | 'mi';

const TO_M: Record<LengthUnit, number> = {
  m: 1,
  cm: 0.01,
  mm: 0.001,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344,
};

export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  if (!Number.isFinite(value)) return 0;
  const m = value * TO_M[from];
  return round4(m / TO_M[to]);
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
