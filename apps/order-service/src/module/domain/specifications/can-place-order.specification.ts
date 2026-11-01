/**
 * CanPlaceOrderSpecification
 * @module order-service/domain/specifications
 *
 * Checks if an order can be placed.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { OrderEntity } from '../entities/order.entity.js';
import { ORDER_LIMIT } from '@vubon/shared-constants/business/order';

export interface PlaceOrderContext {
  readonly now?: string;
  readonly customerStatus?: string;
  readonly itemCount?: number;
}

export interface CanPlaceOrderCandidate {
  readonly order: OrderEntity;
  readonly ctx?: PlaceOrderContext;
}

export class CanPlaceOrderSpecification extends Specification<CanPlaceOrderCandidate> {
  isSatisfiedBy(c: CanPlaceOrderCandidate): boolean {
    const { order, ctx } = c;

    if (!order.isPending()) return false;
    if (order.items.length === 0) return false;
    if (order.total.amount < ORDER_LIMIT.MIN_AMOUNT) return false;
    if (order.total.amount > ORDER_LIMIT.MAX_AMOUNT) return false;

    if (ctx?.customerStatus === 'blocked' || ctx?.customerStatus === 'suspended') {
      return false;
    }

    return true;
  }

  explain(c: CanPlaceOrderCandidate): string | null {
    const { order, ctx } = c;

    if (!order.isPending()) {
      return `Order is not in pending status (current: "${order.status.value}")`;
    }
    if (order.items.length === 0) {
      return 'Order must have at least one item';
    }
    if (order.total.amount < ORDER_LIMIT.MIN_AMOUNT) {
      return `Order total ${order.total.amount} is below minimum ${ORDER_LIMIT.MIN_AMOUNT}`;
    }
    if (order.total.amount > ORDER_LIMIT.MAX_AMOUNT) {
      return `Order total ${order.total.amount} exceeds maximum ${ORDER_LIMIT.MAX_AMOUNT}`;
    }
    if (ctx?.customerStatus === 'blocked' || ctx?.customerStatus === 'suspended') {
      return `Customer status "${ctx.customerStatus}" is not eligible`;
    }
    return null;
  }

  static strict(): CanPlaceOrderSpecification {
    return new CanPlaceOrderSpecification();
  }
}
