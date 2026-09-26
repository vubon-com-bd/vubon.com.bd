/**
 * SessionExpiryVO — Session expiry timestamp with TTL checks
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseTimestampVO } from '@vubon/shared-kernel/domain/primitives/timestamp.vo';

const MAX_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export class SessionExpiryVO extends BaseTimestampVO {
  private constructor(epochMs: number) {
    super({ epochMs, timezone: 'Asia/Dhaka' as never });
  }

  static fromEpoch(epochMs: number): SessionExpiryVO {
    if (!Number.isFinite(epochMs)) {
      throw new Error('SessionExpiry requires a finite epoch');
    }
    return new SessionExpiryVO(epochMs);
  }

  static fromNow(ttlMs: number, now: number = Date.now()): SessionExpiryVO {
    if (!Number.isFinite(ttlMs) || ttlMs <= 0) {
      throw new Error('TTL must be positive');
    }
    if (ttlMs > MAX_TTL_MS) {
      throw new Error(`TTL exceeds max session lifetime (${MAX_TTL_MS}ms)`);
    }
    return new SessionExpiryVO(now + ttlMs);
  }

  isExpired(now: number = Date.now()): boolean {
    return this.epochMs <= now;
  }

  remainingMs(now: number = Date.now()): number {
    return Math.max(0, this.epochMs - now);
  }

  extendBy(ms: number, now: number = Date.now()): SessionExpiryVO {
    const target = Math.min(this.epochMs + ms, now + MAX_TTL_MS);
    return new SessionExpiryVO(target);
  }
}
