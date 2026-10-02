/**
 * CartCalculationService — pure total calculation
 * @module cart-service/domain/services
 *
 * Pure logic: no DB, no HTTP, no framework.
 * Input: cart with items, optional coupon/voucher/tax/shipping inputs.
 * Output: CartTotalsCompositeVO.
 */
import { CartEntity } from '../entities/cart.entity.js';
import { CartTotalsCompositeVO } from '../value-objects/composites/cart-totals.vo.js';
import { CartTaxRateVO } from '../value-objects/primitives/cart-tax-rate.vo.js';

export interface CartCalculationInput {
  readonly cart: CartEntity;
  readonly couponDiscount?: number;
  readonly voucherDiscount?: number;
  readonly taxRate?: CartTaxRateVO;
  readonly taxInclusive?: boolean;
  readonly shippingCost?: number;
}

export class CartCalculationService {
  /**
   * Calculate totals for a cart. Also validates that coupon + voucher
   * discounts do not exceed subtotal-after-item-discounts.
   */
  calculate(input: CartCalculationInput): CartTotalsCompositeVO {
    const { cart } = input;
    const subtotal = this.round(
      cart.items.reduce((sum, item) => sum + item.lineSubtotal, 0),
    );
    const itemDiscounts = this.round(
      cart.items.reduce((sum, item) => sum + item.discountAmount, 0),
    );

    const afterItems = Math.max(0, subtotal - itemDiscounts);
    const couponDiscount = Math.min(input.couponDiscount ?? 0, afterItems);
    const voucherDiscount = Math.min(
      input.voucherDiscount ?? 0,
      Math.max(0, afterItems - couponDiscount),
    );

    const taxRate = input.taxRate?.percent ?? 0;
    const taxInclusive = input.taxInclusive ?? false;

    return CartTotalsCompositeVO.calculate({
      currency: cart.currency,
      itemCount: cart.itemCount,
      subtotal,
      itemDiscounts,
      couponDiscount,
      voucherDiscount,
      taxRate,
      taxInclusive,
      shippingCost: input.shippingCost ?? 0,
    });
  }

  /**
   * Compute subtotal only (before any discounts/tax/shipping).
   */
  subtotal(cart: CartEntity): number {
    return this.round(
      cart.items.reduce((sum, item) => sum + item.lineSubtotal, 0),
    );
  }

  /**
   * Sum of item-level discounts only (not coupon/voucher).
   */
  itemDiscountTotal(cart: CartEntity): number {
    return this.round(
      cart.items.reduce((sum, item) => sum + item.discountAmount, 0),
    );
  }

  /**
   * Effective per-item subtotal (lineSubtotal - discount).
   */
  effectiveSubtotal(cart: CartEntity): number {
    return this.round(this.subtotal(cart) - this.itemDiscountTotal(cart));
  }

  /**
   * True when all items in the cart are available AND purchasable.
   */
  allItemsPurchasable(cart: CartEntity): boolean {
    return cart.items.every((item) => item.isPurchasable());
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
