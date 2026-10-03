/**
 * DeliveryStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { DELIVERY_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidDeliveryStatusError } from '../../errors/delivery.errors.js';

const ALLOWED = Object.values(DELIVERY_STATUS) as readonly string[];

export class DeliveryStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DeliveryStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidDeliveryStatusError(raw, ALLOWED);
    }
    return new DeliveryStatusVO(raw);
  }

  static scheduled(): DeliveryStatusVO {
    return new DeliveryStatusVO(DELIVERY_STATUS.SCHEDULED);
  }

  static reconstitute(raw: string): DeliveryStatusVO {
    return new DeliveryStatusVO(raw);
  }

  isScheduled(): boolean { return this.value === DELIVERY_STATUS.SCHEDULED; }
  isAssigned(): boolean { return this.value === DELIVERY_STATUS.ASSIGNED; }
  isPickedUp(): boolean { return this.value === DELIVERY_STATUS.PICKED_UP; }
  isInTransit(): boolean { return this.value === DELIVERY_STATUS.IN_TRANSIT; }
  isOutForDelivery(): boolean { return this.value === DELIVERY_STATUS.OUT_FOR_DELIVERY; }
  isArrived(): boolean { return this.value === DELIVERY_STATUS.ARRIVED; }
  isDelivered(): boolean { return this.value === DELIVERY_STATUS.DELIVERED; }
  isFailed(): boolean { return this.value === DELIVERY_STATUS.FAILED; }
  isRescheduled(): boolean { return this.value === DELIVERY_STATUS.RESCHEDULED; }
  isCancelled(): boolean { return this.value === DELIVERY_STATUS.CANCELLED; }
  isRefused(): boolean { return this.value === DELIVERY_STATUS.REFUSED; }

  isFinal(): boolean {
    return [
      DELIVERY_STATUS.DELIVERED,
      DELIVERY_STATUS.FAILED,
      DELIVERY_STATUS.CANCELLED,
      DELIVERY_STATUS.REFUSED,
    ].includes(this.value as never);
  }

  isActive(): boolean {
    return !this.isFinal();
  }

  canTransitionTo(target: string): boolean {
    const T = DELIVERY_STATUS;
    const transitions: Record<string, readonly string[]> = {
      [T.SCHEDULED]: [T.ASSIGNED, T.CANCELLED],
      [T.ASSIGNED]: [T.PICKED_UP, T.CANCELLED, T.RESCHEDULED],
      [T.PICKED_UP]: [T.IN_TRANSIT, T.FAILED, T.RESCHEDULED],
      [T.IN_TRANSIT]: [T.OUT_FOR_DELIVERY, T.FAILED, T.RESCHEDULED],
      [T.OUT_FOR_DELIVERY]: [T.ARRIVED, T.DELIVERED, T.FAILED, T.REFUSED],
      [T.ARRIVED]: [T.DELIVERED, T.FAILED, T.REFUSED],
      [T.FAILED]: [T.RESCHEDULED, T.CANCELLED],
      [T.RESCHEDULED]: [T.ASSIGNED, T.CANCELLED],
      // DELIVERED, CANCELLED, REFUSED — terminal
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
