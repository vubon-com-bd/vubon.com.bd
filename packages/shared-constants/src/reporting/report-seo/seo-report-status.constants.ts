/**
 * SEO Report Status Constants
 * Status definitions for SEO reports
 */

export const SEO_REPORT_STATUS = {
  // Report Lifecycle Status
  LIFECYCLE: {
    INITIATED: 'initiated',
    CONFIGURING: 'configuring',
    GENERATING: 'generating',
    GENERATED: 'generated',
    PROCESSING: 'processing',
    FORMATTING: 'formatting',
    COMPLETED: 'completed',
    DELIVERING: 'delivering',
    DELIVERED: 'delivered',
    VIEWED: 'viewed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  } as const,

  // Report Health Status
  HEALTH: {
    HEALTHY: 'healthy',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    UNKNOWN: 'unknown',
  } as const,

  // Report Quality Status
  QUALITY: {
    EXCELLENT: 'excellent',
    GOOD: 'good',
    AVERAGE: 'average',
    POOR: 'poor',
    VERY_POOR: 'very_poor',
  } as const,

  // Report Delivery Status
  DELIVERY: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    PARTIAL: 'partial',
    RETRYING: 'retrying',
  } as const,

  // Report Validation Status
  VALIDATION: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    VALIDATED: 'validated',
    FAILED: 'failed',
    PARTIAL: 'partial',
    WARNING: 'warning',
  } as const,

  // Status Categories
  CATEGORIES: {
    PLANNING: 'planning',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    ARCHIVED: 'archived',
  } as const,
} as const;

// Lifecycle Status
export type SEOReportLifecycleStatus =
  (typeof SEO_REPORT_STATUS.LIFECYCLE)[keyof typeof SEO_REPORT_STATUS.LIFECYCLE];

// Health Status
export type SEOReportHealthStatus =
  (typeof SEO_REPORT_STATUS.HEALTH)[keyof typeof SEO_REPORT_STATUS.HEALTH];

// Quality Status
export type SEOReportQualityStatus =
  (typeof SEO_REPORT_STATUS.QUALITY)[keyof typeof SEO_REPORT_STATUS.QUALITY];

// Delivery Status
export type SEOReportDeliveryStatus =
  (typeof SEO_REPORT_STATUS.DELIVERY)[keyof typeof SEO_REPORT_STATUS.DELIVERY];

// Validation Status
export type SEOReportValidationStatus =
  (typeof SEO_REPORT_STATUS.VALIDATION)[keyof typeof SEO_REPORT_STATUS.VALIDATION];

// Status Categories
export type SEOReportStatusCategory =
  (typeof SEO_REPORT_STATUS.CATEGORIES)[keyof typeof SEO_REPORT_STATUS.CATEGORIES];

// Utility Functions
export function getSEOReportLifecycleLabel(status: SEOReportLifecycleStatus): string {
  const labels: Record<SEOReportLifecycleStatus, string> = {
    [SEO_REPORT_STATUS.LIFECYCLE.INITIATED]: 'Initiated',
    [SEO_REPORT_STATUS.LIFECYCLE.CONFIGURING]: 'Configuring',
    [SEO_REPORT_STATUS.LIFECYCLE.GENERATING]: 'Generating',
    [SEO_REPORT_STATUS.LIFECYCLE.GENERATED]: 'Generated',
    [SEO_REPORT_STATUS.LIFECYCLE.PROCESSING]: 'Processing',
    [SEO_REPORT_STATUS.LIFECYCLE.FORMATTING]: 'Formatting',
    [SEO_REPORT_STATUS.LIFECYCLE.COMPLETED]: 'Completed',
    [SEO_REPORT_STATUS.LIFECYCLE.DELIVERING]: 'Delivering',
    [SEO_REPORT_STATUS.LIFECYCLE.DELIVERED]: 'Delivered',
    [SEO_REPORT_STATUS.LIFECYCLE.VIEWED]: 'Viewed',
    [SEO_REPORT_STATUS.LIFECYCLE.EXPIRED]: 'Expired',
    [SEO_REPORT_STATUS.LIFECYCLE.ARCHIVED]: 'Archived',
    [SEO_REPORT_STATUS.LIFECYCLE.FAILED]: 'Failed',
    [SEO_REPORT_STATUS.LIFECYCLE.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown Lifecycle Status';
}

export function getSEOReportHealthLabel(status: SEOReportHealthStatus): string {
  const labels: Record<SEOReportHealthStatus, string> = {
    [SEO_REPORT_STATUS.HEALTH.HEALTHY]: 'Healthy',
    [SEO_REPORT_STATUS.HEALTH.WARNING]: 'Warning',
    [SEO_REPORT_STATUS.HEALTH.ERROR]: 'Error',
    [SEO_REPORT_STATUS.HEALTH.CRITICAL]: 'Critical',
    [SEO_REPORT_STATUS.HEALTH.UNKNOWN]: 'Unknown',
  };
  return labels[status] || 'Unknown Health Status';
}

export function getSEOReportQualityLabel(status: SEOReportQualityStatus): string {
  const labels: Record<SEOReportQualityStatus, string> = {
    [SEO_REPORT_STATUS.QUALITY.EXCELLENT]: 'Excellent',
    [SEO_REPORT_STATUS.QUALITY.GOOD]: 'Good',
    [SEO_REPORT_STATUS.QUALITY.AVERAGE]: 'Average',
    [SEO_REPORT_STATUS.QUALITY.POOR]: 'Poor',
    [SEO_REPORT_STATUS.QUALITY.VERY_POOR]: 'Very Poor',
  };
  return labels[status] || 'Unknown Quality';
}

export function getSEOReportDeliveryLabel(status: SEOReportDeliveryStatus): string {
  const labels: Record<SEOReportDeliveryStatus, string> = {
    [SEO_REPORT_STATUS.DELIVERY.PENDING]: 'Pending',
    [SEO_REPORT_STATUS.DELIVERY.IN_PROGRESS]: 'In Progress',
    [SEO_REPORT_STATUS.DELIVERY.DELIVERED]: 'Delivered',
    [SEO_REPORT_STATUS.DELIVERY.FAILED]: 'Failed',
    [SEO_REPORT_STATUS.DELIVERY.PARTIAL]: 'Partial',
    [SEO_REPORT_STATUS.DELIVERY.RETRYING]: 'Retrying',
  };
  return labels[status] || 'Unknown Delivery Status';
}

export function getSEOReportValidationLabel(status: SEOReportValidationStatus): string {
  const labels: Record<SEOReportValidationStatus, string> = {
    [SEO_REPORT_STATUS.VALIDATION.PENDING]: 'Pending Validation',
    [SEO_REPORT_STATUS.VALIDATION.IN_PROGRESS]: 'Validation In Progress',
    [SEO_REPORT_STATUS.VALIDATION.VALIDATED]: 'Validated',
    [SEO_REPORT_STATUS.VALIDATION.FAILED]: 'Validation Failed',
    [SEO_REPORT_STATUS.VALIDATION.PARTIAL]: 'Partially Validated',
    [SEO_REPORT_STATUS.VALIDATION.WARNING]: 'Validation Warning',
  };
  return labels[status] || 'Unknown Validation Status';
}

export function getSEOReportStatusCategory(
  status: SEOReportLifecycleStatus
): SEOReportStatusCategory {
  const categories: Record<SEOReportLifecycleStatus, SEOReportStatusCategory> = {
    [SEO_REPORT_STATUS.LIFECYCLE.INITIATED]: SEO_REPORT_STATUS.CATEGORIES.PLANNING,
    [SEO_REPORT_STATUS.LIFECYCLE.CONFIGURING]: SEO_REPORT_STATUS.CATEGORIES.PLANNING,
    [SEO_REPORT_STATUS.LIFECYCLE.GENERATING]: SEO_REPORT_STATUS.CATEGORIES.PROCESSING,
    [SEO_REPORT_STATUS.LIFECYCLE.GENERATED]: SEO_REPORT_STATUS.CATEGORIES.PROCESSING,
    [SEO_REPORT_STATUS.LIFECYCLE.PROCESSING]: SEO_REPORT_STATUS.CATEGORIES.PROCESSING,
    [SEO_REPORT_STATUS.LIFECYCLE.FORMATTING]: SEO_REPORT_STATUS.CATEGORIES.PROCESSING,
    [SEO_REPORT_STATUS.LIFECYCLE.COMPLETED]: SEO_REPORT_STATUS.CATEGORIES.COMPLETED,
    [SEO_REPORT_STATUS.LIFECYCLE.DELIVERING]: SEO_REPORT_STATUS.CATEGORIES.PROCESSING,
    [SEO_REPORT_STATUS.LIFECYCLE.DELIVERED]: SEO_REPORT_STATUS.CATEGORIES.DELIVERED,
    [SEO_REPORT_STATUS.LIFECYCLE.VIEWED]: SEO_REPORT_STATUS.CATEGORIES.DELIVERED,
    [SEO_REPORT_STATUS.LIFECYCLE.EXPIRED]: SEO_REPORT_STATUS.CATEGORIES.COMPLETED,
    [SEO_REPORT_STATUS.LIFECYCLE.ARCHIVED]: SEO_REPORT_STATUS.CATEGORIES.ARCHIVED,
    [SEO_REPORT_STATUS.LIFECYCLE.FAILED]: SEO_REPORT_STATUS.CATEGORIES.FAILED,
    [SEO_REPORT_STATUS.LIFECYCLE.CANCELLED]: SEO_REPORT_STATUS.CATEGORIES.FAILED,
  };
  return categories[status] || SEO_REPORT_STATUS.CATEGORIES.PLANNING;
}

export function getSEOReportStatusColor(status: SEOReportLifecycleStatus): string {
  const colors: Record<SEOReportLifecycleStatus, string> = {
    [SEO_REPORT_STATUS.LIFECYCLE.INITIATED]: '#9E9E9E',
    [SEO_REPORT_STATUS.LIFECYCLE.CONFIGURING]: '#2196F3',
    [SEO_REPORT_STATUS.LIFECYCLE.GENERATING]: '#FFC107',
    [SEO_REPORT_STATUS.LIFECYCLE.GENERATED]: '#2196F3',
    [SEO_REPORT_STATUS.LIFECYCLE.PROCESSING]: '#00BCD4',
    [SEO_REPORT_STATUS.LIFECYCLE.FORMATTING]: '#3F51B5',
    [SEO_REPORT_STATUS.LIFECYCLE.COMPLETED]: '#4CAF50',
    [SEO_REPORT_STATUS.LIFECYCLE.DELIVERING]: '#FF9800',
    [SEO_REPORT_STATUS.LIFECYCLE.DELIVERED]: '#8BC34A',
    [SEO_REPORT_STATUS.LIFECYCLE.VIEWED]: '#4CAF50',
    [SEO_REPORT_STATUS.LIFECYCLE.EXPIRED]: '#FF9800',
    [SEO_REPORT_STATUS.LIFECYCLE.ARCHIVED]: '#9E9E9E',
    [SEO_REPORT_STATUS.LIFECYCLE.FAILED]: '#F44336',
    [SEO_REPORT_STATUS.LIFECYCLE.CANCELLED]: '#D32F2F',
  };
  return colors[status] || '#9E9E9E';
}

export function isReportGenerated(status: SEOReportLifecycleStatus): boolean {
  const generatedStatuses: SEOReportLifecycleStatus[] = [
    SEO_REPORT_STATUS.LIFECYCLE.GENERATED,
    SEO_REPORT_STATUS.LIFECYCLE.COMPLETED,
    SEO_REPORT_STATUS.LIFECYCLE.DELIVERED,
    SEO_REPORT_STATUS.LIFECYCLE.VIEWED,
    SEO_REPORT_STATUS.LIFECYCLE.ARCHIVED,
  ];
  return generatedStatuses.includes(status);
}

export function isReportProcessing(status: SEOReportLifecycleStatus): boolean {
  const processingStatuses: SEOReportLifecycleStatus[] = [
    SEO_REPORT_STATUS.LIFECYCLE.GENERATING,
    SEO_REPORT_STATUS.LIFECYCLE.PROCESSING,
    SEO_REPORT_STATUS.LIFECYCLE.FORMATTING,
    SEO_REPORT_STATUS.LIFECYCLE.DELIVERING,
  ];
  return processingStatuses.includes(status);
}
