/**
 * Report Export Type Constants
 * Types and classifications of exports
 */

export const REPORT_EXPORT_TYPE = {
  // Export Categories
  CATEGORIES: {
    STANDARD: 'standard',
    CUSTOM: 'custom',
    SCHEDULED: 'scheduled',
    ONE_TIME: 'one_time',
    BULK: 'bulk',
    STREAMING: 'streaming',
  } as const,

  // Export Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  } as const,

  // Export Scope
  SCOPE: {
    SINGLE: 'single',
    MULTIPLE: 'multiple',
    ALL: 'all',
    FILTERED: 'filtered',
    CUSTOM: 'custom',
  } as const,

  // Export Frequency
  FREQUENCY: {
    ONE_TIME: 'one_time',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ON_DEMAND: 'on_demand',
  } as const,

  // Export Priority
  PRIORITY: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Export Security
  SECURITY: {
    PUBLIC: 'public',
    INTERNAL: 'internal',
    CONFIDENTIAL: 'confidential',
    RESTRICTED: 'restricted',
    TOP_SECRET: 'top_secret',
  } as const,

  // Export Validation
  VALIDATION: {
    NONE: 'none',
    BASIC: 'basic',
    STRICT: 'strict',
    COMPREHENSIVE: 'comprehensive',
  } as const,

  // Export Retention
  RETENTION: {
    TEMPORARY: 'temporary',
    SHORT_TERM: 'short_term',
    MEDIUM_TERM: 'medium_term',
    LONG_TERM: 'long_term',
    PERMANENT: 'permanent',
  } as const,
} as const;

// Export Categories
export type ReportExportTypeCategory =
  (typeof REPORT_EXPORT_TYPE.CATEGORIES)[keyof typeof REPORT_EXPORT_TYPE.CATEGORIES];

// Export Complexity
export type ReportExportTypeComplexity =
  (typeof REPORT_EXPORT_TYPE.COMPLEXITY)[keyof typeof REPORT_EXPORT_TYPE.COMPLEXITY];

// Export Scope
export type ReportExportTypeScope =
  (typeof REPORT_EXPORT_TYPE.SCOPE)[keyof typeof REPORT_EXPORT_TYPE.SCOPE];

// Export Frequency
export type ReportExportTypeFrequency =
  (typeof REPORT_EXPORT_TYPE.FREQUENCY)[keyof typeof REPORT_EXPORT_TYPE.FREQUENCY];

// Export Priority
export type ReportExportTypePriority =
  (typeof REPORT_EXPORT_TYPE.PRIORITY)[keyof typeof REPORT_EXPORT_TYPE.PRIORITY];

// Export Security
export type ReportExportTypeSecurity =
  (typeof REPORT_EXPORT_TYPE.SECURITY)[keyof typeof REPORT_EXPORT_TYPE.SECURITY];

// Export Validation
export type ReportExportTypeValidation =
  (typeof REPORT_EXPORT_TYPE.VALIDATION)[keyof typeof REPORT_EXPORT_TYPE.VALIDATION];

// Export Retention
export type ReportExportTypeRetention =
  (typeof REPORT_EXPORT_TYPE.RETENTION)[keyof typeof REPORT_EXPORT_TYPE.RETENTION];

// Utility Functions
export function reportExportTypeGetCategoryLabel(category: ReportExportTypeCategory): string {
  const labels: Record<ReportExportTypeCategory, string> = {
    [REPORT_EXPORT_TYPE.CATEGORIES.STANDARD]: 'Standard Export',
    [REPORT_EXPORT_TYPE.CATEGORIES.CUSTOM]: 'Custom Export',
    [REPORT_EXPORT_TYPE.CATEGORIES.SCHEDULED]: 'Scheduled Export',
    [REPORT_EXPORT_TYPE.CATEGORIES.ONE_TIME]: 'One-Time Export',
    [REPORT_EXPORT_TYPE.CATEGORIES.BULK]: 'Bulk Export',
    [REPORT_EXPORT_TYPE.CATEGORIES.STREAMING]: 'Streaming Export',
  };
  return labels[category] || 'Unknown Category';
}

export function reportExportTypeGetComplexityLabel(complexity: ReportExportTypeComplexity): string {
  const labels: Record<ReportExportTypeComplexity, string> = {
    [REPORT_EXPORT_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [REPORT_EXPORT_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [REPORT_EXPORT_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [REPORT_EXPORT_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function reportExportTypeGetScopeLabel(scope: ReportExportTypeScope): string {
  const labels: Record<ReportExportTypeScope, string> = {
    [REPORT_EXPORT_TYPE.SCOPE.SINGLE]: 'Single Report',
    [REPORT_EXPORT_TYPE.SCOPE.MULTIPLE]: 'Multiple Reports',
    [REPORT_EXPORT_TYPE.SCOPE.ALL]: 'All Reports',
    [REPORT_EXPORT_TYPE.SCOPE.FILTERED]: 'Filtered Reports',
    [REPORT_EXPORT_TYPE.SCOPE.CUSTOM]: 'Custom Selection',
  };
  return labels[scope] || 'Unknown Scope';
}

export function reportExportTypeGetFrequencyLabel(frequency: ReportExportTypeFrequency): string {
  const labels: Record<ReportExportTypeFrequency, string> = {
    [REPORT_EXPORT_TYPE.FREQUENCY.ONE_TIME]: 'One Time',
    [REPORT_EXPORT_TYPE.FREQUENCY.HOURLY]: 'Hourly',
    [REPORT_EXPORT_TYPE.FREQUENCY.DAILY]: 'Daily',
    [REPORT_EXPORT_TYPE.FREQUENCY.WEEKLY]: 'Weekly',
    [REPORT_EXPORT_TYPE.FREQUENCY.MONTHLY]: 'Monthly',
    [REPORT_EXPORT_TYPE.FREQUENCY.QUARTERLY]: 'Quarterly',
    [REPORT_EXPORT_TYPE.FREQUENCY.ON_DEMAND]: 'On Demand',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function reportExportTypeGetPriorityLabel(priority: ReportExportTypePriority): string {
  const labels: Record<ReportExportTypePriority, string> = {
    [REPORT_EXPORT_TYPE.PRIORITY.LOW]: 'Low',
    [REPORT_EXPORT_TYPE.PRIORITY.MEDIUM]: 'Medium',
    [REPORT_EXPORT_TYPE.PRIORITY.HIGH]: 'High',
    [REPORT_EXPORT_TYPE.PRIORITY.CRITICAL]: 'Critical',
  };
  return labels[priority] || 'Unknown Priority';
}

export function reportExportTypeGetSecurityLabel(security: ReportExportTypeSecurity): string {
  const labels: Record<ReportExportTypeSecurity, string> = {
    [REPORT_EXPORT_TYPE.SECURITY.PUBLIC]: 'Public',
    [REPORT_EXPORT_TYPE.SECURITY.INTERNAL]: 'Internal',
    [REPORT_EXPORT_TYPE.SECURITY.CONFIDENTIAL]: 'Confidential',
    [REPORT_EXPORT_TYPE.SECURITY.RESTRICTED]: 'Restricted',
    [REPORT_EXPORT_TYPE.SECURITY.TOP_SECRET]: 'Top Secret',
  };
  return labels[security] || 'Unknown Security';
}

export function reportExportTypeGetValidationLabel(validation: ReportExportTypeValidation): string {
  const labels: Record<ReportExportTypeValidation, string> = {
    [REPORT_EXPORT_TYPE.VALIDATION.NONE]: 'None',
    [REPORT_EXPORT_TYPE.VALIDATION.BASIC]: 'Basic',
    [REPORT_EXPORT_TYPE.VALIDATION.STRICT]: 'Strict',
    [REPORT_EXPORT_TYPE.VALIDATION.COMPREHENSIVE]: 'Comprehensive',
  };
  return labels[validation] || 'Unknown Validation';
}

export function reportExportTypeGetRetentionLabel(retention: ReportExportTypeRetention): string {
  const labels: Record<ReportExportTypeRetention, string> = {
    [REPORT_EXPORT_TYPE.RETENTION.TEMPORARY]: 'Temporary (24 hours)',
    [REPORT_EXPORT_TYPE.RETENTION.SHORT_TERM]: 'Short Term (7 days)',
    [REPORT_EXPORT_TYPE.RETENTION.MEDIUM_TERM]: 'Medium Term (30 days)',
    [REPORT_EXPORT_TYPE.RETENTION.LONG_TERM]: 'Long Term (90 days)',
    [REPORT_EXPORT_TYPE.RETENTION.PERMANENT]: 'Permanent',
  };
  return labels[retention] || 'Unknown Retention';
}

export function reportExportTypeIsValidCategory(
  category: string
): category is ReportExportTypeCategory {
  return Object.values(REPORT_EXPORT_TYPE.CATEGORIES).includes(
    category as ReportExportTypeCategory
  );
}

export function reportExportTypeIsValidFrequency(
  frequency: string
): frequency is ReportExportTypeFrequency {
  return Object.values(REPORT_EXPORT_TYPE.FREQUENCY).includes(
    frequency as ReportExportTypeFrequency
  );
}
