/**
 * Weight Converter — to/from kilograms.
 */
const KG: Record<string, number> = {
  kg: 1,
  g: 0.001,
  mg: 0.000001,
  t: 1000,
  lb: 0.45359237,
  oz: 0.028349523125,
  st: 6.35029318,
};

export const convertWeight = (value: number, from: string, to: string): number => {
  if (!Number.isFinite(value)) throw new Error('Value must be a finite number');
  const fromFactor = KG[from];
  const toFactor = KG[to];
  if (fromFactor === undefined) throw new Error(`Unknown weight unit: ${from}`);
  if (toFactor === undefined) throw new Error(`Unknown weight unit: ${to}`);
  return (value * fromFactor) / toFactor;
};

export const WEIGHT_UNITS = Object.keys(KG);
