/**
 * DeliveryType Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type DeliveryTypeValue =
  | 'standard'
  | 'express'
  | 'same_day'
  | 'scheduled'
  | 'pickup'
  | 'digital';

const VALID_TYPES: readonly string[] = [
  'standard',
  'express',
  'same_day',
  'scheduled',
  'pickup',
  'digital',
];

export class DeliveryTypeVO extends BaseTypeVO<DeliveryTypeValue> {
  private constructor(value: DeliveryTypeValue) {
    super(value);
  }

  static create(raw: string): DeliveryTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DeliveryType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid DeliveryType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new DeliveryTypeVO(normalized as DeliveryTypeValue);
  }

  static reconstitute(raw: string): DeliveryTypeVO {
    return new DeliveryTypeVO(raw as DeliveryTypeValue);
  }

  isExpress(): boolean {
    return this.value === 'express' || this.value === 'same_day';
  }

  isPhysical(): boolean {
    return this.value !== 'digital';
  }
}
