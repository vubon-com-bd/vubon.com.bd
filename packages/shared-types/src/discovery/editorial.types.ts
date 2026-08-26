/**
 * Editorial Types
 * Type definitions for editorial content based on shared-constants
 * @module EditorialTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants discovery
// ============================================================
import {
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
  // Editorial
  DISCOVERY_EDITORIAL,
  DiscoveryEditorialType,
  DiscoveryEditorialCategory,
  DiscoveryEditorialStatus,
  DiscoveryEditorialDefault,
  DiscoveryEditorialLimit,
  DiscoveryEditorialError,
  discoveryEditorialGetTypeLabel,
  discoveryEditorialGetCategoryLabel,
  discoveryEditorialGetStatusLabel,
  discoveryEditorialGetErrorLabel,
  discoveryEditorialIsPublished,
  discoveryEditorialIsFeatured,
  discoveryEditorialIsApproved,
  discoveryEditorialGetDefaultLimit,
} from '@vubon/shared-constants';

// ============================================================
// Editorial Extended Types
// ============================================================

/**
 * Editorial item
 */
export interface EditorialItem extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryEditorialType;
  category: DiscoveryEditorialCategory;
  status: DiscoveryEditorialStatus;
  title: string;
  description?: string;
  itemIds: ID[];
  isPublished: boolean;
  isFeatured: boolean;
  isApproved: boolean;
  publishedAt?: Date;
  featuredAt?: Date;
  approvedAt?: Date;
  metadata?: Metadata;
}

/**
 * Editorial filter
 */
export interface EditorialFilter {
  types?: DiscoveryEditorialType[];
  categories?: DiscoveryEditorialCategory[];
  statuses?: DiscoveryEditorialStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isFeatured?: boolean;
  isApproved?: boolean;
  searchTerm?: string;
}

/**
 * Editorial statistics
 */
export interface EditorialStatistics {
  totalEditorials: number;
  publishedEditorials: number;
  featuredEditorials: number;
  approvedEditorials: number;
  byType: Record<DiscoveryEditorialType, number>;
  byCategory: Record<DiscoveryEditorialCategory, number>;
  byStatus: Record<DiscoveryEditorialStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: DiscoveryEditorialType;
  mostFrequentCategory: DiscoveryEditorialCategory;
  totalItemsFeatured: number;
}

/**
 * Editorial summary
 */
export interface EditorialSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  featured: number;
  approved: number;
  byType: Record<DiscoveryEditorialType, number>;
  byCategory: Record<DiscoveryEditorialCategory, number>;
  byStatus: Record<DiscoveryEditorialStatus, number>;
  editorialTrend: {
    date: Date;
    total: number;
    published: number;
    featured: number;
  }[];
  topTypes: {
    type: DiscoveryEditorialType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: DiscoveryEditorialCategory;
    count: number;
    label: string;
  }[];
  topEditorials: {
    editorialId: ID;
    title: string;
    type: string;
    status: string;
  }[];
}

/**
 * Editorial configuration
 */
export interface EditorialConfiguration {
  enabled: boolean;
  defaultType: DiscoveryEditorialType;
  defaultCategory: DiscoveryEditorialCategory;
  defaultLimit: number;
  requireApproval: boolean;
  autoPublish: boolean;
  featuredExpiryDays: number;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enableAnalytics: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnPublish: boolean;
  notificationOnFeature: boolean;
  notificationOnApproval: boolean;
  notificationOnError: boolean;
  alertConfig?: EditorialAlertConfig;
}

/**
 * Editorial alert configuration
 */
export interface EditorialAlertConfig {
  enabled: boolean;
  publishErrorAlert: boolean;
  approvalErrorAlert: boolean;
  featuredExpiryAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  featuredExpiryThreshold: number;
}

/**
 * Editorial history
 */
export interface EditorialHistory extends BaseEntity, Timestamp {
  id: ID;
  editorialId: ID;
  action:
    | 'create'
    | 'update'
    | 'publish'
    | 'unpublish'
    | 'feature'
    | 'unfeature'
    | 'approve'
    | 'reject'
    | 'archive'
    | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Editorial content
 */
export interface EditorialContent extends BaseEntity, Timestamp {
  id: ID;
  editorialId: ID;
  content: string;
  contentType: 'html' | 'markdown' | 'text';
  language: string;
  version: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Editorial media
 */
export interface EditorialMedia extends BaseEntity, Timestamp {
  id: ID;
  editorialId: ID;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'audio' | 'document';
  title: string;
  description?: string;
  position: number;
  isFeatured: boolean;
  metadata?: Metadata;
}

/**
 * Editorial analytics
 */
export interface EditorialAnalytics extends BaseEntity, Timestamp {
  id: ID;
  editorialId: ID;
  period: {
    start: Date;
    end: Date;
  };
  views: number;
  clicks: number;
  engagements: number;
  shares: number;
  averageTimeSpent: number;
  bounceRate: number;
  conversionRate: number;
  metadata?: Metadata;
}

/**
 * Editorial recommendation
 */
export interface EditorialRecommendation extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  editorialId: ID;
  score: number;
  reason: string;
  recommendedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Editorial export
 */
export interface EditorialExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown';
  filter: EditorialFilter;
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
  // Discovery Core
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
  // Editorial
  DISCOVERY_EDITORIAL,
  DiscoveryEditorialType,
  DiscoveryEditorialCategory,
  DiscoveryEditorialStatus,
  DiscoveryEditorialDefault,
  DiscoveryEditorialLimit,
  DiscoveryEditorialError,
  discoveryEditorialGetTypeLabel,
  discoveryEditorialGetCategoryLabel,
  discoveryEditorialGetStatusLabel,
  discoveryEditorialGetErrorLabel,
  discoveryEditorialIsPublished,
  discoveryEditorialIsFeatured,
  discoveryEditorialIsApproved,
  discoveryEditorialGetDefaultLimit,
};
