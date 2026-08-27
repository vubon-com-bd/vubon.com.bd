/**
 * Flash Sale Participant Types
 * Type definitions for flash sale participants based on shared-constants
 * @module FlashSaleParticipantTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales participant
// ============================================================
import {
  // Participant
  FLASH_SALE_PARTICIPANT,
  FlashSaleParticipantType,
  FlashSaleParticipantCategory,
  FlashSaleParticipantRole,
  FlashSaleParticipantEngagement,
  FlashSaleParticipantActivity,
  FlashSaleParticipantParticipation,
  flashsalesParticipantGetTypeLabel,
  flashsalesParticipantGetCategoryLabel,
  flashsalesParticipantGetRoleLabel,
  flashsalesParticipantGetEngagementLabel,
  flashsalesParticipantGetActivityLabel,
  flashsalesParticipantGetParticipationLabel,
  flashsalesParticipantIsValidType,
  flashsalesParticipantIsValidCategory,
  flashsalesParticipantIsValidRole,
  flashsalesParticipantIsActive,
  flashsalesParticipantIsEngaged,
  flashsalesParticipantGetDefaultMaxParticipants,
  flashsalesParticipantGetDefaultMaxItems,
  flashsalesParticipantGetMaxParticipantsPerSale,
  flashsalesParticipantGetEngagementScore,
  flashsalesParticipantGetParticipationRank,
  // Participant Status
  FLASH_SALE_PARTICIPANT_STATUS,
  FlashSaleParticipantStatusType,
  FlashSaleParticipantStatusCategory,
  FlashSaleParticipantStatusColor,
  FlashSaleParticipantStatusPriority,
  FlashSaleParticipantAccessLevel,
  flashsalesParticipantStatusGetLabel,
  flashsalesParticipantStatusGetCategory,
  flashsalesParticipantStatusGetColor,
  flashsalesParticipantStatusGetPriority,
  flashsalesParticipantStatusIsActive,
  flashsalesParticipantStatusIsVerified,
  flashsalesParticipantStatusIsRestricted,
  flashsalesParticipantStatusIsComplete,
  flashsalesParticipantStatusCanTransitionTo,
  flashsalesParticipantStatusGetAvailableTransitions,
  flashsalesParticipantStatusCanVerify,
  flashsalesParticipantStatusCanApprove,
  flashsalesParticipantStatusCanActivate,
  flashsalesParticipantStatusCanEngage,
  flashsalesParticipantStatusCanPause,
  flashsalesParticipantStatusCanResume,
  flashsalesParticipantStatusCanBlock,
  flashsalesParticipantStatusCanSuspend,
  flashsalesParticipantStatusCanComplete,
  flashsalesParticipantStatusCanCancel,
  flashsalesParticipantStatusGetAccessLevel,
  flashsalesParticipantStatusIsValid,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Participant Extended Types
// ============================================================

/**
 * Flash Sale Participant
 */
export interface FlashSaleParticipant extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  userId: ID;
  type: FlashSaleParticipantType;
  category: FlashSaleParticipantCategory;
  role: FlashSaleParticipantRole;
  engagement: FlashSaleParticipantEngagement;
  activity: FlashSaleParticipantActivity;
  participation: FlashSaleParticipantParticipation;
  status: FlashSaleParticipantStatusType;
  accessLevel: FlashSaleParticipantAccessLevel;
  isActive: boolean;
  isEngaged: boolean;
  isVerified: boolean;
  isRestricted: boolean;
  isComplete: boolean;
  joinedAt?: Date;
  leftAt?: Date;
  metadata?: Metadata;
}

/**
 * Flash Sale Participant Filter
 */
export interface FlashSaleParticipantFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  userIds?: ID[];
  types?: FlashSaleParticipantType[];
  categories?: FlashSaleParticipantCategory[];
  roles?: FlashSaleParticipantRole[];
  engagements?: FlashSaleParticipantEngagement[];
  activities?: FlashSaleParticipantActivity[];
  participations?: FlashSaleParticipantParticipation[];
  statuses?: FlashSaleParticipantStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isEngaged?: boolean;
  isVerified?: boolean;
  isRestricted?: boolean;
  isComplete?: boolean;
  searchTerm?: string;
}

/**
 * Flash Sale Participant Statistics
 */
export interface FlashSaleParticipantStatistics {
  flashSaleId: ID;
  totalParticipants: number;
  activeParticipants: number;
  engagedParticipants: number;
  verifiedParticipants: number;
  restrictedParticipants: number;
  completeParticipants: number;
  byType: Record<FlashSaleParticipantType, number>;
  byCategory: Record<FlashSaleParticipantCategory, number>;
  byRole: Record<FlashSaleParticipantRole, number>;
  byEngagement: Record<FlashSaleParticipantEngagement, number>;
  byActivity: Record<FlashSaleParticipantActivity, number>;
  byParticipation: Record<FlashSaleParticipantParticipation, number>;
  byStatus: Record<FlashSaleParticipantStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: FlashSaleParticipantType;
  mostFrequentRole: FlashSaleParticipantRole;
  mostFrequentEngagement: FlashSaleParticipantEngagement;
  averageEngagementScore: number;
  maxEngagementScore: number;
  minEngagementScore: number;
}

/**
 * Flash Sale Participant Summary
 */
export interface FlashSaleParticipantSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalParticipants: number;
  active: number;
  engaged: number;
  verified: number;
  restricted: number;
  complete: number;
  byType: Record<FlashSaleParticipantType, number>;
  byCategory: Record<FlashSaleParticipantCategory, number>;
  byRole: Record<FlashSaleParticipantRole, number>;
  byEngagement: Record<FlashSaleParticipantEngagement, number>;
  byActivity: Record<FlashSaleParticipantActivity, number>;
  byParticipation: Record<FlashSaleParticipantParticipation, number>;
  byStatus: Record<FlashSaleParticipantStatusType, number>;
  participantTrend: {
    date: Date;
    total: number;
    active: number;
    engaged: number;
  }[];
  topTypes: {
    type: FlashSaleParticipantType;
    count: number;
    label: string;
  }[];
  topRoles: {
    role: FlashSaleParticipantRole;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: FlashSaleParticipantStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Flash Sale Participant Configuration
 */
export interface FlashSaleParticipantConfiguration {
  enabled: boolean;
  defaultType: FlashSaleParticipantType;
  defaultCategory: FlashSaleParticipantCategory;
  defaultRole: FlashSaleParticipantRole;
  defaultStatus: FlashSaleParticipantStatusType;
  maxParticipantsPerSale: number;
  maxItemsPerParticipant: number;
  requireVerification: boolean;
  allowMultipleRoles: boolean;
  allowSelfJoin: boolean;
  allowLeave: boolean;
  autoApprove: boolean;
  notificationOnJoin: boolean;
  notificationOnLeave: boolean;
  notificationOnVerify: boolean;
  notificationOnBlock: boolean;
  notificationOnSuspend: boolean;
  alertConfig?: FlashSaleParticipantAlertConfig;
}

/**
 * Flash Sale Participant Alert Configuration
 */
export interface FlashSaleParticipantAlertConfig {
  enabled: boolean;
  highParticipationAlert: boolean;
  highParticipationThreshold: number;
  lowParticipationAlert: boolean;
  lowParticipationThreshold: number;
  suspiciousActivityAlert: boolean;
  engagementDropAlert: boolean;
  engagementDropThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Participant History
 */
export interface FlashSaleParticipantHistory extends BaseEntity, Timestamp {
  id: ID;
  participantId: ID;
  flashSaleId: ID;
  userId: ID;
  action:
    | 'join'
    | 'leave'
    | 'verify'
    | 'approve'
    | 'activate'
    | 'engage'
    | 'pause'
    | 'resume'
    | 'block'
    | 'suspend'
    | 'complete'
    | 'cancel'
    | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Flash Sale Participant Validation
 */
export interface FlashSaleParticipantValidation {
  isValid: boolean;
  participantId: ID;
  flashSaleId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Participant Export
 */
export interface FlashSaleParticipantExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FlashSaleParticipantFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Participant Engagement Detail
 */
export interface FlashSaleParticipantEngagementDetail extends BaseEntity, Timestamp {
  id: ID;
  participantId: ID;
  flashSaleId: ID;
  userId: ID;
  engagementScore: number;
  participationRank: number;
  interactionCount: number;
  lastInteractionAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Participant
  FLASH_SALE_PARTICIPANT,
  FlashSaleParticipantType,
  FlashSaleParticipantCategory,
  FlashSaleParticipantRole,
  FlashSaleParticipantEngagement,
  FlashSaleParticipantActivity,
  FlashSaleParticipantParticipation,
  flashsalesParticipantGetTypeLabel,
  flashsalesParticipantGetCategoryLabel,
  flashsalesParticipantGetRoleLabel,
  flashsalesParticipantGetEngagementLabel,
  flashsalesParticipantGetActivityLabel,
  flashsalesParticipantGetParticipationLabel,
  flashsalesParticipantIsValidType,
  flashsalesParticipantIsValidCategory,
  flashsalesParticipantIsValidRole,
  flashsalesParticipantIsActive,
  flashsalesParticipantIsEngaged,
  flashsalesParticipantGetDefaultMaxParticipants,
  flashsalesParticipantGetDefaultMaxItems,
  flashsalesParticipantGetMaxParticipantsPerSale,
  flashsalesParticipantGetEngagementScore,
  flashsalesParticipantGetParticipationRank,
  // Participant Status
  FLASH_SALE_PARTICIPANT_STATUS,
  FlashSaleParticipantStatusType,
  FlashSaleParticipantStatusCategory,
  FlashSaleParticipantStatusColor,
  FlashSaleParticipantStatusPriority,
  FlashSaleParticipantAccessLevel,
  flashsalesParticipantStatusGetLabel,
  flashsalesParticipantStatusGetCategory,
  flashsalesParticipantStatusGetColor,
  flashsalesParticipantStatusGetPriority,
  flashsalesParticipantStatusIsActive,
  flashsalesParticipantStatusIsVerified,
  flashsalesParticipantStatusIsRestricted,
  flashsalesParticipantStatusIsComplete,
  flashsalesParticipantStatusCanTransitionTo,
  flashsalesParticipantStatusGetAvailableTransitions,
  flashsalesParticipantStatusCanVerify,
  flashsalesParticipantStatusCanApprove,
  flashsalesParticipantStatusCanActivate,
  flashsalesParticipantStatusCanEngage,
  flashsalesParticipantStatusCanPause,
  flashsalesParticipantStatusCanResume,
  flashsalesParticipantStatusCanBlock,
  flashsalesParticipantStatusCanSuspend,
  flashsalesParticipantStatusCanComplete,
  flashsalesParticipantStatusCanCancel,
  flashsalesParticipantStatusGetAccessLevel,
  flashsalesParticipantStatusIsValid,
};
