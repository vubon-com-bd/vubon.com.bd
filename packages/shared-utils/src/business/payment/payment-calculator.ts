/**
 * Payment Calculator
 * পেমেন্ট ক্যালকুলেটর
 */

import { PAYMENT_STATUS } from '@vubon/shared-constants';
import type { Payment } from '@vubon/shared-types';

export interface PaymentCalculationResult {
  amount: number;
  fee: number;
  netAmount: number;
  currency: string;
  taxAmount: number;
  totalAmount: number;
}

export interface PaymentFeeCalculation {
  baseAmount: number;
  feePercentage: number;
  feeFixed: number;
  totalFee: number;
  netAmount: number;
}

export const calculatePaymentAmount = (
  payment: Payment,
  feePercentage: number = 2.5,
  feeFixed: number = 0,
  taxRate: number = 0
): PaymentCalculationResult => {
  const amount = payment.amount;
  const fee = (amount * feePercentage) / 100 + feeFixed;
  const taxAmount = (amount * taxRate) / 100;
  const netAmount = amount - fee - taxAmount;

  return {
    amount: Math.round(amount * 100) / 100,
    fee: Math.round(fee * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
    currency: payment.currency || 'BDT',
    taxAmount: Math.round(taxAmount * 100) / 100,
    totalAmount: Math.round((amount + taxAmount) * 100) / 100,
  };
};

export const calculatePaymentFee = (
  baseAmount: number,
  feePercentage: number,
  feeFixed: number = 0
): PaymentFeeCalculation => {
  const totalFee = (baseAmount * feePercentage) / 100 + feeFixed;
  const netAmount = baseAmount - totalFee;

  return {
    baseAmount: Math.round(baseAmount * 100) / 100,
    feePercentage,
    feeFixed,
    totalFee: Math.round(totalFee * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
  };
};

export const calculatePaymentTax = (
  amount: number,
  taxRate: number
): {
  taxAmount: number;
  totalAmount: number;
} => {
  const taxAmount = (amount * taxRate) / 100;
  const totalAmount = amount + taxAmount;

  return {
    taxAmount: Math.round(taxAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
  };
};

export const calculatePaymentDiscount = (
  amount: number,
  discountPercentage: number
): {
  discountAmount: number;
  discountedAmount: number;
} => {
  const discountAmount = (amount * discountPercentage) / 100;
  const discountedAmount = amount - discountAmount;

  return {
    discountAmount: Math.round(discountAmount * 100) / 100,
    discountedAmount: Math.round(discountedAmount * 100) / 100,
  };
};

export const calculatePaymentTotal = (
  payments: Payment[]
): {
  totalAmount: number;
  totalPaid: number;
  totalPending: number;
  totalFailed: number;
  totalRefunded: number;
} => {
  let totalPaid = 0;
  let totalPending = 0;
  let totalFailed = 0;
  let totalRefunded = 0;

  for (const payment of payments) {
    const status = payment.status;
    // PAYMENT_STATUS থেকে সঠিক স্ট্যাটাস ব্যবহার
    if (status === PAYMENT_STATUS.COMPLETED || status === PAYMENT_STATUS.CAPTURED) {
      totalPaid += payment.amount;
    } else if (status === PAYMENT_STATUS.PENDING || status === PAYMENT_STATUS.PROCESSING) {
      totalPending += payment.amount;
    } else if (status === PAYMENT_STATUS.FAILED) {
      totalFailed += payment.amount;
    } else if (status === PAYMENT_STATUS.REFUNDED || status === PAYMENT_STATUS.PARTIAL_REFUNDED) {
      totalRefunded += payment.amount;
    }
  }

  const totalAmount = totalPaid + totalPending + totalFailed + totalRefunded;

  return {
    totalAmount: Math.round(totalAmount * 100) / 100,
    totalPaid: Math.round(totalPaid * 100) / 100,
    totalPending: Math.round(totalPending * 100) / 100,
    totalFailed: Math.round(totalFailed * 100) / 100,
    totalRefunded: Math.round(totalRefunded * 100) / 100,
  };
};
