/**
 * CanCancelOrderSpecification — check if an order can be cancelled
 * @module order-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import {
  ORDER_CANCEL,
  ORDER_STATUS,
} from '@vubon/shared-constants/business/order';
import type { OrderEntity } from '../entities/order.entity.js';

export interface CancelOrderContext {
  readonly now?: Date;
  readonly windowHours?: number;
  readonly allowAfterShipment?: boolean;
  readonly actor?: 'customer' | 'admin' | 'system';
}

export class CanCancelOrderSpecification extends Specification<{
  order: OrderEntity;
  ctx?: CancelOrderContext;
}> {
  isSatisfiedBy(candidate: { order: OrderEntity; ctx?: CancelOrderContext }): boolean {
    const { order, ctx } = candidate;

    // Already final — cannot cancel
    if (order.isFinal()) return false;

    // Shipped / Out for delivery — only admin can cancel (unless allowAfterShipment)
    const allowAfterShipment = ctx?.allowAfterShipment ?? ORDER_CANCEL.ALLOW_AFTER_SHIPMENT;
    if (order.isShipped() && !allowAfterShipment) {
      if (ctx?.actor !== 'admin') return false;
    }
    if (order.status.isOutForDelivery()) return false;

    // Window check
    const now = ctx?.now ?? new Date();
    const windowHours = ctx?.windowHours ?? ORDER_CANCEL.WINDOW_HOURS;
    const createdMs = Date.parse(order.createdAt);
    if (Number.isNaN(createdMs)) return false;
    const elapsedMs = now.getTime() - createdMs;
    if (elapsedMs > windowHours * 60 * 60 * 1000) {
      if (ctx?.actor !== 'admin') return false;
    }

    return true;
  }

  explain(candidate: { order: OrderEntity; ctx?: CancelOrderContext }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { order, ctx } = candidate;

    if (order.isFinal()) return `order is final ("${order.status.value}")`;
    if (order.status.isOutForDelivery()) return 'order is out for delivery';
    if (order.isShipped()) return 'order has already shipped';

    const now = ctx?.now ?? new Date();
    const windowHours = ctx?.windowHours ?? ORDER_CANCEL.WINDOW_HOURS;
    const elapsedMs = now.getTime() - Date.parse(order.createdAt);
    if (elapsedMs > windowHours * 60 * 60 * 1000) {
      return `cancel window (${windowHours}h) expired`;
    }

    return 'unknown reason';
  }

  /** Remaining time in the cancel window (ms). */
  static remainingMs(order: OrderEntity, now: Date = new Date()): number {
    const createdMs = Date.parse(order.createdAt);
    if (Number.isNaN(createdMs)) return 0;
    const windowMs = ORDER_CANCEL.WINDOW_HOURS * 60 * 60 * 1000;
    return Math.max(0, windowMs - (now.getTime() - createdMs));
  }

  static readonly CANCELLABLE_STATUSES: readonly string[] = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.PACKED,
    ORDER_STATUS.ON_HOLD,
  ];
}
