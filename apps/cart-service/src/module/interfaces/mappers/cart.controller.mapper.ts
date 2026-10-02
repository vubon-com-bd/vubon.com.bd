/**
 * CartControllerMapper — App DTO → HTTP DTO
 * @module cart-service/interfaces/mappers
 */
import type { CartResponseDTO, CartItemResponseDTO } from '../../application/dtos/responses/cart-response.dto.js';
import type { CartSummaryResponseDTO } from '../../application/dtos/responses/cart-summary-response.dto.js';
import type { CartHttpResponseDTO, CartItemHttpResponseDTO } from '../dtos/responses/cart.response.dto.js';

export class CartControllerMapper {
  static toHttp(app: CartResponseDTO): CartHttpResponseDTO {
    return {
      id: app.id,
      type: app.type,
      status: app.status,
      userId: app.userId,
      sessionId: app.sessionId,
      currency: app.currency,
      notes: app.notes,
      items: app.items.map((i: CartItemResponseDTO) => this.itemToHttp(i)),
      itemCount: app.itemCount,
      uniqueItemCount: app.uniqueItemCount,
      selectedItemCount: app.selectedItemCount,
      couponCode: app.couponCode,
      voucherCode: app.voucherCode,
      totals: {
        currency: app.totals.currency,
        itemCount: app.totals.itemCount,
        subtotal: app.totals.subtotal,
        itemDiscounts: app.totals.itemDiscounts,
        couponDiscount: app.totals.couponDiscount,
        voucherDiscount: app.totals.voucherDiscount,
        taxAmount: app.totals.taxAmount,
        shippingAmount: app.totals.shippingAmount,
        grandTotal: app.totals.grandTotal,
      },
      expiresAt: app.expiresAt,
      lastActivityAt: app.lastActivityAt,
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
    };
  }

  static summaryToHttp(app: CartSummaryResponseDTO) {
    return {
      id: app.id,
      type: app.type,
      status: app.status,
      itemCount: app.itemCount,
      uniqueItemCount: app.uniqueItemCount,
      subtotal: app.subtotal,
      discountAmount: app.discountAmount,
      taxAmount: app.taxAmount,
      shippingAmount: app.shippingAmount,
      total: app.total,
      currency: app.currency,
      hasCoupon: app.hasCoupon,
      hasVoucher: app.hasVoucher,
      lastActivityAt: app.lastActivityAt,
    };
  }

  private static itemToHttp(i: CartItemResponseDTO): CartItemHttpResponseDTO {
    return {
      id: i.id,
      productId: i.productId,
      variantId: i.variantId,
      vendorId: i.vendorId,
      sku: i.sku,
      name: i.name,
      imageUrl: i.imageUrl,
      unitPrice: i.unitPrice,
      compareAtPrice: i.compareAtPrice,
      quantity: i.quantity,
      lineSubtotal: i.lineSubtotal,
      discountAmount: i.discountAmount,
      lineTotal: i.lineTotal,
      status: i.status,
      isAvailable: i.isAvailable,
      isSelected: i.isSelected,
      attributes: i.attributes,
      addedAt: i.addedAt,
      updatedAt: i.updatedAt,
    };
  }
}
