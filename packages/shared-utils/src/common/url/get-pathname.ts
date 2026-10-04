/**
 * Extract pathname from URL (safe, returns null on invalid)
 * @module shared-utils/common/url
 */
export function getPathname(value: string): string | null {
  try {
    return new URL(value).pathname;
  } catch {
    return null;
  }
}
