/**
 * Cart Formatter
 * কার্ট ফরম্যাটার
 */

import { CURRENCY } from '@vubon/shared-constants';
import type { Cart } from '@vubon/shared-types';

export interface FormattedCart {
  id: string;
  totalItems: number;
  subtotal: string;
  discount: string;
  tax: string;
  shipping: string;
  total: string;
  currency: string;
  items: FormattedCartItem[];
  couponCount: number;
  promotionCount: number;
}

export interface FormattedCartItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  discount: string;
  tax: string;
  subtotal: string;
  imageUrl?: string;
}

export const formatCart = (cart: Cart, currency: string = CURRENCY.BDT): FormattedCart => {
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const formattedItems: FormattedCartItem[] = cart.items.map((item) => ({
    id: item.id,
    productId: item.productId,
    name: `Product ${item.productId}`, // In real app, fetch product name
    quantity: item.quantity,
    unitPrice: formatPrice(item.price),
    totalPrice: formatPrice(item.price * item.quantity),
    discount: formatPrice(item.discount),
    tax: formatPrice(item.tax),
    subtotal: formatPrice(item.total),
  }));

  return {
    id: cart.id,
    totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: formatPrice(cart.subtotal),
    discount: formatPrice(cart.discount),
    tax: formatPrice(cart.tax),
    shipping: formatPrice(cart.shipping),
    total: formatPrice(cart.total),
    currency: cart.currency || CURRENCY.BDT,
    items: formattedItems,
    couponCount: cart.coupons?.length || 0,
    promotionCount: cart.promotions?.length || 0,
  };
};

export const formatCartSummary = (
  cart: Cart,
  currency: string = CURRENCY.BDT
): {
  summary: string;
  breakdown: Record<string, string>;
} => {
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const breakdown: Record<string, string> = {
    Subtotal: formatPrice(cart.subtotal),
    Discount: `-${formatPrice(cart.discount)}`,
    Tax: formatPrice(cart.tax),
    Shipping: formatPrice(cart.shipping),
  };

  const total = cart.subtotal - cart.discount + cart.tax + cart.shipping;

  const summary = `Cart Summary: ${cart.items.length} items, Total: ${formatPrice(total)}`;

  return {
    summary,
    breakdown,
  };
};

export const formatCartItemName = (
  item: FormattedCartItem,
  includePrice: boolean = true
): string => {
  let name = item.name;
  if (includePrice) {
    name += ` (${item.unitPrice} x ${item.quantity})`;
  }
  return name;
};

export const getCartStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    active: 'Active',
    abandoned: 'Abandoned',
    checked_out: 'Checked Out',
    converted: 'Converted',
    expired: 'Expired',
    deleted: 'Deleted',
  };
  return labels[status] || status;
};

// CURRENCY ব্যবহার করে ইউটিলিটি ফাংশন
export const getDefaultCurrency = (): string => {
  return CURRENCY.BDT;
};

export const getSupportedCurrencies = (): string[] => {
  return Object.values(CURRENCY);
};

export const isValidCurrency = (currency: string): boolean => {
  return Object.values(CURRENCY).includes(currency as (typeof CURRENCY)[keyof typeof CURRENCY]);
};
