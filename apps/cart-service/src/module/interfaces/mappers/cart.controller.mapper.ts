import { Injectable } from '@nestjs/common';
import type { CartEntity } from '../../domain/entities/cart.entity';
import {
  CartResponseDto,
  CartSummaryResponseDto,
} from '../dtos/responses/cart.response.dto';

@Injectable()
export class CartControllerMapper {
  toResponse(entity: CartEntity): CartResponseDto {
    return {
      id: entity.id.value,
      userId: entity.userId?.value ?? null,
      type: entity.type.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      subtotal: entity.subtotal,
      discountTotal: entity.discountTotal,
      taxTotal: entity.taxTotal,
      shippingTotal: entity.shippingTotal,
      grandTotal: entity.grandTotal,
      currency: entity.currency,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  toSummary(entity: CartEntity): CartSummaryResponseDto {
    return {
      cartId: entity.id.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      subtotal: entity.subtotal,
      discountTotal: entity.discountTotal,
      grandTotal: entity.grandTotal,
      currency: entity.currency,
      hasCoupon: entity.discountTotal > 0,
      hasVoucher: false,
    };
  }
}
