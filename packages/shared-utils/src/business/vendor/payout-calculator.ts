/**
 * Vendor Payout Calculator
 * ভেন্ডর পেআউট ক্যালকুলেটর
 */

import { PAYOUT_STATUS } from '@vubon/shared-constants';
import type { VendorPayout } from '@vubon/shared-types';

export interface VendorPayoutCalculation {
  amount: number;
  fee: number;
  netAmount: number;
  currency: string;
  status: string;
}

export const calculateVendorPayout = (payout: VendorPayout): VendorPayoutCalculation => {
  const amount = payout.amount || 0;
  const fee = calculateVendorPayoutFee(amount);
  const netAmount = amount - fee;

  const statusValues = Object.values(PAYOUT_STATUS) as string[];
  const isValidStatus = statusValues.includes(payout.status);

  return {
    amount: Math.round(amount * 100) / 100,
    fee: Math.round(fee * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
    currency: payout.currency || 'BDT',
    status: isValidStatus ? payout.status : 'pending',
  };
};

export const calculateVendorPayoutFee = (amount: number): number => {
  if (amount <= 0) return 0;
  // 1% fee, min 10 BDT, max 500 BDT
  const fee = amount * 0.01;
  return Math.min(500, Math.max(10, fee));
};

export const calculateTotalVendorPayout = (
  payouts: VendorPayout[]
): {
  totalAmount: number;
  totalFee: number;
  totalNetAmount: number;
  count: number;
} => {
  let totalAmount = 0;
  let totalFee = 0;
  let totalNetAmount = 0;

  const completedStatuses = ['completed', 'confirmed', 'paid'];

  for (const payout of payouts) {
    const isCompleted = completedStatuses.includes(payout.status);
    if (isCompleted) {
      const calculation = calculateVendorPayout(payout);
      totalAmount += calculation.amount;
      totalFee += calculation.fee;
      totalNetAmount += calculation.netAmount;
    }
  }

  return {
    totalAmount: Math.round(totalAmount * 100) / 100,
    totalFee: Math.round(totalFee * 100) / 100,
    totalNetAmount: Math.round(totalNetAmount * 100) / 100,
    count: payouts.length,
  };
};

export const isVendorPayoutEligible = (
  vendor: { revenue: number; isVerified: boolean; isApproved: boolean },
  minAmount: number = 500
): boolean => {
  if (!vendor.isVerified || !vendor.isApproved) return false;
  if (vendor.revenue < minAmount) return false;
  return true;
};

export const getVendorPayoutStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    failed: 'Failed',
    cancelled: 'Cancelled',
    approved: 'Approved',
    rejected: 'Rejected',
    on_hold: 'On Hold',
    scheduled: 'Scheduled',
    initiated: 'Initiated',
    confirmed: 'Confirmed',
  };
  return labels[status] || status;
};

export const getVendorPayoutMethodLabel = (method: string): string => {
  const labels: Record<string, string> = {
    bank_transfer: 'Bank Transfer',
    mobile_banking: 'Mobile Banking',
    payment_gateway: 'Payment Gateway',
    check: 'Check',
    cash: 'Cash',
  };
  return labels[method] || method;
};
