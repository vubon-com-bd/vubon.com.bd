/**
 * CanReturnOrderSpecification
 * @module order-service/src/module/domain/specifications
 *
 * Checks if an order can be returned.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { OrderEntity } from '../entities/order.entity.js';
import { ORDER_RETURN } from '@vubon/shared-constants/business/order';

export interface ReturnOrderContext {
  readonly reason?: string;
  readonly itemIds?: readonly string[];
  readonly requestedAt?: string;
}

export interface CanReturnOrderCandidate {
  readonly order: OrderEntity;
  readonly ctx?: ReturnOrderContext;
}

export class CanReturnOrderSpecification extends Specification<CanReturnOrderCandidate> {
  isSatisfiedBy(c: CanReturnOrderCandidate): boolean {
    const { order, ctx } = c;

    if (!order.isReturnable()) return false;
    if (!order.deliveredAt) return false;

    // Check return window
    if (ctx?.requestedAt) {
      const deliveredAt = new Date(order.deliveredAt).getTime();
      const requestedAt = new Date(ctx.requestedAt).getTime();
      const elapsedDays = (requestedAt - deliveredAt) / (1000 * 60 * 60 * 24);
      if (elapsedDays > ORDER_RETURN.MAX_DAYS_AFTER_DELIVERY) return false;
    }

    return true;
  }

  explain(c: CanReturnOrderCandidate): string | null {
    const { order, ctx } = c;

    if (!order.isReturnable()) {
      return `Order status "${order.status.value}" is not returnable`;
    }
    if (!order.deliveredAt) {
      return 'Order has no delivery timestamp';
    }
    if (ctx?.requestedAt) {
      const deliveredAt = new Date(order.deliveredAt).getTime();
      const requestedAt = new Date(ctx.requestedAt).getTime();
      const elapsedDays = (requestedAt - deliveredAt) / (1000 * 60 * 60 * 24);
      if (elapsedDays > ORDER_RETURN.MAX_DAYS_AFTER_DELIVERY) {
        return `Return window of ${ORDER_RETURN.MAX_DAYS_AFTER_DELIVERY}d has expired`;
      }
    }
    return null;
  }

  static strict(): CanReturnOrderSpecification {
    return new CanReturnOrderSpecification();
  }
}
