import { Injectable } from '@nestjs/common';
import type { CartItemEntity } from '../../domain/entities/cart-item.entity';
import { CartItemResponseDto } from '../dtos/responses/cart-item.response.dto';

@Injectable()
export class CartItemControllerMapper {
  toResponse(entity: CartItemEntity): CartItemResponseDto {
    return {
      id: entity.id.value,
      productId: entity.productId.value,
      variantId: entity.variantId?.value ?? null,
      vendorId: entity.vendorId?.value ?? null,
      quantity: entity.quantity.quantity,
      unitPrice: entity.unitPrice,
      totalPrice: entity.totalPrice,
      currency: entity.currency,
      status: entity.status.value,
      note: entity.note?.value ?? null,
      selected: entity.selected,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
