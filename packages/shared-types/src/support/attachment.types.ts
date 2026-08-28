/**
 * Attachment Types
 * Type definitions for support attachments based on shared-constants
 * @module AttachmentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support attachment
// ============================================================
import {
  // Attachment Core
  ATTACHMENT,
  AttachmentType,
  AttachmentStatus,
  AttachmentMimeType,
  attachmentGetTypeLabel,
  attachmentGetStatusLabel,
  attachmentGetMimeType,
  attachmentIsUploaded,
  attachmentIsFailed,
  attachmentIsProcessing,
  attachmentGetTypeFromMime,
  // Attachment Type
  ATTACHMENT_TYPE,
  AttachmentTypeType,
  AttachmentTypeCategory,
  AttachmentTypeIcon,
  AttachmentTypeColor,
  AttachmentTypeSizeLimit,
  attachmentTypeGetLabel,
  attachmentTypeGetIcon,
  attachmentTypeGetColor,
  attachmentTypeGetSizeLimit,
  attachmentTypeGetCategory,
} from '@vubon/shared-constants';

// ============================================================
// Attachment Extended Types
// ============================================================

/**
 * Attachment
 */
export interface Attachment extends BaseEntity, Timestamp {
  id: ID;
  messageId: ID;
  userId: ID;
  type: AttachmentType;
  status: AttachmentStatus;
  mimeType: AttachmentMimeType;
  filename: string;
  fileSize: number;
  url: string;
  thumbnailUrl?: string;
  isUploaded: boolean;
  isFailed: boolean;
  isProcessing: boolean;
  metadata?: Metadata;
}

/**
 * Attachment filter
 */
export interface AttachmentFilter {
  ids?: ID[];
  messageIds?: ID[];
  userIds?: ID[];
  types?: AttachmentType[];
  statuses?: AttachmentStatus[];
  mimeTypes?: AttachmentMimeType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minFileSize?: number;
  maxFileSize?: number;
  isUploaded?: boolean;
  isFailed?: boolean;
  isProcessing?: boolean;
  searchTerm?: string;
  filename?: string;
}

/**
 * Attachment statistics
 */
export interface AttachmentStatistics {
  messageId: ID;
  totalAttachments: number;
  uploadedAttachments: number;
  failedAttachments: number;
  processingAttachments: number;
  byType: Record<AttachmentType, number>;
  byStatus: Record<AttachmentStatus, number>;
  byMimeType: Record<AttachmentMimeType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalFileSize: number;
  averageFileSize: number;
  maxFileSize: number;
  minFileSize: number;
  mostFrequentType: AttachmentType;
  mostFrequentStatus: AttachmentStatus;
  mostFrequentMimeType: AttachmentMimeType;
}

/**
 * Attachment summary
 */
export interface AttachmentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalAttachments: number;
  uploaded: number;
  failed: number;
  processing: number;
  byType: Record<AttachmentType, number>;
  byStatus: Record<AttachmentStatus, number>;
  byMimeType: Record<AttachmentMimeType, number>;
  attachmentTrend: {
    date: Date;
    total: number;
    uploaded: number;
    failed: number;
  }[];
  topTypes: {
    type: AttachmentType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: AttachmentStatus;
    count: number;
    label: string;
  }[];
  topMimeTypes: {
    mimeType: AttachmentMimeType;
    count: number;
    label: string;
  }[];
  storageSummary: {
    totalFileSize: number;
    averageFileSize: number;
    maxFileSize: number;
    minFileSize: number;
  };
}

/**
 * Attachment configuration
 */
export interface AttachmentConfiguration {
  enabled: boolean;
  maxFileSize: number;
  allowedTypes: AttachmentType[];
  allowedMimeTypes: AttachmentMimeType[];
  maxAttachmentsPerMessage: number;
  maxTotalFileSize: number;
  requireThumbnail: boolean;
  thumbnailSize: number;
  storage: 'local' | 's3' | 'cloudinary' | 'azure' | 'gcs';
  retentionDays: number;
  autoDelete: boolean;
  deleteAfterDays: number;
  notificationOnUpload: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AttachmentAlertConfig;
}

/**
 * Attachment alert configuration
 */
export interface AttachmentAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  storageLimitAlert: boolean;
  storageLimitThreshold: number;
  largeFileAlert: boolean;
  largeFileThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Attachment history
 */
export interface AttachmentHistory extends BaseEntity, Timestamp {
  id: ID;
  attachmentId: ID;
  messageId: ID;
  userId: ID;
  action: 'upload' | 'process' | 'complete' | 'fail' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Attachment validation
 */
export interface AttachmentValidation {
  isValid: boolean;
  attachmentId: ID;
  messageId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Attachment export
 */
export interface AttachmentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'zip';
  filter: AttachmentFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Attachment upload
 */
export interface AttachmentUpload extends BaseEntity, Timestamp {
  id: ID;
  attachmentId: ID;
  messageId: ID;
  userId: ID;
  chunkSize: number;
  totalChunks: number;
  uploadedChunks: number;
  status: 'pending' | 'uploading' | 'completed' | 'failed';
  uploadUrl?: string;
  uploadId?: string;
  startedAt?: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Attachment Core
  ATTACHMENT,
  AttachmentType,
  AttachmentStatus,
  AttachmentMimeType,
  attachmentGetTypeLabel,
  attachmentGetStatusLabel,
  attachmentGetMimeType,
  attachmentIsUploaded,
  attachmentIsFailed,
  attachmentIsProcessing,
  attachmentGetTypeFromMime,
  // Attachment Type
  ATTACHMENT_TYPE,
  AttachmentTypeType,
  AttachmentTypeCategory,
  AttachmentTypeIcon,
  AttachmentTypeColor,
  AttachmentTypeSizeLimit,
  attachmentTypeGetLabel,
  attachmentTypeGetIcon,
  attachmentTypeGetColor,
  attachmentTypeGetSizeLimit,
  attachmentTypeGetCategory,
};
