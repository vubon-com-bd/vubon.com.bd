/**
 * Decode query string to object
 * @module shared-utils/common/url
 */
export function decodeQuery(queryString: string): Record<string, string> {
  const cleaned = queryString.startsWith('?') ? queryString.slice(1) : queryString;
  const params = new URLSearchParams(cleaned);
  const result: Record<string, string> = {};
  params.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}
