/**
 * @fileoverview Report export constants and configurations
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Export storage types
 */
export enum ExportStorageType {
  /** Local storage */
  LOCAL = 'LOCAL',
  /** Amazon S3 */
  S3 = 'S3',
  /** Google Cloud Storage */
  GCS = 'GCS',
  /** Microsoft Azure Storage */
  AZURE = 'AZURE',
  /** Cloud storage */
  CLOUD = 'CLOUD',
  /** FTP storage */
  FTP = 'FTP',
  /** SFTP storage */
  SFTP = 'SFTP',
  /** Custom storage */
  CUSTOM = 'CUSTOM',
}

/**
 * Export compression types
 */
export enum ExportCompressionType {
  /** No compression */
  NONE = 'NONE',
  /** GZIP compression */
  GZIP = 'GZIP',
  /** ZIP compression */
  ZIP = 'ZIP',
  /** TAR compression */
  TAR = 'TAR',
  /** RAR compression */
  RAR = 'RAR',
  /** 7Z compression */
  SEVEN_Z = 'SEVEN_Z',
  /** Brotli compression */
  BROTLI = 'BROTLI',
  /** Zstandard compression */
  ZSTD = 'ZSTD',
}

/**
 * Export encryption types
 */
export enum ExportEncryptionType {
  /** No encryption */
  NONE = 'NONE',
  /** AES 128-bit encryption */
  AES_128 = 'AES_128',
  /** AES 256-bit encryption */
  AES_256 = 'AES_256',
  /** RSA encryption */
  RSA = 'RSA',
  /** ChaCha20 encryption */
  CHACHA20 = 'CHACHA20',
  /** Custom encryption */
  CUSTOM = 'CUSTOM',
}

/**
 * Export format settings
 */
export interface ExportFormatSettings {
  /** Enable format settings */
  enabled: boolean;
  /** Allowed formats */
  allowedFormats: (
    | 'PDF'
    | 'EXCEL'
    | 'CSV'
    | 'JSON'
    | 'XML'
    | 'HTML'
    | 'TEXT'
    | 'MARKDOWN'
    | 'POWERPOINT'
    | 'WORD'
    | 'IMAGE'
  )[];
  /** Default format */
  defaultFormat: string;
  /** Include header */
  includeHeader: boolean;
  /** Include footer */
  includeFooter: boolean;
  /** Include metadata */
  includeMetadata: boolean;
}

export const DEFAULT_EXPORT_FORMAT_SETTINGS: ExportFormatSettings = {
  enabled: true,
  allowedFormats: ['PDF', 'EXCEL', 'CSV', 'JSON'],
  defaultFormat: 'PDF',
  includeHeader: true,
  includeFooter: true,
  includeMetadata: true,
};

/**
 * Export max records settings
 */
export interface ExportMaxRecordsSettings {
  /** Max records per export */
  maxRecords: number;
  /** Enable max records limit */
  enableLimit: boolean;
  /** Warning threshold */
  warningThreshold: number;
  /** Action when exceeded */
  actionOnExceeded: 'TRUNCATE' | 'WARN' | 'ERROR' | 'REQUIRE_AUTH';
}

export const DEFAULT_EXPORT_MAX_RECORDS_SETTINGS: ExportMaxRecordsSettings = {
  maxRecords: 10000,
  enableLimit: true,
  warningThreshold: 5000,
  actionOnExceeded: 'WARN',
};

/**
 * Export timeout settings
 */
export interface ExportTimeoutSettings {
  /** Export timeout in seconds */
  timeoutSeconds: number;
  /** Enable timeout */
  enableTimeout: boolean;
  /** Action on timeout */
  actionOnTimeout: 'ERROR' | 'PARTIAL' | 'RETRY' | 'CANCEL';
  /** Retry attempts on timeout */
  retryAttempts: number;
}

export const DEFAULT_EXPORT_TIMEOUT_SETTINGS: ExportTimeoutSettings = {
  timeoutSeconds: 300,
  enableTimeout: true,
  actionOnTimeout: 'RETRY',
  retryAttempts: 3,
};

/**
 * Export storage settings
 */
export interface ExportStorageSettings {
  /** Storage type */
  storageType: ExportStorageType;
  /** Storage location */
  location: string;
  /** Enable storage */
  enableStorage: boolean;
  /** Storage bucket */
  bucket?: string;
  /** Storage path prefix */
  pathPrefix?: string;
  /** Storage region */
  region?: string;
  /** Storage credentials */
  credentials?: Record<string, unknown>;
}

export const DEFAULT_EXPORT_STORAGE_SETTINGS: ExportStorageSettings = {
  storageType: ExportStorageType.LOCAL,
  location: '/exports',
  enableStorage: true,
  pathPrefix: 'reports',
};

/**
 * Export compression settings
 */
export interface ExportCompressionSettings {
  /** Compression type */
  compressionType: ExportCompressionType;
  /** Enable compression */
  enableCompression: boolean;
  /** Compression level (1-9) */
  compressionLevel: number;
  /** Minimum size for compression in KB */
  minSizeKB: number;
  /** Enable compression for delivery */
  enableDeliveryCompression: boolean;
}

export const DEFAULT_EXPORT_COMPRESSION_SETTINGS: ExportCompressionSettings = {
  compressionType: ExportCompressionType.GZIP,
  enableCompression: true,
  compressionLevel: 6,
  minSizeKB: 10,
  enableDeliveryCompression: true,
};

/**
 * Export encryption settings
 */
export interface ExportEncryptionSettings {
  /** Encryption type */
  encryptionType: ExportEncryptionType;
  /** Enable encryption */
  enableEncryption: boolean;
  /** Encryption key */
  encryptionKey?: string;
  /** Key rotation days */
  keyRotationDays: number;
  /** Enable file-level encryption */
  enableFileLevelEncryption: boolean;
}

export const DEFAULT_EXPORT_ENCRYPTION_SETTINGS: ExportEncryptionSettings = {
  encryptionType: ExportEncryptionType.AES_256,
  enableEncryption: true,
  keyRotationDays: 30,
  enableFileLevelEncryption: true,
};

/**
 * Export authentication settings
 */
export interface ExportAuthenticationSettings {
  /** Enable authentication */
  enableAuthentication: boolean;
  /** Auth type */
  authType: 'BASIC' | 'OAUTH' | 'API_KEY' | 'JWT' | 'CERT';
  /** API key */
  apiKey?: string;
  /** JWT token */
  jwtToken?: string;
  /** Basic auth credentials */
  credentials?: { username: string; password: string };
  /** OAuth settings */
  oauthSettings?: {
    clientId: string;
    clientSecret: string;
    tokenUrl: string;
    scope: string[];
  };
}

export const DEFAULT_EXPORT_AUTHENTICATION_SETTINGS: ExportAuthenticationSettings = {
  enableAuthentication: false,
  authType: 'BASIC',
};

/**
 * Export concurrency settings
 */
export interface ExportConcurrencySettings {
  /** Max concurrent exports */
  maxConcurrentExports: number;
  /** Max exports per user */
  maxExportsPerUser: number;
  /** Queue timeout in seconds */
  queueTimeoutSeconds: number;
  /** Enable priority queuing */
  enablePriorityQueuing: boolean;
}

export const DEFAULT_EXPORT_CONCURRENCY_SETTINGS: ExportConcurrencySettings = {
  maxConcurrentExports: 10,
  maxExportsPerUser: 5,
  queueTimeoutSeconds: 60,
  enablePriorityQueuing: true,
};

/**
 * Export rate limit settings
 */
export interface ExportRateLimitSettings {
  /** Enable rate limiting */
  enableRateLimiting: boolean;
  /** Max exports per minute */
  maxExportsPerMinute: number;
  /** Max exports per hour */
  maxExportsPerHour: number;
  /** Max exports per day */
  maxExportsPerDay: number;
  /** Rate limit strategy */
  strategy: 'FIXED_WINDOW' | 'SLIDING_WINDOW' | 'TOKEN_BUCKET';
}

export const DEFAULT_EXPORT_RATE_LIMIT_SETTINGS: ExportRateLimitSettings = {
  enableRateLimiting: true,
  maxExportsPerMinute: 10,
  maxExportsPerHour: 100,
  maxExportsPerDay: 500,
  strategy: 'FIXED_WINDOW',
};

/**
 * Export budget settings
 */
export interface ExportBudgetSettings {
  /** Enable budgeting */
  enableBudgeting: boolean;
  /** Monthly budget in bytes */
  monthlyBudgetBytes: number;
  /** Weekly budget in bytes */
  weeklyBudgetBytes: number;
  /** Daily budget in bytes */
  dailyBudgetBytes: number;
  /** Budget action when exceeded */
  actionOnExceeded: 'WARN' | 'BLOCK' | 'NOTIFY' | 'REQUIRE_APPROVAL';
}

export const DEFAULT_EXPORT_BUDGET_SETTINGS: ExportBudgetSettings = {
  enableBudgeting: false,
  monthlyBudgetBytes: 10737418240, // 10 GB
  weeklyBudgetBytes: 2684354560, // 2.5 GB
  dailyBudgetBytes: 536870912, // 512 MB
  actionOnExceeded: 'WARN',
};

/**
 * Export quota settings
 */
export interface ExportQuotaSettings {
  /** Enable quota */
  enableQuota: boolean;
  /** Max exports per user */
  maxExportsPerUser: number;
  /** Max exports per team */
  maxExportsPerTeam: number;
  /** Quota period */
  quotaPeriod: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  /** Quota reset period in days */
  resetPeriodDays: number;
}

export const DEFAULT_EXPORT_QUOTA_SETTINGS: ExportQuotaSettings = {
  enableQuota: true,
  maxExportsPerUser: 50,
  maxExportsPerTeam: 200,
  quotaPeriod: 'MONTHLY',
  resetPeriodDays: 30,
};

/**
 * Export retry settings
 */
export interface ExportRetrySettings {
  /** Enable retries */
  enableRetries: boolean;
  /** Max retry attempts */
  maxRetryAttempts: number;
  /** Retry delay in seconds */
  retryDelaySeconds: number;
  /** Retry delay multiplier */
  retryDelayMultiplier: number;
  /** Max retry delay in seconds */
  maxRetryDelaySeconds: number;
  /** Retry on specific errors */
  retryOnErrors: string[];
}

export const DEFAULT_EXPORT_RETRY_SETTINGS: ExportRetrySettings = {
  enableRetries: true,
  maxRetryAttempts: 3,
  retryDelaySeconds: 30,
  retryDelayMultiplier: 2,
  maxRetryDelaySeconds: 300,
  retryOnErrors: ['TIMEOUT', 'NETWORK_ERROR', 'SYSTEM_ERROR', 'RATE_LIMIT_EXCEEDED'],
};

/**
 * Export deadline settings
 */
export interface ExportDeadlineSettings {
  /** Enable deadlines */
  enableDeadlines: boolean;
  /** Deadline time in seconds */
  deadlineSeconds: number;
  /** Grace period in seconds */
  gracePeriodSeconds: number;
  /** Action on deadline miss */
  actionOnMiss: 'NOTIFY' | 'ESCALATE' | 'CANCEL' | 'PARTIAL';
}

export const DEFAULT_EXPORT_DEADLINE_SETTINGS: ExportDeadlineSettings = {
  enableDeadlines: true,
  deadlineSeconds: 600,
  gracePeriodSeconds: 60,
  actionOnMiss: 'NOTIFY',
};

/**
 * Export notification settings
 */
export interface ExportNotificationSettings {
  /** Enable notifications */
  enableNotifications: boolean;
  /** Notification on success */
  notifyOnSuccess: boolean;
  /** Notification on failure */
  notifyOnFailure: boolean;
  /** Notification channels */
  channels: ('EMAIL' | 'SLACK' | 'TEAMS' | 'PUSH' | 'SMS' | 'WEBHOOK')[];
  /** Notification template */
  template: string;
}

export const DEFAULT_EXPORT_NOTIFICATION_SETTINGS: ExportNotificationSettings = {
  enableNotifications: true,
  notifyOnSuccess: true,
  notifyOnFailure: true,
  channels: ['EMAIL', 'SLACK'],
  template: 'default',
};

/**
 * Export caching settings
 */
export interface ExportCacheSettings {
  /** Enable caching */
  enableCaching: boolean;
  /** Cache TTL in seconds */
  cacheTTLSeconds: number;
  /** Cache size limit in MB */
  cacheSizeLimitMB: number;
  /** Enable cache compression */
  enableCompression: boolean;
  /** Invalidate on update */
  invalidateOnUpdate: boolean;
}

export const DEFAULT_EXPORT_CACHE_SETTINGS: ExportCacheSettings = {
  enableCaching: true,
  cacheTTLSeconds: 3600,
  cacheSizeLimitMB: 1024,
  enableCompression: true,
  invalidateOnUpdate: true,
};

/**
 * Export versioning settings
 */
export interface ExportVersioningSettings {
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

export const DEFAULT_EXPORT_VERSIONING_SETTINGS: ExportVersioningSettings = {
  enableVersioning: true,
  maxVersions: 10,
  retentionDays: 90,
  enableAutoVersioning: true,
  namingPattern: 'v{version}_{timestamp}',
};

/**
 * Export metadata settings
 */
export interface ExportMetadataSettings {
  /** Enable metadata */
  enableMetadata: boolean;
  /** Include timestamp */
  includeTimestamp: boolean;
  /** Include user info */
  includeUserInfo: boolean;
  /** Include report info */
  includeReportInfo: boolean;
  /** Include export info */
  includeExportInfo: boolean;
  /** Custom metadata fields */
  customFields: Record<string, string>;
}

export const DEFAULT_EXPORT_METADATA_SETTINGS: ExportMetadataSettings = {
  enableMetadata: true,
  includeTimestamp: true,
  includeUserInfo: true,
  includeReportInfo: true,
  includeExportInfo: true,
  customFields: {},
};

/**
 * Export logging settings
 */
export interface ExportLoggingSettings {
  /** Enable logging */
  enableLogging: boolean;
  /** Log level */
  logLevel: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
  /** Log retention days */
  retentionDays: number;
  /** Log export events */
  logExportEvents: boolean;
  /** Log access events */
  logAccessEvents: boolean;
  /** Log errors */
  logErrors: boolean;
}

export const DEFAULT_EXPORT_LOGGING_SETTINGS: ExportLoggingSettings = {
  enableLogging: true,
  logLevel: 'INFO',
  retentionDays: 30,
  logExportEvents: true,
  logAccessEvents: true,
  logErrors: true,
};

/**
 * Export tracking settings
 */
export interface ExportTrackingSettings {
  /** Enable tracking */
  enableTracking: boolean;
  /** Track views */
  trackViews: boolean;
  /** Track downloads */
  trackDownloads: boolean;
  /** Track usage */
  trackUsage: boolean;
  /** Track errors */
  trackErrors: boolean;
  /** Tracking retention days */
  retentionDays: number;
}

export const DEFAULT_EXPORT_TRACKING_SETTINGS: ExportTrackingSettings = {
  enableTracking: true,
  trackViews: true,
  trackDownloads: true,
  trackUsage: true,
  trackErrors: true,
  retentionDays: 30,
};

/**
 * Export reporting settings
 */
export interface ExportReportingSettings {
  /** Enable reporting */
  enableReporting: boolean;
  /** Report frequency */
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY';
  /** Report metrics */
  metrics: (
    'COUNT' | 'SIZE' | 'DURATION' | 'SUCCESS_RATE' | 'ERROR_RATE' | 'USER_COUNT' | 'USAGE'
  )[];
  /** Report recipients */
  recipients: string[];
  /** Report format */
  format: 'PDF' | 'EXCEL' | 'CSV' | 'JSON';
}

export const DEFAULT_EXPORT_REPORTING_SETTINGS: ExportReportingSettings = {
  enableReporting: true,
  frequency: 'WEEKLY',
  metrics: ['COUNT', 'SIZE', 'SUCCESS_RATE', 'ERROR_RATE'],
  recipients: [],
  format: 'PDF',
};

/**
 * Export constants
 */
export const EXPORT_CONSTANTS = {
  /** Default max records */
  DEFAULT_MAX_RECORDS: 10000,
  /** Default timeout in seconds */
  DEFAULT_TIMEOUT_SECONDS: 300,
  /** Default compression type */
  DEFAULT_COMPRESSION: ExportCompressionType.GZIP,
  /** Default encryption type */
  DEFAULT_ENCRYPTION: ExportEncryptionType.AES_256,
  /** Default storage type */
  DEFAULT_STORAGE: ExportStorageType.LOCAL,
  /** Max retry attempts */
  MAX_RETRY_ATTEMPTS: 5,
  /** Min retry delay in seconds */
  MIN_RETRY_DELAY_SECONDS: 5,
  /** Max retry delay in seconds */
  MAX_RETRY_DELAY_SECONDS: 600,
  /** Default cache TTL in seconds */
  DEFAULT_CACHE_TTL: 3600,
  /** Default max versions */
  DEFAULT_MAX_VERSIONS: 10,
} as const;

/**
 * Get storage type label
 */
export function getStorageTypeLabel(storageType: ExportStorageType): string {
  const labels: Record<ExportStorageType, string> = {
    [ExportStorageType.LOCAL]: 'Local Storage',
    [ExportStorageType.S3]: 'Amazon S3',
    [ExportStorageType.GCS]: 'Google Cloud Storage',
    [ExportStorageType.AZURE]: 'Microsoft Azure',
    [ExportStorageType.CLOUD]: 'Cloud Storage',
    [ExportStorageType.FTP]: 'FTP',
    [ExportStorageType.SFTP]: 'SFTP',
    [ExportStorageType.CUSTOM]: 'Custom',
  };
  return labels[storageType] || storageType;
}

/**
 * Get compression type label
 */
export function getCompressionTypeLabel(compressionType: ExportCompressionType): string {
  const labels: Record<ExportCompressionType, string> = {
    [ExportCompressionType.NONE]: 'None',
    [ExportCompressionType.GZIP]: 'GZIP',
    [ExportCompressionType.ZIP]: 'ZIP',
    [ExportCompressionType.TAR]: 'TAR',
    [ExportCompressionType.RAR]: 'RAR',
    [ExportCompressionType.SEVEN_Z]: '7-Zip',
    [ExportCompressionType.BROTLI]: 'Brotli',
    [ExportCompressionType.ZSTD]: 'Zstandard',
  };
  return labels[compressionType] || compressionType;
}

/**
 * Get encryption type label
 */
export function getEncryptionTypeLabel(encryptionType: ExportEncryptionType): string {
  const labels: Record<ExportEncryptionType, string> = {
    [ExportEncryptionType.NONE]: 'None',
    [ExportEncryptionType.AES_128]: 'AES-128',
    [ExportEncryptionType.AES_256]: 'AES-256',
    [ExportEncryptionType.RSA]: 'RSA',
    [ExportEncryptionType.CHACHA20]: 'ChaCha20',
    [ExportEncryptionType.CUSTOM]: 'Custom',
  };
  return labels[encryptionType] || encryptionType;
}

/**
 * Check if compression is enabled
 */
export function isCompressionEnabled(settings: ExportCompressionSettings): boolean {
  return settings.enableCompression && settings.compressionType !== ExportCompressionType.NONE;
}

/**
 * Check if encryption is enabled
 */
export function isEncryptionEnabled(settings: ExportEncryptionSettings): boolean {
  return settings.enableEncryption && settings.encryptionType !== ExportEncryptionType.NONE;
}

/**
 * Get effective max records
 */
export function getEffectiveMaxRecords(settings: ExportMaxRecordsSettings): number {
  return settings.enableLimit ? settings.maxRecords : Number.MAX_SAFE_INTEGER;
}

/**
 * Calculate export size estimate
 */
export function calculateExportSizeEstimate(
  recordCount: number,
  avgRecordSize: number,
  compressionRatio: number = 0.5
): number {
  const rawSize = recordCount * avgRecordSize;
  return rawSize * compressionRatio;
}
