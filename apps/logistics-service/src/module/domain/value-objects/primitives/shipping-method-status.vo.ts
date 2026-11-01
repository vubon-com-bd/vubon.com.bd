/**
 * ShippingMethodStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPPING_METHOD_STATUS } from '@vubon/shared-constants/logistics';

export type ShippingMethodStatusValue =
  (typeof SHIPPING_METHOD_STATUS)[keyof typeof SHIPPING_METHOD_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(SHIPPING_METHOD_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<ShippingMethodStatusValue, readonly ShippingMethodStatusValue[]>
> = {
  active: ['inactive', 'seasonal', 'suspended'],
  inactive: ['active', 'suspended'],
  seasonal: ['active', 'inactive'],
  suspended: ['active', 'inactive'],
};

export class ShippingMethodStatusVO extends BaseStatusVO<ShippingMethodStatusValue> {
  private constructor(value: ShippingMethodStatusValue) {
    super(value);
  }

  static create(raw: string): ShippingMethodStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ShippingMethodStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ShippingMethodStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new ShippingMethodStatusVO(normalized as ShippingMethodStatusValue);
  }

  static reconstitute(raw: string): ShippingMethodStatusVO {
    return new ShippingMethodStatusVO(raw as ShippingMethodStatusValue);
  }

  static active(): ShippingMethodStatusVO {
    return new ShippingMethodStatusVO(SHIPPING_METHOD_STATUS.ACTIVE);
  }

  isActive(): boolean { return this.value === SHIPPING_METHOD_STATUS.ACTIVE; }
  isInactive(): boolean { return this.value === SHIPPING_METHOD_STATUS.INACTIVE; }
  isSeasonal(): boolean { return this.value === SHIPPING_METHOD_STATUS.SEASONAL; }
  isSuspended(): boolean { return this.value === SHIPPING_METHOD_STATUS.SUSPENDED; }

  isFinal(): boolean { return false; }
  isUsable(): boolean { return this.isActive() || this.isSeasonal(); }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as ShippingMethodStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
