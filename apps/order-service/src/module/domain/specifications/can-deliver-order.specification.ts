/**
 * CanDeliverOrderSpecification
 * @module order-service/domain/specifications
 *
 * Checks if an order can be marked as delivered.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { OrderEntity } from '../entities/order.entity.js';

export interface DeliverOrderContext {
  readonly deliveredAt?: string;
  readonly signature?: string;
  readonly receivedBy?: string;
}

export interface CanDeliverOrderCandidate {
  readonly order: OrderEntity;
  readonly ctx?: DeliverOrderContext;
}

export class CanDeliverOrderSpecification extends Specification<CanDeliverOrderCandidate> {
  isSatisfiedBy(c: CanDeliverOrderCandidate): boolean {
    const { order } = c;

    if (!order.isShipped()) return false;
    if (order.isTerminal()) return false;
    if (!order.shippedAt) return false;
    return true;
  }

  explain(c: CanDeliverOrderCandidate): string | null {
    const { order } = c;

    if (!order.isShipped()) {
      return `Order must be shipped before delivery (current: "${order.status.value}")`;
    }
    if (order.isTerminal()) {
      return `Order is in terminal status "${order.status.value}"`;
    }
    if (!order.shippedAt) {
      return 'Order has no ship timestamp';
    }
    return null;
  }

  static strict(): CanDeliverOrderSpecification {
    return new CanDeliverOrderSpecification();
  }
}
