/** Redirect to login preserving current location. */
export function redirectToLogin(loginPath = '/login'): void {
  if (typeof window === 'undefined') return;
  const current = window.location.pathname + window.location.search;
  const url = `${loginPath}?next=${encodeURIComponent(current)}`;
  window.location.assign(url);
}

/** Read `next` param safely (only same-origin relative paths). */
export function readNextParam(fallback = '/'): string {
  if (typeof window === 'undefined') return fallback;
  const params = new URLSearchParams(window.location.search);
  const next = params.get('next');
  if (!next || !next.startsWith('/') || next.startsWith('//')) return fallback;
  return next;
}
