/**
 * Mix two hex colors by ratio (0-1, weight of first color)
 * @module shared-utils/common/color
 */
import { hexToRgb } from './hex-to-rgb';
import { rgbToHex } from './rgb-to-hex';

export function mixColors(hexA: string, hexB: string, ratio = 0.5): string {
  if (ratio < 0 || ratio > 1) {
    throw new RangeError('ratio must be between 0 and 1');
  }
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  if (!a || !b) return hexA;
  return rgbToHex({
    r: a.r * ratio + b.r * (1 - ratio),
    g: a.g * ratio + b.g * (1 - ratio),
    b: a.b * ratio + b.b * (1 - ratio),
  });
}
