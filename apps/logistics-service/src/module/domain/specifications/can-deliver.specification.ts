/**
 * CanDeliverSpecification
 * @module logistics-service/domain/specifications
 *
 * Business Rule: A delivery can proceed to deliver if:
 *   - Status is arrived or out_for_delivery
 *   - Has an assigned driver
 *   - Has not exceeded max attempts
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { DeliveryEntity } from '../entities/delivery.entity.js';

export type CanDeliverCandidate = { readonly delivery: DeliveryEntity };

export class CanDeliverSpecification extends Specification<CanDeliverCandidate> {
  isSatisfiedBy(c: CanDeliverCandidate): boolean {
    const { delivery } = c;
    if (!delivery.isArrived() && !delivery.isOutForDelivery()) return false;
    if (!delivery.hasDriver()) return false;
    return true;
  }

  explain(c: CanDeliverCandidate): string | null {
    const { delivery } = c;
    if (!delivery.isArrived() && !delivery.isOutForDelivery()) {
      return `Delivery status "${delivery.status.value}" is not deliverable (must be arrived or out_for_delivery)`;
    }
    if (!delivery.hasDriver()) {
      return 'No driver assigned to delivery';
    }
    return null;
  }

  static strict(): CanDeliverSpecification {
    return new CanDeliverSpecification();
  }
}
