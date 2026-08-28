/**
 * Campaign Types
 * Type definitions for marketing campaigns based on shared-constants
 * @module CampaignTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants marketing
// ============================================================
import {
  // Marketing Core
  MARKETING,
  MarketingChannel,
  MarketingCampaignType,
  MarketingObjective,
  MarketingAudienceType,
  MarketingBudgetType,
  MarketingBiddingStrategy,
  MarketingAttributionModel,
  MarketingCampaignStatus,
  MarketingMetric,
  MarketingTrigger,
  MarketingAction,
  MarketingPermission,
  MarketingErrorType,
  MarketingDefault,
  getMarketingChannelLabel,
  getMarketingCampaignTypeLabel,
  getMarketingObjectiveLabel,
  getMarketingAudienceTypeLabel,
  getMarketingCampaignStatusLabel,
  getMarketingMetricLabel,
  getMarketingTriggerLabel,
  getMarketingActionLabel,
  getMarketingErrorLabel,
  getMarketingAttributionModelLabel,
  isCampaignActive,
  isCampaignEditable,
  isCampaignEnded,
} from '@vubon/shared-constants';

// ============================================================
// Campaign Extended Types
// ============================================================

/**
 * Campaign
 */
export interface Campaign extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  description?: string;
  type: MarketingCampaignType;
  channel: MarketingChannel;
  objective: MarketingObjective;
  audience: MarketingAudienceType;
  status: MarketingCampaignStatus;
  budget: number;
  budgetType: MarketingBudgetType;
  biddingStrategy: MarketingBiddingStrategy;
  attributionModel: MarketingAttributionModel;
  metrics: Record<MarketingMetric, number>;
  triggers: MarketingTrigger[];
  actions: MarketingAction[];
  permissions: MarketingPermission[];
  isActive: boolean;
  isEditable: boolean;
  isEnded: boolean;
  startDate: Date;
  endDate?: Date;
  metadata?: Metadata;
}

/**
 * Campaign Filter
 */
export interface CampaignFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingCampaignType[];
  channels?: MarketingChannel[];
  objectives?: MarketingObjective[];
  audiences?: MarketingAudienceType[];
  statuses?: MarketingCampaignStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isEditable?: boolean;
  isEnded?: boolean;
  minBudget?: number;
  maxBudget?: number;
  searchTerm?: string;
}

/**
 * Campaign Statistics
 */
export interface CampaignStatistics {
  userId: ID;
  totalCampaigns: number;
  activeCampaigns: number;
  editableCampaigns: number;
  endedCampaigns: number;
  byType: Record<MarketingCampaignType, number>;
  byChannel: Record<MarketingChannel, number>;
  byObjective: Record<MarketingObjective, number>;
  byAudience: Record<MarketingAudienceType, number>;
  byStatus: Record<MarketingCampaignStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalBudget: number;
  averageBudget: number;
  maxBudget: number;
  minBudget: number;
  mostFrequentType: MarketingCampaignType;
  mostFrequentChannel: MarketingChannel;
  mostFrequentObjective: MarketingObjective;
  mostFrequentStatus: MarketingCampaignStatus;
}

/**
 * Campaign Summary
 */
export interface CampaignSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  editable: number;
  ended: number;
  byType: Record<MarketingCampaignType, number>;
  byChannel: Record<MarketingChannel, number>;
  byObjective: Record<MarketingObjective, number>;
  byAudience: Record<MarketingAudienceType, number>;
  byStatus: Record<MarketingCampaignStatus, number>;
  campaignTrend: {
    date: Date;
    total: number;
    active: number;
    ended: number;
  }[];
  topTypes: {
    type: MarketingCampaignType;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: MarketingChannel;
    count: number;
    label: string;
  }[];
  topObjectives: {
    objective: MarketingObjective;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingCampaignStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Campaign Configuration
 */
export interface CampaignConfiguration {
  enabled: boolean;
  defaultType: MarketingCampaignType;
  defaultChannel: MarketingChannel;
  defaultObjective: MarketingObjective;
  defaultAudience: MarketingAudienceType;
  defaultStatus: MarketingCampaignStatus;
  defaultBudgetType: MarketingBudgetType;
  defaultBiddingStrategy: MarketingBiddingStrategy;
  defaultAttributionModel: MarketingAttributionModel;
  maxCampaignsPerUser: number;
  minBudget: number;
  maxBudget: number;
  allowMultipleChannels: boolean;
  allowMultipleObjectives: boolean;
  requireApproval: boolean;
  autoEnd: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnStart: boolean;
  notificationOnEnd: boolean;
  notificationOnDelete: boolean;
  alertConfig?: CampaignAlertConfig;
}

/**
 * Campaign Alert Configuration
 */
export interface CampaignAlertConfig {
  enabled: boolean;
  budgetAlert: boolean;
  budgetThreshold: number;
  performanceAlert: boolean;
  performanceThreshold: number;
  pendingApprovalAlert: boolean;
  campaignEndAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Campaign History
 */
export interface CampaignHistory extends BaseEntity, Timestamp {
  id: ID;
  campaignId: ID;
  userId: ID;
  action:
    'create' | 'update' | 'start' | 'pause' | 'resume' | 'end' | 'archive' | 'restore' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Campaign Validation
 */
export interface CampaignValidation {
  isValid: boolean;
  campaignId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Campaign Export
 */
export interface CampaignExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CampaignFilter;
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
  MARKETING,
  MarketingChannel,
  MarketingCampaignType,
  MarketingObjective,
  MarketingAudienceType,
  MarketingBudgetType,
  MarketingBiddingStrategy,
  MarketingAttributionModel,
  MarketingCampaignStatus,
  MarketingMetric,
  MarketingTrigger,
  MarketingAction,
  MarketingPermission,
  MarketingErrorType,
  MarketingDefault,
  getMarketingChannelLabel,
  getMarketingCampaignTypeLabel,
  getMarketingObjectiveLabel,
  getMarketingAudienceTypeLabel,
  getMarketingCampaignStatusLabel,
  getMarketingMetricLabel,
  getMarketingTriggerLabel,
  getMarketingActionLabel,
  getMarketingErrorLabel,
  getMarketingAttributionModelLabel,
  isCampaignActive,
  isCampaignEditable,
  isCampaignEnded,
};
