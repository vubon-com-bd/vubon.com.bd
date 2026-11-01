/**
 * Calculate volumetric weight (cm → kg, divisor 5000)
 * @module shared-utils/calculator/logistics
 */
export interface Dimensions {
  readonly lengthCm: number;
  readonly widthCm: number;
  readonly heightCm: number;
}

export function calculateVolumetricWeight(dims: Dimensions, divisor = 5000): number {
  if (!Number.isFinite(divisor) || divisor <= 0) {
    throw new RangeError('divisor must be > 0');
  }
  const { lengthCm, widthCm, heightCm } = dims;
  if (lengthCm <= 0 || widthCm <= 0 || heightCm <= 0) return 0;
  return round3((lengthCm * widthCm * heightCm) / divisor);
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}
