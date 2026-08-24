/**
 * Support Report Type Constants
 * Types of support reports
 */

export const SUPPORT_REPORT_TYPE = {
  // Report Categories
  CATEGORIES: {
    OPERATIONAL: 'operational',
    PERFORMANCE: 'performance',
    QUALITY: 'quality',
    FINANCIAL: 'financial',
    CUSTOMER: 'customer',
  } as const,

  // Report Scopes
  SCOPES: {
    GLOBAL: 'global',
    DEPARTMENT: 'department',
    TEAM: 'team',
    AGENT: 'agent',
  } as const,

  // Report Data Sources
  DATA_SOURCES: {
    TICKET: 'ticket',
    SURVEY: 'survey',
    CHAT: 'chat',
    FEEDBACK: 'feedback',
    AGENT: 'agent',
    SLA: 'sla',
  } as const,

  // Report Layouts
  LAYOUTS: {
    STANDARD: 'standard',
    DETAILED: 'detailed',
    SUMMARY: 'summary',
    EXECUTIVE: 'executive',
    TECHNICAL: 'technical',
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
    YEARLY: 'yearly',
    BY_AGENT: 'by_agent',
    BY_TEAM: 'by_team',
    BY_CATEGORY: 'by_category',
    BY_STATUS: 'by_status',
    BY_PRIORITY: 'by_priority',
  } as const,
} as const;

// Report Categories
export type SupportReportCategory =
  (typeof SUPPORT_REPORT_TYPE.CATEGORIES)[keyof typeof SUPPORT_REPORT_TYPE.CATEGORIES];

// Report Scopes
export type SupportReportScope =
  (typeof SUPPORT_REPORT_TYPE.SCOPES)[keyof typeof SUPPORT_REPORT_TYPE.SCOPES];

// Data Sources
export type SupportReportDataSource =
  (typeof SUPPORT_REPORT_TYPE.DATA_SOURCES)[keyof typeof SUPPORT_REPORT_TYPE.DATA_SOURCES];

// Report Layouts
export type SupportReportLayout =
  (typeof SUPPORT_REPORT_TYPE.LAYOUTS)[keyof typeof SUPPORT_REPORT_TYPE.LAYOUTS];

// Time Ranges
export type SupportReportTimeRange =
  (typeof SUPPORT_REPORT_TYPE.TIME_RANGES)[keyof typeof SUPPORT_REPORT_TYPE.TIME_RANGES];

// Groupings
export type SupportReportGrouping =
  (typeof SUPPORT_REPORT_TYPE.GROUPINGS)[keyof typeof SUPPORT_REPORT_TYPE.GROUPINGS];

// Utility Functions
export function supportReportTypeGetCategoryLabel(category: SupportReportCategory): string {
  const labels: Record<SupportReportCategory, string> = {
    [SUPPORT_REPORT_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [SUPPORT_REPORT_TYPE.CATEGORIES.PERFORMANCE]: 'Performance',
    [SUPPORT_REPORT_TYPE.CATEGORIES.QUALITY]: 'Quality',
    [SUPPORT_REPORT_TYPE.CATEGORIES.FINANCIAL]: 'Financial',
    [SUPPORT_REPORT_TYPE.CATEGORIES.CUSTOMER]: 'Customer',
  };
  return labels[category] || 'Unknown';
}

export function supportReportTypeGetScopeLabel(scope: SupportReportScope): string {
  const labels: Record<SupportReportScope, string> = {
    [SUPPORT_REPORT_TYPE.SCOPES.GLOBAL]: 'Global',
    [SUPPORT_REPORT_TYPE.SCOPES.DEPARTMENT]: 'Department',
    [SUPPORT_REPORT_TYPE.SCOPES.TEAM]: 'Team',
    [SUPPORT_REPORT_TYPE.SCOPES.AGENT]: 'Agent',
  };
  return labels[scope] || 'Unknown';
}

export function supportReportTypeGetDataSourceLabel(source: SupportReportDataSource): string {
  const labels: Record<SupportReportDataSource, string> = {
    [SUPPORT_REPORT_TYPE.DATA_SOURCES.TICKET]: 'Ticket',
    [SUPPORT_REPORT_TYPE.DATA_SOURCES.SURVEY]: 'Survey',
    [SUPPORT_REPORT_TYPE.DATA_SOURCES.CHAT]: 'Chat',
    [SUPPORT_REPORT_TYPE.DATA_SOURCES.FEEDBACK]: 'Feedback',
    [SUPPORT_REPORT_TYPE.DATA_SOURCES.AGENT]: 'Agent',
    [SUPPORT_REPORT_TYPE.DATA_SOURCES.SLA]: 'SLA',
  };
  return labels[source] || 'Unknown';
}

export function supportReportTypeGetLayoutLabel(layout: SupportReportLayout): string {
  const labels: Record<SupportReportLayout, string> = {
    [SUPPORT_REPORT_TYPE.LAYOUTS.STANDARD]: 'Standard',
    [SUPPORT_REPORT_TYPE.LAYOUTS.DETAILED]: 'Detailed',
    [SUPPORT_REPORT_TYPE.LAYOUTS.SUMMARY]: 'Summary',
    [SUPPORT_REPORT_TYPE.LAYOUTS.EXECUTIVE]: 'Executive',
    [SUPPORT_REPORT_TYPE.LAYOUTS.TECHNICAL]: 'Technical',
  };
  return labels[layout] || 'Unknown';
}

export function supportReportTypeGetTimeRangeLabel(range: SupportReportTimeRange): string {
  const labels: Record<SupportReportTimeRange, string> = {
    [SUPPORT_REPORT_TYPE.TIME_RANGES.TODAY]: 'Today',
    [SUPPORT_REPORT_TYPE.TIME_RANGES.YESTERDAY]: 'Yesterday',
    [SUPPORT_REPORT_TYPE.TIME_RANGES.LAST_7_DAYS]: 'Last 7 Days',
    [SUPPORT_REPORT_TYPE.TIME_RANGES.LAST_30_DAYS]: 'Last 30 Days',
    [SUPPORT_REPORT_TYPE.TIME_RANGES.LAST_90_DAYS]: 'Last 90 Days',
    [SUPPORT_REPORT_TYPE.TIME_RANGES.LAST_6_MONTHS]: 'Last 6 Months',
    [SUPPORT_REPORT_TYPE.TIME_RANGES.LAST_YEAR]: 'Last Year',
    [SUPPORT_REPORT_TYPE.TIME_RANGES.CUSTOM]: 'Custom',
  };
  return labels[range] || 'Unknown';
}

export function supportReportTypeGetGroupingLabel(grouping: SupportReportGrouping): string {
  const labels: Record<SupportReportGrouping, string> = {
    [SUPPORT_REPORT_TYPE.GROUPINGS.NONE]: 'None',
    [SUPPORT_REPORT_TYPE.GROUPINGS.DAILY]: 'Daily',
    [SUPPORT_REPORT_TYPE.GROUPINGS.WEEKLY]: 'Weekly',
    [SUPPORT_REPORT_TYPE.GROUPINGS.MONTHLY]: 'Monthly',
    [SUPPORT_REPORT_TYPE.GROUPINGS.QUARTERLY]: 'Quarterly',
    [SUPPORT_REPORT_TYPE.GROUPINGS.YEARLY]: 'Yearly',
    [SUPPORT_REPORT_TYPE.GROUPINGS.BY_AGENT]: 'By Agent',
    [SUPPORT_REPORT_TYPE.GROUPINGS.BY_TEAM]: 'By Team',
    [SUPPORT_REPORT_TYPE.GROUPINGS.BY_CATEGORY]: 'By Category',
    [SUPPORT_REPORT_TYPE.GROUPINGS.BY_STATUS]: 'By Status',
    [SUPPORT_REPORT_TYPE.GROUPINGS.BY_PRIORITY]: 'By Priority',
  };
  return labels[grouping] || 'Unknown';
}
