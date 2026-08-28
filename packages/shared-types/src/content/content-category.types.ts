/**
 * Content Category Types
 * Type definitions for content categories based on shared-constants
 * @module ContentCategoryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import ContentCategory from content.types
// ============================================================
import type { ContentCategory } from './content.types';

// ============================================================
// Import from shared-constants content
// ============================================================
import {
  // Content Category
  CONTENT_CATEGORY,
  ContentMainCategory,
  ContentSubCategory,
  ContentCategoryHierarchy,
  ContentCategoryType,
  ContentCategoryVisibility,
  contentCategoryGetMainLabel,
  contentCategoryGetSubLabel,
  contentCategoryGetHierarchyLabel,
  contentCategoryGetTypeLabel,
  contentCategoryGetVisibilityLabel,
  contentCategoryIsValidMain,
  contentCategoryIsValidSub,
  contentCategoryGetSubCategories,
} from '@vubon/shared-constants';

// ============================================================
// Content Category Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Content Category Filter
 */
export interface ContentCategoryFilter {
  ids?: ID[];
  mainCategories?: ContentMainCategory[];
  subCategories?: ContentSubCategory[];
  hierarchy?: ContentCategoryHierarchy[];
  types?: ContentCategoryType[];
  visibilities?: ContentCategoryVisibility[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isVisible?: boolean;
  hasChildren?: boolean;
  hasParent?: boolean;
  searchTerm?: string;
  slug?: string;
}

/**
 * Content Category Statistics
 */
export interface ContentCategoryStatistics {
  totalCategories: number;
  activeCategories: number;
  visibleCategories: number;
  byMainCategory: Record<ContentMainCategory, number>;
  bySubCategory: Record<ContentSubCategory, number>;
  byHierarchy: Record<ContentCategoryHierarchy, number>;
  byType: Record<ContentCategoryType, number>;
  byVisibility: Record<ContentCategoryVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  categoriesWithChildren: number;
  categoriesWithoutChildren: number;
  averageDepth: number;
  maxDepth: number;
  mostFrequentMainCategory: ContentMainCategory;
  mostFrequentSubCategory: ContentSubCategory;
  mostFrequentHierarchy: ContentCategoryHierarchy;
}

/**
 * Content Category Summary
 */
export interface ContentCategorySummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  visible: number;
  byMainCategory: Record<ContentMainCategory, number>;
  bySubCategory: Record<ContentSubCategory, number>;
  byHierarchy: Record<ContentCategoryHierarchy, number>;
  byType: Record<ContentCategoryType, number>;
  byVisibility: Record<ContentCategoryVisibility, number>;
  categoryTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topMainCategories: {
    mainCategory: ContentMainCategory;
    count: number;
    label: string;
  }[];
  topSubCategories: {
    subCategory: ContentSubCategory;
    count: number;
    label: string;
  }[];
  topHierarchies: {
    hierarchy: ContentCategoryHierarchy;
    count: number;
    label: string;
  }[];
}

/**
 * Content Category Configuration
 */
export interface ContentCategoryConfiguration {
  enabled: boolean;
  defaultMainCategory: ContentMainCategory;
  defaultSubCategory: ContentSubCategory;
  defaultHierarchy: ContentCategoryHierarchy;
  defaultType: ContentCategoryType;
  defaultVisibility: ContentCategoryVisibility;
  maxCategoriesPerContent: number;
  maxDepth: number;
  allowMultipleMainCategories: boolean;
  allowMultipleSubCategories: boolean;
  requireDescription: boolean;
  requireIcon: boolean;
  autoGenerateSlug: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: ContentCategoryAlertConfig;
}

/**
 * Content Category Alert Configuration
 */
export interface ContentCategoryAlertConfig {
  enabled: boolean;
  duplicateSlugAlert: boolean;
  orphanCategoryAlert: boolean;
  depthLimitAlert: boolean;
  maxCategoryAlert: boolean;
  maxCategoryThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Content Category History
 */
export interface ContentCategoryHistory extends BaseEntity, Timestamp {
  id: ID;
  categoryId: ID;
  action: 'create' | 'update' | 'move' | 'delete' | 'restore' | 'visibility_change' | 'type_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Content Category Validation
 */
export interface ContentCategoryValidation {
  isValid: boolean;
  categoryId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Content Category Path
 */
export interface ContentCategoryPath {
  categoryId: ID;
  path: string[];
  depth: number;
  breadcrumbs: {
    name: string;
    slug: Slug;
    id: ID;
  }[];
}

/**
 * Content Category Tree
 */
export interface ContentCategoryTree {
  root: ContentCategory;
  children: ContentCategoryTree[];
  depth: number;
  totalNodes: number;
}

/**
 * Content Category Export
 */
export interface ContentCategoryExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ContentCategoryFilter;
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
  // Content Category
  CONTENT_CATEGORY,
  ContentMainCategory,
  ContentSubCategory,
  ContentCategoryHierarchy,
  ContentCategoryType,
  ContentCategoryVisibility,
  contentCategoryGetMainLabel,
  contentCategoryGetSubLabel,
  contentCategoryGetHierarchyLabel,
  contentCategoryGetTypeLabel,
  contentCategoryGetVisibilityLabel,
  contentCategoryIsValidMain,
  contentCategoryIsValidSub,
  contentCategoryGetSubCategories,
};
