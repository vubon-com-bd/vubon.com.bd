/**
 * Order Total Calculator
 * অর্ডার টোটাল ক্যালকুলেটর
 */

import type { Order, OrderItem } from '@vubon/shared-types';

export interface OrderTotalCalculation {
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  paidAmount: number;
  dueAmount: number;
  currency: string;
  itemCount: number;
  itemDiscount: number;
  orderDiscount: number;
}

export interface OrderItemCalculation {
  item: OrderItem;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

export const calculateOrderTotal = (order: Order): OrderTotalCalculation => {
  const subtotal = order.subtotal || 0;
  const discount = order.discount || 0;
  const tax = order.tax || 0;
  const shipping = order.shipping || 0;
  const total = subtotal - discount + tax + shipping;
  const paidAmount = order.paidAmount || 0;
  const dueAmount = total - paidAmount;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    shipping: Math.round(shipping * 100) / 100,
    total: Math.round(total * 100) / 100,
    paidAmount: Math.round(paidAmount * 100) / 100,
    dueAmount: Math.round(dueAmount * 100) / 100,
    currency: order.currency || 'BDT',
    itemCount: order.items.length,
    itemDiscount: order.items.reduce((sum, item) => sum + (item.discount || 0), 0),
    orderDiscount: discount,
  };
};

export const calculateOrderItemTotal = (item: OrderItem): OrderItemCalculation => {
  const subtotal = item.price * item.quantity;
  const discount = item.discount || 0;
  const tax = item.tax || 0;
  const total = subtotal - discount + tax;

  return {
    item,
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(discount * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
};

export const calculateOrderSubtotal = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const calculateOrderDiscount = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => sum + (item.discount || 0), 0);
};

export const calculateOrderTax = (items: OrderItem[]): number => {
  return items.reduce((sum, item) => sum + (item.tax || 0), 0);
};

export const calculateOrderBalance = (
  total: number,
  paidAmount: number
): {
  balance: number;
  isPaid: boolean;
  isOverpaid: boolean;
  status: 'paid' | 'partial' | 'unpaid' | 'overpaid';
} => {
  const balance = total - paidAmount;

  if (balance === 0) {
    return {
      balance: 0,
      isPaid: true,
      isOverpaid: false,
      status: 'paid',
    };
  }

  if (balance < 0) {
    return {
      balance: Math.abs(balance),
      isPaid: true,
      isOverpaid: true,
      status: 'overpaid',
    };
  }

  return {
    balance: Math.round(balance * 100) / 100,
    isPaid: false,
    isOverpaid: false,
    status: paidAmount > 0 ? 'partial' : 'unpaid',
  };
};

export const calculateOrderProfit = (
  order: Order,
  costPriceMap: Map<string, number>
): {
  totalProfit: number;
  totalCost: number;
  itemProfits: {
    itemId: string;
    profit: number;
    cost: number;
    revenue: number;
  }[];
} => {
  const itemProfits = order.items.map((item) => {
    const costPrice = costPriceMap.get(item.productId) || item.price * 0.7;
    const revenue = item.price * item.quantity;
    const cost = costPrice * item.quantity;
    const profit = revenue - cost;

    return {
      itemId: item.id,
      profit: Math.round(profit * 100) / 100,
      cost: Math.round(cost * 100) / 100,
      revenue: Math.round(revenue * 100) / 100,
    };
  });

  const totalProfit = itemProfits.reduce((sum, p) => sum + p.profit, 0);
  const totalCost = itemProfits.reduce((sum, p) => sum + p.cost, 0);

  return {
    totalProfit: Math.round(totalProfit * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    itemProfits,
  };
};
