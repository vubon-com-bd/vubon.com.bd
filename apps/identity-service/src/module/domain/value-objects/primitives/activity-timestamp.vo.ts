/**
 * ActivityTimestamp Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface ActivityTimestampValue {
  readonly epochMs: number;
}

export class ActivityTimestampVO extends BaseVO<ActivityTimestampValue> {
  private constructor(value: ActivityTimestampValue) {
    super(value);
  }

  static fromEpochMs(epochMs: number): ActivityTimestampVO {
    if (!Number.isFinite(epochMs) || epochMs < 0) {
      throw new ValidationError('ActivityTimestamp must be a valid epoch ms', 'occurredAt');
    }
    return new ActivityTimestampVO({ epochMs: Math.floor(epochMs) });
  }

  static fromIso(iso: string): ActivityTimestampVO {
    const ms = Date.parse(iso);
    if (Number.isNaN(ms)) {
      throw new ValidationError('Invalid ISO datetime for ActivityTimestamp', 'occurredAt');
    }
    return new ActivityTimestampVO({ epochMs: ms });
  }

  static now(): ActivityTimestampVO {
    return new ActivityTimestampVO({ epochMs: Date.now() });
  }

  static reconstitute(value: ActivityTimestampValue): ActivityTimestampVO {
    return new ActivityTimestampVO(value);
  }

  get epochMs(): number { return this.value.epochMs; }
  toDate(): Date { return new Date(this.value.epochMs); }
  toISOString(): string { return this.toDate().toISOString(); }
  get isPast(): boolean { return this.value.epochMs < Date.now(); }
  secondsAgo(nowMs: number = Date.now()): number {
    return Math.max(0, Math.floor((nowMs - this.value.epochMs) / 1000));
  }
}
