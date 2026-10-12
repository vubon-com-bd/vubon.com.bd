/**
 * ShippingMethod Value Object — how the vendor ships
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_SHIPPING_METHOD } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_SHIPPING_METHOD) as readonly string[];

export class ShippingMethodVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): ShippingMethodVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid shipping method "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'shippingMethod',
      );
    }
    return new ShippingMethodVO(raw);
  }

  static reconstitute(raw: string): ShippingMethodVO {
    return new ShippingMethodVO(raw);
  }

  /** Same-day & next-day require premium logistics. */
  isPremium(): boolean {
    return [
      VENDOR_SHIPPING_METHOD.SAME_DAY,
      VENDOR_SHIPPING_METHOD.NEXT_DAY,
    ].includes(this.value as never);
  }

  isPickup(): boolean {
    return this.value === VENDOR_SHIPPING_METHOD.PICKUP;
  }

  isCourier(): boolean {
    return this.value === VENDOR_SHIPPING_METHOD.COURIER;
  }

  requiresAddress(): boolean {
    return !this.isPickup();
  }

  isStandard(): boolean {
    return this.value === VENDOR_SHIPPING_METHOD.STANDARD;
  }
}
