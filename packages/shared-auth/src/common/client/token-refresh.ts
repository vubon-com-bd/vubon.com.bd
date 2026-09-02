/**
 * Token Refresh
 * টোকেন রিফ্রেশ
 */
export interface TokenRefreshCallback {
  (): Promise<string>;
}

export interface TokenRefreshOptions {
  refreshThreshold?: number; // milliseconds before expiry to refresh
  refreshInterval?: number; // milliseconds between refresh checks
  maxRetries?: number;
  retryDelay?: number;
}

export class TokenRefreshManager {
  private refreshCallback: TokenRefreshCallback | null = null;
  private intervalId: NodeJS.Timeout | null = null;
  private isRefreshing: boolean = false;
  private options: TokenRefreshOptions;

  constructor(options: TokenRefreshOptions = {}) {
    this.options = {
      refreshThreshold: options.refreshThreshold || 30000, // 30 seconds
      refreshInterval: options.refreshInterval || 60000, // 1 minute
      maxRetries: options.maxRetries || 3,
      retryDelay: options.retryDelay || 5000,
    };
  }

  setRefreshCallback(callback: TokenRefreshCallback): void {
    this.refreshCallback = callback;
  }

  start(): void {
    if (this.intervalId) {
      this.stop();
    }

    this.intervalId = setInterval(() => {
      this.checkAndRefresh();
    }, this.options.refreshInterval);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  async forceRefresh(): Promise<string> {
    if (!this.refreshCallback) {
      throw new Error('Refresh callback not set');
    }

    if (this.isRefreshing) {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (!this.isRefreshing) {
            clearInterval(checkInterval);
            resolve(this.refreshCallback!());
          }
        }, 100);
      });
    }

    this.isRefreshing = true;
    let retries = 0;
    let lastError: Error | null = null;

    while (retries < (this.options.maxRetries || 3)) {
      try {
        const token = await this.refreshCallback();
        this.isRefreshing = false;
        return token;
      } catch (error) {
        lastError = error as Error;
        retries++;
        if (retries < (this.options.maxRetries || 3)) {
          await new Promise((resolve) => setTimeout(resolve, this.options.retryDelay || 5000));
        }
      }
    }

    this.isRefreshing = false;
    throw lastError || new Error('Token refresh failed');
  }

  private async checkAndRefresh(): Promise<void> {
    if (!this.refreshCallback) return;
    if (this.isRefreshing) return;

    // Check if token needs refresh (implementation depends on storage)
    const needsRefresh = this.shouldRefresh();
    if (needsRefresh) {
      try {
        await this.forceRefresh();
      } catch (error) {
        console.error('Token refresh failed:', error);
      }
    }
  }

  private shouldRefresh(): boolean {
    // This should be implemented based on token expiry from storage
    // For now, return false to avoid automatic refresh
    return false;
  }

  isRefreshingToken(): boolean {
    return this.isRefreshing;
  }
}

export const createTokenRefreshManager = (options?: TokenRefreshOptions): TokenRefreshManager => {
  return new TokenRefreshManager(options);
};
