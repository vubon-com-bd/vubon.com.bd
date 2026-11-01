import type { TokenStorage } from './token-storage.types';

/**
 * Cookie-backed access-token storage.
 *
 * ⚠️ Only for SHORT-lived access tokens.
 * ⚠️ Sensitive cookies (refresh token) MUST be httpOnly + set by server.
 * ⚠️ This class reads non-httpOnly cookies; httpOnly cookies are
 *    invisible to JS by design and MUST NOT be read from here.
 */
export class CookieTokenStorage implements TokenStorage {
  constructor(
    private readonly cookieName = 'access_token',
    private readonly maxAgeSeconds = 900
  ) {}

  private isBrowser(): boolean {
    return typeof document !== 'undefined';
  }

  getAccessToken(): string | null {
    if (!this.isBrowser()) return null;
    const match = document.cookie.split('; ').find((row) => row.startsWith(`${this.cookieName}=`));
    if (!match) return null;
    return decodeURIComponent(match.split('=')[1] ?? '');
  }

  setAccessToken(token: string | null): void {
    if (!this.isBrowser()) return;
    if (token === null) {
      document.cookie = `${this.cookieName}=; Max-Age=0; path=/`;
      return;
    }
    const secure = location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${this.cookieName}=${encodeURIComponent(token)}; Max-Age=${this.maxAgeSeconds}; path=/; SameSite=Strict${secure}`;
  }

  clear(): void {
    this.setAccessToken(null);
  }
}
