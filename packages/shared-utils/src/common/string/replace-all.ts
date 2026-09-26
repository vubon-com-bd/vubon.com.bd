/**
 * Replace all occurrences (safe regex-free)
 * @module shared-utils/common/string
 */
export function replaceAll(value: string, search: string, replacement: string): string {
  if (search === '') return value;
  return value.split(search).join(replacement);
}
