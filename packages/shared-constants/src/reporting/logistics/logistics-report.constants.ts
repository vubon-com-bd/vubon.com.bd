/**
 * Logistics Report Constants
 * Configuration for logistics reports - Bangladesh based
 */

export const LOGISTICS_REPORT = {
  // Report Types
  TYPES: {
    SHIPMENT_SUMMARY: 'shipment_summary',
    DELIVERY_PERFORMANCE: 'delivery_performance',
    COST_ANALYSIS: 'cost_analysis',
    VEHICLE_UTILIZATION: 'vehicle_utilization',
    DRIVER_PERFORMANCE: 'driver_performance',
    WAREHOUSE_INVENTORY: 'warehouse_inventory',
    ROUTE_EFFICIENCY: 'route_efficiency',
    CUSTOMER_SATISFACTION: 'customer_satisfaction',
    COMPLAINT_ANALYSIS: 'complaint_analysis',
    RETURN_ANALYSIS: 'return_analysis',
    FUEL_CONSUMPTION: 'fuel_consumption',
    MAINTENANCE_COST: 'maintenance_cost',
    COURIER_PERFORMANCE: 'courier_performance',
    REGIONAL_PERFORMANCE: 'regional_performance',
    CUSTOM: 'custom',
  } as const,

  // Report Statuses
  STATUS: {
    DRAFT: 'draft',
    PENDING: 'pending',
    GENERATING: 'generating',
    COMPLETED: 'completed',
    FAILED: 'failed',
    SCHEDULED: 'scheduled',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  } as const,

  // Report Formats
  FORMATS: {
    PDF: 'pdf',
    CSV: 'csv',
    XLSX: 'xlsx',
    JSON: 'json',
    HTML: 'html',
    DOCX: 'docx',
  } as const,

  // Report Frequencies
  FREQUENCIES: {
    ONCE: 'once',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
  } as const,

  // Report Priorities
  PRIORITIES: {
    CRITICAL: 5,
    HIGH: 4,
    MEDIUM: 3,
    LOW: 2,
    BACKGROUND: 1,
  } as const,

  // Report Delivery Methods
  DELIVERY_METHODS: {
    EMAIL: 'email',
    DOWNLOAD: 'download',
    API: 'api',
    SLACK: 'slack',
    S3: 's3',
    DASHBOARD: 'dashboard',
  } as const,

  // Report Limits
  LIMITS: {
    MAX_ROWS: 100000,
    MAX_COLUMNS: 50,
    MAX_AGE_DAYS: 365,
    MAX_GENERATION_TIME: 3600, // 1 hour
    MAX_STORAGE_MB: 100,
    MAX_RECIPIENTS: 50,
    MAX_ATTACHMENT_SIZE: 25, // MB
  } as const,

  // Report Categories
  CATEGORIES: {
    OPERATIONAL: 'operational',
    FINANCIAL: 'financial',
    PERFORMANCE: 'performance',
    QUALITY: 'quality',
    CUSTOMER: 'customer',
  } as const,
} as const;

// Report Types
export type LogisticsReportType =
  (typeof LOGISTICS_REPORT.TYPES)[keyof typeof LOGISTICS_REPORT.TYPES];

// Report Statuses
export type LogisticsReportStatus =
  (typeof LOGISTICS_REPORT.STATUS)[keyof typeof LOGISTICS_REPORT.STATUS];

// Report Formats
export type LogisticsReportFormat =
  (typeof LOGISTICS_REPORT.FORMATS)[keyof typeof LOGISTICS_REPORT.FORMATS];

// Report Frequencies
export type LogisticsReportFrequency =
  (typeof LOGISTICS_REPORT.FREQUENCIES)[keyof typeof LOGISTICS_REPORT.FREQUENCIES];

// Report Priorities
export type LogisticsReportPriority =
  (typeof LOGISTICS_REPORT.PRIORITIES)[keyof typeof LOGISTICS_REPORT.PRIORITIES];

// Delivery Methods
export type LogisticsReportDeliveryMethod =
  (typeof LOGISTICS_REPORT.DELIVERY_METHODS)[keyof typeof LOGISTICS_REPORT.DELIVERY_METHODS];

// Report Categories
export type LogisticsReportCategory =
  (typeof LOGISTICS_REPORT.CATEGORIES)[keyof typeof LOGISTICS_REPORT.CATEGORIES];

// Utility Functions
export function logisticsReportGetTypeLabel(type: LogisticsReportType): string {
  const labels: Record<LogisticsReportType, string> = {
    [LOGISTICS_REPORT.TYPES.SHIPMENT_SUMMARY]: 'Shipment Summary',
    [LOGISTICS_REPORT.TYPES.DELIVERY_PERFORMANCE]: 'Delivery Performance',
    [LOGISTICS_REPORT.TYPES.COST_ANALYSIS]: 'Cost Analysis',
    [LOGISTICS_REPORT.TYPES.VEHICLE_UTILIZATION]: 'Vehicle Utilization',
    [LOGISTICS_REPORT.TYPES.DRIVER_PERFORMANCE]: 'Driver Performance',
    [LOGISTICS_REPORT.TYPES.WAREHOUSE_INVENTORY]: 'Warehouse Inventory',
    [LOGISTICS_REPORT.TYPES.ROUTE_EFFICIENCY]: 'Route Efficiency',
    [LOGISTICS_REPORT.TYPES.CUSTOMER_SATISFACTION]: 'Customer Satisfaction',
    [LOGISTICS_REPORT.TYPES.COMPLAINT_ANALYSIS]: 'Complaint Analysis',
    [LOGISTICS_REPORT.TYPES.RETURN_ANALYSIS]: 'Return Analysis',
    [LOGISTICS_REPORT.TYPES.FUEL_CONSUMPTION]: 'Fuel Consumption',
    [LOGISTICS_REPORT.TYPES.MAINTENANCE_COST]: 'Maintenance Cost',
    [LOGISTICS_REPORT.TYPES.COURIER_PERFORMANCE]: 'Courier Performance',
    [LOGISTICS_REPORT.TYPES.REGIONAL_PERFORMANCE]: 'Regional Performance',
    [LOGISTICS_REPORT.TYPES.CUSTOM]: 'Custom Report',
  };
  return labels[type] || 'Unknown';
}

export function logisticsReportGetStatusLabel(status: LogisticsReportStatus): string {
  const labels: Record<LogisticsReportStatus, string> = {
    [LOGISTICS_REPORT.STATUS.DRAFT]: 'Draft',
    [LOGISTICS_REPORT.STATUS.PENDING]: 'Pending',
    [LOGISTICS_REPORT.STATUS.GENERATING]: 'Generating',
    [LOGISTICS_REPORT.STATUS.COMPLETED]: 'Completed',
    [LOGISTICS_REPORT.STATUS.FAILED]: 'Failed',
    [LOGISTICS_REPORT.STATUS.SCHEDULED]: 'Scheduled',
    [LOGISTICS_REPORT.STATUS.CANCELLED]: 'Cancelled',
    [LOGISTICS_REPORT.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown';
}

export function logisticsReportGetFormatLabel(format: LogisticsReportFormat): string {
  const labels: Record<LogisticsReportFormat, string> = {
    [LOGISTICS_REPORT.FORMATS.PDF]: 'PDF',
    [LOGISTICS_REPORT.FORMATS.CSV]: 'CSV',
    [LOGISTICS_REPORT.FORMATS.XLSX]: 'Excel',
    [LOGISTICS_REPORT.FORMATS.JSON]: 'JSON',
    [LOGISTICS_REPORT.FORMATS.HTML]: 'HTML',
    [LOGISTICS_REPORT.FORMATS.DOCX]: 'Word Document',
  };
  return labels[format] || 'Unknown';
}

export function logisticsReportGetFrequencyLabel(frequency: LogisticsReportFrequency): string {
  const labels: Record<LogisticsReportFrequency, string> = {
    [LOGISTICS_REPORT.FREQUENCIES.ONCE]: 'Once',
    [LOGISTICS_REPORT.FREQUENCIES.DAILY]: 'Daily',
    [LOGISTICS_REPORT.FREQUENCIES.WEEKLY]: 'Weekly',
    [LOGISTICS_REPORT.FREQUENCIES.BI_WEEKLY]: 'Bi-Weekly',
    [LOGISTICS_REPORT.FREQUENCIES.MONTHLY]: 'Monthly',
    [LOGISTICS_REPORT.FREQUENCIES.QUARTERLY]: 'Quarterly',
    [LOGISTICS_REPORT.FREQUENCIES.YEARLY]: 'Yearly',
  };
  return labels[frequency] || 'Unknown';
}

export function logisticsReportGetPriorityLabel(priority: LogisticsReportPriority): string {
  const labels: Record<LogisticsReportPriority, string> = {
    [LOGISTICS_REPORT.PRIORITIES.CRITICAL]: 'Critical',
    [LOGISTICS_REPORT.PRIORITIES.HIGH]: 'High',
    [LOGISTICS_REPORT.PRIORITIES.MEDIUM]: 'Medium',
    [LOGISTICS_REPORT.PRIORITIES.LOW]: 'Low',
    [LOGISTICS_REPORT.PRIORITIES.BACKGROUND]: 'Background',
  };
  return labels[priority] || 'Unknown';
}

export function logisticsReportGetDeliveryMethodLabel(
  method: LogisticsReportDeliveryMethod
): string {
  const labels: Record<LogisticsReportDeliveryMethod, string> = {
    [LOGISTICS_REPORT.DELIVERY_METHODS.EMAIL]: 'Email',
    [LOGISTICS_REPORT.DELIVERY_METHODS.DOWNLOAD]: 'Download',
    [LOGISTICS_REPORT.DELIVERY_METHODS.API]: 'API',
    [LOGISTICS_REPORT.DELIVERY_METHODS.SLACK]: 'Slack',
    [LOGISTICS_REPORT.DELIVERY_METHODS.S3]: 'S3 Storage',
    [LOGISTICS_REPORT.DELIVERY_METHODS.DASHBOARD]: 'Dashboard',
  };
  return labels[method] || 'Unknown';
}

export function logisticsReportIsCompleted(status: LogisticsReportStatus): boolean {
  return status === LOGISTICS_REPORT.STATUS.COMPLETED;
}

export function logisticsReportIsFailed(status: LogisticsReportStatus): boolean {
  return status === LOGISTICS_REPORT.STATUS.FAILED;
}

export function logisticsReportIsPending(status: LogisticsReportStatus): boolean {
  return (
    status === LOGISTICS_REPORT.STATUS.PENDING || status === LOGISTICS_REPORT.STATUS.GENERATING
  );
}

export function logisticsReportGetCategoryLabel(category: LogisticsReportCategory): string {
  const labels: Record<LogisticsReportCategory, string> = {
    [LOGISTICS_REPORT.CATEGORIES.OPERATIONAL]: 'Operational',
    [LOGISTICS_REPORT.CATEGORIES.FINANCIAL]: 'Financial',
    [LOGISTICS_REPORT.CATEGORIES.PERFORMANCE]: 'Performance',
    [LOGISTICS_REPORT.CATEGORIES.QUALITY]: 'Quality',
    [LOGISTICS_REPORT.CATEGORIES.CUSTOMER]: 'Customer',
  };
  return labels[category] || 'Unknown';
}
