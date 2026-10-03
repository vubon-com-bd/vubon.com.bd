/**
 * CartMapper — Entity → Response DTO
 */
import { CartEntity } from '../../domain/entities/cart.entity.js';
import { CartTotalsCompositeVO } from '../../domain/value-objects/composites/cart-totals.vo.js';
import type { CartResponseDTO, CartItemResponseDTO } from '../dtos/responses/cart-response.dto.js';
import type { CartSummaryResponseDTO } from '../dtos/responses/cart-summary-response.dto.js';
import type { CartTotalsResponseDTO } from '../dtos/responses/cart-totals-response.dto.js';

export class CartMapper {
  static toResponse(cart: CartEntity): CartResponseDTO {
    const items: CartItemResponseDTO[] = cart.items.map((item) => ({
      id: item.id,
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
      addedAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));

    return {
      id: cart.id,
      type: cart.type.value,
      status: cart.status.value,
      userId: cart.userId?.value,
      sessionId: cart.sessionId?.value,
      currency: cart.currency,
      notes: cart.notes,
      items,
      itemCount: cart.itemCount,
      uniqueItemCount: cart.uniqueItemCount,
      selectedItemCount: cart.selectedItemCount,
      couponCode: cart.couponCode,
      voucherCode: cart.voucherCode,
      totals: {
        currency: cart.totals.currency,
        itemCount: cart.totals.itemCount,
        subtotal: cart.totals.subtotal,
        itemDiscounts: cart.totals.itemDiscounts,
        couponDiscount: cart.totals.couponDiscount,
        voucherDiscount: cart.totals.voucherDiscount,
        taxAmount: cart.totals.taxAmount,
        shippingAmount: cart.totals.shippingAmount,
        grandTotal: cart.totals.grandTotal,
      },
      expiresAt: cart.expiresAt,
      lastActivityAt: cart.lastActivityAt,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }

  static toSummaryResponse(cart: CartEntity): CartSummaryResponseDTO {
    return {
      id: cart.id,
      type: cart.type.value,
      status: cart.status.value,
      itemCount: cart.itemCount,
      uniqueItemCount: cart.uniqueItemCount,
      subtotal: cart.totals.subtotal,
      discountAmount: cart.totals.totalDiscounts,
      taxAmount: cart.totals.taxAmount,
      shippingAmount: cart.totals.shippingAmount,
      total: cart.totals.grandTotal,
      currency: cart.currency,
      hasCoupon: !!cart.couponCode,
      hasVoucher: !!cart.voucherCode,
      lastActivityAt: cart.lastActivityAt,
    };
  }

  static totalsToResponse(totals: CartTotalsCompositeVO): CartTotalsResponseDTO {
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
