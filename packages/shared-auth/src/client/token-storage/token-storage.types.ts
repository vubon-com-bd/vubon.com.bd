/**
 * Storage abstraction for the ACCESS token.
 *
 * ⚠️ Refresh token MUST live in an httpOnly cookie (server-managed).
 * ⚠️ Access token SHOULD live in memory (XSS-safe).
 */
export interface TokenStorage {
  getAccessToken(): string | null;
  setAccessToken(token: string | null): void;
  clear(): void;
}
