/**
 * Convert hex color to RGB object
 * @module shared-utils/common/color
 */
import { isHexColor } from './is-hex-color';

export interface Rgb {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

export function hexToRgb(hex: string): Rgb | null {
  if (!isHexColor(hex)) return null;
  const normalized =
    hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex;
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  return { r, g, b };
}
