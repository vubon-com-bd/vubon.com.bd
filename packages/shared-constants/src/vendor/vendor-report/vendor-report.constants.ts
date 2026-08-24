/**
 * Vendor Report Constants
 * Configuration for vendor reports
 */

export const VENDOR_REPORT = {
  // Report Types
  TYPES: {
    SALES: 'sales',
    ORDER: 'order',
    PRODUCT: 'product',
    PAYMENT: 'payment',
    SETTLEMENT: 'settlement',
    PERFORMANCE: 'performance',
    ANALYTICS: 'analytics',
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
  PRIORITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Report Delivery Methods
  DELIVERY: {
    DOWNLOAD: 'download',
    EMAIL: 'email',
    API: 'api',
    DASHBOARD: 'dashboard',
  } as const,

  // Report Limits
  LIMITS: {
    MAX_ROWS: 100000,
    MAX_COLUMNS: 50,
    MAX_RETENTION_DAYS: 365,
    MAX_GENERATION_TIME: 3600, // 1 hour
    MAX_STORAGE_MB: 100,
  } as const,
} as const;

// Report Types
export type VendorReportType = (typeof VENDOR_REPORT.TYPES)[keyof typeof VENDOR_REPORT.TYPES];

// Report Formats
export type VendorReportFormat = (typeof VENDOR_REPORT.FORMATS)[keyof typeof VENDOR_REPORT.FORMATS];

// Report Statuses
export type VendorReportStatus = (typeof VENDOR_REPORT.STATUS)[keyof typeof VENDOR_REPORT.STATUS];

// Report Frequencies
export type VendorReportFrequency =
  (typeof VENDOR_REPORT.FREQUENCIES)[keyof typeof VENDOR_REPORT.FREQUENCIES];

// Report Priorities
export type VendorReportPriority =
  (typeof VENDOR_REPORT.PRIORITIES)[keyof typeof VENDOR_REPORT.PRIORITIES];

// Report Delivery Methods
export type VendorReportDelivery =
  (typeof VENDOR_REPORT.DELIVERY)[keyof typeof VENDOR_REPORT.DELIVERY];

// Utility Functions
export function vendorReportGetTypeLabel(type: VendorReportType): string {
  const labels: Record<VendorReportType, string> = {
    [VENDOR_REPORT.TYPES.SALES]: 'Sales Report',
    [VENDOR_REPORT.TYPES.ORDER]: 'Order Report',
    [VENDOR_REPORT.TYPES.PRODUCT]: 'Product Report',
    [VENDOR_REPORT.TYPES.PAYMENT]: 'Payment Report',
    [VENDOR_REPORT.TYPES.SETTLEMENT]: 'Settlement Report',
    [VENDOR_REPORT.TYPES.PERFORMANCE]: 'Performance Report',
    [VENDOR_REPORT.TYPES.ANALYTICS]: 'Analytics Report',
    [VENDOR_REPORT.TYPES.CUSTOM]: 'Custom Report',
  };
  return labels[type] || 'Unknown';
}

export function vendorReportGetFormatLabel(format: VendorReportFormat): string {
  const labels: Record<VendorReportFormat, string> = {
    [VENDOR_REPORT.FORMATS.PDF]: 'PDF',
    [VENDOR_REPORT.FORMATS.CSV]: 'CSV',
    [VENDOR_REPORT.FORMATS.XLSX]: 'Excel',
    [VENDOR_REPORT.FORMATS.JSON]: 'JSON',
    [VENDOR_REPORT.FORMATS.HTML]: 'HTML',
  };
  return labels[format] || 'Unknown';
}

export function vendorReportGetStatusLabel(status: VendorReportStatus): string {
  const labels: Record<VendorReportStatus, string> = {
    [VENDOR_REPORT.STATUS.PENDING]: 'Pending',
    [VENDOR_REPORT.STATUS.GENERATING]: 'Generating',
    [VENDOR_REPORT.STATUS.COMPLETED]: 'Completed',
    [VENDOR_REPORT.STATUS.FAILED]: 'Failed',
    [VENDOR_REPORT.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown';
}

export function vendorReportGetFrequencyLabel(frequency: VendorReportFrequency): string {
  const labels: Record<VendorReportFrequency, string> = {
    [VENDOR_REPORT.FREQUENCIES.ONCE]: 'Once',
    [VENDOR_REPORT.FREQUENCIES.DAILY]: 'Daily',
    [VENDOR_REPORT.FREQUENCIES.WEEKLY]: 'Weekly',
    [VENDOR_REPORT.FREQUENCIES.MONTHLY]: 'Monthly',
    [VENDOR_REPORT.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [VENDOR_REPORT.FREQUENCIES.YEARLY]: 'Yearly',
  };
  return labels[frequency] || 'Unknown';
}

export function vendorReportGetPriorityLabel(priority: VendorReportPriority): string {
  const labels: Record<VendorReportPriority, string> = {
    [VENDOR_REPORT.PRIORITIES.CRITICAL]: 'Critical',
    [VENDOR_REPORT.PRIORITIES.HIGH]: 'High',
    [VENDOR_REPORT.PRIORITIES.MEDIUM]: 'Medium',
    [VENDOR_REPORT.PRIORITIES.LOW]: 'Low',
  };
  return labels[priority] || 'Unknown';
}

export function vendorReportGetDeliveryLabel(delivery: VendorReportDelivery): string {
  const labels: Record<VendorReportDelivery, string> = {
    [VENDOR_REPORT.DELIVERY.DOWNLOAD]: 'Download',
    [VENDOR_REPORT.DELIVERY.EMAIL]: 'Email',
    [VENDOR_REPORT.DELIVERY.API]: 'API',
    [VENDOR_REPORT.DELIVERY.DASHBOARD]: 'Dashboard',
  };
  return labels[delivery] || 'Unknown';
}

export function vendorReportIsCompleted(status: VendorReportStatus): boolean {
  return status === VENDOR_REPORT.STATUS.COMPLETED;
}

export function vendorReportIsPending(status: VendorReportStatus): boolean {
  return status === VENDOR_REPORT.STATUS.PENDING || status === VENDOR_REPORT.STATUS.GENERATING;
}

export function vendorReportIsFailed(status: VendorReportStatus): boolean {
  return status === VENDOR_REPORT.STATUS.FAILED;
}
