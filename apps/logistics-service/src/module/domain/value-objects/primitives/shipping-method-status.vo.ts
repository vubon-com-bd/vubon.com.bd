/**
 * ShippingMethodStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { SHIPPING_METHOD_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidShippingMethodStatusError } from '../../errors/shipping-method.errors.js';

const ALLOWED = Object.values(SHIPPING_METHOD_STATUS) as readonly string[];

export class ShippingMethodStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ShippingMethodStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidShippingMethodStatusError(String(raw));
    }
    return new ShippingMethodStatusVO(raw);
  }

  static reconstitute(raw: string): ShippingMethodStatusVO { return new ShippingMethodStatusVO(raw); }

  static active(): ShippingMethodStatusVO { return new ShippingMethodStatusVO(SHIPPING_METHOD_STATUS.ACTIVE); }
  static inactive(): ShippingMethodStatusVO { return new ShippingMethodStatusVO(SHIPPING_METHOD_STATUS.INACTIVE); }
  static seasonal(): ShippingMethodStatusVO { return new ShippingMethodStatusVO(SHIPPING_METHOD_STATUS.SEASONAL); }
  static suspended(): ShippingMethodStatusVO { return new ShippingMethodStatusVO(SHIPPING_METHOD_STATUS.SUSPENDED); }

  isActive(): boolean { return this.value === SHIPPING_METHOD_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === SHIPPING_METHOD_STATUS.INACTIVE; }
  isSeasonal(): boolean { return this.value === SHIPPING_METHOD_STATUS.SEASONAL; }
  isSuspended(): boolean { return this.value === SHIPPING_METHOD_STATUS.SUSPENDED; }

  isFinal(): boolean { return false; }

  isSelectable(): boolean { return this.isActive() || this.isSeasonal(); }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [SHIPPING_METHOD_STATUS.ACTIVE]: [
        SHIPPING_METHOD_STATUS.INACTIVE,
        SHIPPING_METHOD_STATUS.SEASONAL,
        SHIPPING_METHOD_STATUS.SUSPENDED,
      ],
      [SHIPPING_METHOD_STATUS.INACTIVE]: [
        SHIPPING_METHOD_STATUS.ACTIVE,
        SHIPPING_METHOD_STATUS.SEASONAL,
      ],
      [SHIPPING_METHOD_STATUS.SEASONAL]: [
        SHIPPING_METHOD_STATUS.ACTIVE,
        SHIPPING_METHOD_STATUS.INACTIVE,
      ],
      [SHIPPING_METHOD_STATUS.SUSPENDED]: [
        SHIPPING_METHOD_STATUS.ACTIVE,
        SHIPPING_METHOD_STATUS.INACTIVE,
      ],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
