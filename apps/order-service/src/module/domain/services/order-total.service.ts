/**
 * OrderTotalService — pure calculation of order totals
 * @module order-service/domain/services
 *
 * Business rules:
 *  - subtotal = sum(item.lineSubtotal)
 *  - discount = item discounts + order-level discount (capped at subtotal)
 *  - taxableAmount = subtotal − discount
 *  - tax = taxableAmount × taxRate
 *  - total = taxableAmount + tax + shippingCost
 *  - all amounts rounded to 2 decimals per step
 */
import { OrderItemEntity } from '../entities/order-item.entity.js';
import { OrderTotalsCompositeVO } from '../value-objects/composites/order-total.vo.js';
import { OrderSubtotalVO } from '../value-objects/primitives/order-subtotal.vo.js';
import { OrderDiscountVO } from '../value-objects/primitives/order-discount.vo.js';
import { OrderTaxVO } from '../value-objects/primitives/order-tax.vo.js';
import { OrderShippingVO } from '../value-objects/primitives/order-shipping.vo.js';
import { OrderTotalVO } from '../value-objects/primitives/order-total.vo.js';

export interface OrderTotalCalculationInput {
  readonly items: readonly OrderItemEntity[];
  readonly currency: string;
  readonly taxRate?: number;
  readonly shippingCost?: number;
  readonly orderLevelDiscount?: number;
}

export class OrderTotalService {
  static calculate(input: OrderTotalCalculationInput): OrderTotalsCompositeVO {
    const currency = input.currency;
    const itemCount = input.items.reduce((sum, i) => sum + i.quantity.value, 0);

    const subtotal = this.round(
      input.items.reduce((sum, i) => sum + i.lineSubtotal, 0),
    );

    const itemDiscounts = this.round(
      input.items.reduce((sum, i) => sum + i.discountAmount, 0),
    );

    const orderLevelDiscount = Math.max(0, input.orderLevelDiscount ?? 0);
    const totalDiscount = Math.min(
      subtotal,
      this.round(itemDiscounts + orderLevelDiscount),
    );

    const taxRate = input.taxRate ?? 0;
    const taxAmount = this.round((subtotal - totalDiscount) * taxRate);

    const shippingCost = Math.max(0, input.shippingCost ?? 0);

    const total = this.round(subtotal - totalDiscount + taxAmount + shippingCost);

    return OrderTotalsCompositeVO.create({
      subtotal: OrderSubtotalVO.create(subtotal, currency),
      discount: OrderDiscountVO.create(totalDiscount, currency),
      tax: OrderTaxVO.create(taxAmount, currency, taxRate),
      shipping: OrderShippingVO.create(shippingCost, currency),
      total: OrderTotalVO.create(total, currency),
      itemCount,
    });
  }

  static calculateTax(taxableAmount: number, taxRate: number): number {
    if (taxableAmount < 0) return 0;
    if (taxRate < 0 || taxRate > 1) return 0;
    return this.round(taxableAmount * taxRate);
  }

  static calculatePercentageDiscount(amount: number, percent: number): number {
    if (amount < 0 || percent < 0 || percent > 1) return 0;
    return this.round(amount * percent);
  }

  static calculateLineSubtotal(unitPrice: number, quantity: number): number {
    if (unitPrice < 0 || quantity < 0) return 0;
    return this.round(unitPrice * quantity);
  }

  static sumLineSubtotals(items: readonly OrderItemEntity[]): number {
    return this.round(items.reduce((sum, i) => sum + i.lineSubtotal, 0));
  }

  static sumLineTotals(items: readonly OrderItemEntity[]): number {
    return this.round(items.reduce((sum, i) => sum + i.lineTotal, 0));
  }

  private static round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
