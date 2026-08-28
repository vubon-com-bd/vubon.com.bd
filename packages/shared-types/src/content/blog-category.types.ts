/**
 * Blog Category Types
 * Type definitions for blog categories based on shared-constants
 * @module BlogCategoryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants blog
// ============================================================
import {
  // Blog Category
  CONTENT_BLOG_CATEGORY,
  ContentBlogCategoryMain,
  ContentBlogCategorySub,
  ContentBlogCategoryType,
  ContentBlogCategoryVisibility,
  ContentBlogCategoryHierarchy,
  contentBlogCategoryGetMainLabel,
  contentBlogCategoryGetSubLabel,
  contentBlogCategoryGetTypeLabel,
  contentBlogCategoryGetVisibilityLabel,
  contentBlogCategoryGetHierarchyLabel,
  contentBlogCategoryIsValidMain,
  contentBlogCategoryIsValidSub,
  contentBlogCategoryGetSubCategories,
} from '@vubon/shared-constants';

// ============================================================
// Blog Category Extended Types
// ============================================================

/**
 * Blog Category
 */
export interface BlogCategory extends BaseEntity, Timestamp {
  id: ID;
  mainCategory: ContentBlogCategoryMain;
  subCategory?: ContentBlogCategorySub;
  hierarchy: ContentBlogCategoryHierarchy;
  type: ContentBlogCategoryType;
  visibility: ContentBlogCategoryVisibility;
  name: string;
  slug: Slug;
  description?: string;
  icon?: string;
  color?: string;
  order: number;
  parentId?: ID;
  children: BlogCategory[];
  isActive: boolean;
  isVisible: boolean;
  metadata?: Metadata;
}

/**
 * Blog Category Filter
 */
export interface BlogCategoryFilter {
  ids?: ID[];
  mainCategories?: ContentBlogCategoryMain[];
  subCategories?: ContentBlogCategorySub[];
  hierarchies?: ContentBlogCategoryHierarchy[];
  types?: ContentBlogCategoryType[];
  visibilities?: ContentBlogCategoryVisibility[];
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
 * Blog Category Statistics
 */
export interface BlogCategoryStatistics {
  totalCategories: number;
  activeCategories: number;
  visibleCategories: number;
  byMainCategory: Record<ContentBlogCategoryMain, number>;
  bySubCategory: Record<ContentBlogCategorySub, number>;
  byHierarchy: Record<ContentBlogCategoryHierarchy, number>;
  byType: Record<ContentBlogCategoryType, number>;
  byVisibility: Record<ContentBlogCategoryVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  categoriesWithChildren: number;
  categoriesWithoutChildren: number;
  averageDepth: number;
  maxDepth: number;
  mostFrequentMainCategory: ContentBlogCategoryMain;
  mostFrequentSubCategory: ContentBlogCategorySub;
  mostFrequentHierarchy: ContentBlogCategoryHierarchy;
}

/**
 * Blog Category Summary
 */
export interface BlogCategorySummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  visible: number;
  byMainCategory: Record<ContentBlogCategoryMain, number>;
  bySubCategory: Record<ContentBlogCategorySub, number>;
  byHierarchy: Record<ContentBlogCategoryHierarchy, number>;
  byType: Record<ContentBlogCategoryType, number>;
  byVisibility: Record<ContentBlogCategoryVisibility, number>;
  categoryTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topMainCategories: {
    mainCategory: ContentBlogCategoryMain;
    count: number;
    label: string;
  }[];
  topSubCategories: {
    subCategory: ContentBlogCategorySub;
    count: number;
    label: string;
  }[];
  topHierarchies: {
    hierarchy: ContentBlogCategoryHierarchy;
    count: number;
    label: string;
  }[];
}

/**
 * Blog Category Configuration
 */
export interface BlogCategoryConfiguration {
  enabled: boolean;
  defaultMainCategory: ContentBlogCategoryMain;
  defaultSubCategory: ContentBlogCategorySub;
  defaultHierarchy: ContentBlogCategoryHierarchy;
  defaultType: ContentBlogCategoryType;
  defaultVisibility: ContentBlogCategoryVisibility;
  maxCategoriesPerBlog: number;
  maxDepth: number;
  allowMultipleMainCategories: boolean;
  allowMultipleSubCategories: boolean;
  requireDescription: boolean;
  requireIcon: boolean;
  autoGenerateSlug: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: BlogCategoryAlertConfig;
}

/**
 * Blog Category Alert Configuration
 */
export interface BlogCategoryAlertConfig {
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
 * Blog Category History
 */
export interface BlogCategoryHistory extends BaseEntity, Timestamp {
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
 * Blog Category Validation
 */
export interface BlogCategoryValidation {
  isValid: boolean;
  categoryId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Blog Category Path
 */
export interface BlogCategoryPath {
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
 * Blog Category Tree
 */
export interface BlogCategoryTree {
  root: BlogCategory;
  children: BlogCategoryTree[];
  depth: number;
  totalNodes: number;
}

/**
 * Blog Category Export
 */
export interface BlogCategoryExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: BlogCategoryFilter;
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
  // Blog Category
  CONTENT_BLOG_CATEGORY,
  ContentBlogCategoryMain,
  ContentBlogCategorySub,
  ContentBlogCategoryType,
  ContentBlogCategoryVisibility,
  ContentBlogCategoryHierarchy,
  contentBlogCategoryGetMainLabel,
  contentBlogCategoryGetSubLabel,
  contentBlogCategoryGetTypeLabel,
  contentBlogCategoryGetVisibilityLabel,
  contentBlogCategoryGetHierarchyLabel,
  contentBlogCategoryIsValidMain,
  contentBlogCategoryIsValidSub,
  contentBlogCategoryGetSubCategories,
};
