export interface CartItemData {
  unitPrice: { amount: number };
  quantity: { value: number };
  finalPrice: { amount: number };
  discountPrice?: { amount: number };
  taxPrice?: { amount: number };
  productId: string;
  variantId?: string;
}

export interface CartData {
  items: CartItemData[];
  discountTotal?: { amount: number };
  taxTotal?: { amount: number };
  shippingTotal?: { amount: number };
}

export const calculateCartSubtotal = (items: CartItemData[]): number => {
  return items.reduce((sum, item) => sum + item.unitPrice.amount * item.quantity.value, 0);
};

export const calculateItemTotal = (item: CartItemData): number => {
  return item.unitPrice.amount * item.quantity.value;
};

export const calculateItemDiscount = (item: CartItemData): number => {
  return item.unitPrice.amount - item.finalPrice.amount;
};

export const calculateCartItemCount = (items: CartItemData[]): number => {
  return items.reduce((sum, item) => sum + item.quantity.value, 0);
};

export const calculateCartTotal = (cart: CartData): number => {
  const subtotal = calculateCartSubtotal(cart.items);
  const discount = cart.discountTotal?.amount || 0;
  const tax = cart.taxTotal?.amount || 0;
  const shipping = cart.shippingTotal?.amount || 0;
  return subtotal - discount + tax + shipping;
};

export const calculateCartSummary = (
  items: CartItemData[]
): {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
} => {
  const subtotal = calculateCartSubtotal(items);
  const discount = items.reduce((sum, item) => sum + (item.discountPrice?.amount || 0), 0);
  const tax = items.reduce((sum, item) => sum + (item.taxPrice?.amount || 0), 0);
  return { subtotal, discount, tax, shipping: 0, total: subtotal - discount + tax };
};
