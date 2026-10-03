/**
 * OrderSnapshotService — generate immutable snapshots for event sourcing
 * @module order-service/domain/services
 *
 * Snapshots capture full order state at a point in time, used for:
 *  - Event sourcing checkpoints
 *  - Audit trail
 *  - Historical reporting
 */
import type { OrderEntity } from '../entities/order.entity.js';
import type { OrderItemEntity } from '../entities/order-item.entity.js';
import { OrderVO } from '../value-objects/composites/order.vo.js';
import { OrderItemVO } from '../value-objects/composites/order-item.vo.js';
import { OrderSnapshotVO } from '../value-objects/composites/order-snapshot.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';

export interface SnapshotOptions {
  readonly reason: string;
  readonly takenBy?: string;
  readonly now?: string;
}

export class OrderSnapshotService {
  /** Create a snapshot of the order in its current state. */
  static create(order: OrderEntity, options: SnapshotOptions): OrderSnapshotVO {
    const takenAt = options.now ?? new Date().toISOString();

    const itemVOs = order.items.map((item) => this.buildItemVO(item));

    const orderVO = OrderVO.create({
      id: OrderIdVO.reconstitute(order.id),
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      vendorIds: order.vendorIds,
      type: order.type,
      status: order.status,
      priority: order.priority,
      items: itemVOs,
      subtotal: order.subtotal,
      discountAmount: order.discountAmount,
      taxAmount: order.taxAmount,
      shippingAmount: order.shippingAmount,
      total: order.total,
      currency: order.currency,
      paymentId: order.paymentId,
      notes: order.notes?.value,
      customerNotes: order.customerNotes?.value,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    });

    return OrderSnapshotVO.create({
      order: orderVO,
      version: order.version,
      takenAt,
      reason: options.reason,
      takenBy: options.takenBy,
    });
  }

  /** Compare two snapshots — which fields changed. */
  static diff(
    before: OrderSnapshotVO,
    after: OrderSnapshotVO,
  ): readonly string[] {
    const changed: string[] = [];
    if (before.status !== after.status) changed.push('status');
    if (before.total !== after.total) changed.push('total');
    if (before.itemCount !== after.itemCount) changed.push('itemCount');
    if (before.version !== after.version) changed.push('version');
    return changed;
  }

  /** Check if two snapshots are identical. */
  static isIdentical(a: OrderSnapshotVO, b: OrderSnapshotVO): boolean {
    return (
      a.status === b.status &&
      a.total === b.total &&
      a.itemCount === b.itemCount &&
      a.version === b.version
    );
  }

  /** Build a snapshot-friendly item VO from an entity. */
  private static buildItemVO(item: OrderItemEntity): OrderItemVO {
    return OrderItemVO.create({
      id: item.toIdVO,
      productId: item.productId,
      variantId: item.variantId,
      vendorId: item.vendorId,
      sku: item.sku,
      name: item.name,
      imageUrl: item.imageUrl,
      type: item.type,
      status: item.status,
      quantity: item.quantity,
      price: item.price,
      discountAmount: item.discountAmount,
      taxAmount: item.taxAmount,
      shippingAmount: item.shippingAmount,
      attributes: item.attributes,
      notes: item.notes,
    });
  }
}
