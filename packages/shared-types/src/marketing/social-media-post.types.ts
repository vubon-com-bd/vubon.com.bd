/**
 * Social Media Post Types
 * Type definitions for social media posts based on shared-constants
 * @module SocialMediaPostTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants social media
// ============================================================
import {
  // Social Media Post
  MARKETINGSOCIAL_POST,
  MarketingSocialPostType,
  MarketingSocialPostFormat,
  MarketingSocialPostPurpose,
  MarketingSocialPostCTA,
  MarketingSocialPostFrequency,
  MarketingSocialPostDefault,
  MarketingSocialPostLimit,
  marketingsocialGetPostTypeLabel,
  marketingsocialGetPostFormatLabel,
  marketingsocialGetPostPurposeLabel,
  marketingsocialGetPostCTALabel,
  marketingsocialGetPostFrequencyLabel,
  marketingsocialIsEngagementPost,
  marketingsocialIsPromotionalPost,
  marketingsocialGetMaxImagesPerPost,
  marketingsocialGetDefaultPostType,
  marketingsocialGetDefaultPostCTA,
} from '@vubon/shared-constants';

// ============================================================
// Social Media Post Extended Types
// ============================================================

/**
 * Social Media Post
 */
export interface SocialMediaPost extends BaseEntity, Timestamp {
  id: ID;
  socialMediaId: ID;
  userId: ID;
  title: string;
  content: string;
  type: MarketingSocialPostType;
  format: MarketingSocialPostFormat;
  purpose: MarketingSocialPostPurpose;
  cta: MarketingSocialPostCTA;
  frequency: MarketingSocialPostFrequency;
  images: string[];
  video?: string;
  link?: string;
  isEngagement: boolean;
  isPromotional: boolean;
  isActive: boolean;
  isPublished: boolean;
  scheduledAt?: Date;
  publishedAt?: Date;
  metadata?: Metadata;
}

/**
 * Social Media Post Filter
 */
export interface SocialMediaPostFilter {
  ids?: ID[];
  socialMediaIds?: ID[];
  userIds?: ID[];
  types?: MarketingSocialPostType[];
  formats?: MarketingSocialPostFormat[];
  purposes?: MarketingSocialPostPurpose[];
  ctas?: MarketingSocialPostCTA[];
  frequencies?: MarketingSocialPostFrequency[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isEngagement?: boolean;
  isPromotional?: boolean;
  isActive?: boolean;
  isPublished?: boolean;
  hasImages?: boolean;
  hasVideo?: boolean;
  hasLink?: boolean;
  searchTerm?: string;
}

/**
 * Social Media Post Statistics
 */
export interface SocialMediaPostStatistics {
  socialMediaId: ID;
  totalPosts: number;
  activePosts: number;
  publishedPosts: number;
  byType: Record<MarketingSocialPostType, number>;
  byFormat: Record<MarketingSocialPostFormat, number>;
  byPurpose: Record<MarketingSocialPostPurpose, number>;
  byCTA: Record<MarketingSocialPostCTA, number>;
  byFrequency: Record<MarketingSocialPostFrequency, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  engagementPosts: number;
  promotionalPosts: number;
  postsWithImages: number;
  postsWithVideo: number;
  postsWithLink: number;
  mostFrequentType: MarketingSocialPostType;
  mostFrequentFormat: MarketingSocialPostFormat;
  mostFrequentPurpose: MarketingSocialPostPurpose;
  mostFrequentCTA: MarketingSocialPostCTA;
}

/**
 * Social Media Post Summary
 */
export interface SocialMediaPostSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPosts: number;
  active: number;
  published: number;
  byType: Record<MarketingSocialPostType, number>;
  byFormat: Record<MarketingSocialPostFormat, number>;
  byPurpose: Record<MarketingSocialPostPurpose, number>;
  byCTA: Record<MarketingSocialPostCTA, number>;
  byFrequency: Record<MarketingSocialPostFrequency, number>;
  postTrend: {
    date: Date;
    total: number;
    published: number;
    active: number;
  }[];
  topTypes: {
    type: MarketingSocialPostType;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: MarketingSocialPostFormat;
    count: number;
    label: string;
  }[];
  topPurposes: {
    purpose: MarketingSocialPostPurpose;
    count: number;
    label: string;
  }[];
  topCTAs: {
    cta: MarketingSocialPostCTA;
    count: number;
    label: string;
  }[];
}

/**
 * Social Media Post Configuration
 */
export interface SocialMediaPostConfiguration {
  enabled: boolean;
  defaultType: MarketingSocialPostType;
  defaultFormat: MarketingSocialPostFormat;
  defaultPurpose: MarketingSocialPostPurpose;
  defaultCTA: MarketingSocialPostCTA;
  defaultFrequency: MarketingSocialPostFrequency;
  maxImagesPerPost: number;
  maxPostsPerUser: number;
  maxPostsPerDay: number;
  allowScheduling: boolean;
  allowTemplates: boolean;
  requireApproval: boolean;
  autoPublish: boolean;
  notificationOnCreate: boolean;
  notificationOnPublish: boolean;
  notificationOnEngagement: boolean;
  notificationOnDelete: boolean;
  alertConfig?: SocialMediaPostAlertConfig;
}

/**
 * Social Media Post Alert Configuration
 */
export interface SocialMediaPostAlertConfig {
  enabled: boolean;
  lowEngagementAlert: boolean;
  lowEngagementThreshold: number;
  highEngagementAlert: boolean;
  highEngagementThreshold: number;
  spamAlert: boolean;
  spamThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Social Media Post History
 */
export interface SocialMediaPostHistory extends BaseEntity, Timestamp {
  id: ID;
  postId: ID;
  socialMediaId: ID;
  userId: ID;
  action:
    'create' | 'update' | 'publish' | 'unpublish' | 'archive' | 'restore' | 'delete' | 'engage';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Social Media Post Validation
 */
export interface SocialMediaPostValidation {
  isValid: boolean;
  postId: ID;
  socialMediaId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Social Media Post Export
 */
export interface SocialMediaPostExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SocialMediaPostFilter;
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
  // Social Media Post
  MARKETINGSOCIAL_POST,
  MarketingSocialPostType,
  MarketingSocialPostFormat,
  MarketingSocialPostPurpose,
  MarketingSocialPostCTA,
  MarketingSocialPostFrequency,
  MarketingSocialPostDefault,
  MarketingSocialPostLimit,
  marketingsocialGetPostTypeLabel,
  marketingsocialGetPostFormatLabel,
  marketingsocialGetPostPurposeLabel,
  marketingsocialGetPostCTALabel,
  marketingsocialGetPostFrequencyLabel,
  marketingsocialIsEngagementPost,
  marketingsocialIsPromotionalPost,
  marketingsocialGetMaxImagesPerPost,
  marketingsocialGetDefaultPostType,
  marketingsocialGetDefaultPostCTA,
};
