/**
 * Vendor Formatter
 * ভেন্ডর ফরম্যাটার
 */

import { formatDate, formatCurrency } from '../../common/formatter';
import type { Vendor } from '@vubon/shared-types';

export interface FormattedVendor {
  id: string;
  name: string;
  nameBangla?: string;
  status: string;
  statusLabel: string;
  type: string;
  typeLabel: string;
  tier: string;
  tierLabel: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  orderCount: number;
  revenue: string;
  isVerified: boolean;
  isApproved: boolean;
  joinedDate: string;
  lastActiveDate: string;
}

export const formatVendor = (vendor: Vendor, currency: 'BDT' | 'USD' = 'BDT'): FormattedVendor => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  return {
    id: vendor.id,
    name: vendor.name,
    nameBangla: vendor.nameBangla,
    status: vendor.status,
    statusLabel: getVendorStatusLabel(vendor.status),
    type: vendor.type,
    typeLabel: getVendorTypeLabel(vendor.type),
    tier: vendor.tier,
    tierLabel: formatVendorTierLabel(vendor.tier),
    rating: vendor.rating || 0,
    reviewCount: vendor.reviewCount || 0,
    productCount: vendor.productCount || 0,
    orderCount: vendor.orderCount || 0,
    revenue: formatPrice(vendor.revenue || 0),
    isVerified: vendor.isVerified || false,
    isApproved: vendor.isApproved || false,
    joinedDate: formatDate(vendor.joinedAt, 'DD-MM-YYYY'),
    lastActiveDate: vendor.lastActiveAt
      ? formatDate(vendor.lastActiveAt, 'DD-MM-YYYY HH:mm')
      : 'Never',
  };
};

export const getVendorStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    suspended: 'Suspended',
    deleted: 'Deleted',
    approved: 'Approved',
    rejected: 'Rejected',
    verified: 'Verified',
    unverified: 'Unverified',
    on_hold: 'On Hold',
    registered: 'Registered',
    onboarding: 'Onboarding',
    completed: 'Completed',
    expired: 'Expired',
  };
  return labels[status] || status;
};

export const getVendorTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    individual: 'Individual',
    business: 'Business',
    manufacturer: 'Manufacturer',
    distributor: 'Distributor',
    wholesaler: 'Wholesaler',
    retailer: 'Retailer',
    importer: 'Importer',
    exporter: 'Exporter',
    dropshipper: 'Dropshipper',
    agent: 'Agent',
    broker: 'Broker',
    franchise: 'Franchise',
    contractor: 'Contractor',
  };
  return labels[type] || type;
};

export const formatVendorTierLabel = (tier: string): string => {
  const labels: Record<string, string> = {
    basic: 'Basic',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
    diamond: 'Diamond',
    enterprise: 'Enterprise',
    starter: 'Starter',
    professional: 'Professional',
    premium: 'Premium',
    ultimate: 'Ultimate',
  };
  return labels[tier] || tier;
};

export const formatVendorSummary = (vendor: Vendor, currency: 'BDT' | 'USD' = 'BDT'): string => {
  const formatPrice = (amount: number): string => {
    return formatCurrency(amount, currency);
  };

  return `${vendor.name} - ${vendor.productCount} products - Revenue: ${formatPrice(vendor.revenue || 0)} - Rating: ${vendor.rating || 0}/5`;
};
