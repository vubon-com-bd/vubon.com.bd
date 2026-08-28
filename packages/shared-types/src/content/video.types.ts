/**
 * Video Types
 * Type definitions for videos based on shared-constants
 * @module VideoTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants video
// ============================================================
import {
  // Video Core
  CONTENT_VIDEO,
  ContentVideoType,
  ContentVideoStatus,
  ContentVideoFormat,
  ContentVideoResolution,
  ContentVideoQuality,
  ContentVideoAspectRatio,
  ContentVideoVisibility,
  ContentVideoSortOption,
  ContentVideoDimension,
  ContentVideoFrameRate,
  contentVideoGetTypeLabel,
  contentVideoGetStatusLabel,
  contentVideoGetFormatLabel,
  contentVideoGetResolutionLabel,
  contentVideoGetQualityLabel,
  contentVideoGetAspectRatioLabel,
  contentVideoGetVisibilityLabel,
  contentVideoGetSortOptionLabel,
  contentVideoGetDimension,
  contentVideoIsPublished,
  contentVideoIsEditable,
  contentVideoIsApproved,
  contentVideoIsProcessing,
  contentVideoGetDefaultStatus,
  contentVideoGetDefaultFormat,
  contentVideoGetDefaultResolution,
  contentVideoGetDefaultVisibility,
  contentVideoGetDefaultSort,
  contentVideoGetMaxTitleLength,
  contentVideoGetMaxDescriptionLength,
  contentVideoGetMaxDurationSeconds,
  contentVideoGetMinDurationSeconds,
  contentVideoGetMaxFileSizeGB,
  contentVideoIsValidType,
  contentVideoIsValidStatus,
  contentVideoIsValidFormat,
  contentVideoIsValidResolution,
  contentVideoIsValidAspectRatio,
  // Video Status
  CONTENT_VIDEO_STATUS,
  ContentVideoStatusType,
  ContentVideoStatusCategory,
  ContentVideoStatusColor,
  ContentVideoStatusPriority,
  ContentVideoState,
  ContentVideoAction,
  contentVideoStatusGetLabel,
  contentVideoStatusGetCategory,
  contentVideoStatusGetColor,
  contentVideoStatusGetPriority,
  contentVideoStatusIsPublished,
  contentVideoStatusIsEditable,
  contentVideoStatusIsProcessing,
  contentVideoStatusIsArchived,
  contentVideoStatusCanTransitionTo,
  contentVideoStatusGetAvailableTransitions,
  contentVideoStatusGetSequence,
  contentVideoStatusGetStateLabel,
  contentVideoStatusGetActionLabel,
  contentVideoStatusIsValid,
  contentVideoStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Video Extended Types
// ============================================================

/**
 * Video
 */
export interface Video extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  description: string;
  type: ContentVideoType;
  status: ContentVideoStatusType;
  format: ContentVideoFormat;
  resolution: ContentVideoResolution;
  quality: ContentVideoQuality;
  aspectRatio: ContentVideoAspectRatio;
  visibility: ContentVideoVisibility;
  sortOption: ContentVideoSortOption;
  dimension: ContentVideoDimension;
  frameRate?: ContentVideoFrameRate;
  url: string;
  thumbnailUrl?: string;
  duration: number;
  fileSize: number;
  isPublished: boolean;
  isEditable: boolean;
  isApproved: boolean;
  isProcessing: boolean;
  publishedAt?: Date;
  approvedAt?: Date;
  processedAt?: Date;
  metadata?: Metadata;
}

/**
 * Video Filter
 */
export interface VideoFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentVideoType[];
  statuses?: ContentVideoStatusType[];
  formats?: ContentVideoFormat[];
  resolutions?: ContentVideoResolution[];
  qualities?: ContentVideoQuality[];
  aspectRatios?: ContentVideoAspectRatio[];
  visibilities?: ContentVideoVisibility[];
  sortOptions?: ContentVideoSortOption[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  isApproved?: boolean;
  isProcessing?: boolean;
  minDuration?: number;
  maxDuration?: number;
  minFileSize?: number;
  maxFileSize?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * Video Statistics
 */
export interface VideoStatistics {
  userId: ID;
  totalVideos: number;
  publishedVideos: number;
  editableVideos: number;
  approvedVideos: number;
  processingVideos: number;
  byType: Record<ContentVideoType, number>;
  byStatus: Record<ContentVideoStatusType, number>;
  byFormat: Record<ContentVideoFormat, number>;
  byResolution: Record<ContentVideoResolution, number>;
  byQuality: Record<ContentVideoQuality, number>;
  byAspectRatio: Record<ContentVideoAspectRatio, number>;
  byVisibility: Record<ContentVideoVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalDuration: number;
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  totalFileSize: number;
  averageFileSize: number;
  maxFileSize: number;
  minFileSize: number;
  totalTitleLength: number;
  averageTitleLength: number;
  maxTitleLength: number;
  minTitleLength: number;
  totalDescriptionLength: number;
  averageDescriptionLength: number;
  maxDescriptionLength: number;
  minDescriptionLength: number;
  mostFrequentType: ContentVideoType;
  mostFrequentFormat: ContentVideoFormat;
  mostFrequentResolution: ContentVideoResolution;
  mostFrequentStatus: ContentVideoStatusType;
}

/**
 * Video Summary
 */
export interface VideoSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  approved: number;
  processing: number;
  byType: Record<ContentVideoType, number>;
  byStatus: Record<ContentVideoStatusType, number>;
  byFormat: Record<ContentVideoFormat, number>;
  byResolution: Record<ContentVideoResolution, number>;
  byQuality: Record<ContentVideoQuality, number>;
  byAspectRatio: Record<ContentVideoAspectRatio, number>;
  byVisibility: Record<ContentVideoVisibility, number>;
  videoTrend: {
    date: Date;
    total: number;
    published: number;
    processing: number;
  }[];
  topTypes: {
    type: ContentVideoType;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: ContentVideoFormat;
    count: number;
    label: string;
  }[];
  topResolutions: {
    resolution: ContentVideoResolution;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentVideoStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Video Configuration
 */
export interface VideoConfiguration {
  enabled: boolean;
  defaultType: ContentVideoType;
  defaultStatus: ContentVideoStatusType;
  defaultFormat: ContentVideoFormat;
  defaultResolution: ContentVideoResolution;
  defaultVisibility: ContentVideoVisibility;
  defaultSort: ContentVideoSortOption;
  maxTitleLength: number;
  maxDescriptionLength: number;
  maxDurationSeconds: number;
  minDurationSeconds: number;
  maxFileSizeGB: number;
  requireApproval: boolean;
  allowComments: boolean;
  allowDownloads: boolean;
  allowEmbedding: boolean;
  allowSharing: boolean;
  notificationOnUpload: boolean;
  notificationOnProcess: boolean;
  notificationOnApproval: boolean;
  notificationOnPublish: boolean;
  notificationOnDelete: boolean;
  alertConfig?: VideoAlertConfig;
}

/**
 * Video Alert Configuration
 */
export interface VideoAlertConfig {
  enabled: boolean;
  processingFailureAlert: boolean;
  pendingApprovalAlert: boolean;
  inappropriateContentAlert: boolean;
  lowQualityAlert: boolean;
  lowQualityThreshold: number;
  sizeLimitAlert: boolean;
  durationLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Video History
 */
export interface VideoHistory extends BaseEntity, Timestamp {
  id: ID;
  videoId: ID;
  userId: ID;
  action:
    | 'upload'
    | 'process'
    | 'approve'
    | 'reject'
    | 'publish'
    | 'unpublish'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Video Validation
 */
export interface VideoValidation {
  isValid: boolean;
  videoId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Video Export
 */
export interface VideoExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'xml';
  filter: VideoFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Video Transcript
 */
export interface VideoTranscript extends BaseEntity, Timestamp {
  id: ID;
  videoId: ID;
  content: string;
  language: string;
  isAutoGenerated: boolean;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Video Thumbnail
 */
export interface VideoThumbnail extends BaseEntity, Timestamp {
  id: ID;
  videoId: ID;
  url: string;
  width: number;
  height: number;
  position: number;
  isDefault: boolean;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Video Core
  CONTENT_VIDEO,
  ContentVideoType,
  ContentVideoStatus,
  ContentVideoFormat,
  ContentVideoResolution,
  ContentVideoQuality,
  ContentVideoAspectRatio,
  ContentVideoVisibility,
  ContentVideoSortOption,
  ContentVideoDimension,
  ContentVideoFrameRate,
  contentVideoGetTypeLabel,
  contentVideoGetStatusLabel,
  contentVideoGetFormatLabel,
  contentVideoGetResolutionLabel,
  contentVideoGetQualityLabel,
  contentVideoGetAspectRatioLabel,
  contentVideoGetVisibilityLabel,
  contentVideoGetSortOptionLabel,
  contentVideoGetDimension,
  contentVideoIsPublished,
  contentVideoIsEditable,
  contentVideoIsApproved,
  contentVideoIsProcessing,
  contentVideoGetDefaultStatus,
  contentVideoGetDefaultFormat,
  contentVideoGetDefaultResolution,
  contentVideoGetDefaultVisibility,
  contentVideoGetDefaultSort,
  contentVideoGetMaxTitleLength,
  contentVideoGetMaxDescriptionLength,
  contentVideoGetMaxDurationSeconds,
  contentVideoGetMinDurationSeconds,
  contentVideoGetMaxFileSizeGB,
  contentVideoIsValidType,
  contentVideoIsValidStatus,
  contentVideoIsValidFormat,
  contentVideoIsValidResolution,
  contentVideoIsValidAspectRatio,
  // Video Status
  CONTENT_VIDEO_STATUS,
  ContentVideoStatusType,
  ContentVideoStatusCategory,
  ContentVideoStatusColor,
  ContentVideoStatusPriority,
  ContentVideoState,
  ContentVideoAction,
  contentVideoStatusGetLabel,
  contentVideoStatusGetCategory,
  contentVideoStatusGetColor,
  contentVideoStatusGetPriority,
  contentVideoStatusIsPublished,
  contentVideoStatusIsEditable,
  contentVideoStatusIsProcessing,
  contentVideoStatusIsArchived,
  contentVideoStatusCanTransitionTo,
  contentVideoStatusGetAvailableTransitions,
  contentVideoStatusGetSequence,
  contentVideoStatusGetStateLabel,
  contentVideoStatusGetActionLabel,
  contentVideoStatusIsValid,
  contentVideoStatusIsValidState,
};
