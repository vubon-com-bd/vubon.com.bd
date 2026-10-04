/**
 * Add/update query parameter in URL string
 * @module shared-utils/common/url
 */
export function addQueryParam(url: string, key: string, value: string | number | boolean): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set(key, String(value));
    return parsed.toString();
  } catch {
    return url;
  }
}
