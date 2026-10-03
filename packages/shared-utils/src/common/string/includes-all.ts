/**
 * Check if string contains all of the given substrings
 * @module shared-utils/common/string
 */
export function includesAll(value: string, substrings: readonly string[]): boolean {
  return substrings.every((sub) => value.includes(sub));
}
