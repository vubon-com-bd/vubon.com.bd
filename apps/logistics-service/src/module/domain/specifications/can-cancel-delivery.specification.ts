/**
 * CanCancelDeliverySpecification
 * @module logistics-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { DeliveryEntity } from '../entities/delivery.entity.js';

export class CanCancelDeliverySpecification extends Specification<{
  delivery: DeliveryEntity;
}> {
  isSatisfiedBy(c: { delivery: DeliveryEntity }): boolean {
    const { delivery } = c;
    if (delivery.isFinal()) return false;
    if (delivery.isDelivered()) return false;
    if (delivery.isOutForDelivery()) return false;
    return delivery.canBeCancelled();
  }

  explain(c: { delivery: DeliveryEntity }): string | null {
    if (this.isSatisfiedBy(c)) return null;
    const { delivery } = c;
    if (delivery.isDelivered()) return 'delivery already delivered';
    if (delivery.isFinal()) return `delivery is final (${delivery.status.value})`;
    if (delivery.isOutForDelivery()) return 'delivery is out for delivery — cannot cancel';
    return 'delivery cannot be cancelled';
  }
}
