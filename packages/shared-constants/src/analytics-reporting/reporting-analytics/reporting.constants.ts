/**
 * @fileoverview Reporting system core constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Report formats
 */
export enum ReportFormat {
  /** PDF format */
  PDF = 'PDF',
  /** Excel format */
  EXCEL = 'EXCEL',
  /** CSV format */
  CSV = 'CSV',
  /** JSON format */
  JSON = 'JSON',
  /** HTML format */
  HTML = 'HTML',
  /** XML format */
  XML = 'XML',
  /** Markdown format */
  MARKDOWN = 'MARKDOWN',
  /** PowerPoint format */
  POWERPOINT = 'POWERPOINT',
  /** Word format */
  WORD = 'WORD',
  /** Text format */
  TEXT = 'TEXT',
}

/**
 * Report delivery methods
 */
export enum ReportDeliveryMethod {
  /** Email delivery */
  EMAIL = 'EMAIL',
  /** Download link */
  DOWNLOAD = 'DOWNLOAD',
  /** FTP upload */
  FTP = 'FTP',
  /** S3 upload */
  S3 = 'S3',
  /** API endpoint */
  API = 'API',
  /** Webhook */
  WEBHOOK = 'WEBHOOK',
  /** Slack */
  SLACK = 'SLACK',
  /** Teams */
  TEAMS = 'TEAMS',
  /** Discord */
  DISCORD = 'DISCORD',
  /** SMS */
  SMS = 'SMS',
}

/**
 * Report status
 */
export enum ReportStatus {
  /** Report is being generated */
  GENERATING = 'GENERATING',
  /** Report generation completed */
  COMPLETED = 'COMPLETED',
  /** Report generation failed */
  FAILED = 'FAILED',
  /** Report is queued */
  QUEUED = 'QUEUED',
  /** Report is being processed */
  PROCESSING = 'PROCESSING',
  /** Report is ready for download */
  READY = 'READY',
  /** Report is expired */
  EXPIRED = 'EXPIRED',
  /** Report is archived */
  ARCHIVED = 'ARCHIVED',
  /** Report is being delivered */
  DELIVERING = 'DELIVERING',
  /** Report delivered */
  DELIVERED = 'DELIVERED',
}

/**
 * Report archive policy
 */
export interface ReportArchivePolicy {
  /** Archive after days */
  archiveAfterDays: number;
  /** Delete after days */
  deleteAfterDays: number;
  /** Enable automatic archiving */
  enableAutoArchive: boolean;
  /** Archive compression enabled */
  enableCompression: boolean;
  /** Archive encryption enabled */
  enableEncryption: boolean;
  /** Archive location */
  archiveLocation: string;
  /** Archive retention period in days */
  retentionPeriodDays: number;
}

export const DEFAULT_REPORT_ARCHIVE_POLICY: ReportArchivePolicy = {
  archiveAfterDays: 30,
  deleteAfterDays: 365,
  enableAutoArchive: true,
  enableCompression: true,
  enableEncryption: true,
  archiveLocation: '/archive/reports',
  retentionPeriodDays: 365,
};

/**
 * Report caching settings
 */
export interface ReportCacheSettings {
  /** Enable report caching */
  enableCaching: boolean;
  /** Cache TTL in seconds */
  cacheTTLSeconds: number;
  /** Cache size limit in MB */
  cacheSizeLimitMB: number;
  /** Enable cache compression */
  enableCompression: boolean;
  /** Cache invalidation on data update */
  invalidateOnDataUpdate: boolean;
  /** Cache warming enabled */
  enableCacheWarming: boolean;
}

export const DEFAULT_REPORT_CACHE_SETTINGS: ReportCacheSettings = {
  enableCaching: true,
  cacheTTLSeconds: 300,
  cacheSizeLimitMB: 1024,
  enableCompression: true,
  invalidateOnDataUpdate: true,
  enableCacheWarming: false,
};

/**
 * Report compression settings
 */
export interface ReportCompressionSettings {
  /** Enable compression */
  enableCompression: boolean;
  /** Compression algorithm */
  algorithm: 'GZIP' | 'ZIP' | 'BROTLI' | 'LZMA';
  /** Compression level (1-9) */
  compressionLevel: number;
  /** Minimum size for compression in KB */
  minSizeKB: number;
  /** Enable compression for delivery */
  enableDeliveryCompression: boolean;
}

export const DEFAULT_REPORT_COMPRESSION_SETTINGS: ReportCompressionSettings = {
  enableCompression: true,
  algorithm: 'GZIP',
  compressionLevel: 6,
  minSizeKB: 10,
  enableDeliveryCompression: true,
};

/**
 * Report encryption settings
 */
export interface ReportEncryptionSettings {
  /** Enable encryption */
  enableEncryption: boolean;
  /** Encryption algorithm */
  algorithm: 'AES-256-CBC' | 'AES-128-CBC' | 'CHACHA20';
  /** Key rotation days */
  keyRotationDays: number;
  /** Enable file-level encryption */
  enableFileLevelEncryption: boolean;
  /** Enable content encryption */
  enableContentEncryption: boolean;
}

export const DEFAULT_REPORT_ENCRYPTION_SETTINGS: ReportEncryptionSettings = {
  enableEncryption: true,
  algorithm: 'AES-256-CBC',
  keyRotationDays: 30,
  enableFileLevelEncryption: true,
  enableContentEncryption: true,
};

/**
 * Report notification settings
 */
export interface ReportNotificationSettings {
  /** Enable notifications */
  enableNotifications: boolean;
  /** Notification on completion */
  notifyOnCompletion: boolean;
  /** Notification on failure */
  notifyOnFailure: boolean;
  /** Notification channels */
  channels: ('EMAIL' | 'SLACK' | 'TEAMS' | 'PUSH' | 'SMS')[];
  /** Notification template */
  template: string;
  /** Enable digest notifications */
  enableDigest: boolean;
  /** Digest frequency in hours */
  digestFrequencyHours: number;
}

export const DEFAULT_REPORT_NOTIFICATION_SETTINGS: ReportNotificationSettings = {
  enableNotifications: true,
  notifyOnCompletion: true,
  notifyOnFailure: true,
  channels: ['EMAIL', 'SLACK'],
  template: 'default',
  enableDigest: false,
  digestFrequencyHours: 24,
};

/**
 * Report backup settings
 */
export interface ReportBackupSettings {
  /** Enable backup */
  enableBackup: boolean;
  /** Backup frequency in hours */
  backupFrequencyHours: number;
  /** Backup retention days */
  retentionDays: number;
  /** Backup location */
  location: string;
  /** Enable incremental backups */
  enableIncremental: boolean;
  /** Max backups to keep */
  maxBackups: number;
}

export const DEFAULT_REPORT_BACKUP_SETTINGS: ReportBackupSettings = {
  enableBackup: true,
  backupFrequencyHours: 24,
  retentionDays: 30,
  location: '/backup/reports',
  enableIncremental: true,
  maxBackups: 30,
};

/**
 * Report versioning settings
 */
export interface ReportVersioningSettings {
  /** Enable versioning */
  enableVersioning: boolean;
  /** Max versions to keep */
  maxVersions: number;
  /** Version retention days */
  retentionDays: number;
  /** Enable auto-versioning */
  enableAutoVersioning: boolean;
  /** Version naming pattern */
  namingPattern: string;
}

export const DEFAULT_REPORT_VERSIONING_SETTINGS: ReportVersioningSettings = {
  enableVersioning: true,
  maxVersions: 10,
  retentionDays: 90,
  enableAutoVersioning: true,
  namingPattern: 'v{version}_{timestamp}',
};

/**
 * Report audit settings
 */
export interface ReportAuditSettings {
  /** Enable audit logging */
  enableAuditLogging: boolean;
  /** Audit retention days */
  retentionDays: number;
  /** Log access events */
  logAccessEvents: boolean;
  /** Log generation events */
  logGenerationEvents: boolean;
  /** Log delivery events */
  logDeliveryEvents: boolean;
  /** Log modifications */
  logModifications: boolean;
}

export const DEFAULT_REPORT_AUDIT_SETTINGS: ReportAuditSettings = {
  enableAuditLogging: true,
  retentionDays: 365,
  logAccessEvents: true,
  logGenerationEvents: true,
  logDeliveryEvents: true,
  logModifications: true,
};

/**
 * Report pagination settings
 */
export interface ReportPaginationSettings {
  /** Default page size */
  defaultPageSize: number;
  /** Maximum page size */
  maxPageSize: number;
  /** Enable infinite scrolling */
  enableInfiniteScroll: boolean;
  /** Default sort field */
  defaultSortField: string;
  /** Default sort order */
  defaultSortOrder: 'ASC' | 'DESC';
  /** Enable cursor pagination */
  enableCursorPagination: boolean;
}

export const DEFAULT_REPORT_PAGINATION_SETTINGS: ReportPaginationSettings = {
  defaultPageSize: 50,
  maxPageSize: 500,
  enableInfiniteScroll: false,
  defaultSortField: 'createdAt',
  defaultSortOrder: 'DESC',
  enableCursorPagination: true,
};

/**
 * Report export concurrency settings
 */
export interface ReportExportConcurrency {
  /** Max concurrent exports */
  maxConcurrentExports: number;
  /** Max exports per user */
  maxExportsPerUser: number;
  /** Queue timeout in seconds */
  queueTimeoutSeconds: number;
  /** Enable priority queuing */
  enablePriorityQueuing: boolean;
  /** Export timeout in seconds */
  exportTimeoutSeconds: number;
}

export const DEFAULT_REPORT_EXPORT_CONCURRENCY: ReportExportConcurrency = {
  maxConcurrentExports: 10,
  maxExportsPerUser: 5,
  queueTimeoutSeconds: 60,
  enablePriorityQueuing: true,
  exportTimeoutSeconds: 300,
};

/**
 * Report generation concurrency settings
 */
export interface ReportGenerationConcurrency {
  /** Max concurrent generations */
  maxConcurrentGenerations: number;
  /** Max generations per user */
  maxGenerationsPerUser: number;
  /** Queue timeout in seconds */
  queueTimeoutSeconds: number;
  /** Generation timeout in seconds */
  generationTimeoutSeconds: number;
  /** Enable parallel generation */
  enableParallelGeneration: boolean;
}

export const DEFAULT_REPORT_GENERATION_CONCURRENCY: ReportGenerationConcurrency = {
  maxConcurrentGenerations: 5,
  maxGenerationsPerUser: 3,
  queueTimeoutSeconds: 60,
  generationTimeoutSeconds: 300,
  enableParallelGeneration: true,
};

/**
 * Report retry settings
 */
export interface ReportRetrySettings {
  /** Max retry attempts */
  maxRetries: number;
  /** Retry delay in seconds */
  retryDelaySeconds: number;
  /** Retry delay multiplier */
  retryDelayMultiplier: number;
  /** Max retry delay in seconds */
  maxRetryDelaySeconds: number;
  /** Retry on specific errors */
  retryOnErrors: string[];
}

export const DEFAULT_REPORT_RETRY_SETTINGS: ReportRetrySettings = {
  maxRetries: 3,
  retryDelaySeconds: 30,
  retryDelayMultiplier: 2,
  maxRetryDelaySeconds: 300,
  retryOnErrors: ['TIMEOUT', 'NETWORK_ERROR', 'SYSTEM_ERROR'],
};

/**
 * Report dependency resolution settings
 */
export interface ReportDependencyResolutionSettings {
  /** Enable automatic dependency resolution */
  enableAutoResolution: boolean;
  /** Max dependency depth */
  maxDependencyDepth: number;
  /** Check for circular dependencies */
  checkCircularDependencies: boolean;
  /** Dependency timeout in seconds */
  dependencyTimeoutSeconds: number;
  /** Enable parallel resolution */
  enableParallelResolution: boolean;
}

export const DEFAULT_REPORT_DEPENDENCY_RESOLUTION: ReportDependencyResolutionSettings = {
  enableAutoResolution: true,
  maxDependencyDepth: 5,
  checkCircularDependencies: true,
  dependencyTimeoutSeconds: 30,
  enableParallelResolution: true,
};

/**
 * Report configuration
 */
export const REPORT_CONFIG = {
  /** Default report format */
  DEFAULT_FORMAT: ReportFormat.PDF,
  /** Default report timeout in seconds */
  DEFAULT_TIMEOUT_SECONDS: 300,
  /** Maximum report size in MB */
  MAX_REPORT_SIZE_MB: 100,
  /** Report generation threshold in seconds */
  GENERATION_THRESHOLD_SECONDS: 60,
  /** Report cache TTL in seconds */
  CACHE_TTL_SECONDS: 300,
  /** Report archive retention days */
  ARCHIVE_RETENTION_DAYS: 365,
  /** Report compression enabled */
  COMPRESSION_ENABLED: true,
  /** Report encryption enabled */
  ENCRYPTION_ENABLED: true,
  /** Report default page size */
  DEFAULT_PAGE_SIZE: 50,
  /** Report max page size */
  MAX_PAGE_SIZE: 500,
  /** Report export concurrency limit */
  EXPORT_CONCURRENCY_LIMIT: 10,
  /** Report generation concurrency limit */
  GENERATION_CONCURRENCY_LIMIT: 5,
  /** Report retry limit */
  RETRY_LIMIT: 3,
  /** Report version */
  VERSION: '1.0.0',
} as const;

/**
 * Report functions
 */
export function getReportFormatLabel(format: ReportFormat): string {
  return format;
}

export function getReportStatusLabel(status: ReportStatus): string {
  return status;
}

export function getReportDeliveryMethodLabel(method: ReportDeliveryMethod): string {
  return method;
}

export function isReportFormatSupported(format: ReportFormat): boolean {
  return Object.values(ReportFormat).includes(format);
}

export function isValidReportStatus(status: ReportStatus): boolean {
  return Object.values(ReportStatus).includes(status);
}

// Re-export all type configurations from their respective files
export type { ReportTypeConfig } from './report-type.constants';
export type { ReportExportFormatConfig } from './report-format.constants';
export type { ReportStatusConfig } from './report-status.constants';
export type { ReportPriorityConfig } from './report-priority.constants';
export type {
  ReportScheduleConfig,
  ReportScheduleExclusion,
  ReportScheduleOverlap,
  ReportScheduleRunOut,
  ReportScheduleRetry,
  ReportScheduleDependency,
  ReportScheduleChaining,
  ReportScheduleParallelization,
  ReportScheduleLimits,
  ReportScheduleThrottling,
  ReportScheduleDeadline,
  ReportScheduleTimeWindow,
} from './report-schedule.constants';

// Re-export schedule status config
export type { ReportScheduleStatusConfig } from './report-schedule-status.constants';

// Re-export template types
export type {
  ReportTemplateConfig,
  ReportTemplateVersioning,
  ReportTemplateCache,
  ReportTemplateCategory,
  ReportTemplateTag,
  ReportTemplateMetadata,
  ReportTemplatePermission,
  ReportTemplateIndexing,
  ReportTemplateSearchOptimization,
  ReportTemplateComponentLibrary,
} from './report-template.constants';

// Re-export template type config
export type { ReportTemplateTypeConfig } from './report-template-type.constants';

// Re-export template status config
export type { ReportTemplateStatusConfig } from './report-template-status.constants';

// Re-export dashboard types
export type {
  DashboardConfig,
  DashboardWidget,
  DashboardPermissionSettings,
  DashboardExportSettings,
  DashboardImportSettings,
  DashboardBackupSettings,
  DashboardRestoreSettings,
  DashboardVersioningSettings,
  DashboardHoldingSettings,
  DashboardCacheSettings,
  DashboardTrackingSettings,
  DashboardAnalyticsSettings,
  DashboardWidgetGallery,
} from './report-dashboard.constants';

// Re-export dashboard type config
export type { DashboardTypeConfig } from './report-dashboard-type.constants';

// Re-export dashboard status config
export type { DashboardStatusConfig } from './report-dashboard-status.constants';

// Re-export widget types
export type {
  WidgetConfig,
  WidgetInteractionSettings,
  WidgetPaginationSettings,
  WidgetExportSettings,
  WidgetPrintSettings,
  WidgetSharingSettings,
  WidgetPermissionSettings,
  WidgetCacheSettings,
  WidgetSecuritySettings,
} from './report-widget.constants';

// Re-export widget type config
export type { WidgetTypeConfig } from './report-widget-type.constants';

// Re-export widget status config
export type { WidgetStatusConfig } from './report-widget-status.constants';

// Re-export filter types
export type {
  FilterConfig,
  FilterValidationRules,
  FilterDependency,
  FilterGroup,
  FilterSanitizationSettings,
  FilterPermissionSettings,
  FilterCacheSettings,
  FilterIndexingSettings,
} from './report-filter.constants';

// Re-export filter type config
export type { FilterTypeConfig } from './report-filter-type.constants';

// Re-export filter status config
export type { FilterStatusConfig } from './report-filter-status.constants';

// Re-export export types
export type {
  ExportFormatSettings,
  ExportMaxRecordsSettings,
  ExportTimeoutSettings,
  ExportStorageSettings,
  ExportCompressionSettings,
  ExportEncryptionSettings,
  ExportAuthenticationSettings,
  ExportConcurrencySettings,
  ExportRateLimitSettings,
  ExportBudgetSettings,
  ExportQuotaSettings,
  ExportRetrySettings,
  ExportDeadlineSettings,
  ExportNotificationSettings,
  ExportCacheSettings,
  ExportVersioningSettings,
  ExportMetadataSettings,
  ExportLoggingSettings,
  ExportTrackingSettings,
  ExportReportingSettings,
} from './report-export.constants';

// Re-export export type config
export type { ExportTypeConfig } from './report-export-type.constants';

// Re-export export status config
export type { ExportStatusConfig } from './report-export-status.constants';

// Re-export email types
export type {
  EmailTemplateSettings,
  EmailSubjectFormat,
  EmailAttachmentSettings,
  EmailDeliverySettings,
  EmailRateLimitSettings,
  EmailQuotaSettings,
  EmailTrackingSettings,
  EmailRetrySettings,
  EmailBatchingSettings,
  EmailThrottlingSettings,
  EmailDeadlineSettings,
  EmailPrioritySettings,
  EmailEncryptionSettings,
  EmailLoggingSettings,
  EmailReportingSettings,
  EmailNotificationSettings,
  EmailOnboardingSettings,
  EmailAuthenticationSettings,
} from './report-email.constants';

// Re-export email type config
export type { EmailTypeConfig } from './report-email-type.constants';

// Re-export email status config
export type { EmailStatusConfig } from './report-email-status.constants';

// Re-export permission types
export type { ReportPermissionConfig } from './report-permission.constants';

// Re-export error types
export type { ReportErrorConfig, ReportError } from './report-error.constants';
