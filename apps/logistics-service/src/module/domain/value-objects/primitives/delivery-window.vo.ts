/**
 * DeliveryWindow Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * Time window for scheduled delivery.
 * - startAt must be before endAt
 * - window duration: max 12 hours
 * - cannot start in the past (validated on creation only)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface DeliveryWindowValue {
  readonly startAt: string;
  readonly endAt: string;
}

const MAX_WINDOW_HOURS = 12;

export class DeliveryWindowVO extends BaseVO<DeliveryWindowValue> {
  private constructor(value: DeliveryWindowValue) {
    super(value);
  }

  static create(raw: DeliveryWindowValue): DeliveryWindowVO {
    if (!raw || typeof raw.startAt !== 'string' || typeof raw.endAt !== 'string') {
      throw new ValidationError('DeliveryWindow requires startAt and endAt', 'window');
    }
    const start = new Date(raw.startAt);
    const end = new Date(raw.endAt);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      throw new ValidationError('DeliveryWindow contains invalid dates', 'window');
    }
    if (end <= start) {
      throw new ValidationError('DeliveryWindow endAt must be after startAt', 'window');
    }
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (hours > MAX_WINDOW_HOURS) {
      throw new ValidationError(
        `DeliveryWindow cannot exceed ${MAX_WINDOW_HOURS} hours`,
        'window',
      );
    }
    return new DeliveryWindowVO({
      startAt: start.toISOString(),
      endAt: end.toISOString(),
    });
  }

  static reconstitute(raw: DeliveryWindowValue): DeliveryWindowVO {
    return new DeliveryWindowVO(raw);
  }

  get startAt(): string { return this.value.startAt; }
  get endAt(): string { return this.value.endAt; }

  contains(date: Date): boolean {
    return date >= new Date(this.startAt) && date <= new Date(this.endAt);
  }

  isExpired(ref: Date = new Date()): boolean {
    return new Date(this.endAt) < ref;
  }

  get durationHours(): number {
    return (
      (new Date(this.endAt).getTime() - new Date(this.startAt).getTime()) /
      (1000 * 60 * 60)
    );
  }
}
