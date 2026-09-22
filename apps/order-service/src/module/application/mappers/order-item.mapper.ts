import { OrderItemEntity } from '../../domain/entities/order-item.entity';
import type { OrderItemResponseDTO } from '../dtos/responses/order-item-response.dto';

export class OrderItemMapper {
  static toResponse(item: OrderItemEntity, orderId: string = ''): OrderItemResponseDTO {
    return {
      id: item.id.value,
      orderId,
      productId: item.productId.value,
      variantId: item.variantId?.value ?? null,
      productName: item.productName,
      quantity: item.quantity.value,
      priceAtPurchase: item.priceAtPurchase.value,
      currency: 'BDT',
      status: item.status.value,
      lineTotal: item.lineTotal,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  static toListResponse(
    items: readonly OrderItemEntity[],
    orderId: string = '',
  ): readonly OrderItemResponseDTO[] {
    return items.map((i) => OrderItemMapper.toResponse(i, orderId));
  }
}
