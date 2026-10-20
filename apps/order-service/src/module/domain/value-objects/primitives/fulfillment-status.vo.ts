/**
 * FulfillmentStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_FULFILLMENT_STATUS } from '@vubon/shared-constants/business/order';

export type FulfillmentStatusValue = (typeof ORDER_FULFILLMENT_STATUS)[keyof typeof ORDER_FULFILLMENT_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(ORDER_FULFILLMENT_STATUS);

const VALID_TRANSITIONS: Readonly<Record<FulfillmentStatusValue, readonly FulfillmentStatusValue[]>> = {
  unfulfilled: ['pending', 'partially_fulfilled', 'cancelled'],
  pending: ['fulfilled', 'partially_fulfilled', 'cancelled'],
  partially_fulfilled: ['fulfilled', 'cancelled'],
  fulfilled: ['restocked'],
  restocked: [],
  cancelled: [],
} as Readonly<Record<FulfillmentStatusValue, readonly FulfillmentStatusValue[]>>;

export class FulfillmentStatusVO extends BaseStatusVO<FulfillmentStatusValue> {
  private constructor(value: FulfillmentStatusValue) {
    super(value);
  }

  static create(raw: string): FulfillmentStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('FulfillmentStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid FulfillmentStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new FulfillmentStatusVO(normalized as FulfillmentStatusValue);
  }

  static reconstitute(raw: string): FulfillmentStatusVO {
    return new FulfillmentStatusVO(raw as FulfillmentStatusValue);
  }

  static unfulfilled(): FulfillmentStatusVO { return new FulfillmentStatusVO(ORDER_FULFILLMENT_STATUS.UNFULFILLED as FulfillmentStatusValue); }

  isUnfulfilled(): boolean { return this.value === ORDER_FULFILLMENT_STATUS.UNFULFILLED; }
  isPartiallyFulfilled(): boolean { return this.value === ORDER_FULFILLMENT_STATUS.PARTIALLY_FULFILLED; }
  isFulfilled(): boolean { return this.value === ORDER_FULFILLMENT_STATUS.FULFILLED; }
  isRestocked(): boolean { return this.value === ORDER_FULFILLMENT_STATUS.RESTOCKED; }
  isPending(): boolean { return this.value === ORDER_FULFILLMENT_STATUS.PENDING; }
  isCancelled(): boolean { return this.value === ORDER_FULFILLMENT_STATUS.CANCELLED; }

  isTerminal(): boolean {
    return this.isFulfilled() || this.isRestocked() || this.isCancelled();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as FulfillmentStatusValue);
  }
}
