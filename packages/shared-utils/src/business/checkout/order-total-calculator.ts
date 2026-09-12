export interface OrderItemCalculationData {
  unitPrice: { amount: number };
  quantity: { value: number };
  discountPrice?: { amount: number };
  taxPrice?: { amount: number };
}

export interface OrderCalculationData {
  items: OrderItemCalculationData[];
  shippingCost?: { amount: number };
}

export const calculateOrderSubtotal = (items: OrderItemCalculationData[]): number => {
  return items.reduce((sum, item) => sum + item.unitPrice.amount * item.quantity.value, 0);
};

export const calculateOrderDiscount = (items: OrderItemCalculationData[]): number => {
  return items.reduce((sum, item) => sum + (item.discountPrice?.amount || 0), 0);
};

export const calculateOrderTax = (items: OrderItemCalculationData[]): number => {
  return items.reduce((sum, item) => sum + (item.taxPrice?.amount || 0), 0);
};

export const calculateOrderGrandTotal = (order: OrderCalculationData): number => {
  const subtotal = calculateOrderSubtotal(order.items);
  const discount = calculateOrderDiscount(order.items);
  const tax = calculateOrderTax(order.items);
  const shipping = order.shippingCost?.amount || 0;
  return subtotal - discount + tax + shipping;
};
