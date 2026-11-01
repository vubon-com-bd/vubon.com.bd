/**
 * SessionExpiry Value Object
 * @module identity-service/domain/value-objects/primitives
 *
 * Session expiry has absolute + idle timeout.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface SessionExpiryValue {
  readonly absoluteExpiresAt: number;
  readonly idleTimeoutSeconds: number;
}

export class SessionExpiryVO extends BaseVO<SessionExpiryValue> {
  private constructor(value: SessionExpiryValue) {
    super(value);
  }

  static create(params: {
    absoluteExpiresAt: number;
    idleTimeoutSeconds: number;
  }): SessionExpiryVO {
    if (!Number.isFinite(params.absoluteExpiresAt) || params.absoluteExpiresAt <= 0) {
      throw new ValidationError('absoluteExpiresAt must be positive', 'absoluteExpiresAt');
    }
    if (!Number.isFinite(params.idleTimeoutSeconds) || params.idleTimeoutSeconds <= 0) {
      throw new ValidationError('idleTimeoutSeconds must be positive', 'idleTimeoutSeconds');
    }
    return new SessionExpiryVO({
      absoluteExpiresAt: Math.floor(params.absoluteExpiresAt),
      idleTimeoutSeconds: Math.floor(params.idleTimeoutSeconds),
    });
  }

  static reconstitute(value: SessionExpiryValue): SessionExpiryVO {
    return new SessionExpiryVO(value);
  }

  get absoluteExpiresAt(): number { return this.value.absoluteExpiresAt; }
  get idleTimeoutSeconds(): number { return this.value.idleTimeoutSeconds; }

  isAbsoluteExpired(nowMs: number = Date.now()): boolean {
    return nowMs >= this.absoluteExpiresAt * 1000;
  }

  isIdleExpired(lastAccessedAtMs: number, nowMs: number = Date.now()): boolean {
    return nowMs - lastAccessedAtMs > this.idleTimeoutSeconds * 1000;
  }

  isExpired(lastAccessedAtMs: number, nowMs: number = Date.now()): boolean {
    return this.isAbsoluteExpired(nowMs) || this.isIdleExpired(lastAccessedAtMs, nowMs);
  }

  absoluteSecondsUntil(nowMs: number = Date.now()): number {
    return Math.max(0, Math.floor(this.absoluteExpiresAt - nowMs / 1000));
  }
}
