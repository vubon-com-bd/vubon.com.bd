/**
 * Generate a short URL-safe ID (default 8 chars, crypto-safe)
 * @module shared-utils/generator/id
 */
import { generateNanoid } from './generate-nanoid';

export function generateShortId(length = 8): string {
  if (length < 6) throw new RangeError('length must be >= 6 for safety');
  return generateNanoid(length);
}
