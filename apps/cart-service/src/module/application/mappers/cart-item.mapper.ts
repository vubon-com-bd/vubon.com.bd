import { Injectable } from '@nestjs/common';
import { CartItemEntity } from '../../domain/entities/cart-item.entity';
import type { CartItemResponseDTO } from '../dtos/responses/cart-item-response.dto';

@Injectable()
export class CartItemMapper {
  toResponse(entity: CartItemEntity, cartId: string): CartItemResponseDTO {
    return {
      id: entity.id.value,
      cartId,
      productId: entity.productId.value,
      variantId: entity.variantId?.value,
      vendorId: entity.vendorId?.value,
      quantity: entity.quantity.quantity,
      unitPrice: entity.unitPrice,
      totalPrice: entity.totalPrice,
      currency: entity.currency,
      status: entity.status.value,
      note: entity.note?.value,
      selected: entity.selected,
    };
  }
}
