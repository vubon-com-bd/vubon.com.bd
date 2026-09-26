/**
 * Compute relative luminance (WCAG) of a hex color
 * @module shared-utils/common/color
 */
import { hexToRgb } from './hex-to-rgb';

export function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const channel = (c: number): number => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}
