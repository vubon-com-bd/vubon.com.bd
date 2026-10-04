/**
 * Convert area: m², cm², km², ft², yd², acre, hectare, sqin
 * @module shared-utils/converter/unit
 */
export type AreaUnit = 'm2' | 'cm2' | 'km2' | 'ft2' | 'yd2' | 'acre' | 'hectare';

const TO_M2: Record<AreaUnit, number> = {
  m2: 1,
  cm2: 0.0001,
  km2: 1_000_000,
  ft2: 0.09290304,
  yd2: 0.83612736,
  acre: 4046.8564224,
  hectare: 10000,
};

export function convertArea(value: number, from: AreaUnit, to: AreaUnit): number {
  if (!Number.isFinite(value)) return 0;
  const m2 = value * TO_M2[from];
  return round4(m2 / TO_M2[to]);
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
