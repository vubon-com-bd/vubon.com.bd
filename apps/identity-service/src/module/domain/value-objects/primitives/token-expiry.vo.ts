/**
 * TokenExpiry Value Object
 * @module identity-service/domain/value-objects/primitives
 *
 * Absolute expiry moment stored as epoch seconds.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface TokenExpiryValue {
  readonly expiresAt: number;
}

export class TokenExpiryVO extends BaseVO<TokenExpiryValue> {
  private constructor(value: TokenExpiryValue) {
    super(value);
  }

  static fromEpochSeconds(epochSeconds: number): TokenExpiryVO {
    if (!Number.isFinite(epochSeconds) || epochSeconds <= 0) {
      throw new ValidationError('TokenExpiry must be a positive epoch', 'expiresAt');
    }
    return new TokenExpiryVO({ expiresAt: Math.floor(epochSeconds) });
  }

  static fromIso(iso: string): TokenExpiryVO {
    const ms = Date.parse(iso);
    if (Number.isNaN(ms)) {
      throw new ValidationError('Invalid ISO datetime for TokenExpiry', 'expiresAt');
    }
    return new TokenExpiryVO({ expiresAt: Math.floor(ms / 1000) });
  }

  static fromNow(durationSeconds: number, nowMs: number = Date.now()): TokenExpiryVO {
    if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
      throw new ValidationError('durationSeconds must be positive', 'durationSeconds');
    }
    return new TokenExpiryVO({
      expiresAt: Math.floor(nowMs / 1000) + Math.floor(durationSeconds),
    });
  }

  static reconstitute(value: TokenExpiryValue): TokenExpiryVO {
    return new TokenExpiryVO(value);
  }

  get expiresAt(): number { return this.value.expiresAt; }
  get expiresAtMs(): number { return this.value.expiresAt * 1000; }

  toDate(): Date { return new Date(this.expiresAtMs); }
  toISOString(): string { return this.toDate().toISOString(); }

  isExpired(nowMs: number = Date.now()): boolean {
    return nowMs >= this.expiresAtMs;
  }

  secondsUntil(nowMs: number = Date.now()): number {
    return Math.max(0, Math.floor((this.expiresAtMs - nowMs) / 1000));
  }

  isWithin(seconds: number, nowMs: number = Date.now()): boolean {
    return this.secondsUntil(nowMs) <= seconds;
  }
}
