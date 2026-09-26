/**
 * Generate a transaction ID
 * @module shared-utils/generator/business
 */
import { generateNanoid } from '../id/generate-nanoid';

export function generateTransactionId(prefix = 'TXN'): string {
  const rand = generateNanoid(16).toUpperCase().replace(/[-_]/g, '');
  return `${prefix}_${rand}`;
}
