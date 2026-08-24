/**
 * Support Report Constants
 * Configuration for support reports
 */

export const SUPPORT_REPORT = {
  // Report Types
  TYPES: {
    TICKET_SUMMARY: 'ticket_summary',
    PERFORMANCE: 'performance',
    SATISFACTION: 'satisfaction',
    SLA: 'sla',
    AGENT: 'agent',
    VOLUME: 'volume',
    TRENDING: 'trending',
    CUSTOM: 'custom',
  } as const,

  // Report Formats
  FORMATS: {
    PDF: 'pdf',
    CSV: 'csv',
    XLSX: 'xlsx',
    JSON: 'json',
    HTML: 'html',
  } as const,

  // Report Statuses
  STATUS: {
    PENDING: 'pending',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
    CANCELLED: 'cancelled',
  } as const,

  // Report Frequencies
  FREQUENCIES: {
    ONCE: 'once',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Report Priorities
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Report Delivery Methods
  DELIVERY_METHODS: {
    EMAIL: 'email',
    DOWNLOAD: 'download',
    API: 'api',
    SLACK: 'slack',
    S3: 's3',
  } as const,

  // Report Limits
  LIMITS: {
    MAX_ROWS: 100000,
    MAX_COLUMNS: 50,
    MAX_AGE_DAYS: 365,
    MAX_GENERATION_TIME: 3600, // 1 hour
    MAX_STORAGE_MB: 100,
  } as const,
} as const;

// Report Types
export type SupportReportType = (typeof SUPPORT_REPORT.TYPES)[keyof typeof SUPPORT_REPORT.TYPES];

// Report Formats
export type SupportReportFormat =
  (typeof SUPPORT_REPORT.FORMATS)[keyof typeof SUPPORT_REPORT.FORMATS];

// Report Statuses
export type SupportReportStatus =
  (typeof SUPPORT_REPORT.STATUS)[keyof typeof SUPPORT_REPORT.STATUS];

// Report Frequencies
export type SupportReportFrequency =
  (typeof SUPPORT_REPORT.FREQUENCIES)[keyof typeof SUPPORT_REPORT.FREQUENCIES];

// Report Priorities
export type SupportReportPriority =
  (typeof SUPPORT_REPORT.PRIORITY)[keyof typeof SUPPORT_REPORT.PRIORITY];

// Delivery Methods
export type SupportReportDeliveryMethod =
  (typeof SUPPORT_REPORT.DELIVERY_METHODS)[keyof typeof SUPPORT_REPORT.DELIVERY_METHODS];

// Utility Functions
export function supportReportGetTypeLabel(type: SupportReportType): string {
  const labels: Record<SupportReportType, string> = {
    [SUPPORT_REPORT.TYPES.TICKET_SUMMARY]: 'Ticket Summary',
    [SUPPORT_REPORT.TYPES.PERFORMANCE]: 'Performance Report',
    [SUPPORT_REPORT.TYPES.SATISFACTION]: 'Satisfaction Report',
    [SUPPORT_REPORT.TYPES.SLA]: 'SLA Report',
    [SUPPORT_REPORT.TYPES.AGENT]: 'Agent Report',
    [SUPPORT_REPORT.TYPES.VOLUME]: 'Volume Report',
    [SUPPORT_REPORT.TYPES.TRENDING]: 'Trending Report',
    [SUPPORT_REPORT.TYPES.CUSTOM]: 'Custom Report',
  };
  return labels[type] || 'Unknown';
}

export function supportReportGetFormatLabel(format: SupportReportFormat): string {
  const labels: Record<SupportReportFormat, string> = {
    [SUPPORT_REPORT.FORMATS.PDF]: 'PDF',
    [SUPPORT_REPORT.FORMATS.CSV]: 'CSV',
    [SUPPORT_REPORT.FORMATS.XLSX]: 'Excel',
    [SUPPORT_REPORT.FORMATS.JSON]: 'JSON',
    [SUPPORT_REPORT.FORMATS.HTML]: 'HTML',
  };
  return labels[format] || 'Unknown';
}

export function supportReportGetStatusLabel(status: SupportReportStatus): string {
  const labels: Record<SupportReportStatus, string> = {
    [SUPPORT_REPORT.STATUS.PENDING]: 'Pending',
    [SUPPORT_REPORT.STATUS.GENERATING]: 'Generating',
    [SUPPORT_REPORT.STATUS.COMPLETED]: 'Completed',
    [SUPPORT_REPORT.STATUS.FAILED]: 'Failed',
    [SUPPORT_REPORT.STATUS.SCHEDULED]: 'Scheduled',
    [SUPPORT_REPORT.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function supportReportGetFrequencyLabel(frequency: SupportReportFrequency): string {
  const labels: Record<SupportReportFrequency, string> = {
    [SUPPORT_REPORT.FREQUENCIES.ONCE]: 'Once',
    [SUPPORT_REPORT.FREQUENCIES.DAILY]: 'Daily',
    [SUPPORT_REPORT.FREQUENCIES.WEEKLY]: 'Weekly',
    [SUPPORT_REPORT.FREQUENCIES.MONTHLY]: 'Monthly',
    [SUPPORT_REPORT.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [SUPPORT_REPORT.FREQUENCIES.YEARLY]: 'Yearly',
  };
  return labels[frequency] || 'Unknown';
}

export function supportReportGetPriorityLabel(priority: SupportReportPriority): string {
  const labels: Record<SupportReportPriority, string> = {
    [SUPPORT_REPORT.PRIORITY.CRITICAL]: 'Critical',
    [SUPPORT_REPORT.PRIORITY.HIGH]: 'High',
    [SUPPORT_REPORT.PRIORITY.MEDIUM]: 'Medium',
    [SUPPORT_REPORT.PRIORITY.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function supportReportGetDeliveryMethodLabel(method: SupportReportDeliveryMethod): string {
  const labels: Record<SupportReportDeliveryMethod, string> = {
    [SUPPORT_REPORT.DELIVERY_METHODS.EMAIL]: 'Email',
    [SUPPORT_REPORT.DELIVERY_METHODS.DOWNLOAD]: 'Download',
    [SUPPORT_REPORT.DELIVERY_METHODS.API]: 'API',
    [SUPPORT_REPORT.DELIVERY_METHODS.SLACK]: 'Slack',
    [SUPPORT_REPORT.DELIVERY_METHODS.S3]: 'S3 Storage',
  };
  return labels[method] || 'Unknown';
}

export function supportReportIsCompleted(status: SupportReportStatus): boolean {
  return status === SUPPORT_REPORT.STATUS.COMPLETED;
}

export function supportReportIsFailed(status: SupportReportStatus): boolean {
  return status === SUPPORT_REPORT.STATUS.FAILED;
}

export function supportReportIsPending(status: SupportReportStatus): boolean {
  return status === SUPPORT_REPORT.STATUS.PENDING || status === SUPPORT_REPORT.STATUS.GENERATING;
}
