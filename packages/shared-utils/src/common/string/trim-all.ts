/**
 * Trim whitespace from every line
 * @module shared-utils/common/string
 */
export function trimAll(value: string): string {
  return value
    .split(/\r\n|\r|\n/)
    .map((line) => line.trim())
    .join('\n');
}
