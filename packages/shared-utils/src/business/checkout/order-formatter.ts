/**
 * Order Formatter
 * অর্ডার ফরম্যাটার
 */

import { formatDate } from '../../common/formatter';
import { formatCurrency } from '../../common/formatter/currency.formatter';
import type { Order } from '@vubon/shared-types';
import { getOrderStatusLabel } from './order-status-validator';
import { CURRENCY } from '@vubon/shared-constants';

export interface FormattedOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: string;
  statusLabel: string;
  total: string;
  subtotal: string;
  discount: string;
  tax: string;
  shipping: string;
  currency: string;
  placedAt: string;
  items: FormattedOrderItem[];
  shippingAddress: FormattedAddress;
  billingAddress: FormattedAddress;
  paymentMethod: string;
  paymentStatus: string;
  tracking?: FormattedTracking[];
}

export interface FormattedOrderItem {
  id: string;
  productName: string;
  variantName?: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
  discount: string;
  tax: string;
  subtotal: string;
  imageUrl?: string;
}

export interface FormattedAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  fullAddress: string;
}

export interface FormattedTracking {
  id: string;
  status: string;
  description: string;
  location?: string;
  date: string;
}

// Helper function to validate currency
const validateCurrency = (currency: string): keyof typeof CURRENCY => {
  if (currency === 'BDT' || currency === 'USD') {
    return currency as keyof typeof CURRENCY;
  }
  return 'BDT';
};

export const formatOrder = (order: Order, currency?: keyof typeof CURRENCY): FormattedOrder => {
  const validCurrency = currency || validateCurrency(order.currency || 'BDT');

  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, validCurrency);
  };

  const formatDateString = (date: Date | string): string => {
    return formatDate(date, 'DD-MM-YYYY HH:mm');
  };

  const formattedItems: FormattedOrderItem[] = order.items.map((item) => ({
    id: item.id,
    productName: `Product ${item.productId}`,
    variantName: item.variantId,
    quantity: item.quantity,
    unitPrice: formatPrice(item.price),
    totalPrice: formatPrice(item.price * item.quantity),
    discount: formatPrice(item.discount),
    tax: formatPrice(item.tax),
    subtotal: formatPrice(item.total),
  }));

  const shippingAddress: FormattedAddress = {
    street: order.shippingAddress?.street || '',
    city: order.shippingAddress?.city || '',
    state: order.shippingAddress?.state || '',
    country: order.shippingAddress?.country || '',
    zipCode: order.shippingAddress?.zipCode || '',
    fullAddress: `${order.shippingAddress?.street || ''}, ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''}, ${order.shippingAddress?.country || ''} ${order.shippingAddress?.zipCode || ''}`,
  };

  const billingAddress: FormattedAddress = {
    street: order.billingAddress?.street || '',
    city: order.billingAddress?.city || '',
    state: order.billingAddress?.state || '',
    country: order.billingAddress?.country || '',
    zipCode: order.billingAddress?.zipCode || '',
    fullAddress: `${order.billingAddress?.street || ''}, ${order.billingAddress?.city || ''}, ${order.billingAddress?.state || ''}, ${order.billingAddress?.country || ''} ${order.billingAddress?.zipCode || ''}`,
  };

  const formattedTracking: FormattedTracking[] =
    order.tracking?.map((track) => ({
      id: track.id,
      status: track.status,
      description: track.description,
      location: track.location,
      date: formatDateString(track.createdAt),
    })) || [];

  return {
    id: order.id,
    orderNumber: order.orderNumber,
    customerName: order.user?.name || 'N/A',
    customerEmail: order.user?.email || 'N/A',
    status: order.status,
    statusLabel: getOrderStatusLabel(order.status),
    total: formatPrice(order.total),
    subtotal: formatPrice(order.subtotal),
    discount: formatPrice(order.discount),
    tax: formatPrice(order.tax),
    shipping: formatPrice(order.shipping),
    currency: order.currency || 'BDT',
    placedAt: formatDateString(order.placedAt),
    items: formattedItems,
    shippingAddress,
    billingAddress,
    paymentMethod: order.paymentMethod,
    paymentStatus: order.paymentStatus,
    tracking: formattedTracking,
  };
};

export const formatOrderSummary = (order: Order, currency?: keyof typeof CURRENCY): string => {
  const validCurrency = currency || validateCurrency(order.currency || 'BDT');

  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, validCurrency);
  };

  return `Order #${order.orderNumber} - ${order.items.length} items - Total: ${formatPrice(order.total)}`;
};

export const formatOrderStatusHistory = (
  order: Order
): {
  date: string;
  status: string;
  label: string;
}[] => {
  // In real implementation, this would come from order history
  return [
    {
      date: formatDate(order.createdAt, 'DD-MM-YYYY HH:mm'),
      status: order.status,
      label: getOrderStatusLabel(order.status),
    },
  ];
};
