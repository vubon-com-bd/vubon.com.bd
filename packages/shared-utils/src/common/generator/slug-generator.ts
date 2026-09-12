/**
 * Slug Generator — ReDoS-safe.
 * @module shared-utils/common/generator/slug
 */
import { formatSlugLinear } from '../helper/slug-linear';

export const generateSlug = (text: string): string => formatSlugLinear(text);

export const generateUniqueSlug = (text: string, existing: string[] = []): string => {
  const base = formatSlugLinear(text);
  if (!existing.includes(base)) return base;
  let counter = 1;
  let slug = `${base}-${counter}`;
  while (existing.includes(slug)) {
    counter++;
    slug = `${base}-${counter}`;
  }
  return slug;
};
