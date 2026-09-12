/**
 * Slug Formatter — display formatting only.
 * Note: Generation (generateSlug, generateUniqueSlug) lives in generator/slug-generator.ts.
 *       Validation (isValidSlug) lives in validator/slug.validator.ts.
 */
export const formatSlug = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
