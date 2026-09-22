import { Injectable } from '@nestjs/common';
import type { CartTotalsVO } from '../../domain/value-objects/composites/cart-totals.vo';
import type { CartTotalsResponseDTO } from '../dtos/responses/cart-totals-response.dto';

@Injectable()
export class TotalsMapper {
  toResponse(totals: CartTotalsVO): CartTotalsResponseDTO {
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
