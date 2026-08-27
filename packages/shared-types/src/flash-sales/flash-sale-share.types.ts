/**
 * Flash Sale Share Types
 * Type definitions for flash sale sharing based on shared-constants
 * @module FlashSaleShareTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales share
// ============================================================
import {
  // Share Core
  FLASH_SALE_SHARE,
  FlashSaleShareType,
  FlashSaleSharePlatform,
  FlashSaleShareCategory,
  FlashSaleShareContent,
  FlashSaleShareVisibility,
  FlashSaleShareAnalytic,
  flashsalesShareGetTypeLabel,
  flashsalesShareGetPlatformLabel,
  flashsalesShareGetCategoryLabel,
  flashsalesShareGetContentLabel,
  flashsalesShareGetVisibilityLabel,
  flashsalesShareGetAnalyticLabel,
  flashsalesShareIsValidType,
  flashsalesShareIsValidPlatform,
  flashsalesShareIsValidCategory,
  flashsalesShareIsValidContent,
  flashsalesShareIsSocialPlatform,
  flashsalesShareIsMessagingPlatform,
  flashsalesShareGetDefaultMaxSharesPerDay,
  flashsalesShareGetDefaultMaxSharesPerUser,
  flashsalesShareGetDefaultExpiryDays,
  flashsalesShareGetMaxSharesPerDay,
  flashsalesShareGetMaxSharesPerUser,
  flashsalesShareGetMaxMessageLength,
  flashsalesShareGetMaxImageSizeMB,
  flashsalesShareGetMaxVideoSizeMB,
  // Share Type
  FLASH_SALE_SHARE_TYPE,
  FlashSaleShareTypeCategory,
  FlashSaleShareTypeComplexity,
  FlashSaleShareTypeScope,
  FlashSaleShareTypeFrequency,
  FlashSaleShareTypeTrigger,
  FlashSaleShareTypePriority,
  FlashSaleShareTypeEngagement,
  flashsalesShareTypeGetCategoryLabel,
  flashsalesShareTypeGetComplexityLabel,
  flashsalesShareTypeGetScopeLabel,
  flashsalesShareTypeGetFrequencyLabel,
  flashsalesShareTypeGetTriggerLabel,
  flashsalesShareTypeGetPriorityLabel,
  flashsalesShareTypeGetEngagementLabel,
  flashsalesShareTypeIsValidCategory,
  flashsalesShareTypeIsValidScope,
  flashsalesShareTypeIsValidTrigger,
  flashsalesShareTypeIsHighPriority,
  flashsalesShareTypeIsRecurring,
  flashsalesShareTypeIsViral,
  // Share Status
  FLASH_SALE_SHARE_STATUS,
  FlashSaleShareStatusType,
  FlashSaleShareStatusCategory,
  FlashSaleShareStatusColor,
  FlashSaleShareStatusPriority,
  FlashSaleShareDeliveryStatus,
  FlashSaleShareEngagementStatus,
  flashsalesShareStatusGetLabel,
  flashsalesShareStatusGetCategory,
  flashsalesShareStatusGetColor,
  flashsalesShareStatusGetPriority,
  flashsalesShareStatusIsActive,
  flashsalesShareStatusIsComplete,
  flashsalesShareStatusCanTransitionTo,
  flashsalesShareStatusGetAvailableTransitions,
  flashsalesShareStatusCanProcess,
  flashsalesShareStatusCanComplete,
  flashsalesShareStatusCanRetry,
  flashsalesShareStatusCanCancel,
  flashsalesShareStatusCanArchive,
  flashsalesShareStatusGetDeliveryStatusLabel,
  flashsalesShareStatusGetEngagementStatusLabel,
  flashsalesShareStatusIsValid,
  flashsalesShareStatusIsValidDeliveryStatus,
  flashsalesShareStatusIsValidEngagementStatus,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Share Extended Types
// ============================================================

/**
 * Flash Sale Share
 */
export interface FlashSaleShare extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  userId: ID;
  type: FlashSaleShareType;
  platform: FlashSaleSharePlatform;
  category: FlashSaleShareCategory;
  content: FlashSaleShareContent;
  visibility: FlashSaleShareVisibility;
  analytic: FlashSaleShareAnalytic;
  status: FlashSaleShareStatusType;
  deliveryStatus: FlashSaleShareDeliveryStatus;
  engagementStatus: FlashSaleShareEngagementStatus;
  title: string;
  message: string;
  url: string;
  imageUrl?: string;
  videoUrl?: string;
  isActive: boolean;
  isComplete: boolean;
  isSocialPlatform: boolean;
  isMessagingPlatform: boolean;
  isHighPriority: boolean;
  isRecurring: boolean;
  isViral: boolean;
  sharedAt: Date;
  expiresAt: Date;
  metadata?: Metadata;
}

/**
 * Flash Sale Share Filter
 */
export interface FlashSaleShareFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  userIds?: ID[];
  types?: FlashSaleShareType[];
  platforms?: FlashSaleSharePlatform[];
  categories?: FlashSaleShareCategory[];
  contents?: FlashSaleShareContent[];
  visibilities?: FlashSaleShareVisibility[];
  analytics?: FlashSaleShareAnalytic[];
  statuses?: FlashSaleShareStatusType[];
  deliveryStatuses?: FlashSaleShareDeliveryStatus[];
  engagementStatuses?: FlashSaleShareEngagementStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isComplete?: boolean;
  isSocialPlatform?: boolean;
  isMessagingPlatform?: boolean;
  isHighPriority?: boolean;
  isRecurring?: boolean;
  isViral?: boolean;
  searchTerm?: string;
}

/**
 * Flash Sale Share Statistics
 */
export interface FlashSaleShareStatistics {
  flashSaleId: ID;
  totalShares: number;
  activeShares: number;
  completeShares: number;
  socialPlatformShares: number;
  messagingPlatformShares: number;
  highPriorityShares: number;
  recurringShares: number;
  viralShares: number;
  byType: Record<FlashSaleShareType, number>;
  byPlatform: Record<FlashSaleSharePlatform, number>;
  byCategory: Record<FlashSaleShareCategory, number>;
  byContent: Record<FlashSaleShareContent, number>;
  byVisibility: Record<FlashSaleShareVisibility, number>;
  byAnalytic: Record<FlashSaleShareAnalytic, number>;
  byStatus: Record<FlashSaleShareStatusType, number>;
  byDeliveryStatus: Record<FlashSaleShareDeliveryStatus, number>;
  byEngagementStatus: Record<FlashSaleShareEngagementStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalSharesPerDay: number;
  averageSharesPerDay: number;
  maxSharesPerDay: number;
  minSharesPerDay: number;
  totalSharesPerUser: number;
  averageSharesPerUser: number;
  maxSharesPerUser: number;
  minSharesPerUser: number;
  mostFrequentType: FlashSaleShareType;
  mostFrequentPlatform: FlashSaleSharePlatform;
  mostFrequentCategory: FlashSaleShareCategory;
}

/**
 * Flash Sale Share Summary
 */
export interface FlashSaleShareSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalShares: number;
  active: number;
  complete: number;
  social: number;
  messaging: number;
  highPriority: number;
  recurring: number;
  viral: number;
  byType: Record<FlashSaleShareType, number>;
  byPlatform: Record<FlashSaleSharePlatform, number>;
  byCategory: Record<FlashSaleShareCategory, number>;
  byContent: Record<FlashSaleShareContent, number>;
  byVisibility: Record<FlashSaleShareVisibility, number>;
  byAnalytic: Record<FlashSaleShareAnalytic, number>;
  byStatus: Record<FlashSaleShareStatusType, number>;
  byDeliveryStatus: Record<FlashSaleShareDeliveryStatus, number>;
  byEngagementStatus: Record<FlashSaleShareEngagementStatus, number>;
  shareTrend: {
    date: Date;
    total: number;
    active: number;
    complete: number;
  }[];
  topTypes: {
    type: FlashSaleShareType;
    count: number;
    label: string;
  }[];
  topPlatforms: {
    platform: FlashSaleSharePlatform;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: FlashSaleShareCategory;
    count: number;
    label: string;
  }[];
  engagementMetrics: {
    totalViews: number;
    totalClicks: number;
    totalShares: number;
    averageEngagement: number;
  };
}

/**
 * Flash Sale Share Configuration
 */
export interface FlashSaleShareConfiguration {
  enabled: boolean;
  defaultType: FlashSaleShareType;
  defaultPlatform: FlashSaleSharePlatform;
  defaultCategory: FlashSaleShareCategory;
  defaultContent: FlashSaleShareContent;
  defaultVisibility: FlashSaleShareVisibility;
  defaultAnalytic: FlashSaleShareAnalytic;
  defaultStatus: FlashSaleShareStatusType;
  maxSharesPerDay: number;
  maxSharesPerUser: number;
  defaultExpiryDays: number;
  maxMessageLength: number;
  maxImageSizeMB: number;
  maxVideoSizeMB: number;
  requireApproval: boolean;
  allowSocialPlatforms: boolean;
  allowMessagingPlatforms: boolean;
  allowHighPriority: boolean;
  allowRecurring: boolean;
  allowViral: boolean;
  autoProcess: boolean;
  autoComplete: boolean;
  autoRetry: boolean;
  notificationOnCreate: boolean;
  notificationOnProcess: boolean;
  notificationOnComplete: boolean;
  notificationOnRetry: boolean;
  notificationOnCancel: boolean;
  notificationOnArchive: boolean;
  alertConfig?: FlashSaleShareAlertConfig;
}

/**
 * Flash Sale Share Alert Configuration
 */
export interface FlashSaleShareAlertConfig {
  enabled: boolean;
  highShareRateAlert: boolean;
  highShareRateThreshold: number;
  lowShareRateAlert: boolean;
  lowShareRateThreshold: number;
  deliveryFailureAlert: boolean;
  deliveryFailureThreshold: number;
  engagementDropAlert: boolean;
  engagementDropThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Share History
 */
export interface FlashSaleShareHistory extends BaseEntity, Timestamp {
  id: ID;
  shareId: ID;
  flashSaleId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'process'
    | 'complete'
    | 'retry'
    | 'cancel'
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
 * Flash Sale Share Validation
 */
export interface FlashSaleShareValidation {
  isValid: boolean;
  shareId: ID;
  flashSaleId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Share Export
 */
export interface FlashSaleShareExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FlashSaleShareFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Share Engagement
 */
export interface FlashSaleShareEngagement extends BaseEntity, Timestamp {
  id: ID;
  shareId: ID;
  flashSaleId: ID;
  userId: ID;
  views: number;
  clicks: number;
  shares: number;
  reactions: number;
  comments: number;
  lastEngagementAt: Date;
  metadata?: Metadata;
}

/**
 * Flash Sale Share Analytics
 */
export interface FlashSaleShareAnalyticData extends BaseEntity, Timestamp {
  id: ID;
  shareId: ID;
  flashSaleId: ID;
  userId: ID;
  analytic: FlashSaleShareAnalytic;
  value: number;
  timestamp: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Share Core
  FLASH_SALE_SHARE,
  FlashSaleShareType,
  FlashSaleSharePlatform,
  FlashSaleShareCategory,
  FlashSaleShareContent,
  FlashSaleShareVisibility,
  FlashSaleShareAnalytic,
  flashsalesShareGetTypeLabel,
  flashsalesShareGetPlatformLabel,
  flashsalesShareGetCategoryLabel,
  flashsalesShareGetContentLabel,
  flashsalesShareGetVisibilityLabel,
  flashsalesShareGetAnalyticLabel,
  flashsalesShareIsValidType,
  flashsalesShareIsValidPlatform,
  flashsalesShareIsValidCategory,
  flashsalesShareIsValidContent,
  flashsalesShareIsSocialPlatform,
  flashsalesShareIsMessagingPlatform,
  flashsalesShareGetDefaultMaxSharesPerDay,
  flashsalesShareGetDefaultMaxSharesPerUser,
  flashsalesShareGetDefaultExpiryDays,
  flashsalesShareGetMaxSharesPerDay,
  flashsalesShareGetMaxSharesPerUser,
  flashsalesShareGetMaxMessageLength,
  flashsalesShareGetMaxImageSizeMB,
  flashsalesShareGetMaxVideoSizeMB,
  // Share Type
  FLASH_SALE_SHARE_TYPE,
  FlashSaleShareTypeCategory,
  FlashSaleShareTypeComplexity,
  FlashSaleShareTypeScope,
  FlashSaleShareTypeFrequency,
  FlashSaleShareTypeTrigger,
  FlashSaleShareTypePriority,
  FlashSaleShareTypeEngagement,
  flashsalesShareTypeGetCategoryLabel,
  flashsalesShareTypeGetComplexityLabel,
  flashsalesShareTypeGetScopeLabel,
  flashsalesShareTypeGetFrequencyLabel,
  flashsalesShareTypeGetTriggerLabel,
  flashsalesShareTypeGetPriorityLabel,
  flashsalesShareTypeGetEngagementLabel,
  flashsalesShareTypeIsValidCategory,
  flashsalesShareTypeIsValidScope,
  flashsalesShareTypeIsValidTrigger,
  flashsalesShareTypeIsHighPriority,
  flashsalesShareTypeIsRecurring,
  flashsalesShareTypeIsViral,
  // Share Status
  FLASH_SALE_SHARE_STATUS,
  FlashSaleShareStatusType,
  FlashSaleShareStatusCategory,
  FlashSaleShareStatusColor,
  FlashSaleShareStatusPriority,
  FlashSaleShareDeliveryStatus,
  FlashSaleShareEngagementStatus,
  flashsalesShareStatusGetLabel,
  flashsalesShareStatusGetCategory,
  flashsalesShareStatusGetColor,
  flashsalesShareStatusGetPriority,
  flashsalesShareStatusIsActive,
  flashsalesShareStatusIsComplete,
  flashsalesShareStatusCanTransitionTo,
  flashsalesShareStatusGetAvailableTransitions,
  flashsalesShareStatusCanProcess,
  flashsalesShareStatusCanComplete,
  flashsalesShareStatusCanRetry,
  flashsalesShareStatusCanCancel,
  flashsalesShareStatusCanArchive,
  flashsalesShareStatusGetDeliveryStatusLabel,
  flashsalesShareStatusGetEngagementStatusLabel,
  flashsalesShareStatusIsValid,
  flashsalesShareStatusIsValidDeliveryStatus,
  flashsalesShareStatusIsValidEngagementStatus,
};
