/**
 * Check if string is an absolute URL (has protocol)
 * @module shared-utils/common/url
 */
export function isAbsoluteUrl(value: string): boolean {
  return /^[a-z][a-z0-9+.\-]*:\/\//i.test(value);
}
