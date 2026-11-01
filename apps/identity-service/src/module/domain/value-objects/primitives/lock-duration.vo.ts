/**
 * LockDuration Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface LockDurationValue {
  readonly seconds: number;
}

export class LockDurationVO extends BaseVO<LockDurationValue> {
  private static readonly MIN_SECONDS = 60;
  private static readonly MAX_SECONDS = 30 * 24 * 3600; // 30 days

  private constructor(value: LockDurationValue) {
    super(value);
  }

  static fromSeconds(seconds: number): LockDurationVO {
    if (!Number.isFinite(seconds) || seconds <= 0) {
      throw new ValidationError('LockDuration seconds must be positive', 'duration');
    }
    if (seconds < LockDurationVO.MIN_SECONDS) {
      throw new ValidationError(
        `LockDuration must be at least ${LockDurationVO.MIN_SECONDS}s`,
        'duration',
      );
    }
    if (seconds > LockDurationVO.MAX_SECONDS) {
      throw new ValidationError(
        `LockDuration cannot exceed ${LockDurationVO.MAX_SECONDS}s`,
        'duration',
      );
    }
    return new LockDurationVO({ seconds: Math.floor(seconds) });
  }

  static fromMinutes(minutes: number): LockDurationVO {
    return LockDurationVO.fromSeconds(minutes * 60);
  }

  static fromHours(hours: number): LockDurationVO {
    return LockDurationVO.fromSeconds(hours * 3600);
  }

  static reconstitute(value: LockDurationValue): LockDurationVO {
    return new LockDurationVO(value);
  }

  get seconds(): number { return this.value.seconds; }
  get minutes(): number { return Math.floor(this.seconds / 60); }
  get hours(): number { return Math.floor(this.seconds / 3600); }

  until(nowMs: number = Date.now()): Date {
    return new Date(nowMs + this.seconds * 1000);
  }
}
