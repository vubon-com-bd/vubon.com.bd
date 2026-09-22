import { OrderEntity } from '../../domain/entities/order.entity';
import type { OrderResponseDTO } from '../dtos/responses/order-response.dto';

export class OrderMapper {
  static toResponse(order: OrderEntity): OrderResponseDTO {
    return {
      id: order.id.value,
      orderNumber: order.orderNumber.value,
      customerId: order.customerId.value,
      vendorId: order.vendorId?.value ?? null,
      status: order.status.value,
      channel: order.channel.value,
      source: order.source.value,
      subtotal: order.subtotal.value,
      discount: order.discount.value,
      tax: order.tax.value,
      shipping: order.shipping.value,
      total: order.total.value,
      currency: 'BDT',
      note: order.note?.value ?? null,
      paymentId: order.paymentId?.value ?? null,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  }

  static toListResponse(orders: readonly OrderEntity[]): readonly OrderResponseDTO[] {
    return orders.map((o) => OrderMapper.toResponse(o));
  }
}
