/**
 * Report Widget Type Constants
 * Types and classifications of widgets
 */

export const REPORT_WIDGET_TYPE = {
  // Widget Families
  FAMILIES: {
    VISUALIZATION: 'visualization',
    ANALYTICAL: 'analytical',
    OPERATIONAL: 'operational',
    MONITORING: 'monitoring',
    ALERTING: 'alerting',
    FORECASTING: 'forecasting',
    REPORTING: 'reporting',
    EXPLORATORY: 'exploratory',
  } as const,

  // Widget Complexity
  COMPLEXITY: {
    SIMPLE: 'simple',
    STANDARD: 'standard',
    COMPLEX: 'complex',
    ADVANCED: 'advanced',
    EXPERT: 'expert',
  } as const,

  // Widget Purpose
  PURPOSE: {
    MONITORING: 'monitoring',
    ANALYSIS: 'analysis',
    DECISION_MAKING: 'decision_making',
    PRESENTATION: 'presentation',
    REPORTING: 'reporting',
    ALERTING: 'alerting',
    FORECASTING: 'forecasting',
    EXPLORATION: 'exploration',
    COMMUNICATION: 'communication',
  } as const,

  // Widget Audience
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

  // Widget Frequency
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

  // Widget Interaction
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

  // Widget Permission Levels
  PERMISSIONS: {
    VIEW: 'view',
    EDIT: 'edit',
    DELETE: 'delete',
    SHARE: 'share',
    EXPORT: 'export',
    ADMIN: 'admin',
  } as const,

  // Widget Performance Tiers
  PERFORMANCE_TIERS: {
    FREE: 'free',
    BASIC: 'basic',
    STANDARD: 'standard',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
  } as const,
} as const;

// Widget Families
export type ReportWidgetTypeFamily =
  (typeof REPORT_WIDGET_TYPE.FAMILIES)[keyof typeof REPORT_WIDGET_TYPE.FAMILIES];

// Widget Complexity
export type ReportWidgetTypeComplexity =
  (typeof REPORT_WIDGET_TYPE.COMPLEXITY)[keyof typeof REPORT_WIDGET_TYPE.COMPLEXITY];

// Widget Purpose
export type ReportWidgetTypePurpose =
  (typeof REPORT_WIDGET_TYPE.PURPOSE)[keyof typeof REPORT_WIDGET_TYPE.PURPOSE];

// Widget Audience
export type ReportWidgetTypeAudience =
  (typeof REPORT_WIDGET_TYPE.AUDIENCE)[keyof typeof REPORT_WIDGET_TYPE.AUDIENCE];

// Widget Frequency
export type ReportWidgetTypeFrequency =
  (typeof REPORT_WIDGET_TYPE.FREQUENCY)[keyof typeof REPORT_WIDGET_TYPE.FREQUENCY];

// Widget Interaction
export type ReportWidgetTypeInteraction =
  (typeof REPORT_WIDGET_TYPE.INTERACTION)[keyof typeof REPORT_WIDGET_TYPE.INTERACTION];

// Widget Permissions
export type ReportWidgetTypePermission =
  (typeof REPORT_WIDGET_TYPE.PERMISSIONS)[keyof typeof REPORT_WIDGET_TYPE.PERMISSIONS];

// Widget Performance Tiers
export type ReportWidgetTypePerformanceTier =
  (typeof REPORT_WIDGET_TYPE.PERFORMANCE_TIERS)[keyof typeof REPORT_WIDGET_TYPE.PERFORMANCE_TIERS];

// Utility Functions
export function reportWidgetTypeGetFamilyLabel(family: ReportWidgetTypeFamily): string {
  const labels: Record<ReportWidgetTypeFamily, string> = {
    [REPORT_WIDGET_TYPE.FAMILIES.VISUALIZATION]: 'Visualization Widget',
    [REPORT_WIDGET_TYPE.FAMILIES.ANALYTICAL]: 'Analytical Widget',
    [REPORT_WIDGET_TYPE.FAMILIES.OPERATIONAL]: 'Operational Widget',
    [REPORT_WIDGET_TYPE.FAMILIES.MONITORING]: 'Monitoring Widget',
    [REPORT_WIDGET_TYPE.FAMILIES.ALERTING]: 'Alerting Widget',
    [REPORT_WIDGET_TYPE.FAMILIES.FORECASTING]: 'Forecasting Widget',
    [REPORT_WIDGET_TYPE.FAMILIES.REPORTING]: 'Reporting Widget',
    [REPORT_WIDGET_TYPE.FAMILIES.EXPLORATORY]: 'Exploratory Widget',
  };
  return labels[family] || 'Unknown Family';
}

export function reportWidgetTypeGetComplexityLabel(complexity: ReportWidgetTypeComplexity): string {
  const labels: Record<ReportWidgetTypeComplexity, string> = {
    [REPORT_WIDGET_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [REPORT_WIDGET_TYPE.COMPLEXITY.STANDARD]: 'Standard',
    [REPORT_WIDGET_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [REPORT_WIDGET_TYPE.COMPLEXITY.ADVANCED]: 'Advanced',
    [REPORT_WIDGET_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function reportWidgetTypeGetPurposeLabel(purpose: ReportWidgetTypePurpose): string {
  const labels: Record<ReportWidgetTypePurpose, string> = {
    [REPORT_WIDGET_TYPE.PURPOSE.MONITORING]: 'Monitoring',
    [REPORT_WIDGET_TYPE.PURPOSE.ANALYSIS]: 'Analysis',
    [REPORT_WIDGET_TYPE.PURPOSE.DECISION_MAKING]: 'Decision Making',
    [REPORT_WIDGET_TYPE.PURPOSE.PRESENTATION]: 'Presentation',
    [REPORT_WIDGET_TYPE.PURPOSE.REPORTING]: 'Reporting',
    [REPORT_WIDGET_TYPE.PURPOSE.ALERTING]: 'Alerting',
    [REPORT_WIDGET_TYPE.PURPOSE.FORECASTING]: 'Forecasting',
    [REPORT_WIDGET_TYPE.PURPOSE.EXPLORATION]: 'Exploration',
    [REPORT_WIDGET_TYPE.PURPOSE.COMMUNICATION]: 'Communication',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function reportWidgetTypeGetAudienceLabel(audience: ReportWidgetTypeAudience): string {
  const labels: Record<ReportWidgetTypeAudience, string> = {
    [REPORT_WIDGET_TYPE.AUDIENCE.EXECUTIVES]: 'Executives',
    [REPORT_WIDGET_TYPE.AUDIENCE.MANAGERS]: 'Managers',
    [REPORT_WIDGET_TYPE.AUDIENCE.ANALYSTS]: 'Analysts',
    [REPORT_WIDGET_TYPE.AUDIENCE.OPERATIONS]: 'Operations Team',
    [REPORT_WIDGET_TYPE.AUDIENCE.SALES]: 'Sales Team',
    [REPORT_WIDGET_TYPE.AUDIENCE.MARKETING]: 'Marketing Team',
    [REPORT_WIDGET_TYPE.AUDIENCE.SUPPORT]: 'Support Team',
    [REPORT_WIDGET_TYPE.AUDIENCE.DEVELOPERS]: 'Developers',
    [REPORT_WIDGET_TYPE.AUDIENCE.CLIENTS]: 'Clients',
    [REPORT_WIDGET_TYPE.AUDIENCE.PUBLIC]: 'Public',
  };
  return labels[audience] || 'Unknown Audience';
}

export function reportWidgetTypeGetFrequencyLabel(frequency: ReportWidgetTypeFrequency): string {
  const labels: Record<ReportWidgetTypeFrequency, string> = {
    [REPORT_WIDGET_TYPE.FREQUENCY.REALTIME]: 'Realtime',
    [REPORT_WIDGET_TYPE.FREQUENCY.HOURLY]: 'Hourly',
    [REPORT_WIDGET_TYPE.FREQUENCY.DAILY]: 'Daily',
    [REPORT_WIDGET_TYPE.FREQUENCY.WEEKLY]: 'Weekly',
    [REPORT_WIDGET_TYPE.FREQUENCY.MONTHLY]: 'Monthly',
    [REPORT_WIDGET_TYPE.FREQUENCY.QUARTERLY]: 'Quarterly',
    [REPORT_WIDGET_TYPE.FREQUENCY.ANNUAL]: 'Annual',
    [REPORT_WIDGET_TYPE.FREQUENCY.ON_DEMAND]: 'On Demand',
  };
  return labels[frequency] || 'Unknown Frequency';
}

export function reportWidgetTypeGetInteractionLabel(
  interaction: ReportWidgetTypeInteraction
): string {
  const labels: Record<ReportWidgetTypeInteraction, string> = {
    [REPORT_WIDGET_TYPE.INTERACTION.STATIC]: 'Static',
    [REPORT_WIDGET_TYPE.INTERACTION.FILTERABLE]: 'Filterable',
    [REPORT_WIDGET_TYPE.INTERACTION.DRILLABLE]: 'Drillable',
    [REPORT_WIDGET_TYPE.INTERACTION.CLICKABLE]: 'Clickable',
    [REPORT_WIDGET_TYPE.INTERACTION.EXPORTABLE]: 'Exportable',
    [REPORT_WIDGET_TYPE.INTERACTION.SHAREABLE]: 'Shareable',
    [REPORT_WIDGET_TYPE.INTERACTION.EDITABLE]: 'Editable',
    [REPORT_WIDGET_TYPE.INTERACTION.FULLY_INTERACTIVE]: 'Fully Interactive',
  };
  return labels[interaction] || 'Unknown Interaction';
}

export function reportWidgetTypeGetPermissionLabel(permission: ReportWidgetTypePermission): string {
  const labels: Record<ReportWidgetTypePermission, string> = {
    [REPORT_WIDGET_TYPE.PERMISSIONS.VIEW]: 'View',
    [REPORT_WIDGET_TYPE.PERMISSIONS.EDIT]: 'Edit',
    [REPORT_WIDGET_TYPE.PERMISSIONS.DELETE]: 'Delete',
    [REPORT_WIDGET_TYPE.PERMISSIONS.SHARE]: 'Share',
    [REPORT_WIDGET_TYPE.PERMISSIONS.EXPORT]: 'Export',
    [REPORT_WIDGET_TYPE.PERMISSIONS.ADMIN]: 'Admin',
  };
  return labels[permission] || 'Unknown Permission';
}

export function reportWidgetTypeGetPerformanceTierLabel(
  tier: ReportWidgetTypePerformanceTier
): string {
  const labels: Record<ReportWidgetTypePerformanceTier, string> = {
    [REPORT_WIDGET_TYPE.PERFORMANCE_TIERS.FREE]: 'Free',
    [REPORT_WIDGET_TYPE.PERFORMANCE_TIERS.BASIC]: 'Basic',
    [REPORT_WIDGET_TYPE.PERFORMANCE_TIERS.STANDARD]: 'Standard',
    [REPORT_WIDGET_TYPE.PERFORMANCE_TIERS.PREMIUM]: 'Premium',
    [REPORT_WIDGET_TYPE.PERFORMANCE_TIERS.ENTERPRISE]: 'Enterprise',
  };
  return labels[tier] || 'Unknown Tier';
}

export function reportWidgetTypeIsValidFamily(family: string): family is ReportWidgetTypeFamily {
  return Object.values(REPORT_WIDGET_TYPE.FAMILIES).includes(family as ReportWidgetTypeFamily);
}

export function reportWidgetTypeIsValidPurpose(
  purpose: string
): purpose is ReportWidgetTypePurpose {
  return Object.values(REPORT_WIDGET_TYPE.PURPOSE).includes(purpose as ReportWidgetTypePurpose);
}
