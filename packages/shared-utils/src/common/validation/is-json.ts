/**
 * Check if a string is valid JSON
 * @module shared-utils/common/validation
 */
export function isJson(value: string): boolean {
  if (typeof value !== 'string' || value.length === 0) return false;
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
}
