/**
 * Split string by newlines (handles \r\n and \r)
 * @module shared-utils/common/string
 */
export function splitLines(value: string): string[] {
  return value.split(/\r\n|\r|\n/);
}
