/**
 * Gallery Types
 * Type definitions for galleries based on shared-constants
 * @module GalleryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants gallery
// ============================================================
import {
  // Gallery Core
  CONTENT_GALLERY,
  ContentGalleryType,
  ContentGalleryStatus,
  ContentGalleryLayout,
  ContentGalleryDisplayMode,
  ContentGallerySortOption,
  ContentGalleryVisibility,
  ContentGalleryAccess,
  contentGalleryGetTypeLabel,
  contentGalleryGetStatusLabel,
  contentGalleryGetLayoutLabel,
  contentGalleryGetDisplayModeLabel,
  contentGalleryGetSortOptionLabel,
  contentGalleryGetVisibilityLabel,
  contentGalleryGetAccessLabel,
  contentGalleryIsPublished,
  contentGalleryIsEditable,
  contentGalleryGetDefaultStatus,
  contentGalleryGetDefaultVisibility,
  contentGalleryGetDefaultLayout,
  contentGalleryGetDefaultDisplayMode,
  contentGalleryGetDefaultSort,
  contentGalleryGetItemsPerPage,
  contentGalleryGetMaxColumns,
  contentGalleryIsValidType,
  contentGalleryIsValidStatus,
  contentGalleryIsValidLayout,
  contentGalleryIsValidDisplayMode,
  contentGalleryIsValidSortOption,
  // Gallery Status
  CONTENT_GALLERY_STATUS,
  ContentGalleryStatusType,
  ContentGalleryStatusCategory,
  ContentGalleryStatusColor,
  ContentGalleryStatusPriority,
  ContentGalleryState,
  ContentGalleryAction,
  contentGalleryStatusGetLabel,
  contentGalleryStatusGetCategory,
  contentGalleryStatusGetColor,
  contentGalleryStatusGetPriority,
  contentGalleryStatusIsPublished,
  contentGalleryStatusIsEditable,
  contentGalleryStatusIsArchived,
  contentGalleryStatusCanTransitionTo,
  contentGalleryStatusGetAvailableTransitions,
  contentGalleryStatusGetSequence,
  contentGalleryStatusGetStateLabel,
  contentGalleryStatusGetActionLabel,
  contentGalleryStatusIsValid,
  contentGalleryStatusIsValidState,
} from '@vubon/shared-constants';

// ============================================================
// Gallery Extended Types
// ============================================================

/**
 * Gallery Item
 */
export interface GalleryItem extends BaseEntity, Timestamp {
  id: ID;
  galleryId: ID;
  mediaId: ID;
  title: string;
  caption?: string;
  alt?: string;
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  order: number;
  isFeatured: boolean;
  metadata?: Metadata;
}

/**
 * Gallery
 */
export interface Gallery extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  title: string;
  slug: Slug;
  type: ContentGalleryType;
  status: ContentGalleryStatusType;
  layout: ContentGalleryLayout;
  displayMode: ContentGalleryDisplayMode;
  sortOption: ContentGallerySortOption;
  visibility: ContentGalleryVisibility;
  access: ContentGalleryAccess;
  description?: string;
  items: GalleryItem[];
  itemsPerPage: number;
  maxColumns: number;
  isPublished: boolean;
  isEditable: boolean;
  publishedAt?: Date;
  metadata?: Metadata;
}

/**
 * Gallery Filter
 */
export interface GalleryFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: ContentGalleryType[];
  statuses?: ContentGalleryStatusType[];
  layouts?: ContentGalleryLayout[];
  displayModes?: ContentGalleryDisplayMode[];
  sortOptions?: ContentGallerySortOption[];
  visibilities?: ContentGalleryVisibility[];
  accesses?: ContentGalleryAccess[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPublished?: boolean;
  isEditable?: boolean;
  searchTerm?: string;
  slug?: string;
  minItems?: number;
  maxItems?: number;
}

/**
 * Gallery Statistics
 */
export interface GalleryStatistics {
  userId: ID;
  totalGalleries: number;
  publishedGalleries: number;
  editableGalleries: number;
  byType: Record<ContentGalleryType, number>;
  byStatus: Record<ContentGalleryStatusType, number>;
  byLayout: Record<ContentGalleryLayout, number>;
  byDisplayMode: Record<ContentGalleryDisplayMode, number>;
  byVisibility: Record<ContentGalleryVisibility, number>;
  byAccess: Record<ContentGalleryAccess, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  averageItems: number;
  maxItems: number;
  minItems: number;
  mostFrequentType: ContentGalleryType;
  mostFrequentLayout: ContentGalleryLayout;
  mostFrequentDisplayMode: ContentGalleryDisplayMode;
  mostFrequentStatus: ContentGalleryStatusType;
}

/**
 * Gallery Summary
 */
export interface GallerySummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  published: number;
  editable: number;
  byType: Record<ContentGalleryType, number>;
  byStatus: Record<ContentGalleryStatusType, number>;
  byLayout: Record<ContentGalleryLayout, number>;
  byDisplayMode: Record<ContentGalleryDisplayMode, number>;
  byVisibility: Record<ContentGalleryVisibility, number>;
  byAccess: Record<ContentGalleryAccess, number>;
  galleryTrend: {
    date: Date;
    total: number;
    published: number;
  }[];
  topTypes: {
    type: ContentGalleryType;
    count: number;
    label: string;
  }[];
  topLayouts: {
    layout: ContentGalleryLayout;
    count: number;
    label: string;
  }[];
  topDisplayModes: {
    displayMode: ContentGalleryDisplayMode;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ContentGalleryStatusType;
    count: number;
    label: string;
  }[];
}

/**
 * Gallery Configuration
 */
export interface GalleryConfiguration {
  enabled: boolean;
  defaultType: ContentGalleryType;
  defaultStatus: ContentGalleryStatusType;
  defaultLayout: ContentGalleryLayout;
  defaultDisplayMode: ContentGalleryDisplayMode;
  defaultSort: ContentGallerySortOption;
  defaultVisibility: ContentGalleryVisibility;
  defaultAccess: ContentGalleryAccess;
  itemsPerPage: number;
  maxColumns: number;
  maxItemsPerGallery: number;
  allowComments: boolean;
  allowDownloads: boolean;
  allowSharing: boolean;
  notificationOnPublish: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: GalleryAlertConfig;
}

/**
 * Gallery Alert Configuration
 */
export interface GalleryAlertConfig {
  enabled: boolean;
  duplicateSlugAlert: boolean;
  inappropriateContentAlert: boolean;
  pendingApprovalAlert: boolean;
  maxItemsAlert: boolean;
  maxItemsThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Gallery History
 */
export interface GalleryHistory extends BaseEntity, Timestamp {
  id: ID;
  galleryId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'publish'
    | 'unpublish'
    | 'archive'
    | 'restore'
    | 'delete'
    | 'add_item'
    | 'remove_item'
    | 'reorder';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Gallery Validation
 */
export interface GalleryValidation {
  isValid: boolean;
  galleryId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Gallery Export
 */
export interface GalleryExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'html' | 'zip';
  filter: GalleryFilter;
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
  // Gallery Core
  CONTENT_GALLERY,
  ContentGalleryType,
  ContentGalleryStatus,
  ContentGalleryLayout,
  ContentGalleryDisplayMode,
  ContentGallerySortOption,
  ContentGalleryVisibility,
  ContentGalleryAccess,
  contentGalleryGetTypeLabel,
  contentGalleryGetStatusLabel,
  contentGalleryGetLayoutLabel,
  contentGalleryGetDisplayModeLabel,
  contentGalleryGetSortOptionLabel,
  contentGalleryGetVisibilityLabel,
  contentGalleryGetAccessLabel,
  contentGalleryIsPublished,
  contentGalleryIsEditable,
  contentGalleryGetDefaultStatus,
  contentGalleryGetDefaultVisibility,
  contentGalleryGetDefaultLayout,
  contentGalleryGetDefaultDisplayMode,
  contentGalleryGetDefaultSort,
  contentGalleryGetItemsPerPage,
  contentGalleryGetMaxColumns,
  contentGalleryIsValidType,
  contentGalleryIsValidStatus,
  contentGalleryIsValidLayout,
  contentGalleryIsValidDisplayMode,
  contentGalleryIsValidSortOption,
  // Gallery Status
  CONTENT_GALLERY_STATUS,
  ContentGalleryStatusType,
  ContentGalleryStatusCategory,
  ContentGalleryStatusColor,
  ContentGalleryStatusPriority,
  ContentGalleryState,
  ContentGalleryAction,
  contentGalleryStatusGetLabel,
  contentGalleryStatusGetCategory,
  contentGalleryStatusGetColor,
  contentGalleryStatusGetPriority,
  contentGalleryStatusIsPublished,
  contentGalleryStatusIsEditable,
  contentGalleryStatusIsArchived,
  contentGalleryStatusCanTransitionTo,
  contentGalleryStatusGetAvailableTransitions,
  contentGalleryStatusGetSequence,
  contentGalleryStatusGetStateLabel,
  contentGalleryStatusGetActionLabel,
  contentGalleryStatusIsValid,
  contentGalleryStatusIsValidState,
};
