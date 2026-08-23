/**
 * Notification Report Constants
 * Core notification report configuration and settings
 */

export const NOTIFICATIONREPORT = {
  // Report Types
  TYPES: {
    DELIVERY: 'delivery',
    ENGAGEMENT: 'engagement',
    CONVERSION: 'conversion',
    PERFORMANCE: 'performance',
    USER: 'user',
    CHANNEL: 'channel',
    CONTENT: 'content',
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    EXECUTIVE: 'executive',
    CUSTOM: 'custom',
  } as const,

  // Report Categories
  CATEGORIES: {
    OPERATIONAL: 'operational',
    ANALYTICAL: 'analytical',
    STRATEGIC: 'strategic',
    TACTICAL: 'tactical',
    EXECUTIVE: 'executive',
    CUSTOM: 'custom',
  } as const,

  // Report Formats
  FORMATS: {
    PDF: 'pdf',
    CSV: 'csv',
    JSON: 'json',
    XML: 'xml',
    HTML: 'html',
    EXCEL: 'excel',
    MARKDOWN: 'markdown',
    TXT: 'txt',
  } as const,

  // Report Frequencies
  FREQUENCIES: {
    ON_DEMAND: 'on_demand',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Report Statuses
  STATUSES: {
    PENDING: 'pending',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    SCHEDULED: 'scheduled',
    ARCHIVED: 'archived',
    DRAFT: 'draft',
    PUBLISHED: 'published',
    UNPUBLISHED: 'unpublished',
  } as const,

  // Report Delivery Methods
  DELIVERY_METHODS: {
    EMAIL: 'email',
    DOWNLOAD: 'download',
    API: 'api',
    WEBHOOK: 'webhook',
    DASHBOARD: 'dashboard',
    FTP: 'ftp',
    S3: 's3',
  } as const,

  // Report Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'summary',
    DEFAULT_CATEGORY: 'operational',
    DEFAULT_FORMAT: 'pdf',
    DEFAULT_FREQUENCY: 'weekly',
    DEFAULT_STATUS: 'pending',
    DEFAULT_DELIVERY_METHOD: 'email',
    DEFAULT_PAGE_SIZE: 100,
    MAX_PAGE_SIZE: 1000,
    DEFAULT_DATA_RETENTION_DAYS: 365,
    MAX_DATA_RETENTION_DAYS: 730,
    DEFAULT_TIMEZONE: 'Asia/Dhaka',
    DEFAULT_LANGUAGE: 'en',
    MAX_RECIPIENTS: 100,
    MAX_ATTACHMENT_SIZE_MB: 25,
  } as const,

  // Report Limits
  LIMITS: {
    MIN_NAME_LENGTH: 3,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    MAX_FILTERS: 20,
    MAX_METRICS: 50,
    MAX_DIMENSIONS: 10,
    MAX_SORTS: 5,
    MAX_CHARTS: 10,
    MAX_TABLES: 10,
    MAX_RECIPIENTS: 100,
    MAX_ATTACHMENTS: 10,
    MAX_ATTACHMENT_SIZE_MB: 25,
    MAX_REPORT_SIZE_MB: 50,
    MAX_GENERATION_TIME_MIN: 60,
    MAX_HISTORICAL_DAYS: 730,
  } as const,

  // Report Errors
  ERRORS: {
    GENERATION_FAILED: 'generation_failed',
    EXPORT_FAILED: 'export_failed',
    DELIVERY_FAILED: 'delivery_failed',
    INVALID_FORMAT: 'invalid_format',
    INVALID_DATE_RANGE: 'invalid_date_range',
    NO_DATA: 'no_data',
    PERMISSION_DENIED: 'permission_denied',
    RATE_LIMIT: 'rate_limit',
    TIMEOUT: 'timeout',
    VALIDATION_ERROR: 'validation_error',
  } as const,
} as const;

// Report Types
export type NotificationReportType =
  (typeof NOTIFICATIONREPORT.TYPES)[keyof typeof NOTIFICATIONREPORT.TYPES];

// Report Categories
export type NotificationReportCategory =
  (typeof NOTIFICATIONREPORT.CATEGORIES)[keyof typeof NOTIFICATIONREPORT.CATEGORIES];

// Report Formats
export type NotificationReportFormat =
  (typeof NOTIFICATIONREPORT.FORMATS)[keyof typeof NOTIFICATIONREPORT.FORMATS];

// Report Frequencies
export type NotificationReportFrequency =
  (typeof NOTIFICATIONREPORT.FREQUENCIES)[keyof typeof NOTIFICATIONREPORT.FREQUENCIES];

// Report Statuses
export type NotificationReportStatus =
  (typeof NOTIFICATIONREPORT.STATUSES)[keyof typeof NOTIFICATIONREPORT.STATUSES];

// Report Delivery Methods
export type NotificationReportDeliveryMethod =
  (typeof NOTIFICATIONREPORT.DELIVERY_METHODS)[keyof typeof NOTIFICATIONREPORT.DELIVERY_METHODS];

// Report Defaults
export type NotificationReportDefault =
  (typeof NOTIFICATIONREPORT.DEFAULTS)[keyof typeof NOTIFICATIONREPORT.DEFAULTS];

// Report Limits
export type NotificationReportLimit =
  (typeof NOTIFICATIONREPORT.LIMITS)[keyof typeof NOTIFICATIONREPORT.LIMITS];

// Report Errors
export type NotificationReportError =
  (typeof NOTIFICATIONREPORT.ERRORS)[keyof typeof NOTIFICATIONREPORT.ERRORS];

// Utility Functions
export function notificationreportGetTypeLabel(type: NotificationReportType): string {
  const labels: Record<NotificationReportType, string> = {
    [NOTIFICATIONREPORT.TYPES.DELIVERY]: 'Delivery Report',
    [NOTIFICATIONREPORT.TYPES.ENGAGEMENT]: 'Engagement Report',
    [NOTIFICATIONREPORT.TYPES.CONVERSION]: 'Conversion Report',
    [NOTIFICATIONREPORT.TYPES.PERFORMANCE]: 'Performance Report',
    [NOTIFICATIONREPORT.TYPES.USER]: 'User Report',
    [NOTIFICATIONREPORT.TYPES.CHANNEL]: 'Channel Report',
    [NOTIFICATIONREPORT.TYPES.CONTENT]: 'Content Report',
    [NOTIFICATIONREPORT.TYPES.SUMMARY]: 'Summary Report',
    [NOTIFICATIONREPORT.TYPES.DETAILED]: 'Detailed Report',
    [NOTIFICATIONREPORT.TYPES.EXECUTIVE]: 'Executive Report',
    [NOTIFICATIONREPORT.TYPES.CUSTOM]: 'Custom Report',
  };
  return labels[type] || 'Unknown Report Type';
}

export function notificationreportGetCategoryLabel(category: NotificationReportCategory): string {
  const labels: Record<NotificationReportCategory, string> = {
    [NOTIFICATIONREPORT.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONREPORT.CATEGORIES.ANALYTICAL]: 'Analytical',
    [NOTIFICATIONREPORT.CATEGORIES.STRATEGIC]: 'Strategic',
    [NOTIFICATIONREPORT.CATEGORIES.TACTICAL]: 'Tactical',
    [NOTIFICATIONREPORT.CATEGORIES.EXECUTIVE]: 'Executive',
    [NOTIFICATIONREPORT.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationreportGetFormatLabel(format: NotificationReportFormat): string {
  const labels: Record<NotificationReportFormat, string> = {
    [NOTIFICATIONREPORT.FORMATS.PDF]: 'PDF',
    [NOTIFICATIONREPORT.FORMATS.CSV]: 'CSV',
    [NOTIFICATIONREPORT.FORMATS.JSON]: 'JSON',
    [NOTIFICATIONREPORT.FORMATS.XML]: 'XML',
    [NOTIFICATIONREPORT.FORMATS.HTML]: 'HTML',
    [NOTIFICATIONREPORT.FORMATS.EXCEL]: 'Excel',
    [NOTIFICATIONREPORT.FORMATS.MARKDOWN]: 'Markdown',
    [NOTIFICATIONREPORT.FORMATS.TXT]: 'Text',
  };
  return labels[format] || 'Unknown Format';
}

export function notificationreportGetFrequencyLabel(
  frequency: NotificationReportFrequency
): string {
  const labels: Record<NotificationReportFrequency, string> = {
    [NOTIFICATIONREPORT.FREQUENCIES.ON_DEMAND]: 'On-Demand',
    [NOTIFICATIONREPORT.FREQUENCIES.DAILY]: 'Daily',
    [NOTIFICATIONREPORT.FREQUENCIES.WEEKLY]: 'Weekly',
    [NOTIFICATIONREPORT.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [NOTIFICATIONREPORT.FREQUENCIES.MONTHLY]: 'Monthly',
    [NOTIFICATIONREPORT.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [NOTIFICATIONREPORT.FREQUENCIES.YEARLY]: 'Yearly',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function notificationreportGetStatusLabel(status: NotificationReportStatus): string {
  const labels: Record<NotificationReportStatus, string> = {
    [NOTIFICATIONREPORT.STATUSES.PENDING]: 'Pending',
    [NOTIFICATIONREPORT.STATUSES.GENERATING]: 'Generating',
    [NOTIFICATIONREPORT.STATUSES.COMPLETED]: 'Completed',
    [NOTIFICATIONREPORT.STATUSES.FAILED]: 'Failed',
    [NOTIFICATIONREPORT.STATUSES.CANCELLED]: 'Cancelled',
    [NOTIFICATIONREPORT.STATUSES.SCHEDULED]: 'Scheduled',
    [NOTIFICATIONREPORT.STATUSES.ARCHIVED]: 'Archived',
    [NOTIFICATIONREPORT.STATUSES.DRAFT]: 'Draft',
    [NOTIFICATIONREPORT.STATUSES.PUBLISHED]: 'Published',
    [NOTIFICATIONREPORT.STATUSES.UNPUBLISHED]: 'Unpublished',
  };
  return labels[status] || 'Unknown Status';
}

export function notificationreportGetDeliveryMethodLabel(
  method: NotificationReportDeliveryMethod
): string {
  const labels: Record<NotificationReportDeliveryMethod, string> = {
    [NOTIFICATIONREPORT.DELIVERY_METHODS.EMAIL]: 'Email',
    [NOTIFICATIONREPORT.DELIVERY_METHODS.DOWNLOAD]: 'Download',
    [NOTIFICATIONREPORT.DELIVERY_METHODS.API]: 'API',
    [NOTIFICATIONREPORT.DELIVERY_METHODS.WEBHOOK]: 'Webhook',
    [NOTIFICATIONREPORT.DELIVERY_METHODS.DASHBOARD]: 'Dashboard',
    [NOTIFICATIONREPORT.DELIVERY_METHODS.FTP]: 'FTP',
    [NOTIFICATIONREPORT.DELIVERY_METHODS.S3]: 'S3',
  };
  return labels[method] || 'Unknown Delivery Method';
}

export function notificationreportGetErrorLabel(error: NotificationReportError): string {
  const labels: Record<NotificationReportError, string> = {
    [NOTIFICATIONREPORT.ERRORS.GENERATION_FAILED]: 'Generation Failed',
    [NOTIFICATIONREPORT.ERRORS.EXPORT_FAILED]: 'Export Failed',
    [NOTIFICATIONREPORT.ERRORS.DELIVERY_FAILED]: 'Delivery Failed',
    [NOTIFICATIONREPORT.ERRORS.INVALID_FORMAT]: 'Invalid Format',
    [NOTIFICATIONREPORT.ERRORS.INVALID_DATE_RANGE]: 'Invalid Date Range',
    [NOTIFICATIONREPORT.ERRORS.NO_DATA]: 'No Data',
    [NOTIFICATIONREPORT.ERRORS.PERMISSION_DENIED]: 'Permission Denied',
    [NOTIFICATIONREPORT.ERRORS.RATE_LIMIT]: 'Rate Limit',
    [NOTIFICATIONREPORT.ERRORS.TIMEOUT]: 'Timeout',
    [NOTIFICATIONREPORT.ERRORS.VALIDATION_ERROR]: 'Validation Error',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationreportGetDefaultFormat(): NotificationReportFormat {
  return NOTIFICATIONREPORT.DEFAULTS.DEFAULT_FORMAT;
}

export function notificationreportGetDefaultFrequency(): NotificationReportFrequency {
  return NOTIFICATIONREPORT.DEFAULTS.DEFAULT_FREQUENCY;
}

export function notificationreportGetDefaultDeliveryMethod(): NotificationReportDeliveryMethod {
  return NOTIFICATIONREPORT.DEFAULTS.DEFAULT_DELIVERY_METHOD;
}

export function notificationreportIsCompleted(status: NotificationReportStatus): boolean {
  const completedStatuses: NotificationReportStatus[] = [
    NOTIFICATIONREPORT.STATUSES.COMPLETED,
    NOTIFICATIONREPORT.STATUSES.PUBLISHED,
  ];
  return completedStatuses.includes(status);
}

export function notificationreportIsPending(status: NotificationReportStatus): boolean {
  const pendingStatuses: NotificationReportStatus[] = [
    NOTIFICATIONREPORT.STATUSES.PENDING,
    NOTIFICATIONREPORT.STATUSES.GENERATING,
    NOTIFICATIONREPORT.STATUSES.SCHEDULED,
  ];
  return pendingStatuses.includes(status);
}

export function notificationreportIsFailed(status: NotificationReportStatus): boolean {
  const failedStatuses: NotificationReportStatus[] = [
    NOTIFICATIONREPORT.STATUSES.FAILED,
    NOTIFICATIONREPORT.STATUSES.CANCELLED,
  ];
  return failedStatuses.includes(status);
}

export function notificationreportCanTransition(
  currentStatus: NotificationReportStatus,
  targetStatus: NotificationReportStatus
): boolean {
  const validTransitions: Record<NotificationReportStatus, NotificationReportStatus[]> = {
    [NOTIFICATIONREPORT.STATUSES.DRAFT]: [
      NOTIFICATIONREPORT.STATUSES.PENDING,
      NOTIFICATIONREPORT.STATUSES.ARCHIVED,
    ],
    [NOTIFICATIONREPORT.STATUSES.PENDING]: [
      NOTIFICATIONREPORT.STATUSES.GENERATING,
      NOTIFICATIONREPORT.STATUSES.CANCELLED,
    ],
    [NOTIFICATIONREPORT.STATUSES.GENERATING]: [
      NOTIFICATIONREPORT.STATUSES.COMPLETED,
      NOTIFICATIONREPORT.STATUSES.FAILED,
      NOTIFICATIONREPORT.STATUSES.CANCELLED,
    ],
    [NOTIFICATIONREPORT.STATUSES.COMPLETED]: [
      NOTIFICATIONREPORT.STATUSES.PUBLISHED,
      NOTIFICATIONREPORT.STATUSES.ARCHIVED,
    ],
    [NOTIFICATIONREPORT.STATUSES.FAILED]: [
      NOTIFICATIONREPORT.STATUSES.DRAFT,
      NOTIFICATIONREPORT.STATUSES.ARCHIVED,
    ],
    [NOTIFICATIONREPORT.STATUSES.CANCELLED]: [NOTIFICATIONREPORT.STATUSES.ARCHIVED],
    [NOTIFICATIONREPORT.STATUSES.SCHEDULED]: [
      NOTIFICATIONREPORT.STATUSES.GENERATING,
      NOTIFICATIONREPORT.STATUSES.CANCELLED,
    ],
    [NOTIFICATIONREPORT.STATUSES.PUBLISHED]: [
      NOTIFICATIONREPORT.STATUSES.UNPUBLISHED,
      NOTIFICATIONREPORT.STATUSES.ARCHIVED,
    ],
    [NOTIFICATIONREPORT.STATUSES.UNPUBLISHED]: [
      NOTIFICATIONREPORT.STATUSES.DRAFT,
      NOTIFICATIONREPORT.STATUSES.ARCHIVED,
    ],
    [NOTIFICATIONREPORT.STATUSES.ARCHIVED]: [],
  };

  return validTransitions[currentStatus]?.includes(targetStatus) || false;
}
