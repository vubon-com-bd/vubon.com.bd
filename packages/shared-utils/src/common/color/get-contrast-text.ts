/**
 * Choose 'black' or 'white' for readable text on a background color
 * @module shared-utils/common/color
 */
import { luminance } from './luminance';

export function getContrastText(
  backgroundHex: string,
  dark = '#000000',
  light = '#FFFFFF'
): string {
  const l = luminance(backgroundHex);
  return l > 0.5 ? dark : light;
}
