/**
 * CanRefundOrderSpecification
 * @module order-service/src/module/domain/specifications
 *
 * Checks if an order can be refunded.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { OrderEntity } from '../entities/order.entity.js';

export interface RefundOrderContext {
  readonly amount?: number;
  readonly refundedAt?: string;
  readonly reason?: string;
}

export interface CanRefundOrderCandidate {
  readonly order: OrderEntity;
  readonly ctx?: RefundOrderContext;
}

export class CanRefundOrderSpecification extends Specification<CanRefundOrderCandidate> {
  isSatisfiedBy(c: CanRefundOrderCandidate): boolean {
    const { order, ctx } = c;

    // Must be cancelled, returned, or completed
    if (!order.isCancelled() && !order.isReturned() && !order.isCompleted()) {
      return false;
    }
    if (order.isRefunded()) return false;

    // Refund amount cannot exceed total
    if (ctx?.amount !== undefined) {
      if (!Number.isFinite(ctx.amount) || ctx.amount < 0) return false;
      if (ctx.amount > order.total.amount) return false;
    }
    return true;
  }

  explain(c: CanRefundOrderCandidate): string | null {
    const { order, ctx } = c;

    if (order.isRefunded()) {
      return 'Order has already been refunded';
    }
    if (!order.isCancelled() && !order.isReturned() && !order.isCompleted()) {
      return `Order status "${order.status.value}" is not eligible for refund`;
    }
    if (ctx?.amount !== undefined) {
      if (!Number.isFinite(ctx.amount) || ctx.amount < 0) {
        return 'Refund amount must be non-negative';
      }
      if (ctx.amount > order.total.amount) {
        return `Refund amount ${ctx.amount} exceeds order total ${order.total.amount}`;
      }
    }
    return null;
  }

  static strict(): CanRefundOrderSpecification {
    return new CanRefundOrderSpecification();
  }
}
