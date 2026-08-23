/**
 * Report Filter Type Constants
 * Types and classifications of filters
 */

export const REPORT_FILTER_TYPE = {
  // Filter Categories
  CATEGORIES: {
    BASIC: 'basic',
    ADVANCED: 'advanced',
    CUSTOM: 'custom',
    SYSTEM: 'system',
    USER: 'user',
    DYNAMIC: 'dynamic',
  } as const,

  // Filter Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  } as const,

  // Filter Scope
  SCOPE: {
    GLOBAL: 'global',
    DASHBOARD: 'dashboard',
    REPORT: 'report',
    WIDGET: 'widget',
    USER: 'user',
    TEMPORARY: 'temporary',
  } as const,

  // Filter Persistence
  PERSISTENCE: {
    SESSION: 'session',
    LOCAL: 'local',
    DATABASE: 'database',
    CACHE: 'cache',
    NONE: 'none',
  } as const,

  // Filter Performance
  PERFORMANCE: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    CRITICAL: 'critical',
  } as const,

  // Filter Security
  SECURITY: {
    PUBLIC: 'public',
    RESTRICTED: 'restricted',
    CONFIDENTIAL: 'confidential',
    SECRET: 'secret',
  } as const,

  // Filter Validation
  VALIDATION: {
    NONE: 'none',
    BASIC: 'basic',
    STRICT: 'strict',
    CUSTOM: 'custom',
  } as const,
} as const;

// Filter Categories
export type ReportFilterTypeCategory =
  (typeof REPORT_FILTER_TYPE.CATEGORIES)[keyof typeof REPORT_FILTER_TYPE.CATEGORIES];

// Filter Complexity
export type ReportFilterTypeComplexity =
  (typeof REPORT_FILTER_TYPE.COMPLEXITY)[keyof typeof REPORT_FILTER_TYPE.COMPLEXITY];

// Filter Scope
export type ReportFilterTypeScope =
  (typeof REPORT_FILTER_TYPE.SCOPE)[keyof typeof REPORT_FILTER_TYPE.SCOPE];

// Filter Persistence
export type ReportFilterTypePersistence =
  (typeof REPORT_FILTER_TYPE.PERSISTENCE)[keyof typeof REPORT_FILTER_TYPE.PERSISTENCE];

// Filter Performance
export type ReportFilterTypePerformance =
  (typeof REPORT_FILTER_TYPE.PERFORMANCE)[keyof typeof REPORT_FILTER_TYPE.PERFORMANCE];

// Filter Security
export type ReportFilterTypeSecurity =
  (typeof REPORT_FILTER_TYPE.SECURITY)[keyof typeof REPORT_FILTER_TYPE.SECURITY];

// Filter Validation
export type ReportFilterTypeValidation =
  (typeof REPORT_FILTER_TYPE.VALIDATION)[keyof typeof REPORT_FILTER_TYPE.VALIDATION];

// Utility Functions
export function reportFilterTypeGetCategoryLabel(category: ReportFilterTypeCategory): string {
  const labels: Record<ReportFilterTypeCategory, string> = {
    [REPORT_FILTER_TYPE.CATEGORIES.BASIC]: 'Basic Filter',
    [REPORT_FILTER_TYPE.CATEGORIES.ADVANCED]: 'Advanced Filter',
    [REPORT_FILTER_TYPE.CATEGORIES.CUSTOM]: 'Custom Filter',
    [REPORT_FILTER_TYPE.CATEGORIES.SYSTEM]: 'System Filter',
    [REPORT_FILTER_TYPE.CATEGORIES.USER]: 'User Filter',
    [REPORT_FILTER_TYPE.CATEGORIES.DYNAMIC]: 'Dynamic Filter',
  };
  return labels[category] || 'Unknown Category';
}

export function reportFilterTypeGetComplexityLabel(complexity: ReportFilterTypeComplexity): string {
  const labels: Record<ReportFilterTypeComplexity, string> = {
    [REPORT_FILTER_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [REPORT_FILTER_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [REPORT_FILTER_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [REPORT_FILTER_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function reportFilterTypeGetScopeLabel(scope: ReportFilterTypeScope): string {
  const labels: Record<ReportFilterTypeScope, string> = {
    [REPORT_FILTER_TYPE.SCOPE.GLOBAL]: 'Global',
    [REPORT_FILTER_TYPE.SCOPE.DASHBOARD]: 'Dashboard',
    [REPORT_FILTER_TYPE.SCOPE.REPORT]: 'Report',
    [REPORT_FILTER_TYPE.SCOPE.WIDGET]: 'Widget',
    [REPORT_FILTER_TYPE.SCOPE.USER]: 'User',
    [REPORT_FILTER_TYPE.SCOPE.TEMPORARY]: 'Temporary',
  };
  return labels[scope] || 'Unknown Scope';
}

export function reportFilterTypeGetPersistenceLabel(
  persistence: ReportFilterTypePersistence
): string {
  const labels: Record<ReportFilterTypePersistence, string> = {
    [REPORT_FILTER_TYPE.PERSISTENCE.SESSION]: 'Session',
    [REPORT_FILTER_TYPE.PERSISTENCE.LOCAL]: 'Local',
    [REPORT_FILTER_TYPE.PERSISTENCE.DATABASE]: 'Database',
    [REPORT_FILTER_TYPE.PERSISTENCE.CACHE]: 'Cache',
    [REPORT_FILTER_TYPE.PERSISTENCE.NONE]: 'None',
  };
  return labels[persistence] || 'Unknown Persistence';
}

export function reportFilterTypeGetPerformanceLabel(
  performance: ReportFilterTypePerformance
): string {
  const labels: Record<ReportFilterTypePerformance, string> = {
    [REPORT_FILTER_TYPE.PERFORMANCE.LOW]: 'Low',
    [REPORT_FILTER_TYPE.PERFORMANCE.MEDIUM]: 'Medium',
    [REPORT_FILTER_TYPE.PERFORMANCE.HIGH]: 'High',
    [REPORT_FILTER_TYPE.PERFORMANCE.CRITICAL]: 'Critical',
  };
  return labels[performance] || 'Unknown Performance';
}

export function reportFilterTypeGetSecurityLabel(security: ReportFilterTypeSecurity): string {
  const labels: Record<ReportFilterTypeSecurity, string> = {
    [REPORT_FILTER_TYPE.SECURITY.PUBLIC]: 'Public',
    [REPORT_FILTER_TYPE.SECURITY.RESTRICTED]: 'Restricted',
    [REPORT_FILTER_TYPE.SECURITY.CONFIDENTIAL]: 'Confidential',
    [REPORT_FILTER_TYPE.SECURITY.SECRET]: 'Secret',
  };
  return labels[security] || 'Unknown Security Level';
}

export function reportFilterTypeGetValidationLabel(validation: ReportFilterTypeValidation): string {
  const labels: Record<ReportFilterTypeValidation, string> = {
    [REPORT_FILTER_TYPE.VALIDATION.NONE]: 'None',
    [REPORT_FILTER_TYPE.VALIDATION.BASIC]: 'Basic',
    [REPORT_FILTER_TYPE.VALIDATION.STRICT]: 'Strict',
    [REPORT_FILTER_TYPE.VALIDATION.CUSTOM]: 'Custom',
  };
  return labels[validation] || 'Unknown Validation';
}

export function reportFilterTypeIsValidCategory(
  category: string
): category is ReportFilterTypeCategory {
  return Object.values(REPORT_FILTER_TYPE.CATEGORIES).includes(
    category as ReportFilterTypeCategory
  );
}

export function reportFilterTypeIsValidScope(scope: string): scope is ReportFilterTypeScope {
  return Object.values(REPORT_FILTER_TYPE.SCOPE).includes(scope as ReportFilterTypeScope);
}
