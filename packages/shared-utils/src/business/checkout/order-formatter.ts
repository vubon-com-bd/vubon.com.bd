export const formatOrderPrice = (amount: number, currency = 'BDT'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const formatOrderNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value);
};

export interface OrderFormatData {
  orderNumber: string;
  items?: unknown[];
  grandTotal?: { amount: number };
  status?: string;
}

export interface OrderItemFormatData {
  quantity: { value: number };
  name: string;
  finalPrice: { amount: number };
}

export const formatOrderSummary = (order: OrderFormatData): string => {
  const total = order.grandTotal?.amount || 0;
  const itemCount = order.items?.length || 0;
  const status = order.status || 'pending';
  return `Order #${order.orderNumber} | ${itemCount} items | ${formatOrderPrice(total)} | Status: ${status}`;
};

export const formatOrderItem = (item: OrderItemFormatData): string => {
  return `${item.quantity.value}x ${item.name} - ${formatOrderPrice(item.finalPrice.amount)}`;
};

export const formatOrderStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};
