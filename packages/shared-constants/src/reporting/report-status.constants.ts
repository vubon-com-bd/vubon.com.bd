/**
 * Report Status Constants
 * Status definitions for report generation and delivery
 */

export const REPORT_STATUS = {
  // Generation Statuses
  GENERATION_STATUS: {
    PENDING: 'pending',
    QUEUED: 'queued',
    GENERATING: 'generating',
    GENERATED: 'generated',
    GENERATION_FAILED: 'generation_failed',
    CANCELLED: 'cancelled',
  } as const,

  // Delivery Statuses
  DELIVERY_STATUS: {
    PENDING: 'pending',
    DELIVERING: 'delivering',
    DELIVERED: 'delivered',
    DELIVERY_FAILED: 'delivery_failed',
    PARTIAL: 'partial',
    RETRY: 'retry',
  } as const,

  // Processing Statuses
  PROCESSING_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    PROCESSED: 'processed',
    PROCESSING_FAILED: 'processing_failed',
  } as const,

  // Schedule Statuses
  SCHEDULE_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    COMPLETED: 'completed',
    FAILED: 'failed',
    EXPIRED: 'expired',
  } as const,

  // Validation Statuses
  VALIDATION_STATUS: {
    PENDING: 'pending',
    VALIDATING: 'validating',
    VALID: 'valid',
    INVALID: 'invalid',
    PARTIAL: 'partial',
  } as const,

  // Status Colors (for UI)
  COLORS: {
    PENDING: '#F59E0B',
    QUEUED: '#6B7280',
    GENERATING: '#3B82F6',
    GENERATED: '#10B981',
    GENERATION_FAILED: '#EF4444',
    CANCELLED: '#6B7280',
    DELIVERING: '#3B82F6',
    DELIVERED: '#10B981',
    DELIVERY_FAILED: '#EF4444',
    PARTIAL: '#F59E0B',
    RETRY: '#8B5CF6',
    PROCESSING: '#3B82F6',
    PROCESSED: '#10B981',
    PROCESSING_FAILED: '#EF4444',
    ACTIVE: '#10B981',
    INACTIVE: '#6B7280',
    PAUSED: '#F59E0B',
    COMPLETED: '#10B981',
    FAILED: '#EF4444',
    EXPIRED: '#6B7280',
    VALIDATING: '#3B82F6',
    VALID: '#10B981',
    INVALID: '#EF4444',
  } as const,

  // Status Order (for sorting)
  ORDER: {
    GENERATION: {
      PENDING: 0,
      QUEUED: 1,
      GENERATING: 2,
      GENERATED: 3,
      GENERATION_FAILED: 4,
      CANCELLED: 5,
    },
    DELIVERY: {
      PENDING: 0,
      DELIVERING: 1,
      DELIVERED: 2,
      DELIVERY_FAILED: 3,
      PARTIAL: 4,
      RETRY: 5,
    },
  } as const,
} as const;

// Generation Status
export type ReportGenerationStatus =
  (typeof REPORT_STATUS.GENERATION_STATUS)[keyof typeof REPORT_STATUS.GENERATION_STATUS];

// Delivery Status
export type ReportDeliveryStatus =
  (typeof REPORT_STATUS.DELIVERY_STATUS)[keyof typeof REPORT_STATUS.DELIVERY_STATUS];

// Processing Status
export type ReportProcessingStatus =
  (typeof REPORT_STATUS.PROCESSING_STATUS)[keyof typeof REPORT_STATUS.PROCESSING_STATUS];

// Schedule Status
export type ReportScheduleStatus =
  (typeof REPORT_STATUS.SCHEDULE_STATUS)[keyof typeof REPORT_STATUS.SCHEDULE_STATUS];

// Validation Status
export type ReportValidationStatus =
  (typeof REPORT_STATUS.VALIDATION_STATUS)[keyof typeof REPORT_STATUS.VALIDATION_STATUS];

// Status Colors
export type ReportStatusColor = (typeof REPORT_STATUS.COLORS)[keyof typeof REPORT_STATUS.COLORS];

// Utility Functions
export function getReportGenerationStatusLabel(status: ReportGenerationStatus): string {
  const labels: Record<ReportGenerationStatus, string> = {
    [REPORT_STATUS.GENERATION_STATUS.PENDING]: 'Pending',
    [REPORT_STATUS.GENERATION_STATUS.QUEUED]: 'Queued',
    [REPORT_STATUS.GENERATION_STATUS.GENERATING]: 'Generating',
    [REPORT_STATUS.GENERATION_STATUS.GENERATED]: 'Generated',
    [REPORT_STATUS.GENERATION_STATUS.GENERATION_FAILED]: 'Generation Failed',
    [REPORT_STATUS.GENERATION_STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown Status';
}

export function getReportDeliveryStatusLabel(status: ReportDeliveryStatus): string {
  const labels: Record<ReportDeliveryStatus, string> = {
    [REPORT_STATUS.DELIVERY_STATUS.PENDING]: 'Pending',
    [REPORT_STATUS.DELIVERY_STATUS.DELIVERING]: 'Delivering',
    [REPORT_STATUS.DELIVERY_STATUS.DELIVERED]: 'Delivered',
    [REPORT_STATUS.DELIVERY_STATUS.DELIVERY_FAILED]: 'Delivery Failed',
    [REPORT_STATUS.DELIVERY_STATUS.PARTIAL]: 'Partial',
    [REPORT_STATUS.DELIVERY_STATUS.RETRY]: 'Retry',
  };
  return labels[status] || 'Unknown Status';
}

export function getReportProcessingStatusLabel(status: ReportProcessingStatus): string {
  const labels: Record<ReportProcessingStatus, string> = {
    [REPORT_STATUS.PROCESSING_STATUS.PENDING]: 'Pending',
    [REPORT_STATUS.PROCESSING_STATUS.PROCESSING]: 'Processing',
    [REPORT_STATUS.PROCESSING_STATUS.PROCESSED]: 'Processed',
    [REPORT_STATUS.PROCESSING_STATUS.PROCESSING_FAILED]: 'Processing Failed',
  };
  return labels[status] || 'Unknown Status';
}

export function getReportScheduleStatusLabel(status: ReportScheduleStatus): string {
  const labels: Record<ReportScheduleStatus, string> = {
    [REPORT_STATUS.SCHEDULE_STATUS.ACTIVE]: 'Active',
    [REPORT_STATUS.SCHEDULE_STATUS.INACTIVE]: 'Inactive',
    [REPORT_STATUS.SCHEDULE_STATUS.PAUSED]: 'Paused',
    [REPORT_STATUS.SCHEDULE_STATUS.COMPLETED]: 'Completed',
    [REPORT_STATUS.SCHEDULE_STATUS.FAILED]: 'Failed',
    [REPORT_STATUS.SCHEDULE_STATUS.EXPIRED]: 'Expired',
  };
  return labels[status] || 'Unknown Status';
}

export function getReportStatusColor(status: string): ReportStatusColor {
  const colorMap: Record<string, ReportStatusColor> = {
    pending: REPORT_STATUS.COLORS.PENDING,
    queued: REPORT_STATUS.COLORS.QUEUED,
    generating: REPORT_STATUS.COLORS.GENERATING,
    generated: REPORT_STATUS.COLORS.GENERATED,
    generation_failed: REPORT_STATUS.COLORS.GENERATION_FAILED,
    cancelled: REPORT_STATUS.COLORS.CANCELLED,
    delivering: REPORT_STATUS.COLORS.DELIVERING,
    delivered: REPORT_STATUS.COLORS.DELIVERED,
    delivery_failed: REPORT_STATUS.COLORS.DELIVERY_FAILED,
    partial: REPORT_STATUS.COLORS.PARTIAL,
    retry: REPORT_STATUS.COLORS.RETRY,
    processing: REPORT_STATUS.COLORS.PROCESSING,
    processed: REPORT_STATUS.COLORS.PROCESSED,
    processing_failed: REPORT_STATUS.COLORS.PROCESSING_FAILED,
    active: REPORT_STATUS.COLORS.ACTIVE,
    inactive: REPORT_STATUS.COLORS.INACTIVE,
    paused: REPORT_STATUS.COLORS.PAUSED,
    completed: REPORT_STATUS.COLORS.COMPLETED,
    failed: REPORT_STATUS.COLORS.FAILED,
    expired: REPORT_STATUS.COLORS.EXPIRED,
    validating: REPORT_STATUS.COLORS.VALIDATING,
    valid: REPORT_STATUS.COLORS.VALID,
    invalid: REPORT_STATUS.COLORS.INVALID,
  };
  return colorMap[status] || REPORT_STATUS.COLORS.PENDING;
}

export function isReportComplete(status: ReportGenerationStatus): boolean {
  const completeStatuses: ReportGenerationStatus[] = [
    REPORT_STATUS.GENERATION_STATUS.GENERATED,
    REPORT_STATUS.GENERATION_STATUS.GENERATION_FAILED,
    REPORT_STATUS.GENERATION_STATUS.CANCELLED,
  ];
  return completeStatuses.includes(status);
}

export function isReportPending(status: ReportGenerationStatus): boolean {
  const pendingStatuses: ReportGenerationStatus[] = [
    REPORT_STATUS.GENERATION_STATUS.PENDING,
    REPORT_STATUS.GENERATION_STATUS.QUEUED,
  ];
  return pendingStatuses.includes(status);
}

export function isReportInProgress(status: ReportGenerationStatus): boolean {
  return status === REPORT_STATUS.GENERATION_STATUS.GENERATING;
}

export function isReportDelivered(status: ReportDeliveryStatus): boolean {
  const deliveredStatuses: ReportDeliveryStatus[] = [
    REPORT_STATUS.DELIVERY_STATUS.DELIVERED,
    REPORT_STATUS.DELIVERY_STATUS.PARTIAL,
  ];
  return deliveredStatuses.includes(status);
}

export function isScheduleActive(status: ReportScheduleStatus): boolean {
  const activeStatuses: ReportScheduleStatus[] = [
    REPORT_STATUS.SCHEDULE_STATUS.ACTIVE,
    REPORT_STATUS.SCHEDULE_STATUS.PAUSED,
  ];
  return activeStatuses.includes(status);
}
