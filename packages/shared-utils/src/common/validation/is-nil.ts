/**
 * Check if value is null or undefined
 * @module shared-utils/common/validation
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}
