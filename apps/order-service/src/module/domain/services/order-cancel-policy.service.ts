/**
 * OrderCancelPolicyService — determine if an order can be cancelled
 * @module order-service/domain/services
 */
import { ORDER_CANCEL, ORDER_STATUS } from '@vubon/shared-constants/business/order';
import type { OrderEntity } from '../entities/order.entity.js';

export interface CancelPolicyResult {
  readonly allowed: boolean;
  readonly reason?: string;
  readonly autoApprove: boolean;
  readonly restockInventory: boolean;
  readonly requiresRefund: boolean;
}

export class OrderCancelPolicyService {
  /** Determine if an order can be cancelled. */
  static evaluate(order: OrderEntity, now: Date = new Date()): CancelPolicyResult {
    // Cannot cancel — order already final
    if (order.isFinal()) {
      return {
        allowed: false,
        reason: `Order status is "${order.status.value}" (final)`,
        autoApprove: false,
        restockInventory: false,
        requiresRefund: false,
      };
    }

    // Cannot cancel — order already shipped (unless ALLOW_AFTER_SHIPMENT)
    if (order.isShipped() && !ORDER_CANCEL.ALLOW_AFTER_SHIPMENT) {
      return {
        allowed: false,
        reason: 'Order has already been shipped',
        autoApprove: false,
        restockInventory: false,
        requiresRefund: false,
      };
    }

    // Check cancel window
    const withinWindow = this.isWithinWindow(order, now);
    if (!withinWindow) {
      return {
        allowed: false,
        reason: `Cancel window (${ORDER_CANCEL.WINDOW_HOURS}h) has expired`,
        autoApprove: false,
        restockInventory: false,
        requiresRefund: false,
      };
    }

    // Determine auto-approve + restock + refund
    const requiresRefund = order.isPaid();
    const autoApprove = ORDER_CANCEL.AUTO_APPROVE && order.isPending();
    const restockInventory = ORDER_CANCEL.RESTOCK_INVENTORY && !order.isShipped();

    return {
      allowed: true,
      autoApprove,
      restockInventory,
      requiresRefund,
    };
  }

  /** Check if an order is within the cancel window (from createdAt). */
  static isWithinWindow(order: OrderEntity, now: Date = new Date()): boolean {
    const createdMs = Date.parse(order.createdAt);
    if (Number.isNaN(createdMs)) return false;
    const windowMs = ORDER_CANCEL.WINDOW_HOURS * 60 * 60 * 1000;
    return now.getTime() - createdMs <= windowMs;
  }

  /** Remaining time in the cancel window (ms). */
  static remainingWindowMs(order: OrderEntity, now: Date = new Date()): number {
    const createdMs = Date.parse(order.createdAt);
    if (Number.isNaN(createdMs)) return 0;
    const windowMs = ORDER_CANCEL.WINDOW_HOURS * 60 * 60 * 1000;
    return Math.max(0, windowMs - (now.getTime() - createdMs));
  }

  /** Compute the refund amount for a cancelled order. */
  static calculateRefund(order: OrderEntity): number {
    if (!order.isPaid()) return 0;
    // Full refund of total
    return Math.round(order.total * 100) / 100;
  }

  /** Check if order can be cancelled by customer (vs. only by admin). */
  static canCustomerCancel(order: OrderEntity, now: Date = new Date()): boolean {
    const policy = this.evaluate(order, now);
    return policy.allowed && (order.isPending() || order.isConfirmed());
  }

  /** Statuses from which a customer may cancel. */
  static readonly CUSTOMER_CANCELLABLE_STATUSES: readonly string[] = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
  ];
}
