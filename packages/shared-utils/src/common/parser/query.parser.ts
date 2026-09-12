/**
 * Query String Parser.
 */
export const parseQuery = (query: string): Record<string, string | string[]> => {
  const params: Record<string, string | string[]> = {};
  const clean = query.startsWith('?') ? query.slice(1) : query;
  if (!clean) return params;
  const pairs = clean.split('&');
  for (const pair of pairs) {
    if (!pair) continue;
    const eqIdx = pair.indexOf('=');
    const key = eqIdx === -1 ? pair : pair.slice(0, eqIdx);
    const value = eqIdx === -1 ? '' : pair.slice(eqIdx + 1);
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);
    const existing = params[decodedKey];
    if (existing === undefined) {
      params[decodedKey] = decodedValue;
    } else if (Array.isArray(existing)) {
      existing.push(decodedValue);
    } else {
      params[decodedKey] = [existing, decodedValue];
    }
  }
  return params;
};

export const stringifyQuery = (params: Record<string, unknown>): string =>
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .flatMap(([k, v]) =>
      Array.isArray(v)
        ? v.map((item) => `${encodeURIComponent(k)}=${encodeURIComponent(String(item))}`)
        : [`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`]
    )
    .join('&');
