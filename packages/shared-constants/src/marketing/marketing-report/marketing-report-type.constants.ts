/**
 * Marketing Report Type Constants
 * Type definitions and classifications for marketing reports
 */

export const MARKETINGREPORT_TYPE = {
  // Report Categories
  CATEGORIES: {
    PERFORMANCE: 'performance',
    FINANCIAL: 'financial',
    CUSTOMER: 'customer',
    OPERATIONAL: 'operational',
    MARKETING: 'marketing',
    SALES: 'sales',
    PRODUCT: 'product',
    STRATEGIC: 'strategic',
    TACTICAL: 'tactical',
    ANALYTICAL: 'analytical',
    EXECUTIVE: 'executive',
  } as const,

  // Report Sub-Types
  SUB_TYPES: {
    // Performance
    KPI_REPORT: 'kpi_report',
    METRIC_REPORT: 'metric_report',
    SCORECARD: 'scorecard',
    DASHBOARD: 'dashboard',

    // Financial
    BUDGET_REPORT: 'budget_report',
    ROI_REPORT: 'roi_report',
    COST_REPORT: 'cost_report',
    REVENUE_REPORT: 'revenue_report',

    // Customer
    ACQUISITION_REPORT: 'acquisition_report',
    RETENTION_REPORT: 'retention_report',
    SATISFACTION_REPORT: 'satisfaction_report',
    NPS_REPORT: 'nps_report',
    LTV_REPORT: 'ltv_report',
    CAC_REPORT: 'cac_report',

    // Operational
    EFFICIENCY_REPORT: 'efficiency_report',
    PRODUCTIVITY_REPORT: 'productivity_report',
    QUALITY_REPORT: 'quality_report',

    // Marketing
    CAMPAIGN_REPORT: 'campaign_report',
    CHANNEL_REPORT: 'channel_report',
    SOCIAL_MEDIA_REPORT: 'social_media_report',
    EMAIL_REPORT: 'email_report',
    SEO_REPORT: 'seo_report',
    CONTENT_REPORT: 'content_report',

    // Sales
    SALES_REPORT: 'sales_report',
    FORECAST_REPORT: 'forecast_report',
    PIPELINE_REPORT: 'pipeline_report',

    // Product
    PRODUCT_PERFORMANCE_REPORT: 'product_performance_report',
    CATEGORY_PERFORMANCE_REPORT: 'category_performance_report',
    SKU_PERFORMANCE_REPORT: 'sku_performance_report',

    // Strategic
    SWOT_REPORT: 'swot_report',
    MARKET_ANALYSIS_REPORT: 'market_analysis_report',
    COMPETITIVE_REPORT: 'competitive_report',

    // Tactical
    EXECUTION_REPORT: 'execution_report',
    IMPLEMENTATION_REPORT: 'implementation_report',

    // Analytical
    INSIGHT_REPORT: 'insight_report',
    TREND_REPORT: 'trend_report',
    PATTERN_REPORT: 'pattern_report',

    // Executive
    EXECUTIVE_SUMMARY: 'executive_summary',
    BOARD_REPORT: 'board_report',
    STRATEGIC_REPORT: 'strategic_report',
  } as const,

  // Report Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    DEPARTMENT: 'department',
    TEAM: 'team',
    INDIVIDUAL: 'individual',
    CAMPAIGN: 'campaign',
    CHANNEL: 'channel',
    PRODUCT: 'product',
    CUSTOMER: 'customer',
    SEGMENT: 'segment',
  } as const,

  // Report Levels
  LEVELS: {
    EXECUTIVE: 'executive',
    MANAGEMENT: 'management',
    OPERATIONAL: 'operational',
    ANALYTICAL: 'analytical',
    TACTICAL: 'tactical',
    STRATEGIC: 'strategic',
  } as const,

  // Report Audiences
  AUDIENCES: {
    CEO: 'ceo',
    CMO: 'cmo',
    CFO: 'cfo',
    VP_MARKETING: 'vp_marketing',
    DIRECTOR_MARKETING: 'director_marketing',
    MANAGER: 'manager',
    TEAM_LEAD: 'team_lead',
    ANALYST: 'analyst',
    TEAM: 'team',
    ALL: 'all',
    PUBLIC: 'public',
    STAKEHOLDERS: 'stakeholders',
    INVESTORS: 'investors',
    BOARD: 'board',
  } as const,

  // Report Purposes
  PURPOSES: {
    MONITORING: 'monitoring',
    ANALYSIS: 'analysis',
    PLANNING: 'planning',
    DECISION_MAKING: 'decision_making',
    STRATEGY: 'strategy',
    REPORTING: 'reporting',
    COMPLIANCE: 'compliance',
    COMMUNICATION: 'communication',
    ALIGNMENT: 'alignment',
    OPTIMIZATION: 'optimization',
  } as const,

  // Report Complexity Levels
  COMPLEXITY: {
    SIMPLE: 'simple',
    MODERATE: 'moderate',
    COMPLEX: 'complex',
    VERY_COMPLEX: 'very_complex',
    EXPERT: 'expert',
  } as const,
} as const;

// Report Categories
export type MarketingReportCategoryType =
  (typeof MARKETINGREPORT_TYPE.CATEGORIES)[keyof typeof MARKETINGREPORT_TYPE.CATEGORIES];

// Report Sub-Types
export type MarketingReportSubType =
  (typeof MARKETINGREPORT_TYPE.SUB_TYPES)[keyof typeof MARKETINGREPORT_TYPE.SUB_TYPES];

// Report Scopes
export type MarketingReportScope =
  (typeof MARKETINGREPORT_TYPE.SCOPES)[keyof typeof MARKETINGREPORT_TYPE.SCOPES];

// Report Levels
export type MarketingReportLevel =
  (typeof MARKETINGREPORT_TYPE.LEVELS)[keyof typeof MARKETINGREPORT_TYPE.LEVELS];

// Report Audiences
export type MarketingReportAudience =
  (typeof MARKETINGREPORT_TYPE.AUDIENCES)[keyof typeof MARKETINGREPORT_TYPE.AUDIENCES];

// Report Purposes
export type MarketingReportPurpose =
  (typeof MARKETINGREPORT_TYPE.PURPOSES)[keyof typeof MARKETINGREPORT_TYPE.PURPOSES];

// Report Complexity
export type MarketingReportComplexity =
  (typeof MARKETINGREPORT_TYPE.COMPLEXITY)[keyof typeof MARKETINGREPORT_TYPE.COMPLEXITY];

// Utility Functions
export function marketingreportGetCategoryLabel(category: MarketingReportCategoryType): string {
  const labels: Record<MarketingReportCategoryType, string> = {
    [MARKETINGREPORT_TYPE.CATEGORIES.PERFORMANCE]: 'Performance',
    [MARKETINGREPORT_TYPE.CATEGORIES.FINANCIAL]: 'Financial',
    [MARKETINGREPORT_TYPE.CATEGORIES.CUSTOMER]: 'Customer',
    [MARKETINGREPORT_TYPE.CATEGORIES.OPERATIONAL]: 'Operational',
    [MARKETINGREPORT_TYPE.CATEGORIES.MARKETING]: 'Marketing',
    [MARKETINGREPORT_TYPE.CATEGORIES.SALES]: 'Sales',
    [MARKETINGREPORT_TYPE.CATEGORIES.PRODUCT]: 'Product',
    [MARKETINGREPORT_TYPE.CATEGORIES.STRATEGIC]: 'Strategic',
    [MARKETINGREPORT_TYPE.CATEGORIES.TACTICAL]: 'Tactical',
    [MARKETINGREPORT_TYPE.CATEGORIES.ANALYTICAL]: 'Analytical',
    [MARKETINGREPORT_TYPE.CATEGORIES.EXECUTIVE]: 'Executive',
  };
  return labels[category] || 'Unknown Category';
}

export function marketingreportGetSubTypeLabel(subType: MarketingReportSubType): string {
  const labels: Record<MarketingReportSubType, string> = {
    // Performance
    [MARKETINGREPORT_TYPE.SUB_TYPES.KPI_REPORT]: 'KPI Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.METRIC_REPORT]: 'Metric Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.SCORECARD]: 'Scorecard',
    [MARKETINGREPORT_TYPE.SUB_TYPES.DASHBOARD]: 'Dashboard',

    // Financial
    [MARKETINGREPORT_TYPE.SUB_TYPES.BUDGET_REPORT]: 'Budget Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.ROI_REPORT]: 'ROI Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.COST_REPORT]: 'Cost Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.REVENUE_REPORT]: 'Revenue Report',

    // Customer
    [MARKETINGREPORT_TYPE.SUB_TYPES.ACQUISITION_REPORT]: 'Acquisition Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.RETENTION_REPORT]: 'Retention Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.SATISFACTION_REPORT]: 'Satisfaction Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.NPS_REPORT]: 'NPS Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.LTV_REPORT]: 'LTV Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.CAC_REPORT]: 'CAC Report',

    // Operational
    [MARKETINGREPORT_TYPE.SUB_TYPES.EFFICIENCY_REPORT]: 'Efficiency Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.PRODUCTIVITY_REPORT]: 'Productivity Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.QUALITY_REPORT]: 'Quality Report',

    // Marketing
    [MARKETINGREPORT_TYPE.SUB_TYPES.CAMPAIGN_REPORT]: 'Campaign Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.CHANNEL_REPORT]: 'Channel Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.SOCIAL_MEDIA_REPORT]: 'Social Media Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.EMAIL_REPORT]: 'Email Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.SEO_REPORT]: 'SEO Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.CONTENT_REPORT]: 'Content Report',

    // Sales
    [MARKETINGREPORT_TYPE.SUB_TYPES.SALES_REPORT]: 'Sales Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.FORECAST_REPORT]: 'Forecast Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.PIPELINE_REPORT]: 'Pipeline Report',

    // Product
    [MARKETINGREPORT_TYPE.SUB_TYPES.PRODUCT_PERFORMANCE_REPORT]: 'Product Performance Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.CATEGORY_PERFORMANCE_REPORT]: 'Category Performance Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.SKU_PERFORMANCE_REPORT]: 'SKU Performance Report',

    // Strategic
    [MARKETINGREPORT_TYPE.SUB_TYPES.SWOT_REPORT]: 'SWOT Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.MARKET_ANALYSIS_REPORT]: 'Market Analysis Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.COMPETITIVE_REPORT]: 'Competitive Report',

    // Tactical
    [MARKETINGREPORT_TYPE.SUB_TYPES.EXECUTION_REPORT]: 'Execution Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.IMPLEMENTATION_REPORT]: 'Implementation Report',

    // Analytical
    [MARKETINGREPORT_TYPE.SUB_TYPES.INSIGHT_REPORT]: 'Insight Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.TREND_REPORT]: 'Trend Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.PATTERN_REPORT]: 'Pattern Report',

    // Executive
    [MARKETINGREPORT_TYPE.SUB_TYPES.EXECUTIVE_SUMMARY]: 'Executive Summary',
    [MARKETINGREPORT_TYPE.SUB_TYPES.BOARD_REPORT]: 'Board Report',
    [MARKETINGREPORT_TYPE.SUB_TYPES.STRATEGIC_REPORT]: 'Strategic Report',
  };
  return labels[subType] || 'Unknown Sub-Type';
}

export function marketingreportGetScopeLabel(scope: MarketingReportScope): string {
  const labels: Record<MarketingReportScope, string> = {
    [MARKETINGREPORT_TYPE.SCOPES.GLOBAL]: 'Global',
    [MARKETINGREPORT_TYPE.SCOPES.REGIONAL]: 'Regional',
    [MARKETINGREPORT_TYPE.SCOPES.LOCAL]: 'Local',
    [MARKETINGREPORT_TYPE.SCOPES.DEPARTMENT]: 'Department',
    [MARKETINGREPORT_TYPE.SCOPES.TEAM]: 'Team',
    [MARKETINGREPORT_TYPE.SCOPES.INDIVIDUAL]: 'Individual',
    [MARKETINGREPORT_TYPE.SCOPES.CAMPAIGN]: 'Campaign',
    [MARKETINGREPORT_TYPE.SCOPES.CHANNEL]: 'Channel',
    [MARKETINGREPORT_TYPE.SCOPES.PRODUCT]: 'Product',
    [MARKETINGREPORT_TYPE.SCOPES.CUSTOMER]: 'Customer',
    [MARKETINGREPORT_TYPE.SCOPES.SEGMENT]: 'Segment',
  };
  return labels[scope] || 'Unknown Scope';
}

export function marketingreportGetLevelLabel(level: MarketingReportLevel): string {
  const labels: Record<MarketingReportLevel, string> = {
    [MARKETINGREPORT_TYPE.LEVELS.EXECUTIVE]: 'Executive',
    [MARKETINGREPORT_TYPE.LEVELS.MANAGEMENT]: 'Management',
    [MARKETINGREPORT_TYPE.LEVELS.OPERATIONAL]: 'Operational',
    [MARKETINGREPORT_TYPE.LEVELS.ANALYTICAL]: 'Analytical',
    [MARKETINGREPORT_TYPE.LEVELS.TACTICAL]: 'Tactical',
    [MARKETINGREPORT_TYPE.LEVELS.STRATEGIC]: 'Strategic',
  };
  return labels[level] || 'Unknown Level';
}

export function marketingreportGetAudienceLabel(audience: MarketingReportAudience): string {
  const labels: Record<MarketingReportAudience, string> = {
    [MARKETINGREPORT_TYPE.AUDIENCES.CEO]: 'CEO',
    [MARKETINGREPORT_TYPE.AUDIENCES.CMO]: 'CMO',
    [MARKETINGREPORT_TYPE.AUDIENCES.CFO]: 'CFO',
    [MARKETINGREPORT_TYPE.AUDIENCES.VP_MARKETING]: 'VP of Marketing',
    [MARKETINGREPORT_TYPE.AUDIENCES.DIRECTOR_MARKETING]: 'Director of Marketing',
    [MARKETINGREPORT_TYPE.AUDIENCES.MANAGER]: 'Manager',
    [MARKETINGREPORT_TYPE.AUDIENCES.TEAM_LEAD]: 'Team Lead',
    [MARKETINGREPORT_TYPE.AUDIENCES.ANALYST]: 'Analyst',
    [MARKETINGREPORT_TYPE.AUDIENCES.TEAM]: 'Team',
    [MARKETINGREPORT_TYPE.AUDIENCES.ALL]: 'All Employees',
    [MARKETINGREPORT_TYPE.AUDIENCES.PUBLIC]: 'Public',
    [MARKETINGREPORT_TYPE.AUDIENCES.STAKEHOLDERS]: 'Stakeholders',
    [MARKETINGREPORT_TYPE.AUDIENCES.INVESTORS]: 'Investors',
    [MARKETINGREPORT_TYPE.AUDIENCES.BOARD]: 'Board of Directors',
  };
  return labels[audience] || 'Unknown Audience';
}

export function marketingreportGetPurposeLabel(purpose: MarketingReportPurpose): string {
  const labels: Record<MarketingReportPurpose, string> = {
    [MARKETINGREPORT_TYPE.PURPOSES.MONITORING]: 'Monitoring',
    [MARKETINGREPORT_TYPE.PURPOSES.ANALYSIS]: 'Analysis',
    [MARKETINGREPORT_TYPE.PURPOSES.PLANNING]: 'Planning',
    [MARKETINGREPORT_TYPE.PURPOSES.DECISION_MAKING]: 'Decision Making',
    [MARKETINGREPORT_TYPE.PURPOSES.STRATEGY]: 'Strategy',
    [MARKETINGREPORT_TYPE.PURPOSES.REPORTING]: 'Reporting',
    [MARKETINGREPORT_TYPE.PURPOSES.COMPLIANCE]: 'Compliance',
    [MARKETINGREPORT_TYPE.PURPOSES.COMMUNICATION]: 'Communication',
    [MARKETINGREPORT_TYPE.PURPOSES.ALIGNMENT]: 'Alignment',
    [MARKETINGREPORT_TYPE.PURPOSES.OPTIMIZATION]: 'Optimization',
  };
  return labels[purpose] || 'Unknown Purpose';
}

export function marketingreportGetComplexityLabel(complexity: MarketingReportComplexity): string {
  const labels: Record<MarketingReportComplexity, string> = {
    [MARKETINGREPORT_TYPE.COMPLEXITY.SIMPLE]: 'Simple',
    [MARKETINGREPORT_TYPE.COMPLEXITY.MODERATE]: 'Moderate',
    [MARKETINGREPORT_TYPE.COMPLEXITY.COMPLEX]: 'Complex',
    [MARKETINGREPORT_TYPE.COMPLEXITY.VERY_COMPLEX]: 'Very Complex',
    [MARKETINGREPORT_TYPE.COMPLEXITY.EXPERT]: 'Expert',
  };
  return labels[complexity] || 'Unknown Complexity';
}

export function marketingreportIsExecutiveLevel(level: MarketingReportLevel): boolean {
  const executiveLevels: MarketingReportLevel[] = [
    MARKETINGREPORT_TYPE.LEVELS.EXECUTIVE,
    MARKETINGREPORT_TYPE.LEVELS.MANAGEMENT,
  ];
  return executiveLevels.includes(level);
}

export function marketingreportIsStrategicLevel(level: MarketingReportLevel): boolean {
  return level === MARKETINGREPORT_TYPE.LEVELS.STRATEGIC;
}

export function marketingreportIsTacticalLevel(level: MarketingReportLevel): boolean {
  return level === MARKETINGREPORT_TYPE.LEVELS.TACTICAL;
}

export function marketingreportIsAnalyticalLevel(level: MarketingReportLevel): boolean {
  return level === MARKETINGREPORT_TYPE.LEVELS.ANALYTICAL;
}

export function marketingreportIsOperationalLevel(level: MarketingReportLevel): boolean {
  return level === MARKETINGREPORT_TYPE.LEVELS.OPERATIONAL;
}
