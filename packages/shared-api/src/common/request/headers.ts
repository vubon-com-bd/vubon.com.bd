/** Sanitize headers — strip undefined, coerce to string. */
export function sanitizeHeaders(
  headers: Record<string, unknown> | undefined
): Record<string, string> {
  if (!headers) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) {
    if (v === undefined || v === null) continue;
    out[k] = String(v);
  }
  return out;
}
