/**
 * Cart Calculator
 * কার্ট ক্যালকুলেটর
 */

import type { Cart, CartItem } from '@vubon/shared-types';
import type { Product } from '@vubon/shared-types';

export interface CartCalculationResult {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
  uniqueItemCount: number;
  savings: number;
  couponSavings: number;
  promotionSavings: number;
  currency: string;
}

export interface CartItemValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  item: CartItem;
}

export const calculateCartTotal = (cart: Cart): CartCalculationResult => {
  let subtotal = 0;
  let discount = 0;
  let tax = 0;
  let shipping = 0;
  let couponSavings = 0;
  let promotionSavings = 0;

  // Calculate items
  for (const item of cart.items) {
    subtotal += item.total;
    discount += item.discount;
    tax += item.tax;
  }

  // Calculate coupon savings
  for (const coupon of cart.coupons) {
    if (coupon.isApplied) {
      couponSavings += coupon.savings;
    }
  }

  // Calculate promotion savings
  for (const promotion of cart.promotions) {
    promotionSavings += promotion.savings;
  }

  // Total discount
  const totalDiscount = discount + couponSavings + promotionSavings;

  // Shipping
  shipping = cart.shipping || 0;

  // Total
  const total = subtotal - totalDiscount + tax + shipping;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(totalDiscount * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    total: Math.round(total * 100) / 100,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    uniqueItemCount: cart.items.length,
    savings: Math.round(totalDiscount * 100) / 100,
    couponSavings: Math.round(couponSavings * 100) / 100,
    promotionSavings: Math.round(promotionSavings * 100) / 100,
    currency: cart.currency || 'BDT',
  };
};

export const calculateCartItemTotal = (item: CartItem): number => {
  return item.price * item.quantity - item.discount + item.tax;
};

export const calculateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const calculateCartDiscount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.discount, 0);
};

export const calculateCartTax = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.tax, 0);
};

export const calculateCartItemCount = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const calculateCartWeight = (items: CartItem[], products: Map<string, Product>): number => {
  let totalWeight = 0;
  for (const item of items) {
    const product = products.get(item.productId);
    if (product && product.weight) {
      totalWeight += product.weight * item.quantity;
    }
  }
  return Math.round(totalWeight * 100) / 100;
};

export const validateCartItems = (
  items: CartItem[],
  products: Map<string, Product>
): CartItemValidation[] => {
  const results: CartItemValidation[] = [];

  for (const item of items) {
    const errors: string[] = [];
    const warnings: string[] = [];
    const product = products.get(item.productId);

    if (!product) {
      errors.push(`Product ${item.productId} not found`);
    } else {
      // Check stock
      if (product.stock < item.quantity) {
        errors.push(`Insufficient stock for product ${product.name}`);
      }

      // Check price change
      if (product.price !== item.price) {
        warnings.push(`Price changed for product ${product.name}`);
      }

      // Check availability
      if (product.status === 'discontinued' || product.status === 'out_of_stock') {
        errors.push(`Product ${product.name} is not available`);
      }
    }

    results.push({
      valid: errors.length === 0,
      errors,
      warnings,
      item,
    });
  }

  return results;
};

export const hasValidItems = (items: CartItem[]): boolean => {
  return items.every((item) => item.quantity > 0 && item.price >= 0);
};

export const isCartEmpty = (cart: Cart): boolean => {
  return cart.items.length === 0 || cart.items.every((item) => item.quantity === 0);
};
