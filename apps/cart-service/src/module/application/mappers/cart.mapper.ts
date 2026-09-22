import { Injectable } from '@nestjs/common';
import { CartEntity } from '../../domain/entities/cart.entity';
import type { CartResponseDTO } from '../dtos/responses/cart-response.dto';
import type { CartSummaryResponseDTO } from '../dtos/responses/cart-summary-response.dto';

@Injectable()
export class CartMapper {
  toResponse(entity: CartEntity): CartResponseDTO {
    return {
      success: true,
      cart: {
        id: entity.id.value,
        userId: entity.userId?.value,
        type: entity.type.value,
        status: entity.status.value,
        itemCount: entity.itemCount,
        subtotal: entity.subtotal,
        discountTotal: entity.discountTotal,
        taxTotal: entity.taxTotal,
        shippingTotal: entity.shippingTotal,
        grandTotal: entity.grandTotal,
        currency: entity.currency,
        items: [],
      },
    };
  }

  toSummary(entity: CartEntity): CartSummaryResponseDTO {
    return {
      success: true,
      summary: {
        cartId: entity.id.value,
        status: entity.status.value,
        itemCount: entity.itemCount,
        subtotal: entity.subtotal,
        discountTotal: entity.discountTotal,
        grandTotal: entity.grandTotal,
        currency: entity.currency,
        hasCoupon: false,
        hasVoucher: false,
      },
    };
  }
}
