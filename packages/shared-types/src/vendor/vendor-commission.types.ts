/**
 * Vendor Commission Types
 * Type definitions for vendor commission based on shared-constants
 * @module VendorCommissionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor
// ============================================================
import {
  // Vendor Commission
  VENDOR_COMMISSION,
  VendorCommissionType,
  VendorCommissionCategory,
  VendorCommissionStatus,
  VendorCommissionColor,
  VendorCommissionTier,
  VendorCommissionPeriod,
  vendorCommissionGetTypeLabel,
  vendorCommissionGetCategoryLabel,
  vendorCommissionGetStatusLabel,
  vendorCommissionGetColor,
  vendorCommissionGetRateForAmount,
  vendorCommissionCalculate,
  vendorCommissionIsActive,
  vendorCommissionGetPeriodLabel,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Commission Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Vendor commission filter
 */
export interface VendorCommissionFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorCommissionType[];
  categories?: VendorCommissionCategory[];
  statuses?: VendorCommissionStatus[];
  periods?: VendorCommissionPeriod[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  minRate?: number;
  maxRate?: number;
  minAmount?: number;
  maxAmount?: number;
  searchTerm?: string;
}

/**
 * Vendor commission statistics
 */
export interface VendorCommissionStatistics {
  vendorId: ID;
  totalCommissions: number;
  activeCommissions: number;
  defaultCommissions: number;
  byType: Record<VendorCommissionType, number>;
  byCategory: Record<VendorCommissionCategory, number>;
  byStatus: Record<VendorCommissionStatus, number>;
  byPeriod: Record<VendorCommissionPeriod, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageRate: number;
  maxRate: number;
  minRate: number;
  averageFixedAmount: number;
  maxFixedAmount: number;
  minFixedAmount: number;
  averageTiers: number;
  maxTiers: number;
  minTiers: number;
  mostFrequentType: VendorCommissionType;
  mostFrequentCategory: VendorCommissionCategory;
  mostFrequentStatus: VendorCommissionStatus;
  mostFrequentPeriod: VendorCommissionPeriod;
}

/**
 * Vendor commission summary
 */
export interface VendorCommissionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalCommissions: number;
  active: number;
  default: number;
  byType: Record<VendorCommissionType, number>;
  byCategory: Record<VendorCommissionCategory, number>;
  byStatus: Record<VendorCommissionStatus, number>;
  byPeriod: Record<VendorCommissionPeriod, number>;
  commissionTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: VendorCommissionType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorCommissionCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorCommissionStatus;
    count: number;
    label: string;
  }[];
  topPeriods: {
    period: VendorCommissionPeriod;
    count: number;
    label: string;
  }[];
  financialImpact: {
    averageRate: number;
    maxRate: number;
    minRate: number;
    averageFixedAmount: number;
    maxFixedAmount: number;
    minFixedAmount: number;
  };
}

/**
 * Vendor commission configuration
 */
export interface VendorCommissionConfiguration {
  enabled: boolean;
  defaultType: VendorCommissionType;
  defaultCategory: VendorCommissionCategory;
  defaultPeriod: VendorCommissionPeriod;
  defaultRate: number;
  minRate: number;
  maxRate: number;
  allowFixedAmount: boolean;
  allowTieredPricing: boolean;
  maxTiers: number;
  autoApply: boolean;
  requireApproval: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnExpiry: boolean;
  notificationOnTierChange: boolean;
  alertConfig?: VendorCommissionAlertConfig;
}

/**
 * Vendor commission alert configuration
 */
export interface VendorCommissionAlertConfig {
  enabled: boolean;
  rateChangeAlert: boolean;
  rateChangeThreshold: number;
  expiryAlert: boolean;
  expiryThresholdDays: number;
  tierChangeAlert: boolean;
  highRateAlert: boolean;
  highRateThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor commission history
 */
export interface VendorCommissionHistory extends BaseEntity, Timestamp {
  id: ID;
  commissionId: ID;
  vendorId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'expire'
    | 'delete'
    | 'restore'
    | 'tier_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor commission validation
 */
export interface VendorCommissionValidation {
  isValid: boolean;
  commissionId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor commission export
 */
export interface VendorCommissionExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorCommissionFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Vendor Commission
  VENDOR_COMMISSION,
  VendorCommissionType,
  VendorCommissionCategory,
  VendorCommissionStatus,
  VendorCommissionColor,
  VendorCommissionTier,
  VendorCommissionPeriod,
  vendorCommissionGetTypeLabel,
  vendorCommissionGetCategoryLabel,
  vendorCommissionGetStatusLabel,
  vendorCommissionGetColor,
  vendorCommissionGetRateForAmount,
  vendorCommissionCalculate,
  vendorCommissionIsActive,
  vendorCommissionGetPeriodLabel,
};
