/**
 * Stringify query params object (handles arrays)
 * @module shared-utils/parser/query
 */
export function stringifyQueryParams(
  params: Readonly<
    Record<string, string | number | boolean | null | undefined | readonly (string | number)[]>
  >
): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === null || value === undefined) continue;
    if (Array.isArray(value)) {
      for (const v of value) search.append(key, String(v));
    } else {
      search.append(key, String(value));
    }
  }

  return search.toString();
}
