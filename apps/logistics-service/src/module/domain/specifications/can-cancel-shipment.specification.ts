/**
 * CanCancelShipmentSpecification
 * @module logistics-service/domain/specifications
 *
 * Business Rule: A shipment can be cancelled if:
 *   - Status is NOT final (delivered, returned, cancelled)
 *   - Status is NOT already in motion (picked_up, in_transit, out_for_delivery)
 *     — i.e., only pending, confirmed, processing, packed, on_hold
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { ShipmentEntity } from '../entities/shipment.entity.js';

export interface CanCancelContext {
  readonly reason?: string;
  readonly requestedBy?: string;
}

export type CanCancelCandidate = {
  readonly shipment: ShipmentEntity;
  readonly ctx?: CanCancelContext;
};

export class CanCancelShipmentSpecification extends Specification<CanCancelCandidate> {
  isSatisfiedBy(c: CanCancelCandidate): boolean {
    const { shipment } = c;

    // Final status cannot be cancelled
    if (shipment.isFinal()) {
      return false;
    }

    // Already in motion cannot be cancelled (must use return flow)
    if (
      shipment.isPickedUp() ||
      shipment.isInTransit() ||
      shipment.isOutForDelivery()
    ) {
      return false;
    }

    return shipment.canBeCancelled();
  }

  explain(c: CanCancelCandidate): string | null {
    const { shipment } = c;

    if (shipment.isDelivered()) {
      return 'Shipment is already delivered';
    }
    if (shipment.isReturned()) {
      return 'Shipment is already returned';
    }
    if (shipment.isCancelled()) {
      return 'Shipment is already cancelled';
    }
    if (shipment.isPickedUp()) {
      return 'Shipment is already picked up — use return flow instead';
    }
    if (shipment.isInTransit()) {
      return 'Shipment is in transit — use return flow instead';
    }
    if (shipment.isOutForDelivery()) {
      return 'Shipment is out for delivery — use return flow instead';
    }
    return null;
  }

  static strict(): CanCancelShipmentSpecification {
    return new CanCancelShipmentSpecification();
  }
}
