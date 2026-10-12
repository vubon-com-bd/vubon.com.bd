/**
 * ShippingZone Value Object — geographic coverage
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_SHIPPING_ZONE } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_SHIPPING_ZONE) as readonly string[];

export class ShippingZoneVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return new Set(ALLOWED);
  }

  static create(raw: string): ShippingZoneVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid shipping zone "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'shippingZone',
      );
    }
    return new ShippingZoneVO(raw);
  }

  static reconstitute(raw: string): ShippingZoneVO {
    return new ShippingZoneVO(raw);
  }

  isInternational(): boolean {
    return this.value === VENDOR_SHIPPING_ZONE.INTERNATIONAL;
  }

  isRemote(): boolean {
    return this.value === VENDOR_SHIPPING_ZONE.REMOTE;
  }

  isDomestic(): boolean {
    return !this.isInternational();
  }

  /** Remote areas typically take longer. */
  requiresLongerDelivery(): boolean {
    return this.isRemote() || this.isInternational();
  }
}
