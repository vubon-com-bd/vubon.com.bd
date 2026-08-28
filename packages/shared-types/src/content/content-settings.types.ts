/**
 * Content Settings Types
 * Type definitions for content settings based on shared-constants
 * @module ContentSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants content
// ============================================================
import {
  // Content Core
  ContentType,
  ContentStatus,
  ContentCategory,
  ContentTag,
  ContentFormat,
  ContentLanguage,
  ContentLicense,
  ContentVisibility,
  ContentAccess,
  contentGetDefaultLanguage,
  contentGetDefaultFormat,
  contentGetDefaultVisibility,
  contentGetDefaultStatus,
  contentGetMaxTags,
  contentGetMaxCategories,
  contentGetMaxWords,
  contentGetMinWords,
} from '@vubon/shared-constants';

// ============================================================
// Content Settings Extended Types
// ============================================================

/**
 * Content Settings
 */
export interface ContentSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  defaultType: ContentType;
  defaultStatus: ContentStatus;
  defaultCategory: ContentCategory;
  defaultFormat: ContentFormat;
  defaultLanguage: ContentLanguage;
  defaultLicense: ContentLicense;
  defaultVisibility: ContentVisibility;
  defaultAccess: ContentAccess;
  maxTags: number;
  maxCategories: number;
  maxWords: number;
  minWords: number;
  allowComments: boolean;
  allowDownloads: boolean;
  allowPrinting: boolean;
  allowSharing: boolean;
  allowEmbedding: boolean;
  requireApproval: boolean;
  autoPublish: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnPublish: boolean;
  notificationOnDelete: boolean;
  metadata?: Metadata;
}

/**
 * Content Settings Filter
 */
export interface ContentSettingsFilter {
  ids?: ID[];
  userIds?: ID[];
  defaultTypes?: ContentType[];
  defaultStatuses?: ContentStatus[];
  defaultCategories?: ContentCategory[];
  defaultFormats?: ContentFormat[];
  defaultLanguages?: ContentLanguage[];
  defaultLicenses?: ContentLicense[];
  defaultVisibilities?: ContentVisibility[];
  defaultAccesses?: ContentAccess[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  allowComments?: boolean;
  allowDownloads?: boolean;
  allowPrinting?: boolean;
  allowSharing?: boolean;
  allowEmbedding?: boolean;
  requireApproval?: boolean;
  autoPublish?: boolean;
  searchTerm?: string;
}

/**
 * Content Settings Statistics
 */
export interface ContentSettingsStatistics {
  userId: ID;
  totalSettings: number;
  byDefaultType: Record<ContentType, number>;
  byDefaultStatus: Record<ContentStatus, number>;
  byDefaultCategory: Record<ContentCategory, number>;
  byDefaultFormat: Record<ContentFormat, number>;
  byDefaultLanguage: Record<ContentLanguage, number>;
  byDefaultLicense: Record<ContentLicense, number>;
  byDefaultVisibility: Record<ContentVisibility, number>;
  byDefaultAccess: Record<ContentAccess, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageMaxTags: number;
  averageMaxCategories: number;
  averageMaxWords: number;
  averageMinWords: number;
  mostFrequentDefaultType: ContentType;
  mostFrequentDefaultStatus: ContentStatus;
  mostFrequentDefaultCategory: ContentCategory;
  mostFrequentDefaultFormat: ContentFormat;
  mostFrequentDefaultLanguage: ContentLanguage;
}

/**
 * Content Settings Summary
 */
export interface ContentSettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettings: number;
  byDefaultType: Record<ContentType, number>;
  byDefaultStatus: Record<ContentStatus, number>;
  byDefaultCategory: Record<ContentCategory, number>;
  byDefaultFormat: Record<ContentFormat, number>;
  byDefaultLanguage: Record<ContentLanguage, number>;
  byDefaultLicense: Record<ContentLicense, number>;
  byDefaultVisibility: Record<ContentVisibility, number>;
  byDefaultAccess: Record<ContentAccess, number>;
  settingsTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topDefaultTypes: {
    type: ContentType;
    count: number;
    label: string;
  }[];
  topDefaultStatuses: {
    status: ContentStatus;
    count: number;
    label: string;
  }[];
  topDefaultCategories: {
    category: ContentCategory;
    count: number;
    label: string;
  }[];
  topDefaultFormats: {
    format: ContentFormat;
    count: number;
    label: string;
  }[];
  topDefaultLanguages: {
    language: ContentLanguage;
    count: number;
    label: string;
  }[];
}

/**
 * Content Settings Configuration
 */
export interface ContentSettingsConfiguration {
  enabled: boolean;
  defaultType: ContentType;
  defaultStatus: ContentStatus;
  defaultCategory: ContentCategory;
  defaultFormat: ContentFormat;
  defaultLanguage: ContentLanguage;
  defaultLicense: ContentLicense;
  defaultVisibility: ContentVisibility;
  defaultAccess: ContentAccess;
  maxTags: number;
  maxCategories: number;
  maxWords: number;
  minWords: number;
  allowComments: boolean;
  allowDownloads: boolean;
  allowPrinting: boolean;
  allowSharing: boolean;
  allowEmbedding: boolean;
  requireApproval: boolean;
  autoPublish: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnPublish: boolean;
  notificationOnDelete: boolean;
  alertConfig?: ContentSettingsAlertConfig;
}

/**
 * Content Settings Alert Configuration
 */
export interface ContentSettingsAlertConfig {
  enabled: boolean;
  invalidSettingsAlert: boolean;
  duplicateSettingsAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  securityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Content Settings History
 */
export interface ContentSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  userId: ID;
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
 * Content Settings Validation
 */
export interface ContentSettingsValidation {
  isValid: boolean;
  settingsId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Content Settings Export
 */
export interface ContentSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: ContentSettingsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Content Settings Import
 */
export interface ContentSettingsImport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedSettings: number;
  failedSettings: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

/**
 * Content Settings Default
 */
export interface ContentSettingsDefault {
  type: ContentType;
  status: ContentStatus;
  category: ContentCategory;
  format: ContentFormat;
  language: ContentLanguage;
  license: ContentLicense;
  visibility: ContentVisibility;
  access: ContentAccess;
  maxTags: number;
  maxCategories: number;
  maxWords: number;
  minWords: number;
  allowComments: boolean;
  allowDownloads: boolean;
  allowPrinting: boolean;
  allowSharing: boolean;
  allowEmbedding: boolean;
  requireApproval: boolean;
  autoPublish: boolean;
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
  ContentStatus,
  ContentCategory,
  ContentTag,
  ContentFormat,
  ContentLanguage,
  ContentLicense,
  ContentVisibility,
  ContentAccess,
  contentGetDefaultLanguage,
  contentGetDefaultFormat,
  contentGetDefaultVisibility,
  contentGetDefaultStatus,
  contentGetMaxTags,
  contentGetMaxCategories,
  contentGetMaxWords,
  contentGetMinWords,
};
