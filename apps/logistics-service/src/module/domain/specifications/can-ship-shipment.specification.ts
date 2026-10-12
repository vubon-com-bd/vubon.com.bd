/**
 * CanShipShipmentSpecification — checks whether a shipment can leave the warehouse
 * @module logistics-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { ShipmentEntity } from '../entities/shipment.entity.js';

export interface ShipContext {
  readonly requireCourier?: boolean;
  readonly requireWarehouse?: boolean;
  readonly requireLabel?: boolean;
  readonly requirePayment?: boolean;
}

export class CanShipShipmentSpecification extends Specification<{
  shipment: ShipmentEntity;
  ctx?: ShipContext;
}> {
  isSatisfiedBy(c: { shipment: ShipmentEntity; ctx?: ShipContext }): boolean {
    const { shipment, ctx } = c;
    if (shipment.isFinal()) return false;
    if (shipment.isInFlight()) return false;
    if (!shipment.isPacked()) return false;
    const requireCourier = ctx?.requireCourier ?? true;
    const requireWarehouse = ctx?.requireWarehouse ?? true;
    const requireLabel = ctx?.requireLabel ?? true;
    if (requireCourier && !shipment.hasCourier()) return false;
    if (requireWarehouse && !shipment.hasWarehouse()) return false;
    if (requireLabel && !shipment.hasLabel()) return false;
    return true;
  }

  explain(c: { shipment: ShipmentEntity; ctx?: ShipContext }): string | null {
    if (this.isSatisfiedBy(c)) return null;
    const { shipment, ctx } = c;
    if (shipment.isFinal()) return `shipment is final (${shipment.status.value})`;
    if (shipment.isInFlight()) return 'shipment already in-flight';
    if (!shipment.isPacked()) return 'shipment must be packed first';
    const requireCourier = ctx?.requireCourier ?? true;
    if (requireCourier && !shipment.hasCourier()) return 'no courier assigned';
    const requireWarehouse = ctx?.requireWarehouse ?? true;
    if (requireWarehouse && !shipment.hasWarehouse()) return 'no warehouse assigned';
    const requireLabel = ctx?.requireLabel ?? true;
    if (requireLabel && !shipment.hasLabel()) return 'no shipping label generated';
    return 'unknown reason';
  }
}
