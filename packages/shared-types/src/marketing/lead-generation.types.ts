/**
 * Lead Generation Types
 * Type definitions for lead generation based on shared-constants
 * @module LeadGenerationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants lead generation
// ============================================================
import {
  // Lead Generation Core
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
  // Lead Generation Status
  MARKETINGLEAD_GEN_STATUS,
  MarketingLeadGenStatusType,
  MarketingLeadGenStatusColor,
  MarketingLeadGenStatusCategory,
  MarketingLeadGenStatusOrder,
  MarketingLeadGenStatusTransition,
  marketingleadGenGetStatusLabel,
  marketingleadGenGetStatusColor,
  marketingleadGenGetStatusCategory,
  marketingleadGenIsActive,
  marketingleadGenIsPending,
  marketingleadGenIsCompleted,
  marketingleadGenCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Lead Generation Extended Types
// ============================================================

/**
 * Lead Generation
 */
export interface LeadGeneration extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  description?: string;
  type: MarketingLeadType;
  category: MarketingLeadCategory;
  channel: MarketingLeadChannel;
  method: MarketingLeadMethod;
  status: MarketingLeadGenStatusType;
  score: MarketingLeadScore;
  conversionRate: MarketingLeadConversionRate;
  qualificationThreshold: number;
  isInbound: boolean;
  isOutbound: boolean;
  isActive: boolean;
  isPending: boolean;
  isCompleted: boolean;
  startedAt: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * Lead Generation Filter
 */
export interface LeadGenerationFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingLeadType[];
  categories?: MarketingLeadCategory[];
  channels?: MarketingLeadChannel[];
  methods?: MarketingLeadMethod[];
  statuses?: MarketingLeadGenStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isInbound?: boolean;
  isOutbound?: boolean;
  isActive?: boolean;
  isPending?: boolean;
  isCompleted?: boolean;
  minScore?: number;
  maxScore?: number;
  minConversionRate?: number;
  maxConversionRate?: number;
  searchTerm?: string;
}

/**
 * Lead Generation Statistics
 */
export interface LeadGenerationStatistics {
  userId: ID;
  totalLeadGenerations: number;
  activeLeadGenerations: number;
  pendingLeadGenerations: number;
  completedLeadGenerations: number;
  byType: Record<MarketingLeadType, number>;
  byCategory: Record<MarketingLeadCategory, number>;
  byChannel: Record<MarketingLeadChannel, number>;
  byMethod: Record<MarketingLeadMethod, number>;
  byStatus: Record<MarketingLeadGenStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  inboundCount: number;
  outboundCount: number;
  averageScore: number;
  maxScore: number;
  minScore: number;
  averageConversionRate: number;
  maxConversionRate: number;
  minConversionRate: number;
  mostFrequentType: MarketingLeadType;
  mostFrequentChannel: MarketingLeadChannel;
  mostFrequentMethod: MarketingLeadMethod;
  mostFrequentStatus: MarketingLeadGenStatusType;
}

/**
 * Lead Generation Summary
 */
export interface LeadGenerationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalLeadGenerations: number;
  active: number;
  pending: number;
  completed: number;
  byType: Record<MarketingLeadType, number>;
  byCategory: Record<MarketingLeadCategory, number>;
  byChannel: Record<MarketingLeadChannel, number>;
  byMethod: Record<MarketingLeadMethod, number>;
  byStatus: Record<MarketingLeadGenStatusType, number>;
  leadGenTrend: {
    date: Date;
    total: number;
    active: number;
    completed: number;
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
  topMethods: {
    method: MarketingLeadMethod;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingLeadGenStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Lead Generation Configuration
 */
export interface LeadGenerationConfiguration {
  enabled: boolean;
  defaultType: MarketingLeadType;
  defaultCategory: MarketingLeadCategory;
  defaultChannel: MarketingLeadChannel;
  defaultMethod: MarketingLeadMethod;
  defaultStatus: MarketingLeadGenStatusType;
  defaultScore: number;
  defaultConversionRate: number;
  qualificationThreshold: number;
  maxLeadGenerationsPerUser: number;
  maxLeadGenerationsPerDay: number;
  allowInbound: boolean;
  allowOutbound: boolean;
  autoStart: boolean;
  autoComplete: boolean;
  notificationOnCreate: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnDelete: boolean;
  alertConfig?: LeadGenerationAlertConfig;
}

/**
 * Lead Generation Alert Configuration
 */
export interface LeadGenerationAlertConfig {
  enabled: boolean;
  lowConversionAlert: boolean;
  lowConversionThreshold: number;
  highConversionAlert: boolean;
  highConversionThreshold: number;
  pendingAlert: boolean;
  pendingThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Lead Generation History
 */
export interface LeadGenerationHistory extends BaseEntity, Timestamp {
  id: ID;
  leadGenId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'start'
    | 'pause'
    | 'resume'
    | 'complete'
    | 'archive'
    | 'restore'
    | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Lead Generation Validation
 */
export interface LeadGenerationValidation {
  isValid: boolean;
  leadGenId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Lead Generation Export
 */
export interface LeadGenerationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: LeadGenerationFilter;
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
  // Lead Generation Core
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
  // Lead Generation Status
  MARKETINGLEAD_GEN_STATUS,
  MarketingLeadGenStatusType,
  MarketingLeadGenStatusColor,
  MarketingLeadGenStatusCategory,
  MarketingLeadGenStatusOrder,
  MarketingLeadGenStatusTransition,
  marketingleadGenGetStatusLabel,
  marketingleadGenGetStatusColor,
  marketingleadGenGetStatusCategory,
  marketingleadGenIsActive,
  marketingleadGenIsPending,
  marketingleadGenIsCompleted,
  marketingleadGenCanTransition,
};
