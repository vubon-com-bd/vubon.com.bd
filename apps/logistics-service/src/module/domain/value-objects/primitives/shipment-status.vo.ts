/**
 * ShipmentStatus Value Object
 * @module logistics-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → confirmed → processing → packed → picked_up
 *   → in_transit → out_for_delivery → delivered ✓ (final)
 *   out_for_delivery → failed → returned | cancelled
 *   any (except final) → cancelled | on_hold
 *   failed → delayed → in_transit (retry)
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPMENT_STATUS } from '@vubon/shared-constants/logistics';

export type ShipmentStatusValue = (typeof SHIPMENT_STATUS)[keyof typeof SHIPMENT_STATUS];

const VALID_STATUSES: readonly string[] = Object.values(SHIPMENT_STATUS);

const VALID_TRANSITIONS: Readonly<
  Record<ShipmentStatusValue, readonly ShipmentStatusValue[]>
> = {
  pending: ['confirmed', 'cancelled', 'on_hold'],
  confirmed: ['processing', 'cancelled', 'on_hold'],
  processing: ['packed', 'cancelled', 'on_hold'],
  packed: ['picked_up', 'cancelled', 'on_hold'],
  picked_up: ['in_transit', 'failed', 'on_hold'],
  in_transit: ['out_for_delivery', 'failed', 'delayed', 'on_hold'],
  out_for_delivery: ['delivered', 'failed', 'delayed'],
  delivered: [], // final
  failed: ['returned', 'cancelled', 'delayed'],
  returned: [], // final
  cancelled: [], // final
  on_hold: ['pending', 'confirmed', 'processing', 'packed', 'picked_up', 'cancelled'],
  delayed: ['in_transit', 'out_for_delivery', 'failed'],
};

export class ShipmentStatusVO extends BaseStatusVO<ShipmentStatusValue> {
  private constructor(value: ShipmentStatusValue) {
    super(value);
  }

  static create(raw: string): ShipmentStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('ShipmentStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid ShipmentStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new ShipmentStatusVO(normalized as ShipmentStatusValue);
  }

  static reconstitute(raw: string): ShipmentStatusVO {
    return new ShipmentStatusVO(raw as ShipmentStatusValue);
  }

  // ─── Factories ────────────────────────────
  static pending(): ShipmentStatusVO {
    return new ShipmentStatusVO(SHIPMENT_STATUS.PENDING);
  }
  static confirmed(): ShipmentStatusVO {
    return new ShipmentStatusVO(SHIPMENT_STATUS.CONFIRMED);
  }
  static delivered(): ShipmentStatusVO {
    return new ShipmentStatusVO(SHIPMENT_STATUS.DELIVERED);
  }
  static cancelled(): ShipmentStatusVO {
    return new ShipmentStatusVO(SHIPMENT_STATUS.CANCELLED);
  }

  // ─── Predicates ───────────────────────────
  isPending(): boolean {
    return this.value === SHIPMENT_STATUS.PENDING;
  }
  isConfirmed(): boolean {
    return this.value === SHIPMENT_STATUS.CONFIRMED;
  }
  isProcessing(): boolean {
    return this.value === SHIPMENT_STATUS.PROCESSING;
  }
  isPacked(): boolean {
    return this.value === SHIPMENT_STATUS.PACKED;
  }
  isPickedUp(): boolean {
    return this.value === SHIPMENT_STATUS.PICKED_UP;
  }
  isInTransit(): boolean {
    return this.value === SHIPMENT_STATUS.IN_TRANSIT;
  }
  isOutForDelivery(): boolean {
    return this.value === SHIPMENT_STATUS.OUT_FOR_DELIVERY;
  }
  isDelivered(): boolean {
    return this.value === SHIPMENT_STATUS.DELIVERED;
  }
  isFailed(): boolean {
    return this.value === SHIPMENT_STATUS.FAILED;
  }
  isReturned(): boolean {
    return this.value === SHIPMENT_STATUS.RETURNED;
  }
  isCancelled(): boolean {
    return this.value === SHIPMENT_STATUS.CANCELLED;
  }
  isOnHold(): boolean {
    return this.value === SHIPMENT_STATUS.ON_HOLD;
  }
  isDelayed(): boolean {
    return this.value === SHIPMENT_STATUS.DELAYED;
  }

  /** Final status — no further transitions allowed */
  isFinal(): boolean {
    return this.isDelivered() || this.isReturned() || this.isCancelled();
  }

  /** Can be cancelled (not delivered/returned/cancelled) */
  isCancellable(): boolean {
    return !this.isFinal();
  }

  /** In motion (picked_up → out_for_delivery) */
  isInMotion(): boolean {
    return (
      this.isPickedUp() ||
      this.isInTransit() ||
      this.isOutForDelivery()
    );
  }

  // ─── State Machine ────────────────────────
  canTransitionTo(target: string): boolean {
    const normalized = target.trim().toLowerCase() as ShipmentStatusValue;
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(normalized);
  }

  allowedTransitions(): readonly ShipmentStatusValue[] {
    return VALID_TRANSITIONS[this.value] ?? [];
  }
}
