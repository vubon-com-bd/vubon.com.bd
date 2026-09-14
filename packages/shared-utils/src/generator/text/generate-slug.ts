/**
 * Generate a URL-safe slug with random suffix to avoid collisions
 * @module shared-utils/generator/text
 */
import { generateNanoid } from '../id/generate-nanoid';

export function generateSlug(source: string): string {
  const base = source
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
  const suffix = generateNanoid(6).toLowerCase().replace(/[-_]/g, '');
  return `${base || 'item'}-${suffix}`;
}
