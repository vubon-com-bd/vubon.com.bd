/**
 * Seasonal Types
 * Type definitions for seasonal items based on shared-constants
 * @module SeasonalTypes
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
  // Seasonal
  DISCOVERY_SEASONAL,
  DiscoverySeasonalType,
  DiscoverySeason,
  DiscoverySeasonalStatus,
  DiscoverySeasonalDefault,
  DiscoverySeasonalLimit,
  DiscoverySeasonalError,
  discoverySeasonalGetTypeLabel,
  discoverySeasonalGetSeasonLabel,
  discoverySeasonalGetStatusLabel,
  discoverySeasonalGetErrorLabel,
  discoverySeasonalIsActive,
  discoverySeasonalIsScheduled,
  discoverySeasonalGetDefaultLimit,
} from '@vubon/shared-constants';

// ============================================================
// Seasonal Extended Types
// ============================================================

/**
 * Seasonal item
 */
export interface SeasonalItem extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoverySeasonalType;
  season: DiscoverySeason;
  status: DiscoverySeasonalStatus;
  itemIds: ID[];
  isActive: boolean;
  isScheduled: boolean;
  startDate: Date;
  endDate: Date;
  priority: number;
  metadata?: Metadata;
}

/**
 * Seasonal filter
 */
export interface SeasonalFilter {
  types?: DiscoverySeasonalType[];
  seasons?: DiscoverySeason[];
  statuses?: DiscoverySeasonalStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isScheduled?: boolean;
  minPriority?: number;
  maxPriority?: number;
  searchTerm?: string;
}

/**
 * Seasonal statistics
 */
export interface SeasonalStatistics {
  totalSeasonal: number;
  activeSeasonal: number;
  scheduledSeasonal: number;
  byType: Record<DiscoverySeasonalType, number>;
  bySeason: Record<DiscoverySeason, number>;
  byStatus: Record<DiscoverySeasonalStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePriority: number;
  maxPriority: number;
  minPriority: number;
  mostFrequentType: DiscoverySeasonalType;
  mostFrequentSeason: DiscoverySeason;
  totalSeasonalItems: number;
}

/**
 * Seasonal summary
 */
export interface SeasonalSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  scheduled: number;
  byType: Record<DiscoverySeasonalType, number>;
  bySeason: Record<DiscoverySeason, number>;
  byStatus: Record<DiscoverySeasonalStatus, number>;
  seasonalTrend: {
    date: Date;
    total: number;
    active: number;
    scheduled: number;
  }[];
  topTypes: {
    type: DiscoverySeasonalType;
    count: number;
    label: string;
  }[];
  topSeasons: {
    season: DiscoverySeason;
    count: number;
    label: string;
  }[];
}

/**
 * Seasonal configuration
 */
export interface SeasonalConfiguration {
  enabled: boolean;
  defaultType: DiscoverySeasonalType;
  defaultSeason: DiscoverySeason;
  defaultLimit: number;
  defaultPriority: number;
  minPriority: number;
  maxPriority: number;
  cacheTTLSeconds: number;
  enableRealTime: boolean;
  enableHistorical: boolean;
  enablePredictive: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnSchedule: boolean;
  notificationOnActive: boolean;
  notificationOnExpiry: boolean;
  notificationOnError: boolean;
  alertConfig?: SeasonalAlertConfig;
}

/**
 * Seasonal alert configuration
 */
export interface SeasonalAlertConfig {
  enabled: boolean;
  expiryAlert: boolean;
  scheduleAlert: boolean;
  priorityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  expiryThreshold: number;
  priorityThreshold: number;
}

/**
 * Seasonal history
 */
export interface SeasonalHistory extends BaseEntity, Timestamp {
  id: ID;
  seasonalId: ID;
  action: 'create' | 'update' | 'schedule' | 'activate' | 'expire' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Seasonal schedule
 */
export interface SeasonalSchedule extends BaseEntity, Timestamp {
  id: ID;
  seasonalId: ID;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  isRecurring: boolean;
  recurrencePattern?: 'yearly' | 'quarterly' | 'monthly';
  metadata?: Metadata;
}

/**
 * Seasonal analytics
 */
export interface SeasonalAnalytics extends BaseEntity, Timestamp {
  id: ID;
  seasonalId: ID;
  period: {
    start: Date;
    end: Date;
  };
  views: number;
  clicks: number;
  purchases: number;
  revenue: number;
  conversionRate: number;
  averageOrderValue: number;
  metadata?: Metadata;
}

/**
 * Seasonal recommendation
 */
export interface SeasonalRecommendation extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  seasonalId: ID;
  score: number;
  reason: string;
  recommendedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Seasonal export
 */
export interface SeasonalExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: SeasonalFilter;
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
  // Seasonal
  DISCOVERY_SEASONAL,
  DiscoverySeasonalType,
  DiscoverySeason,
  DiscoverySeasonalStatus,
  DiscoverySeasonalDefault,
  DiscoverySeasonalLimit,
  DiscoverySeasonalError,
  discoverySeasonalGetTypeLabel,
  discoverySeasonalGetSeasonLabel,
  discoverySeasonalGetStatusLabel,
  discoverySeasonalGetErrorLabel,
  discoverySeasonalIsActive,
  discoverySeasonalIsScheduled,
  discoverySeasonalGetDefaultLimit,
};
