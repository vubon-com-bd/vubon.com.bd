/**
 * Generate an order number (ORD-YYYYMMDD-XXXX)
 * @module shared-utils/generator/business
 */
import { generateNanoid } from '../id/generate-nanoid';

export function generateOrderNumber(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const rand = generateNanoid(6).toUpperCase().replace(/[-_]/g, '');
  return `ORD-${y}${m}${d}-${rand}`;
}
