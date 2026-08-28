/**
 * Content Preferences Types
 * Type definitions for content preferences based on shared-constants
 * @module ContentPreferencesTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants content
// ============================================================
import {
  // Content Core
  ContentType,
  ContentCategory,
  ContentTag,
  ContentFormat,
  ContentLanguage,
  ContentVisibility,
} from '@vubon/shared-constants';

// ============================================================
// Content Preferences Extended Types
// ============================================================

/**
 * Content Preferences
 */
export interface ContentPreferences extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  preferredTypes: ContentType[];
  preferredCategories: ContentCategory[];
  preferredTags: ContentTag[];
  preferredFormats: ContentFormat[];
  preferredLanguages: ContentLanguage[];
  preferredVisibility: ContentVisibility;
  preferredReadingTime: number;
  preferredContentLength: 'short' | 'medium' | 'long';
  preferredComplexity: 'beginner' | 'intermediate' | 'advanced';
  preferredTone: 'formal' | 'casual' | 'conversational' | 'technical';
  preferredTopics: string[];
  excludedTopics: string[];
  excludedTags: ContentTag[];
  excludedCategories: ContentCategory[];
  enableRecommendations: boolean;
  enablePersonalization: boolean;
  enableNotifications: boolean;
  enableEmailDigest: boolean;
  digestFrequency: 'daily' | 'weekly' | 'monthly';
  metadata?: Metadata;
}

/**
 * Content Preferences Filter
 */
export interface ContentPreferencesFilter {
  ids?: ID[];
  userIds?: ID[];
  preferredTypes?: ContentType[];
  preferredCategories?: ContentCategory[];
  preferredTags?: ContentTag[];
  preferredFormats?: ContentFormat[];
  preferredLanguages?: ContentLanguage[];
  preferredVisibilities?: ContentVisibility[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  enableRecommendations?: boolean;
  enablePersonalization?: boolean;
  enableNotifications?: boolean;
  enableEmailDigest?: boolean;
  digestFrequency?: 'daily' | 'weekly' | 'monthly';
  searchTerm?: string;
}

/**
 * Content Preferences Statistics
 */
export interface ContentPreferencesStatistics {
  userId: ID;
  totalPreferences: number;
  byPreferredType: Record<ContentType, number>;
  byPreferredCategory: Record<ContentCategory, number>;
  byPreferredTag: Record<ContentTag, number>;
  byPreferredFormat: Record<ContentFormat, number>;
  byPreferredLanguage: Record<ContentLanguage, number>;
  byPreferredVisibility: Record<ContentVisibility, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePreferredReadingTime: number;
  mostFrequentPreferredType: ContentType;
  mostFrequentPreferredCategory: ContentCategory;
  mostFrequentPreferredTag: ContentTag;
  mostFrequentPreferredFormat: ContentFormat;
  mostFrequentPreferredLanguage: ContentLanguage;
  enableRecommendationsCount: number;
  enablePersonalizationCount: number;
  enableNotificationsCount: number;
  enableEmailDigestCount: number;
  digestFrequencyDistribution: Record<string, number>;
}

/**
 * Content Preferences Summary
 */
export interface ContentPreferencesSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPreferences: number;
  byPreferredType: Record<ContentType, number>;
  byPreferredCategory: Record<ContentCategory, number>;
  byPreferredTag: Record<ContentTag, number>;
  byPreferredFormat: Record<ContentFormat, number>;
  byPreferredLanguage: Record<ContentLanguage, number>;
  byPreferredVisibility: Record<ContentVisibility, number>;
  preferencesTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topPreferredTypes: {
    type: ContentType;
    count: number;
    label: string;
  }[];
  topPreferredCategories: {
    category: ContentCategory;
    count: number;
    label: string;
  }[];
  topPreferredTags: {
    tag: ContentTag;
    count: number;
    label: string;
  }[];
  topPreferredFormats: {
    format: ContentFormat;
    count: number;
    label: string;
  }[];
  topPreferredLanguages: {
    language: ContentLanguage;
    count: number;
    label: string;
  }[];
  preferencesMetrics: {
    enableRecommendations: number;
    enablePersonalization: number;
    enableNotifications: number;
    enableEmailDigest: number;
    digestFrequencyDaily: number;
    digestFrequencyWeekly: number;
    digestFrequencyMonthly: number;
  };
}

/**
 * Content Preferences Configuration
 */
export interface ContentPreferencesConfiguration {
  enabled: boolean;
  defaultTypes: ContentType[];
  defaultCategories: ContentCategory[];
  defaultTags: ContentTag[];
  defaultFormats: ContentFormat[];
  defaultLanguages: ContentLanguage[];
  defaultVisibility: ContentVisibility;
  defaultReadingTime: number;
  defaultContentLength: 'short' | 'medium' | 'long';
  defaultComplexity: 'beginner' | 'intermediate' | 'advanced';
  defaultTone: 'formal' | 'casual' | 'conversational' | 'technical';
  maxPreferredTypes: number;
  maxPreferredCategories: number;
  maxPreferredTags: number;
  maxPreferredFormats: number;
  maxPreferredLanguages: number;
  maxExcludedTopics: number;
  maxExcludedTags: number;
  maxExcludedCategories: number;
  enableRecommendations: boolean;
  enablePersonalization: boolean;
  enableNotifications: boolean;
  enableEmailDigest: boolean;
  digestFrequency: 'daily' | 'weekly' | 'monthly';
  allowUserCustomization: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: ContentPreferencesAlertConfig;
}

/**
 * Content Preferences Alert Configuration
 */
export interface ContentPreferencesAlertConfig {
  enabled: boolean;
  invalidPreferencesAlert: boolean;
  duplicatePreferencesAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  securityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Content Preferences History
 */
export interface ContentPreferencesHistory extends BaseEntity, Timestamp {
  id: ID;
  preferencesId: ID;
  userId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Content Preferences Validation
 */
export interface ContentPreferencesValidation {
  isValid: boolean;
  preferencesId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Content Preferences Export
 */
export interface ContentPreferencesExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: ContentPreferencesFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Content Preferences Import
 */
export interface ContentPreferencesImport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedPreferences: number;
  failedPreferences: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * Content Preferences Default
 */
export interface ContentPreferencesDefault {
  types: ContentType[];
  categories: ContentCategory[];
  tags: ContentTag[];
  formats: ContentFormat[];
  languages: ContentLanguage[];
  visibility: ContentVisibility;
  readingTime: number;
  contentLength: 'short' | 'medium' | 'long';
  complexity: 'beginner' | 'intermediate' | 'advanced';
  tone: 'formal' | 'casual' | 'conversational' | 'technical';
  enableRecommendations: boolean;
  enablePersonalization: boolean;
  enableNotifications: boolean;
  enableEmailDigest: boolean;
  digestFrequency: 'daily' | 'weekly' | 'monthly';
  version: string;
  updatedAt: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Content Core
  ContentType,
  ContentCategory,
  ContentTag,
  ContentFormat,
  ContentLanguage,
  ContentVisibility,
};
