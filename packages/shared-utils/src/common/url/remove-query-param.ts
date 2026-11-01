/**
 * Remove query parameter from URL string
 * @module shared-utils/common/url
 */
export function removeQueryParam(url: string, key: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete(key);
    return parsed.toString();
  } catch {
    return url;
  }
}
