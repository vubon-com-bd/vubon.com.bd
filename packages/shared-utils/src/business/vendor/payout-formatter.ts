/**
 * Vendor Payout Formatter
 * ভেন্ডর পেআউট ফরম্যাটার
 */

import { formatDate, formatCurrency } from '../../common/formatter';
import type { VendorPayout } from '@vubon/shared-types';

export interface FormattedVendorPayout {
  id: string;
  amount: string;
  currency: string;
  status: string;
  statusLabel: string;
  method: string;
  referenceId: string;
  requestedDate: string;
  processedDate: string;
  completedDate: string;
  description: string;
}

export const formatVendorPayout = (
  payout: VendorPayout,
  currency: 'BDT' | 'USD' = 'BDT'
): FormattedVendorPayout => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  let methodName = 'N/A';
  if (payout.method) {
    if (typeof payout.method === 'string') {
      methodName = payout.method;
    } else if (typeof payout.method === 'object' && payout.method !== null) {
      const methodObj = payout.method as { name?: string; type?: string };
      methodName = methodObj.name || methodObj.type || 'N/A';
    }
  }

  return {
    id: payout.id,
    amount: formatPrice(payout.amount),
    currency: payout.currency || 'BDT',
    status: payout.status,
    statusLabel: formatPayoutStatusLabel(payout.status),
    method: methodName,
    referenceId: payout.referenceId || 'N/A',
    requestedDate: formatDate(payout.requestedAt, 'DD-MM-YYYY HH:mm'),
    processedDate: payout.processedAt ? formatDate(payout.processedAt, 'DD-MM-YYYY HH:mm') : 'N/A',
    completedDate: payout.completedAt ? formatDate(payout.completedAt, 'DD-MM-YYYY HH:mm') : 'N/A',
    description: payout.description || 'N/A',
  };
};

export const formatPayoutStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Pending',
    processing: 'Processing',
    completed: 'Completed',
    failed: 'Failed',
    cancelled: 'Cancelled',
    deleted: 'Deleted',
    approved: 'Approved',
    rejected: 'Rejected',
    on_hold: 'On Hold',
    scheduled: 'Scheduled',
    initiated: 'Initiated',
    confirmed: 'Confirmed',
  };
  return labels[status] || status;
};

export const getVendorPayoutStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: 'yellow',
    processing: 'blue',
    completed: 'green',
    failed: 'red',
    cancelled: 'gray',
    deleted: 'gray',
    approved: 'green',
    rejected: 'red',
    on_hold: 'orange',
    scheduled: 'purple',
    initiated: 'blue',
    confirmed: 'green',
  };
  return colors[status] || 'gray';
};

export const formatVendorPayoutSummary = (
  payout: VendorPayout,
  currency: 'BDT' | 'USD' = 'BDT'
): string => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  return `Payout #${payout.id.slice(0, 8)} - ${formatPrice(payout.amount)} - ${formatPayoutStatusLabel(payout.status)}`;
};

export const formatVendorPayoutTable = (
  payouts: VendorPayout[],
  currency: 'BDT' | 'USD' = 'BDT'
): string => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  const headers = ['ID', 'Amount', 'Status', 'Requested Date', 'Completed Date'];
  const rows = payouts.map((p) => [
    p.id.slice(0, 8),
    formatPrice(p.amount),
    formatPayoutStatusLabel(p.status),
    formatDate(p.requestedAt, 'DD-MM-YYYY'),
    p.completedAt ? formatDate(p.completedAt, 'DD-MM-YYYY') : 'N/A',
  ]);

  return [headers.join(' | '), ...rows.map((row) => row.join(' | '))].join('\n');
};

export const formatVendorPayoutTotal = (
  payouts: VendorPayout[],
  currency: 'BDT' | 'USD' = 'BDT'
): {
  totalAmount: string;
  totalCount: number;
  pendingAmount: string;
  completedAmount: string;
  failedAmount: string;
} => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  let totalAmount = 0;
  let pendingAmount = 0;
  let completedAmount = 0;
  let failedAmount = 0;
  let totalCount = 0;

  for (const payout of payouts) {
    totalAmount += payout.amount;
    totalCount++;
    switch (payout.status) {
      case 'pending':
      case 'processing':
      case 'approved':
        pendingAmount += payout.amount;
        break;
      case 'completed':
      case 'confirmed':
        completedAmount += payout.amount;
        break;
      case 'failed':
      case 'rejected':
        failedAmount += payout.amount;
        break;
    }
  }

  return {
    totalAmount: formatPrice(totalAmount),
    totalCount,
    pendingAmount: formatPrice(pendingAmount),
    completedAmount: formatPrice(completedAmount),
    failedAmount: formatPrice(failedAmount),
  };
};
