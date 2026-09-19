/**
 * Convert RGB to hex string
 * @module shared-utils/common/color
 */
import type { Rgb } from './hex-to-rgb';

export function rgbToHex(rgb: Rgb): string {
  const toHex = (n: number): string => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}
