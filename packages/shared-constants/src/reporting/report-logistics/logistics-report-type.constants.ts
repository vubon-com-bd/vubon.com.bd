/**
 * Logistics Report Type Constants
 * Types of logistics reports
 */

export const LOGISTICS_REPORT_TYPE = {
  // Report Categories
  CATEGORIES: {
    OPERATIONAL: 'operational',
    FINANCIAL: 'financial',
    PERFORMANCE: 'performance',
    QUALITY: 'quality',
    CUSTOMER: 'customer',
  } as const,

  // Report Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    WAREHOUSE: 'warehouse',
    VEHICLE: 'vehicle',
    DRIVER: 'driver',
    ROUTE: 'route',
    COURIER: 'courier',
  } as const,

  // Report Data Sources
  DATA_SOURCES: {
    SHIPMENT: 'shipment',
    DELIVERY: 'delivery',
    VEHICLE: 'vehicle',
    DRIVER: 'driver',
    WAREHOUSE: 'warehouse',
    COST: 'cost',
    CUSTOMER: 'customer',
    COURIER: 'courier',
    ROUTE: 'route',
    FUEL: 'fuel',
    MAINTENANCE: 'maintenance',
  } as const,

  // Report Layouts
  LAYOUTS: {
    STANDARD: 'standard',
    DETAILED: 'detailed',
    SUMMARY: 'summary',
    EXECUTIVE: 'executive',
    TECHNICAL: 'technical',
    CUSTOM: 'custom',
  } as const,

  // Report Groupings
  GROUPINGS: {
    NONE: 'none',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    YEARLY: 'yearly',
    BY_REGION: 'by_region',
    BY_WAREHOUSE: 'by_warehouse',
    BY_VEHICLE: 'by_vehicle',
    BY_DRIVER: 'by_driver',
    BY_ROUTE: 'by_route',
    BY_COURIER: 'by_courier',
  } as const,

  // Time Ranges
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
} as const;

// Report Categories
export type LogisticsReportTypeCategory =
  (typeof LOGISTICS_REPORT_TYPE.CATEGORIES)[keyof typeof LOGISTICS_REPORT_TYPE.CATEGORIES];

// Report Scopes
export type LogisticsReportTypeScope =
  (typeof LOGISTICS_REPORT_TYPE.SCOPES)[keyof typeof LOGISTICS_REPORT_TYPE.SCOPES];

// Data Sources
export type LogisticsReportTypeDataSource =
  (typeof LOGISTICS_REPORT_TYPE.DATA_SOURCES)[keyof typeof LOGISTICS_REPORT_TYPE.DATA_SOURCES];

// Report Layouts
export type LogisticsReportTypeLayout =
  (typeof LOGISTICS_REPORT_TYPE.LAYOUTS)[keyof typeof LOGISTICS_REPORT_TYPE.LAYOUTS];

// Report Groupings
export type LogisticsReportTypeGrouping =
  (typeof LOGISTICS_REPORT_TYPE.GROUPINGS)[keyof typeof LOGISTICS_REPORT_TYPE.GROUPINGS];

// Time Ranges
export type LogisticsReportTypeTimeRange =
  (typeof LOGISTICS_REPORT_TYPE.TIME_RANGES)[keyof typeof LOGISTICS_REPORT_TYPE.TIME_RANGES];

// Utility Functions
export function logisticsReportTypeGetCategoryLabel(category: LogisticsReportTypeCategory): string {
  const labels: Record<LogisticsReportTypeCategory, string> = {
    [LOGISTICS_REPORT_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [LOGISTICS_REPORT_TYPE.CATEGORIES.FINANCIAL]: 'Financial',
    [LOGISTICS_REPORT_TYPE.CATEGORIES.PERFORMANCE]: 'Performance',
    [LOGISTICS_REPORT_TYPE.CATEGORIES.QUALITY]: 'Quality',
    [LOGISTICS_REPORT_TYPE.CATEGORIES.CUSTOMER]: 'Customer',
  };
  return labels[category] || 'Unknown';
}

export function logisticsReportTypeGetScopeLabel(scope: LogisticsReportTypeScope): string {
  const labels: Record<LogisticsReportTypeScope, string> = {
    [LOGISTICS_REPORT_TYPE.SCOPES.GLOBAL]: 'Global',
    [LOGISTICS_REPORT_TYPE.SCOPES.REGIONAL]: 'Regional',
    [LOGISTICS_REPORT_TYPE.SCOPES.WAREHOUSE]: 'Warehouse',
    [LOGISTICS_REPORT_TYPE.SCOPES.VEHICLE]: 'Vehicle',
    [LOGISTICS_REPORT_TYPE.SCOPES.DRIVER]: 'Driver',
    [LOGISTICS_REPORT_TYPE.SCOPES.ROUTE]: 'Route',
    [LOGISTICS_REPORT_TYPE.SCOPES.COURIER]: 'Courier',
  };
  return labels[scope] || 'Unknown';
}

export function logisticsReportTypeGetDataSourceLabel(
  source: LogisticsReportTypeDataSource
): string {
  const labels: Record<LogisticsReportTypeDataSource, string> = {
    [LOGISTICS_REPORT_TYPE.DATA_SOURCES.SHIPMENT]: 'Shipment',
    [LOGISTICS_REPORT_TYPE.DATA_SOURCES.DELIVERY]: 'Delivery',
    [LOGISTICS_REPORT_TYPE.DATA_SOURCES.VEHICLE]: 'Vehicle',
    [LOGISTICS_REPORT_TYPE.DATA_SOURCES.DRIVER]: 'Driver',
    [LOGISTICS_REPORT_TYPE.DATA_SOURCES.WAREHOUSE]: 'Warehouse',
    [LOGISTICS_REPORT_TYPE.DATA_SOURCES.COST]: 'Cost',
    [LOGISTICS_REPORT_TYPE.DATA_SOURCES.CUSTOMER]: 'Customer',
    [LOGISTICS_REPORT_TYPE.DATA_SOURCES.COURIER]: 'Courier',
    [LOGISTICS_REPORT_TYPE.DATA_SOURCES.ROUTE]: 'Route',
    [LOGISTICS_REPORT_TYPE.DATA_SOURCES.FUEL]: 'Fuel',
    [LOGISTICS_REPORT_TYPE.DATA_SOURCES.MAINTENANCE]: 'Maintenance',
  };
  return labels[source] || 'Unknown';
}

export function logisticsReportTypeGetLayoutLabel(layout: LogisticsReportTypeLayout): string {
  const labels: Record<LogisticsReportTypeLayout, string> = {
    [LOGISTICS_REPORT_TYPE.LAYOUTS.STANDARD]: 'Standard',
    [LOGISTICS_REPORT_TYPE.LAYOUTS.DETAILED]: 'Detailed',
    [LOGISTICS_REPORT_TYPE.LAYOUTS.SUMMARY]: 'Summary',
    [LOGISTICS_REPORT_TYPE.LAYOUTS.EXECUTIVE]: 'Executive',
    [LOGISTICS_REPORT_TYPE.LAYOUTS.TECHNICAL]: 'Technical',
    [LOGISTICS_REPORT_TYPE.LAYOUTS.CUSTOM]: 'Custom',
  };
  return labels[layout] || 'Unknown';
}

export function logisticsReportTypeGetGroupingLabel(grouping: LogisticsReportTypeGrouping): string {
  const labels: Record<LogisticsReportTypeGrouping, string> = {
    [LOGISTICS_REPORT_TYPE.GROUPINGS.NONE]: 'None',
    [LOGISTICS_REPORT_TYPE.GROUPINGS.DAILY]: 'Daily',
    [LOGISTICS_REPORT_TYPE.GROUPINGS.WEEKLY]: 'Weekly',
    [LOGISTICS_REPORT_TYPE.GROUPINGS.MONTHLY]: 'Monthly',
    [LOGISTICS_REPORT_TYPE.GROUPINGS.QUARTERLY]: 'Quarterly',
    [LOGISTICS_REPORT_TYPE.GROUPINGS.YEARLY]: 'Yearly',
    [LOGISTICS_REPORT_TYPE.GROUPINGS.BY_REGION]: 'By Region',
    [LOGISTICS_REPORT_TYPE.GROUPINGS.BY_WAREHOUSE]: 'By Warehouse',
    [LOGISTICS_REPORT_TYPE.GROUPINGS.BY_VEHICLE]: 'By Vehicle',
    [LOGISTICS_REPORT_TYPE.GROUPINGS.BY_DRIVER]: 'By Driver',
    [LOGISTICS_REPORT_TYPE.GROUPINGS.BY_ROUTE]: 'By Route',
    [LOGISTICS_REPORT_TYPE.GROUPINGS.BY_COURIER]: 'By Courier',
  };
  return labels[grouping] || 'Unknown';
}

export function logisticsReportTypeGetTimeRangeLabel(range: LogisticsReportTypeTimeRange): string {
  const labels: Record<LogisticsReportTypeTimeRange, string> = {
    [LOGISTICS_REPORT_TYPE.TIME_RANGES.TODAY]: 'Today',
    [LOGISTICS_REPORT_TYPE.TIME_RANGES.YESTERDAY]: 'Yesterday',
    [LOGISTICS_REPORT_TYPE.TIME_RANGES.LAST_7_DAYS]: 'Last 7 Days',
    [LOGISTICS_REPORT_TYPE.TIME_RANGES.LAST_30_DAYS]: 'Last 30 Days',
    [LOGISTICS_REPORT_TYPE.TIME_RANGES.LAST_90_DAYS]: 'Last 90 Days',
    [LOGISTICS_REPORT_TYPE.TIME_RANGES.LAST_6_MONTHS]: 'Last 6 Months',
    [LOGISTICS_REPORT_TYPE.TIME_RANGES.LAST_YEAR]: 'Last Year',
    [LOGISTICS_REPORT_TYPE.TIME_RANGES.CUSTOM]: 'Custom',
  };
  return labels[range] || 'Unknown';
}
