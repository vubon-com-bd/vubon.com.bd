/**
 * Generate an invoice number (INV-YYYY-NNNNNN)
 * @module shared-utils/generator/business
 */
import { generateNanoid } from '../id/generate-nanoid';

export function generateInvoiceNumber(date: Date = new Date()): string {
  const year = date.getFullYear();
  const rand = generateNanoid(8).toUpperCase().replace(/[-_]/g, '');
  return `INV-${year}-${rand}`;
}
