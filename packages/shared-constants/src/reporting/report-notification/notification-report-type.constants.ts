/**
 * Notification Report Type Constants
 * Type definitions and classifications for notification reports
 */

export const NOTIFICATIONREPORT_TYPE = {
  // Report Categories
  CATEGORIES: {
    OPERATIONAL: 'operational',
    ANALYTICAL: 'analytical',
    STRATEGIC: 'strategic',
    TACTICAL: 'tactical',
    EXECUTIVE: 'executive',
    COMPLIANCE: 'compliance',
    FINANCIAL: 'financial',
    MARKETING: 'marketing',
    CUSTOM: 'custom',
  } as const,

  // Report Sub-Types
  SUB_TYPES: {
    // Operational
    DELIVERY_REPORT: 'delivery_report',
    PERFORMANCE_REPORT: 'performance_report',
    STATUS_REPORT: 'status_report',

    // Analytical
    TREND_REPORT: 'trend_report',
    PATTERN_REPORT: 'pattern_report',
    INSIGHT_REPORT: 'insight_report',

    // Strategic
    EXECUTIVE_SUMMARY: 'executive_summary',
    STRATEGIC_OVERVIEW: 'strategic_overview',
    BOARD_REPORT: 'board_report',

    // Tactical
    CAMPAIGN_REPORT: 'campaign_report',
    CHANNEL_REPORT: 'channel_report',
    CONTENT_REPORT: 'content_report',

    // Executive
    KPI_DASHBOARD: 'kpi_dashboard',
    METRIC_DASHBOARD: 'metric_dashboard',
    SCORECARD: 'scorecard',

    // Compliance
    AUDIT_REPORT: 'audit_report',
    COMPLIANCE_REPORT: 'compliance_report',

    // Financial
    COST_REPORT: 'cost_report',
    ROI_REPORT: 'roi_report',
    REVENUE_REPORT: 'revenue_report',

    // Marketing
    CAMPAIGN_PERFORMANCE: 'campaign_performance',
    CHANNEL_PERFORMANCE: 'channel_performance',
    ENGAGEMENT_REPORT: 'engagement_report',
  } as const,

  // Report Scope
  SCOPE: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
  } as const,

  // Report Level
  LEVEL: {
    EXECUTIVE: 'executive',
    MANAGEMENT: 'management',
    OPERATIONAL: 'operational',
    ANALYTICAL: 'analytical',
  } as const,

  // Report Audience
  AUDIENCE: {
    CEO: 'ceo',
    CMO: 'cmo',
    CFO: 'cfo',
    MANAGER: 'manager',
    TEAM_LEAD: 'team_lead',
    ANALYST: 'analyst',
    TEAM: 'team',
    ALL: 'all',
    BOARD: 'board',
    STAKEHOLDERS: 'stakeholders',
    INVESTORS: 'investors',
  } as const,

  // Report Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
  } as const,
} as const;

// Report Categories
export type NotificationReportCategoryType =
  (typeof NOTIFICATIONREPORT_TYPE.CATEGORIES)[keyof typeof NOTIFICATIONREPORT_TYPE.CATEGORIES];

// Report Sub-Types
export type NotificationReportSubType =
  (typeof NOTIFICATIONREPORT_TYPE.SUB_TYPES)[keyof typeof NOTIFICATIONREPORT_TYPE.SUB_TYPES];

// Report Scope
export type NotificationReportScope =
  (typeof NOTIFICATIONREPORT_TYPE.SCOPE)[keyof typeof NOTIFICATIONREPORT_TYPE.SCOPE];

// Report Level
export type NotificationReportLevel =
  (typeof NOTIFICATIONREPORT_TYPE.LEVEL)[keyof typeof NOTIFICATIONREPORT_TYPE.LEVEL];

// Report Audience
export type NotificationReportAudience =
  (typeof NOTIFICATIONREPORT_TYPE.AUDIENCE)[keyof typeof NOTIFICATIONREPORT_TYPE.AUDIENCE];

// Report Complexity
export type NotificationReportComplexity =
  (typeof NOTIFICATIONREPORT_TYPE.COMPLEXITY)[keyof typeof NOTIFICATIONREPORT_TYPE.COMPLEXITY];

// Utility Functions
export function notificationreportGetCategoryLabel(
  category: NotificationReportCategoryType
): string {
  const labels: Record<NotificationReportCategoryType, string> = {
    [NOTIFICATIONREPORT_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONREPORT_TYPE.CATEGORIES.ANALYTICAL]: 'Analytical',
    [NOTIFICATIONREPORT_TYPE.CATEGORIES.STRATEGIC]: 'Strategic',
    [NOTIFICATIONREPORT_TYPE.CATEGORIES.TACTICAL]: 'Tactical',
    [NOTIFICATIONREPORT_TYPE.CATEGORIES.EXECUTIVE]: 'Executive',
    [NOTIFICATIONREPORT_TYPE.CATEGORIES.COMPLIANCE]: 'Compliance',
    [NOTIFICATIONREPORT_TYPE.CATEGORIES.FINANCIAL]: 'Financial',
    [NOTIFICATIONREPORT_TYPE.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONREPORT_TYPE.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationreportGetSubTypeLabel(subType: NotificationReportSubType): string {
  const labels: Record<NotificationReportSubType, string> = {
    // Operational
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.DELIVERY_REPORT]: 'Delivery Report',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.PERFORMANCE_REPORT]: 'Performance Report',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.STATUS_REPORT]: 'Status Report',

    // Analytical
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.TREND_REPORT]: 'Trend Report',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.PATTERN_REPORT]: 'Pattern Report',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.INSIGHT_REPORT]: 'Insight Report',

    // Strategic
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.EXECUTIVE_SUMMARY]: 'Executive Summary',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.STRATEGIC_OVERVIEW]: 'Strategic Overview',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.BOARD_REPORT]: 'Board Report',

    // Tactical
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.CAMPAIGN_REPORT]: 'Campaign Report',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.CHANNEL_REPORT]: 'Channel Report',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.CONTENT_REPORT]: 'Content Report',

    // Executive
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.KPI_DASHBOARD]: 'KPI Dashboard',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.METRIC_DASHBOARD]: 'Metric Dashboard',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.SCORECARD]: 'Scorecard',

    // Compliance
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.AUDIT_REPORT]: 'Audit Report',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.COMPLIANCE_REPORT]: 'Compliance Report',

    // Financial
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.COST_REPORT]: 'Cost Report',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.ROI_REPORT]: 'ROI Report',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.REVENUE_REPORT]: 'Revenue Report',

    // Marketing
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.CAMPAIGN_PERFORMANCE]: 'Campaign Performance',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.CHANNEL_PERFORMANCE]: 'Channel Performance',
    [NOTIFICATIONREPORT_TYPE.SUB_TYPES.ENGAGEMENT_REPORT]: 'Engagement Report',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function notificationreportGetScopeLabel(scope: NotificationReportScope): string {
  const labels: Record<NotificationReportScope, string> = {
    [NOTIFICATIONREPORT_TYPE.SCOPE.GLOBAL]: 'Global',
    [NOTIFICATIONREPORT_TYPE.SCOPE.REGIONAL]: 'Regional',
    [NOTIFICATIONREPORT_TYPE.SCOPE.LOCAL]: 'Local',
    [NOTIFICATIONREPORT_TYPE.SCOPE.DEPARTMENT]: 'Department',
    [NOTIFICATIONREPORT_TYPE.SCOPE.TEAM]: 'Team',
    [NOTIFICATIONREPORT_TYPE.SCOPE.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown Scope';
}

export function notificationreportGetLevelLabel(level: NotificationReportLevel): string {
  const labels: Record<NotificationReportLevel, string> = {
    [NOTIFICATIONREPORT_TYPE.LEVEL.EXECUTIVE]: 'Executive',
    [NOTIFICATIONREPORT_TYPE.LEVEL.MANAGEMENT]: 'Management',
    [NOTIFICATIONREPORT_TYPE.LEVEL.OPERATIONAL]: 'Operational',
    [NOTIFICATIONREPORT_TYPE.LEVEL.ANALYTICAL]: 'Analytical',
  };
  return labels[level] || 'Unknown Level';
}

export function notificationreportGetAudienceLabel(audience: NotificationReportAudience): string {
  const labels: Record<NotificationReportAudience, string> = {
    [NOTIFICATIONREPORT_TYPE.AUDIENCE.CEO]: 'CEO',
    [NOTIFICATIONREPORT_TYPE.AUDIENCE.CMO]: 'CMO',
    [NOTIFICATIONREPORT_TYPE.AUDIENCE.CFO]: 'CFO',
    [NOTIFICATIONREPORT_TYPE.AUDIENCE.MANAGER]: 'Manager',
    [NOTIFICATIONREPORT_TYPE.AUDIENCE.TEAM_LEAD]: 'Team Lead',
    [NOTIFICATIONREPORT_TYPE.AUDIENCE.ANALYST]: 'Analyst',
    [NOTIFICATIONREPORT_TYPE.AUDIENCE.TEAM]: 'Team',
    [NOTIFICATIONREPORT_TYPE.AUDIENCE.ALL]: 'All',
    [NOTIFICATIONREPORT_TYPE.AUDIENCE.BOARD]: 'Board',
    [NOTIFICATIONREPORT_TYPE.AUDIENCE.STAKEHOLDERS]: 'Stakeholders',
    [NOTIFICATIONREPORT_TYPE.AUDIENCE.INVESTORS]: 'Investors',
  };
  return labels[audience] || 'Unknown Audience';
}

export function notificationreportGetComplexityLabel(
  complexity: NotificationReportComplexity
): string {
  const labels: Record<NotificationReportComplexity, string> = {
    [NOTIFICATIONREPORT_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [NOTIFICATIONREPORT_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [NOTIFICATIONREPORT_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [NOTIFICATIONREPORT_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function notificationreportIsExecutiveLevel(level: NotificationReportLevel): boolean {
  const executiveLevels: NotificationReportLevel[] = [
    NOTIFICATIONREPORT_TYPE.LEVEL.EXECUTIVE,
    NOTIFICATIONREPORT_TYPE.LEVEL.MANAGEMENT,
  ];
  return executiveLevels.includes(level);
}

export function notificationreportIsOperationalLevel(level: NotificationReportLevel): boolean {
  return level === NOTIFICATIONREPORT_TYPE.LEVEL.OPERATIONAL;
}

export function notificationreportIsAnalyticalLevel(level: NotificationReportLevel): boolean {
  return level === NOTIFICATIONREPORT_TYPE.LEVEL.ANALYTICAL;
}
