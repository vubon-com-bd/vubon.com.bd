/**
 * TotalsMapper — Composite VO → Response DTO
 */
import { CartTotalsCompositeVO } from '../../domain/value-objects/composites/cart-totals.vo.js';
import type { CartTotalsResponseDTO } from '../dtos/responses/cart-totals-response.dto.js';

export class TotalsMapper {
  static toResponse(totals: CartTotalsCompositeVO): CartTotalsResponseDTO {
    return {
      currency: totals.currency,
      itemCount: totals.itemCount,
      subtotal: totals.subtotal,
      itemDiscounts: totals.itemDiscounts,
      couponDiscount: totals.couponDiscount,
      voucherDiscount: totals.voucherDiscount,
      totalDiscounts: totals.totalDiscounts,
      taxAmount: totals.taxAmount,
      shippingAmount: totals.shippingAmount,
      grandTotal: totals.grandTotal,
      discountPercent: totals.discountPercent,
      hasDiscount: totals.hasDiscount(),
      hasFreeShipping: totals.hasFreeShipping(),
    };
  }
}
