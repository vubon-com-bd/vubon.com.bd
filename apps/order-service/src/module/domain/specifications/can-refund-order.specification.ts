/**
 * CanRefundOrderSpecification — check if an order can be refunded
 * @module order-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ORDER_STATUS } from '@vubon/shared-constants/business/order';
import type { OrderEntity } from '../entities/order.entity.js';

export interface RefundOrderContext {
  readonly allowPartial?: boolean;
  readonly minAmount?: number;
  readonly maxAmount?: number;
  readonly requirePaid?: boolean;
}

export class CanRefundOrderSpecification extends Specification<{
  order: OrderEntity;
  amount: number;
  ctx?: RefundOrderContext;
}> {
  isSatisfiedBy(candidate: {
    order: OrderEntity;
    amount: number;
    ctx?: RefundOrderContext;
  }): boolean {
    const { order, amount, ctx } = candidate;

    // Must be paid
    const requirePaid = ctx?.requirePaid ?? true;
    if (requirePaid && !order.isPaid()) return false;

    // Must be in a refundable state (cancelled, returned, or completed-then-refunded)
    const refundableStatuses: readonly string[] = [
      ORDER_STATUS.CANCELLED,
      ORDER_STATUS.RETURNED,
      ORDER_STATUS.COMPLETED,
      ORDER_STATUS.DELIVERED,
    ];
    if (!refundableStatuses.includes(order.status.value)) return false;

    // Already refunded — cannot refund again
    if (order.isRefunded()) return false;

    // Amount check
    if (amount <= 0) return false;
    if (amount > order.total) return false;

    const minAmount = ctx?.minAmount ?? 0.01;
    if (amount < minAmount) return false;

    const maxAmount = ctx?.maxAmount;
    if (maxAmount !== undefined && amount > maxAmount) return false;

    // Partial refund check
    const allowPartial = ctx?.allowPartial ?? true;
    if (!allowPartial && amount < order.total) return false;

    return true;
  }

  explain(candidate: {
    order: OrderEntity;
    amount: number;
    ctx?: RefundOrderContext;
  }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { order, amount, ctx } = candidate;

    const requirePaid = ctx?.requirePaid ?? true;
    if (requirePaid && !order.isPaid()) return 'order is not paid';
    if (order.isRefunded()) return 'order already refunded';

    const refundableStatuses: readonly string[] = [
      ORDER_STATUS.CANCELLED,
      ORDER_STATUS.RETURNED,
      ORDER_STATUS.COMPLETED,
      ORDER_STATUS.DELIVERED,
    ];
    if (!refundableStatuses.includes(order.status.value)) {
      return `order status "${order.status.value}" is not refundable`;
    }

    if (amount <= 0) return 'refund amount must be positive';
    if (amount > order.total) return `refund amount exceeds order total ${order.total}`;

    const allowPartial = ctx?.allowPartial ?? true;
    if (!allowPartial && amount < order.total) return 'partial refund not allowed';

    return 'unknown reason';
  }

  static readonly REFUNDABLE_STATUSES: readonly string[] = [
    ORDER_STATUS.CANCELLED,
    ORDER_STATUS.RETURNED,
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.DELIVERED,
  ];
}
