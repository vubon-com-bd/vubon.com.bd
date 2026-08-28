/**
 * SMS Marketing Types
 * Type definitions for SMS marketing based on shared-constants
 * @module SMSMarketingTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants sms marketing
// ============================================================
import {
  // SMS Marketing Core
  MARKETINGSMS,
  MarketingSMSType,
  MarketingSMSCategory,
  MarketingSMSPriority,
  MarketingSMSProvider,
  MarketingSMSSendingMethod,
  MarketingSMSTrackingType,
  MarketingSMSEngagement,
  MarketingSMSDefault,
  MarketingSMSLimit,
  marketingsmsGetTypeLabel,
  marketingsmsGetCategoryLabel,
  marketingsmsGetPriorityLabel,
  marketingsmsGetProviderLabel,
  marketingsmsGetSendingMethodLabel,
  marketingsmsGetTrackingTypeLabel,
  marketingsmsGetEngagementLabel,
  marketingsmsIsTransactional,
  marketingsmsIsPromotional,
  marketingsmsIsRelational,
  marketingsmsGetMaxSMSSegments,
  marketingsmsGetDefaultSenderId,
  marketingsmsGetDefaultCountryCode,
  marketingsmsGetDefaultValidityPeriod,
  marketingsmsGetDefaultOptOutMessage,
  // SMS Marketing Status
  MARKETINGSMS_STATUS,
  MarketingSMSStatusType,
  MarketingSMSStatusColor,
  MarketingSMSStatusCategory,
  MarketingSMSStatusOrder,
  MarketingSMSStatusTransition,
  marketingsmsGetStatusLabel,
  marketingsmsGetStatusColor,
  marketingsmsGetStatusCategory,
  marketingsmsIsDelivered,
  marketingsmsIsEngaged,
  marketingsmsIsFailed,
  marketingsmsIsPending,
  marketingsmsIsTerminal,
  marketingsmsCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// SMS Marketing Extended Types
// ============================================================

/**
 * SMS Marketing
 */
export interface SMSMarketing extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  message: string;
  type: MarketingSMSType;
  category: MarketingSMSCategory;
  priority: MarketingSMSPriority;
  provider: MarketingSMSProvider;
  sendingMethod: MarketingSMSSendingMethod;
  trackingType: MarketingSMSTrackingType;
  status: MarketingSMSStatusType;
  senderId: string;
  countryCode: string;
  validityPeriod: number;
  optOutMessage: string;
  segments: number;
  isTransactional: boolean;
  isPromotional: boolean;
  isRelational: boolean;
  isDelivered: boolean;
  isEngaged: boolean;
  isFailed: boolean;
  isPending: boolean;
  isTerminal: boolean;
  sentAt?: Date;
  deliveredAt?: Date;
  metadata?: Metadata;
}

/**
 * SMS Marketing Filter
 */
export interface SMSMarketingFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingSMSType[];
  categories?: MarketingSMSCategory[];
  priorities?: MarketingSMSPriority[];
  providers?: MarketingSMSProvider[];
  sendingMethods?: MarketingSMSSendingMethod[];
  trackingTypes?: MarketingSMSTrackingType[];
  statuses?: MarketingSMSStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isTransactional?: boolean;
  isPromotional?: boolean;
  isRelational?: boolean;
  isDelivered?: boolean;
  isEngaged?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  isTerminal?: boolean;
  searchTerm?: string;
}

/**
 * SMS Marketing Statistics
 */
export interface SMSMarketingStatistics {
  userId: ID;
  totalSMS: number;
  deliveredSMS: number;
  engagedSMS: number;
  failedSMS: number;
  pendingSMS: number;
  terminalSMS: number;
  byType: Record<MarketingSMSType, number>;
  byCategory: Record<MarketingSMSCategory, number>;
  byPriority: Record<MarketingSMSPriority, number>;
  byProvider: Record<MarketingSMSProvider, number>;
  bySendingMethod: Record<MarketingSMSSendingMethod, number>;
  byStatus: Record<MarketingSMSStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  transactionalCount: number;
  promotionalCount: number;
  relationalCount: number;
  deliveryRate: number;
  engagementRate: number;
  failureRate: number;
  totalSegments: number;
  averageSegments: number;
  maxSegments: number;
  minSegments: number;
  mostFrequentType: MarketingSMSType;
  mostFrequentCategory: MarketingSMSCategory;
  mostFrequentPriority: MarketingSMSPriority;
  mostFrequentStatus: MarketingSMSStatusType;
}

/**
 * SMS Marketing Summary
 */
export interface SMSMarketingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSMS: number;
  delivered: number;
  engaged: number;
  failed: number;
  pending: number;
  terminal: number;
  byType: Record<MarketingSMSType, number>;
  byCategory: Record<MarketingSMSCategory, number>;
  byPriority: Record<MarketingSMSPriority, number>;
  byProvider: Record<MarketingSMSProvider, number>;
  bySendingMethod: Record<MarketingSMSSendingMethod, number>;
  byStatus: Record<MarketingSMSStatusType, number>;
  smsTrend: {
    date: Date;
    total: number;
    delivered: number;
    engaged: number;
  }[];
  topTypes: {
    type: MarketingSMSType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: MarketingSMSCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingSMSStatusType;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    deliveryRate: number;
    engagementRate: number;
    failureRate: number;
    transactionalCount: number;
    promotionalCount: number;
    relationalCount: number;
  };
}

/**
 * SMS Marketing Configuration
 */
export interface SMSMarketingConfiguration {
  enabled: boolean;
  defaultType: MarketingSMSType;
  defaultCategory: MarketingSMSCategory;
  defaultPriority: MarketingSMSPriority;
  defaultProvider: MarketingSMSProvider;
  defaultSendingMethod: MarketingSMSSendingMethod;
  defaultTrackingType: MarketingSMSTrackingType;
  defaultSenderId: string;
  defaultCountryCode: string;
  defaultValidityPeriod: number;
  defaultOptOutMessage: string;
  maxSMSPerUser: number;
  maxSMSPerDay: number;
  maxSMSSegments: number;
  allowScheduling: boolean;
  allowTemplates: boolean;
  requireApproval: boolean;
  autoSend: boolean;
  notificationOnSend: boolean;
  notificationOnDelivery: boolean;
  notificationOnEngagement: boolean;
  notificationOnFailure: boolean;
  alertConfig?: SMSMarketingAlertConfig;
}

/**
 * SMS Marketing Alert Configuration
 */
export interface SMSMarketingAlertConfig {
  enabled: boolean;
  deliveryFailureAlert: boolean;
  engagementAlert: boolean;
  engagementThreshold: number;
  bounceAlert: boolean;
  bounceThreshold: number;
  spamAlert: boolean;
  spamThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * SMS Marketing History
 */
export interface SMSMarketingHistory extends BaseEntity, Timestamp {
  id: ID;
  smsId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'send'
    | 'deliver'
    | 'open'
    | 'click'
    | 'engage'
    | 'fail'
    | 'bounce'
    | 'archive'
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
 * SMS Marketing Validation
 */
export interface SMSMarketingValidation {
  isValid: boolean;
  smsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SMS Marketing Export
 */
export interface SMSMarketingExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: SMSMarketingFilter;
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
  // SMS Marketing Core
  MARKETINGSMS,
  MarketingSMSType,
  MarketingSMSCategory,
  MarketingSMSPriority,
  MarketingSMSProvider,
  MarketingSMSSendingMethod,
  MarketingSMSTrackingType,
  MarketingSMSEngagement,
  MarketingSMSDefault,
  MarketingSMSLimit,
  marketingsmsGetTypeLabel,
  marketingsmsGetCategoryLabel,
  marketingsmsGetPriorityLabel,
  marketingsmsGetProviderLabel,
  marketingsmsGetSendingMethodLabel,
  marketingsmsGetTrackingTypeLabel,
  marketingsmsGetEngagementLabel,
  marketingsmsIsTransactional,
  marketingsmsIsPromotional,
  marketingsmsIsRelational,
  marketingsmsGetMaxSMSSegments,
  marketingsmsGetDefaultSenderId,
  marketingsmsGetDefaultCountryCode,
  marketingsmsGetDefaultValidityPeriod,
  marketingsmsGetDefaultOptOutMessage,
  // SMS Marketing Status
  MARKETINGSMS_STATUS,
  MarketingSMSStatusType,
  MarketingSMSStatusColor,
  MarketingSMSStatusCategory,
  MarketingSMSStatusOrder,
  MarketingSMSStatusTransition,
  marketingsmsGetStatusLabel,
  marketingsmsGetStatusColor,
  marketingsmsGetStatusCategory,
  marketingsmsIsDelivered,
  marketingsmsIsEngaged,
  marketingsmsIsFailed,
  marketingsmsIsPending,
  marketingsmsIsTerminal,
  marketingsmsCanTransition,
};
