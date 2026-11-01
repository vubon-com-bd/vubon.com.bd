import { isExpiringSoon } from '../../common/jwt/jwt.expiry';
import { getJwtPayload } from '../../common/jwt/jwt.parser';
import { TokenRefresher } from './token-refresh';
import type { TokenManagerOptions } from './token-manager.types';

/**
 * Client-side token manager.
 * Handles: read, set, clear, and single-flight refresh.
 */
export class TokenManager {
  private readonly refresher: TokenRefresher;
  private readonly refreshThreshold: number;

  constructor(private readonly options: TokenManagerOptions) {
    this.refresher = new TokenRefresher(options.refresh);
    this.refreshThreshold = options.refreshThresholdSeconds ?? 60;
  }

  getAccessToken(): string | null {
    return this.options.storage.getAccessToken();
  }

  setAccessToken(token: string | null): void {
    this.options.storage.setAccessToken(token);
  }

  clear(): void {
    this.options.storage.clear();
  }

  /** True if current access token is missing or about to expire. */
  needsRefresh(): boolean {
    const token = this.getAccessToken();
    if (!token) return true;
    const payload = getJwtPayload(token);
    if (!payload) return true;
    return isExpiringSoon(payload.exp, this.refreshThreshold);
  }

  /**
   * Refresh the access token. Safe to call concurrently.
   * On failure, clears storage and calls `onRefreshFailed`.
   */
  async refresh(): Promise<string> {
    try {
      const newToken = await this.refresher.refresh();
      this.setAccessToken(newToken);
      return newToken;
    } catch (err) {
      this.clear();
      this.options.onRefreshFailed?.(err);
      throw err;
    }
  }

  /** Ensure a valid access token, refreshing if needed. */
  async ensureValidToken(): Promise<string | null> {
    if (!this.needsRefresh()) return this.getAccessToken();
    return this.refresh();
  }

  isRefreshing(): boolean {
    return this.refresher.isRefreshing();
  }
}
