/**
 * Flash Sale Analytics Type Constants
 * Types and classifications of analytics
 */

export const FLASH_SALE_ANALYTICS_TYPE = {
  // Analytics Categories
  CATEGORIES: {
    DESCRIPTIVE: 'descriptive',
    DIAGNOSTIC: 'diagnostic',
    PREDICTIVE: 'predictive',
    PRESCRIPTIVE: 'prescriptive',
    REAL_TIME: 'real_time',
    HISTORICAL: 'historical',
  },

  // Analytics Complexity
  COMPLEXITY: {
    BASIC: 'basic',
    STANDARD: 'standard',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  },

  // Analytics Scope
  SCOPE: {
    GLOBAL: 'global',
    SALE_LEVEL: 'sale_level',
    PRODUCT_LEVEL: 'product_level',
    CUSTOMER_LEVEL: 'customer_level',
    REGIONAL: 'regional',
    TEMPORAL: 'temporal',
  },

  // Analytics Frequency
  FREQUENCY: {
    REAL_TIME: 'real_time',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    ON_DEMAND: 'on_demand',
  },

  // Analytics Method
  METHOD: {
    STATISTICAL: 'statistical',
    MACHINE_LEARNING: 'machine_learning',
    DEEP_LEARNING: 'deep_learning',
    TRADITIONAL: 'traditional',
    HYBRID: 'hybrid',
  },

  // Analytics Priority
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  },

  // Analytics Status
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
} as const;

// Analytics Categories
export type FlashSaleAnalyticsTypeCategory =
  (typeof FLASH_SALE_ANALYTICS_TYPE.CATEGORIES)[keyof typeof FLASH_SALE_ANALYTICS_TYPE.CATEGORIES];

// Analytics Complexity
export type FlashSaleAnalyticsTypeComplexity =
  (typeof FLASH_SALE_ANALYTICS_TYPE.COMPLEXITY)[keyof typeof FLASH_SALE_ANALYTICS_TYPE.COMPLEXITY];

// Analytics Scope
export type FlashSaleAnalyticsTypeScope =
  (typeof FLASH_SALE_ANALYTICS_TYPE.SCOPE)[keyof typeof FLASH_SALE_ANALYTICS_TYPE.SCOPE];

// Analytics Frequency
export type FlashSaleAnalyticsTypeFrequency =
  (typeof FLASH_SALE_ANALYTICS_TYPE.FREQUENCY)[keyof typeof FLASH_SALE_ANALYTICS_TYPE.FREQUENCY];

// Analytics Method
export type FlashSaleAnalyticsTypeMethod =
  (typeof FLASH_SALE_ANALYTICS_TYPE.METHOD)[keyof typeof FLASH_SALE_ANALYTICS_TYPE.METHOD];

// Analytics Priority
export type FlashSaleAnalyticsTypePriority =
  (typeof FLASH_SALE_ANALYTICS_TYPE.PRIORITY)[keyof typeof FLASH_SALE_ANALYTICS_TYPE.PRIORITY];

// Analytics Status
export type FlashSaleAnalyticsTypeStatus =
  (typeof FLASH_SALE_ANALYTICS_TYPE.STATUS)[keyof typeof FLASH_SALE_ANALYTICS_TYPE.STATUS];

// Utility Functions
export function flashsalesAnalyticsTypeGetCategoryLabel(
  category: FlashSaleAnalyticsTypeCategory
): string {
  const labels: Record<FlashSaleAnalyticsTypeCategory, string> = {
    [FLASH_SALE_ANALYTICS_TYPE.CATEGORIES.DESCRIPTIVE]: 'Descriptive Analytics',
    [FLASH_SALE_ANALYTICS_TYPE.CATEGORIES.DIAGNOSTIC]: 'Diagnostic Analytics',
    [FLASH_SALE_ANALYTICS_TYPE.CATEGORIES.PREDICTIVE]: 'Predictive Analytics',
    [FLASH_SALE_ANALYTICS_TYPE.CATEGORIES.PRESCRIPTIVE]: 'Prescriptive Analytics',
    [FLASH_SALE_ANALYTICS_TYPE.CATEGORIES.REAL_TIME]: 'Real-time Analytics',
    [FLASH_SALE_ANALYTICS_TYPE.CATEGORIES.HISTORICAL]: 'Historical Analytics',
  };
  return labels[category] || 'Unknown Category';
}

export function flashsalesAnalyticsTypeGetComplexityLabel(
  complexity: FlashSaleAnalyticsTypeComplexity
): string {
  const labels: Record<FlashSaleAnalyticsTypeComplexity, string> = {
    [FLASH_SALE_ANALYTICS_TYPE.COMPLEXITY.BASIC]: 'Basic',
    [FLASH_SALE_ANALYTICS_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [FLASH_SALE_ANALYTICS_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [FLASH_SALE_ANALYTICS_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function flashsalesAnalyticsTypeGetScopeLabel(scope: FlashSaleAnalyticsTypeScope): string {
  const labels: Record<FlashSaleAnalyticsTypeScope, string> = {
    [FLASH_SALE_ANALYTICS_TYPE.SCOPE.GLOBAL]: 'Global',
    [FLASH_SALE_ANALYTICS_TYPE.SCOPE.SALE_LEVEL]: 'Sale Level',
    [FLASH_SALE_ANALYTICS_TYPE.SCOPE.PRODUCT_LEVEL]: 'Product Level',
    [FLASH_SALE_ANALYTICS_TYPE.SCOPE.CUSTOMER_LEVEL]: 'Customer Level',
    [FLASH_SALE_ANALYTICS_TYPE.SCOPE.REGIONAL]: 'Regional',
    [FLASH_SALE_ANALYTICS_TYPE.SCOPE.TEMPORAL]: 'Temporal',
  };
  return labels[scope] || 'Unknown Scope';
}

export function flashsalesAnalyticsTypeGetFrequencyLabel(
  frequency: FlashSaleAnalyticsTypeFrequency
): string {
  const labels: Record<FlashSaleAnalyticsTypeFrequency, string> = {
    [FLASH_SALE_ANALYTICS_TYPE.FREQUENCY.REAL_TIME]: 'Real-time',
    [FLASH_SALE_ANALYTICS_TYPE.FREQUENCY.HOURLY]: 'Hourly',
    [FLASH_SALE_ANALYTICS_TYPE.FREQUENCY.DAILY]: 'Daily',
    [FLASH_SALE_ANALYTICS_TYPE.FREQUENCY.WEEKLY]: 'Weekly',
    [FLASH_SALE_ANALYTICS_TYPE.FREQUENCY.MONTHLY]: 'Monthly',
    [FLASH_SALE_ANALYTICS_TYPE.FREQUENCY.ON_DEMAND]: 'On Demand',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function flashsalesAnalyticsTypeGetMethodLabel(
  method: FlashSaleAnalyticsTypeMethod
): string {
  const labels: Record<FlashSaleAnalyticsTypeMethod, string> = {
    [FLASH_SALE_ANALYTICS_TYPE.METHOD.STATISTICAL]: 'Statistical',
    [FLASH_SALE_ANALYTICS_TYPE.METHOD.MACHINE_LEARNING]: 'Machine Learning',
    [FLASH_SALE_ANALYTICS_TYPE.METHOD.DEEP_LEARNING]: 'Deep Learning',
    [FLASH_SALE_ANALYTICS_TYPE.METHOD.TRADITIONAL]: 'Traditional',
    [FLASH_SALE_ANALYTICS_TYPE.METHOD.HYBRID]: 'Hybrid',
  };
  return labels[method] || 'Unknown Method';
}

export function flashsalesAnalyticsTypeGetPriorityLabel(
  priority: FlashSaleAnalyticsTypePriority
): string {
  const labels: Record<FlashSaleAnalyticsTypePriority, string> = {
    [FLASH_SALE_ANALYTICS_TYPE.PRIORITY.LOW]: 'Low',
    [FLASH_SALE_ANALYTICS_TYPE.PRIORITY.MEDIUM]: 'Medium',
    [FLASH_SALE_ANALYTICS_TYPE.PRIORITY.HIGH]: 'High',
    [FLASH_SALE_ANALYTICS_TYPE.PRIORITY.CRITICAL]: 'Critical',
  };
  return labels[priority] || 'Unknown Priority';
}

export function flashsalesAnalyticsTypeGetStatusLabel(
  status: FlashSaleAnalyticsTypeStatus
): string {
  const labels: Record<FlashSaleAnalyticsTypeStatus, string> = {
    [FLASH_SALE_ANALYTICS_TYPE.STATUS.PENDING]: 'Pending',
    [FLASH_SALE_ANALYTICS_TYPE.STATUS.PROCESSING]: 'Processing',
    [FLASH_SALE_ANALYTICS_TYPE.STATUS.COMPLETED]: 'Completed',
    [FLASH_SALE_ANALYTICS_TYPE.STATUS.FAILED]: 'Failed',
    [FLASH_SALE_ANALYTICS_TYPE.STATUS.CANCELLED]: 'Cancelled',
  };
  return labels[status] || 'Unknown Status';
}

export function flashsalesAnalyticsTypeIsValidCategory(
  category: string
): category is FlashSaleAnalyticsTypeCategory {
  return Object.values(FLASH_SALE_ANALYTICS_TYPE.CATEGORIES).includes(
    category as FlashSaleAnalyticsTypeCategory
  );
}

export function flashsalesAnalyticsTypeIsValidMethod(
  method: string
): method is FlashSaleAnalyticsTypeMethod {
  return Object.values(FLASH_SALE_ANALYTICS_TYPE.METHOD).includes(
    method as FlashSaleAnalyticsTypeMethod
  );
}

export function flashsalesAnalyticsTypeIsCompleted(status: FlashSaleAnalyticsTypeStatus): boolean {
  return status === FLASH_SALE_ANALYTICS_TYPE.STATUS.COMPLETED;
}

export function flashsalesAnalyticsTypeIsProcessing(status: FlashSaleAnalyticsTypeStatus): boolean {
  return status === FLASH_SALE_ANALYTICS_TYPE.STATUS.PROCESSING;
}

export function flashsalesAnalyticsTypeIsFailed(status: FlashSaleAnalyticsTypeStatus): boolean {
  return status === FLASH_SALE_ANALYTICS_TYPE.STATUS.FAILED;
}
