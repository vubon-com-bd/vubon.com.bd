/**
 * Extract hostname from URL (safe, returns null on invalid)
 * @module shared-utils/common/url
 */
export function getDomain(value: string): string | null {
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
}
