/**
 * FulfillmentStatus Value Object — state machine
 * @module logistics-service/domain/value-objects/primitives
 *
 * Lifecycle: pending → processing → picking → packing → ready_to_ship → shipped
 *            → fulfilled (or partially_fulfilled)
 *            Any → cancelled | failed | on_hold
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { FULFILLMENT_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidFulfillmentStatusError } from '../../errors/fulfillment.errors.js';

const ALLOWED = Object.values(FULFILLMENT_STATUS) as readonly string[];

export class FulfillmentStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): FulfillmentStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidFulfillmentStatusError(String(raw));
    }
    return new FulfillmentStatusVO(raw);
  }

  static reconstitute(raw: string): FulfillmentStatusVO { return new FulfillmentStatusVO(raw); }

  static pending(): FulfillmentStatusVO { return new FulfillmentStatusVO(FULFILLMENT_STATUS.PENDING); }
  static processing(): FulfillmentStatusVO { return new FulfillmentStatusVO(FULFILLMENT_STATUS.PROCESSING); }
  static picking(): FulfillmentStatusVO { return new FulfillmentStatusVO(FULFILLMENT_STATUS.PICKING); }
  static packing(): FulfillmentStatusVO { return new FulfillmentStatusVO(FULFILLMENT_STATUS.PACKING); }
  static readyToShip(): FulfillmentStatusVO { return new FulfillmentStatusVO(FULFILLMENT_STATUS.READY_TO_SHIP); }
  static shipped(): FulfillmentStatusVO { return new FulfillmentStatusVO(FULFILLMENT_STATUS.SHIPPED); }
  static partiallyFulfilled(): FulfillmentStatusVO { return new FulfillmentStatusVO(FULFILLMENT_STATUS.PARTIALLY_FULFILLED); }
  static fulfilled(): FulfillmentStatusVO { return new FulfillmentStatusVO(FULFILLMENT_STATUS.FULFILLED); }
  static cancelled(): FulfillmentStatusVO { return new FulfillmentStatusVO(FULFILLMENT_STATUS.CANCELLED); }
  static failed(): FulfillmentStatusVO { return new FulfillmentStatusVO(FULFILLMENT_STATUS.FAILED); }
  static onHold(): FulfillmentStatusVO { return new FulfillmentStatusVO(FULFILLMENT_STATUS.ON_HOLD); }

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

  isFinal(): boolean {
    return [FULFILLMENT_STATUS.FULFILLED, FULFILLMENT_STATUS.CANCELLED].includes(this.value as never);
  }

  /** Fulfillment is actively being worked on. */
  isInProgress(): boolean {
    return [
      FULFILLMENT_STATUS.PROCESSING,
      FULFILLMENT_STATUS.PICKING,
      FULFILLMENT_STATUS.PACKING,
    ].includes(this.value as never);
  }

  /** Ready for handover to shipping. */
  canBeShipped(): boolean { return this.isReadyToShip(); }

  canBeCancelled(): boolean {
    return !this.isShipped() && !this.isFinal();
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [FULFILLMENT_STATUS.PENDING]: [
        FULFILLMENT_STATUS.PROCESSING,
        FULFILLMENT_STATUS.CANCELLED,
        FULFILLMENT_STATUS.ON_HOLD,
      ],
      [FULFILLMENT_STATUS.PROCESSING]: [
        FULFILLMENT_STATUS.PICKING,
        FULFILLMENT_STATUS.CANCELLED,
        FULFILLMENT_STATUS.FAILED,
        FULFILLMENT_STATUS.ON_HOLD,
      ],
      [FULFILLMENT_STATUS.PICKING]: [
        FULFILLMENT_STATUS.PACKING,
        FULFILLMENT_STATUS.FAILED,
        FULFILLMENT_STATUS.ON_HOLD,
      ],
      [FULFILLMENT_STATUS.PACKING]: [
        FULFILLMENT_STATUS.READY_TO_SHIP,
        FULFILLMENT_STATUS.FAILED,
        FULFILLMENT_STATUS.ON_HOLD,
      ],
      [FULFILLMENT_STATUS.READY_TO_SHIP]: [
        FULFILLMENT_STATUS.SHIPPED,
        FULFILLMENT_STATUS.CANCELLED,
        FULFILLMENT_STATUS.ON_HOLD,
      ],
      [FULFILLMENT_STATUS.SHIPPED]: [
        FULFILLMENT_STATUS.FULFILLED,
        FULFILLMENT_STATUS.PARTIALLY_FULFILLED,
      ],
      [FULFILLMENT_STATUS.PARTIALLY_FULFILLED]: [
        FULFILLMENT_STATUS.FULFILLED,
        FULFILLMENT_STATUS.CANCELLED,
      ],
      [FULFILLMENT_STATUS.ON_HOLD]: [
        FULFILLMENT_STATUS.PROCESSING,
        FULFILLMENT_STATUS.CANCELLED,
        FULFILLMENT_STATUS.FAILED,
      ],
      [FULFILLMENT_STATUS.FULFILLED]: [],
      [FULFILLMENT_STATUS.CANCELLED]: [],
      [FULFILLMENT_STATUS.FAILED]: [
        FULFILLMENT_STATUS.PENDING,
        FULFILLMENT_STATUS.CANCELLED,
      ],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
