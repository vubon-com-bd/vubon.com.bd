/**
 * Refund Calculator
 * রিফান্ড ক্যালকুলেটর
 */

import type { PaymentRefund } from '@vubon/shared-types';

export interface RefundCalculationResult {
  amount: number;
  refundableAmount: number;
  fee: number;
  netRefund: number;
  currency: string;
  feePercentage: number;
  feeFixed: number;
}

export interface RefundableAmount {
  totalPaid: number;
  totalRefunded: number;
  remainingRefundable: number;
  isFullyRefunded: boolean;
}

export const calculateRefundAmount = (
  refund: PaymentRefund,
  feePercentage: number = 0,
  feeFixed: number = 0
): RefundCalculationResult => {
  const amount = refund.amount;
  const fee = (amount * feePercentage) / 100 + feeFixed;
  const netRefund = amount - fee;

  return {
    amount: Math.round(amount * 100) / 100,
    refundableAmount: Math.round(amount * 100) / 100,
    fee: Math.round(fee * 100) / 100,
    netRefund: Math.round(netRefund * 100) / 100,
    currency: refund.currency || 'BDT',
    feePercentage,
    feeFixed,
  };
};

export const calculateRefundableAmount = (
  totalPaid: number,
  totalRefunded: number
): RefundableAmount => {
  const remainingRefundable = totalPaid - totalRefunded;
  const isFullyRefunded = remainingRefundable <= 0;

  return {
    totalPaid: Math.round(totalPaid * 100) / 100,
    totalRefunded: Math.round(totalRefunded * 100) / 100,
    remainingRefundable: Math.round(Math.max(0, remainingRefundable) * 100) / 100,
    isFullyRefunded,
  };
};

export const calculatePartialRefund = (
  totalPaid: number,
  refundAmount: number
): {
  remainingAmount: number;
  refundPercentage: number;
} => {
  const remainingAmount = totalPaid - refundAmount;
  const refundPercentage = totalPaid > 0 ? (refundAmount / totalPaid) * 100 : 0;

  return {
    remainingAmount: Math.round(Math.max(0, remainingAmount) * 100) / 100,
    refundPercentage: Math.round(refundPercentage * 100) / 100,
  };
};

export const calculateRefundFee = (
  amount: number,
  feePercentage: number,
  feeFixed: number = 0
): {
  fee: number;
  netAmount: number;
} => {
  const fee = (amount * feePercentage) / 100 + feeFixed;
  const netAmount = amount - fee;

  return {
    fee: Math.round(fee * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
  };
};
