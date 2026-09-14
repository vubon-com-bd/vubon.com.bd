/**
 * Check if URL has query parameter
 * @module shared-utils/common/url
 */
export function hasQueryParam(url: string, key: string): boolean {
  try {
    return new URL(url).searchParams.has(key);
  } catch {
    return false;
  }
}
