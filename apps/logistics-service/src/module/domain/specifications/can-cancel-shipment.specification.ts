/**
 * CanCancelShipmentSpecification — check cancel eligibility
 * @module logistics-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { ShipmentEntity } from '../entities/shipment.entity.js';

export interface CancelContext {
  readonly cancelledBy?: string;
  readonly isAdmin?: boolean;
}

export class CanCancelShipmentSpecification extends Specification<{
  shipment: ShipmentEntity;
  ctx?: CancelContext;
}> {
  isSatisfiedBy(c: { shipment: ShipmentEntity; ctx?: CancelContext }): boolean {
    const { shipment, ctx } = c;
    if (!shipment.canBeCancelled()) return false;
    // Non-admin users cannot cancel an in-flight shipment
    if (!ctx?.isAdmin && shipment.isInFlight()) return false;
    return true;
  }

  explain(c: { shipment: ShipmentEntity; ctx?: CancelContext }): string | null {
    if (this.isSatisfiedBy(c)) return null;
    const { shipment } = c;
    if (shipment.isFinal()) return `shipment is final (${shipment.status.value})`;
    if (shipment.isInFlight()) return 'shipment is already in-flight';
    return 'shipment cannot be cancelled';
  }
}
