/**
 * Vendor Payout Method Types
 * Type definitions for vendor payout methods based on shared-constants
 * @module VendorPayoutMethodTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Currency } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor payout
// ============================================================
import {
  // Vendor Payout Method
  VENDOR_PAYOUT_METHOD,
  VendorPayoutMethodType,
  VendorPayoutMethodCategory,
  VendorPayoutMethodStatus,
  VendorPayoutMethodColor,
  VendorPayoutMethodIcon,
  VendorPayoutMethodLimits,
  vendorPayoutMethodGetLabel,
  vendorPayoutMethodGetCategory,
  vendorPayoutMethodGetStatusLabel,
  vendorPayoutMethodGetColor,
  vendorPayoutMethodGetIcon,
  vendorPayoutMethodGetProcessingTime,
  vendorPayoutMethodGetLimits,
  vendorPayoutMethodGetFee,
  vendorPayoutMethodIsActive,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Payout Method Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Vendor payout method filter
 */
export interface VendorPayoutMethodFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorPayoutMethodType[];
  categories?: VendorPayoutMethodCategory[];
  statuses?: VendorPayoutMethodStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  minFee?: number;
  maxFee?: number;
  minAmount?: number;
  maxAmount?: number;
  currencies?: Currency[];
  searchTerm?: string;
}

/**
 * Vendor payout method statistics
 */
export interface VendorPayoutMethodStatistics {
  vendorId: ID;
  totalMethods: number;
  activeMethods: number;
  defaultMethods: number;
  byType: Record<VendorPayoutMethodType, number>;
  byCategory: Record<VendorPayoutMethodCategory, number>;
  byStatus: Record<VendorPayoutMethodStatus, number>;
  byCurrency: Record<Currency, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageFee: number;
  maxFee: number;
  minFee: number;
  averageProcessingTime: number;
  maxProcessingTime: number;
  minProcessingTime: number;
  averageMinAmount: number;
  averageMaxAmount: number;
  mostFrequentType: VendorPayoutMethodType;
  mostFrequentCategory: VendorPayoutMethodCategory;
  mostFrequentStatus: VendorPayoutMethodStatus;
  mostFrequentCurrency: Currency;
}

/**
 * Vendor payout method summary
 */
export interface VendorPayoutMethodSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalMethods: number;
  active: number;
  default: number;
  byType: Record<VendorPayoutMethodType, number>;
  byCategory: Record<VendorPayoutMethodCategory, number>;
  byStatus: Record<VendorPayoutMethodStatus, number>;
  byCurrency: Record<Currency, number>;
  methodTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: VendorPayoutMethodType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorPayoutMethodCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorPayoutMethodStatus;
    count: number;
    label: string;
  }[];
  topCurrencies: {
    currency: Currency;
    count: number;
    label: string;
  }[];
  feeSummary: {
    averageFee: number;
    maxFee: number;
    minFee: number;
  };
  processingSummary: {
    averageProcessingTime: number;
    maxProcessingTime: number;
    minProcessingTime: number;
  };
}

/**
 * Vendor payout method configuration
 */
export interface VendorPayoutMethodConfiguration {
  enabled: boolean;
  defaultType: VendorPayoutMethodType;
  defaultCategory: VendorPayoutMethodCategory;
  minFee: number;
  maxFee: number;
  minAmount: number;
  maxAmount: number;
  allowedCurrencies: Currency[];
  requireVerification: boolean;
  autoActivate: boolean;
  allowMultipleMethods: boolean;
  maxMethodsPerVendor: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnActivation: boolean;
  notificationOnDeactivation: boolean;
  alertConfig?: VendorPayoutMethodAlertConfig;
}

/**
 * Vendor payout method alert configuration
 */
export interface VendorPayoutMethodAlertConfig {
  enabled: boolean;
  feeChangeAlert: boolean;
  feeChangeThreshold: number;
  limitChangeAlert: boolean;
  currencyChangeAlert: boolean;
  verificationFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor payout method history
 */
export interface VendorPayoutMethodHistory extends BaseEntity, Timestamp {
  id: ID;
  methodId: ID;
  vendorId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'set_default'
    | 'unset_default';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor payout method validation
 */
export interface VendorPayoutMethodValidation {
  isValid: boolean;
  methodId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor payout method export
 */
export interface VendorPayoutMethodExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorPayoutMethodFilter;
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
  // Vendor Payout Method
  VENDOR_PAYOUT_METHOD,
  VendorPayoutMethodType,
  VendorPayoutMethodCategory,
  VendorPayoutMethodStatus,
  VendorPayoutMethodColor,
  VendorPayoutMethodIcon,
  VendorPayoutMethodLimits,
  vendorPayoutMethodGetLabel,
  vendorPayoutMethodGetCategory,
  vendorPayoutMethodGetStatusLabel,
  vendorPayoutMethodGetColor,
  vendorPayoutMethodGetIcon,
  vendorPayoutMethodGetProcessingTime,
  vendorPayoutMethodGetLimits,
  vendorPayoutMethodGetFee,
  vendorPayoutMethodIsActive,
};
