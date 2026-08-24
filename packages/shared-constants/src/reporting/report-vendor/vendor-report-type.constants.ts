/**
 * Vendor Report Type Constants
 * Types of vendor reports
 */

export const VENDOR_REPORT_TYPE = {
  // Report Categories
  CATEGORIES: {
    SALES: 'sales',
    FINANCIAL: 'financial',
    OPERATIONAL: 'operational',
    ANALYTICAL: 'analytical',
    CUSTOM: 'custom',
  } as const,

  // Report Scopes
  SCOPES: {
    GLOBAL: 'global',
    VENDOR: 'vendor',
    TEAM: 'team',
    PRODUCT: 'product',
    PERIOD: 'period',
  } as const,

  // Report Data Sources
  SOURCES: {
    DATABASE: 'database',
    API: 'api',
    EXTERNAL: 'external',
    CACHE: 'cache',
  } as const,

  // Report Time Ranges
  TIME_RANGES: {
    TODAY: 'today',
    YESTERDAY: 'yesterday',
    LAST_7_DAYS: 'last_7_days',
    LAST_30_DAYS: 'last_30_days',
    LAST_90_DAYS: 'last_90_days',
    LAST_6_MONTHS: 'last_6_months',
    LAST_YEAR: 'last_year',
    CUSTOM: 'custom',
  } as const,

  // Report Groupings
  GROUPINGS: {
    NONE: 'none',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    BY_PRODUCT: 'by_product',
    BY_CATEGORY: 'by_category',
    BY_STATUS: 'by_status',
  } as const,
} as const;

// Report Categories
export type VendorReportTypeCategory =
  (typeof VENDOR_REPORT_TYPE.CATEGORIES)[keyof typeof VENDOR_REPORT_TYPE.CATEGORIES];

// Report Scopes
export type VendorReportTypeScope =
  (typeof VENDOR_REPORT_TYPE.SCOPES)[keyof typeof VENDOR_REPORT_TYPE.SCOPES];

// Report Data Sources
export type VendorReportTypeSource =
  (typeof VENDOR_REPORT_TYPE.SOURCES)[keyof typeof VENDOR_REPORT_TYPE.SOURCES];

// Report Time Ranges
export type VendorReportTypeTimeRange =
  (typeof VENDOR_REPORT_TYPE.TIME_RANGES)[keyof typeof VENDOR_REPORT_TYPE.TIME_RANGES];

// Report Groupings
export type VendorReportTypeGrouping =
  (typeof VENDOR_REPORT_TYPE.GROUPINGS)[keyof typeof VENDOR_REPORT_TYPE.GROUPINGS];

// Utility Functions
export function vendorReportTypeGetCategoryLabel(category: VendorReportTypeCategory): string {
  const labels: Record<VendorReportTypeCategory, string> = {
    [VENDOR_REPORT_TYPE.CATEGORIES.SALES]: 'Sales',
    [VENDOR_REPORT_TYPE.CATEGORIES.FINANCIAL]: 'Financial',
    [VENDOR_REPORT_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [VENDOR_REPORT_TYPE.CATEGORIES.ANALYTICAL]: 'Analytical',
    [VENDOR_REPORT_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown';
}

export function vendorReportTypeGetScopeLabel(scope: VendorReportTypeScope): string {
  const labels: Record<VendorReportTypeScope, string> = {
    [VENDOR_REPORT_TYPE.SCOPES.GLOBAL]: 'Global',
    [VENDOR_REPORT_TYPE.SCOPES.VENDOR]: 'Vendor',
    [VENDOR_REPORT_TYPE.SCOPES.TEAM]: 'Team',
    [VENDOR_REPORT_TYPE.SCOPES.PRODUCT]: 'Product',
    [VENDOR_REPORT_TYPE.SCOPES.PERIOD]: 'Period',
  };
  return labels[scope] || 'Unknown';
}

export function vendorReportTypeGetSourceLabel(source: VendorReportTypeSource): string {
  const labels: Record<VendorReportTypeSource, string> = {
    [VENDOR_REPORT_TYPE.SOURCES.DATABASE]: 'Database',
    [VENDOR_REPORT_TYPE.SOURCES.API]: 'API',
    [VENDOR_REPORT_TYPE.SOURCES.EXTERNAL]: 'External',
    [VENDOR_REPORT_TYPE.SOURCES.CACHE]: 'Cache',
  };
  return labels[source] || 'Unknown';
}

export function vendorReportTypeGetTimeRangeLabel(range: VendorReportTypeTimeRange): string {
  const labels: Record<VendorReportTypeTimeRange, string> = {
    [VENDOR_REPORT_TYPE.TIME_RANGES.TODAY]: 'Today',
    [VENDOR_REPORT_TYPE.TIME_RANGES.YESTERDAY]: 'Yesterday',
    [VENDOR_REPORT_TYPE.TIME_RANGES.LAST_7_DAYS]: 'Last 7 Days',
    [VENDOR_REPORT_TYPE.TIME_RANGES.LAST_30_DAYS]: 'Last 30 Days',
    [VENDOR_REPORT_TYPE.TIME_RANGES.LAST_90_DAYS]: 'Last 90 Days',
    [VENDOR_REPORT_TYPE.TIME_RANGES.LAST_6_MONTHS]: 'Last 6 Months',
    [VENDOR_REPORT_TYPE.TIME_RANGES.LAST_YEAR]: 'Last Year',
    [VENDOR_REPORT_TYPE.TIME_RANGES.CUSTOM]: 'Custom',
  };
  return labels[range] || 'Unknown';
}

export function vendorReportTypeGetGroupingLabel(grouping: VendorReportTypeGrouping): string {
  const labels: Record<VendorReportTypeGrouping, string> = {
    [VENDOR_REPORT_TYPE.GROUPINGS.NONE]: 'None',
    [VENDOR_REPORT_TYPE.GROUPINGS.DAILY]: 'Daily',
    [VENDOR_REPORT_TYPE.GROUPINGS.WEEKLY]: 'Weekly',
    [VENDOR_REPORT_TYPE.GROUPINGS.MONTHLY]: 'Monthly',
    [VENDOR_REPORT_TYPE.GROUPINGS.QUARTERLY]: 'Quarterly',
    [VENDOR_REPORT_TYPE.GROUPINGS.BY_PRODUCT]: 'By Product',
    [VENDOR_REPORT_TYPE.GROUPINGS.BY_CATEGORY]: 'By Category',
    [VENDOR_REPORT_TYPE.GROUPINGS.BY_STATUS]: 'By Status',
  };
  return labels[grouping] || 'Unknown';
}
