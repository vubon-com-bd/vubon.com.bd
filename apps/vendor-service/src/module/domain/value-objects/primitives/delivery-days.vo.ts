/**
 * DeliveryDays Value Object — min/max delivery window
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SHIPPING } from '@vubon/shared-constants/business';

const MIN_DAYS = VENDOR_SHIPPING.MIN_DELIVERY_DAYS;
const MAX_DAYS = VENDOR_SHIPPING.MAX_DELIVERY_DAYS;

export interface DeliveryDaysValue {
  readonly min: number;
  readonly max: number;
}

export class DeliveryDaysVO extends BaseVO<DeliveryDaysValue> {
  private constructor(value: DeliveryDaysValue) {
    super(value);
  }

  static create(min: number, max: number): DeliveryDaysVO {
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      throw new ValidationError('Delivery days must be integers', 'deliveryDays');
    }
    if (min < MIN_DAYS || max > MAX_DAYS) {
      throw new ValidationError(
        `Delivery days must be between ${MIN_DAYS} and ${MAX_DAYS}`,
        'deliveryDays',
      );
    }
    if (min > max) {
      throw new ValidationError('Delivery min cannot exceed max', 'deliveryDays');
    }
    return new DeliveryDaysVO({ min, max });
  }

  static reconstitute(value: DeliveryDaysValue): DeliveryDaysVO {
    return new DeliveryDaysVO(value);
  }

  get min(): number {
    return this.value.min;
  }

  get max(): number {
    return this.value.max;
  }

  isSameDay(): boolean {
    return this.min === 0 && this.max === 0;
  }

  isExpress(): boolean {
    return this.max <= 2;
  }

  isStandard(): boolean {
    return this.max > 2 && this.max <= 7;
  }

  isExtended(): boolean {
    return this.max > 7;
  }

  /** Human-readable range, e.g. "2-5 days" or "1 day". */
  toString(): string {
    return this.min === this.max
      ? `${this.min} day${this.min === 1 ? '' : 's'}`
      : `${this.min}-${this.max} days`;
  }

  average(): number {
    return Math.round((this.min + this.max) / 2);
  }
}
