/**
 * CartShippingMethod Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type ShippingMethodValue =
  | 'standard'
  | 'express'
  | 'same_day'
  | 'pickup'
  | 'international';

const VALID_METHODS: readonly string[] = [
  'standard',
  'express',
  'same_day',
  'pickup',
  'international',
];

export class CartShippingMethodVO extends BaseVO<ShippingMethodValue> {
  private constructor(value: ShippingMethodValue) {
    super(value);
  }

  static create(raw: string): CartShippingMethodVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_METHODS.includes(normalized)) {
      throw new ValidationError(
        `Invalid shipping method: "${normalized}". Allowed: ${VALID_METHODS.join(', ')}`,
        'method',
      );
    }
    return new CartShippingMethodVO(normalized as ShippingMethodValue);
  }

  static standard(): CartShippingMethodVO {
    return new CartShippingMethodVO('standard');
  }

  static reconstitute(raw: string): CartShippingMethodVO {
    return new CartShippingMethodVO(raw as ShippingMethodValue);
  }

  isStandard(): boolean { return this.value === 'standard'; }
  isExpress(): boolean { return this.value === 'express'; }
  isSameDay(): boolean { return this.value === 'same_day'; }
  isPickup(): boolean { return this.value === 'pickup'; }
  isInternational(): boolean { return this.value === 'international'; }

  isFreeEligible(): boolean {
    return this.isPickup();
  }
}
