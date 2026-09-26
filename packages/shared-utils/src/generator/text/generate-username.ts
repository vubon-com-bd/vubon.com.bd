/**
 * Generate a unique-ish username from name/email
 * @module shared-utils/generator/text
 */
import { generateNanoid } from '../id/generate-nanoid';

export function generateUsername(source: string): string {
  const base = source
    .toLowerCase()
    .split('@')[0]
    .replace(/[^a-z0-9_]/g, '')
    .slice(0, 20);
  const suffix = generateNanoid(5).toLowerCase().replace(/[-_]/g, '');
  return `${base || 'user'}_${suffix}`;
}
