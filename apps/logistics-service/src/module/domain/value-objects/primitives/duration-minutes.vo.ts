/**
 * DurationMinutes Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ROUTE } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class DurationMinutesVO extends BaseVO<number> {
  private static readonly MAX_MIN = ROUTE.MAX_DURATION_HOURS * 60;

  private constructor(value: number) { super(value); }

  static create(raw: number): DurationMinutesVO {
    if (!Number.isFinite(raw) || raw < 0) {
      throw new ValidationError('Duration must be non-negative', 'durationMinutes');
    }
    if (raw > DurationMinutesVO.MAX_MIN) {
      throw new ValidationError(`Duration exceeds max ${DurationMinutesVO.MAX_MIN} min`, 'durationMinutes');
    }
    return new DurationMinutesVO(Math.round(raw));
  }

  static reconstitute(raw: number): DurationMinutesVO { return new DurationMinutesVO(raw); }

  static max(): number { return DurationMinutesVO.MAX_MIN; }

  get hours(): number { return Math.floor(this.value / 60); }
  get remainingMinutes(): number { return this.value % 60; }

  add(other: DurationMinutesVO): DurationMinutesVO {
    return DurationMinutesVO.create(this.value + other.value);
  }

  isOverLimit(): boolean { return this.value > DurationMinutesVO.MAX_MIN; }
  toString(): string { return `${this.hours}h ${this.remainingMinutes}m`; }
}
