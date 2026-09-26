/**
 * Darken a hex color by percentage (0-100)
 * @module shared-utils/common/color
 */
import { hexToRgb } from './hex-to-rgb';
import { rgbToHex } from './rgb-to-hex';

export function darken(hex: string, percent: number): string {
  if (percent < 0 || percent > 100) {
    throw new RangeError('percent must be between 0 and 100');
  }
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const factor = 1 - percent / 100;
  return rgbToHex({
    r: rgb.r * factor,
    g: rgb.g * factor,
    b: rgb.b * factor,
  });
}
