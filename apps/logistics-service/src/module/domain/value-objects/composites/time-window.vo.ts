/**
 * TimeWindowVO — [startAt, endAt] with validation
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface TimeWindowValue {
  readonly startAt: string;
  readonly endAt: string;
}

export class TimeWindowVO extends BaseVO<TimeWindowValue> {
  private constructor(value: TimeWindowValue) { super(value); }

  static create(startAt: string, endAt: string): TimeWindowVO {
    const s = new Date(startAt).getTime();
    const e = new Date(endAt).getTime();
    if (Number.isNaN(s)) throw new ValidationError('Invalid startAt', 'startAt');
    if (Number.isNaN(e)) throw new ValidationError('Invalid endAt', 'endAt');
    if (e <= s) throw new ValidationError('endAt must be after startAt', 'endAt');
    return new TimeWindowVO({ startAt, endAt });
  }

  static reconstitute(value: TimeWindowValue): TimeWindowVO {
    return new TimeWindowVO(value);
  }

  get startAt(): string { return this.value.startAt; }
  get endAt(): string { return this.value.endAt; }

  get durationMinutes(): number {
    return Math.round((new Date(this.value.endAt).getTime() - new Date(this.value.startAt).getTime()) / 60000);
  }

  contains(when: Date | string): boolean {
    const t = typeof when === 'string' ? new Date(when).getTime() : when.getTime();
    return t >= new Date(this.value.startAt).getTime() && t <= new Date(this.value.endAt).getTime();
  }

  isInPast(at: Date = new Date()): boolean {
    return at.getTime() > new Date(this.value.endAt).getTime();
  }

  hasStarted(at: Date = new Date()): boolean {
    return at.getTime() >= new Date(this.value.startAt).getTime();
  }

  overlaps(other: TimeWindowVO): boolean {
    return new Date(this.value.startAt).getTime() < new Date(other.value.endAt).getTime()
      && new Date(other.value.startAt).getTime() < new Date(this.value.endAt).getTime();
  }
}
