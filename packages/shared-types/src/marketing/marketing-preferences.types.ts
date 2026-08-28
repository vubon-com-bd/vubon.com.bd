/**
 * Marketing Preferences Types
 * Type definitions for marketing preferences based on shared-constants
 * @module MarketingPreferencesTypes
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
  MarketingCampaignStatus,
  MarketingMetric,
} from '@vubon/shared-constants';

// ============================================================
// Marketing Preferences Extended Types
// ============================================================

/**
 * Marketing Preferences
 */
export interface MarketingPreferences extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  preferredChannels: MarketingChannel[];
  preferredCampaignTypes: MarketingCampaignType[];
  preferredObjectives: MarketingObjective[];
  preferredAudiences: MarketingAudienceType[];
  preferredMetrics: MarketingMetric[];
  excludedChannels: MarketingChannel[];
  excludedCampaignTypes: MarketingCampaignType[];
  notificationOnCampaignStart: boolean;
  notificationOnCampaignEnd: boolean;
  notificationOnMetricThreshold: boolean;
  notificationOnReportGeneration: boolean;
  metricThresholdValue: number;
  reportFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  dashboardLayout: 'grid' | 'list' | 'compact';
  defaultTimeframe: '7d' | '30d' | '90d' | '1y' | 'custom';
  enablePersonalization: boolean;
  enableRecommendations: boolean;
  enableAIAnalytics: boolean;
  enableAutomation: boolean;
  metadata?: Metadata;
}

/**
 * Marketing Preferences Filter
 */
export interface MarketingPreferencesFilter {
  ids?: ID[];
  userIds?: ID[];
  preferredChannels?: MarketingChannel[];
  preferredCampaignTypes?: MarketingCampaignType[];
  preferredObjectives?: MarketingObjective[];
  preferredAudiences?: MarketingAudienceType[];
  preferredMetrics?: MarketingMetric[];
  excludedChannels?: MarketingChannel[];
  excludedCampaignTypes?: MarketingCampaignType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  notificationOnCampaignStart?: boolean;
  notificationOnCampaignEnd?: boolean;
  notificationOnMetricThreshold?: boolean;
  notificationOnReportGeneration?: boolean;
  reportFrequency?: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  dashboardLayout?: 'grid' | 'list' | 'compact';
  defaultTimeframe?: '7d' | '30d' | '90d' | '1y' | 'custom';
  enablePersonalization?: boolean;
  enableRecommendations?: boolean;
  enableAIAnalytics?: boolean;
  enableAutomation?: boolean;
  searchTerm?: string;
}

/**
 * Marketing Preferences Statistics
 */
export interface MarketingPreferencesStatistics {
  userId: ID;
  totalPreferences: number;
  byPreferredChannel: Record<MarketingChannel, number>;
  byPreferredCampaignType: Record<MarketingCampaignType, number>;
  byPreferredObjective: Record<MarketingObjective, number>;
  byPreferredAudience: Record<MarketingAudienceType, number>;
  byPreferredMetric: Record<MarketingMetric, number>;
  byExcludedChannel: Record<MarketingChannel, number>;
  byExcludedCampaignType: Record<MarketingCampaignType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  notificationOnCampaignStartCount: number;
  notificationOnCampaignEndCount: number;
  notificationOnMetricThresholdCount: number;
  notificationOnReportGenerationCount: number;
  reportFrequencyDistribution: Record<string, number>;
  dashboardLayoutDistribution: Record<string, number>;
  defaultTimeframeDistribution: Record<string, number>;
  mostFrequentPreferredChannel: MarketingChannel;
  mostFrequentPreferredCampaignType: MarketingCampaignType;
  mostFrequentPreferredObjective: MarketingObjective;
  mostFrequentPreferredAudience: MarketingAudienceType;
  enablePersonalizationCount: number;
  enableRecommendationsCount: number;
  enableAIAnalyticsCount: number;
  enableAutomationCount: number;
}

/**
 * Marketing Preferences Summary
 */
export interface MarketingPreferencesSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPreferences: number;
  byPreferredChannel: Record<MarketingChannel, number>;
  byPreferredCampaignType: Record<MarketingCampaignType, number>;
  byPreferredObjective: Record<MarketingObjective, number>;
  byPreferredAudience: Record<MarketingAudienceType, number>;
  byPreferredMetric: Record<MarketingMetric, number>;
  byExcludedChannel: Record<MarketingChannel, number>;
  byExcludedCampaignType: Record<MarketingCampaignType, number>;
  preferencesTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topPreferredChannels: {
    channel: MarketingChannel;
    count: number;
    label: string;
  }[];
  topPreferredCampaignTypes: {
    campaignType: MarketingCampaignType;
    count: number;
    label: string;
  }[];
  topPreferredObjectives: {
    objective: MarketingObjective;
    count: number;
    label: string;
  }[];
  topPreferredAudiences: {
    audience: MarketingAudienceType;
    count: number;
    label: string;
  }[];
}

/**
 * Marketing Preferences Configuration
 */
export interface MarketingPreferencesConfiguration {
  enabled: boolean;
  defaultPreferredChannels: MarketingChannel[];
  defaultPreferredCampaignTypes: MarketingCampaignType[];
  defaultPreferredObjectives: MarketingObjective[];
  defaultPreferredAudiences: MarketingAudienceType[];
  defaultPreferredMetrics: MarketingMetric[];
  defaultExcludedChannels: MarketingChannel[];
  defaultExcludedCampaignTypes: MarketingCampaignType[];
  defaultNotificationOnCampaignStart: boolean;
  defaultNotificationOnCampaignEnd: boolean;
  defaultNotificationOnMetricThreshold: boolean;
  defaultNotificationOnReportGeneration: boolean;
  defaultMetricThresholdValue: number;
  defaultReportFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  defaultDashboardLayout: 'grid' | 'list' | 'compact';
  defaultTimeframe: '7d' | '30d' | '90d' | '1y' | 'custom';
  defaultEnablePersonalization: boolean;
  defaultEnableRecommendations: boolean;
  defaultEnableAIAnalytics: boolean;
  defaultEnableAutomation: boolean;
  maxPreferredChannels: number;
  maxPreferredCampaignTypes: number;
  maxPreferredObjectives: number;
  maxPreferredAudiences: number;
  maxPreferredMetrics: number;
  maxExcludedChannels: number;
  maxExcludedCampaignTypes: number;
  allowUserCustomization: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: MarketingPreferencesAlertConfig;
}

/**
 * Marketing Preferences Alert Configuration
 */
export interface MarketingPreferencesAlertConfig {
  enabled: boolean;
  invalidPreferencesAlert: boolean;
  duplicatePreferencesAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  securityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Marketing Preferences History
 */
export interface MarketingPreferencesHistory extends BaseEntity, Timestamp {
  id: ID;
  preferencesId: ID;
  userId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Marketing Preferences Validation
 */
export interface MarketingPreferencesValidation {
  isValid: boolean;
  preferencesId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Marketing Preferences Export
 */
export interface MarketingPreferencesExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: MarketingPreferencesFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Marketing Preferences Import
 */
export interface MarketingPreferencesImport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedPreferences: number;
  failedPreferences: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * Marketing Preferences Default
 */
export interface MarketingPreferencesDefault {
  preferredChannels: MarketingChannel[];
  preferredCampaignTypes: MarketingCampaignType[];
  preferredObjectives: MarketingObjective[];
  preferredAudiences: MarketingAudienceType[];
  preferredMetrics: MarketingMetric[];
  excludedChannels: MarketingChannel[];
  excludedCampaignTypes: MarketingCampaignType[];
  notificationOnCampaignStart: boolean;
  notificationOnCampaignEnd: boolean;
  notificationOnMetricThreshold: boolean;
  notificationOnReportGeneration: boolean;
  metricThresholdValue: number;
  reportFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  dashboardLayout: 'grid' | 'list' | 'compact';
  defaultTimeframe: '7d' | '30d' | '90d' | '1y' | 'custom';
  enablePersonalization: boolean;
  enableRecommendations: boolean;
  enableAIAnalytics: boolean;
  enableAutomation: boolean;
  version: string;
  updatedAt: Date;
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
  MarketingCampaignStatus,
  MarketingMetric,
};
