/**
 * Parse query string into typed Record<string, string | string[]>
 * @module shared-utils/parser/query
 */
export function parseQueryParams(input: string): Record<string, string | string[]> {
  const cleaned = input.startsWith('?') ? input.slice(1) : input;
  const params = new URLSearchParams(cleaned);
  const result: Record<string, string | string[]> = {};

  params.forEach((value, key) => {
    const existing = result[key];
    if (existing === undefined) {
      result[key] = value;
    } else if (Array.isArray(existing)) {
      existing.push(value);
    } else {
      result[key] = [existing, value];
    }
  });

  return result;
}
