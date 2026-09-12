/**
 * Length Converter — to/from meters.
 */
const METERS: Record<string, number> = {
  m: 1,
  km: 1000,
  cm: 0.01,
  mm: 0.001,
  um: 0.000001,
  nm: 0.000000001,
  mi: 1609.344,
  yd: 0.9144,
  ft: 0.3048,
  in: 0.0254,
};

export const convertLength = (value: number, from: string, to: string): number => {
  if (!Number.isFinite(value)) throw new Error('Value must be a finite number');
  const fromFactor = METERS[from];
  const toFactor = METERS[to];
  if (fromFactor === undefined) throw new Error(`Unknown length unit: ${from}`);
  if (toFactor === undefined) throw new Error(`Unknown length unit: ${to}`);
  return (value * fromFactor) / toFactor;
};

export const LENGTH_UNITS = Object.keys(METERS);
