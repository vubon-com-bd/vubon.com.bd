/**
 * Compute contrast ratio between two hex colors (WCAG)
 * @module shared-utils/common/color
 */
import { luminance } from './luminance';

export function contrastRatio(hexA: string, hexB: string): number {
  const l1 = luminance(hexA);
  const l2 = luminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
