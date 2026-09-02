/**
 * Token Storage
 * টোকেন স্টোরেজ
 */
export interface TokenStorage {
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  setAccessToken(token: string): void;
  setRefreshToken(token: string): void;
  clearTokens(): void;
  getTokenExpiry(): number | null;
  setTokenExpiry(expiry: number): void;
}

export class TokenStorageService implements TokenStorage {
  private storage: Storage;
  private accessTokenKey: string;
  private refreshTokenKey: string;
  private tokenExpiryKey: string;

  constructor(
    storage: Storage = localStorage,
    accessTokenKey: string = 'access_token',
    refreshTokenKey: string = 'refresh_token',
    tokenExpiryKey: string = 'token_expiry'
  ) {
    this.storage = storage;
    this.accessTokenKey = accessTokenKey;
    this.refreshTokenKey = refreshTokenKey;
    this.tokenExpiryKey = tokenExpiryKey;
  }

  getAccessToken(): string | null {
    return this.storage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return this.storage.getItem(this.refreshTokenKey);
  }

  setAccessToken(token: string): void {
    this.storage.setItem(this.accessTokenKey, token);
  }

  setRefreshToken(token: string): void {
    this.storage.setItem(this.refreshTokenKey, token);
  }

  clearTokens(): void {
    this.storage.removeItem(this.accessTokenKey);
    this.storage.removeItem(this.refreshTokenKey);
    this.storage.removeItem(this.tokenExpiryKey);
  }

  getTokenExpiry(): number | null {
    const expiry = this.storage.getItem(this.tokenExpiryKey);
    return expiry ? parseInt(expiry, 10) : null;
  }

  setTokenExpiry(expiry: number): void {
    this.storage.setItem(this.tokenExpiryKey, String(expiry));
  }

  isTokenExpired(): boolean {
    const expiry = this.getTokenExpiry();
    if (!expiry) return true;
    return Date.now() >= expiry;
  }

  getTokenRemainingTime(): number | null {
    const expiry = this.getTokenExpiry();
    if (!expiry) return null;
    return Math.max(0, expiry - Date.now());
  }
}

export const createTokenStorage = (
  storageType: 'localStorage' | 'sessionStorage' = 'localStorage'
): TokenStorageService => {
  const storage = storageType === 'localStorage' ? localStorage : sessionStorage;
  return new TokenStorageService(storage);
};
