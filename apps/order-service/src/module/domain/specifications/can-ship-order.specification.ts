/**
 * CanShipOrderSpecification — check if an order can be shipped
 * @module order-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ORDER_STATUS } from '@vubon/shared-constants/business/order';
import type { OrderEntity } from '../entities/order.entity.js';

export interface ShipOrderContext {
  readonly requirePayment?: boolean;
  readonly requireProcessing?: boolean;
  readonly requirePacked?: boolean;
}

export class CanShipOrderSpecification extends Specification<{
  order: OrderEntity;
  ctx?: ShipOrderContext;
}> {
  isSatisfiedBy(candidate: { order: OrderEntity; ctx?: ShipOrderContext }): boolean {
    const { order, ctx } = candidate;

    // Must not be shipped already
    if (order.isShipped() || order.isFinal()) return false;

    // Must be processing or packed (default)
    const requireProcessing = ctx?.requireProcessing ?? false;
    const requirePacked = ctx?.requirePacked ?? true;

    if (requirePacked && !order.isPacked()) {
      if (requireProcessing && !order.isProcessing()) return false;
      if (!requireProcessing) return false;
    } else if (!requirePacked && !order.isProcessing() && !order.isPacked()) {
      return false;
    }

    // Payment check
    const requirePayment = ctx?.requirePayment ?? true;
    if (requirePayment && !order.isPaid()) return false;

    // Must have items
    if (order.isEmpty) return false;

    return true;
  }

  explain(candidate: { order: OrderEntity; ctx?: ShipOrderContext }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { order, ctx } = candidate;

    if (order.isShipped()) return 'order already shipped';
    if (order.isFinal()) return `order is final ("${order.status.value}")`;

    const requirePacked = ctx?.requirePacked ?? true;
    if (requirePacked && !order.isPacked()) {
      return 'order must be packed before shipping';
    }

    const requirePayment = ctx?.requirePayment ?? true;
    if (requirePayment && !order.isPaid()) return 'order is not paid';

    if (order.isEmpty) return 'order has no items';
    return 'unknown reason';
  }

  static readonly SHIPPABLE_STATUSES: readonly string[] = [
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.PACKED,
  ];
}
