/**
 * ReturnShipmentStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RETURN_SHIPMENT_STATUS } from '@vubon/shared-constants/logistics';

export type ReturnShipmentStatusValue =
  (typeof RETURN_SHIPMENT_STATUS)[keyof typeof RETURN_SHIPMENT_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(RETURN_SHIPMENT_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<ReturnShipmentStatusValue, readonly ReturnShipmentStatusValue[]>
> = {
  requested: ['approved', 'rejected', 'cancelled'],
  approved: ['pickup_scheduled', 'cancelled'],
  pickup_scheduled: ['picked_up', 'cancelled'],
  picked_up: ['in_transit', 'lost'],
  in_transit: ['received', 'lost'],
  received: ['inspected'],
  inspected: ['completed', 'rejected'],
  completed: [], // final
  rejected: [], // final
  cancelled: [], // final
  lost: ['cancelled'],
};

export class ReturnShipmentStatusVO extends BaseStatusVO<ReturnShipmentStatusValue> {
  private constructor(value: ReturnShipmentStatusValue) {
    super(value);
  }

  static create(raw: string): ReturnShipmentStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ReturnShipmentStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ReturnShipmentStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new ReturnShipmentStatusVO(normalized as ReturnShipmentStatusValue);
  }

  static reconstitute(raw: string): ReturnShipmentStatusVO {
    return new ReturnShipmentStatusVO(raw as ReturnShipmentStatusValue);
  }

  static requested(): ReturnShipmentStatusVO {
    return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.REQUESTED);
  }

  isRequested(): boolean { return this.value === RETURN_SHIPMENT_STATUS.REQUESTED; }
  isApproved(): boolean { return this.value === RETURN_SHIPMENT_STATUS.APPROVED; }
  isPickupScheduled(): boolean { return this.value === RETURN_SHIPMENT_STATUS.PICKUP_SCHEDULED; }
  isPickedUp(): boolean { return this.value === RETURN_SHIPMENT_STATUS.PICKED_UP; }
  isInTransit(): boolean { return this.value === RETURN_SHIPMENT_STATUS.IN_TRANSIT; }
  isReceived(): boolean { return this.value === RETURN_SHIPMENT_STATUS.RECEIVED; }
  isInspected(): boolean { return this.value === RETURN_SHIPMENT_STATUS.INSPECTED; }
  isCompleted(): boolean { return this.value === RETURN_SHIPMENT_STATUS.COMPLETED; }
  isRejected(): boolean { return this.value === RETURN_SHIPMENT_STATUS.REJECTED; }
  isCancelled(): boolean { return this.value === RETURN_SHIPMENT_STATUS.CANCELLED; }
  isLost(): boolean { return this.value === RETURN_SHIPMENT_STATUS.LOST; }

  isFinal(): boolean {
    return this.isCompleted() || this.isRejected() || this.isCancelled();
  }

  isInProgress(): boolean {
    return (
      this.isApproved() ||
      this.isPickupScheduled() ||
      this.isPickedUp() ||
      this.isInTransit() ||
      this.isReceived() ||
      this.isInspected()
    );
  }

  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as ReturnShipmentStatusValue;
    return (VALID_TRANSITIONS[this.value] ?? []).includes(normalized);
  }
}
