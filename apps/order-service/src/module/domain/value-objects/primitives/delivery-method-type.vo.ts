/**
 * DeliveryMethodType Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type DeliveryMethodTypeValue =
  | 'flat_rate'
  | 'weight_based'
  | 'distance_based'
  | 'free'
  | 'pickup';

const VALID_TYPES: readonly string[] = [
  'flat_rate',
  'weight_based',
  'distance_based',
  'free',
  'pickup',
];

export class DeliveryMethodTypeVO extends BaseTypeVO<DeliveryMethodTypeValue> {
  private constructor(value: DeliveryMethodTypeValue) {
    super(value);
  }

  static create(raw: string): DeliveryMethodTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DeliveryMethodType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid DeliveryMethodType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new DeliveryMethodTypeVO(normalized as DeliveryMethodTypeValue);
  }

  static reconstitute(raw: string): DeliveryMethodTypeVO {
    return new DeliveryMethodTypeVO(raw as DeliveryMethodTypeValue);
  }

  isFree(): boolean {
    return this.value === 'free' || this.value === 'pickup';
  }
}
