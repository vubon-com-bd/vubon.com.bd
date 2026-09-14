export const REPORT_EXPORT_TYPE = {
  FULL: 'full',
  FILTERED: 'filtered',
  SUMMARY: 'summary',
  DETAILED: 'detailed',
  AGGREGATED: 'aggregated',
} as const;

export const REPORT_EXPORT_STATUS = {
  PENDING: 'pending',
  QUEUED: 'queued',
  PROCESSING: 'processing',
  READY: 'ready',
  COMPLETED: 'completed',
  FAILED: 'failed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;

export const REPORT_EXPORT_DESTINATION = {
  DOWNLOAD: 'download',
  EMAIL: 'email',
  S3: 's3',
  FTP: 'ftp',
  SFTP: 'sftp',
  WEBHOOK: 'webhook',
  GOOGLE_DRIVE: 'google_drive',
  DROPBOX: 'dropbox',
} as const;

export const REPORT_EXPORT = {
  MAX_ROWS: 1000000,
  MAX_FILE_SIZE_MB: 500,
  EXPIRY_HOURS: 24,
  MAX_CONCURRENT_EXPORTS: 10,
  MAX_EXPORTS_PER_USER_PER_HOUR: 20,
  COMPRESSION_ENABLED: true,
  ENCRYPTION_ENABLED: false,
  PASSWORD_PROTECTION: false,
  RETRY_ATTEMPTS: 3,
  RETENTION_DAYS: 7,
  BATCH_SIZE: 10000,
  STREAMING_ENABLED: true,
} as const;

export type ReportExportTypeType = (typeof REPORT_EXPORT_TYPE)[keyof typeof REPORT_EXPORT_TYPE];
export type ReportExportStatusType =
  (typeof REPORT_EXPORT_STATUS)[keyof typeof REPORT_EXPORT_STATUS];
export type ReportExportDestinationType =
  (typeof REPORT_EXPORT_DESTINATION)[keyof typeof REPORT_EXPORT_DESTINATION];
