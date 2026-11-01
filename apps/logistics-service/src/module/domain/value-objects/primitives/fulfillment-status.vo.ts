/**
 * FulfillmentStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → processing → picking → packing → ready_to_ship → shipped
 *   → partially_fulfilled | fulfilled ✓ (final)
 *   pending/processing → on_hold → processing
 *   any (except final) → cancelled | failed
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { FULFILLMENT_STATUS } from '@vubon/shared-constants/logistics';

export type FulfillmentStatusValue =
  (typeof FULFILLMENT_STATUS)[keyof typeof FULFILLMENT_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(FULFILLMENT_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<FulfillmentStatusValue, readonly FulfillmentStatusValue[]>
> = {
  pending: ['processing', 'on_hold', 'cancelled'],
  processing: ['picking', 'on_hold', 'failed', 'cancelled'],
  picking: ['packing', 'failed', 'cancelled'],
  packing: ['ready_to_ship', 'failed', 'cancelled'],
  ready_to_ship: ['shipped', 'failed', 'cancelled'],
  shipped: ['partially_fulfilled', 'fulfilled', 'failed'],
  partially_fulfilled: ['fulfilled'],
  fulfilled: [], // final
  cancelled: [], // final
  failed: ['cancelled'], // can only cancel after fail
  on_hold: ['processing', 'cancelled'],
};

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

  static pending(): FulfillmentStatusVO {
    return new FulfillmentStatusVO(FULFILLMENT_STATUS.PENDING);
  }

  isPending(): boolean { return this.value === FULFILLMENT_STATUS.PENDING; }
  isProcessing(): boolean { return this.value === FULFILLMENT_STATUS.PROCESSING; }
  isPicking(): boolean { return this.value === FULFILLMENT_STATUS.PICKING; }
  isPacking(): boolean { return this.value === FULFILLMENT_STATUS.PACKING; }
  isReadyToShip(): boolean { return this.value === FULFILLMENT_STATUS.READY_TO_SHIP; }
  isShipped(): boolean { return this.value === FULFILLMENT_STATUS.SHIPPED; }
  isPartiallyFulfilled(): boolean { return this.value === FULFILLMENT_STATUS.PARTIALLY_FULFILLED; }
  isFulfilled(): boolean { return this.value === FULFILLMENT_STATUS.FULFILLED; }
  isCancelled(): boolean { return this.value === FULFILLMENT_STATUS.CANCELLED; }
  isFailed(): boolean { return this.value === FULFILLMENT_STATUS.FAILED; }
  isOnHold(): boolean { return this.value === FULFILLMENT_STATUS.ON_HOLD; }

  isFinal(): boolean { return this.isFulfilled() || this.isCancelled(); }
  isActive(): boolean { return !this.isFinal() && !this.isOnHold(); }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as FulfillmentStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
