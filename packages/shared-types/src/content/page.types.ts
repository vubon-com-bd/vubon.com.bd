/**
 * Page Types
 * Type definitions for pages based on shared-constants
 * @module PageTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants page
// ============================================================
import {
  // Page Core
  CONTENT_PAGE,
  ContentPageType,
  ContentPageStatus,
  ContentPageTemplate,
  ContentPageLayout,
  ContentPageSection,
  ContentPageVisibility,
  ContentPageAccess,
  contentPageGetTypeLabel,
  contentPageGetStatusLabel,
  contentPageGetTemplateLabel,
  contentPageGetLayoutLabel,
  contentPageGetSectionLabel,
  contentPageGetVisibilityLabel,
  contentPageGetAccessLabel,
  contentPageIsPublished,
  contentPageIsEditable,
  contentPageGetDefaultStatus,
  contentPageGetDefaultVisibility,
  contentPageGetDefaultTemplate,
  contentPageGetDefaultLayout,
  contentPageIsValidType,
  contentPageIsValidStatus,
  contentPageIsValidTemplate,
  contentPageIsValidLayout,
  contentPageIsValidSection,
  contentPageGetDefaultSections,
  contentPageGetMaxSections,
  // Page Status
  CONTENT_PAGE_STATUS,
  ContentPageStatusType,
  ContentPageStatusCategory,
  ContentPageStatusColor,
  ContentPageStatusPriority,
  ContentPageState,
  ContentPageAction,
  contentPageStatusGetLabel,
  contentPageStatusGetCategory,
  contentPageStatusGetColor,
  contentPageStatusGetPriority,
  contentPageStatusIsPublished,
  contentPageStatusIsEditable,
  contentPageStatusIsArchived,
  contentPageStatusCanTransitionTo,
  contentPageStatusGetAvailableTransitions,
  contentPageStatusGetSequence,
  contentPageStatusGetStateLabel,
  contentPageStatusGetActionLabel,
  contentPageStatusIsValid,
  contentPageStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Page Extended Types
// ============================================================

/**
 * Page
 */
export interface Page extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  type: ContentPageType;
  status: ContentPageStatusType;
  template: ContentPageTemplate;
  layout: ContentPageLayout;
  sections: ContentPageSection[];
  visibility: ContentPageVisibility;
  access: ContentPageAccess;
  body: string;
  excerpt?: string;
  featuredImage?: string;
  images: string[];
  isPublished: boolean;
  isEditable: boolean;
  publishedAt?: Date;
  metadata?: Metadata;
}

/**
 * Page Filter
 */
export interface PageFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentPageType[];
  statuses?: ContentPageStatusType[];
  templates?: ContentPageTemplate[];
  layouts?: ContentPageLayout[];
  sections?: ContentPageSection[];
  visibilities?: ContentPageVisibility[];
  accesses?: ContentPageAccess[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  searchTerm?: string;
  slug?: string;
}

/**
 * Page Statistics
 */
export interface PageStatistics {
  userId: ID;
  totalPages: number;
  publishedPages: number;
  editablePages: number;
  byType: Record<ContentPageType, number>;
  byStatus: Record<ContentPageStatusType, number>;
  byTemplate: Record<ContentPageTemplate, number>;
  byLayout: Record<ContentPageLayout, number>;
  byVisibility: Record<ContentPageVisibility, number>;
  byAccess: Record<ContentPageAccess, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalSections: number;
  averageSections: number;
  maxSections: number;
  minSections: number;
  mostFrequentType: ContentPageType;
  mostFrequentTemplate: ContentPageTemplate;
  mostFrequentLayout: ContentPageLayout;
  mostFrequentStatus: ContentPageStatusType;
}

/**
 * Page Summary
 */
export interface PageSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  byType: Record<ContentPageType, number>;
  byStatus: Record<ContentPageStatusType, number>;
  byTemplate: Record<ContentPageTemplate, number>;
  byLayout: Record<ContentPageLayout, number>;
  byVisibility: Record<ContentPageVisibility, number>;
  byAccess: Record<ContentPageAccess, number>;
  pageTrend: {
    date: Date;
    total: number;
    published: number;
  }[];
  topTypes: {
    type: ContentPageType;
    count: number;
    label: string;
  }[];
  topTemplates: {
    template: ContentPageTemplate;
    count: number;
    label: string;
  }[];
  topLayouts: {
    layout: ContentPageLayout;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentPageStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Page Configuration
 */
export interface PageConfiguration {
  enabled: boolean;
  defaultType: ContentPageType;
  defaultStatus: ContentPageStatusType;
  defaultTemplate: ContentPageTemplate;
  defaultLayout: ContentPageLayout;
  defaultVisibility: ContentPageVisibility;
  defaultAccess: ContentPageAccess;
  defaultSections: ContentPageSection[];
  maxSections: number;
  allowComments: boolean;
  allowDownloads: boolean;
  allowPrinting: boolean;
  notificationOnPublish: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: PageAlertConfig;
}

/**
 * Page Alert Configuration
 */
export interface PageAlertConfig {
  enabled: boolean;
  duplicateSlugAlert: boolean;
  inappropriateContentAlert: boolean;
  pendingApprovalAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Page History
 */
export interface PageHistory extends BaseEntity, Timestamp {
  id: ID;
  pageId: ID;
  userId: ID;
  action: 'create' | 'update' | 'publish' | 'unpublish' | 'archive' | 'restore' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Page Validation
 */
export interface PageValidation {
  isValid: boolean;
  pageId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Page Export
 */
export interface PageExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'markdown' | 'xml';
  filter: PageFilter;
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
  // Page Core
  CONTENT_PAGE,
  ContentPageType,
  ContentPageStatus,
  ContentPageTemplate,
  ContentPageLayout,
  ContentPageSection,
  ContentPageVisibility,
  ContentPageAccess,
  contentPageGetTypeLabel,
  contentPageGetStatusLabel,
  contentPageGetTemplateLabel,
  contentPageGetLayoutLabel,
  contentPageGetSectionLabel,
  contentPageGetVisibilityLabel,
  contentPageGetAccessLabel,
  contentPageIsPublished,
  contentPageIsEditable,
  contentPageGetDefaultStatus,
  contentPageGetDefaultVisibility,
  contentPageGetDefaultTemplate,
  contentPageGetDefaultLayout,
  contentPageIsValidType,
  contentPageIsValidStatus,
  contentPageIsValidTemplate,
  contentPageIsValidLayout,
  contentPageIsValidSection,
  contentPageGetDefaultSections,
  contentPageGetMaxSections,
  // Page Status
  CONTENT_PAGE_STATUS,
  ContentPageStatusType,
  ContentPageStatusCategory,
  ContentPageStatusColor,
  ContentPageStatusPriority,
  ContentPageState,
  ContentPageAction,
  contentPageStatusGetLabel,
  contentPageStatusGetCategory,
  contentPageStatusGetColor,
  contentPageStatusGetPriority,
  contentPageStatusIsPublished,
  contentPageStatusIsEditable,
  contentPageStatusIsArchived,
  contentPageStatusCanTransitionTo,
  contentPageStatusGetAvailableTransitions,
  contentPageStatusGetSequence,
  contentPageStatusGetStateLabel,
  contentPageStatusGetActionLabel,
  contentPageStatusIsValid,
  contentPageStatusIsValidState,
};
