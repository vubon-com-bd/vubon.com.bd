/**
 * CanDeliverOrderSpecification — check if an order can be marked delivered
 * @module order-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ORDER_STATUS } from '@vubon/shared-constants/business/order';
import type { OrderEntity } from '../entities/order.entity.js';

export interface DeliverOrderContext {
  readonly requireShipped?: boolean;
  readonly requireOutForDelivery?: boolean;
  readonly requireTrackingNumber?: boolean;
}

export class CanDeliverOrderSpecification extends Specification<{
  order: OrderEntity;
  ctx?: DeliverOrderContext;
}> {
  isSatisfiedBy(candidate: { order: OrderEntity; ctx?: DeliverOrderContext }): boolean {
    const { order, ctx } = candidate;

    // Already delivered or final
    if (order.isDelivered() || order.isFinal()) return false;

    const requireShipped = ctx?.requireShipped ?? true;
    const requireOutForDelivery = ctx?.requireOutForDelivery ?? false;
    const requireTracking = ctx?.requireTrackingNumber ?? false;

    const isShippedOrBeyond =
      order.isShipped() || order.status.isOutForDelivery();

    if (requireOutForDelivery) {
      // Must be at out_for_delivery stage (or beyond — but delivered already excluded)
      if (!order.status.isOutForDelivery()) return false;
    } else if (requireShipped) {
      // Must be shipped or later (out_for_delivery counts as "shipped and beyond")
      if (!isShippedOrBeyond) return false;
    }

    // Tracking number check
    if (requireTracking && !order.trackingNumber) return false;

    return true;
  }

  explain(candidate: { order: OrderEntity; ctx?: DeliverOrderContext }): string | null {
    if (this.isSatisfiedBy(candidate)) return null;
    const { order, ctx } = candidate;

    if (order.isDelivered()) return 'order already delivered';
    if (order.isFinal()) return `order is final ("${order.status.value}")`;

    const requireOutForDelivery = ctx?.requireOutForDelivery ?? false;
    if (requireOutForDelivery && !order.status.isOutForDelivery()) {
      return 'order must be out for delivery';
    }

    const requireShipped = ctx?.requireShipped ?? true;
    const isShippedOrBeyond =
      order.isShipped() || order.status.isOutForDelivery();
    if (requireShipped && !isShippedOrBeyond) {
      return 'order must be shipped first';
    }

    const requireTracking = ctx?.requireTrackingNumber ?? false;
    if (requireTracking && !order.trackingNumber) {
      return 'tracking number required for delivery';
    }

    return 'unknown reason';
  }

  static readonly DELIVERABLE_STATUSES: readonly string[] = [
    ORDER_STATUS.SHIPPED,
    ORDER_STATUS.OUT_FOR_DELIVERY,
  ];
}
