/**
 * OrderReturnPolicyService — determine if an order can be returned
 * @module order-service/domain/services
 */
import { ORDER_RETURN, ORDER_STATUS } from '@vubon/shared-constants/business/order';
import type { OrderEntity } from '../entities/order.entity.js';
import type { OrderItemEntity } from '../entities/order-item.entity.js';

export interface ReturnPolicyResult {
  readonly allowed: boolean;
  readonly reason?: string;
  readonly returnableItemIds: readonly string[];
  readonly requiresInspection: boolean;
  readonly freeReturn: boolean;
  readonly restockFeePercent: number;
}

export class OrderReturnPolicyService {
  /** Evaluate whether an order can be returned. */
  static evaluate(order: OrderEntity, now: Date = new Date()): ReturnPolicyResult {
    // Must be delivered or completed
    if (!order.isDelivered() && !order.isCompleted()) {
      return {
        allowed: false,
        reason: `Order status "${order.status.value}" is not eligible for return`,
        returnableItemIds: [],
        requiresInspection: false,
        freeReturn: ORDER_RETURN.FREE_RETURN,
        restockFeePercent: 0,
      };
    }

    // Check return window
    if (!this.isWithinWindow(order, now)) {
      return {
        allowed: false,
        reason: `Return window (${ORDER_RETURN.WINDOW_DAYS}d) has expired`,
        returnableItemIds: [],
        requiresInspection: false,
        freeReturn: ORDER_RETURN.FREE_RETURN,
        restockFeePercent: 0,
      };
    }

    // Compute returnable items
    const returnableItems = this.getReturnableItems(order);

    return {
      allowed: returnableItems.length > 0,
      reason:
        returnableItems.length === 0
          ? 'No items in order are eligible for return'
          : undefined,
      returnableItemIds: returnableItems.map((i) => i.id),
      requiresInspection: true,
      freeReturn: ORDER_RETURN.FREE_RETURN,
      restockFeePercent: ORDER_RETURN.RESTOCK_FEE_PERCENT,
    };
  }

  /** Return items eligible for return. */
  static getReturnableItems(order: OrderEntity): readonly OrderItemEntity[] {
    return order.items.filter(
      (item) => item.isDelivered() || item.isShipped(),
    );
  }

  /** Check if the order is within the return window. */
  static isWithinWindow(order: OrderEntity, now: Date = new Date()): boolean {
    const deliveredAt = order.deliveredAt ?? order.completedAt;
    if (!deliveredAt) return false;
    const deliveredMs = Date.parse(deliveredAt);
    if (Number.isNaN(deliveredMs)) return false;
    const windowMs = ORDER_RETURN.WINDOW_DAYS * 24 * 60 * 60 * 1000;
    return now.getTime() - deliveredMs <= windowMs;
  }

  /** Remaining return window (ms). */
  static remainingWindowMs(order: OrderEntity, now: Date = new Date()): number {
    const deliveredAt = order.deliveredAt ?? order.completedAt;
    if (!deliveredAt) return 0;
    const deliveredMs = Date.parse(deliveredAt);
    if (Number.isNaN(deliveredMs)) return 0;
    const windowMs = ORDER_RETURN.WINDOW_DAYS * 24 * 60 * 60 * 1000;
    return Math.max(0, windowMs - (now.getTime() - deliveredMs));
  }

  /** Calculate restock fee for a return amount. */
  static calculateRestockFee(refundAmount: number): number {
    if (ORDER_RETURN.FREE_RETURN || ORDER_RETURN.RESTOCK_FEE_PERCENT === 0) {
      return 0;
    }
    const fee = (refundAmount * ORDER_RETURN.RESTOCK_FEE_PERCENT) / 100;
    return Math.round(fee * 100) / 100;
  }

  /** Compute refund amount for returning specific items. */
  static calculateRefundAmount(
    order: OrderEntity,
    itemIds: readonly string[],
  ): number {
    const items = order.items.filter((i) => itemIds.includes(i.id));
    const total = items.reduce((sum, i) => sum + i.lineTotal, 0);
    return Math.round(total * 100) / 100;
  }

  /** Validation: max images per return. */
  static readonly MAX_IMAGES = ORDER_RETURN.MAX_IMAGES;

  /** Validation: max reason length. */
  static readonly MAX_REASON_LENGTH = ORDER_RETURN.MAX_REASON_LENGTH;

  /** Statuses from which return is allowed. */
  static readonly RETURNABLE_STATUSES: readonly string[] = [
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.COMPLETED,
  ];
}
