/**
 * Canonical cookie names for Next.js auth.
 * ⚠️ `__Host-` prefix requires: Secure + Path=/ + no Domain.
 */
export const AUTH_COOKIE_NAMES = Object.freeze({
  accessToken: '__Host-vubon_at',
  refreshToken: '__Host-vubon_rt',
  sessionId: '__Host-vubon_sid',
  csrfToken: 'vubon_csrf',
} as const);

export type AuthCookieName = keyof typeof AUTH_COOKIE_NAMES;
