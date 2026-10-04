/**
 * Get query parameter value from URL
 * @module shared-utils/common/url
 */
export function getQueryParam(url: string, key: string): string | null {
  try {
    return new URL(url).searchParams.get(key);
  } catch {
    return null;
  }
}
