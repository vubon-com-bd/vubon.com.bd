/**
 * CanCancelOrderSpecification
 * @module order-service/domain/specifications
 *
 * Checks if an order can be cancelled.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { OrderEntity } from '../entities/order.entity.js';
import { ORDER_CANCEL } from '@vubon/shared-constants/business/order';

export interface CancelOrderContext {
  readonly reason?: string;
  readonly requestedBy?: string;
  readonly requestedAt?: string;
}

export interface CanCancelOrderCandidate {
  readonly order: OrderEntity;
  readonly ctx?: CancelOrderContext;
}

export class CanCancelOrderSpecification extends Specification<CanCancelOrderCandidate> {
  isSatisfiedBy(c: CanCancelOrderCandidate): boolean {
    const { order, ctx } = c;

    if (order.isTerminal()) return false;
    if (!order.isCancellable()) return false;

    if (order.isShipped() && !ORDER_CANCEL.ALLOW_AFTER_SHIPMENT) return false;

    // Check cancel window
    if (ctx?.requestedAt) {
      const createdAt = new Date(order.createdAt).getTime();
      const requestedAt = new Date(ctx.requestedAt).getTime();
      const elapsedHours = (requestedAt - createdAt) / (1000 * 60 * 60);
      if (elapsedHours > ORDER_CANCEL.WINDOW_HOURS) return false;
    }

    return true;
  }

  explain(c: CanCancelOrderCandidate): string | null {
    const { order, ctx } = c;

    if (order.isTerminal()) {
      return `Order is already in terminal status "${order.status.value}"`;
    }
    if (!order.isCancellable()) {
      return `Order status "${order.status.value}" is not cancellable`;
    }
    if (order.isShipped() && !ORDER_CANCEL.ALLOW_AFTER_SHIPMENT) {
      return 'Order cannot be cancelled after shipment';
    }
    if (ctx?.requestedAt) {
      const createdAt = new Date(order.createdAt).getTime();
      const requestedAt = new Date(ctx.requestedAt).getTime();
      const elapsedHours = (requestedAt - createdAt) / (1000 * 60 * 60);
      if (elapsedHours > ORDER_CANCEL.WINDOW_HOURS) {
        return `Cancel window of ${ORDER_CANCEL.WINDOW_HOURS}h has expired`;
      }
    }
    return null;
  }

  static strict(): CanCancelOrderSpecification {
    return new CanCancelOrderSpecification();
  }
}
