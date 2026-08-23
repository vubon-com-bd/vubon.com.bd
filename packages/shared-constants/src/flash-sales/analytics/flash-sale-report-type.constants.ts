/**
 * Flash Sale Report Type Constants
 * Types and classifications of flash sale reports
 */

export const FLASH_SALE_REPORT_TYPE = {
  // Report Categories
  CATEGORIES: {
    STANDARD: 'standard',
    CUSTOM: 'custom',
    EXECUTIVE: 'executive',
    OPERATIONAL: 'operational',
    ANALYTICAL: 'analytical',
    FINANCIAL: 'financial',
  },

  // Report Complexity
  COMPLEXITY: {
    BASIC: 'basic',
    STANDARD: 'standard',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  },

  // Report Scope
  SCOPE: {
    GLOBAL: 'global',
    SALE_LEVEL: 'sale_level',
    PRODUCT_LEVEL: 'product_level',
    CUSTOMER_LEVEL: 'customer_level',
    TEMPORAL: 'temporal',
  },

  // Report Frequency
  FREQUENCY: {
    ON_DEMAND: 'on_demand',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
  },

  // Report Priority
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Report Status
  STATUS: {
    PENDING: 'pending',
    GENERATING: 'generating',
    GENERATED: 'generated',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
  },

  // Report Audience
  AUDIENCE: {
    EXECUTIVES: 'executives',
    MANAGERS: 'managers',
    ANALYSTS: 'analysts',
    OPERATIONS: 'operations',
    CLIENTS: 'clients',
    PUBLIC: 'public',
  },
} as const;

// Report Categories
export type FlashSaleReportTypeCategory =
  (typeof FLASH_SALE_REPORT_TYPE.CATEGORIES)[keyof typeof FLASH_SALE_REPORT_TYPE.CATEGORIES];

// Report Complexity
export type FlashSaleReportTypeComplexity =
  (typeof FLASH_SALE_REPORT_TYPE.COMPLEXITY)[keyof typeof FLASH_SALE_REPORT_TYPE.COMPLEXITY];

// Report Scope
export type FlashSaleReportTypeScope =
  (typeof FLASH_SALE_REPORT_TYPE.SCOPE)[keyof typeof FLASH_SALE_REPORT_TYPE.SCOPE];

// Report Frequency
export type FlashSaleReportTypeFrequency =
  (typeof FLASH_SALE_REPORT_TYPE.FREQUENCY)[keyof typeof FLASH_SALE_REPORT_TYPE.FREQUENCY];

// Report Priority
export type FlashSaleReportTypePriority =
  (typeof FLASH_SALE_REPORT_TYPE.PRIORITY)[keyof typeof FLASH_SALE_REPORT_TYPE.PRIORITY];

// Report Status
export type FlashSaleReportTypeStatus =
  (typeof FLASH_SALE_REPORT_TYPE.STATUS)[keyof typeof FLASH_SALE_REPORT_TYPE.STATUS];

// Report Audience
export type FlashSaleReportTypeAudience =
  (typeof FLASH_SALE_REPORT_TYPE.AUDIENCE)[keyof typeof FLASH_SALE_REPORT_TYPE.AUDIENCE];

// Utility Functions
export function flashsalesReportTypeGetCategoryLabel(
  category: FlashSaleReportTypeCategory
): string {
  const labels: Record<FlashSaleReportTypeCategory, string> = {
    [FLASH_SALE_REPORT_TYPE.CATEGORIES.STANDARD]: 'Standard Report',
    [FLASH_SALE_REPORT_TYPE.CATEGORIES.CUSTOM]: 'Custom Report',
    [FLASH_SALE_REPORT_TYPE.CATEGORIES.EXECUTIVE]: 'Executive Report',
    [FLASH_SALE_REPORT_TYPE.CATEGORIES.OPERATIONAL]: 'Operational Report',
    [FLASH_SALE_REPORT_TYPE.CATEGORIES.ANALYTICAL]: 'Analytical Report',
    [FLASH_SALE_REPORT_TYPE.CATEGORIES.FINANCIAL]: 'Financial Report',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesReportTypeGetComplexityLabel(
  complexity: FlashSaleReportTypeComplexity
): string {
  const labels: Record<FlashSaleReportTypeComplexity, string> = {
    [FLASH_SALE_REPORT_TYPE.COMPLEXITY.BASIC]: 'Basic',
    [FLASH_SALE_REPORT_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [FLASH_SALE_REPORT_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [FLASH_SALE_REPORT_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function flashsalesReportTypeGetScopeLabel(scope: FlashSaleReportTypeScope): string {
  const labels: Record<FlashSaleReportTypeScope, string> = {
    [FLASH_SALE_REPORT_TYPE.SCOPE.GLOBAL]: 'Global',
    [FLASH_SALE_REPORT_TYPE.SCOPE.SALE_LEVEL]: 'Sale Level',
    [FLASH_SALE_REPORT_TYPE.SCOPE.PRODUCT_LEVEL]: 'Product Level',
    [FLASH_SALE_REPORT_TYPE.SCOPE.CUSTOMER_LEVEL]: 'Customer Level',
    [FLASH_SALE_REPORT_TYPE.SCOPE.TEMPORAL]: 'Temporal',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashsalesReportTypeGetFrequencyLabel(
  frequency: FlashSaleReportTypeFrequency
): string {
  const labels: Record<FlashSaleReportTypeFrequency, string> = {
    [FLASH_SALE_REPORT_TYPE.FREQUENCY.ON_DEMAND]: 'On Demand',
    [FLASH_SALE_REPORT_TYPE.FREQUENCY.HOURLY]: 'Hourly',
    [FLASH_SALE_REPORT_TYPE.FREQUENCY.DAILY]: 'Daily',
    [FLASH_SALE_REPORT_TYPE.FREQUENCY.WEEKLY]: 'Weekly',
    [FLASH_SALE_REPORT_TYPE.FREQUENCY.MONTHLY]: 'Monthly',
    [FLASH_SALE_REPORT_TYPE.FREQUENCY.QUARTERLY]: 'Quarterly',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function flashsalesReportTypeGetPriorityLabel(
  priority: FlashSaleReportTypePriority
): string {
  const labels: Record<FlashSaleReportTypePriority, string> = {
    [FLASH_SALE_REPORT_TYPE.PRIORITY.LOW]: 'Low',
    [FLASH_SALE_REPORT_TYPE.PRIORITY.MEDIUM]: 'Medium',
    [FLASH_SALE_REPORT_TYPE.PRIORITY.HIGH]: 'High',
    [FLASH_SALE_REPORT_TYPE.PRIORITY.CRITICAL]: 'Critical',
  };
  return labels[priority] || 'Unknown Priority';
}

export function flashsalesReportTypeGetStatusLabel(status: FlashSaleReportTypeStatus): string {
  const labels: Record<FlashSaleReportTypeStatus, string> = {
    [FLASH_SALE_REPORT_TYPE.STATUS.PENDING]: 'Pending',
    [FLASH_SALE_REPORT_TYPE.STATUS.GENERATING]: 'Generating',
    [FLASH_SALE_REPORT_TYPE.STATUS.GENERATED]: 'Generated',
    [FLASH_SALE_REPORT_TYPE.STATUS.DELIVERED]: 'Delivered',
    [FLASH_SALE_REPORT_TYPE.STATUS.FAILED]: 'Failed',
    [FLASH_SALE_REPORT_TYPE.STATUS.CANCELLED]: 'Cancelled',
    [FLASH_SALE_REPORT_TYPE.STATUS.ARCHIVED]: 'Archived',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesReportTypeGetAudienceLabel(
  audience: FlashSaleReportTypeAudience
): string {
  const labels: Record<FlashSaleReportTypeAudience, string> = {
    [FLASH_SALE_REPORT_TYPE.AUDIENCE.EXECUTIVES]: 'Executives',
    [FLASH_SALE_REPORT_TYPE.AUDIENCE.MANAGERS]: 'Managers',
    [FLASH_SALE_REPORT_TYPE.AUDIENCE.ANALYSTS]: 'Analysts',
    [FLASH_SALE_REPORT_TYPE.AUDIENCE.OPERATIONS]: 'Operations',
    [FLASH_SALE_REPORT_TYPE.AUDIENCE.CLIENTS]: 'Clients',
    [FLASH_SALE_REPORT_TYPE.AUDIENCE.PUBLIC]: 'Public',
  };
  return labels[audience] || 'Unknown Audience';
}

export function flashsalesReportTypeIsValidCategory(
  category: string
): category is FlashSaleReportTypeCategory {
  return Object.values(FLASH_SALE_REPORT_TYPE.CATEGORIES).includes(
    category as FlashSaleReportTypeCategory
  );
}

export function flashsalesReportTypeIsValidStatus(
  status: string
): status is FlashSaleReportTypeStatus {
  return Object.values(FLASH_SALE_REPORT_TYPE.STATUS).includes(status as FlashSaleReportTypeStatus);
}

export function flashsalesReportTypeIsGenerated(status: FlashSaleReportTypeStatus): boolean {
  const generatedStatuses: FlashSaleReportTypeStatus[] = [
    FLASH_SALE_REPORT_TYPE.STATUS.GENERATED,
    FLASH_SALE_REPORT_TYPE.STATUS.DELIVERED,
  ];
  return generatedStatuses.includes(status);
}

export function flashsalesReportTypeIsFailed(status: FlashSaleReportTypeStatus): boolean {
  const failedStatuses: FlashSaleReportTypeStatus[] = [
    FLASH_SALE_REPORT_TYPE.STATUS.FAILED,
    FLASH_SALE_REPORT_TYPE.STATUS.CANCELLED,
  ];
  return failedStatuses.includes(status);
}

export function flashsalesReportTypeIsComplete(status: FlashSaleReportTypeStatus): boolean {
  const completeStatuses: FlashSaleReportTypeStatus[] = [
    FLASH_SALE_REPORT_TYPE.STATUS.DELIVERED,
    FLASH_SALE_REPORT_TYPE.STATUS.FAILED,
    FLASH_SALE_REPORT_TYPE.STATUS.CANCELLED,
    FLASH_SALE_REPORT_TYPE.STATUS.ARCHIVED,
  ];
  return completeStatuses.includes(status);
}
