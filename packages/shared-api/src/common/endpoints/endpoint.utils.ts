/**
 * Strip leading slashes without regex (avoids ReDoS).
 * O(n) — no backtracking.
 */
function stripLeadingSlashes(input: string): string {
  let i = 0;
  while (i < input.length && input.charCodeAt(i) === 47 /* '/' */) i++;
  return i === 0 ? input : input.slice(i);
}

/**
 * Strip trailing slashes without regex (avoids ReDoS).
 * O(n) — no backtracking.
 */
function stripTrailingSlashes(input: string): string {
  let end = input.length;
  while (end > 0 && input.charCodeAt(end - 1) === 47 /* '/' */) end--;
  return end === input.length ? input : input.slice(0, end);
}

/**
 * Join path segments without duplicate slashes.
 * First segment keeps its leading form; subsequent segments are
 * trimmed of leading + trailing slashes. No regex used.
 */
export function joinPath(...parts: readonly string[]): string {
  const nonEmpty = parts.filter((p) => p.length > 0);
  if (nonEmpty.length === 0) return '';

  return nonEmpty
    .map((p, i) => {
      if (i === 0) {
        // First: strip only trailing slashes.
        return stripTrailingSlashes(p);
      }
      // Others: strip leading + trailing slashes.
      return stripTrailingSlashes(stripLeadingSlashes(p));
    })
    .join('/');
}

/**
 * Normalize trailing slash.
 * Uses loop-based strip — no regex, no ReDoS.
 */
export function normalizePath(path: string): string {
  if (path === '/') return path;
  return stripTrailingSlashes(path);
}
