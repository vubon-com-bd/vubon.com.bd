/**
 * Lead Types
 * Type definitions for leads based on shared-constants
 * @module LeadTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants lead generation
// ============================================================
import {
  // Lead Core
  MARKETINGLEAD,
  MarketingLeadType,
  MarketingLeadCategory,
  MarketingLeadChannel,
  MarketingLeadMethod,
  MarketingLeadScore,
  MarketingLeadConversionRate,
  MarketingLeadDefault,
  MarketingLeadLimit,
  marketingleadGetTypeLabel,
  marketingleadGetChannelLabel,
  marketingleadGetMethodLabel,
  marketingleadGetScoreLabel,
  marketingleadGetDefaultScore,
  marketingleadGetDefaultConversionRate,
  marketingleadGetQualificationThreshold,
  marketingleadIsInbound,
  marketingleadIsOutbound,
  marketingleadIsQualified,
  marketingleadIsHot,
  marketingleadIsWarm,
  marketingleadIsCold,
  // Lead Status
  MARKETINGLEAD_LEAD_STATUS,
  MarketingLeadLeadStatusType,
  MarketingLeadLeadStatusColor,
  MarketingLeadLeadStatusCategory,
  MarketingLeadLeadStatusOrder,
  MarketingLeadLeadStatusTransition,
  marketingleadLeadGetStatusLabel,
  marketingleadLeadGetStatusColor,
  marketingleadLeadGetStatusCategory,
  marketingleadLeadIsQualified,
  marketingleadLeadIsActive,
  marketingleadIsLost,
  marketingleadLeadCanTransition,
  // Lead Source
  MARKETINGLEAD_SOURCE,
  MarketingLeadSource,
  MarketingLeadSourceCategory,
  MarketingLeadSourceQualityScore,
  MarketingLeadSourceTrustLevel,
  MarketingLeadSourceCostLevel,
  MarketingLeadSourceDefault,
  marketingleadGetSourceLabel,
  marketingleadGetSourceCategory,
  marketingleadGetSourceQualityScore,
  marketingleadGetSourceTrustLevel,
  marketingleadGetSourceCostLevel,
  marketingleadGetDefaultSource,
  marketingleadIsOrganicSource,
  marketingleadIsPaidSource,
  marketingleadIsHighQualitySource,
} from '@vubon/shared-constants';

// ============================================================
// Lead Extended Types
// ============================================================

/**
 * Lead
 */
export interface Lead extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: MarketingLeadType;
  category: MarketingLeadCategory;
  channel: MarketingLeadChannel;
  method: MarketingLeadMethod;
  status: MarketingLeadLeadStatusType;
  source: MarketingLeadSource;
  score: MarketingLeadScore;
  conversionRate: MarketingLeadConversionRate;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  isInbound: boolean;
  isOutbound: boolean;
  isQualified: boolean;
  isHot: boolean;
  isWarm: boolean;
  isCold: boolean;
  isActive: boolean;
  isLost: boolean;
  qualifiedAt?: Date;
  lostAt?: Date;
  metadata?: Metadata;
}

/**
 * Lead Filter
 */
export interface LeadFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingLeadType[];
  categories?: MarketingLeadCategory[];
  channels?: MarketingLeadChannel[];
  methods?: MarketingLeadMethod[];
  statuses?: MarketingLeadLeadStatusType[];
  sources?: MarketingLeadSource[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isInbound?: boolean;
  isOutbound?: boolean;
  isQualified?: boolean;
  isHot?: boolean;
  isWarm?: boolean;
  isCold?: boolean;
  isActive?: boolean;
  isLost?: boolean;
  minScore?: number;
  maxScore?: number;
  minConversionRate?: number;
  maxConversionRate?: number;
  searchTerm?: string;
}

/**
 * Lead Statistics
 */
export interface LeadStatistics {
  userId: ID;
  totalLeads: number;
  qualifiedLeads: number;
  activeLeads: number;
  lostLeads: number;
  byType: Record<MarketingLeadType, number>;
  byCategory: Record<MarketingLeadCategory, number>;
  byChannel: Record<MarketingLeadChannel, number>;
  byMethod: Record<MarketingLeadMethod, number>;
  byStatus: Record<MarketingLeadLeadStatusType, number>;
  bySource: Record<MarketingLeadSource, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  inboundCount: number;
  outboundCount: number;
  hotCount: number;
  warmCount: number;
  coldCount: number;
  averageScore: number;
  maxScore: number;
  minScore: number;
  averageConversionRate: number;
  maxConversionRate: number;
  minConversionRate: number;
  qualificationRate: number;
  lossRate: number;
  mostFrequentType: MarketingLeadType;
  mostFrequentChannel: MarketingLeadChannel;
  mostFrequentSource: MarketingLeadSource;
  mostFrequentStatus: MarketingLeadLeadStatusType;
}

/**
 * Lead Summary
 */
export interface LeadSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalLeads: number;
  qualified: number;
  active: number;
  lost: number;
  byType: Record<MarketingLeadType, number>;
  byCategory: Record<MarketingLeadCategory, number>;
  byChannel: Record<MarketingLeadChannel, number>;
  byMethod: Record<MarketingLeadMethod, number>;
  byStatus: Record<MarketingLeadLeadStatusType, number>;
  bySource: Record<MarketingLeadSource, number>;
  leadTrend: {
    date: Date;
    total: number;
    qualified: number;
    active: number;
  }[];
  topTypes: {
    type: MarketingLeadType;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: MarketingLeadChannel;
    count: number;
    label: string;
  }[];
  topSources: {
    source: MarketingLeadSource;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingLeadLeadStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Lead Configuration
 */
export interface LeadConfiguration {
  enabled: boolean;
  defaultType: MarketingLeadType;
  defaultCategory: MarketingLeadCategory;
  defaultChannel: MarketingLeadChannel;
  defaultMethod: MarketingLeadMethod;
  defaultStatus: MarketingLeadLeadStatusType;
  defaultSource: MarketingLeadSource;
  defaultScore: number;
  defaultConversionRate: number;
  qualificationThreshold: number;
  maxLeadsPerUser: number;
  maxLeadsPerDay: number;
  allowInbound: boolean;
  allowOutbound: boolean;
  autoQualify: boolean;
  autoScore: boolean;
  notificationOnCreate: boolean;
  notificationOnQualify: boolean;
  notificationOnConvert: boolean;
  notificationOnLost: boolean;
  alertConfig?: LeadAlertConfig;
}

/**
 * Lead Alert Configuration
 */
export interface LeadAlertConfig {
  enabled: boolean;
  highScoreAlert: boolean;
  highScoreThreshold: number;
  lowScoreAlert: boolean;
  lowScoreThreshold: number;
  qualificationAlert: boolean;
  conversionAlert: boolean;
  conversionThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Lead History
 */
export interface LeadHistory extends BaseEntity, Timestamp {
  id: ID;
  leadId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'qualify'
    | 'unqualify'
    | 'convert'
    | 'lost'
    | 'restore'
    | 'delete'
    | 'score_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Lead Validation
 */
export interface LeadValidation {
  isValid: boolean;
  leadId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Lead Export
 */
export interface LeadExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: LeadFilter;
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
  // Lead Core
  MARKETINGLEAD,
  MarketingLeadType,
  MarketingLeadCategory,
  MarketingLeadChannel,
  MarketingLeadMethod,
  MarketingLeadScore,
  MarketingLeadConversionRate,
  MarketingLeadDefault,
  MarketingLeadLimit,
  marketingleadGetTypeLabel,
  marketingleadGetChannelLabel,
  marketingleadGetMethodLabel,
  marketingleadGetScoreLabel,
  marketingleadGetDefaultScore,
  marketingleadGetDefaultConversionRate,
  marketingleadGetQualificationThreshold,
  marketingleadIsInbound,
  marketingleadIsOutbound,
  marketingleadIsQualified,
  marketingleadIsHot,
  marketingleadIsWarm,
  marketingleadIsCold,
  // Lead Status
  MARKETINGLEAD_LEAD_STATUS,
  MarketingLeadLeadStatusType,
  MarketingLeadLeadStatusColor,
  MarketingLeadLeadStatusCategory,
  MarketingLeadLeadStatusOrder,
  MarketingLeadLeadStatusTransition,
  marketingleadLeadGetStatusLabel,
  marketingleadLeadGetStatusColor,
  marketingleadLeadGetStatusCategory,
  marketingleadLeadIsQualified,
  marketingleadLeadIsActive,
  marketingleadIsLost,
  marketingleadLeadCanTransition,
  // Lead Source
  MARKETINGLEAD_SOURCE,
  MarketingLeadSource,
  MarketingLeadSourceCategory,
  MarketingLeadSourceQualityScore,
  MarketingLeadSourceTrustLevel,
  MarketingLeadSourceCostLevel,
  MarketingLeadSourceDefault,
  marketingleadGetSourceLabel,
  marketingleadGetSourceCategory,
  marketingleadGetSourceQualityScore,
  marketingleadGetSourceTrustLevel,
  marketingleadGetSourceCostLevel,
  marketingleadGetDefaultSource,
  marketingleadIsOrganicSource,
  marketingleadIsPaidSource,
  marketingleadIsHighQualitySource,
};
