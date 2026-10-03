/**
 * CanReturnOrderSpecification — check if an order can be returned
 * @module order-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ORDER_RETURN } from '@vubon/shared-constants/business/order';
import type { OrderEntity } from '../entities/order.entity.js';

export interface ReturnOrderContext {
  readonly now?: Date;
  readonly windowDays?: number;
  readonly maxDaysAfterDelivery?: number;
  readonly itemIds?: readonly string[];
}

export class CanReturnOrderSpecification extends Specification<{
  order: OrderEntity;
  ctx?: ReturnOrderContext;
}> {
  isSatisfiedBy(candidate: { order: OrderEntity; ctx?: ReturnOrderContext }): boolean {
    const { order, ctx } = candidate;

    // Only delivered / completed orders can be returned
    if (!order.isDelivered() && !order.isCompleted()) return false;

    // Must be paid
    if (!order.isPaid()) return false;

    // Window check
    const now = ctx?.now ?? new Date();
    const windowDays = ctx?.windowDays ?? ORDER_RETURN.WINDOW_DAYS;
    const maxDays = ctx?.maxDaysAfterDelivery ?? ORDER_RETURN.MAX_DAYS_AFTER_DELIVERY;
    const deliveredAt = order.deliveredAt ?? order.completedAt;
    if (!deliveredAt) return false;
    const deliveredMs = Date.parse(deliveredAt);
    if (Number.isNaN(deliveredMs)) return false;
    const elapsedDays = (now.getTime() - deliveredMs) / (1000 * 60 * 60 * 24);
    if (elapsedDays > windowDays) return false;
    if (elapsedDays > maxDays) return false;

    // At least one returnable item
    const returnable = this.getReturnableItems(order);
    if (returnable.length === 0) return false;

    // If specific itemIds given, all must be returnable
    if (ctx?.itemIds && ctx.itemIds.length > 0) {
      const returnableIds = new Set(returnable.map((i) => i.id));
      return ctx.itemIds.every((id) => returnableIds.has(id));
    }

    return true;
  }

  explain(candidate: { order: OrderEntity; ctx?: ReturnOrderContext }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { order, ctx } = candidate;

    if (!order.isDelivered() && !order.isCompleted()) {
      return `order status "${order.status.value}" is not eligible for return`;
    }
    if (!order.isPaid()) return 'order is not paid';

    const deliveredAt = order.deliveredAt ?? order.completedAt;
    if (!deliveredAt) return 'order has no deliveredAt timestamp';

    const now = ctx?.now ?? new Date();
    const windowDays = ctx?.windowDays ?? ORDER_RETURN.WINDOW_DAYS;
    const elapsedDays =
      (now.getTime() - Date.parse(deliveredAt)) / (1000 * 60 * 60 * 24);
    if (elapsedDays > windowDays) return `return window (${windowDays}d) expired`;

    if (this.getReturnableItems(order).length === 0) {
      return 'no returnable items in order';
    }
    return 'unknown reason';
  }

  getReturnableItems(order: OrderEntity) {
    return order.items.filter(
      (i) => i.isDelivered() || i.isShipped(),
    );
  }

  static remainingMs(order: OrderEntity, now: Date = new Date()): number {
    const deliveredAt = order.deliveredAt ?? order.completedAt;
    if (!deliveredAt) return 0;
    const deliveredMs = Date.parse(deliveredAt);
    if (Number.isNaN(deliveredMs)) return 0;
    const windowMs = ORDER_RETURN.WINDOW_DAYS * 24 * 60 * 60 * 1000;
    return Math.max(0, windowMs - (now.getTime() - deliveredMs));
  }
}
