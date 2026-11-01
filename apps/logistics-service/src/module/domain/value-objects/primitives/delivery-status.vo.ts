/**
 * DeliveryStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * State machine:
 *   scheduled → assigned → picked_up → in_transit → out_for_delivery
 *   → arrived → delivered ✓ (final)
 *   any (except final) → failed
 *   failed → rescheduled → scheduled
 *   any (except final) → cancelled | refused
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DELIVERY_STATUS } from '@vubon/shared-constants/logistics';

export type DeliveryStatusValue =
  (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(DELIVERY_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<DeliveryStatusValue, readonly DeliveryStatusValue[]>
> = {
  scheduled: ['assigned', 'cancelled'],
  assigned: ['picked_up', 'failed', 'cancelled'],
  picked_up: ['in_transit', 'failed'],
  in_transit: ['out_for_delivery', 'failed'],
  out_for_delivery: ['arrived', 'failed'],
  arrived: ['delivered', 'failed', 'refused'],
  delivered: [], // final
  failed: ['rescheduled', 'cancelled'],
  rescheduled: ['scheduled', 'cancelled'],
  cancelled: [], // final
  refused: [], // final
};

export class DeliveryStatusVO extends BaseStatusVO<DeliveryStatusValue> {
  private constructor(value: DeliveryStatusValue) {
    super(value);
  }

  static create(raw: string): DeliveryStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('DeliveryStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid DeliveryStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new DeliveryStatusVO(normalized as DeliveryStatusValue);
  }

  static reconstitute(raw: string): DeliveryStatusVO {
    return new DeliveryStatusVO(raw as DeliveryStatusValue);
  }

  static scheduled(): DeliveryStatusVO {
    return new DeliveryStatusVO(DELIVERY_STATUS.SCHEDULED);
  }
  static delivered(): DeliveryStatusVO {
    return new DeliveryStatusVO(DELIVERY_STATUS.DELIVERED);
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
    return this.isDelivered() || this.isCancelled() || this.isRefused();
  }

  isInMotion(): boolean {
    return (
      this.isPickedUp() ||
      this.isInTransit() ||
      this.isOutForDelivery() ||
      this.isArrived()
    );
  }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as DeliveryStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
