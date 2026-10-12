/**
 * DeliveryStatus Value Object — state machine with attempt logic
 * @module logistics-service/domain/value-objects/primitives
 *
 * Lifecycle:
 *   scheduled → assigned → picked_up → in_transit → out_for_delivery
 *   → arrived → delivered
 *   Any → failed | rescheduled | cancelled | refused
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { DELIVERY_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidDeliveryStatusError } from '../../errors/delivery.errors.js';

const ALLOWED = Object.values(DELIVERY_STATUS) as readonly string[];

export class DeliveryStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): DeliveryStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidDeliveryStatusError(String(raw));
    }
    return new DeliveryStatusVO(raw);
  }

  static reconstitute(raw: string): DeliveryStatusVO { return new DeliveryStatusVO(raw); }

  static scheduled(): DeliveryStatusVO { return new DeliveryStatusVO(DELIVERY_STATUS.SCHEDULED); }
  static assigned(): DeliveryStatusVO { return new DeliveryStatusVO(DELIVERY_STATUS.ASSIGNED); }
  static pickedUp(): DeliveryStatusVO { return new DeliveryStatusVO(DELIVERY_STATUS.PICKED_UP); }
  static inTransit(): DeliveryStatusVO { return new DeliveryStatusVO(DELIVERY_STATUS.IN_TRANSIT); }
  static outForDelivery(): DeliveryStatusVO { return new DeliveryStatusVO(DELIVERY_STATUS.OUT_FOR_DELIVERY); }
  static arrived(): DeliveryStatusVO { return new DeliveryStatusVO(DELIVERY_STATUS.ARRIVED); }
  static delivered(): DeliveryStatusVO { return new DeliveryStatusVO(DELIVERY_STATUS.DELIVERED); }
  static failed(): DeliveryStatusVO { return new DeliveryStatusVO(DELIVERY_STATUS.FAILED); }
  static rescheduled(): DeliveryStatusVO { return new DeliveryStatusVO(DELIVERY_STATUS.RESCHEDULED); }
  static cancelled(): DeliveryStatusVO { return new DeliveryStatusVO(DELIVERY_STATUS.CANCELLED); }
  static refused(): DeliveryStatusVO { return new DeliveryStatusVO(DELIVERY_STATUS.REFUSED); }

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
      DELIVERY_STATUS.CANCELLED,
    ].includes(this.value as never);
  }

  /** Success terminal. */
  isSuccessful(): boolean { return this.isDelivered(); }

  /** Delivery was attempted but did not succeed. */
  isUnsuccessfulAttempt(): boolean {
    return [DELIVERY_STATUS.FAILED, DELIVERY_STATUS.REFUSED, DELIVERY_STATUS.RESCHEDULED].includes(
      this.value as never,
    );
  }

  /** Delivery is still in progress. */
  isActive(): boolean {
    return !this.isFinal() && !this.isFailed() && !this.isCancelled();
  }

  /** Can attempt another delivery. */
  isRecoverable(): boolean {
    return this.isFailed() || this.isRescheduled() || this.isRefused();
  }

  /** Driver is en route. */
  isEnRoute(): boolean {
    return this.isInTransit() || this.isOutForDelivery();
  }

  requiresProof(): boolean {
    return this.isOutForDelivery() || this.isArrived() || this.isDelivered();
  }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [DELIVERY_STATUS.SCHEDULED]: [
        DELIVERY_STATUS.ASSIGNED,
        DELIVERY_STATUS.CANCELLED,
        DELIVERY_STATUS.RESCHEDULED,
      ],
      [DELIVERY_STATUS.ASSIGNED]: [
        DELIVERY_STATUS.PICKED_UP,
        DELIVERY_STATUS.CANCELLED,
        DELIVERY_STATUS.RESCHEDULED,
      ],
      [DELIVERY_STATUS.PICKED_UP]: [
        DELIVERY_STATUS.IN_TRANSIT,
        DELIVERY_STATUS.FAILED,
        DELIVERY_STATUS.CANCELLED,
      ],
      [DELIVERY_STATUS.IN_TRANSIT]: [
        DELIVERY_STATUS.OUT_FOR_DELIVERY,
        DELIVERY_STATUS.FAILED,
        DELIVERY_STATUS.CANCELLED,
      ],
      [DELIVERY_STATUS.OUT_FOR_DELIVERY]: [
        DELIVERY_STATUS.ARRIVED,
        DELIVERY_STATUS.DELIVERED,
        DELIVERY_STATUS.FAILED,
        DELIVERY_STATUS.REFUSED,
        DELIVERY_STATUS.RESCHEDULED,
      ],
      [DELIVERY_STATUS.ARRIVED]: [
        DELIVERY_STATUS.DELIVERED,
        DELIVERY_STATUS.FAILED,
        DELIVERY_STATUS.REFUSED,
        DELIVERY_STATUS.RESCHEDULED,
      ],
      [DELIVERY_STATUS.DELIVERED]: [],
      [DELIVERY_STATUS.FAILED]: [
        DELIVERY_STATUS.SCHEDULED,
        DELIVERY_STATUS.RESCHEDULED,
        DELIVERY_STATUS.CANCELLED,
      ],
      [DELIVERY_STATUS.RESCHEDULED]: [
        DELIVERY_STATUS.SCHEDULED,
        DELIVERY_STATUS.ASSIGNED,
        DELIVERY_STATUS.CANCELLED,
      ],
      [DELIVERY_STATUS.CANCELLED]: [],
      [DELIVERY_STATUS.REFUSED]: [
        DELIVERY_STATUS.RESCHEDULED,
        DELIVERY_STATUS.CANCELLED,
      ],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
