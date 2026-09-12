/**
 * Cart Formatter — cart-scoped names.
 * Note: `formatPrice` (base) lives in common/formatter/price.formatter.ts.
 */
export interface CartFormatData {
  items: CartItemFormatData[];
  subtotal: number;
  total: number;
}

export interface CartItemFormatData {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export const formatCartPrice = (amount: number, currency = 'BDT'): string =>
  `${amount.toFixed(2)} ${currency}`;

export const formatCartSummary = (cart: CartFormatData): string =>
  `${cart.items.length} items | ${formatCartPrice(cart.total)}`;

export const formatCartItem = (item: CartItemFormatData): string =>
  `${item.name} x${item.quantity} | ${formatCartPrice(item.price)}`;

export const formatCartItems = (items: CartItemFormatData[]): string[] => items.map(formatCartItem);
