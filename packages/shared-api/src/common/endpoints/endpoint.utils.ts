/** Join path segments without duplicate slashes. */
export function joinPath(...parts: readonly string[]): string {
  return parts
    .filter((p) => p.length > 0)
    .map((p, i) => (i === 0 ? p.replace(/\/+$/, '') : p.replace(/^\/+|\/+$/g, '')))
    .join('/');
}

/** Normalize trailing slash. */
export function normalizePath(path: string): string {
  if (path === '/') return path;
  return path.replace(/\/+$/, '');
}
