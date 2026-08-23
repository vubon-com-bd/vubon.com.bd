/**
 * Report Dashboard Type Constants
 * Types and classifications of dashboards
 */

export const REPORT_DASHBOARD_TYPE = {
  // Dashboard Categories
  CATEGORIES: {
    STRATEGIC: 'strategic',
    OPERATIONAL: 'operational',
    ANALYTICAL: 'analytical',
    TACTICAL: 'tactical',
    MONITORING: 'monitoring',
    EXECUTIVE: 'executive',
    TEAM: 'team',
    PERSONAL: 'personal',
  } as const,

  // Dashboard Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
  } as const,

  // Dashboard Purpose
  PURPOSE: {
    MONITORING: 'monitoring',
    ANALYSIS: 'analysis',
    DECISION_MAKING: 'decision_making',
    PRESENTATION: 'presentation',
    REPORTING: 'reporting',
    ALERTING: 'alerting',
    FORECASTING: 'forecasting',
  } as const,

  // Dashboard Audience
  AUDIENCE: {
    EXECUTIVES: 'executives',
    MANAGERS: 'managers',
    ANALYSTS: 'analysts',
    OPERATIONS: 'operations',
    SALES: 'sales',
    MARKETING: 'marketing',
    SUPPORT: 'support',
    DEVELOPERS: 'developers',
    CLIENTS: 'clients',
    PUBLIC: 'public',
  } as const,

  // Dashboard Frequency
  FREQUENCY: {
    REALTIME: 'realtime',
    HOURLY: 'hourly',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ANNUAL: 'annual',
    ON_DEMAND: 'on_demand',
  } as const,

  // Dashboard Interaction
  INTERACTION: {
    STATIC: 'static',
    FILTERABLE: 'filterable',
    DRILLABLE: 'drillable',
    CLICKABLE: 'clickable',
    EXPORTABLE: 'exportable',
    SHAREABLE: 'shareable',
    EDITABLE: 'editable',
    FULLY_INTERACTIVE: 'fully_interactive',
  } as const,

  // Dashboard Permission Levels
  PERMISSIONS: {
    VIEW: 'view',
    EDIT: 'edit',
    DELETE: 'delete',
    SHARE: 'share',
    EXPORT: 'export',
    ADMIN: 'admin',
  } as const,
} as const;

// Dashboard Categories
export type ReportDashboardTypeCategory =
  (typeof REPORT_DASHBOARD_TYPE.CATEGORIES)[keyof typeof REPORT_DASHBOARD_TYPE.CATEGORIES];

// Dashboard Complexity
export type ReportDashboardTypeComplexity =
  (typeof REPORT_DASHBOARD_TYPE.COMPLEXITY)[keyof typeof REPORT_DASHBOARD_TYPE.COMPLEXITY];

// Dashboard Purpose
export type ReportDashboardTypePurpose =
  (typeof REPORT_DASHBOARD_TYPE.PURPOSE)[keyof typeof REPORT_DASHBOARD_TYPE.PURPOSE];

// Dashboard Audience
export type ReportDashboardTypeAudience =
  (typeof REPORT_DASHBOARD_TYPE.AUDIENCE)[keyof typeof REPORT_DASHBOARD_TYPE.AUDIENCE];

// Dashboard Frequency
export type ReportDashboardTypeFrequency =
  (typeof REPORT_DASHBOARD_TYPE.FREQUENCY)[keyof typeof REPORT_DASHBOARD_TYPE.FREQUENCY];

// Dashboard Interaction
export type ReportDashboardTypeInteraction =
  (typeof REPORT_DASHBOARD_TYPE.INTERACTION)[keyof typeof REPORT_DASHBOARD_TYPE.INTERACTION];

// Dashboard Permissions
export type ReportDashboardTypePermission =
  (typeof REPORT_DASHBOARD_TYPE.PERMISSIONS)[keyof typeof REPORT_DASHBOARD_TYPE.PERMISSIONS];

// Utility Functions
export function reportDashboardTypeGetCategoryLabel(category: ReportDashboardTypeCategory): string {
  const labels: Record<ReportDashboardTypeCategory, string> = {
    [REPORT_DASHBOARD_TYPE.CATEGORIES.STRATEGIC]: 'Strategic Dashboard',
    [REPORT_DASHBOARD_TYPE.CATEGORIES.OPERATIONAL]: 'Operational Dashboard',
    [REPORT_DASHBOARD_TYPE.CATEGORIES.ANALYTICAL]: 'Analytical Dashboard',
    [REPORT_DASHBOARD_TYPE.CATEGORIES.TACTICAL]: 'Tactical Dashboard',
    [REPORT_DASHBOARD_TYPE.CATEGORIES.MONITORING]: 'Monitoring Dashboard',
    [REPORT_DASHBOARD_TYPE.CATEGORIES.EXECUTIVE]: 'Executive Dashboard',
    [REPORT_DASHBOARD_TYPE.CATEGORIES.TEAM]: 'Team Dashboard',
    [REPORT_DASHBOARD_TYPE.CATEGORIES.PERSONAL]: 'Personal Dashboard',
  };
  return labels[category] || 'Unknown Category';
}

export function reportDashboardTypeGetComplexityLabel(
  complexity: ReportDashboardTypeComplexity
): string {
  const labels: Record<ReportDashboardTypeComplexity, string> = {
    [REPORT_DASHBOARD_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [REPORT_DASHBOARD_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [REPORT_DASHBOARD_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [REPORT_DASHBOARD_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function reportDashboardTypeGetPurposeLabel(purpose: ReportDashboardTypePurpose): string {
  const labels: Record<ReportDashboardTypePurpose, string> = {
    [REPORT_DASHBOARD_TYPE.PURPOSE.MONITORING]: 'Monitoring',
    [REPORT_DASHBOARD_TYPE.PURPOSE.ANALYSIS]: 'Analysis',
    [REPORT_DASHBOARD_TYPE.PURPOSE.DECISION_MAKING]: 'Decision Making',
    [REPORT_DASHBOARD_TYPE.PURPOSE.PRESENTATION]: 'Presentation',
    [REPORT_DASHBOARD_TYPE.PURPOSE.REPORTING]: 'Reporting',
    [REPORT_DASHBOARD_TYPE.PURPOSE.ALERTING]: 'Alerting',
    [REPORT_DASHBOARD_TYPE.PURPOSE.FORECASTING]: 'Forecasting',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function reportDashboardTypeGetAudienceLabel(audience: ReportDashboardTypeAudience): string {
  const labels: Record<ReportDashboardTypeAudience, string> = {
    [REPORT_DASHBOARD_TYPE.AUDIENCE.EXECUTIVES]: 'Executives',
    [REPORT_DASHBOARD_TYPE.AUDIENCE.MANAGERS]: 'Managers',
    [REPORT_DASHBOARD_TYPE.AUDIENCE.ANALYSTS]: 'Analysts',
    [REPORT_DASHBOARD_TYPE.AUDIENCE.OPERATIONS]: 'Operations Team',
    [REPORT_DASHBOARD_TYPE.AUDIENCE.SALES]: 'Sales Team',
    [REPORT_DASHBOARD_TYPE.AUDIENCE.MARKETING]: 'Marketing Team',
    [REPORT_DASHBOARD_TYPE.AUDIENCE.SUPPORT]: 'Support Team',
    [REPORT_DASHBOARD_TYPE.AUDIENCE.DEVELOPERS]: 'Developers',
    [REPORT_DASHBOARD_TYPE.AUDIENCE.CLIENTS]: 'Clients',
    [REPORT_DASHBOARD_TYPE.AUDIENCE.PUBLIC]: 'Public',
  };
  return labels[audience] || 'Unknown Audience';
}

export function reportDashboardTypeGetFrequencyLabel(
  frequency: ReportDashboardTypeFrequency
): string {
  const labels: Record<ReportDashboardTypeFrequency, string> = {
    [REPORT_DASHBOARD_TYPE.FREQUENCY.REALTIME]: 'Realtime',
    [REPORT_DASHBOARD_TYPE.FREQUENCY.HOURLY]: 'Hourly',
    [REPORT_DASHBOARD_TYPE.FREQUENCY.DAILY]: 'Daily',
    [REPORT_DASHBOARD_TYPE.FREQUENCY.WEEKLY]: 'Weekly',
    [REPORT_DASHBOARD_TYPE.FREQUENCY.MONTHLY]: 'Monthly',
    [REPORT_DASHBOARD_TYPE.FREQUENCY.QUARTERLY]: 'Quarterly',
    [REPORT_DASHBOARD_TYPE.FREQUENCY.ANNUAL]: 'Annual',
    [REPORT_DASHBOARD_TYPE.FREQUENCY.ON_DEMAND]: 'On Demand',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function reportDashboardTypeGetInteractionLabel(
  interaction: ReportDashboardTypeInteraction
): string {
  const labels: Record<ReportDashboardTypeInteraction, string> = {
    [REPORT_DASHBOARD_TYPE.INTERACTION.STATIC]: 'Static',
    [REPORT_DASHBOARD_TYPE.INTERACTION.FILTERABLE]: 'Filterable',
    [REPORT_DASHBOARD_TYPE.INTERACTION.DRILLABLE]: 'Drillable',
    [REPORT_DASHBOARD_TYPE.INTERACTION.CLICKABLE]: 'Clickable',
    [REPORT_DASHBOARD_TYPE.INTERACTION.EXPORTABLE]: 'Exportable',
    [REPORT_DASHBOARD_TYPE.INTERACTION.SHAREABLE]: 'Shareable',
    [REPORT_DASHBOARD_TYPE.INTERACTION.EDITABLE]: 'Editable',
    [REPORT_DASHBOARD_TYPE.INTERACTION.FULLY_INTERACTIVE]: 'Fully Interactive',
  };
  return labels[interaction] || 'Unknown Interaction';
}

export function reportDashboardTypeGetPermissionLabel(
  permission: ReportDashboardTypePermission
): string {
  const labels: Record<ReportDashboardTypePermission, string> = {
    [REPORT_DASHBOARD_TYPE.PERMISSIONS.VIEW]: 'View',
    [REPORT_DASHBOARD_TYPE.PERMISSIONS.EDIT]: 'Edit',
    [REPORT_DASHBOARD_TYPE.PERMISSIONS.DELETE]: 'Delete',
    [REPORT_DASHBOARD_TYPE.PERMISSIONS.SHARE]: 'Share',
    [REPORT_DASHBOARD_TYPE.PERMISSIONS.EXPORT]: 'Export',
    [REPORT_DASHBOARD_TYPE.PERMISSIONS.ADMIN]: 'Admin',
  };
  return labels[permission] || 'Unknown Permission';
}

export function reportDashboardTypeIsValidCategory(
  category: string
): category is ReportDashboardTypeCategory {
  return Object.values(REPORT_DASHBOARD_TYPE.CATEGORIES).includes(
    category as ReportDashboardTypeCategory
  );
}

export function reportDashboardTypeIsValidPurpose(
  purpose: string
): purpose is ReportDashboardTypePurpose {
  return Object.values(REPORT_DASHBOARD_TYPE.PURPOSE).includes(
    purpose as ReportDashboardTypePurpose
  );
}
