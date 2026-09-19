/**
 * Generate SKU from category + product + variant + random
 * @module shared-utils/generator/business
 */
import { generateNanoid } from '../id/generate-nanoid';

export function generateSku(category = 'GEN', productCode = 'PRD', variant = 'STD'): string {
  const cat =
    category
      .replace(/[^A-Z0-9]/gi, '')
      .toUpperCase()
      .slice(0, 4) || 'GEN';
  const prd =
    productCode
      .replace(/[^A-Z0-9]/gi, '')
      .toUpperCase()
      .slice(0, 6) || 'PRD';
  const varnt =
    variant
      .replace(/[^A-Z0-9]/gi, '')
      .toUpperCase()
      .slice(0, 4) || 'STD';
  const rand = generateNanoid(4).toUpperCase().replace(/[-_]/g, '');
  return `${cat}-${prd}-${varnt}-${rand}`;
}
