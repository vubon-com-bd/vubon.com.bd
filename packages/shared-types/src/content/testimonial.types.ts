/**
 * Testimonial Types
 * Type definitions for testimonials based on shared-constants
 * @module TestimonialTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants testimonial
// ============================================================
import {
  // Testimonial Core
  CONTENT_TESTIMONIAL,
  ContentTestimonialType,
  ContentTestimonialStatus,
  ContentTestimonialRating,
  ContentTestimonialFormat,
  ContentTestimonialSource,
  ContentTestimonialVisibility,
  ContentTestimonialDisplay,
  contentTestimonialGetTypeLabel,
  contentTestimonialGetStatusLabel,
  contentTestimonialGetRatingLabel,
  contentTestimonialGetFormatLabel,
  contentTestimonialGetSourceLabel,
  contentTestimonialGetVisibilityLabel,
  contentTestimonialGetDisplayLabel,
  contentTestimonialIsPublished,
  contentTestimonialIsEditable,
  contentTestimonialIsApproved,
  contentTestimonialGetDefaultStatus,
  contentTestimonialGetDefaultRating,
  contentTestimonialGetDefaultFormat,
  contentTestimonialGetDefaultSource,
  contentTestimonialGetDefaultVisibility,
  contentTestimonialGetDefaultDisplay,
  contentTestimonialGetMaxContentLength,
  contentTestimonialGetMaxNameLength,
  contentTestimonialGetMaxTitleLength,
  contentTestimonialIsValidType,
  contentTestimonialIsValidStatus,
  contentTestimonialIsValidRating,
  contentTestimonialIsValidFormat,
  contentTestimonialIsValidSource,
  // Testimonial Status
  CONTENT_TESTIMONIAL_STATUS,
  ContentTestimonialStatusType,
  ContentTestimonialStatusCategory,
  ContentTestimonialStatusColor,
  ContentTestimonialStatusPriority,
  ContentTestimonialState,
  ContentTestimonialAction,
  contentTestimonialStatusGetLabel,
  contentTestimonialStatusGetCategory,
  contentTestimonialStatusGetColor,
  contentTestimonialStatusGetPriority,
  contentTestimonialStatusIsPublished,
  contentTestimonialStatusIsEditable,
  contentTestimonialStatusIsApproved,
  contentTestimonialStatusIsArchived,
  contentTestimonialStatusCanTransitionTo,
  contentTestimonialStatusGetAvailableTransitions,
  contentTestimonialStatusGetSequence,
  contentTestimonialStatusGetStateLabel,
  contentTestimonialStatusGetActionLabel,
  contentTestimonialStatusIsValid,
  contentTestimonialStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Testimonial Extended Types
// ============================================================

/**
 * Testimonial
 */
export interface Testimonial extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  title?: string;
  content: string;
  rating: ContentTestimonialRating;
  type: ContentTestimonialType;
  status: ContentTestimonialStatusType;
  format: ContentTestimonialFormat;
  source: ContentTestimonialSource;
  visibility: ContentTestimonialVisibility;
  display: ContentTestimonialDisplay;
  avatar?: string;
  company?: string;
  position?: string;
  isPublished: boolean;
  isEditable: boolean;
  isApproved: boolean;
  publishedAt?: Date;
  approvedAt?: Date;
  metadata?: Metadata;
}

/**
 * Testimonial Filter
 */
export interface TestimonialFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentTestimonialType[];
  statuses?: ContentTestimonialStatusType[];
  ratings?: ContentTestimonialRating[];
  formats?: ContentTestimonialFormat[];
  sources?: ContentTestimonialSource[];
  visibilities?: ContentTestimonialVisibility[];
  displays?: ContentTestimonialDisplay[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  isApproved?: boolean;
  minRating?: number;
  maxRating?: number;
  searchTerm?: string;
  company?: string;
}

/**
 * Testimonial Statistics
 */
export interface TestimonialStatistics {
  userId: ID;
  totalTestimonials: number;
  publishedTestimonials: number;
  editableTestimonials: number;
  approvedTestimonials: number;
  byType: Record<ContentTestimonialType, number>;
  byStatus: Record<ContentTestimonialStatusType, number>;
  byRating: Record<ContentTestimonialRating, number>;
  byFormat: Record<ContentTestimonialFormat, number>;
  bySource: Record<ContentTestimonialSource, number>;
  byVisibility: Record<ContentTestimonialVisibility, number>;
  byDisplay: Record<ContentTestimonialDisplay, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageRating: number;
  maxRating: number;
  minRating: number;
  totalContentLength: number;
  averageContentLength: number;
  maxContentLength: number;
  minContentLength: number;
  mostFrequentType: ContentTestimonialType;
  mostFrequentRating: ContentTestimonialRating;
  mostFrequentStatus: ContentTestimonialStatusType;
}

/**
 * Testimonial Summary
 */
export interface TestimonialSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  approved: number;
  byType: Record<ContentTestimonialType, number>;
  byStatus: Record<ContentTestimonialStatusType, number>;
  byRating: Record<ContentTestimonialRating, number>;
  byFormat: Record<ContentTestimonialFormat, number>;
  bySource: Record<ContentTestimonialSource, number>;
  byVisibility: Record<ContentTestimonialVisibility, number>;
  byDisplay: Record<ContentTestimonialDisplay, number>;
  testimonialTrend: {
    date: Date;
    total: number;
    published: number;
    approved: number;
  }[];
  topTypes: {
    type: ContentTestimonialType;
    count: number;
    label: string;
  }[];
  topRatings: {
    rating: ContentTestimonialRating;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentTestimonialStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Testimonial Configuration
 */
export interface TestimonialConfiguration {
  enabled: boolean;
  defaultType: ContentTestimonialType;
  defaultStatus: ContentTestimonialStatusType;
  defaultRating: ContentTestimonialRating;
  defaultFormat: ContentTestimonialFormat;
  defaultSource: ContentTestimonialSource;
  defaultVisibility: ContentTestimonialVisibility;
  defaultDisplay: ContentTestimonialDisplay;
  maxContentLength: number;
  maxNameLength: number;
  maxTitleLength: number;
  requireApproval: boolean;
  allowAnonymous: boolean;
  allowRatings: boolean;
  allowImages: boolean;
  allowVideos: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnApproval: boolean;
  notificationOnPublish: boolean;
  notificationOnDelete: boolean;
  alertConfig?: TestimonialAlertConfig;
}

/**
 * Testimonial Alert Configuration
 */
export interface TestimonialAlertConfig {
  enabled: boolean;
  lowRatingAlert: boolean;
  lowRatingThreshold: number;
  spamTestimonialAlert: boolean;
  pendingApprovalAlert: boolean;
  inappropriateContentAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Testimonial History
 */
export interface TestimonialHistory extends BaseEntity, Timestamp {
  id: ID;
  testimonialId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'approve'
    | 'reject'
    | 'publish'
    | 'unpublish'
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
 * Testimonial Validation
 */
export interface TestimonialValidation {
  isValid: boolean;
  testimonialId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Testimonial Export
 */
export interface TestimonialExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown' | 'xml';
  filter: TestimonialFilter;
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
  // Testimonial Core
  CONTENT_TESTIMONIAL,
  ContentTestimonialType,
  ContentTestimonialStatus,
  ContentTestimonialRating,
  ContentTestimonialFormat,
  ContentTestimonialSource,
  ContentTestimonialVisibility,
  ContentTestimonialDisplay,
  contentTestimonialGetTypeLabel,
  contentTestimonialGetStatusLabel,
  contentTestimonialGetRatingLabel,
  contentTestimonialGetFormatLabel,
  contentTestimonialGetSourceLabel,
  contentTestimonialGetVisibilityLabel,
  contentTestimonialGetDisplayLabel,
  contentTestimonialIsPublished,
  contentTestimonialIsEditable,
  contentTestimonialIsApproved,
  contentTestimonialGetDefaultStatus,
  contentTestimonialGetDefaultRating,
  contentTestimonialGetDefaultFormat,
  contentTestimonialGetDefaultSource,
  contentTestimonialGetDefaultVisibility,
  contentTestimonialGetDefaultDisplay,
  contentTestimonialGetMaxContentLength,
  contentTestimonialGetMaxNameLength,
  contentTestimonialGetMaxTitleLength,
  contentTestimonialIsValidType,
  contentTestimonialIsValidStatus,
  contentTestimonialIsValidRating,
  contentTestimonialIsValidFormat,
  contentTestimonialIsValidSource,
  // Testimonial Status
  CONTENT_TESTIMONIAL_STATUS,
  ContentTestimonialStatusType,
  ContentTestimonialStatusCategory,
  ContentTestimonialStatusColor,
  ContentTestimonialStatusPriority,
  ContentTestimonialState,
  ContentTestimonialAction,
  contentTestimonialStatusGetLabel,
  contentTestimonialStatusGetCategory,
  contentTestimonialStatusGetColor,
  contentTestimonialStatusGetPriority,
  contentTestimonialStatusIsPublished,
  contentTestimonialStatusIsEditable,
  contentTestimonialStatusIsApproved,
  contentTestimonialStatusIsArchived,
  contentTestimonialStatusCanTransitionTo,
  contentTestimonialStatusGetAvailableTransitions,
  contentTestimonialStatusGetSequence,
  contentTestimonialStatusGetStateLabel,
  contentTestimonialStatusGetActionLabel,
  contentTestimonialStatusIsValid,
  contentTestimonialStatusIsValidState,
};
