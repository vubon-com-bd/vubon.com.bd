/**
 * Insurance Claim Types
 * Type definitions for logistics insurance claims based on shared-constants
 * @module InsuranceClaimTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics insurance
// ============================================================
import {
  // Insurance Constants
  LOGISTICS_INSURANCE,
  LogisticsInsuranceType,
  LogisticsInsuranceStatus,
  LogisticsInsuranceProvider,
  LogisticsInsuranceCoverageType,
} from '@vubon/shared-constants';

// ============================================================
// Insurance Claim Extended Types
// ============================================================

/**
 * Insurance claim
 */
export interface InsuranceClaim extends BaseEntity, Timestamp {
  id: ID;
  insuranceId: ID;
  shipmentId: ID;
  userId: ID;
  claimNumber: string;
  amount: number;
  currency: string;
  reason: string;
  status: 'draft' | 'submitted' | 'processing' | 'approved' | 'rejected' | 'paid' | 'cancelled';
  documents: string[];
  submittedAt: Date;
  processedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  paidAt?: Date;
  rejectionReason?: string;
  metadata?: Metadata;
}

/**
 * Insurance claim filter
 */
export interface InsuranceClaimFilter {
  ids?: ID[];
  insuranceIds?: ID[];
  shipmentIds?: ID[];
  userIds?: ID[];
  statuses?: (
    'draft' | 'submitted' | 'processing' | 'approved' | 'rejected' | 'paid' | 'cancelled'
  )[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
  hasDocuments?: boolean;
  searchTerm?: string;
  claimNumber?: string;
}

/**
 * Insurance claim statistics
 */
export interface InsuranceClaimStatistics {
  insuranceId: ID;
  totalClaims: number;
  draftClaims: number;
  submittedClaims: number;
  processingClaims: number;
  approvedClaims: number;
  rejectedClaims: number;
  paidClaims: number;
  cancelledClaims: number;
  byStatus: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  totalPaidAmount: number;
  totalRejectedAmount: number;
  approvalRate: number;
  rejectionRate: number;
  averageProcessingTime: number;
  maxProcessingTime: number;
  minProcessingTime: number;
  mostFrequentStatus: string;
}

/**
 * Insurance claim summary
 */
export interface InsuranceClaimSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalClaims: number;
  draft: number;
  submitted: number;
  processing: number;
  approved: number;
  rejected: number;
  paid: number;
  cancelled: number;
  byStatus: Record<string, number>;
  claimTrend: {
    date: Date;
    total: number;
    approved: number;
    rejected: number;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalAmount: number;
    averageAmount: number;
    maxAmount: number;
    minAmount: number;
    totalPaidAmount: number;
    totalRejectedAmount: number;
  };
  performanceMetrics: {
    approvalRate: number;
    rejectionRate: number;
    averageProcessingTime: number;
    maxProcessingTime: number;
    minProcessingTime: number;
  };
}

/**
 * Insurance claim configuration
 */
export interface InsuranceClaimConfiguration {
  enabled: boolean;
  requireDocuments: boolean;
  requireReason: boolean;
  autoApprove: boolean;
  autoApproveThreshold: number;
  maxClaimAmount: number;
  minClaimAmount: number;
  processingTimeDays: number;
  notificationOnSubmit: boolean;
  notificationOnProcess: boolean;
  notificationOnApprove: boolean;
  notificationOnReject: boolean;
  notificationOnPay: boolean;
  alertConfig?: InsuranceClaimAlertConfig;
}

/**
 * Insurance claim alert configuration
 */
export interface InsuranceClaimAlertConfig {
  enabled: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  processingDelayAlert: boolean;
  processingDelayThreshold: number;
  rejectionAlert: boolean;
  suspiciousClaimAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Insurance claim history
 */
export interface InsuranceClaimHistory extends BaseEntity, Timestamp {
  id: ID;
  claimId: ID;
  insuranceId: ID;
  shipmentId: ID;
  userId: ID;
  action: 'create' | 'submit' | 'process' | 'approve' | 'reject' | 'pay' | 'cancel' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Insurance claim validation
 */
export interface InsuranceClaimValidation {
  isValid: boolean;
  claimId: ID;
  insuranceId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Insurance claim document
 */
export interface InsuranceClaimDocument extends BaseEntity, Timestamp {
  id: ID;
  claimId: ID;
  insuranceId: ID;
  documentUrl: string;
  documentType: string;
  documentName: string;
  uploadedAt: Date;
  metadata?: Metadata;
}

/**
 * Insurance claim export
 */
export interface InsuranceClaimExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: InsuranceClaimFilter;
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
  // Insurance Constants
  LOGISTICS_INSURANCE,
  LogisticsInsuranceType,
  LogisticsInsuranceStatus,
  LogisticsInsuranceProvider,
  LogisticsInsuranceCoverageType,
};
