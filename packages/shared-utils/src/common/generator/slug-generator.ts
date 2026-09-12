/**
 * Slug Generator.
 * Note: Validation (isValidSlug) lives in validator/slug.validator.ts.
 */
export const generateSlug = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const generateUniqueSlug = (text: string, existing: string[] = []): string => {
  const base = generateSlug(text);
  if (!existing.includes(base)) return base;
  let counter = 1;
  let slug = `${base}-${counter}`;
  while (existing.includes(slug)) {
    counter++;
    slug = `${base}-${counter}`;
  }
  return slug;
};
