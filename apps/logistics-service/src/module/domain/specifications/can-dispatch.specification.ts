/**
 * CanDispatchSpecification
 * @module logistics-service/domain/specifications
 *
 * Business Rule: A fulfillment can be dispatched if:
 *   - Status is ready_to_ship
 *   - Has items
 *   - Has warehouse assigned
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { FulfillmentEntity } from '../entities/fulfillment.entity.js';

export type CanDispatchCandidate = { readonly fulfillment: FulfillmentEntity };

export class CanDispatchSpecification extends Specification<CanDispatchCandidate> {
  isSatisfiedBy(c: CanDispatchCandidate): boolean {
    const { fulfillment } = c;
    if (!fulfillment.isReadyToShip()) return false;
    if (fulfillment.itemIds.length === 0) return false;
    if (!fulfillment.warehouseId) return false;
    return true;
  }

  explain(c: CanDispatchCandidate): string | null {
    const { fulfillment } = c;
    if (!fulfillment.isReadyToShip()) {
      return `Fulfillment status "${fulfillment.status.value}" is not ready_to_ship`;
    }
    if (fulfillment.itemIds.length === 0) {
      return 'Fulfillment has no items';
    }
    if (!fulfillment.warehouseId) {
      return 'No warehouse assigned';
    }
    return null;
  }

  static strict(): CanDispatchSpecification {
    return new CanDispatchSpecification();
  }
}
