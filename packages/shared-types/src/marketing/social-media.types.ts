/**
 * Social Media Types
 * Type definitions for social media marketing based on shared-constants
 * @module SocialMediaTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants social media
// ============================================================
import {
  // Social Media Core
  MARKETINGSOCIAL,
  MarketingSocialType,
  MarketingSocialCategory,
  MarketingSocialPriority,
  MarketingSocialContentType,
  MarketingSocialEngagementType,
  MarketingSocialMetric,
  MarketingSocialDefault,
  MarketingSocialLimit,
  marketingsocialGetTypeLabel,
  marketingsocialGetCategoryLabel,
  marketingsocialGetPriorityLabel,
  marketingsocialGetContentTypeLabel,
  marketingsocialGetEngagementTypeLabel,
  marketingsocialGetMetricLabel,
  marketingsocialIsPaidType,
  marketingsocialIsOrganicType,
  marketingsocialGetDefaultPostingTime,
  marketingsocialGetDefaultPostFrequency,
  marketingsocialGetDefaultCallToAction,
  // Social Media Status
  MARKETINGSOCIAL_STATUS,
  MarketingSocialStatusType,
  MarketingSocialStatusColor,
  MarketingSocialStatusCategory,
  MarketingSocialStatusOrder,
  MarketingSocialStatusTransition,
  marketingsocialGetStatusLabel,
  marketingsocialGetStatusColor,
  marketingsocialGetStatusCategory,
  marketingsocialIsPublished,
  marketingsocialIsActive,
  marketingsocialIsPending,
  marketingsocialCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Social Media Extended Types
// ============================================================

/**
 * Social Media
 */
export interface SocialMedia extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  description?: string;
  type: MarketingSocialType;
  category: MarketingSocialCategory;
  priority: MarketingSocialPriority;
  status: MarketingSocialStatusType;
  contentType: MarketingSocialContentType;
  engagementType: MarketingSocialEngagementType;
  metrics: Record<MarketingSocialMetric, number>;
  isPaid: boolean;
  isOrganic: boolean;
  isPublished: boolean;
  isActive: boolean;
  isPending: boolean;
  postingTime: string;
  postFrequency: string;
  callToAction: string;
  publishedAt?: Date;
  metadata?: Metadata;
}

/**
 * Social Media Filter
 */
export interface SocialMediaFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingSocialType[];
  categories?: MarketingSocialCategory[];
  priorities?: MarketingSocialPriority[];
  statuses?: MarketingSocialStatusType[];
  contentTypes?: MarketingSocialContentType[];
  engagementTypes?: MarketingSocialEngagementType[];
  metrics?: MarketingSocialMetric[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPaid?: boolean;
  isOrganic?: boolean;
  isPublished?: boolean;
  isActive?: boolean;
  isPending?: boolean;
  searchTerm?: string;
}

/**
 * Social Media Statistics
 */
export interface SocialMediaStatistics {
  userId: ID;
  totalSocialMedia: number;
  publishedSocialMedia: number;
  activeSocialMedia: number;
  pendingSocialMedia: number;
  byType: Record<MarketingSocialType, number>;
  byCategory: Record<MarketingSocialCategory, number>;
  byPriority: Record<MarketingSocialPriority, number>;
  byStatus: Record<MarketingSocialStatusType, number>;
  byContentType: Record<MarketingSocialContentType, number>;
  byEngagementType: Record<MarketingSocialEngagementType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  paidCount: number;
  organicCount: number;
  averageEngagement: number;
  maxEngagement: number;
  minEngagement: number;
  mostFrequentType: MarketingSocialType;
  mostFrequentCategory: MarketingSocialCategory;
  mostFrequentStatus: MarketingSocialStatusType;
  mostFrequentContentType: MarketingSocialContentType;
}

/**
 * Social Media Summary
 */
export interface SocialMediaSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  active: number;
  pending: number;
  byType: Record<MarketingSocialType, number>;
  byCategory: Record<MarketingSocialCategory, number>;
  byPriority: Record<MarketingSocialPriority, number>;
  byStatus: Record<MarketingSocialStatusType, number>;
  byContentType: Record<MarketingSocialContentType, number>;
  byEngagementType: Record<MarketingSocialEngagementType, number>;
  socialMediaTrend: {
    date: Date;
    total: number;
    published: number;
    active: number;
  }[];
  topTypes: {
    type: MarketingSocialType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: MarketingSocialCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingSocialStatusType;
    count: number;
    label: string;
  }[];
  topContentTypes: {
    contentType: MarketingSocialContentType;
    count: number;
    label: string;
  }[];
}

/**
 * Social Media Configuration
 */
export interface SocialMediaConfiguration {
  enabled: boolean;
  defaultType: MarketingSocialType;
  defaultCategory: MarketingSocialCategory;
  defaultPriority: MarketingSocialPriority;
  defaultStatus: MarketingSocialStatusType;
  defaultContentType: MarketingSocialContentType;
  defaultEngagementType: MarketingSocialEngagementType;
  defaultPostingTime: string;
  defaultPostFrequency: string;
  defaultCallToAction: string;
  maxSocialMediaPerUser: number;
  maxSocialMediaPerDay: number;
  allowScheduling: boolean;
  allowTemplates: boolean;
  requireApproval: boolean;
  autoPublish: boolean;
  notificationOnCreate: boolean;
  notificationOnPublish: boolean;
  notificationOnEngagement: boolean;
  notificationOnDelete: boolean;
  alertConfig?: SocialMediaAlertConfig;
}

/**
 * Social Media Alert Configuration
 */
export interface SocialMediaAlertConfig {
  enabled: boolean;
  engagementAlert: boolean;
  engagementThreshold: number;
  lowEngagementAlert: boolean;
  lowEngagementThreshold: number;
  highEngagementAlert: boolean;
  highEngagementThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Social Media History
 */
export interface SocialMediaHistory extends BaseEntity, Timestamp {
  id: ID;
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
 * Social Media Validation
 */
export interface SocialMediaValidation {
  isValid: boolean;
  socialMediaId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Social Media Export
 */
export interface SocialMediaExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SocialMediaFilter;
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
  // Social Media Core
  MARKETINGSOCIAL,
  MarketingSocialType,
  MarketingSocialCategory,
  MarketingSocialPriority,
  MarketingSocialContentType,
  MarketingSocialEngagementType,
  MarketingSocialMetric,
  MarketingSocialDefault,
  MarketingSocialLimit,
  marketingsocialGetTypeLabel,
  marketingsocialGetCategoryLabel,
  marketingsocialGetPriorityLabel,
  marketingsocialGetContentTypeLabel,
  marketingsocialGetEngagementTypeLabel,
  marketingsocialGetMetricLabel,
  marketingsocialIsPaidType,
  marketingsocialIsOrganicType,
  marketingsocialGetDefaultPostingTime,
  marketingsocialGetDefaultPostFrequency,
  marketingsocialGetDefaultCallToAction,
  // Social Media Status
  MARKETINGSOCIAL_STATUS,
  MarketingSocialStatusType,
  MarketingSocialStatusColor,
  MarketingSocialStatusCategory,
  MarketingSocialStatusOrder,
  MarketingSocialStatusTransition,
  marketingsocialGetStatusLabel,
  marketingsocialGetStatusColor,
  marketingsocialGetStatusCategory,
  marketingsocialIsPublished,
  marketingsocialIsActive,
  marketingsocialIsPending,
  marketingsocialCanTransition,
};
