/**
 * Vendor Commission Formatter
 * ভেন্ডর কমিশন ফরম্যাটার
 */

import { formatCurrency } from '../../common/formatter';
import type { VendorCommission } from '@vubon/shared-types';

export interface FormattedVendorCommission {
  id: string;
  type: string;
  typeLabel: string;
  rate: number;
  fixedAmount: string;
  minAmount: string;
  maxAmount: string;
  isActive: boolean;
  effectiveFrom: string;
  effectiveTo: string;
}

export const formatVendorCommission = (
  commission: VendorCommission,
  currency: 'BDT' | 'USD' = 'BDT'
): FormattedVendorCommission => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  return {
    id: commission.id,
    type: commission.type,
    typeLabel: getVendorCommissionTypeLabel(commission.type),
    rate: commission.rate || 0,
    fixedAmount: commission.fixedAmount ? formatPrice(commission.fixedAmount) : '0',
    minAmount: commission.minAmount ? formatPrice(commission.minAmount) : '0',
    maxAmount: commission.maxAmount ? formatPrice(commission.maxAmount) : '0',
    isActive: commission.isActive || false,
    effectiveFrom: commission.effectiveFrom
      ? commission.effectiveFrom.toISOString().split('T')[0]
      : 'N/A',
    effectiveTo: commission.effectiveTo
      ? commission.effectiveTo.toISOString().split('T')[0]
      : 'N/A',
  };
};

export const formatVendorCommissionSummary = (
  commission: VendorCommission,
  saleAmount: number,
  currency: 'BDT' | 'USD' = 'BDT'
): string => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  const commissionAmount = (saleAmount * (commission.rate || 0)) / 100;
  return `Commission: ${formatPrice(commissionAmount)} (${commission.rate}%) on ${formatPrice(saleAmount)}`;
};

export const getVendorCommissionTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    fixed: 'Fixed',
    percentage: 'Percentage',
    tiered: 'Tiered',
    dynamic: 'Dynamic',
    category_based: 'Category Based',
  };
  return labels[type] || type;
};

export const formatVendorCommissionTable = (
  commissions: VendorCommission[],
  currency: 'BDT' | 'USD' = 'BDT'
): string => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  const headers = ['Type', 'Rate', 'Fixed Amount', 'Status', 'Effective From'];
  const rows = commissions.map((c) => [
    getVendorCommissionTypeLabel(c.type),
    `${c.rate}%`,
    c.fixedAmount ? formatPrice(c.fixedAmount) : 'N/A',
    c.isActive ? 'Active' : 'Inactive',
    c.effectiveFrom ? c.effectiveFrom.toISOString().split('T')[0] : 'N/A',
  ]);

  return [headers.join(' | '), ...rows.map((row) => row.join(' | '))].join('\n');
};
