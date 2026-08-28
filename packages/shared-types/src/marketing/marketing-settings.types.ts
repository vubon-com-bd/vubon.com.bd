/**
 * Marketing Settings Types
 * Type definitions for marketing settings based on shared-constants
 * @module MarketingSettingsTypes
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
  MarketingMetric,
} from '@vubon/shared-constants';

// ============================================================
// Marketing Settings Extended Types
// ============================================================

/**
 * Marketing Settings
 */
export interface MarketingSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  defaultChannel: MarketingChannel;
  defaultCampaignType: MarketingCampaignType;
  defaultObjective: MarketingObjective;
  defaultAudience: MarketingAudienceType;
  defaultBudgetType: MarketingBudgetType;
  defaultBiddingStrategy: MarketingBiddingStrategy;
  defaultAttributionModel: MarketingAttributionModel;
  defaultCurrency: string;
  defaultLocale: string;
  defaultTimezone: string;
  maxCampaignsPerUser: number;
  maxBudget: number;
  minBudget: number;
  allowMultipleChannels: boolean;
  allowMultipleObjectives: boolean;
  requireApproval: boolean;
  autoStart: boolean;
  autoEnd: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStart: boolean;
  notificationOnEnd: boolean;
  notificationOnDelete: boolean;
  metadata?: Metadata;
}

/**
 * Marketing Settings Filter
 */
export interface MarketingSettingsFilter {
  ids?: ID[];
  userIds?: ID[];
  defaultChannels?: MarketingChannel[];
  defaultCampaignTypes?: MarketingCampaignType[];
  defaultObjectives?: MarketingObjective[];
  defaultAudiences?: MarketingAudienceType[];
  defaultBudgetTypes?: MarketingBudgetType[];
  defaultBiddingStrategies?: MarketingBiddingStrategy[];
  defaultAttributionModels?: MarketingAttributionModel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  requireApproval?: boolean;
  autoStart?: boolean;
  autoEnd?: boolean;
  searchTerm?: string;
}

/**
 * Marketing Settings Statistics
 */
export interface MarketingSettingsStatistics {
  userId: ID;
  totalSettings: number;
  byDefaultChannel: Record<MarketingChannel, number>;
  byDefaultCampaignType: Record<MarketingCampaignType, number>;
  byDefaultObjective: Record<MarketingObjective, number>;
  byDefaultAudience: Record<MarketingAudienceType, number>;
  byDefaultBudgetType: Record<MarketingBudgetType, number>;
  byDefaultBiddingStrategy: Record<MarketingBiddingStrategy, number>;
  byDefaultAttributionModel: Record<MarketingAttributionModel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageMaxCampaigns: number;
  averageMaxBudget: number;
  averageMinBudget: number;
  mostFrequentDefaultChannel: MarketingChannel;
  mostFrequentDefaultCampaignType: MarketingCampaignType;
  mostFrequentDefaultObjective: MarketingObjective;
  mostFrequentDefaultAudience: MarketingAudienceType;
}

/**
 * Marketing Settings Summary
 */
export interface MarketingSettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettings: number;
  byDefaultChannel: Record<MarketingChannel, number>;
  byDefaultCampaignType: Record<MarketingCampaignType, number>;
  byDefaultObjective: Record<MarketingObjective, number>;
  byDefaultAudience: Record<MarketingAudienceType, number>;
  byDefaultBudgetType: Record<MarketingBudgetType, number>;
  byDefaultBiddingStrategy: Record<MarketingBiddingStrategy, number>;
  byDefaultAttributionModel: Record<MarketingAttributionModel, number>;
  settingsTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topDefaultChannels: {
    channel: MarketingChannel;
    count: number;
    label: string;
  }[];
  topDefaultCampaignTypes: {
    type: MarketingCampaignType;
    count: number;
    label: string;
  }[];
  topDefaultObjectives: {
    objective: MarketingObjective;
    count: number;
    label: string;
  }[];
  topDefaultAudiences: {
    audience: MarketingAudienceType;
    count: number;
    label: string;
  }[];
}

/**
 * Marketing Settings Configuration
 */
export interface MarketingSettingsConfiguration {
  enabled: boolean;
  defaultChannel: MarketingChannel;
  defaultCampaignType: MarketingCampaignType;
  defaultObjective: MarketingObjective;
  defaultAudience: MarketingAudienceType;
  defaultBudgetType: MarketingBudgetType;
  defaultBiddingStrategy: MarketingBiddingStrategy;
  defaultAttributionModel: MarketingAttributionModel;
  defaultCurrency: string;
  defaultLocale: string;
  defaultTimezone: string;
  maxCampaignsPerUser: number;
  maxBudget: number;
  minBudget: number;
  allowMultipleChannels: boolean;
  allowMultipleObjectives: boolean;
  requireApproval: boolean;
  autoStart: boolean;
  autoEnd: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStart: boolean;
  notificationOnEnd: boolean;
  notificationOnDelete: boolean;
  alertConfig?: MarketingSettingsAlertConfig;
}

/**
 * Marketing Settings Alert Configuration
 */
export interface MarketingSettingsAlertConfig {
  enabled: boolean;
  invalidSettingsAlert: boolean;
  duplicateSettingsAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  securityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Marketing Settings History
 */
export interface MarketingSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
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
 * Marketing Settings Validation
 */
export interface MarketingSettingsValidation {
  isValid: boolean;
  settingsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Marketing Settings Export
 */
export interface MarketingSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: MarketingSettingsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Marketing Settings Import
 */
export interface MarketingSettingsImport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedSettings: number;
  failedSettings: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * Marketing Settings Default
 */
export interface MarketingSettingsDefault {
  channel: MarketingChannel;
  campaignType: MarketingCampaignType;
  objective: MarketingObjective;
  audience: MarketingAudienceType;
  budgetType: MarketingBudgetType;
  biddingStrategy: MarketingBiddingStrategy;
  attributionModel: MarketingAttributionModel;
  currency: string;
  locale: string;
  timezone: string;
  maxCampaignsPerUser: number;
  maxBudget: number;
  minBudget: number;
  allowMultipleChannels: boolean;
  allowMultipleObjectives: boolean;
  requireApproval: boolean;
  autoStart: boolean;
  autoEnd: boolean;
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
  MarketingBudgetType,
  MarketingBiddingStrategy,
  MarketingAttributionModel,
  MarketingMetric,
};
