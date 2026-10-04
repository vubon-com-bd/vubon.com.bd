/**
 * AccountLockDurationVO — Duration of an account lock
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Positive value
 * - Max 365 days
 * - canAutoUnlock() when duration <= 24h
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

const MAX_MS = 365 * 24 * 60 * 60 * 1000;

export class AccountLockDurationVO extends BaseVO<number> {
  private constructor(value: number) {
    super(value);
  }

  static ofMs(ms: number): AccountLockDurationVO {
    if (!Number.isFinite(ms) || ms <= 0) {
      throw new Error('Lock duration must be positive');
    }
    if (ms > MAX_MS) {
      throw new Error(`Lock duration exceeds max (${MAX_MS}ms)`);
    }
    return new AccountLockDurationVO(ms);
  }

  static ofMinutes(mins: number): AccountLockDurationVO {
    return AccountLockDurationVO.ofMs(mins * 60 * 1000);
  }

  static ofHours(hours: number): AccountLockDurationVO {
    return AccountLockDurationVO.ofMs(hours * 60 * 60 * 1000);
  }

  static ofDays(days: number): AccountLockDurationVO {
    return AccountLockDurationVO.ofMs(days * 24 * 60 * 60 * 1000);
  }

  get minutes(): number {
    return Math.round(this.value / 60000);
  }

  get hours(): number {
    return Math.round(this.value / 3600000);
  }

  get days(): number {
    return Math.round(this.value / 86400000);
  }

  isPermanent(): boolean {
    return this.value >= MAX_MS;
  }

  canAutoUnlock(): boolean {
    return this.value <= 24 * 60 * 60 * 1000;
  }
}
