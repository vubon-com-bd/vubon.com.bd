import { Injectable } from '@nestjs/common';
import type { CartTotalsVO } from '../../domain/value-objects/composites/cart-totals.vo';
import { CartTotalsResponseDto } from '../dtos/responses/cart-totals.response.dto';

@Injectable()
export class TotalsControllerMapper {
  toResponse(totals: CartTotalsVO): CartTotalsResponseDto {
    return {
      itemCount: totals.itemCount,
      subtotal: totals.subtotal,
      discountTotal: totals.discountTotal,
      taxTotal: totals.taxTotal,
      shippingTotal: totals.shippingTotal,
      grandTotal: totals.grandTotal,
      currency: totals.currency,
    };
  }
}
