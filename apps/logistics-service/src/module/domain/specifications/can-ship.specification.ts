/**
 * CanShipSpecification
 * @module logistics-service/domain/specifications
 *
 * Business Rule: A shipment is "shippable" if:
 *   - Status is pending or confirmed (not yet in processing)
 *   - Has at least 1 item
 *   - Total weight within limit
 *   - Has valid shipping address
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import type { ShipmentEntity } from '../entities/shipment.entity.js';

export interface CanShipContext {
  readonly requestedItemCount?: number;
  readonly requestedWeightKg?: number;
}

export type CanShipCandidate = {
  readonly shipment: ShipmentEntity;
  readonly ctx?: CanShipContext;
};

export class CanShipSpecification extends Specification<CanShipCandidate> {
  isSatisfiedBy(c: CanShipCandidate): boolean {
    const { shipment, ctx } = c;

    // Must be pending or confirmed
    if (!shipment.isPending() && !shipment.isConfirmed()) {
      return false;
    }

    // Must have items
    if (shipment.itemCount < 1) {
      return false;
    }

    // Requested item count (if provided)
    if (
      ctx?.requestedItemCount !== undefined &&
      ctx.requestedItemCount > SHIPMENT.MAX_ITEMS_PER_SHIPMENT
    ) {
      return false;
    }

    // Weight within limit
    const weight = ctx?.requestedWeightKg ?? shipment.totalWeightKg ?? 0;
    if (weight > SHIPMENT.MAX_WEIGHT_KG) {
      return false;
    }

    // Shipping address present
    if (!shipment.shippingAddress || shipment.shippingAddress.trim().length === 0) {
      return false;
    }

    return true;
  }

  explain(c: CanShipCandidate): string | null {
    const { shipment, ctx } = c;

    if (!shipment.isPending() && !shipment.isConfirmed()) {
      return `Shipment status "${shipment.status.value}" is not shippable (must be pending or confirmed)`;
    }
    if (shipment.itemCount < 1) {
      return 'Shipment must have at least 1 item';
    }
    if (
      ctx?.requestedItemCount !== undefined &&
      ctx.requestedItemCount > SHIPMENT.MAX_ITEMS_PER_SHIPMENT
    ) {
      return `Requested item count ${ctx.requestedItemCount} exceeds max ${SHIPMENT.MAX_ITEMS_PER_SHIPMENT}`;
    }
    const weight = ctx?.requestedWeightKg ?? shipment.totalWeightKg ?? 0;
    if (weight > SHIPMENT.MAX_WEIGHT_KG) {
      return `Weight ${weight}kg exceeds max ${SHIPMENT.MAX_WEIGHT_KG}kg`;
    }
    if (!shipment.shippingAddress || shipment.shippingAddress.trim().length === 0) {
      return 'Shipping address is missing';
    }
    return null;
  }

  static strict(): CanShipSpecification {
    return new CanShipSpecification();
  }
}
