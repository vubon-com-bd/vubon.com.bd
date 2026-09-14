/**
 * Capitalize first letter, lowercase the rest
 * @module shared-utils/common/string
 */
export function capitalize(value: string): string {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}
