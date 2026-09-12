/**
 * Volume Converter — to/from liters.
 */
const LITERS: Record<string, number> = {
  l: 1,
  ml: 0.001,
  cl: 0.01,
  dl: 0.1,
  m3: 1000,
  gal: 3.785411784,
  gal_uk: 4.54609,
  qt: 0.946352946,
  pt: 0.473176473,
  cup: 0.2365882365,
  floz: 0.0295735295625,
};

export const convertVolume = (value: number, from: string, to: string): number => {
  if (!Number.isFinite(value)) throw new Error('Value must be a finite number');
  const fromFactor = LITERS[from];
  const toFactor = LITERS[to];
  if (fromFactor === undefined) throw new Error(`Unknown volume unit: ${from}`);
  if (toFactor === undefined) throw new Error(`Unknown volume unit: ${to}`);
  return (value * fromFactor) / toFactor;
};

export const VOLUME_UNITS = Object.keys(LITERS);
