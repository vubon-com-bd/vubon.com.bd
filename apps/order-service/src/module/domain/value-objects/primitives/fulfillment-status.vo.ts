/**
 * FulfillmentStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_FULFILLMENT_STATUS } from '@vubon/shared-constants/business/order';
import { InvalidFulfillmentStatusError } from '../../errors/order-fulfillment.errors.js';

const ALLOWED = Object.values(ORDER_FULFILLMENT_STATUS) as readonly string[];

export class FulfillmentStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): FulfillmentStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidFulfillmentStatusError(raw, ALLOWED);
    }
    return new FulfillmentStatusVO(raw);
  }

  static unfulfilled(): FulfillmentStatusVO {
    return new FulfillmentStatusVO(ORDER_FULFILLMENT_STATUS.UNFULFILLED);
  }

  static reconstitute(raw: string): FulfillmentStatusVO {
    return new FulfillmentStatusVO(raw);
  }

  isUnfulfilled(): boolean { return this.value === ORDER_FULFILLMENT_STATUS.UNFULFILLED; }
  isPartiallyFulfilled(): boolean {
    return this.value === ORDER_FULFILLMENT_STATUS.PARTIALLY_FULFILLED;
  }
  isFulfilled(): boolean { return this.value === ORDER_FULFILLMENT_STATUS.FULFILLED; }
  isPending(): boolean { return this.value === ORDER_FULFILLMENT_STATUS.PENDING; }
  isCancelled(): boolean { return this.value === ORDER_FULFILLMENT_STATUS.CANCELLED; }

  isFinal(): boolean {
    return [
      ORDER_FULFILLMENT_STATUS.FULFILLED,
      ORDER_FULFILLMENT_STATUS.CANCELLED,
    ].includes(this.value as never);
  }
}
