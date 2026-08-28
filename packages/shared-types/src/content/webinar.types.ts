/**
 * Webinar Types
 * Type definitions for webinars based on shared-constants
 * @module WebinarTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants webinar
// ============================================================
import {
  // Webinar Core
  CONTENT_WEBINAR,
  ContentWebinarType,
  ContentWebinarStatus,
  ContentWebinarFormat,
  ContentWebinarPlatform,
  ContentWebinarRecordingStatus,
  ContentWebinarVisibility,
  ContentWebinarSortOption,
  ContentWebinarAudience,
  contentWebinarGetTypeLabel,
  contentWebinarGetStatusLabel,
  contentWebinarGetFormatLabel,
  contentWebinarGetPlatformLabel,
  contentWebinarGetRecordingStatusLabel,
  contentWebinarGetVisibilityLabel,
  contentWebinarGetSortOptionLabel,
  contentWebinarGetAudienceLabel,
  contentWebinarIsPublished,
  contentWebinarIsEditable,
  contentWebinarIsLive,
  contentWebinarIsCompleted,
  contentWebinarGetDefaultStatus,
  contentWebinarGetDefaultFormat,
  contentWebinarGetDefaultPlatform,
  contentWebinarGetDefaultVisibility,
  contentWebinarGetDefaultSort,
  contentWebinarGetDefaultDuration,
  contentWebinarGetDefaultMaxAttendees,
  contentWebinarGetMaxTitleLength,
  contentWebinarGetMaxDescriptionLength,
  contentWebinarGetMaxDurationMinutes,
  contentWebinarGetMinDurationMinutes,
  contentWebinarGetMaxAttendees,
  contentWebinarIsValidType,
  contentWebinarIsValidStatus,
  contentWebinarIsValidFormat,
  contentWebinarIsValidPlatform,
  // Webinar Status
  CONTENT_WEBINAR_STATUS,
  ContentWebinarStatusType,
  ContentWebinarStatusCategory,
  ContentWebinarStatusColor,
  ContentWebinarStatusPriority,
  ContentWebinarState,
  ContentWebinarAction,
  contentWebinarStatusGetLabel,
  contentWebinarStatusGetCategory,
  contentWebinarStatusGetColor,
  contentWebinarStatusGetPriority,
  contentWebinarStatusIsPublished,
  contentWebinarStatusIsEditable,
  contentWebinarStatusIsLive,
  contentWebinarStatusIsCompleted,
  contentWebinarStatusCanTransitionTo,
  contentWebinarStatusGetAvailableTransitions,
  contentWebinarStatusGetSequence,
  contentWebinarStatusGetStateLabel,
  contentWebinarStatusGetActionLabel,
  contentWebinarStatusIsValid,
  contentWebinarStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Webinar Extended Types
// ============================================================

/**
 * Webinar Session
 */
export interface WebinarSession extends BaseEntity, Timestamp {
  id: ID;
  webinarId: ID;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  recordingUrl?: string;
  recordingStatus: ContentWebinarRecordingStatus;
  attendees: number;
  maxAttendees: number;
  isLive: boolean;
  isCompleted: boolean;
  metadata?: Metadata;
}

/**
 * Webinar Registration
 */
export interface WebinarRegistration extends BaseEntity, Timestamp {
  id: ID;
  webinarId: ID;
  userId: ID;
  email: string;
  name: string;
  status: 'registered' | 'attended' | 'cancelled' | 'waitlisted';
  registeredAt: Date;
  attendedAt?: Date;
  cancelledAt?: Date;
  metadata?: Metadata;
}

/**
 * Webinar
 */
export interface Webinar extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  description: string;
  type: ContentWebinarType;
  status: ContentWebinarStatusType;
  format: ContentWebinarFormat;
  platform: ContentWebinarPlatform;
  visibility: ContentWebinarVisibility;
  sortOption: ContentWebinarSortOption;
  audience: ContentWebinarAudience;
  sessions: WebinarSession[];
  registrations: WebinarRegistration[];
  isPublished: boolean;
  isEditable: boolean;
  isLive: boolean;
  isCompleted: boolean;
  publishedAt?: Date;
  metadata?: Metadata;
}

/**
 * Webinar Filter
 */
export interface WebinarFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentWebinarType[];
  statuses?: ContentWebinarStatusType[];
  formats?: ContentWebinarFormat[];
  platforms?: ContentWebinarPlatform[];
  visibilities?: ContentWebinarVisibility[];
  sortOptions?: ContentWebinarSortOption[];
  audiences?: ContentWebinarAudience[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  isLive?: boolean;
  isCompleted?: boolean;
  minDuration?: number;
  maxDuration?: number;
  minAttendees?: number;
  maxAttendees?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * Webinar Statistics
 */
export interface WebinarStatistics {
  userId: ID;
  totalWebinars: number;
  publishedWebinars: number;
  editableWebinars: number;
  liveWebinars: number;
  completedWebinars: number;
  byType: Record<ContentWebinarType, number>;
  byStatus: Record<ContentWebinarStatusType, number>;
  byFormat: Record<ContentWebinarFormat, number>;
  byPlatform: Record<ContentWebinarPlatform, number>;
  byVisibility: Record<ContentWebinarVisibility, number>;
  byAudience: Record<ContentWebinarAudience, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalSessions: number;
  averageSessions: number;
  maxSessions: number;
  minSessions: number;
  totalDuration: number;
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  totalAttendees: number;
  averageAttendees: number;
  maxAttendees: number;
  minAttendees: number;
  totalRegistrations: number;
  averageRegistrations: number;
  maxRegistrations: number;
  minRegistrations: number;
  registrationRate: number;
  attendanceRate: number;
  mostFrequentType: ContentWebinarType;
  mostFrequentFormat: ContentWebinarFormat;
  mostFrequentPlatform: ContentWebinarPlatform;
  mostFrequentStatus: ContentWebinarStatusType;
}

/**
 * Webinar Summary
 */
export interface WebinarSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  live: number;
  completed: number;
  byType: Record<ContentWebinarType, number>;
  byStatus: Record<ContentWebinarStatusType, number>;
  byFormat: Record<ContentWebinarFormat, number>;
  byPlatform: Record<ContentWebinarPlatform, number>;
  byVisibility: Record<ContentWebinarVisibility, number>;
  byAudience: Record<ContentWebinarAudience, number>;
  webinarTrend: {
    date: Date;
    total: number;
    published: number;
    live: number;
    completed: number;
  }[];
  topTypes: {
    type: ContentWebinarType;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: ContentWebinarFormat;
    count: number;
    label: string;
  }[];
  topPlatforms: {
    platform: ContentWebinarPlatform;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentWebinarStatusType;
    count: number;
    label: string;
  }[];
  registrationMetrics: {
    totalRegistrations: number;
    registrationRate: number;
    attendanceRate: number;
    averageRegistrations: number;
  };
}

/**
 * Webinar Configuration
 */
export interface WebinarConfiguration {
  enabled: boolean;
  defaultType: ContentWebinarType;
  defaultStatus: ContentWebinarStatusType;
  defaultFormat: ContentWebinarFormat;
  defaultPlatform: ContentWebinarPlatform;
  defaultVisibility: ContentWebinarVisibility;
  defaultSort: ContentWebinarSortOption;
  defaultDuration: number;
  defaultMaxAttendees: number;
  maxTitleLength: number;
  maxDescriptionLength: number;
  maxDurationMinutes: number;
  minDurationMinutes: number;
  maxAttendees: number;
  requireApproval: boolean;
  allowRegistration: boolean;
  allowRecording: boolean;
  allowChat: boolean;
  allowQandA: boolean;
  allowPolling: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnPublish: boolean;
  notificationOnLive: boolean;
  notificationOnComplete: boolean;
  notificationOnDelete: boolean;
  alertConfig?: WebinarAlertConfig;
}

/**
 * Webinar Alert Configuration
 */
export interface WebinarAlertConfig {
  enabled: boolean;
  registrationAlert: boolean;
  registrationThreshold: number;
  liveAlert: boolean;
  completionAlert: boolean;
  lowAttendanceAlert: boolean;
  lowAttendanceThreshold: number;
  technicalIssueAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Webinar History
 */
export interface WebinarHistory extends BaseEntity, Timestamp {
  id: ID;
  webinarId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'publish'
    | 'unpublish'
    | 'start_live'
    | 'end_live'
    | 'complete'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'add_session'
    | 'remove_session'
    | 'update_session';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Webinar Validation
 */
export interface WebinarValidation {
  isValid: boolean;
  webinarId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Webinar Export
 */
export interface WebinarExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'xml' | 'ical';
  filter: WebinarFilter;
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
  // Webinar Core
  CONTENT_WEBINAR,
  ContentWebinarType,
  ContentWebinarStatus,
  ContentWebinarFormat,
  ContentWebinarPlatform,
  ContentWebinarRecordingStatus,
  ContentWebinarVisibility,
  ContentWebinarSortOption,
  ContentWebinarAudience,
  contentWebinarGetTypeLabel,
  contentWebinarGetStatusLabel,
  contentWebinarGetFormatLabel,
  contentWebinarGetPlatformLabel,
  contentWebinarGetRecordingStatusLabel,
  contentWebinarGetVisibilityLabel,
  contentWebinarGetSortOptionLabel,
  contentWebinarGetAudienceLabel,
  contentWebinarIsPublished,
  contentWebinarIsEditable,
  contentWebinarIsLive,
  contentWebinarIsCompleted,
  contentWebinarGetDefaultStatus,
  contentWebinarGetDefaultFormat,
  contentWebinarGetDefaultPlatform,
  contentWebinarGetDefaultVisibility,
  contentWebinarGetDefaultSort,
  contentWebinarGetDefaultDuration,
  contentWebinarGetDefaultMaxAttendees,
  contentWebinarGetMaxTitleLength,
  contentWebinarGetMaxDescriptionLength,
  contentWebinarGetMaxDurationMinutes,
  contentWebinarGetMinDurationMinutes,
  contentWebinarGetMaxAttendees,
  contentWebinarIsValidType,
  contentWebinarIsValidStatus,
  contentWebinarIsValidFormat,
  contentWebinarIsValidPlatform,
  // Webinar Status
  CONTENT_WEBINAR_STATUS,
  ContentWebinarStatusType,
  ContentWebinarStatusCategory,
  ContentWebinarStatusColor,
  ContentWebinarStatusPriority,
  ContentWebinarState,
  ContentWebinarAction,
  contentWebinarStatusGetLabel,
  contentWebinarStatusGetCategory,
  contentWebinarStatusGetColor,
  contentWebinarStatusGetPriority,
  contentWebinarStatusIsPublished,
  contentWebinarStatusIsEditable,
  contentWebinarStatusIsLive,
  contentWebinarStatusIsCompleted,
  contentWebinarStatusCanTransitionTo,
  contentWebinarStatusGetAvailableTransitions,
  contentWebinarStatusGetSequence,
  contentWebinarStatusGetStateLabel,
  contentWebinarStatusGetActionLabel,
  contentWebinarStatusIsValid,
  contentWebinarStatusIsValidState,
};
