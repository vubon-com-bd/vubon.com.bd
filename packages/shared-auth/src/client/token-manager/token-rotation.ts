import type { TokenStorage } from '../token-storage/token-storage.types';

export interface RotationOptions {
  readonly storage: TokenStorage;
  readonly rotateBeforeExpirySeconds?: number;
}

/**
 * Client-side token rotation helper.
 * Detects when the access token is about to expire and rotates it
 * via a single-flight refresh.
 *
 * ⚠️ Actual refresh token rotation happens SERVER-side.
 * This client helper just tracks rotation timing.
 */
export class TokenRotationTracker {
  private lastRotatedAt: number | null = null;

  constructor(private readonly options: RotationOptions) {}

  markRotated(): void {
    this.lastRotatedAt = Date.now();
  }

  lastRotated(): number | null {
    return this.lastRotatedAt;
  }

  shouldRotate(expiresAt: number): boolean {
    const threshold = this.options.rotateBeforeExpirySeconds ?? 60;
    const now = Math.floor(Date.now() / 1000);
    return expiresAt - now <= threshold;
  }

  clear(): void {
    this.lastRotatedAt = null;
  }
}
