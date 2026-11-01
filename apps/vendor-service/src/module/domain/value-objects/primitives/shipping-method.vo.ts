/**
 * ShippingMethod Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SHIPPING_METHOD } from '@vubon/shared-constants/business';

export type ShippingMethodValue =
  (typeof VENDOR_SHIPPING_METHOD)[keyof typeof VENDOR_SHIPPING_METHOD];

const VALID_METHODS = new Set<string>(Object.values(VENDOR_SHIPPING_METHOD));

export class ShippingMethodVO extends BaseTypeVO<ShippingMethodValue> {
  private constructor(value: ShippingMethodValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_METHODS;
  }

  static create(raw: string): ShippingMethodVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ShippingMethod must be a string', 'shippingMethod');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_METHODS.has(normalized)) {
      throw new ValidationError(
        `Invalid ShippingMethod: "${normalized}". Allowed: ${[...VALID_METHODS].join(', ')}`,
        'shippingMethod',
      );
    }
    return new ShippingMethodVO(normalized as ShippingMethodValue);
  }

  static reconstitute(raw: string): ShippingMethodVO {
    return new ShippingMethodVO(raw as ShippingMethodValue);
  }

  // ─── Predicates ───
  isStandard(): boolean { return this.value === 'standard'; }
  isExpress(): boolean { return this.value === 'express'; }
  isSameDay(): boolean { return this.value === 'same_day'; }
  isNextDay(): boolean { return this.value === 'next_day'; }
  isPickup(): boolean { return this.value === 'pickup'; }
  isCourier(): boolean { return this.value === 'courier'; }

  /** Premium fast shipping */
  isPremium(): boolean {
    return this.isExpress() || this.isSameDay() || this.isNextDay();
  }

  /** Requires third-party courier */
  requiresCourier(): boolean {
    return !this.isPickup();
  }

  /** Same-day or next-day — SLA sensitive */
  isUrgent(): boolean {
    return this.isSameDay() || this.isNextDay();
  }
}
