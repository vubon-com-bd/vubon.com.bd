/**
 * Report Email Type Constants
 * Types and classifications of email reports
 */

export const REPORT_EMAIL_TYPE = {
  // Email Categories
  CATEGORIES: {
    STANDARD: 'standard',
    CUSTOM: 'custom',
    TEMPLATED: 'templated',
    DYNAMIC: 'dynamic',
    PERSONALIZED: 'personalized',
    BULK: 'bulk',
  } as const,

  // Email Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  } as const,

  // Email Scope
  SCOPE: {
    SINGLE: 'single',
    MULTIPLE: 'multiple',
    ALL: 'all',
    FILTERED: 'filtered',
    CUSTOM: 'custom',
  } as const,

  // Email Frequency
  FREQUENCY: {
    ONE_TIME: 'one_time',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ON_DEMAND: 'on_demand',
  } as const,

  // Email Audience
  AUDIENCE: {
    EXECUTIVES: 'executives',
    MANAGERS: 'managers',
    ANALYSTS: 'analysts',
    TEAM: 'team',
    DEPARTMENT: 'department',
    ORGANIZATION: 'organization',
    CLIENTS: 'clients',
    PARTNERS: 'partners',
    CUSTOM: 'custom',
  } as const,

  // Email Importance
  IMPORTANCE: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Email Sensitivity
  SENSITIVITY: {
    PUBLIC: 'public',
    INTERNAL: 'internal',
    CONFIDENTIAL: 'confidential',
    RESTRICTED: 'restricted',
    TOP_SECRET: 'top_secret',
  } as const,

  // Email Validation
  VALIDATION: {
    NONE: 'none',
    BASIC: 'basic',
    STRICT: 'strict',
    COMPREHENSIVE: 'comprehensive',
  } as const,

  // Email Retention
  RETENTION: {
    TEMPORARY: 'temporary',
    SHORT_TERM: 'short_term',
    MEDIUM_TERM: 'medium_term',
    LONG_TERM: 'long_term',
    PERMANENT: 'permanent',
  } as const,
} as const;

// Email Categories
export type ReportEmailTypeCategory =
  (typeof REPORT_EMAIL_TYPE.CATEGORIES)[keyof typeof REPORT_EMAIL_TYPE.CATEGORIES];

// Email Complexity
export type ReportEmailTypeComplexity =
  (typeof REPORT_EMAIL_TYPE.COMPLEXITY)[keyof typeof REPORT_EMAIL_TYPE.COMPLEXITY];

// Email Scope
export type ReportEmailTypeScope =
  (typeof REPORT_EMAIL_TYPE.SCOPE)[keyof typeof REPORT_EMAIL_TYPE.SCOPE];

// Email Frequency
export type ReportEmailTypeFrequency =
  (typeof REPORT_EMAIL_TYPE.FREQUENCY)[keyof typeof REPORT_EMAIL_TYPE.FREQUENCY];

// Email Audience
export type ReportEmailTypeAudience =
  (typeof REPORT_EMAIL_TYPE.AUDIENCE)[keyof typeof REPORT_EMAIL_TYPE.AUDIENCE];

// Email Importance
export type ReportEmailTypeImportance =
  (typeof REPORT_EMAIL_TYPE.IMPORTANCE)[keyof typeof REPORT_EMAIL_TYPE.IMPORTANCE];

// Email Sensitivity
export type ReportEmailTypeSensitivity =
  (typeof REPORT_EMAIL_TYPE.SENSITIVITY)[keyof typeof REPORT_EMAIL_TYPE.SENSITIVITY];

// Email Validation
export type ReportEmailTypeValidation =
  (typeof REPORT_EMAIL_TYPE.VALIDATION)[keyof typeof REPORT_EMAIL_TYPE.VALIDATION];

// Email Retention
export type ReportEmailTypeRetention =
  (typeof REPORT_EMAIL_TYPE.RETENTION)[keyof typeof REPORT_EMAIL_TYPE.RETENTION];

// Utility Functions
export function reportEmailTypeGetCategoryLabel(category: ReportEmailTypeCategory): string {
  const labels: Record<ReportEmailTypeCategory, string> = {
    [REPORT_EMAIL_TYPE.CATEGORIES.STANDARD]: 'Standard Email',
    [REPORT_EMAIL_TYPE.CATEGORIES.CUSTOM]: 'Custom Email',
    [REPORT_EMAIL_TYPE.CATEGORIES.TEMPLATED]: 'Templated Email',
    [REPORT_EMAIL_TYPE.CATEGORIES.DYNAMIC]: 'Dynamic Email',
    [REPORT_EMAIL_TYPE.CATEGORIES.PERSONALIZED]: 'Personalized Email',
    [REPORT_EMAIL_TYPE.CATEGORIES.BULK]: 'Bulk Email',
  };
  return labels[category] || 'Unknown Category';
}

export function reportEmailTypeGetComplexityLabel(complexity: ReportEmailTypeComplexity): string {
  const labels: Record<ReportEmailTypeComplexity, string> = {
    [REPORT_EMAIL_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [REPORT_EMAIL_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [REPORT_EMAIL_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [REPORT_EMAIL_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function reportEmailTypeGetScopeLabel(scope: ReportEmailTypeScope): string {
  const labels: Record<ReportEmailTypeScope, string> = {
    [REPORT_EMAIL_TYPE.SCOPE.SINGLE]: 'Single Report',
    [REPORT_EMAIL_TYPE.SCOPE.MULTIPLE]: 'Multiple Reports',
    [REPORT_EMAIL_TYPE.SCOPE.ALL]: 'All Reports',
    [REPORT_EMAIL_TYPE.SCOPE.FILTERED]: 'Filtered Reports',
    [REPORT_EMAIL_TYPE.SCOPE.CUSTOM]: 'Custom Selection',
  };
  return labels[scope] || 'Unknown Scope';
}

export function reportEmailTypeGetFrequencyLabel(frequency: ReportEmailTypeFrequency): string {
  const labels: Record<ReportEmailTypeFrequency, string> = {
    [REPORT_EMAIL_TYPE.FREQUENCY.ONE_TIME]: 'One Time',
    [REPORT_EMAIL_TYPE.FREQUENCY.HOURLY]: 'Hourly',
    [REPORT_EMAIL_TYPE.FREQUENCY.DAILY]: 'Daily',
    [REPORT_EMAIL_TYPE.FREQUENCY.WEEKLY]: 'Weekly',
    [REPORT_EMAIL_TYPE.FREQUENCY.BI_WEEKLY]: 'Bi-Weekly',
    [REPORT_EMAIL_TYPE.FREQUENCY.MONTHLY]: 'Monthly',
    [REPORT_EMAIL_TYPE.FREQUENCY.QUARTERLY]: 'Quarterly',
    [REPORT_EMAIL_TYPE.FREQUENCY.ON_DEMAND]: 'On Demand',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function reportEmailTypeGetAudienceLabel(audience: ReportEmailTypeAudience): string {
  const labels: Record<ReportEmailTypeAudience, string> = {
    [REPORT_EMAIL_TYPE.AUDIENCE.EXECUTIVES]: 'Executives',
    [REPORT_EMAIL_TYPE.AUDIENCE.MANAGERS]: 'Managers',
    [REPORT_EMAIL_TYPE.AUDIENCE.ANALYSTS]: 'Analysts',
    [REPORT_EMAIL_TYPE.AUDIENCE.TEAM]: 'Team',
    [REPORT_EMAIL_TYPE.AUDIENCE.DEPARTMENT]: 'Department',
    [REPORT_EMAIL_TYPE.AUDIENCE.ORGANIZATION]: 'Organization',
    [REPORT_EMAIL_TYPE.AUDIENCE.CLIENTS]: 'Clients',
    [REPORT_EMAIL_TYPE.AUDIENCE.PARTNERS]: 'Partners',
    [REPORT_EMAIL_TYPE.AUDIENCE.CUSTOM]: 'Custom',
  };
  return labels[audience] || 'Unknown Audience';
}

export function reportEmailTypeGetImportanceLabel(importance: ReportEmailTypeImportance): string {
  const labels: Record<ReportEmailTypeImportance, string> = {
    [REPORT_EMAIL_TYPE.IMPORTANCE.LOW]: 'Low',
    [REPORT_EMAIL_TYPE.IMPORTANCE.MEDIUM]: 'Medium',
    [REPORT_EMAIL_TYPE.IMPORTANCE.HIGH]: 'High',
    [REPORT_EMAIL_TYPE.IMPORTANCE.CRITICAL]: 'Critical',
  };
  return labels[importance] || 'Unknown Importance';
}

export function reportEmailTypeGetSensitivityLabel(
  sensitivity: ReportEmailTypeSensitivity
): string {
  const labels: Record<ReportEmailTypeSensitivity, string> = {
    [REPORT_EMAIL_TYPE.SENSITIVITY.PUBLIC]: 'Public',
    [REPORT_EMAIL_TYPE.SENSITIVITY.INTERNAL]: 'Internal',
    [REPORT_EMAIL_TYPE.SENSITIVITY.CONFIDENTIAL]: 'Confidential',
    [REPORT_EMAIL_TYPE.SENSITIVITY.RESTRICTED]: 'Restricted',
    [REPORT_EMAIL_TYPE.SENSITIVITY.TOP_SECRET]: 'Top Secret',
  };
  return labels[sensitivity] || 'Unknown Sensitivity';
}

export function reportEmailTypeGetValidationLabel(validation: ReportEmailTypeValidation): string {
  const labels: Record<ReportEmailTypeValidation, string> = {
    [REPORT_EMAIL_TYPE.VALIDATION.NONE]: 'None',
    [REPORT_EMAIL_TYPE.VALIDATION.BASIC]: 'Basic',
    [REPORT_EMAIL_TYPE.VALIDATION.STRICT]: 'Strict',
    [REPORT_EMAIL_TYPE.VALIDATION.COMPREHENSIVE]: 'Comprehensive',
  };
  return labels[validation] || 'Unknown Validation';
}

export function reportEmailTypeGetRetentionLabel(retention: ReportEmailTypeRetention): string {
  const labels: Record<ReportEmailTypeRetention, string> = {
    [REPORT_EMAIL_TYPE.RETENTION.TEMPORARY]: 'Temporary (24 hours)',
    [REPORT_EMAIL_TYPE.RETENTION.SHORT_TERM]: 'Short Term (7 days)',
    [REPORT_EMAIL_TYPE.RETENTION.MEDIUM_TERM]: 'Medium Term (30 days)',
    [REPORT_EMAIL_TYPE.RETENTION.LONG_TERM]: 'Long Term (90 days)',
    [REPORT_EMAIL_TYPE.RETENTION.PERMANENT]: 'Permanent',
  };
  return labels[retention] || 'Unknown Retention';
}

export function reportEmailTypeIsValidCategory(
  category: string
): category is ReportEmailTypeCategory {
  return Object.values(REPORT_EMAIL_TYPE.CATEGORIES).includes(category as ReportEmailTypeCategory);
}

export function reportEmailTypeIsValidFrequency(
  frequency: string
): frequency is ReportEmailTypeFrequency {
  return Object.values(REPORT_EMAIL_TYPE.FREQUENCY).includes(frequency as ReportEmailTypeFrequency);
}

export function reportEmailTypeIsValidAudience(
  audience: string
): audience is ReportEmailTypeAudience {
  return Object.values(REPORT_EMAIL_TYPE.AUDIENCE).includes(audience as ReportEmailTypeAudience);
}
