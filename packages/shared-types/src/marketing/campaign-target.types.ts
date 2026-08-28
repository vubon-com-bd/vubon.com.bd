/**
 * Campaign Target Types
 * Type definitions for campaign targeting based on shared-constants
 * @module CampaignTargetTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants marketing
// ============================================================
import {
  // Marketing Core
  MarketingChannel,
  MarketingCampaignType,
  MarketingObjective,
  MarketingAudienceType,
  MarketingBudgetType,
  MarketingBiddingStrategy,
  MarketingAttributionModel,
  MarketingCampaignStatus,
  MarketingMetric,
} from '@vubon/shared-constants';

// ============================================================
// Campaign Target Extended Types
// ============================================================

/**
 * Campaign Target
 */
export interface CampaignTarget extends BaseEntity, Timestamp {
  id: ID;
  campaignId: ID;
  userId: ID;
  name: string;
  description?: string;
  audience: MarketingAudienceType;
  channels: MarketingChannel[];
  locations: CampaignTargetLocation[];
  demographics: CampaignTargetDemographics;
  behaviors: CampaignTargetBehavior[];
  interests: string[];
  devices: CampaignTargetDevice[];
  timeframes: CampaignTargetTimeframe[];
  isActive: boolean;
  isDefault: boolean;
  priority: number;
  metadata?: Metadata;
}

/**
 * Campaign Target Location
 */
export interface CampaignTargetLocation {
  country?: string;
  region?: string;
  city?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  exclude: boolean;
  metadata?: Metadata;
}

/**
 * Campaign Target Demographics
 */
export interface CampaignTargetDemographics {
  ageRange?: {
    min: number;
    max: number;
  };
  gender?: 'male' | 'female' | 'non_binary' | 'all';
  incomeRange?: {
    min: number;
    max: number;
  };
  education?: string[];
  occupation?: string[];
  maritalStatus?: string[];
  familySize?: number;
  metadata?: Metadata;
}

/**
 * Campaign Target Behavior
 */
export interface CampaignTargetBehavior {
  type: 'purchase' | 'view' | 'click' | 'engagement' | 'cart_abandonment' | 'search' | 'visit';
  frequency: number;
  recency: number;
  value?: number;
  category?: string;
  product?: string;
  metadata?: Metadata;
}

/**
 * Campaign Target Device
 */
export interface CampaignTargetDevice {
  type: 'desktop' | 'mobile' | 'tablet' | 'tv' | 'wearable' | 'all';
  os?: string[];
  browser?: string[];
  model?: string[];
  screenSize?: {
    minWidth: number;
    minHeight: number;
  };
  isMobile: boolean;
  isDesktop: boolean;
  metadata?: Metadata;
}

/**
 * Campaign Target Timeframe
 */
export interface CampaignTargetTimeframe {
  type: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
  daysOfWeek?: number[];
  timesOfDay?: {
    start: string;
    end: string;
  }[];
  startDate?: Date;
  endDate?: Date;
  timezone?: string;
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  metadata?: Metadata;
}

/**
 * Campaign Target Filter
 */
export interface CampaignTargetFilter {
  ids?: ID[];
  campaignIds?: ID[];
  userIds?: ID[];
  audiences?: MarketingAudienceType[];
  channels?: MarketingChannel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  minPriority?: number;
  maxPriority?: number;
  searchTerm?: string;
  locations?: {
    country?: string;
    city?: string;
  };
  demographics?: {
    minAge?: number;
    maxAge?: number;
    gender?: string;
  };
}

/**
 * Campaign Target Statistics
 */
export interface CampaignTargetStatistics {
  campaignId: ID;
  totalTargets: number;
  activeTargets: number;
  defaultTargets: number;
  byAudience: Record<MarketingAudienceType, number>;
  byChannel: Record<MarketingChannel, number>;
  byDevice: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePriority: number;
  maxPriority: number;
  minPriority: number;
  mostFrequentAudience: MarketingAudienceType;
  mostFrequentChannel: MarketingChannel;
  totalLocations: number;
  uniqueCountries: number;
  uniqueCities: number;
}

/**
 * Campaign Target Summary
 */
export interface CampaignTargetSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTargets: number;
  active: number;
  default: number;
  byAudience: Record<MarketingAudienceType, number>;
  byChannel: Record<MarketingChannel, number>;
  byDevice: Record<string, number>;
  targetTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topAudiences: {
    audience: MarketingAudienceType;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: MarketingChannel;
    count: number;
    label: string;
  }[];
  topDevices: {
    device: string;
    count: number;
    label: string;
  }[];
  locationCoverage: {
    countries: number;
    cities: number;
    regions: number;
  };
}

/**
 * Campaign Target Configuration
 */
export interface CampaignTargetConfiguration {
  enabled: boolean;
  defaultAudience: MarketingAudienceType;
  defaultChannels: MarketingChannel[];
  maxTargetsPerCampaign: number;
  maxLocationsPerTarget: number;
  maxBehaviorsPerTarget: number;
  maxInterestsPerTarget: number;
  maxDevicesPerTarget: number;
  maxTimeframesPerTarget: number;
  requireLocation: boolean;
  requireDemographics: boolean;
  allowMultipleChannels: boolean;
  allowMultipleAudiences: boolean;
  enableGeoTargeting: boolean;
  enableBehaviorTargeting: boolean;
  enableDeviceTargeting: boolean;
  enableTimeTargeting: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: CampaignTargetAlertConfig;
}

/**
 * Campaign Target Alert Configuration
 */
export interface CampaignTargetAlertConfig {
  enabled: boolean;
  noTargetAlert: boolean;
  overlappingTargetAlert: boolean;
  invalidTargetAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Campaign Target History
 */
export interface CampaignTargetHistory extends BaseEntity, Timestamp {
  id: ID;
  targetId: ID;
  campaignId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'set_default'
    | 'unset_default'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Campaign Target Validation
 */
export interface CampaignTargetValidation {
  isValid: boolean;
  targetId: ID;
  campaignId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Campaign Target Export
 */
export interface CampaignTargetExport extends BaseEntity, Timestamp {
  id: ID;
  campaignId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CampaignTargetFilter;
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
  // Marketing Core
  MarketingChannel,
  MarketingCampaignType,
  MarketingObjective,
  MarketingAudienceType,
  MarketingBudgetType,
  MarketingBiddingStrategy,
  MarketingAttributionModel,
  MarketingCampaignStatus,
  MarketingMetric,
};
