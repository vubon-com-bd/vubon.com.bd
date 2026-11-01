import { RefreshFailedError } from '../errors/refresh-failed.error';
import type { RefreshFn } from './token-manager.types';

/**
 * Executes a refresh call exactly once (single-flight).
 * Use this from the interceptor / API client.
 */
export class TokenRefresher {
  private inflight: Promise<string> | null = null;

  constructor(private readonly refreshFn: RefreshFn) {}

  async refresh(): Promise<string> {
    if (this.inflight) return this.inflight;

    this.inflight = this.refreshFn()
      .then((res) => {
        if (!res.accessToken) {
          throw new RefreshFailedError('Refresh returned empty token');
        }
        return res.accessToken;
      })
      .catch((err: unknown) => {
        throw err instanceof Error
          ? new RefreshFailedError(err.message, err)
          : new RefreshFailedError('Unknown refresh error', err);
      })
      .finally(() => {
        this.inflight = null;
      });

    return this.inflight;
  }

  isRefreshing(): boolean {
    return this.inflight !== null;
  }
}
