/**
 * CartShippingMethod Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Method from SHIPPING_METHOD constants
 * - Provides estimated delivery range & shipping eligibility helpers
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { SHIPPING_METHOD } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(SHIPPING_METHOD) as readonly string[];

export class CartShippingMethodVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartShippingMethodVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid shipping method "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'shippingMethod',
      );
    }
    return new CartShippingMethodVO(raw);
  }

  static reconstitute(raw: string): CartShippingMethodVO {
    return new CartShippingMethodVO(raw);
  }

  isExpress(): boolean {
    return (
      this.value === SHIPPING_METHOD.EXPRESS ||
      this.value === SHIPPING_METHOD.OVERNIGHT ||
      this.value === SHIPPING_METHOD.SAME_DAY
    );
  }

  isStandard(): boolean {
    return this.value === SHIPPING_METHOD.STANDARD;
  }

  isPickup(): boolean {
    return this.value === SHIPPING_METHOD.PICKUP;
  }

  isInternational(): boolean {
    return this.value === SHIPPING_METHOD.INTERNATIONAL;
  }

  requiresAddress(): boolean {
    return !this.isPickup();
  }

  /** Estimated delivery window in days */
  estimatedDays(): { min: number; max: number } {
    switch (this.value) {
      case SHIPPING_METHOD.SAME_DAY:
        return { min: 0, max: 1 };
      case SHIPPING_METHOD.NEXT_DAY:
      case SHIPPING_METHOD.OVERNIGHT:
        return { min: 1, max: 2 };
      case SHIPPING_METHOD.EXPRESS:
        return { min: 1, max: 3 };
      case SHIPPING_METHOD.STANDARD:
        return { min: 3, max: 7 };
      case SHIPPING_METHOD.ECONOMY:
        return { min: 5, max: 10 };
      case SHIPPING_METHOD.INTERNATIONAL:
        return { min: 7, max: 30 };
      case SHIPPING_METHOD.FREIGHT:
        return { min: 5, max: 15 };
      case SHIPPING_METHOD.PICKUP:
        return { min: 0, max: 0 };
      case SHIPPING_METHOD.LOCAL_DELIVERY:
        return { min: 0, max: 2 };
      default:
        return { min: 3, max: 7 };
    }
  }
}
