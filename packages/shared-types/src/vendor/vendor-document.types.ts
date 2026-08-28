/**
 * Vendor Document Types
 * Type definitions for vendor documents based on shared-constants
 * @module VendorDocumentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor document
// ============================================================
import {
  // Vendor Document
  VENDOR_DOCUMENT,
  VendorDocumentType,
  VendorDocumentStatus,
  VendorDocumentCategory,
  VendorDocumentFormat,
  vendorDocumentGetTypeLabel,
  vendorDocumentGetStatusLabel,
  vendorDocumentGetCategory,
  vendorDocumentGetFormatLabel,
  vendorDocumentIsVerified,
  vendorDocumentIsPending,
  vendorDocumentIsRejected,
  vendorDocumentGetExpiryMonths,
  // Vendor Document Type
  VENDOR_DOCUMENT_TYPE,
  VendorDocumentTypeType,
  VendorDocumentTypeCategory,
  VendorDocumentImportance,
  VendorDocumentVerification,
  vendorDocumentTypeGetLabel,
  vendorDocumentTypeGetCategory,
  vendorDocumentTypeGetImportance,
  vendorDocumentTypeGetVerification,
  vendorDocumentTypeGetProcessingTime,
  // Vendor Document Status
  VENDOR_DOCUMENT_STATUS,
  VendorDocumentStatusType,
  VendorDocumentStatusCategory,
  VendorDocumentStatusColor,
  VendorDocumentStatusIcon,
  VendorDocumentStatusTransition,
  vendorDocumentStatusGetLabel,
  vendorDocumentStatusIsVerified,
  vendorDocumentStatusIsPending,
  vendorDocumentStatusIsRejected,
  vendorDocumentStatusIsExpired,
  vendorDocumentStatusGetCategory,
  vendorDocumentStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Document Extended Types
// ============================================================

/**
 * Vendor document
 */
export interface VendorDocument extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorDocumentTypeType;
  status: VendorDocumentStatusType;
  category: VendorDocumentCategory;
  format: VendorDocumentFormat;
  name: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  description?: string;
  documentNumber?: string;
  issueDate?: Date;
  expiryDate?: Date;
  isVerified: boolean;
  isPending: boolean;
  isRejected: boolean;
  isExpired: boolean;
  verificationStatus: VendorDocumentVerification;
  importance: VendorDocumentImportance;
  processingTime?: number;
  verifiedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  metadata?: Metadata;
}

/**
 * Vendor document filter
 */
export interface VendorDocumentFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorDocumentTypeType[];
  statuses?: VendorDocumentStatusType[];
  categories?: VendorDocumentCategory[];
  formats?: VendorDocumentFormat[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isVerified?: boolean;
  isPending?: boolean;
  isRejected?: boolean;
  isExpired?: boolean;
  searchTerm?: string;
  documentNumber?: string;
}

/**
 * Vendor document statistics
 */
export interface VendorDocumentStatistics {
  vendorId: ID;
  totalDocuments: number;
  verifiedDocuments: number;
  pendingDocuments: number;
  rejectedDocuments: number;
  expiredDocuments: number;
  byType: Record<VendorDocumentTypeType, number>;
  byStatus: Record<VendorDocumentStatusType, number>;
  byCategory: Record<VendorDocumentCategory, number>;
  byFormat: Record<VendorDocumentFormat, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageFileSize: number;
  maxFileSize: number;
  minFileSize: number;
  mostFrequentType: VendorDocumentTypeType;
  mostFrequentStatus: VendorDocumentStatusType;
  mostFrequentCategory: VendorDocumentCategory;
  verificationSuccessRate: number;
  verificationFailureRate: number;
}

/**
 * Vendor document summary
 */
export interface VendorDocumentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalDocuments: number;
  verified: number;
  pending: number;
  rejected: number;
  expired: number;
  byType: Record<VendorDocumentTypeType, number>;
  byStatus: Record<VendorDocumentStatusType, number>;
  byCategory: Record<VendorDocumentCategory, number>;
  byFormat: Record<VendorDocumentFormat, number>;
  documentTrend: {
    date: Date;
    total: number;
    verified: number;
    rejected: number;
  }[];
  topTypes: {
    type: VendorDocumentTypeType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorDocumentStatusType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorDocumentCategory;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: VendorDocumentFormat;
    count: number;
    label: string;
  }[];
}

/**
 * Vendor document configuration
 */
export interface VendorDocumentConfiguration {
  enabled: boolean;
  requireName: boolean;
  requireFileName: boolean;
  requireFileUrl: boolean;
  requireFileSize: boolean;
  requireMimeType: boolean;
  maxFileSize: number;
  allowedMimeTypes: string[];
  allowedFormats: VendorDocumentFormat[];
  requireVerification: boolean;
  verificationTimeoutDays: number;
  autoVerify: boolean;
  allowMultipleDocuments: boolean;
  maxDocumentsPerVendor: number;
  notificationOnUpload: boolean;
  notificationOnVerification: boolean;
  notificationOnRejection: boolean;
  notificationOnExpiry: boolean;
  alertConfig?: VendorDocumentAlertConfig;
}

/**
 * Vendor document alert configuration
 */
export interface VendorDocumentAlertConfig {
  enabled: boolean;
  expiryAlert: boolean;
  expiryThresholdDays: number;
  verificationFailureAlert: boolean;
  invalidFormatAlert: boolean;
  largeFileAlert: boolean;
  largeFileThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor document history
 */
export interface VendorDocumentHistory extends BaseEntity, Timestamp {
  id: ID;
  documentId: ID;
  vendorId: ID;
  userId: ID;
  action: 'upload' | 'update' | 'verify' | 'unverify' | 'reject' | 'delete' | 'restore' | 'expire';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor document validation
 */
export interface VendorDocumentValidation {
  isValid: boolean;
  documentId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor document export
 */
export interface VendorDocumentExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorDocumentFilter;
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
  // Vendor Document
  VENDOR_DOCUMENT,
  VendorDocumentType,
  VendorDocumentStatus,
  VendorDocumentCategory,
  VendorDocumentFormat,
  vendorDocumentGetTypeLabel,
  vendorDocumentGetStatusLabel,
  vendorDocumentGetCategory,
  vendorDocumentGetFormatLabel,
  vendorDocumentIsVerified,
  vendorDocumentIsPending,
  vendorDocumentIsRejected,
  vendorDocumentGetExpiryMonths,
  // Vendor Document Type
  VENDOR_DOCUMENT_TYPE,
  VendorDocumentTypeType,
  VendorDocumentTypeCategory,
  VendorDocumentImportance,
  VendorDocumentVerification,
  vendorDocumentTypeGetLabel,
  vendorDocumentTypeGetCategory,
  vendorDocumentTypeGetImportance,
  vendorDocumentTypeGetVerification,
  vendorDocumentTypeGetProcessingTime,
  // Vendor Document Status
  VENDOR_DOCUMENT_STATUS,
  VendorDocumentStatusType,
  VendorDocumentStatusCategory,
  VendorDocumentStatusColor,
  VendorDocumentStatusIcon,
  VendorDocumentStatusTransition,
  vendorDocumentStatusGetLabel,
  vendorDocumentStatusIsVerified,
  vendorDocumentStatusIsPending,
  vendorDocumentStatusIsRejected,
  vendorDocumentStatusIsExpired,
  vendorDocumentStatusGetCategory,
  vendorDocumentStatusCanTransition,
};
