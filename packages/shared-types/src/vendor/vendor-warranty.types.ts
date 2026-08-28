/**
 * Vendor Warranty Types
 * Type definitions for vendor warranties based on shared-constants
 * @module VendorWarrantyTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor warranty
// ============================================================
import {
  // Vendor Warranty
  VENDOR_WARRANTY,
  VendorWarrantyType,
  VendorWarrantyStatus,
  VendorWarrantyCoverage,
  VendorWarrantyCondition,
  VendorWarrantyExclusion,
  vendorWarrantyGetTypeLabel,
  vendorWarrantyGetStatusLabel,
  vendorWarrantyGetCoverageLabel,
  vendorWarrantyGetPeriodMonths,
  vendorWarrantyIsActive,
  vendorWarrantyIsValid,
  vendorWarrantyHasWarranty,
  vendorWarrantyGetExclusionLabel,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Warranty Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Vendor warranty filter
 */
export interface VendorWarrantyFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorWarrantyType[];
  statuses?: VendorWarrantyStatus[];
  coverages?: VendorWarrantyCoverage[];
  conditions?: VendorWarrantyCondition[];
  exclusions?: VendorWarrantyExclusion[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isValid?: boolean;
  hasWarranty?: boolean;
  minPeriodMonths?: number;
  maxPeriodMonths?: number;
  searchTerm?: string;
}

/**
 * Vendor warranty statistics
 */
export interface VendorWarrantyStatistics {
  vendorId: ID;
  totalWarranties: number;
  activeWarranties: number;
  expiredWarranties: number;
  cancelledWarranties: number;
  voidWarranties: number;
  pendingWarranties: number;
  byType: Record<VendorWarrantyType, number>;
  byStatus: Record<VendorWarrantyStatus, number>;
  byCoverage: Record<VendorWarrantyCoverage, number>;
  byCondition: Record<VendorWarrantyCondition, number>;
  byExclusion: Record<VendorWarrantyExclusion, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePeriodMonths: number;
  maxPeriodMonths: number;
  minPeriodMonths: number;
  mostFrequentType: VendorWarrantyType;
  mostFrequentStatus: VendorWarrantyStatus;
  mostFrequentCoverage: VendorWarrantyCoverage;
  mostFrequentCondition: VendorWarrantyCondition;
  mostFrequentExclusion: VendorWarrantyExclusion;
}

/**
 * Vendor warranty summary
 */
export interface VendorWarrantySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalWarranties: number;
  active: number;
  expired: number;
  cancelled: number;
  void: number;
  pending: number;
  byType: Record<VendorWarrantyType, number>;
  byStatus: Record<VendorWarrantyStatus, number>;
  byCoverage: Record<VendorWarrantyCoverage, number>;
  byCondition: Record<VendorWarrantyCondition, number>;
  byExclusion: Record<VendorWarrantyExclusion, number>;
  warrantyTrend: {
    date: Date;
    total: number;
    active: number;
    expired: number;
  }[];
  topTypes: {
    type: VendorWarrantyType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorWarrantyStatus;
    count: number;
    label: string;
  }[];
  topCoverages: {
    coverage: VendorWarrantyCoverage;
    count: number;
    label: string;
  }[];
  topConditions: {
    condition: VendorWarrantyCondition;
    count: number;
    label: string;
  }[];
  periodSummary: {
    averagePeriodMonths: number;
    maxPeriodMonths: number;
    minPeriodMonths: number;
  };
}

/**
 * Vendor warranty configuration
 */
export interface VendorWarrantyConfiguration {
  enabled: boolean;
  defaultType: VendorWarrantyType;
  defaultCoverage: VendorWarrantyCoverage;
  defaultPeriodMonths: number;
  requireTerms: boolean;
  requireDescription: boolean;
  allowExtendedWarranty: boolean;
  allowLifetimeWarranty: boolean;
  allowLimitedWarranty: boolean;
  maxWarrantyPeriodMonths: number;
  minWarrantyPeriodMonths: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnExpiry: boolean;
  notificationOnCancellation: boolean;
  alertConfig?: VendorWarrantyAlertConfig;
}

/**
 * Vendor warranty alert configuration
 */
export interface VendorWarrantyAlertConfig {
  enabled: boolean;
  expiryAlert: boolean;
  expiryThresholdDays: number;
  cancellationAlert: boolean;
  voidAlert: boolean;
  highClaimRateAlert: boolean;
  highClaimRateThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor warranty history
 */
export interface VendorWarrantyHistory extends BaseEntity, Timestamp {
  id: ID;
  warrantyId: ID;
  vendorId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'expire'
    | 'cancel'
    | 'void'
    | 'pending'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor warranty validation
 */
export interface VendorWarrantyValidation {
  isValid: boolean;
  warrantyId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor warranty export
 */
export interface VendorWarrantyExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorWarrantyFilter;
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
  // Vendor Warranty
  VENDOR_WARRANTY,
  VendorWarrantyType,
  VendorWarrantyStatus,
  VendorWarrantyCoverage,
  VendorWarrantyCondition,
  VendorWarrantyExclusion,
  vendorWarrantyGetTypeLabel,
  vendorWarrantyGetStatusLabel,
  vendorWarrantyGetCoverageLabel,
  vendorWarrantyGetPeriodMonths,
  vendorWarrantyIsActive,
  vendorWarrantyIsValid,
  vendorWarrantyHasWarranty,
  vendorWarrantyGetExclusionLabel,
};
