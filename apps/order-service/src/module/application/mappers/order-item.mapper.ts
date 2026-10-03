/**
 * OrderItemMapper — Entity → DTO
 * @module order-service/application/mappers
 */
import type { OrderItemEntity } from '../../domain/entities/order-item.entity.js';
import type { OrderItemResponseDTO } from '../dtos/responses/order-response.dto.js';

export class OrderItemMapper {
  static toResponse(item: OrderItemEntity): OrderItemResponseDTO {
    return {
      id: item.id,
      productId: item.productId.value,
      variantId: item.variantId?.value,
      vendorId: item.vendorId?.value,
      sku: item.sku,
      name: item.name,
      imageUrl: item.imageUrl,
      type: item.type,
      status: item.status.value,
      quantity: item.quantity.value,
      unitPrice: item.price.amount,
      compareAtPrice: item.price.compareAt,
      lineSubtotal: item.lineSubtotal,
      discountAmount: item.discountAmount,
      taxAmount: item.taxAmount,
      shippingAmount: item.shippingAmount,
      lineTotal: item.lineTotal,
      currency: item.currency,
      notes: item.notes,
      attributes: item.attributes,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  static toResponseList(items: readonly OrderItemEntity[]): OrderItemResponseDTO[] {
    return items.map((i) => this.toResponse(i));
  }
}
