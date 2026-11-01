/**
 * Build URL from base + path + query params
 * @module shared-utils/common/url
 *
 * @example
 * buildUrl('https://api.example.com', '/users', { page: 1, limit: 10 })
 * // 'https://api.example.com/users?page=1&limit=10'
 */
export function buildUrl(
  base: string,
  path = '',
  query?: Readonly<
    Record<string, string | number | boolean | null | undefined | readonly (string | number)[]>
  >
): string {
  const normalizedBase = stripTrailingSlashes(base);
  const normalizedPath = path.startsWith('/') ? path : path ? `/${path}` : '';
  const url = `${normalizedBase}${normalizedPath}`;

  if (!query) return url;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) params.append(key, String(v));
    } else {
      params.append(key, String(value));
    }
  }

  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

/**
 * Strip trailing slashes without regex (ReDoS-safe)
 */
function stripTrailingSlashes(value: string): string {
  let end = value.length;
  while (end > 0 && value.charCodeAt(end - 1) === 47 /* '/' */) {
    end--;
  }
  return value.slice(0, end);
}
