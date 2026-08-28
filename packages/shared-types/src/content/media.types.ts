/**
 * Media Types
 * Type definitions for media based on shared-constants
 * @module MediaTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants media
// ============================================================
import {
  // Media Core
  CONTENT_MEDIA,
  ContentMediaType,
  ContentMediaStatus,
  ContentMediaFormat,
  ContentMediaMimeType,
  contentMediaGetTypeLabel,
  contentMediaGetStatusLabel,
  contentMediaGetFormatLabel,
  contentMediaGetMimeType,
  contentMediaGetSizeCategoryLabel,
  contentMediaGetDimension,
  contentMediaGetSizeLimit,
  contentMediaIsImage,
  contentMediaIsVideo,
  contentMediaIsAudio,
  contentMediaIsDocument,
  contentMediaIsArchive,
  contentMediaIsValidType,
  contentMediaIsValidStatus,
  contentMediaIsValidFormat,
  contentMediaGetDefaultQuality,
  contentMediaGetDefaultMaxWidth,
  contentMediaGetDefaultMaxHeight,
  contentMediaGetThumbnailWidth,
  contentMediaGetThumbnailHeight,
  contentMediaGetMaxFilenameLength,
  contentMediaGetMaxFileSizeGB,
  contentMediaGetMaxUploadBatch,
  // Media Status
  CONTENT_MEDIA_STATUS,
  ContentMediaStatusType,
  ContentMediaStatusCategory,
  ContentMediaStatusColor,
  ContentMediaStatusPriority,
  ContentMediaState,
  ContentMediaAction,
  contentMediaStatusGetLabel,
  contentMediaStatusGetCategory,
  contentMediaStatusGetColor,
  contentMediaStatusGetPriority,
  contentMediaStatusIsReady,
  contentMediaStatusIsProcessing,
  contentMediaStatusIsFailed,
  contentMediaStatusIsArchived,
  contentMediaStatusCanTransitionTo,
  contentMediaStatusGetAvailableTransitions,
  contentMediaStatusGetStateLabel,
  contentMediaStatusGetActionLabel,
  contentMediaStatusIsValid,
  contentMediaStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Media Extended Types
// ============================================================

/**
 * Media
 */
export interface Media extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  filename: string;
  type: ContentMediaType;
  status: ContentMediaStatusType;
  format: ContentMediaFormat;
  mimeType: ContentMediaMimeType;
  size: number;
  width?: number;
  height?: number;
  duration?: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  title?: string;
  description?: string;
  isImage: boolean;
  isVideo: boolean;
  isAudio: boolean;
  isDocument: boolean;
  isArchive: boolean;
  metadata?: Metadata;
}

/**
 * Media Filter
 */
export interface MediaFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentMediaType[];
  statuses?: ContentMediaStatusType[];
  formats?: ContentMediaFormat[];
  mimeTypes?: ContentMediaMimeType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minSize?: number;
  maxSize?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  isImage?: boolean;
  isVideo?: boolean;
  isAudio?: boolean;
  isDocument?: boolean;
  isArchive?: boolean;
  searchTerm?: string;
  folderId?: ID;
}

/**
 * Media Statistics
 */
export interface MediaStatistics {
  userId: ID;
  totalMedia: number;
  readyMedia: number;
  processingMedia: number;
  failedMedia: number;
  archivedMedia: number;
  byType: Record<ContentMediaType, number>;
  byStatus: Record<ContentMediaStatusType, number>;
  byFormat: Record<ContentMediaFormat, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalSize: number;
  averageSize: number;
  maxSize: number;
  minSize: number;
  totalWidth: number;
  averageWidth: number;
  maxWidth: number;
  minWidth: number;
  totalHeight: number;
  averageHeight: number;
  maxHeight: number;
  minHeight: number;
  mostFrequentType: ContentMediaType;
  mostFrequentFormat: ContentMediaFormat;
  mostFrequentStatus: ContentMediaStatusType;
}

/**
 * Media Summary
 */
export interface MediaSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  ready: number;
  processing: number;
  failed: number;
  archived: number;
  byType: Record<ContentMediaType, number>;
  byStatus: Record<ContentMediaStatusType, number>;
  byFormat: Record<ContentMediaFormat, number>;
  mediaTrend: {
    date: Date;
    total: number;
    ready: number;
    processing: number;
  }[];
  topTypes: {
    type: ContentMediaType;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: ContentMediaFormat;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentMediaStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Media Configuration
 */
export interface MediaConfiguration {
  enabled: boolean;
  defaultType: ContentMediaType;
  defaultStatus: ContentMediaStatusType;
  defaultFormat: ContentMediaFormat;
  defaultQuality: number;
  defaultMaxWidth: number;
  defaultMaxHeight: number;
  thumbnailWidth: number;
  thumbnailHeight: number;
  maxFilenameLength: number;
  maxFileSizeGB: number;
  maxUploadBatch: number;
  allowedTypes: ContentMediaType[];
  allowedFormats: ContentMediaFormat[];
  notificationOnUpload: boolean;
  notificationOnProcess: boolean;
  notificationOnReady: boolean;
  notificationOnFailure: boolean;
  alertConfig?: MediaAlertConfig;
}

/**
 * Media Alert Configuration
 */
export interface MediaAlertConfig {
  enabled: boolean;
  sizeLimitAlert: boolean;
  typeLimitAlert: boolean;
  formatLimitAlert: boolean;
  processingFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Media History
 */
export interface MediaHistory extends BaseEntity, Timestamp {
  id: ID;
  mediaId: ID;
  userId: ID;
  action: 'upload' | 'process' | 'ready' | 'fail' | 'archive' | 'restore' | 'delete' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Media Validation
 */
export interface MediaValidation {
  isValid: boolean;
  mediaId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Media Export
 */
export interface MediaExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'zip';
  filter: MediaFilter;
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
  // Media Core
  CONTENT_MEDIA,
  ContentMediaType,
  ContentMediaStatus,
  ContentMediaFormat,
  ContentMediaMimeType,
  contentMediaGetTypeLabel,
  contentMediaGetStatusLabel,
  contentMediaGetFormatLabel,
  contentMediaGetMimeType,
  contentMediaGetSizeCategoryLabel,
  contentMediaGetDimension,
  contentMediaGetSizeLimit,
  contentMediaIsImage,
  contentMediaIsVideo,
  contentMediaIsAudio,
  contentMediaIsDocument,
  contentMediaIsArchive,
  contentMediaIsValidType,
  contentMediaIsValidStatus,
  contentMediaIsValidFormat,
  contentMediaGetDefaultQuality,
  contentMediaGetDefaultMaxWidth,
  contentMediaGetDefaultMaxHeight,
  contentMediaGetThumbnailWidth,
  contentMediaGetThumbnailHeight,
  contentMediaGetMaxFilenameLength,
  contentMediaGetMaxFileSizeGB,
  contentMediaGetMaxUploadBatch,
  // Media Status
  CONTENT_MEDIA_STATUS,
  ContentMediaStatusType,
  ContentMediaStatusCategory,
  ContentMediaStatusColor,
  ContentMediaStatusPriority,
  ContentMediaState,
  ContentMediaAction,
  contentMediaStatusGetLabel,
  contentMediaStatusGetCategory,
  contentMediaStatusGetColor,
  contentMediaStatusGetPriority,
  contentMediaStatusIsReady,
  contentMediaStatusIsProcessing,
  contentMediaStatusIsFailed,
  contentMediaStatusIsArchived,
  contentMediaStatusCanTransitionTo,
  contentMediaStatusGetAvailableTransitions,
  contentMediaStatusGetStateLabel,
  contentMediaStatusGetActionLabel,
  contentMediaStatusIsValid,
  contentMediaStatusIsValidState,
};
