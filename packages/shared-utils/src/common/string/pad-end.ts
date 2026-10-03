/**
 * Pad string from the end
 * @module shared-utils/common/string
 */
export function padEnd(value: string, length: number, fill = ' '): string {
  return value.padEnd(length, fill);
}
