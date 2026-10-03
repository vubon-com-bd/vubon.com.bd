/**
 * Check if string contains any of the given substrings
 * @module shared-utils/common/string
 */
export function includesAny(value: string, substrings: readonly string[]): boolean {
  return substrings.some((sub) => value.includes(sub));
}
