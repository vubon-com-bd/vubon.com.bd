/**
 * Pad string from the start
 * @module shared-utils/common/string
 */
export function padStart(value: string, length: number, fill = ' '): string {
  return value.padStart(length, fill);
}
