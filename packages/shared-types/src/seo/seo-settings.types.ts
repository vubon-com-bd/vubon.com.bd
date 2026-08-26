/**
 * SEO Settings Types
 * Type definitions for SEO settings based on shared-constants
 * @module SEOSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEOStatus, SEOPriority } from '../common/seo.types';

// ============================================================
// SEO Settings Extended Types
// ============================================================

/**
 * SEO settings
 */
export interface SEOSettings extends BaseEntity, Timestamp {
  id: ID;
  projectId: ID;
  name: string;
  description?: string;
  status: SEOStatus;
  priority: SEOPriority;
  isActive: boolean;
  config: SEOSettingsConfig;
  metadata?: Metadata;
}

/**
 * SEO settings configuration
 */
export interface SEOSettingsConfig {
  // General Settings
  defaultLanguage: string;
  defaultCountry: string;
  defaultTimezone: string;
  defaultCurrency: string;

  // SEO Settings
  enableSEO: boolean;
  enableSitemap: boolean;
  enableRobots: boolean;
  enableSchema: boolean;
  enableOpenGraph: boolean;
  enableTwitterCard: boolean;
  enableAnalytics: boolean;
  enableReports: boolean;

  // Content Settings
  defaultContentType: string;
  defaultContentStatus: string;
  defaultContentPriority: string;
  minContentLength: number;
  maxContentLength: number;
  autoOptimize: boolean;

  // Keyword Settings
  defaultKeywordType: string;
  defaultKeywordStatus: string;
  maxKeywordsPerContent: number;
  autoDetectIntent: boolean;
  autoCalculateDifficulty: boolean;

  // Link Settings
  defaultLinkType: string;
  defaultLinkStatus: string;
  maxLinksPerPage: number;
  autoCheckLinks: boolean;
  autoFixBrokenLinks: boolean;

  // Audit Settings
  defaultAuditType: string;
  defaultAuditSeverity: string;
  defaultAuditPriority: string;
  autoScheduleAudits: boolean;
  autoRunAudits: boolean;

  // Score Settings
  defaultScoreType: string;
  goodThreshold: number;
  excellentThreshold: number;
  outstandingThreshold: number;
  autoCheckScores: boolean;

  // Ranking Settings
  defaultRankingType: string;
  defaultRankingSource: string;
  minPosition: number;
  maxPosition: number;
  autoCheckRankings: boolean;

  // Sitemap Settings
  defaultSitemapType: string;
  defaultSitemapFormat: string;
  maxUrlCount: number;
  autoGenerateSitemap: boolean;
  autoUpdateSitemap: boolean;

  // Robots Settings
  defaultRobotsType: string;
  defaultUserAgent: string;
  defaultDirectives: string[];
  autoGenerateRobots: boolean;
  autoValidateRobots: boolean;

  // Schema Settings
  defaultSchemaType: string;
  defaultSchemaFormat: string;
  defaultSchemaContext: string;
  autoGenerateSchema: boolean;
  autoValidateSchema: boolean;

  // Open Graph Settings
  defaultOGType: string;
  defaultOGPlatform: string;
  defaultOGImageSize: string;
  autoGenerateOG: boolean;
  autoValidateOG: boolean;

  // Twitter Card Settings
  defaultTwitterCardType: string;
  defaultTwitterCardPlatform: string;
  defaultTwitterCardImageSize: string;
  autoGenerateTwitterCard: boolean;
  autoValidateTwitterCard: boolean;

  // Analytics Settings
  defaultAnalyticsType: string;
  defaultAnalyticsTimeframe: string;
  defaultAnalyticsAggregation: string;
  autoCollectAnalytics: boolean;
  autoUpdateAnalytics: boolean;

  // Report Settings
  defaultReportType: string;
  defaultReportFormat: string;
  defaultReportFrequency: string;
  autoGenerateReports: boolean;
  autoDeliverReports: boolean;
}

/**
 * SEO settings filter
 */
export interface SEOSettingsFilter {
  ids?: ID[];
  projectIds?: ID[];
  statuses?: SEOStatus[];
  priorities?: SEOPriority[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  searchTerm?: string;
}

/**
 * SEO settings statistics
 */
export interface SEOSettingsStatistics {
  totalSettings: number;
  activeSettings: number;
  byStatus: Record<SEOStatus, number>;
  byPriority: Record<SEOPriority, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentStatus: SEOStatus;
  mostFrequentPriority: SEOPriority;
}

/**
 * SEO settings summary
 */
export interface SEOSettingsSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSettings: number;
  active: number;
  byStatus: Record<SEOStatus, number>;
  byPriority: Record<SEOPriority, number>;
  settingsTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topStatuses: {
    status: SEOStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: SEOPriority;
    count: number;
    label: string;
  }[];
}

/**
 * SEO settings configuration
 */
export interface SEOSettingsConfiguration {
  enabled: boolean;
  defaultStatus: SEOStatus;
  defaultPriority: SEOPriority;
  allowMultipleSettings: boolean;
  requireName: boolean;
  requireConfig: boolean;
  maxSettingsPerProject: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnActivate: boolean;
  notificationOnDeactivate: boolean;
  alertConfig?: SEOSettingsAlertConfig;
}

/**
 * SEO settings alert configuration
 */
export interface SEOSettingsAlertConfig {
  enabled: boolean;
  configValidationAlert: boolean;
  inactiveSettingsAlert: boolean;
  duplicateSettingsAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * SEO settings history
 */
export interface SEOSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  projectId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete' | 'restore' | 'config_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO settings validation
 */
export interface SEOSettingsValidation {
  isValid: boolean;
  settingsId: ID;
  projectId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO settings export
 */
export interface SEOSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  projectId: ID;
  format: 'json' | 'yaml' | 'xml' | 'csv';
  filter: SEOSettingsFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * SEO settings import
 */
export interface SEOSettingsImport extends BaseEntity, Timestamp {
  id: ID;
  projectId: ID;
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

// ============================================================
// Re-export Everything
// ============================================================

export {
  // SEO Status
  SEOStatus,
  // SEO Priority
  SEOPriority,
};
