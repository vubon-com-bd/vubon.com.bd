/**
 * Reverse a string (Unicode-aware)
 * @module shared-utils/common/string
 */
export function reverse(value: string): string {
  return Array.from(value).reverse().join('');
}
