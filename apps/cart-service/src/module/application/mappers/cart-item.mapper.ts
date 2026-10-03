/**
 * CartItemMapper — Entity → Response DTO
 */
import { CartItemEntity } from '../../domain/entities/cart-item.entity.js';
import type { CartItemStandaloneResponseDTO } from '../dtos/responses/cart-item-response.dto.js';

export class CartItemMapper {
  static toResponse(item: CartItemEntity, cartId: string): CartItemStandaloneResponseDTO {
    return {
      id: item.id,
      cartId,
      productId: item.productId.value,
      variantId: item.variantId?.value,
      vendorId: item.vendorId?.value,
      sku: item.sku,
      name: item.name,
      imageUrl: item.imageUrl,
      unitPrice: item.unitPrice,
      compareAtPrice: item.compareAtPrice,
      quantity: item.quantity.value,
      lineSubtotal: item.lineSubtotal,
      discountAmount: item.discountAmount,
      lineTotal: item.lineTotal,
      status: item.status.value,
      isAvailable: item.isAvailable,
      isSelected: item.isSelected,
      attributes: item.attributes,
      currency: item.currency,
      addedAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  static toResponseList(
    items: readonly CartItemEntity[],
    cartId: string,
  ): readonly CartItemStandaloneResponseDTO[] {
    return items.map((i) => CartItemMapper.toResponse(i, cartId));
  }
}
