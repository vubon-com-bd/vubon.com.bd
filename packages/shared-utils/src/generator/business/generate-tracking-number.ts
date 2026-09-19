/**
 * Generate a shipping tracking number
 * @module shared-utils/generator/business
 */
import { generateNanoid } from '../id/generate-nanoid';

export function generateTrackingNumber(prefix = 'TRK'): string {
  const rand = generateNanoid(14).toUpperCase().replace(/[-_]/g, '');
  return `${prefix}${rand}`;
}
