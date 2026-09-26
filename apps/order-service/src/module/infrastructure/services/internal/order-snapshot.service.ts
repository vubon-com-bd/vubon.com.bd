import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../../domain/entities/order.entity';
import { OrderItemEntity } from '../../../domain/entities/order-item.entity';
import { OrderSnapshotVO } from '../../../domain/value-objects/composites/order-snapshot.vo';
import { OrderVO } from '../../../domain/value-objects/composites/order.vo';
import { OrderItemVO } from '../../../domain/value-objects/composites/order-item.vo';
import { OrderTotalBreakdownVO } from '../../../domain/value-objects/composites/order-total-breakdown.vo';

@Injectable()
export class OrderSnapshotService {
  build(order: OrderEntity, items: readonly OrderItemEntity[]): OrderSnapshotVO {
    const orderVO = OrderVO.create({
      id: order.id,
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      vendorId: order.vendorId,
      status: order.status,
      total: OrderTotalBreakdownVO.create({
        subtotal: order.subtotal,
        discount: order.discount,
        tax: order.tax,
        shipping: order.shipping,
        total: order.total,
      }),
      createdAt: new Date(order.createdAt),
      updatedAt: new Date(order.updatedAt),
    });

    const itemVOs = items.map((i) =>
      OrderItemVO.create({
        id: i.id,
        productId: i.productId,
        variantId: i.variantId,
        productName: i.productName,
        quantity: i.quantity,
        priceAtPurchase: i.priceAtPurchase,
        status: i.status,
      }),
    );

    return OrderSnapshotVO.create({
      order: orderVO,
      items: itemVOs,
      capturedAt: new Date(),
    });
  }
}
