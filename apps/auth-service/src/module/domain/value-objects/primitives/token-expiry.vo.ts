/**
 * TokenExpiryVO — Token expiry with per-type lifetime rules
 * @module auth-service/domain/value-objects/primitives
 */
import { BaseTimestampVO } from '@vubon/shared-kernel/domain/primitives/timestamp.vo';

export type TokenTypeHint =
  | 'access'
  | 'refresh'
  | 'id'
  | 'password_reset'
  | 'email_verification'
  | 'invite'
  | 'api_key';

const LIFETIMES: Record<TokenTypeHint, number> = {
  access: 15 * 60 * 1000,               // 15m
  id: 15 * 60 * 1000,                   // 15m
  refresh: 30 * 24 * 60 * 60 * 1000,    // 30d
  password_reset: 15 * 60 * 1000,       // 15m
  email_verification: 24 * 60 * 60 * 1000, // 24h
  invite: 7 * 24 * 60 * 60 * 1000,      // 7d
  api_key: 365 * 24 * 60 * 60 * 1000,   // 1y
};

export class TokenExpiryVO extends BaseTimestampVO {
  private constructor(epochMs: number) {
    super({ epochMs, timezone: 'Asia/Dhaka' as never });
  }

  static forType(type: TokenTypeHint, now: number = Date.now()): TokenExpiryVO {
    const ttl = LIFETIMES[type];
    if (!ttl) {
      throw new Error(`Unknown token type: ${type}`);
    }
    return new TokenExpiryVO(now + ttl);
  }

  static fromEpoch(epochMs: number): TokenExpiryVO {
    return new TokenExpiryVO(epochMs);
  }

  isExpired(now: number = Date.now()): boolean {
    return this.epochMs <= now;
  }

  remainingMs(now: number = Date.now()): number {
    return Math.max(0, this.epochMs - now);
  }
}
