/**
 * Convert volume: L, mL, m³, cm³, gal(US), qt(US), pt(US), floz(US)
 * @module shared-utils/converter/unit
 */
export type VolumeUnit = 'l' | 'ml' | 'm3' | 'cm3' | 'gal' | 'qt' | 'pt' | 'floz';

const TO_L: Record<VolumeUnit, number> = {
  l: 1,
  ml: 0.001,
  m3: 1000,
  cm3: 0.001,
  gal: 3.785411784,
  qt: 0.946352946,
  pt: 0.473176473,
  floz: 0.0295735295625,
};

export function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
  if (!Number.isFinite(value)) return 0;
  const l = value * TO_L[from];
  return round4(l / TO_L[to]);
}

function round4(n: number): number {
  return Math.round(n * 10000) / 10000;
}
