import type { CsrfConfig } from './csrf.types';

export const DEFAULT_CSRF_CONFIG: CsrfConfig = {
  cookieName: 'XSRF-TOKEN',
  headerName: 'X-XSRF-TOKEN',
};

/**
 * Read the CSRF token from a non-httpOnly cookie.
 * The server MUST set this cookie (double-submit pattern).
 */
export function readCsrfCookie(config: CsrfConfig = DEFAULT_CSRF_CONFIG): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.split('; ').find((row) => row.startsWith(`${config.cookieName}=`));
  if (!match) return null;
  return decodeURIComponent(match.split('=')[1] ?? '');
}

/** Generate a random CSRF token (fallback if no cookie available). */
export function generateCsrfToken(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `csrf_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
