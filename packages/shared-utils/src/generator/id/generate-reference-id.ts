/**
 * Generate a human-friendly reference ID (e.g., REF-2025-A3F2)
 * @module shared-utils/generator/id
 */
import { generateNanoid } from './generate-nanoid';

export function generateReferenceId(prefix = 'REF', year?: number): string {
  const y = year ?? new Date().getFullYear();
  const rand = generateNanoid(6).toUpperCase();
  return `${prefix}-${y}-${rand}`;
}
