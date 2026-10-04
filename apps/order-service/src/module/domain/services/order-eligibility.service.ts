/**
 * OrderEligibilityService — check order-level eligibility for actions
 * @module order-service/domain/services
 */
import { ORDER_LIMIT } from '@vubon/shared-constants/business/order';
import type { OrderEntity } from '../entities/order.entity.js';

export interface EligibilityCheck {
  readonly eligible: boolean;
  readonly reason?: string;
}

export class OrderEligibilityService {
  /** Check if an order can be placed (post-validation). */
  static canPlaceOrder(order: OrderEntity): EligibilityCheck {
    if (order.isEmpty) {
      return { eligible: false, reason: 'Order has no items' };
    }
    if (order.items.length > ORDER_LIMIT.MAX_ITEMS) {
      return {
        eligible: false,
        reason: `Order exceeds max items (${ORDER_LIMIT.MAX_ITEMS})`,
      };
    }
    if (order.total <= 0) {
      return { eligible: false, reason: 'Order total must be positive' };
    }
    if (order.total < ORDER_LIMIT.MIN_AMOUNT) {
      return {
        eligible: false,
        reason: `Order total is below minimum (${ORDER_LIMIT.MIN_AMOUNT})`,
      };
    }
    if (order.total > ORDER_LIMIT.MAX_AMOUNT) {
      return {
        eligible: false,
        reason: `Order total exceeds maximum (${ORDER_LIMIT.MAX_AMOUNT})`,
      };
    }
    return { eligible: true };
  }

  /** Check if an order can be modified (add/remove items). */
  static canModify(order: OrderEntity): EligibilityCheck {
    if (!order.canBeModified()) {
      return {
        eligible: false,
        reason: `Order in status "${order.status.value}" cannot be modified`,
      };
    }
    return { eligible: true };
  }

  /** Check if an order can be paid. */
  static canPay(order: OrderEntity): EligibilityCheck {
    if (order.isPaid()) {
      return { eligible: false, reason: 'Order is already paid' };
    }
    if (order.isFinal()) {
      return { eligible: false, reason: `Order is final ("${order.status.value}")` };
    }
    if (!order.isPending() && !order.isConfirmed()) {
      return {
        eligible: false,
        reason: `Order in status "${order.status.value}" is not payable`,
      };
    }
    return { eligible: true };
  }

  /** Check if an order can be shipped. */
  static canShip(order: OrderEntity): EligibilityCheck {
    if (!order.canBeShipped()) {
      return {
        eligible: false,
        reason: `Order in status "${order.status.value}" cannot be shipped`,
      };
    }
    if (!order.isPaid()) {
      return { eligible: false, reason: 'Order is not paid' };
    }
    return { eligible: true };
  }

  /** Check if an order can be delivered. */
  static canDeliver(order: OrderEntity): EligibilityCheck {
    if (!order.canBeDelivered()) {
      return {
        eligible: false,
        reason: `Order in status "${order.status.value}" cannot be delivered`,
      };
    }
    return { eligible: true };
  }

  /** Check if an order can be cancelled. */
  static canCancel(order: OrderEntity): EligibilityCheck {
    if (!order.canBeCancelled()) {
      return {
        eligible: false,
        reason: `Order in status "${order.status.value}" cannot be cancelled`,
      };
    }
    return { eligible: true };
  }

  /** Check if an order can be returned. */
  static canReturn(order: OrderEntity): EligibilityCheck {
    if (!order.canBeReturned()) {
      return {
        eligible: false,
        reason: `Order in status "${order.status.value}" cannot be returned`,
      };
    }
    return { eligible: true };
  }

  /** Check if an order can be refunded. */
  static canRefund(order: OrderEntity): EligibilityCheck {
    if (!order.canBeRefunded()) {
      return {
        eligible: false,
        reason: `Order in status "${order.status.value}" cannot be refunded`,
      };
    }
    if (!order.isPaid()) {
      return { eligible: false, reason: 'Order is not paid' };
    }
    return { eligible: true };
  }

  /** Check if an order can be completed. */
  static canComplete(order: OrderEntity): EligibilityCheck {
    if (!order.isDelivered()) {
      return {
        eligible: false,
        reason: `Order must be delivered before completing (current: "${order.status.value}")`,
      };
    }
    return { eligible: true };
  }

  /** Check if an order is over the max amount. */
  static isOverLimit(order: OrderEntity): boolean {
    return order.total > ORDER_LIMIT.MAX_AMOUNT;
  }

  /** Check if an order has too many items. */
  static hasTooManyItems(order: OrderEntity): boolean {
    return order.items.length > ORDER_LIMIT.MAX_ITEMS;
  }
}
