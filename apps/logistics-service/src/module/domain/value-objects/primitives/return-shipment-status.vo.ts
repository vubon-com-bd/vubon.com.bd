/**
 * ReturnShipmentStatus Value Object — state machine
 * @module logistics-service/domain/value-objects/primitives
 *
 * Lifecycle:
 *   requested → approved → pickup_scheduled → picked_up → in_transit
 *   → received → inspected → completed
 *   Any → rejected | cancelled | lost
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { RETURN_SHIPMENT_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidReturnShipmentStatusError } from '../../errors/return-shipment.errors.js';

const ALLOWED = Object.values(RETURN_SHIPMENT_STATUS) as readonly string[];

export class ReturnShipmentStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ReturnShipmentStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidReturnShipmentStatusError(String(raw));
    }
    return new ReturnShipmentStatusVO(raw);
  }

  static reconstitute(raw: string): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(raw); }

  static requested(): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.REQUESTED); }
  static approved(): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.APPROVED); }
  static pickupScheduled(): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.PICKUP_SCHEDULED); }
  static pickedUp(): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.PICKED_UP); }
  static inTransit(): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.IN_TRANSIT); }
  static received(): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.RECEIVED); }
  static inspected(): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.INSPECTED); }
  static completed(): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.COMPLETED); }
  static rejected(): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.REJECTED); }
  static cancelled(): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.CANCELLED); }
  static lost(): ReturnShipmentStatusVO { return new ReturnShipmentStatusVO(RETURN_SHIPMENT_STATUS.LOST); }

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
    return [RETURN_SHIPMENT_STATUS.COMPLETED, RETURN_SHIPMENT_STATUS.REJECTED, RETURN_SHIPMENT_STATUS.CANCELLED, RETURN_SHIPMENT_STATUS.LOST].includes(
      this.value as never,
    );
  }

  /** Return has been authorized — pickup can be scheduled. */
  canBePickedUp(): boolean {
    return [RETURN_SHIPMENT_STATUS.APPROVED, RETURN_SHIPMENT_STATUS.PICKUP_SCHEDULED].includes(
      this.value as never,
    );
  }

  /** Return can still be cancelled by user. */
  canBeCancelled(): boolean {
    return [RETURN_SHIPMENT_STATUS.REQUESTED, RETURN_SHIPMENT_STATUS.APPROVED, RETURN_SHIPMENT_STATUS.PICKUP_SCHEDULED].includes(
      this.value as never,
    );
  }

  /** Physically in transit back to warehouse. */
  isInFlight(): boolean {
    return [RETURN_SHIPMENT_STATUS.PICKED_UP, RETURN_SHIPMENT_STATUS.IN_TRANSIT].includes(
      this.value as never,
    );
  }

  canBeInspected(): boolean { return this.isReceived(); }
  canBeCompleted(): boolean { return this.isInspected(); }

  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [RETURN_SHIPMENT_STATUS.REQUESTED]: [
        RETURN_SHIPMENT_STATUS.APPROVED,
        RETURN_SHIPMENT_STATUS.REJECTED,
        RETURN_SHIPMENT_STATUS.CANCELLED,
      ],
      [RETURN_SHIPMENT_STATUS.APPROVED]: [
        RETURN_SHIPMENT_STATUS.PICKUP_SCHEDULED,
        RETURN_SHIPMENT_STATUS.CANCELLED,
      ],
      [RETURN_SHIPMENT_STATUS.PICKUP_SCHEDULED]: [
        RETURN_SHIPMENT_STATUS.PICKED_UP,
        RETURN_SHIPMENT_STATUS.CANCELLED,
        RETURN_SHIPMENT_STATUS.LOST,
      ],
      [RETURN_SHIPMENT_STATUS.PICKED_UP]: [
        RETURN_SHIPMENT_STATUS.IN_TRANSIT,
        RETURN_SHIPMENT_STATUS.LOST,
      ],
      [RETURN_SHIPMENT_STATUS.IN_TRANSIT]: [
        RETURN_SHIPMENT_STATUS.RECEIVED,
        RETURN_SHIPMENT_STATUS.LOST,
      ],
      [RETURN_SHIPMENT_STATUS.RECEIVED]: [
        RETURN_SHIPMENT_STATUS.INSPECTED,
      ],
      [RETURN_SHIPMENT_STATUS.INSPECTED]: [
        RETURN_SHIPMENT_STATUS.COMPLETED,
        RETURN_SHIPMENT_STATUS.REJECTED,
      ],
      [RETURN_SHIPMENT_STATUS.COMPLETED]: [],
      [RETURN_SHIPMENT_STATUS.REJECTED]: [],
      [RETURN_SHIPMENT_STATUS.CANCELLED]: [],
      [RETURN_SHIPMENT_STATUS.LOST]: [],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
