/**
 * OrderTotalService
 * @module order-service/domain/services
 *
 * Pure domain service — computes order totals.
 * Total = Subtotal - Discount + Tax + Shipping
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { OrderItemPriceVO } from '../value-objects/primitives/order-item-price.vo.js';
import { OrderSubtotalVO } from '../value-objects/primitives/order-subtotal.vo.js';
import { OrderDiscountVO } from '../value-objects/primitives/order-discount.vo.js';
import { OrderTaxVO } from '../value-objects/primitives/order-tax.vo.js';
import { OrderShippingVO } from '../value-objects/primitives/order-shipping.vo.js';
import { OrderTotalVO } from '../value-objects/primitives/order-total.vo.js';

export interface OrderLineItem {
  readonly unitPrice: OrderItemPriceVO;
  readonly quantity: number;
}

export interface OrderTotalInput {
  readonly items: readonly OrderLineItem[];
  readonly discount?: OrderDiscountVO;
  readonly tax?: OrderTaxVO;
  readonly shipping?: OrderShippingVO;
  readonly currency: string;
}

export interface OrderTotalResult {
  readonly subtotal: OrderSubtotalVO;
  readonly discount: OrderDiscountVO;
  readonly tax: OrderTaxVO;
  readonly shipping: OrderShippingVO;
  readonly total: OrderTotalVO;
}

export class OrderTotalService {
  /**
   * Compute subtotal from items.
   */
  static calculateSubtotal(
    items: readonly OrderLineItem[],
    currency: string,
  ): OrderSubtotalVO {
    if (!items || items.length === 0) {
      throw new BusinessRuleError(
        'Cannot calculate subtotal for empty items',
        'INVALID_ORDER_SUBTOTAL',
        { itemCount: 0 },
      );
    }
    const total = items.reduce((sum, item) => {
      if (item.unitPrice.currency !== currency) {
        throw new BusinessRuleError(
          `Item currency "${item.unitPrice.currency}" does not match "${currency}"`,
          'ORDER_CURRENCY_MISMATCH',
          { itemCurrency: item.unitPrice.currency, currency },
        );
      }
      return sum + item.unitPrice.amount * item.quantity;
    }, 0);
    return OrderSubtotalVO.create(Math.round(total * 100) / 100, currency);
  }

  /**
   * Compute final total breakdown.
   */
  static calculate(input: OrderTotalInput): OrderTotalResult {
    const { items, currency } = input;

    const subtotal = this.calculateSubtotal(items, currency);
    const discount = input.discount ?? OrderDiscountVO.none(currency);
    const tax = input.tax ?? OrderTaxVO.none(currency);
    const shipping = input.shipping ?? OrderShippingVO.free(currency);

    if (discount.currency !== currency) {
      throw new BusinessRuleError(
        `Discount currency "${discount.currency}" does not match "${currency}"`,
        'ORDER_CURRENCY_MISMATCH',
        { discountCurrency: discount.currency, currency },
      );
    }
    if (discount.amount > subtotal.amount) {
      throw new BusinessRuleError(
        `Discount ${discount.amount} exceeds subtotal ${subtotal.amount}`,
        'INVALID_DISCOUNT',
        { discount: discount.amount, subtotal: subtotal.amount },
      );
    }

    const totalAmount =
      subtotal.amount - discount.amount + tax.amount + shipping.amount;
    if (totalAmount < 0) {
      throw new BusinessRuleError(
        'Order total cannot be negative',
        'INVALID_ORDER_TOTAL',
        { totalAmount },
      );
    }

    const total = OrderTotalVO.create(Math.round(totalAmount * 100) / 100, currency);

    return { subtotal, discount, tax, shipping, total };
  }

  /**
   * Verify total matches breakdown (used in assertions).
   */
  static verify(
    subtotal: OrderSubtotalVO,
    discount: OrderDiscountVO,
    tax: OrderTaxVO,
    shipping: OrderShippingVO,
    total: OrderTotalVO,
  ): boolean {
    const expected =
      Math.round(
        (subtotal.amount - discount.amount + tax.amount + shipping.amount) * 100,
      ) / 100;
    return Math.abs(expected - total.amount) < 0.01;
  }
}
