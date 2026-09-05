/**
 * Payment Formatter
 * পেমেন্ট ফরম্যাটার
 */

import { formatDate } from '../../common/formatter';
import type { Payment } from '@vubon/shared-types';

export interface FormattedPayment {
  id: string;
  amount: string;
  currency: string;
  status: string;
  statusLabel: string;
  method: string;
  methodLabel: string;
  gateway: string;
  orderId: string;
  createdAt: string;
  paidAt?: string;
  failedAt?: string;
  refundedAt?: string;
  receiptUrl?: string;
}

export const formatPayment = (payment: Payment, currency: string = 'BDT'): FormattedPayment => {
  const formatAmount = (amount: number): string => {
    return formatCurrencyAmount(amount, currency);
  };

  const formatDateString = (date: Date | string): string => {
    return formatDate(date, 'DD-MM-YYYY HH:mm');
  };

  return {
    id: payment.id,
    amount: formatAmount(payment.amount),
    currency: payment.currency || 'BDT',
    status: payment.status,
    statusLabel: getPaymentStatusLabel(payment.status),
    method: typeof payment.method === 'string' ? payment.method : payment.method?.type || 'unknown',
    methodLabel: getPaymentMethodDisplayLabel(
      typeof payment.method === 'string' ? payment.method : payment.method?.type || 'unknown'
    ),
    gateway: payment.gateway,
    orderId: payment.orderId,
    createdAt: formatDateString(payment.createdAt),
    paidAt: payment.paidAt ? formatDateString(payment.paidAt) : undefined,
    failedAt: payment.failedAt ? formatDateString(payment.failedAt) : undefined,
    refundedAt: payment.refundedAt ? formatDateString(payment.refundedAt) : undefined,
    receiptUrl: payment.receiptUrl,
  };
};

export const formatPaymentSummary = (payment: Payment, currency: string = 'BDT'): string => {
  const formatAmount = (amount: number): string => {
    return formatCurrencyAmount(amount, currency);
  };

  return `Payment #${payment.id.slice(0, 8)} - ${formatAmount(payment.amount)} - ${payment.status}`;
};

export const getPaymentStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    failed: 'Failed',
    cancelled: 'Cancelled',
    refunded: 'Refunded',
    partial_refunded: 'Partially Refunded',
    authorized: 'Authorized',
    captured: 'Captured',
    voided: 'Voided',
    expired: 'Expired',
    disputed: 'Disputed',
    chargeback: 'Chargeback',
  };

  return labels[status] || status;
};

export const getPaymentMethodDisplayLabel = (method: string): string => {
  const labels: Record<string, string> = {
    cash_on_delivery: 'Cash on Delivery',
    bank_transfer: 'Bank Transfer',
    mobile_banking: 'Mobile Banking',
    credit_card: 'Credit Card',
    debit_card: 'Debit Card',
    digital_wallet: 'Digital Wallet',
    online_banking: 'Online Banking',
    payment_gateway: 'Payment Gateway',
    installment: 'Installment',
    crypto: 'Cryptocurrency',
    bkash: 'bKash',
    nagad: 'Nagad',
    rocket: 'Rocket',
    sslcommerz: 'SSLCommerz',
  };

  return labels[method] || method;
};

export const getPaymentIcon = (method: string): string => {
  const icons: Record<string, string> = {
    bkash: '💰',
    nagad: '💰',
    rocket: '💰',
    credit_card: '💳',
    debit_card: '💳',
    bank_transfer: '🏦',
    mobile_banking: '📱',
    digital_wallet: '👛',
    cash_on_delivery: '📦',
  };

  return icons[method] || '💳';
};

// Helper function to format currency
const formatCurrencyAmount = (amount: number, currency: string): string => {
  try {
    return new Intl.NumberFormat('bn-BD', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
};
