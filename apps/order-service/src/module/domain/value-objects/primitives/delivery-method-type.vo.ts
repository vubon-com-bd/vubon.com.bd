/**
 * DeliveryMethodType Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { SHIPPING_METHOD } from '@vubon/shared-constants/logistics';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(SHIPPING_METHOD) as readonly string[];

export class DeliveryMethodTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DeliveryMethodTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid delivery method "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'methodType',
      );
    }
    return new DeliveryMethodTypeVO(raw);
  }

  static reconstitute(raw: string): DeliveryMethodTypeVO {
    return new DeliveryMethodTypeVO(raw);
  }

  isExpress(): boolean {
    return [
      SHIPPING_METHOD.EXPRESS,
      SHIPPING_METHOD.SAME_DAY,
      SHIPPING_METHOD.NEXT_DAY,
      SHIPPING_METHOD.OVERNIGHT,
    ].includes(this.value as never);
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
}
