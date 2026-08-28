/**
 * Vendor Return Policy Types
 * Type definitions for vendor return policies based on shared-constants
 * @module VendorReturnPolicyTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor return policy
// ============================================================
import {
  // Vendor Return Policy
  VENDOR_RETURN_POLICY,
  VendorReturnPolicyType,
  VendorReturnPolicyStatus,
  VendorReturnReason,
  VendorReturnCondition,
  VendorReturnRestriction,
  vendorReturnPolicyGetTypeLabel,
  vendorReturnPolicyGetStatusLabel,
  vendorReturnPolicyGetReasonLabel,
  vendorReturnPolicyGetPeriodDays,
  vendorReturnPolicyIsActive,
  vendorReturnPolicyIsReturnable,
  vendorReturnPolicyGetFee,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Return Policy Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Vendor return policy filter
 */
export interface VendorReturnPolicyFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorReturnPolicyType[];
  statuses?: VendorReturnPolicyStatus[];
  reasons?: VendorReturnReason[];
  conditions?: VendorReturnCondition[];
  restrictions?: VendorReturnRestriction[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isReturnable?: boolean;
  minPeriodDays?: number;
  maxPeriodDays?: number;
  minFee?: number;
  maxFee?: number;
  searchTerm?: string;
}

/**
 * Vendor return policy statistics
 */
export interface VendorReturnPolicyStatistics {
  vendorId: ID;
  totalPolicies: number;
  activePolicies: number;
  returnablePolicies: number;
  byType: Record<VendorReturnPolicyType, number>;
  byStatus: Record<VendorReturnPolicyStatus, number>;
  byReason: Record<VendorReturnReason, number>;
  byCondition: Record<VendorReturnCondition, number>;
  byRestriction: Record<VendorReturnRestriction, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePeriodDays: number;
  maxPeriodDays: number;
  minPeriodDays: number;
  averageFee: number;
  maxFee: number;
  minFee: number;
  mostFrequentType: VendorReturnPolicyType;
  mostFrequentStatus: VendorReturnPolicyStatus;
  mostFrequentReason: VendorReturnReason;
  mostFrequentCondition: VendorReturnCondition;
}

/**
 * Vendor return policy summary
 */
export interface VendorReturnPolicySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPolicies: number;
  active: number;
  returnable: number;
  byType: Record<VendorReturnPolicyType, number>;
  byStatus: Record<VendorReturnPolicyStatus, number>;
  byReason: Record<VendorReturnReason, number>;
  byCondition: Record<VendorReturnCondition, number>;
  byRestriction: Record<VendorReturnRestriction, number>;
  policyTrend: {
    date: Date;
    total: number;
    active: number;
    returnable: number;
  }[];
  topTypes: {
    type: VendorReturnPolicyType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorReturnPolicyStatus;
    count: number;
    label: string;
  }[];
  topReasons: {
    reason: VendorReturnReason;
    count: number;
    label: string;
  }[];
  topConditions: {
    condition: VendorReturnCondition;
    count: number;
    label: string;
  }[];
  periodSummary: {
    averagePeriodDays: number;
    maxPeriodDays: number;
    minPeriodDays: number;
  };
  feeSummary: {
    averageFee: number;
    maxFee: number;
    minFee: number;
  };
}

/**
 * Vendor return policy configuration
 */
export interface VendorReturnPolicyConfiguration {
  enabled: boolean;
  defaultType: VendorReturnPolicyType;
  defaultPeriodDays: number;
  defaultFee: number;
  defaultFeeType: 'fixed' | 'percentage';
  defaultReturnShippingCost: 'vendor' | 'customer' | 'shared';
  requireApproval: boolean;
  requireReason: boolean;
  requireImages: boolean;
  requireOriginalPackaging: boolean;
  allowPartialReturn: boolean;
  allowExchange: boolean;
  maxReturnPeriodDays: number;
  minReturnPeriodDays: number;
  maxFee: number;
  minFee: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnReturn: boolean;
  alertConfig?: VendorReturnPolicyAlertConfig;
}

/**
 * Vendor return policy alert configuration
 */
export interface VendorReturnPolicyAlertConfig {
  enabled: boolean;
  highReturnRateAlert: boolean;
  highReturnRateThreshold: number;
  policyViolationAlert: boolean;
  returnFraudAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor return policy history
 */
export interface VendorReturnPolicyHistory extends BaseEntity, Timestamp {
  id: ID;
  policyId: ID;
  vendorId: ID;
  userId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor return policy validation
 */
export interface VendorReturnPolicyValidation {
  isValid: boolean;
  policyId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor return policy export
 */
export interface VendorReturnPolicyExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorReturnPolicyFilter;
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
  // Vendor Return Policy
  VENDOR_RETURN_POLICY,
  VendorReturnPolicyType,
  VendorReturnPolicyStatus,
  VendorReturnReason,
  VendorReturnCondition,
  VendorReturnRestriction,
  vendorReturnPolicyGetTypeLabel,
  vendorReturnPolicyGetStatusLabel,
  vendorReturnPolicyGetReasonLabel,
  vendorReturnPolicyGetPeriodDays,
  vendorReturnPolicyIsActive,
  vendorReturnPolicyIsReturnable,
  vendorReturnPolicyGetFee,
};
