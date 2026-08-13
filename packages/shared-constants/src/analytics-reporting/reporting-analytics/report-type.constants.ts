/**
 * @fileoverview Report type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Report types enum for different reporting needs
 */
export enum ReportType {
  /** Executive summary report */
  EXECUTIVE_SUMMARY_REPORT = 'EXECUTIVE_SUMMARY_REPORT',
  /** Operational report */
  OPERATIONAL_REPORT = 'OPERATIONAL_REPORT',
  /** Analytical report */
  ANALYTICAL_REPORT = 'ANALYTICAL_REPORT',
  /** Strategic report */
  STRATEGIC_REPORT = 'STRATEGIC_REPORT',
  /** Forecast report */
  FORECAST_REPORT = 'FORECAST_REPORT',
  /** Comparative report */
  COMPARATIVE_REPORT = 'COMPARATIVE_REPORT',
  /** Trend report */
  TREND_REPORT = 'TREND_REPORT',
  /** KPI report */
  KPI_REPORT = 'KPI_REPORT',
  /** Dashboard report */
  DASHBOARD_REPORT = 'DASHBOARD_REPORT',
  /** Detailed report */
  DETAILED_REPORT = 'DETAILED_REPORT',
  /** Summary report */
  SUMMARY_REPORT = 'SUMMARY_REPORT',
  /** Aggregated report */
  AGGREGATED_REPORT = 'AGGREGATED_REPORT',
  /** Filtered report */
  FILTERED_REPORT = 'FILTERED_REPORT',
  /** Sorted report */
  SORTED_REPORT = 'SORTED_REPORT',
  /** Grouped report */
  GROUPED_REPORT = 'GROUPED_REPORT',
  /** Pivot report */
  PIVOT_REPORT = 'PIVOT_REPORT',
  /** Chart report */
  CHART_REPORT = 'CHART_REPORT',
  /** Table report */
  TABLE_REPORT = 'TABLE_REPORT',
  /** Cross tab report */
  CROSS_TAB_REPORT = 'CROSS_TAB_REPORT',
  /** Exception report */
  EXCEPTION_REPORT = 'EXCEPTION_REPORT',
  /** Alert report */
  ALERT_REPORT = 'ALERT_REPORT',
  /** Scheduled report */
  SCHEDULED_REPORT = 'SCHEDULED_REPORT',
  /** On-demand report */
  ON_DEMAND_REPORT = 'ON_DEMAND_REPORT',
  /** Real-time report */
  REAL_TIME_REPORT = 'REAL_TIME_REPORT',
  /** Historical report */
  HISTORICAL_REPORT = 'HISTORICAL_REPORT',
  /** Predictive report */
  PREDICTIVE_REPORT = 'PREDICTIVE_REPORT',
  /** Prescriptive report */
  PRESCRIPTIVE_REPORT = 'PRESCRIPTIVE_REPORT',
  /** Diagnostic report */
  DIAGNOSTIC_REPORT = 'DIAGNOSTIC_REPORT',
  /** Descriptive report */
  DESCRIPTIVE_REPORT = 'DESCRIPTIVE_REPORT',
  /** Custom report */
  CUSTOM_REPORT = 'CUSTOM_REPORT',
  /** Ad-hoc report */
  AD_HOC_REPORT = 'AD_HOC_REPORT',
  /** Standard report */
  STANDARD_REPORT = 'STANDARD_REPORT',
  /** Interactive report */
  INTERACTIVE_REPORT = 'INTERACTIVE_REPORT',
}

/**
 * Report category for grouping
 */
export enum ReportCategory {
  /** Executive level reports */
  EXECUTIVE = 'EXECUTIVE',
  /** Operational level reports */
  OPERATIONAL = 'OPERATIONAL',
  /** Analytical reports */
  ANALYTICAL = 'ANALYTICAL',
  /** Strategic reports */
  STRATEGIC = 'STRATEGIC',
  /** Forecasting reports */
  FORECASTING = 'FORECASTING',
  /** Comparative reports */
  COMPARATIVE = 'COMPARATIVE',
  /** Trend reports */
  TREND = 'TREND',
  /** Performance reports */
  PERFORMANCE = 'PERFORMANCE',
  /** Data reports */
  DATA = 'DATA',
  /** Custom reports */
  CUSTOM = 'CUSTOM',
  /** Real-time reports */
  REALTIME = 'REALTIME',
  /** Historical reports */
  HISTORICAL = 'HISTORICAL',
  /** Predictive reports */
  PREDICTIVE = 'PREDICTIVE',
  /** Prescriptive reports */
  PRESCRIPTIVE = 'PRESCRIPTIVE',
  /** Diagnostic reports */
  DIAGNOSTIC = 'DIAGNOSTIC',
  /** Descriptive reports */
  DESCRIPTIVE = 'DESCRIPTIVE',
}

/**
 * Report category mapping
 */
export const REPORT_TYPE_CATEGORY_MAP: Record<ReportType, ReportCategory> = {
  [ReportType.EXECUTIVE_SUMMARY_REPORT]: ReportCategory.EXECUTIVE,
  [ReportType.OPERATIONAL_REPORT]: ReportCategory.OPERATIONAL,
  [ReportType.ANALYTICAL_REPORT]: ReportCategory.ANALYTICAL,
  [ReportType.STRATEGIC_REPORT]: ReportCategory.STRATEGIC,
  [ReportType.FORECAST_REPORT]: ReportCategory.FORECASTING,
  [ReportType.COMPARATIVE_REPORT]: ReportCategory.COMPARATIVE,
  [ReportType.TREND_REPORT]: ReportCategory.TREND,
  [ReportType.KPI_REPORT]: ReportCategory.PERFORMANCE,
  [ReportType.DASHBOARD_REPORT]: ReportCategory.EXECUTIVE,
  [ReportType.DETAILED_REPORT]: ReportCategory.DATA,
  [ReportType.SUMMARY_REPORT]: ReportCategory.DATA,
  [ReportType.AGGREGATED_REPORT]: ReportCategory.DATA,
  [ReportType.FILTERED_REPORT]: ReportCategory.DATA,
  [ReportType.SORTED_REPORT]: ReportCategory.DATA,
  [ReportType.GROUPED_REPORT]: ReportCategory.DATA,
  [ReportType.PIVOT_REPORT]: ReportCategory.DATA,
  [ReportType.CHART_REPORT]: ReportCategory.DATA,
  [ReportType.TABLE_REPORT]: ReportCategory.DATA,
  [ReportType.CROSS_TAB_REPORT]: ReportCategory.DATA,
  [ReportType.EXCEPTION_REPORT]: ReportCategory.OPERATIONAL,
  [ReportType.ALERT_REPORT]: ReportCategory.OPERATIONAL,
  [ReportType.SCHEDULED_REPORT]: ReportCategory.OPERATIONAL,
  [ReportType.ON_DEMAND_REPORT]: ReportCategory.CUSTOM,
  [ReportType.REAL_TIME_REPORT]: ReportCategory.REALTIME,
  [ReportType.HISTORICAL_REPORT]: ReportCategory.HISTORICAL,
  [ReportType.PREDICTIVE_REPORT]: ReportCategory.PREDICTIVE,
  [ReportType.PRESCRIPTIVE_REPORT]: ReportCategory.PRESCRIPTIVE,
  [ReportType.DIAGNOSTIC_REPORT]: ReportCategory.DIAGNOSTIC,
  [ReportType.DESCRIPTIVE_REPORT]: ReportCategory.DESCRIPTIVE,
  [ReportType.CUSTOM_REPORT]: ReportCategory.CUSTOM,
  [ReportType.AD_HOC_REPORT]: ReportCategory.CUSTOM,
  [ReportType.STANDARD_REPORT]: ReportCategory.DATA,
  [ReportType.INTERACTIVE_REPORT]: ReportCategory.DATA,
};

/**
 * Report type configuration
 */
export interface ReportTypeConfig {
  label: string;
  description: string;
  category: ReportCategory;
  icon?: string;
  color?: string;
  priority: number;
  requiresDataSelection: boolean;
  requiresDateRange: boolean;
  requiresFilters: boolean;
  isSchedulable: boolean;
}

export const REPORT_TYPE_CONFIG: Record<ReportType, ReportTypeConfig> = {
  [ReportType.EXECUTIVE_SUMMARY_REPORT]: {
    label: 'Executive Summary',
    description: 'High-level summary for executives',
    category: ReportCategory.EXECUTIVE,
    icon: 'FileText',
    color: '#3B82F6',
    priority: 1,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: false,
    isSchedulable: true,
  },
  [ReportType.OPERATIONAL_REPORT]: {
    label: 'Operational Report',
    description: 'Detailed operational performance report',
    category: ReportCategory.OPERATIONAL,
    icon: 'Activity',
    color: '#10B981',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.ANALYTICAL_REPORT]: {
    label: 'Analytical Report',
    description: 'In-depth analytical analysis report',
    category: ReportCategory.ANALYTICAL,
    icon: 'BarChart',
    color: '#8B5CF6',
    priority: 1,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.STRATEGIC_REPORT]: {
    label: 'Strategic Report',
    description: 'Long-term strategic analysis report',
    category: ReportCategory.STRATEGIC,
    icon: 'TrendingUp',
    color: '#22C55E',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: false,
    isSchedulable: true,
  },
  [ReportType.FORECAST_REPORT]: {
    label: 'Forecast Report',
    description: 'Predictive forecasting and projections',
    category: ReportCategory.FORECASTING,
    icon: 'TrendingUp',
    color: '#F59E0B',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.COMPARATIVE_REPORT]: {
    label: 'Comparative Report',
    description: 'Compare data across periods or segments',
    category: ReportCategory.COMPARATIVE,
    icon: 'GitCompare',
    color: '#6366F1',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.TREND_REPORT]: {
    label: 'Trend Report',
    description: 'Identify and analyze trends over time',
    category: ReportCategory.TREND,
    icon: 'TrendingUp',
    color: '#10B981',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.KPI_REPORT]: {
    label: 'KPI Report',
    description: 'Key performance indicators tracking',
    category: ReportCategory.PERFORMANCE,
    icon: 'Target',
    color: '#F59E0B',
    priority: 1,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.DASHBOARD_REPORT]: {
    label: 'Dashboard Report',
    description: 'Interactive dashboard-style report',
    category: ReportCategory.EXECUTIVE,
    icon: 'Layout',
    color: '#3B82F6',
    priority: 1,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.DETAILED_REPORT]: {
    label: 'Detailed Report',
    description: 'Comprehensive detailed data report',
    category: ReportCategory.DATA,
    icon: 'FileText',
    color: '#6B7280',
    priority: 3,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.SUMMARY_REPORT]: {
    label: 'Summary Report',
    description: 'Concise summary of key metrics',
    category: ReportCategory.DATA,
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: false,
    isSchedulable: true,
  },
  [ReportType.AGGREGATED_REPORT]: {
    label: 'Aggregated Report',
    description: 'Data aggregated by dimensions',
    category: ReportCategory.DATA,
    icon: 'Sigma',
    color: '#10B981',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.FILTERED_REPORT]: {
    label: 'Filtered Report',
    description: 'Report with custom filters applied',
    category: ReportCategory.DATA,
    icon: 'Filter',
    color: '#F59E0B',
    priority: 3,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: false,
  },
  [ReportType.SORTED_REPORT]: {
    label: 'Sorted Report',
    description: 'Data sorted by specified fields',
    category: ReportCategory.DATA,
    icon: 'ArrowUpDown',
    color: '#6366F1',
    priority: 3,
    requiresDataSelection: true,
    requiresDateRange: false,
    requiresFilters: false,
    isSchedulable: false,
  },
  [ReportType.GROUPED_REPORT]: {
    label: 'Grouped Report',
    description: 'Data grouped by dimensions',
    category: ReportCategory.DATA,
    icon: 'Layers',
    color: '#8B5CF6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.PIVOT_REPORT]: {
    label: 'Pivot Report',
    description: 'Data pivoted for cross-analysis',
    category: ReportCategory.DATA,
    icon: 'Grid',
    color: '#F472B6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: false,
  },
  [ReportType.CHART_REPORT]: {
    label: 'Chart Report',
    description: 'Visual chart-based report',
    category: ReportCategory.DATA,
    icon: 'PieChart',
    color: '#EC4899',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.TABLE_REPORT]: {
    label: 'Table Report',
    description: 'Tabular data report',
    category: ReportCategory.DATA,
    icon: 'Table',
    color: '#3B82F6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.CROSS_TAB_REPORT]: {
    label: 'Cross Tab Report',
    description: 'Cross-tabulated data report',
    category: ReportCategory.DATA,
    icon: 'Grid',
    color: '#10B981',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: false,
  },
  [ReportType.EXCEPTION_REPORT]: {
    label: 'Exception Report',
    description: 'Report highlighting exceptions',
    category: ReportCategory.OPERATIONAL,
    icon: 'AlertCircle',
    color: '#EF4444',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.ALERT_REPORT]: {
    label: 'Alert Report',
    description: 'Alert-based reporting',
    category: ReportCategory.OPERATIONAL,
    icon: 'Bell',
    color: '#F59E0B',
    priority: 1,
    requiresDataSelection: false,
    requiresDateRange: true,
    requiresFilters: false,
    isSchedulable: true,
  },
  [ReportType.SCHEDULED_REPORT]: {
    label: 'Scheduled Report',
    description: 'Report generated on schedule',
    category: ReportCategory.OPERATIONAL,
    icon: 'Calendar',
    color: '#6366F1',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.ON_DEMAND_REPORT]: {
    label: 'On-Demand Report',
    description: 'Report generated on request',
    category: ReportCategory.CUSTOM,
    icon: 'FilePlus',
    color: '#10B981',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: false,
  },
  [ReportType.REAL_TIME_REPORT]: {
    label: 'Real-Time Report',
    description: 'Live real-time data report',
    category: ReportCategory.REALTIME,
    icon: 'Activity',
    color: '#22C55E',
    priority: 1,
    requiresDataSelection: true,
    requiresDateRange: false,
    requiresFilters: true,
    isSchedulable: false,
  },
  [ReportType.HISTORICAL_REPORT]: {
    label: 'Historical Report',
    description: 'Historical data analysis report',
    category: ReportCategory.HISTORICAL,
    icon: 'Clock',
    color: '#8B5CF6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.PREDICTIVE_REPORT]: {
    label: 'Predictive Report',
    description: 'Predictive analytics and insights',
    category: ReportCategory.PREDICTIVE,
    icon: 'TrendingUp',
    color: '#F59E0B',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.PRESCRIPTIVE_REPORT]: {
    label: 'Prescriptive Report',
    description: 'Prescriptive analytics recommendations',
    category: ReportCategory.PRESCRIPTIVE,
    icon: 'Lightbulb',
    color: '#F472B6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.DIAGNOSTIC_REPORT]: {
    label: 'Diagnostic Report',
    description: 'Diagnostic analysis of issues',
    category: ReportCategory.DIAGNOSTIC,
    icon: 'Stethoscope',
    color: '#EF4444',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.DESCRIPTIVE_REPORT]: {
    label: 'Descriptive Report',
    description: 'Descriptive statistics and analysis',
    category: ReportCategory.DESCRIPTIVE,
    icon: 'FileText',
    color: '#3B82F6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.CUSTOM_REPORT]: {
    label: 'Custom Report',
    description: 'Custom configured report',
    category: ReportCategory.CUSTOM,
    icon: 'Settings',
    color: '#6B7280',
    priority: 3,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: true,
  },
  [ReportType.AD_HOC_REPORT]: {
    label: 'Ad-Hoc Report',
    description: 'Quick ad-hoc analysis report',
    category: ReportCategory.CUSTOM,
    icon: 'Zap',
    color: '#F59E0B',
    priority: 3,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: false,
  },
  [ReportType.STANDARD_REPORT]: {
    label: 'Standard Report',
    description: 'Standard predefined report',
    category: ReportCategory.DATA,
    icon: 'FileText',
    color: '#6B7280',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: false,
    isSchedulable: true,
  },
  [ReportType.INTERACTIVE_REPORT]: {
    label: 'Interactive Report',
    description: 'Interactive report with drill-down',
    category: ReportCategory.DATA,
    icon: 'MousePointerClick',
    color: '#8B5CF6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    requiresFilters: true,
    isSchedulable: false,
  },
};

/**
 * Get report type label
 */
export function getReportTypeLabel(type: ReportType): string {
  return REPORT_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get report type description
 */
export function getReportTypeDescription(type: ReportType): string {
  return REPORT_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get report type category
 */
export function getReportTypeCategory(type: ReportType): ReportCategory {
  return REPORT_TYPE_CATEGORY_MAP[type];
}

/**
 * Get report types by category
 */
export function getReportTypesByCategory(category: ReportCategory): ReportType[] {
  return Object.entries(REPORT_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as ReportType);
}

/**
 * Get executive reports
 */
export function getExecutiveReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.EXECUTIVE);
}

/**
 * Get operational reports
 */
export function getOperationalReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.OPERATIONAL);
}

/**
 * Get analytical reports
 */
export function getAnalyticalReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.ANALYTICAL);
}

/**
 * Get strategic reports
 */
export function getStrategicReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.STRATEGIC);
}

/**
 * Get performance reports
 */
export function getPerformanceReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.PERFORMANCE);
}

/**
 * Get data reports
 */
export function getDataReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.DATA);
}

/**
 * Get custom reports
 */
export function getCustomReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.CUSTOM);
}

/**
 * Get real-time reports
 */
export function getRealtimeReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.REALTIME);
}

/**
 * Get predictive reports
 */
export function getPredictiveReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.PREDICTIVE);
}

/**
 * Get prescriptive reports
 */
export function getPrescriptiveReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.PRESCRIPTIVE);
}

/**
 * Get diagnostic reports
 */
export function getDiagnosticReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.DIAGNOSTIC);
}

/**
 * Get descriptive reports
 */
export function getDescriptiveReports(): ReportType[] {
  return getReportTypesByCategory(ReportCategory.DESCRIPTIVE);
}

/**
 * Get schedulable reports
 */
export function getSchedulableReports(): ReportType[] {
  return Object.entries(REPORT_TYPE_CONFIG)
    .filter(([_, config]) => config.isSchedulable)
    .map(([type]) => type as ReportType);
}

/**
 * Check if report type is schedulable
 */
export function isReportTypeSchedulable(type: ReportType): boolean {
  return REPORT_TYPE_CONFIG[type]?.isSchedulable || false;
}

/**
 * Check if report type requires date range
 */
export function reportTypeRequiresDateRange(type: ReportType): boolean {
  return REPORT_TYPE_CONFIG[type]?.requiresDateRange || false;
}

/**
 * Check if report type requires filters
 */
export function reportTypeRequiresFilters(type: ReportType): boolean {
  return REPORT_TYPE_CONFIG[type]?.requiresFilters || false;
}

/**
 * Get report type priority
 */
export function getReportTypePriority(type: ReportType): number {
  return REPORT_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Get high priority report types
 */
export function getHighPriorityReportTypes(): ReportType[] {
  return Object.values(ReportType).filter((type) => getReportTypePriority(type) === 1);
}

/**
 * Report type status
 */
export enum ReportTypeStatus {
  /** Active and available */
  ACTIVE = 'ACTIVE',
  /** Inactive and hidden */
  INACTIVE = 'INACTIVE',
  /** Under maintenance */
  MAINTENANCE = 'MAINTENANCE',
  /** Deprecated */
  DEPRECATED = 'DEPRECATED',
}

/**
 * Default status for report types
 */
export const REPORT_TYPE_DEFAULT_STATUS: Record<ReportType, ReportTypeStatus> = {
  [ReportType.EXECUTIVE_SUMMARY_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.OPERATIONAL_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.ANALYTICAL_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.STRATEGIC_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.FORECAST_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.COMPARATIVE_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.TREND_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.KPI_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.DASHBOARD_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.DETAILED_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.SUMMARY_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.AGGREGATED_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.FILTERED_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.SORTED_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.GROUPED_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.PIVOT_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.CHART_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.TABLE_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.CROSS_TAB_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.EXCEPTION_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.ALERT_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.SCHEDULED_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.ON_DEMAND_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.REAL_TIME_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.HISTORICAL_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.PREDICTIVE_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.PRESCRIPTIVE_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.DIAGNOSTIC_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.DESCRIPTIVE_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.CUSTOM_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.AD_HOC_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.STANDARD_REPORT]: ReportTypeStatus.ACTIVE,
  [ReportType.INTERACTIVE_REPORT]: ReportTypeStatus.ACTIVE,
};

/**
 * Get report type status
 */
export function getReportTypeStatus(type: ReportType): ReportTypeStatus {
  return REPORT_TYPE_DEFAULT_STATUS[type] || ReportTypeStatus.INACTIVE;
}

/**
 * Set report type status
 */
export function setReportTypeStatus(type: ReportType, status: ReportTypeStatus): void {
  REPORT_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Report type priority levels
 */
export const REPORT_TYPE_PRIORITY_LEVELS = {
  /** Critical priority - essential reports */
  CRITICAL: 1,
  /** High priority - important reports */
  HIGH: 2,
  /** Medium priority - useful reports */
  MEDIUM: 3,
  /** Low priority - nice to have */
  LOW: 4,
} as const;

/**
 * Get report types by priority
 */
export function getReportTypesByPriority(priority: number): ReportType[] {
  return Object.entries(REPORT_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as ReportType);
}

/**
 * Get critical report types
 */
export function getCriticalReportTypes(): ReportType[] {
  return getReportTypesByPriority(REPORT_TYPE_PRIORITY_LEVELS.CRITICAL);
}
