/**
 * ShipmentStatus Value Object — state machine
 * @module logistics-service/domain/value-objects/primitives
 *
 * Lifecycle:
 *   pending → confirmed → processing → packed → picked_up → in_transit
 *   → out_for_delivery → delivered
 *   Any active state → cancelled / returned / failed / on_hold / delayed
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { SHIPMENT_STATUS } from '@vubon/shared-constants/logistics';
import { InvalidShipmentStatusError } from '../../errors/shipment.errors.js';

const ALLOWED = Object.values(SHIPMENT_STATUS) as readonly string[];

export class ShipmentStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ShipmentStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidShipmentStatusError(String(raw));
    }
    return new ShipmentStatusVO(raw);
  }

  static reconstitute(raw: string): ShipmentStatusVO { return new ShipmentStatusVO(raw); }

  // ─── Named constructors ───
  static pending(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.PENDING); }
  static confirmed(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.CONFIRMED); }
  static processing(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.PROCESSING); }
  static packed(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.PACKED); }
  static pickedUp(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.PICKED_UP); }
  static inTransit(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.IN_TRANSIT); }
  static outForDelivery(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.OUT_FOR_DELIVERY); }
  static delivered(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.DELIVERED); }
  static failed(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.FAILED); }
  static returned(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.RETURNED); }
  static cancelled(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.CANCELLED); }
  static onHold(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.ON_HOLD); }
  static delayed(): ShipmentStatusVO { return new ShipmentStatusVO(SHIPMENT_STATUS.DELAYED); }

  // ─── Predicates ───
  isPending(): boolean { return this.value === SHIPMENT_STATUS.PENDING; }
  isConfirmed(): boolean { return this.value === SHIPMENT_STATUS.CONFIRMED; }
  isProcessing(): boolean { return this.value === SHIPMENT_STATUS.PROCESSING; }
  isPacked(): boolean { return this.value === SHIPMENT_STATUS.PACKED; }
  isPickedUp(): boolean { return this.value === SHIPMENT_STATUS.PICKED_UP; }
  isInTransit(): boolean {
    return this.value === SHIPMENT_STATUS.IN_TRANSIT
      || this.value === SHIPMENT_STATUS.OUT_FOR_DELIVERY;
  }
  isOutForDelivery(): boolean { return this.value === SHIPMENT_STATUS.OUT_FOR_DELIVERY; }
  isDelivered(): boolean { return this.value === SHIPMENT_STATUS.DELIVERED; }
  isFailed(): boolean { return this.value === SHIPMENT_STATUS.FAILED; }
  isReturned(): boolean { return this.value === SHIPMENT_STATUS.RETURNED; }
  isCancelled(): boolean { return this.value === SHIPMENT_STATUS.CANCELLED; }
  isOnHold(): boolean { return this.value === SHIPMENT_STATUS.ON_HOLD; }
  isDelayed(): boolean { return this.value === SHIPMENT_STATUS.DELAYED; }

  /** Terminal — cannot transition anywhere. */
  isFinal(): boolean {
    return [
      SHIPMENT_STATUS.DELIVERED,
      SHIPMENT_STATUS.RETURNED,
      SHIPMENT_STATUS.CANCELLED,
    ].includes(this.value as never);
  }

  /** Shipment has left the warehouse but not delivered. */
  isInFlight(): boolean {
    return [
      SHIPMENT_STATUS.PICKED_UP,
      SHIPMENT_STATUS.IN_TRANSIT,
      SHIPMENT_STATUS.OUT_FOR_DELIVERY,
    ].includes(this.value as never);
  }

  /** Shipment is still being processed in warehouse. */
  isPreFulfillment(): boolean {
    return [
      SHIPMENT_STATUS.PENDING,
      SHIPMENT_STATUS.CONFIRMED,
      SHIPMENT_STATUS.PROCESSING,
      SHIPMENT_STATUS.PACKED,
    ].includes(this.value as never);
  }

  canBeCancelled(): boolean {
    return !this.isInFlight() && !this.isFinal();
  }

  canBeModified(): boolean {
    return [SHIPMENT_STATUS.PENDING, SHIPMENT_STATUS.CONFIRMED, SHIPMENT_STATUS.ON_HOLD].includes(
      this.value as never,
    );
  }

  canGenerateLabel(): boolean {
    return this.isConfirmed() || this.isProcessing() || this.isPacked();
  }

  // ─── State machine ───
  canTransitionTo(target: string): boolean {
    const transitions: Record<string, readonly string[]> = {
      [SHIPMENT_STATUS.PENDING]: [
        SHIPMENT_STATUS.CONFIRMED,
        SHIPMENT_STATUS.CANCELLED,
        SHIPMENT_STATUS.ON_HOLD,
      ],
      [SHIPMENT_STATUS.CONFIRMED]: [
        SHIPMENT_STATUS.PROCESSING,
        SHIPMENT_STATUS.CANCELLED,
        SHIPMENT_STATUS.ON_HOLD,
      ],
      [SHIPMENT_STATUS.PROCESSING]: [
        SHIPMENT_STATUS.PACKED,
        SHIPMENT_STATUS.ON_HOLD,
        SHIPMENT_STATUS.CANCELLED,
        SHIPMENT_STATUS.FAILED,
      ],
      [SHIPMENT_STATUS.PACKED]: [
        SHIPMENT_STATUS.PICKED_UP,
        SHIPMENT_STATUS.CANCELLED,
        SHIPMENT_STATUS.ON_HOLD,
        SHIPMENT_STATUS.FAILED,
      ],
      [SHIPMENT_STATUS.PICKED_UP]: [
        SHIPMENT_STATUS.IN_TRANSIT,
        SHIPMENT_STATUS.RETURNED,
        SHIPMENT_STATUS.FAILED,
        SHIPMENT_STATUS.DELAYED,
      ],
      [SHIPMENT_STATUS.IN_TRANSIT]: [
        SHIPMENT_STATUS.OUT_FOR_DELIVERY,
        SHIPMENT_STATUS.DELIVERED,
        SHIPMENT_STATUS.RETURNED,
        SHIPMENT_STATUS.FAILED,
        SHIPMENT_STATUS.DELAYED,
      ],
      [SHIPMENT_STATUS.OUT_FOR_DELIVERY]: [
        SHIPMENT_STATUS.DELIVERED,
        SHIPMENT_STATUS.RETURNED,
        SHIPMENT_STATUS.FAILED,
        SHIPMENT_STATUS.DELAYED,
      ],
      [SHIPMENT_STATUS.ON_HOLD]: [
        SHIPMENT_STATUS.PROCESSING,
        SHIPMENT_STATUS.CANCELLED,
        SHIPMENT_STATUS.FAILED,
      ],
      [SHIPMENT_STATUS.DELAYED]: [
        SHIPMENT_STATUS.IN_TRANSIT,
        SHIPMENT_STATUS.OUT_FOR_DELIVERY,
        SHIPMENT_STATUS.DELIVERED,
        SHIPMENT_STATUS.RETURNED,
        SHIPMENT_STATUS.FAILED,
      ],
      [SHIPMENT_STATUS.DELIVERED]: [],
      [SHIPMENT_STATUS.RETURNED]: [],
      [SHIPMENT_STATUS.CANCELLED]: [],
      [SHIPMENT_STATUS.FAILED]: [
        SHIPMENT_STATUS.PENDING,
        SHIPMENT_STATUS.RETURNED,
        SHIPMENT_STATUS.CANCELLED,
      ],
    };
    return (transitions[this.value] ?? []).includes(target);
  }
}
