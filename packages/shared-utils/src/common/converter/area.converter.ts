/**
 * Area Converter — to/from square meters.
 * Includes Bangladesh-specific units.
 */
const SQM: Record<string, number> = {
  sqm: 1,
  sqkm: 1_000_000,
  sqcm: 0.0001,
  sqft: 0.09290304,
  sqyd: 0.83612736,
  acre: 4046.8564224,
  hectare: 10_000,
  katha_bd: 66.89,
  bigha_bd: 1337.8,
  decimal_bd: 40.4686,
};

export const convertArea = (value: number, from: string, to: string): number => {
  if (!Number.isFinite(value)) throw new Error('Value must be a finite number');
  const fromFactor = SQM[from];
  const toFactor = SQM[to];
  if (fromFactor === undefined) throw new Error(`Unknown area unit: ${from}`);
  if (toFactor === undefined) throw new Error(`Unknown area unit: ${to}`);
  return (value * fromFactor) / toFactor;
};

export const AREA_UNITS = Object.keys(SQM);
