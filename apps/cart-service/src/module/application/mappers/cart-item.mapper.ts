/**
 * CartItemMapper — Entity → Response DTO
 * @module cart-service/application/mappers
 */
import type { CartItemEntity } from '../../domain/entities/cart-item.entity.js';
import type {
  CartItemResponseDTO,
  CartItemPublicResponseDTO,
  CartItemSummaryResponseDTO,
} from '../dtos/responses/cart-item-response.dto.js';

export class CartItemMapper {
  static toResponse(entity: CartItemEntity): CartItemResponseDTO {
    return {
      id: entity.id,
      cartId: entity.cartId.value,
      productId: entity.productId.value,
      variantId: entity.variantId?.value,
      quantity: entity.quantity.value,
      status: entity.status.value,
      unitPrice: entity.unitPrice,
      currency: entity.currency,
      subtotal: entity.subtotal,
      note: entity.note?.value,
      addedAt: entity.createdAt,
      updatedAt: entity.updatedAtInternal,
    };
  }

  static toPublicResponse(entity: CartItemEntity): CartItemPublicResponseDTO {
    return {
      id: entity.id,
      productId: entity.productId.value,
      variantId: entity.variantId?.value,
      quantity: entity.quantity.value,
      unitPrice: entity.unitPrice,
      subtotal: entity.subtotal,
      currency: entity.currency,
      isAvailable: entity.isPurchasable(),
      note: entity.note?.value,
    };
  }

  static toSummary(entity: CartItemEntity): CartItemSummaryResponseDTO {
    return {
      id: entity.id,
      productId: entity.productId.value,
      quantity: entity.quantity.value,
      subtotal: entity.subtotal,
    };
  }
}
