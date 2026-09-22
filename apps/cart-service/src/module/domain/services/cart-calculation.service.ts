import type { CartItemEntity } from '../entities/cart-item.entity';

export interface CartTotals {
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountTotal: number;
  readonly taxTotal: number;
  readonly shippingTotal: number;
  readonly grandTotal: number;
  readonly currency: string;
}

export class CartCalculationService {
  calculate(
    items: readonly CartItemEntity[],
    options: {
      readonly discountTotal?: number;
      readonly taxTotal?: number;
      readonly shippingTotal?: number;
      readonly currency: string;
    },
  ): CartTotals {
    const selectedItems = items.filter((i) => i.selected && i.status.value === 'active');
    const subtotal = selectedItems.reduce((sum, i) => sum + i.totalPrice, 0);
    const discountTotal = options.discountTotal ?? 0;
    const taxTotal = options.taxTotal ?? 0;
    const shippingTotal = options.shippingTotal ?? 0;
    const grandTotal = Math.max(0, subtotal - discountTotal + taxTotal + shippingTotal);

    return {
      itemCount: selectedItems.length,
      subtotal: Math.round(subtotal * 100) / 100,
      discountTotal: Math.round(discountTotal * 100) / 100,
      taxTotal: Math.round(taxTotal * 100) / 100,
      shippingTotal: Math.round(shippingTotal * 100) / 100,
      grandTotal: Math.round(grandTotal * 100) / 100,
      currency: options.currency,
    };
  }
}
