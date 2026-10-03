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

/**
 * Generate a random CSRF token using Web Crypto.
 * Throws if Web Crypto is unavailable.
 */
export function generateCsrfToken(): string {
  const c = globalThis.crypto as Crypto | undefined;
  if (!c) {
    throw new Error('Web Crypto unavailable — cannot generate secure CSRF token');
  }
  if (typeof c.randomUUID === 'function') return c.randomUUID();
  const bytes = new Uint8Array(32);
  c.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
