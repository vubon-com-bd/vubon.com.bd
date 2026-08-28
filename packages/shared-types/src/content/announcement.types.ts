/**
 * Announcement Types
 * Type definitions for announcements based on shared-constants
 * @module AnnouncementTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants announcement
// ============================================================
import {
  // Announcement Core
  CONTENT_ANNOUNCEMENT,
  ContentAnnouncementType,
  ContentAnnouncementStatus,
  ContentAnnouncementPriority,
  ContentAnnouncementScope,
  ContentAnnouncementChannel,
  ContentAnnouncementTarget,
  ContentAnnouncementVisibility,
  ContentAnnouncementDisplay,
  contentAnnouncementGetTypeLabel,
  contentAnnouncementGetStatusLabel,
  contentAnnouncementGetPriorityLabel,
  contentAnnouncementGetScopeLabel,
  contentAnnouncementGetChannelLabel,
  contentAnnouncementGetTargetLabel,
  contentAnnouncementGetVisibilityLabel,
  contentAnnouncementGetDisplayLabel,
  contentAnnouncementIsPublished,
  contentAnnouncementIsEditable,
  contentAnnouncementIsActive,
  contentAnnouncementGetDefaultStatus,
  contentAnnouncementGetDefaultPriority,
  contentAnnouncementGetDefaultScope,
  contentAnnouncementGetDefaultChannel,
  contentAnnouncementGetDefaultTarget,
  contentAnnouncementGetDefaultDisplay,
  contentAnnouncementGetDefaultDuration,
  contentAnnouncementGetMaxTitleLength,
  contentAnnouncementGetMaxContentLength,
  contentAnnouncementIsValidType,
  contentAnnouncementIsValidStatus,
  contentAnnouncementIsValidPriority,
  contentAnnouncementIsValidScope,
  contentAnnouncementIsValidChannel,
  contentAnnouncementIsValidTarget,
  // Announcement Status
  CONTENT_ANNOUNCEMENT_STATUS,
  ContentAnnouncementStatusType,
  ContentAnnouncementStatusCategory,
  ContentAnnouncementStatusColor,
  ContentAnnouncementStatusPriority,
  ContentAnnouncementState,
  ContentAnnouncementAction,
  contentAnnouncementStatusGetLabel,
  contentAnnouncementStatusGetCategory,
  contentAnnouncementStatusGetColor,
  contentAnnouncementStatusGetPriority,
  contentAnnouncementStatusIsPublished,
  contentAnnouncementStatusIsEditable,
  contentAnnouncementStatusIsActive,
  contentAnnouncementStatusIsArchived,
  contentAnnouncementStatusCanTransitionTo,
  contentAnnouncementStatusGetAvailableTransitions,
  contentAnnouncementStatusGetSequence,
  contentAnnouncementStatusGetStateLabel,
  contentAnnouncementStatusGetActionLabel,
  contentAnnouncementStatusIsValid,
  contentAnnouncementStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Announcement Extended Types
// ============================================================

/**
 * Announcement
 */
export interface Announcement extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  content: string;
  slug: Slug;
  type: ContentAnnouncementType;
  status: ContentAnnouncementStatusType;
  priority: ContentAnnouncementPriority;
  scope: ContentAnnouncementScope;
  channel: ContentAnnouncementChannel;
  target: ContentAnnouncementTarget;
  visibility: ContentAnnouncementVisibility;
  display: ContentAnnouncementDisplay;
  duration: number;
  isPublished: boolean;
  isEditable: boolean;
  isActive: boolean;
  publishedAt?: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Announcement Filter
 */
export interface AnnouncementFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentAnnouncementType[];
  statuses?: ContentAnnouncementStatusType[];
  priorities?: ContentAnnouncementPriority[];
  scopes?: ContentAnnouncementScope[];
  channels?: ContentAnnouncementChannel[];
  targets?: ContentAnnouncementTarget[];
  visibilities?: ContentAnnouncementVisibility[];
  displays?: ContentAnnouncementDisplay[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  isActive?: boolean;
  searchTerm?: string;
  slug?: string;
}

/**
 * Announcement Statistics
 */
export interface AnnouncementStatistics {
  userId: ID;
  totalAnnouncements: number;
  publishedAnnouncements: number;
  editableAnnouncements: number;
  activeAnnouncements: number;
  byType: Record<ContentAnnouncementType, number>;
  byStatus: Record<ContentAnnouncementStatusType, number>;
  byPriority: Record<ContentAnnouncementPriority, number>;
  byScope: Record<ContentAnnouncementScope, number>;
  byChannel: Record<ContentAnnouncementChannel, number>;
  byTarget: Record<ContentAnnouncementTarget, number>;
  byVisibility: Record<ContentAnnouncementVisibility, number>;
  byDisplay: Record<ContentAnnouncementDisplay, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  mostFrequentType: ContentAnnouncementType;
  mostFrequentPriority: ContentAnnouncementPriority;
  mostFrequentStatus: ContentAnnouncementStatusType;
}

/**
 * Announcement Summary
 */
export interface AnnouncementSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  active: number;
  byType: Record<ContentAnnouncementType, number>;
  byStatus: Record<ContentAnnouncementStatusType, number>;
  byPriority: Record<ContentAnnouncementPriority, number>;
  byScope: Record<ContentAnnouncementScope, number>;
  byChannel: Record<ContentAnnouncementChannel, number>;
  byTarget: Record<ContentAnnouncementTarget, number>;
  byVisibility: Record<ContentAnnouncementVisibility, number>;
  byDisplay: Record<ContentAnnouncementDisplay, number>;
  announcementTrend: {
    date: Date;
    total: number;
    published: number;
    active: number;
  }[];
  topTypes: {
    type: ContentAnnouncementType;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: ContentAnnouncementPriority;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentAnnouncementStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Announcement Configuration
 */
export interface AnnouncementConfiguration {
  enabled: boolean;
  defaultType: ContentAnnouncementType;
  defaultStatus: ContentAnnouncementStatusType;
  defaultPriority: ContentAnnouncementPriority;
  defaultScope: ContentAnnouncementScope;
  defaultChannel: ContentAnnouncementChannel;
  defaultTarget: ContentAnnouncementTarget;
  defaultVisibility: ContentAnnouncementVisibility;
  defaultDisplay: ContentAnnouncementDisplay;
  defaultDuration: number;
  maxTitleLength: number;
  maxContentLength: number;
  allowComments: boolean;
  allowSharing: boolean;
  allowNotifications: boolean;
  notificationOnPublish: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: AnnouncementAlertConfig;
}

/**
 * Announcement Alert Configuration
 */
export interface AnnouncementAlertConfig {
  enabled: boolean;
  highPriorityAlert: boolean;
  highPriorityThreshold: number;
  expiryAlert: boolean;
  expiryThreshold: number;
  pendingApprovalAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Announcement History
 */
export interface AnnouncementHistory extends BaseEntity, Timestamp {
  id: ID;
  announcementId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'publish'
    | 'unpublish'
    | 'activate'
    | 'deactivate'
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
 * Announcement Validation
 */
export interface AnnouncementValidation {
  isValid: boolean;
  announcementId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Announcement Export
 */
export interface AnnouncementExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown' | 'xml';
  filter: AnnouncementFilter;
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
  // Announcement Core
  CONTENT_ANNOUNCEMENT,
  ContentAnnouncementType,
  ContentAnnouncementStatus,
  ContentAnnouncementPriority,
  ContentAnnouncementScope,
  ContentAnnouncementChannel,
  ContentAnnouncementTarget,
  ContentAnnouncementVisibility,
  ContentAnnouncementDisplay,
  contentAnnouncementGetTypeLabel,
  contentAnnouncementGetStatusLabel,
  contentAnnouncementGetPriorityLabel,
  contentAnnouncementGetScopeLabel,
  contentAnnouncementGetChannelLabel,
  contentAnnouncementGetTargetLabel,
  contentAnnouncementGetVisibilityLabel,
  contentAnnouncementGetDisplayLabel,
  contentAnnouncementIsPublished,
  contentAnnouncementIsEditable,
  contentAnnouncementIsActive,
  contentAnnouncementGetDefaultStatus,
  contentAnnouncementGetDefaultPriority,
  contentAnnouncementGetDefaultScope,
  contentAnnouncementGetDefaultChannel,
  contentAnnouncementGetDefaultTarget,
  contentAnnouncementGetDefaultDisplay,
  contentAnnouncementGetDefaultDuration,
  contentAnnouncementGetMaxTitleLength,
  contentAnnouncementGetMaxContentLength,
  contentAnnouncementIsValidType,
  contentAnnouncementIsValidStatus,
  contentAnnouncementIsValidPriority,
  contentAnnouncementIsValidScope,
  contentAnnouncementIsValidChannel,
  contentAnnouncementIsValidTarget,
  // Announcement Status
  CONTENT_ANNOUNCEMENT_STATUS,
  ContentAnnouncementStatusType,
  ContentAnnouncementStatusCategory,
  ContentAnnouncementStatusColor,
  ContentAnnouncementStatusPriority,
  ContentAnnouncementState,
  ContentAnnouncementAction,
  contentAnnouncementStatusGetLabel,
  contentAnnouncementStatusGetCategory,
  contentAnnouncementStatusGetColor,
  contentAnnouncementStatusGetPriority,
  contentAnnouncementStatusIsPublished,
  contentAnnouncementStatusIsEditable,
  contentAnnouncementStatusIsActive,
  contentAnnouncementStatusIsArchived,
  contentAnnouncementStatusCanTransitionTo,
  contentAnnouncementStatusGetAvailableTransitions,
  contentAnnouncementStatusGetSequence,
  contentAnnouncementStatusGetStateLabel,
  contentAnnouncementStatusGetActionLabel,
  contentAnnouncementStatusIsValid,
  contentAnnouncementStatusIsValidState,
};
