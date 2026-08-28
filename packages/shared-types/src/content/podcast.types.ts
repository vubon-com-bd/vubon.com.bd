/**
 * Podcast Types
 * Type definitions for podcasts based on shared-constants
 * @module PodcastTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants podcast
// ============================================================
import {
  // Podcast Core
  CONTENT_PODCAST,
  ContentPodcastType,
  ContentPodcastStatus,
  ContentPodcastFormat,
  ContentPodcastAudioQuality,
  ContentPodcastVisibility,
  ContentPodcastSortOption,
  ContentPodcastEpisodeType,
  ContentPodcastContentRating,
  contentPodcastGetTypeLabel,
  contentPodcastGetStatusLabel,
  contentPodcastGetFormatLabel,
  contentPodcastGetAudioQualityLabel,
  contentPodcastGetVisibilityLabel,
  contentPodcastGetSortOptionLabel,
  contentPodcastGetEpisodeTypeLabel,
  contentPodcastGetContentRatingLabel,
  contentPodcastIsPublished,
  contentPodcastIsEditable,
  contentPodcastIsApproved,
  contentPodcastIsProcessing,
  contentPodcastGetDefaultStatus,
  contentPodcastGetDefaultFormat,
  contentPodcastGetDefaultAudioQuality,
  contentPodcastGetDefaultVisibility,
  contentPodcastGetDefaultSort,
  contentPodcastGetMaxTitleLength,
  contentPodcastGetMaxDescriptionLength,
  contentPodcastGetMaxDurationSeconds,
  contentPodcastGetMinDurationSeconds,
  contentPodcastGetMaxFileSizeMB,
  contentPodcastIsValidType,
  contentPodcastIsValidStatus,
  contentPodcastIsValidFormat,
  contentPodcastIsValidEpisodeType,
  contentPodcastIsValidContentRating,
  // Podcast Status
  CONTENT_PODCAST_STATUS,
  ContentPodcastStatusType,
  ContentPodcastStatusCategory,
  ContentPodcastStatusColor,
  ContentPodcastStatusPriority,
  ContentPodcastState,
  ContentPodcastAction,
  contentPodcastStatusGetLabel,
  contentPodcastStatusGetCategory,
  contentPodcastStatusGetColor,
  contentPodcastStatusGetPriority,
  contentPodcastStatusIsPublished,
  contentPodcastStatusIsEditable,
  contentPodcastStatusIsProcessing,
  contentPodcastStatusIsArchived,
  contentPodcastStatusCanTransitionTo,
  contentPodcastStatusGetAvailableTransitions,
  contentPodcastStatusGetSequence,
  contentPodcastStatusGetStateLabel,
  contentPodcastStatusGetActionLabel,
  contentPodcastStatusIsValid,
  contentPodcastStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Podcast Extended Types
// ============================================================

/**
 * Podcast Episode
 */
export interface PodcastEpisode extends BaseEntity, Timestamp {
  id: ID;
  podcastId: ID;
  title: string;
  description: string;
  episodeType: ContentPodcastEpisodeType;
  duration: number;
  audioUrl: string;
  audioQuality: ContentPodcastAudioQuality;
  fileSize: number;
  order: number;
  isPublished: boolean;
  isActive: boolean;
  publishedAt?: Date;
  metadata?: Metadata;
}

/**
 * Podcast
 */
export interface Podcast extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  description: string;
  type: ContentPodcastType;
  status: ContentPodcastStatusType;
  format: ContentPodcastFormat;
  audioQuality: ContentPodcastAudioQuality;
  visibility: ContentPodcastVisibility;
  sortOption: ContentPodcastSortOption;
  contentRating: ContentPodcastContentRating;
  episodes: PodcastEpisode[];
  coverImage?: string;
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
 * Podcast Filter
 */
export interface PodcastFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentPodcastType[];
  statuses?: ContentPodcastStatusType[];
  formats?: ContentPodcastFormat[];
  audioQualities?: ContentPodcastAudioQuality[];
  visibilities?: ContentPodcastVisibility[];
  sortOptions?: ContentPodcastSortOption[];
  contentRatings?: ContentPodcastContentRating[];
  episodeTypes?: ContentPodcastEpisodeType[];
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
 * Podcast Statistics
 */
export interface PodcastStatistics {
  userId: ID;
  totalPodcasts: number;
  publishedPodcasts: number;
  editablePodcasts: number;
  approvedPodcasts: number;
  processingPodcasts: number;
  byType: Record<ContentPodcastType, number>;
  byStatus: Record<ContentPodcastStatusType, number>;
  byFormat: Record<ContentPodcastFormat, number>;
  byAudioQuality: Record<ContentPodcastAudioQuality, number>;
  byVisibility: Record<ContentPodcastVisibility, number>;
  byContentRating: Record<ContentPodcastContentRating, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalEpisodes: number;
  averageEpisodes: number;
  maxEpisodes: number;
  minEpisodes: number;
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
  mostFrequentType: ContentPodcastType;
  mostFrequentFormat: ContentPodcastFormat;
  mostFrequentAudioQuality: ContentPodcastAudioQuality;
  mostFrequentStatus: ContentPodcastStatusType;
}

/**
 * Podcast Summary
 */
export interface PodcastSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  approved: number;
  processing: number;
  byType: Record<ContentPodcastType, number>;
  byStatus: Record<ContentPodcastStatusType, number>;
  byFormat: Record<ContentPodcastFormat, number>;
  byAudioQuality: Record<ContentPodcastAudioQuality, number>;
  byVisibility: Record<ContentPodcastVisibility, number>;
  byContentRating: Record<ContentPodcastContentRating, number>;
  podcastTrend: {
    date: Date;
    total: number;
    published: number;
    processing: number;
  }[];
  topTypes: {
    type: ContentPodcastType;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: ContentPodcastFormat;
    count: number;
    label: string;
  }[];
  topAudioQualities: {
    audioQuality: ContentPodcastAudioQuality;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentPodcastStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Podcast Configuration
 */
export interface PodcastConfiguration {
  enabled: boolean;
  defaultType: ContentPodcastType;
  defaultStatus: ContentPodcastStatusType;
  defaultFormat: ContentPodcastFormat;
  defaultAudioQuality: ContentPodcastAudioQuality;
  defaultVisibility: ContentPodcastVisibility;
  defaultSort: ContentPodcastSortOption;
  defaultContentRating: ContentPodcastContentRating;
  maxTitleLength: number;
  maxDescriptionLength: number;
  maxDurationSeconds: number;
  minDurationSeconds: number;
  maxFileSizeMB: number;
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
  alertConfig?: PodcastAlertConfig;
}

/**
 * Podcast Alert Configuration
 */
export interface PodcastAlertConfig {
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
 * Podcast History
 */
export interface PodcastHistory extends BaseEntity, Timestamp {
  id: ID;
  podcastId: ID;
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
    | 'update'
    | 'add_episode'
    | 'remove_episode'
    | 'reorder_episodes';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Podcast Validation
 */
export interface PodcastValidation {
  isValid: boolean;
  podcastId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Podcast Export
 */
export interface PodcastExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'xml' | 'rss';
  filter: PodcastFilter;
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
  // Podcast Core
  CONTENT_PODCAST,
  ContentPodcastType,
  ContentPodcastStatus,
  ContentPodcastFormat,
  ContentPodcastAudioQuality,
  ContentPodcastVisibility,
  ContentPodcastSortOption,
  ContentPodcastEpisodeType,
  ContentPodcastContentRating,
  contentPodcastGetTypeLabel,
  contentPodcastGetStatusLabel,
  contentPodcastGetFormatLabel,
  contentPodcastGetAudioQualityLabel,
  contentPodcastGetVisibilityLabel,
  contentPodcastGetSortOptionLabel,
  contentPodcastGetEpisodeTypeLabel,
  contentPodcastGetContentRatingLabel,
  contentPodcastIsPublished,
  contentPodcastIsEditable,
  contentPodcastIsApproved,
  contentPodcastIsProcessing,
  contentPodcastGetDefaultStatus,
  contentPodcastGetDefaultFormat,
  contentPodcastGetDefaultAudioQuality,
  contentPodcastGetDefaultVisibility,
  contentPodcastGetDefaultSort,
  contentPodcastGetMaxTitleLength,
  contentPodcastGetMaxDescriptionLength,
  contentPodcastGetMaxDurationSeconds,
  contentPodcastGetMinDurationSeconds,
  contentPodcastGetMaxFileSizeMB,
  contentPodcastIsValidType,
  contentPodcastIsValidStatus,
  contentPodcastIsValidFormat,
  contentPodcastIsValidEpisodeType,
  contentPodcastIsValidContentRating,
  // Podcast Status
  CONTENT_PODCAST_STATUS,
  ContentPodcastStatusType,
  ContentPodcastStatusCategory,
  ContentPodcastStatusColor,
  ContentPodcastStatusPriority,
  ContentPodcastState,
  ContentPodcastAction,
  contentPodcastStatusGetLabel,
  contentPodcastStatusGetCategory,
  contentPodcastStatusGetColor,
  contentPodcastStatusGetPriority,
  contentPodcastStatusIsPublished,
  contentPodcastStatusIsEditable,
  contentPodcastStatusIsProcessing,
  contentPodcastStatusIsArchived,
  contentPodcastStatusCanTransitionTo,
  contentPodcastStatusGetAvailableTransitions,
  contentPodcastStatusGetSequence,
  contentPodcastStatusGetStateLabel,
  contentPodcastStatusGetActionLabel,
  contentPodcastStatusIsValid,
  contentPodcastStatusIsValidState,
};
