/**
 * CanPlaceOrderSpecification — check if an order can be placed
 * @module order-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ORDER_LIMIT } from '@vubon/shared-constants/business/order';
import type { OrderEntity } from '../entities/order.entity.js';

export interface PlaceOrderContext {
  readonly minimumAmount?: number;
  readonly maximumAmount?: number;
  readonly maxItems?: number;
  readonly allowedCurrencies?: readonly string[];
}

export class CanPlaceOrderSpecification extends Specification<{
  order: OrderEntity;
  ctx?: PlaceOrderContext;
}> {
  isSatisfiedBy(candidate: { order: OrderEntity; ctx?: PlaceOrderContext }): boolean {
    const { order, ctx } = candidate;

    if (order.isEmpty) return false;
    if (order.total <= 0) return false;

    const minAmount = ctx?.minimumAmount ?? ORDER_LIMIT.MIN_AMOUNT;
    const maxAmount = ctx?.maximumAmount ?? ORDER_LIMIT.MAX_AMOUNT;
    if (order.total < minAmount || order.total > maxAmount) return false;

    const maxItems = ctx?.maxItems ?? ORDER_LIMIT.MAX_ITEMS;
    if (order.items.length > maxItems) return false;

    if (ctx?.allowedCurrencies && !ctx.allowedCurrencies.includes(order.currency)) {
      return false;
    }

    // Every item must have positive quantity and valid price
    for (const item of order.items) {
      if (item.quantity.value <= 0) return false;
      if (item.price.amount < 0) return false;
      if (item.currency !== order.currency) return false;
    }

    return true;
  }

  explain(candidate: { order: OrderEntity; ctx?: PlaceOrderContext }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { order, ctx } = candidate;

    if (order.isEmpty) return 'order has no items';
    if (order.total <= 0) return 'order total is not positive';

    const minAmount = ctx?.minimumAmount ?? ORDER_LIMIT.MIN_AMOUNT;
    const maxAmount = ctx?.maximumAmount ?? ORDER_LIMIT.MAX_AMOUNT;
    if (order.total < minAmount) return `total below minimum ${minAmount}`;
    if (order.total > maxAmount) return `total above maximum ${maxAmount}`;

    const maxItems = ctx?.maxItems ?? ORDER_LIMIT.MAX_ITEMS;
    if (order.items.length > maxItems) return `items exceed maximum ${maxItems}`;

    if (ctx?.allowedCurrencies && !ctx.allowedCurrencies.includes(order.currency)) {
      return `currency "${order.currency}" not allowed`;
    }

    return 'unknown reason';
  }
}
