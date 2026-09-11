export const formatPrice = (amount: number, currency = 'BDT'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export interface CartFormatData {
  grandTotal?: { amount: number };
  itemCount?: number;
}

export interface CartItemFormatData {
  quantity: { value: number };
  product: { name: string };
  finalPrice: { amount: number };
}

export const formatCartSummary = (cart: CartFormatData): string => {
  const total = cart.grandTotal?.amount || 0;
  const itemCount = cart.itemCount || 0;
  return `${itemCount} items | Total: ${formatPrice(total)}`;
};

export const formatCartItem = (item: CartItemFormatData): string => {
  return `${item.quantity.value}x ${item.product.name} - ${formatPrice(item.finalPrice.amount)}`;
};

export const formatCartItems = (items: CartItemFormatData[]): string[] => {
  return items.map(formatCartItem);
};
