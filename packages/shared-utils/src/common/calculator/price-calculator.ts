/**
 * Price Calculator.
 */
export interface CartItem {
  price: number;
  quantity: number;
}

export const calculateSubtotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const calculateTotal = (subtotal: number, discount: number = 0, tax: number = 0): number => {
  const safeSubtotal = Math.max(0, subtotal);
  const safeDiscount = Math.max(0, Math.min(discount, subtotal));
  const safeTax = Math.max(0, tax);
  return safeSubtotal - safeDiscount + safeTax;
};

export const calculateItemCount = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.quantity, 0);
