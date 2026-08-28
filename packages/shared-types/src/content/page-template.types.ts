/**
 * Page Template Types
 * Type definitions for page templates based on shared-constants
 * @module PageTemplateTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants page
// ============================================================
import {
  // Page Template
  CONTENT_PAGE_TEMPLATE,
  ContentPageTemplateCategory,
  ContentPageTemplateComplexity,
  ContentPageTemplateFeature,
  ContentPageTemplateSupport,
  ContentPageTemplatePerformance,
  ContentPageTemplateSEO,
  ContentPageTemplateAccessibility,
  contentPageTemplateGetCategoryLabel,
  contentPageTemplateGetComplexityLabel,
  contentPageTemplateGetFeatureLabel,
  contentPageTemplateGetSupportLabel,
  contentPageTemplateGetPerformanceLabel,
  contentPageTemplateGetSEOLabel,
  contentPageTemplateGetAccessibilityLabel,
  contentPageTemplateIsValidCategory,
  contentPageTemplateIsValidFeature,
} from '@vubon/shared-constants';

// ============================================================
// Page Template Extended Types
// ============================================================

/**
 * Page Template
 */
export interface PageTemplate extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  category: ContentPageTemplateCategory;
  complexity: ContentPageTemplateComplexity;
  features: ContentPageTemplateFeature[];
  support: ContentPageTemplateSupport;
  performance: ContentPageTemplatePerformance;
  seo: ContentPageTemplateSEO;
  accessibility: ContentPageTemplateAccessibility;
  description?: string;
  thumbnail?: string;
  isActive: boolean;
  isDefault: boolean;
  metadata?: Metadata;
}

/**
 * Page Template Filter
 */
export interface PageTemplateFilter {
  ids?: ID[];
  categories?: ContentPageTemplateCategory[];
  complexities?: ContentPageTemplateComplexity[];
  features?: ContentPageTemplateFeature[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isDefault?: boolean;
  searchTerm?: string;
}

/**
 * Page Template Statistics
 */
export interface PageTemplateStatistics {
  totalTemplates: number;
  activeTemplates: number;
  defaultTemplates: number;
  byCategory: Record<ContentPageTemplateCategory, number>;
  byComplexity: Record<ContentPageTemplateComplexity, number>;
  byFeature: Record<ContentPageTemplateFeature, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentCategory: ContentPageTemplateCategory;
  mostFrequentComplexity: ContentPageTemplateComplexity;
  mostFrequentFeature: ContentPageTemplateFeature;
}

/**
 * Page Template Summary
 */
export interface PageTemplateSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  default: number;
  byCategory: Record<ContentPageTemplateCategory, number>;
  byComplexity: Record<ContentPageTemplateComplexity, number>;
  byFeature: Record<ContentPageTemplateFeature, number>;
  templateTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topCategories: {
    category: ContentPageTemplateCategory;
    count: number;
    label: string;
  }[];
  topComplexities: {
    complexity: ContentPageTemplateComplexity;
    count: number;
    label: string;
  }[];
  topFeatures: {
    feature: ContentPageTemplateFeature;
    count: number;
    label: string;
  }[];
}

/**
 * Page Template Configuration
 */
export interface PageTemplateConfiguration {
  enabled: boolean;
  defaultCategory: ContentPageTemplateCategory;
  defaultComplexity: ContentPageTemplateComplexity;
  defaultFeatures: ContentPageTemplateFeature[];
  maxTemplatesPerPage: number;
  requireDescription: boolean;
  requireThumbnail: boolean;
  allowCustomFeatures: boolean;
  allowCustomSupport: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: PageTemplateAlertConfig;
}

/**
 * Page Template Alert Configuration
 */
export interface PageTemplateAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  invalidFeatureAlert: boolean;
  maxLimitAlert: boolean;
  maxLimitThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Page Template History
 */
export interface PageTemplateHistory extends BaseEntity, Timestamp {
  id: ID;
  templateId: ID;
  action:
    | 'create'
    | 'update'
    | 'activate'
    | 'deactivate'
    | 'set_default'
    | 'unset_default'
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
 * Page Template Validation
 */
export interface PageTemplateValidation {
  isValid: boolean;
  templateId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Page Template Export
 */
export interface PageTemplateExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PageTemplateFilter;
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
  // Page Template
  CONTENT_PAGE_TEMPLATE,
  ContentPageTemplateCategory,
  ContentPageTemplateComplexity,
  ContentPageTemplateFeature,
  ContentPageTemplateSupport,
  ContentPageTemplatePerformance,
  ContentPageTemplateSEO,
  ContentPageTemplateAccessibility,
  contentPageTemplateGetCategoryLabel,
  contentPageTemplateGetComplexityLabel,
  contentPageTemplateGetFeatureLabel,
  contentPageTemplateGetSupportLabel,
  contentPageTemplateGetPerformanceLabel,
  contentPageTemplateGetSEOLabel,
  contentPageTemplateGetAccessibilityLabel,
  contentPageTemplateIsValidCategory,
  contentPageTemplateIsValidFeature,
};
