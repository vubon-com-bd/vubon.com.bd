/**
 * OrderSnapshotService
 * @module order-service/domain/services
 *
 * Pure domain service — creates immutable snapshots of order state
 * for auditing, replay, and archival.
 */
import { OrderEntity } from '../entities/order.entity.js';
import { OrderSnapshotVO } from '../value-objects/composites/order-snapshot.vo.js';

export interface SnapshotOptions {
  readonly includeBillingAddress?: boolean;
  readonly now?: string;
}

export class OrderSnapshotService {
  /**
   * Build an OrderSnapshotVO from an OrderEntity.
   */
  static capture(
    order: OrderEntity,
    options: SnapshotOptions = {},
  ): OrderSnapshotVO {
    const now = options.now ?? new Date().toISOString();
    const includeBilling = options.includeBillingAddress ?? true;

    return OrderSnapshotVO.create({
      order: order.vo,
      items: order.items,
      shippingAddress: order.shippingAddress,
      billingAddress: includeBilling ? order.billingAddress : undefined,
      snapshotAt: now,
    });
  }

  /**
   * Serialize snapshot to plain JSON object (for archival / DB persistence).
   */
  static toJSON(snapshot: OrderSnapshotVO): Readonly<Record<string, unknown>> {
    return {
      order: {
        id: snapshot.order.id.value,
        orderNumber: snapshot.order.orderNumber.value,
        customerId: snapshot.order.customerId.value,
        status: snapshot.order.status.value,
        channel: snapshot.order.channel.value,
        source: snapshot.order.source.value,
        subtotal: {
          amount: snapshot.order.subtotal.amount,
          currency: snapshot.order.subtotal.currency,
        },
        discount: {
          amount: snapshot.order.discount.amount,
          currency: snapshot.order.discount.currency,
          code: snapshot.order.discount.code,
        },
        tax: {
          amount: snapshot.order.tax.amount,
          currency: snapshot.order.tax.currency,
          rate: snapshot.order.tax.rate,
        },
        shipping: {
          amount: snapshot.order.shipping.amount,
          currency: snapshot.order.shipping.currency,
          method: snapshot.order.shipping.method,
        },
        total: {
          amount: snapshot.order.total.amount,
          currency: snapshot.order.total.currency,
        },
        note: snapshot.order.note?.value,
      },
      items: snapshot.items.map((item) => ({
        id: item.id.value,
        productId: item.productId.value,
        variantId: item.variantId?.value,
        vendorId: item.vendorId?.value,
        name: item.name,
        sku: item.sku,
        quantity: item.quantity.value,
        unitPrice: {
          amount: item.unitPrice.amount,
          currency: item.unitPrice.currency,
        },
        status: item.status.value,
        lineTotal: item.lineTotal.amount,
      })),
      shippingAddress: {
        id: snapshot.shippingAddress.id.value,
        recipientName: snapshot.shippingAddress.recipientName,
        phone: snapshot.shippingAddress.phone,
        line1: snapshot.shippingAddress.line1,
        line2: snapshot.shippingAddress.line2,
        city: snapshot.shippingAddress.city,
        district: snapshot.shippingAddress.district,
        division: snapshot.shippingAddress.division,
        postalCode: snapshot.shippingAddress.postalCode,
        country: snapshot.shippingAddress.country,
        oneLine: snapshot.shippingAddress.oneLine,
      },
      billingAddress: snapshot.billingAddress
        ? {
            id: snapshot.billingAddress.id.value,
            recipientName: snapshot.billingAddress.recipientName,
            phone: snapshot.billingAddress.phone,
            line1: snapshot.billingAddress.line1,
            city: snapshot.billingAddress.city,
            country: snapshot.billingAddress.country,
          }
        : undefined,
      snapshotAt: snapshot.snapshotAt,
    };
  }

  /**
   * Verify that two snapshots represent the same order state.
   */
  static isEquivalent(a: OrderSnapshotVO, b: OrderSnapshotVO): boolean {
    const aJson = JSON.stringify(this.toJSON(a));
    const bJson = JSON.stringify(this.toJSON(b));
    return aJson === bJson;
  }
}
