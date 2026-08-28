/**
 * Email Marketing Types
 * Type definitions for email marketing based on shared-constants
 * @module EmailMarketingTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants email marketing
// ============================================================
import {
  // Email Marketing Core
  MARKETINGEMAIL,
  MarketingEmailType,
  MarketingEmailCategory,
  MarketingEmailPriority,
  MarketingEmailProvider,
  MarketingEmailSendingMethod,
  MarketingEmailTrackingType,
  MarketingEmailEngagement,
  MarketingEmailDefault,
  MarketingEmailLimit,
  marketingemailGetTypeLabel,
  marketingemailGetCategoryLabel,
  marketingemailGetPriorityLabel,
  marketingemailGetProviderLabel,
  marketingemailGetSendingMethodLabel,
  marketingemailGetTrackingTypeLabel,
  marketingemailGetEngagementLabel,
  marketingemailIsTransactional,
  marketingemailIsPromotional,
  marketingemailIsEngagementEmail,
  marketingemailGetDefaultFromName,
  marketingemailGetDefaultFromEmail,
  marketingemailGetDefaultSendTime,
  // Email Marketing Status
  MARKETINGEMAIL_STATUS,
  MarketingEmailStatusType,
  MarketingEmailStatusColor,
  MarketingEmailStatusCategory,
  MarketingEmailStatusOrder,
  MarketingEmailStatusTransition,
  marketingemailGetStatusLabel,
  marketingemailGetStatusColor,
  marketingemailGetStatusCategory,
  marketingemailIsDelivered,
  marketingemailIsEngaged,
  marketingemailIsFailed,
  marketingemailIsPending,
  marketingemailIsTerminal,
  marketingemailCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Email Marketing Extended Types
// ============================================================

/**
 * Email Marketing
 */
export interface EmailMarketing extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  subject: string;
  content: string;
  type: MarketingEmailType;
  category: MarketingEmailCategory;
  priority: MarketingEmailPriority;
  provider: MarketingEmailProvider;
  sendingMethod: MarketingEmailSendingMethod;
  trackingType: MarketingEmailTrackingType;
  status: MarketingEmailStatusType;
  fromName: string;
  fromEmail: string;
  replyTo?: string;
  sendTime: Date;
  isTransactional: boolean;
  isPromotional: boolean;
  isEngagementEmail: boolean;
  isDelivered: boolean;
  isEngaged: boolean;
  isFailed: boolean;
  isPending: boolean;
  isTerminal: boolean;
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  clickedAt?: Date;
  metadata?: Metadata;
}

/**
 * Email Marketing Filter
 */
export interface EmailMarketingFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingEmailType[];
  categories?: MarketingEmailCategory[];
  priorities?: MarketingEmailPriority[];
  providers?: MarketingEmailProvider[];
  sendingMethods?: MarketingEmailSendingMethod[];
  trackingTypes?: MarketingEmailTrackingType[];
  statuses?: MarketingEmailStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isTransactional?: boolean;
  isPromotional?: boolean;
  isEngagementEmail?: boolean;
  isDelivered?: boolean;
  isEngaged?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  isTerminal?: boolean;
  searchTerm?: string;
}

/**
 * Email Marketing Statistics
 */
export interface EmailMarketingStatistics {
  userId: ID;
  totalEmails: number;
  deliveredEmails: number;
  engagedEmails: number;
  failedEmails: number;
  pendingEmails: number;
  terminalEmails: number;
  byType: Record<MarketingEmailType, number>;
  byCategory: Record<MarketingEmailCategory, number>;
  byPriority: Record<MarketingEmailPriority, number>;
  byProvider: Record<MarketingEmailProvider, number>;
  bySendingMethod: Record<MarketingEmailSendingMethod, number>;
  byStatus: Record<MarketingEmailStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  transactionalCount: number;
  promotionalCount: number;
  engagementCount: number;
  deliveryRate: number;
  engagementRate: number;
  failureRate: number;
  mostFrequentType: MarketingEmailType;
  mostFrequentCategory: MarketingEmailCategory;
  mostFrequentPriority: MarketingEmailPriority;
  mostFrequentStatus: MarketingEmailStatusType;
}

/**
 * Email Marketing Summary
 */
export interface EmailMarketingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalEmails: number;
  delivered: number;
  engaged: number;
  failed: number;
  pending: number;
  terminal: number;
  byType: Record<MarketingEmailType, number>;
  byCategory: Record<MarketingEmailCategory, number>;
  byPriority: Record<MarketingEmailPriority, number>;
  byProvider: Record<MarketingEmailProvider, number>;
  bySendingMethod: Record<MarketingEmailSendingMethod, number>;
  byStatus: Record<MarketingEmailStatusType, number>;
  emailTrend: {
    date: Date;
    total: number;
    delivered: number;
    engaged: number;
  }[];
  topTypes: {
    type: MarketingEmailType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: MarketingEmailCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingEmailStatusType;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    deliveryRate: number;
    engagementRate: number;
    failureRate: number;
    transactionalCount: number;
    promotionalCount: number;
    engagementCount: number;
  };
}

/**
 * Email Marketing Configuration
 */
export interface EmailMarketingConfiguration {
  enabled: boolean;
  defaultType: MarketingEmailType;
  defaultCategory: MarketingEmailCategory;
  defaultPriority: MarketingEmailPriority;
  defaultProvider: MarketingEmailProvider;
  defaultSendingMethod: MarketingEmailSendingMethod;
  defaultTrackingType: MarketingEmailTrackingType;
  defaultFromName: string;
  defaultFromEmail: string;
  defaultSendTime: string;
  maxEmailsPerUser: number;
  maxEmailsPerDay: number;
  allowScheduling: boolean;
  allowTemplates: boolean;
  requireApproval: boolean;
  autoSend: boolean;
  notificationOnSend: boolean;
  notificationOnDelivery: boolean;
  notificationOnEngagement: boolean;
  notificationOnFailure: boolean;
  alertConfig?: EmailMarketingAlertConfig;
}

/**
 * Email Marketing Alert Configuration
 */
export interface EmailMarketingAlertConfig {
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
 * Email Marketing History
 */
export interface EmailMarketingHistory extends BaseEntity, Timestamp {
  id: ID;
  emailId: ID;
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
 * Email Marketing Validation
 */
export interface EmailMarketingValidation {
  isValid: boolean;
  emailId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Email Marketing Export
 */
export interface EmailMarketingExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: EmailMarketingFilter;
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
  // Email Marketing Core
  MARKETINGEMAIL,
  MarketingEmailType,
  MarketingEmailCategory,
  MarketingEmailPriority,
  MarketingEmailProvider,
  MarketingEmailSendingMethod,
  MarketingEmailTrackingType,
  MarketingEmailEngagement,
  MarketingEmailDefault,
  MarketingEmailLimit,
  marketingemailGetTypeLabel,
  marketingemailGetCategoryLabel,
  marketingemailGetPriorityLabel,
  marketingemailGetProviderLabel,
  marketingemailGetSendingMethodLabel,
  marketingemailGetTrackingTypeLabel,
  marketingemailGetEngagementLabel,
  marketingemailIsTransactional,
  marketingemailIsPromotional,
  marketingemailIsEngagementEmail,
  marketingemailGetDefaultFromName,
  marketingemailGetDefaultFromEmail,
  marketingemailGetDefaultSendTime,
  // Email Marketing Status
  MARKETINGEMAIL_STATUS,
  MarketingEmailStatusType,
  MarketingEmailStatusColor,
  MarketingEmailStatusCategory,
  MarketingEmailStatusOrder,
  MarketingEmailStatusTransition,
  marketingemailGetStatusLabel,
  marketingemailGetStatusColor,
  marketingemailGetStatusCategory,
  marketingemailIsDelivered,
  marketingemailIsEngaged,
  marketingemailIsFailed,
  marketingemailIsPending,
  marketingemailIsTerminal,
  marketingemailCanTransition,
};
