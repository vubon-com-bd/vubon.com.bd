/**
 * Strip HTML tags from string
 * @module shared-utils/common/string
 *
 * ⚠️ For display only, not a security sanitizer.
 */
export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '');
}
