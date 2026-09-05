/**
 * Vendor Commission Calculator
 * ভেন্ডর কমিশন ক্যালকুলেটর
 */

import { COMMISSION } from '@vubon/shared-constants';
import type { VendorCommission } from '@vubon/shared-types';

export interface VendorCommissionCalculation {
  type: string;
  rate: number;
  fixedAmount: number;
  totalCommission: number;
  netAmount: number;
  currency: string;
}

export const calculateVendorCommission = (
  saleAmount: number,
  commission: VendorCommission
): VendorCommissionCalculation => {
  const rate = commission.rate || 0;
  const fixedAmount = commission.fixedAmount || 0;
  let totalCommission = 0;

  // COMMISSION টাইপ ব্যবহার করে চেক করা
  const commissionType = commission.type as keyof typeof COMMISSION.TYPES;
  const isValidType = Object.keys(COMMISSION.TYPES).includes(commissionType);

  switch (commission.type) {
    case COMMISSION.TYPES.PERCENTAGE:
      totalCommission = (saleAmount * rate) / 100;
      break;
    case COMMISSION.TYPES.FIXED:
      totalCommission = fixedAmount;
      break;
    case COMMISSION.TYPES.TIERED:
      // Tiered commission logic
      if (saleAmount <= 1000) totalCommission = (saleAmount * 10) / 100;
      else if (saleAmount <= 5000) totalCommission = (saleAmount * 8) / 100;
      else if (saleAmount <= 10000) totalCommission = (saleAmount * 6) / 100;
      else totalCommission = (saleAmount * 4) / 100;
      break;
    case COMMISSION.TYPES.DYNAMIC:
      totalCommission = (saleAmount * rate) / 100 + fixedAmount;
      break;
    case COMMISSION.TYPES.CATEGORY_BASED:
      totalCommission = (saleAmount * rate) / 100;
      break;
    default:
      totalCommission = 0;
  }

  // Apply min/max limits
  if (commission.minAmount && totalCommission < commission.minAmount) {
    totalCommission = commission.minAmount;
  }
  if (commission.maxAmount && totalCommission > commission.maxAmount) {
    totalCommission = commission.maxAmount;
  }

  const netAmount = saleAmount - totalCommission;

  return {
    type: isValidType ? commission.type : 'unknown',
    rate,
    fixedAmount,
    totalCommission: Math.round(totalCommission * 100) / 100,
    netAmount: Math.round(netAmount * 100) / 100,
    currency: 'BDT',
  };
};

export const calculateVendorBulkCommission = (
  saleAmounts: number[],
  commission: VendorCommission
): VendorCommissionCalculation => {
  const totalSale = saleAmounts.reduce((sum, amount) => sum + amount, 0);
  return calculateVendorCommission(totalSale, commission);
};

export const calculateVendorCommissionRate = (
  saleAmount: number,
  tierRates: { min: number; max: number; rate: number }[]
): number => {
  let rate = 0;
  for (const tier of tierRates) {
    if (saleAmount >= tier.min && saleAmount <= tier.max) {
      rate = tier.rate;
      break;
    }
  }
  return rate;
};

// COMMISSION থেকে হেল্পার ফাংশন
export const getCommissionTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    fixed: 'Fixed',
    percentage: 'Percentage',
    tiered: 'Tiered',
    dynamic: 'Dynamic',
    category_based: 'Category Based',
  };
  return labels[type] || type;
};

export const getCommissionStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    processed: 'Processed',
    paid: 'Paid',
  };
  return labels[status] || status;
};
