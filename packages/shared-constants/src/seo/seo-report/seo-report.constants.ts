/**
 * SEO Report Constants
 * Configuration for SEO reports, generation, and management
 */

export const SEO_REPORT = {
  // Report Types
  TYPES: {
    PERFORMANCE: 'performance',
    KEYWORD: 'keyword',
    BACKLINK: 'backlink',
    CONTENT: 'content',
    TECHNICAL: 'technical',
    COMPETITOR: 'competitor',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
    EXECUTIVE: 'executive',
    DETAILED: 'detailed',
    SUMMARY: 'summary',
    COMPARATIVE: 'comparative',
    TREND: 'trend',
    AUDIT: 'audit',
    CRAWL: 'crawl',
    INDEX: 'index',
  } as const,

  // Report Status
  STATUS: {
    PENDING: 'pending',
    GENERATING: 'generating',
    GENERATED: 'generated',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
    DELIVERED: 'delivered',
    VIEWED: 'viewed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    CANCELLED: 'cancelled',
  } as const,

  // Report Formats
  FORMATS: {
    PDF: 'pdf',
    HTML: 'html',
    CSV: 'csv',
    JSON: 'json',
    XML: 'xml',
    XLSX: 'xlsx',
    DOCX: 'docx',
    PPTX: 'pptx',
    MARKDOWN: 'markdown',
    TEXT: 'text',
    EMAIL: 'email',
    DASHBOARD: 'dashboard',
  } as const,

  // Report Frequency
  FREQUENCY: {
    ON_DEMAND: 'on_demand',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    HALF_YEARLY: 'half_yearly',
    ANNUAL: 'annual',
    REAL_TIME: 'real_time',
  } as const,

  // Report Priority
  PRIORITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
    OPTIONAL: 'optional',
  } as const,

  // Report Delivery
  DELIVERY: {
    EMAIL: 'email',
    DOWNLOAD: 'download',
    DASHBOARD: 'dashboard',
    API: 'api',
    WEBHOOK: 'webhook',
    SLACK: 'slack',
    TEAMS: 'teams',
    FTP: 'ftp',
    S3: 's3',
    GOOGLE_DRIVE: 'google_drive',
    DROPBOX: 'dropbox',
  } as const,

  // Report Sections
  SECTIONS: {
    EXECUTIVE_SUMMARY: 'executive_summary',
    KEY_METRICS: 'key_metrics',
    TRAFFIC_OVERVIEW: 'traffic_overview',
    KEYWORD_RANKINGS: 'keyword_rankings',
    BACKLINK_PROFILE: 'backlink_profile',
    CONTENT_PERFORMANCE: 'content_performance',
    TECHNICAL_HEALTH: 'technical_health',
    COMPETITOR_ANALYSIS: 'competitor_analysis',
    RECOMMENDATIONS: 'recommendations',
    APPENDICES: 'appendices',
  } as const,

  // Report Errors
  ERROR_TYPES: {
    GENERATION_ERROR: 'generation_error',
    DATA_ERROR: 'data_error',
    FORMAT_ERROR: 'format_error',
    DELIVERY_ERROR: 'delivery_error',
    SCHEDULE_ERROR: 'schedule_error',
    PERMISSION_ERROR: 'permission_error',
    TIMEOUT: 'timeout',
    SIZE_LIMIT: 'size_limit',
    TEMPLATE_ERROR: 'template_error',
    SOURCE_ERROR: 'source_error',
  } as const,

  // Report Metrics
  METRICS: {
    TOTAL_REPORTS: 'total_reports',
    GENERATED_REPORTS: 'generated_reports',
    DELIVERED_REPORTS: 'delivered_reports',
    VIEWED_REPORTS: 'viewed_reports',
    AVERAGE_GENERATION_TIME: 'average_generation_time',
    SUCCESS_RATE: 'success_rate',
    FAILURE_RATE: 'failure_rate',
    STORAGE_USED: 'storage_used',
  } as const,
} as const;

// Report Types
export type SEOReportType = (typeof SEO_REPORT.TYPES)[keyof typeof SEO_REPORT.TYPES];

// Report Status
export type SEOReportStatus = (typeof SEO_REPORT.STATUS)[keyof typeof SEO_REPORT.STATUS];

// Report Formats
export type SEOReportFormat = (typeof SEO_REPORT.FORMATS)[keyof typeof SEO_REPORT.FORMATS];

// Report Frequency
export type SEOReportFrequency = (typeof SEO_REPORT.FREQUENCY)[keyof typeof SEO_REPORT.FREQUENCY];

// Report Priority
export type SEOReportPriority = (typeof SEO_REPORT.PRIORITY)[keyof typeof SEO_REPORT.PRIORITY];

// Report Delivery
export type SEOReportDelivery = (typeof SEO_REPORT.DELIVERY)[keyof typeof SEO_REPORT.DELIVERY];

// Report Sections
export type SEOReportSection = (typeof SEO_REPORT.SECTIONS)[keyof typeof SEO_REPORT.SECTIONS];

// Report Errors
export type SEOReportErrorType =
  (typeof SEO_REPORT.ERROR_TYPES)[keyof typeof SEO_REPORT.ERROR_TYPES];

// Report Metrics
export type SEOReportMetric = (typeof SEO_REPORT.METRICS)[keyof typeof SEO_REPORT.METRICS];

// Utility Functions
export function getSEOReportTypeLabel(type: SEOReportType): string {
  const labels: Record<SEOReportType, string> = {
    [SEO_REPORT.TYPES.PERFORMANCE]: 'Performance Report',
    [SEO_REPORT.TYPES.KEYWORD]: 'Keyword Report',
    [SEO_REPORT.TYPES.BACKLINK]: 'Backlink Report',
    [SEO_REPORT.TYPES.CONTENT]: 'Content Report',
    [SEO_REPORT.TYPES.TECHNICAL]: 'Technical Report',
    [SEO_REPORT.TYPES.COMPETITOR]: 'Competitor Report',
    [SEO_REPORT.TYPES.DAILY]: 'Daily Report',
    [SEO_REPORT.TYPES.WEEKLY]: 'Weekly Report',
    [SEO_REPORT.TYPES.MONTHLY]: 'Monthly Report',
    [SEO_REPORT.TYPES.QUARTERLY]: 'Quarterly Report',
    [SEO_REPORT.TYPES.ANNUAL]: 'Annual Report',
    [SEO_REPORT.TYPES.CUSTOM]: 'Custom Report',
    [SEO_REPORT.TYPES.EXECUTIVE]: 'Executive Report',
    [SEO_REPORT.TYPES.DETAILED]: 'Detailed Report',
    [SEO_REPORT.TYPES.SUMMARY]: 'Summary Report',
    [SEO_REPORT.TYPES.COMPARATIVE]: 'Comparative Report',
    [SEO_REPORT.TYPES.TREND]: 'Trend Report',
    [SEO_REPORT.TYPES.AUDIT]: 'Audit Report',
    [SEO_REPORT.TYPES.CRAWL]: 'Crawl Report',
    [SEO_REPORT.TYPES.INDEX]: 'Index Report',
  };
  return labels[type] || 'Unknown Report Type';
}

export function getSEOReportStatusLabel(status: SEOReportStatus): string {
  const labels: Record<SEOReportStatus, string> = {
    [SEO_REPORT.STATUS.PENDING]: 'Pending',
    [SEO_REPORT.STATUS.GENERATING]: 'Generating',
    [SEO_REPORT.STATUS.GENERATED]: 'Generated',
    [SEO_REPORT.STATUS.PROCESSING]: 'Processing',
    [SEO_REPORT.STATUS.COMPLETED]: 'Completed',
    [SEO_REPORT.STATUS.FAILED]: 'Failed',
    [SEO_REPORT.STATUS.SCHEDULED]: 'Scheduled',
    [SEO_REPORT.STATUS.DELIVERED]: 'Delivered',
    [SEO_REPORT.STATUS.VIEWED]: 'Viewed',
    [SEO_REPORT.STATUS.EXPIRED]: 'Expired',
    [SEO_REPORT.STATUS.ARCHIVED]: 'Archived',
    [SEO_REPORT.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown Status';
}

export function getSEOReportFormatLabel(format: SEOReportFormat): string {
  const labels: Record<SEOReportFormat, string> = {
    [SEO_REPORT.FORMATS.PDF]: 'PDF',
    [SEO_REPORT.FORMATS.HTML]: 'HTML',
    [SEO_REPORT.FORMATS.CSV]: 'CSV',
    [SEO_REPORT.FORMATS.JSON]: 'JSON',
    [SEO_REPORT.FORMATS.XML]: 'XML',
    [SEO_REPORT.FORMATS.XLSX]: 'Excel (XLSX)',
    [SEO_REPORT.FORMATS.DOCX]: 'Word (DOCX)',
    [SEO_REPORT.FORMATS.PPTX]: 'PowerPoint (PPTX)',
    [SEO_REPORT.FORMATS.MARKDOWN]: 'Markdown',
    [SEO_REPORT.FORMATS.TEXT]: 'Plain Text',
    [SEO_REPORT.FORMATS.EMAIL]: 'Email',
    [SEO_REPORT.FORMATS.DASHBOARD]: 'Dashboard',
  };
  return labels[format] || 'Unknown Format';
}

export function getSEOReportFrequencyLabel(frequency: SEOReportFrequency): string {
  const labels: Record<SEOReportFrequency, string> = {
    [SEO_REPORT.FREQUENCY.ON_DEMAND]: 'On Demand',
    [SEO_REPORT.FREQUENCY.DAILY]: 'Daily',
    [SEO_REPORT.FREQUENCY.WEEKLY]: 'Weekly',
    [SEO_REPORT.FREQUENCY.BI_WEEKLY]: 'Bi-Weekly',
    [SEO_REPORT.FREQUENCY.MONTHLY]: 'Monthly',
    [SEO_REPORT.FREQUENCY.QUARTERLY]: 'Quarterly',
    [SEO_REPORT.FREQUENCY.HALF_YEARLY]: 'Half-Yearly',
    [SEO_REPORT.FREQUENCY.ANNUAL]: 'Annual',
    [SEO_REPORT.FREQUENCY.REAL_TIME]: 'Real-Time',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function getSEOReportPriorityLabel(priority: SEOReportPriority): string {
  const labels: Record<SEOReportPriority, string> = {
    [SEO_REPORT.PRIORITY.CRITICAL]: 'Critical',
    [SEO_REPORT.PRIORITY.HIGH]: 'High',
    [SEO_REPORT.PRIORITY.MEDIUM]: 'Medium',
    [SEO_REPORT.PRIORITY.LOW]: 'Low',
    [SEO_REPORT.PRIORITY.OPTIONAL]: 'Optional',
  };
  return labels[priority] || 'Unknown Priority';
}

export function getSEOReportDeliveryLabel(delivery: SEOReportDelivery): string {
  const labels: Record<SEOReportDelivery, string> = {
    [SEO_REPORT.DELIVERY.EMAIL]: 'Email',
    [SEO_REPORT.DELIVERY.DOWNLOAD]: 'Download',
    [SEO_REPORT.DELIVERY.DASHBOARD]: 'Dashboard',
    [SEO_REPORT.DELIVERY.API]: 'API',
    [SEO_REPORT.DELIVERY.WEBHOOK]: 'Webhook',
    [SEO_REPORT.DELIVERY.SLACK]: 'Slack',
    [SEO_REPORT.DELIVERY.TEAMS]: 'Microsoft Teams',
    [SEO_REPORT.DELIVERY.FTP]: 'FTP',
    [SEO_REPORT.DELIVERY.S3]: 'Amazon S3',
    [SEO_REPORT.DELIVERY.GOOGLE_DRIVE]: 'Google Drive',
    [SEO_REPORT.DELIVERY.DROPBOX]: 'Dropbox',
  };
  return labels[delivery] || 'Unknown Delivery Method';
}

export function getSEOReportSectionLabel(section: SEOReportSection): string {
  const labels: Record<SEOReportSection, string> = {
    [SEO_REPORT.SECTIONS.EXECUTIVE_SUMMARY]: 'Executive Summary',
    [SEO_REPORT.SECTIONS.KEY_METRICS]: 'Key Metrics',
    [SEO_REPORT.SECTIONS.TRAFFIC_OVERVIEW]: 'Traffic Overview',
    [SEO_REPORT.SECTIONS.KEYWORD_RANKINGS]: 'Keyword Rankings',
    [SEO_REPORT.SECTIONS.BACKLINK_PROFILE]: 'Backlink Profile',
    [SEO_REPORT.SECTIONS.CONTENT_PERFORMANCE]: 'Content Performance',
    [SEO_REPORT.SECTIONS.TECHNICAL_HEALTH]: 'Technical Health',
    [SEO_REPORT.SECTIONS.COMPETITOR_ANALYSIS]: 'Competitor Analysis',
    [SEO_REPORT.SECTIONS.RECOMMENDATIONS]: 'Recommendations',
    [SEO_REPORT.SECTIONS.APPENDICES]: 'Appendices',
  };
  return labels[section] || 'Unknown Section';
}

export function getSEOReportErrorLabel(errorType: SEOReportErrorType): string {
  const labels: Record<SEOReportErrorType, string> = {
    [SEO_REPORT.ERROR_TYPES.GENERATION_ERROR]: 'Generation Error',
    [SEO_REPORT.ERROR_TYPES.DATA_ERROR]: 'Data Error',
    [SEO_REPORT.ERROR_TYPES.FORMAT_ERROR]: 'Format Error',
    [SEO_REPORT.ERROR_TYPES.DELIVERY_ERROR]: 'Delivery Error',
    [SEO_REPORT.ERROR_TYPES.SCHEDULE_ERROR]: 'Schedule Error',
    [SEO_REPORT.ERROR_TYPES.PERMISSION_ERROR]: 'Permission Error',
    [SEO_REPORT.ERROR_TYPES.TIMEOUT]: 'Timeout',
    [SEO_REPORT.ERROR_TYPES.SIZE_LIMIT]: 'Size Limit Exceeded',
    [SEO_REPORT.ERROR_TYPES.TEMPLATE_ERROR]: 'Template Error',
    [SEO_REPORT.ERROR_TYPES.SOURCE_ERROR]: 'Data Source Error',
  };
  return labels[errorType] || 'Unknown Error';
}

export function seoReportGetStatusColor(status: SEOReportStatus): string {
  const colors: Record<SEOReportStatus, string> = {
    [SEO_REPORT.STATUS.PENDING]: '#9E9E9E',
    [SEO_REPORT.STATUS.GENERATING]: '#FFC107',
    [SEO_REPORT.STATUS.GENERATED]: '#2196F3',
    [SEO_REPORT.STATUS.PROCESSING]: '#00BCD4',
    [SEO_REPORT.STATUS.COMPLETED]: '#4CAF50',
    [SEO_REPORT.STATUS.FAILED]: '#F44336',
    [SEO_REPORT.STATUS.SCHEDULED]: '#FF9800',
    [SEO_REPORT.STATUS.DELIVERED]: '#8BC34A',
    [SEO_REPORT.STATUS.VIEWED]: '#3F51B5',
    [SEO_REPORT.STATUS.EXPIRED]: '#FF9800',
    [SEO_REPORT.STATUS.ARCHIVED]: '#9E9E9E',
    [SEO_REPORT.STATUS.CANCELLED]: '#D32F2F',
  };
  return colors[status] || '#9E9E9E';
}

export function isSEOReportComplete(status: SEOReportStatus): boolean {
  const completeStatuses: SEOReportStatus[] = [
    SEO_REPORT.STATUS.COMPLETED,
    SEO_REPORT.STATUS.DELIVERED,
    SEO_REPORT.STATUS.VIEWED,
    SEO_REPORT.STATUS.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}

export function isSEOReportProcessing(status: SEOReportStatus): boolean {
  const processingStatuses: SEOReportStatus[] = [
    SEO_REPORT.STATUS.GENERATING,
    SEO_REPORT.STATUS.PROCESSING,
  ];
  return processingStatuses.includes(status);
}
