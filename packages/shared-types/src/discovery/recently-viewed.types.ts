/**
 * Recently Viewed Types
 * Type definitions for recently viewed items based on shared-constants
 * @module RecentlyViewedTypes
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
  // Recently Viewed
  DISCOVERY_RECENTLY_VIEWED,
  DiscoveryRecentlyViewedType,
  DiscoveryRecentlyViewedStatus,
  DiscoveryRecentlyViewedDefault,
  DiscoveryRecentlyViewedLimit,
  DiscoveryRecentlyViewedError,
  discoveryRecentlyViewedGetTypeLabel,
  discoveryRecentlyViewedGetStatusLabel,
  discoveryRecentlyViewedGetErrorLabel,
  discoveryRecentlyViewedIsActive,
  discoveryRecentlyViewedIsTracking,
  discoveryRecentlyViewedGetDefaultLimit,
  discoveryRecentlyViewedGetMaxItems,
} from '@vubon/shared-constants';

// ============================================================
// Recently Viewed Extended Types
// ============================================================

/**
 * Recently viewed item
 */
export interface RecentlyViewedItem extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: DiscoveryRecentlyViewedType;
  status: DiscoveryRecentlyViewedStatus;
  itemId: ID;
  viewedAt: Date;
  viewDuration?: number; // seconds
  isActive: boolean;
  isTracking: boolean;
  metadata?: Metadata;
}

/**
 * Recently viewed filter
 */
export interface RecentlyViewedFilter {
  userIds?: ID[];
  types?: DiscoveryRecentlyViewedType[];
  statuses?: DiscoveryRecentlyViewedStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minViewDuration?: number;
  maxViewDuration?: number;
  isActive?: boolean;
  isTracking?: boolean;
  searchTerm?: string;
}

/**
 * Recently viewed statistics
 */
export interface RecentlyViewedStatistics {
  userId: ID;
  totalViews: number;
  activeViews: number;
  trackingViews: number;
  byType: Record<DiscoveryRecentlyViewedType, number>;
  byStatus: Record<DiscoveryRecentlyViewedStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageViewDuration: number;
  maxViewDuration: number;
  minViewDuration: number;
  mostFrequentType: DiscoveryRecentlyViewedType;
  totalUniqueItems: number;
}

/**
 * Recently viewed summary
 */
export interface RecentlyViewedSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  tracking: number;
  byType: Record<DiscoveryRecentlyViewedType, number>;
  byStatus: Record<DiscoveryRecentlyViewedStatus, number>;
  viewTrend: {
    date: Date;
    total: number;
    active: number;
    tracking: number;
  }[];
  topTypes: {
    type: DiscoveryRecentlyViewedType;
    count: number;
    label: string;
  }[];
  topItems: {
    itemId: ID;
    viewCount: number;
    lastViewedAt: Date;
  }[];
}

/**
 * Recently viewed configuration
 */
export interface RecentlyViewedConfiguration {
  enabled: boolean;
  maxItemsPerUser: number;
  trackingEnabled: boolean;
  viewDurationTracking: boolean;
  sessionTracking: boolean;
  expiryDays: number;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableAnalytics: boolean;
  notificationOnView: boolean;
  notificationOnExpiry: boolean;
  alertConfig?: RecentlyViewedAlertConfig;
}

/**
 * Recently viewed alert configuration
 */
export interface RecentlyViewedAlertConfig {
  enabled: boolean;
  viewThresholdAlert: boolean;
  expiryAlert: boolean;
  trackingErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  viewThreshold: number;
}

/**
 * Recently viewed history
 */
export interface RecentlyViewedHistory extends BaseEntity, Timestamp {
  id: ID;
  viewedId: ID;
  userId: ID;
  itemId: ID;
  action: 'view' | 'expire' | 'archive' | 'remove';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Recently viewed session
 */
export interface RecentlyViewedSession extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  sessionId: string;
  items: RecentlyViewedItem[];
  startTime: Date;
  endTime?: Date;
  totalItems: number;
  metadata?: Metadata;
}

/**
 * Recently viewed analytics
 */
export interface RecentlyViewedAnalytics extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  period: {
    start: Date;
    end: Date;
  };
  totalViews: number;
  uniqueItems: number;
  averageViewDuration: number;
  viewFrequency: {
    hourly: number[];
    daily: number[];
    weekly: number[];
  };
  topCategories: {
    category: string;
    viewCount: number;
  }[];
  conversionRate: number;
  metadata?: Metadata;
}

/**
 * Recently viewed export
 */
export interface RecentlyViewedExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: RecentlyViewedFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Recently viewed recommendation
 */
export interface RecentlyViewedRecommendation {
  itemId: ID;
  score: number;
  reason: 'viewed' | 'related' | 'similar';
  lastViewedAt: Date;
  viewCount: number;
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
  // Recently Viewed
  DISCOVERY_RECENTLY_VIEWED,
  DiscoveryRecentlyViewedType,
  DiscoveryRecentlyViewedStatus,
  DiscoveryRecentlyViewedDefault,
  DiscoveryRecentlyViewedLimit,
  DiscoveryRecentlyViewedError,
  discoveryRecentlyViewedGetTypeLabel,
  discoveryRecentlyViewedGetStatusLabel,
  discoveryRecentlyViewedGetErrorLabel,
  discoveryRecentlyViewedIsActive,
  discoveryRecentlyViewedIsTracking,
  discoveryRecentlyViewedGetDefaultLimit,
  discoveryRecentlyViewedGetMaxItems,
};
