/**
 * @fileoverview Report export type definitions and constants
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Export types enum
 */
export enum ExportType {
  /** Full export - all data */
  FULL_EXPORT = 'FULL_EXPORT',
  /** Partial export - selected data */
  PARTIAL_EXPORT = 'PARTIAL_EXPORT',
  /** Summary export - summarized data */
  SUMMARY_EXPORT = 'SUMMARY_EXPORT',
  /** Detailed export - detailed data */
  DETAILED_EXPORT = 'DETAILED_EXPORT',
  /** Filtered export - filtered data */
  FILTERED_EXPORT = 'FILTERED_EXPORT',
  /** Sorted export - sorted data */
  SORTED_EXPORT = 'SORTED_EXPORT',
  /** Grouped export - grouped data */
  GROUPED_EXPORT = 'GROUPED_EXPORT',
  /** Aggregated export - aggregated data */
  AGGREGATED_EXPORT = 'AGGREGATED_EXPORT',
  /** Pivot export - pivoted data */
  PIVOT_EXPORT = 'PIVOT_EXPORT',
  /** Cross tab export - cross-tabulated data */
  CROSS_TAB_EXPORT = 'CROSS_TAB_EXPORT',
  /** Chart export - chart data */
  CHART_EXPORT = 'CHART_EXPORT',
  /** Table export - table data */
  TABLE_EXPORT = 'TABLE_EXPORT',
  /** Report export - report data */
  REPORT_EXPORT = 'REPORT_EXPORT',
  /** Dashboard export - dashboard data */
  DASHBOARD_EXPORT = 'DASHBOARD_EXPORT',
  /** Widget export - widget data */
  WIDGET_EXPORT = 'WIDGET_EXPORT',
  /** Metric export - metric data */
  METRIC_EXPORT = 'METRIC_EXPORT',
  /** KPI export - KPI data */
  KPI_EXPORT = 'KPI_EXPORT',
  /** Dataset export - dataset data */
  DATASET_EXPORT = 'DATASET_EXPORT',
  /** Raw data export - unprocessed data */
  RAW_DATA_EXPORT = 'RAW_DATA_EXPORT',
  /** Processed data export - processed data */
  PROCESSED_DATA_EXPORT = 'PROCESSED_DATA_EXPORT',
  /** Transformed data export - transformed data */
  TRANSFORMED_DATA_EXPORT = 'TRANSFORMED_DATA_EXPORT',
  /** Analyzed data export - analyzed data */
  ANALYZED_DATA_EXPORT = 'ANALYZED_DATA_EXPORT',
  /** Visualized data export - visualized data */
  VISUALIZED_DATA_EXPORT = 'VISUALIZED_DATA_EXPORT',
  /** Structured export - structured format */
  STRUCTURED_EXPORT = 'STRUCTURED_EXPORT',
  /** Unstructured export - unstructured format */
  UNSTRUCTURED_EXPORT = 'UNSTRUCTURED_EXPORT',
  /** Streaming export - streaming data */
  STREAMING_EXPORT = 'STREAMING_EXPORT',
  /** Batch export - batch data */
  BATCH_EXPORT = 'BATCH_EXPORT',
  /** Real-time export - real-time data */
  REAL_TIME_EXPORT = 'REAL_TIME_EXPORT',
  /** Scheduled export - scheduled data */
  SCHEDULED_EXPORT = 'SCHEDULED_EXPORT',
  /** On-demand export - on-demand data */
  ON_DEMAND_EXPORT = 'ON_DEMAND_EXPORT',
  /** One-time export - one-time data */
  ONE_TIME_EXPORT = 'ONE_TIME_EXPORT',
  /** Recurring export - recurring data */
  RECURRING_EXPORT = 'RECURRING_EXPORT',
  /** Custom export - custom data */
  CUSTOM_EXPORT = 'CUSTOM_EXPORT',
  /** Compressed export - compressed data */
  COMPRESSED_EXPORT = 'COMPRESSED_EXPORT',
  /** Encrypted export - encrypted data */
  ENCRYPTED_EXPORT = 'ENCRYPTED_EXPORT',
  /** Signed export - signed data */
  SIGNED_EXPORT = 'SIGNED_EXPORT',
  /** Authenticated export - authenticated data */
  AUTHENTICATED_EXPORT = 'AUTHENTICATED_EXPORT',
  /** Anonymous export - anonymous data */
  ANONYMOUS_EXPORT = 'ANONYMOUS_EXPORT',
  /** Public export - public data */
  PUBLIC_EXPORT = 'PUBLIC_EXPORT',
  /** Private export - private data */
  PRIVATE_EXPORT = 'PRIVATE_EXPORT',
  /** Shared export - shared data */
  SHARED_EXPORT = 'SHARED_EXPORT',
  /** Restricted export - restricted data */
  RESTRICTED_EXPORT = 'RESTRICTED_EXPORT',
}

/**
 * Export category for grouping
 */
export enum ExportCategory {
  /** Data scope exports */
  DATA_SCOPE = 'DATA_SCOPE',
  /** Data format exports */
  DATA_FORMAT = 'DATA_FORMAT',
  /** Data type exports */
  DATA_TYPE = 'DATA_TYPE',
  /** Export method exports */
  EXPORT_METHOD = 'EXPORT_METHOD',
  /** Export timing exports */
  EXPORT_TIMING = 'EXPORT_TIMING',
  /** Export security exports */
  EXPORT_SECURITY = 'EXPORT_SECURITY',
  /** Export access exports */
  EXPORT_ACCESS = 'EXPORT_ACCESS',
  /** Export processing exports */
  EXPORT_PROCESSING = 'EXPORT_PROCESSING',
}

/**
 * Export category mapping
 */
export const EXPORT_TYPE_CATEGORY_MAP: Record<ExportType, ExportCategory> = {
  [ExportType.FULL_EXPORT]: ExportCategory.DATA_SCOPE,
  [ExportType.PARTIAL_EXPORT]: ExportCategory.DATA_SCOPE,
  [ExportType.SUMMARY_EXPORT]: ExportCategory.DATA_TYPE,
  [ExportType.DETAILED_EXPORT]: ExportCategory.DATA_TYPE,
  [ExportType.FILTERED_EXPORT]: ExportCategory.DATA_TYPE,
  [ExportType.SORTED_EXPORT]: ExportCategory.DATA_TYPE,
  [ExportType.GROUPED_EXPORT]: ExportCategory.DATA_TYPE,
  [ExportType.AGGREGATED_EXPORT]: ExportCategory.DATA_TYPE,
  [ExportType.PIVOT_EXPORT]: ExportCategory.DATA_FORMAT,
  [ExportType.CROSS_TAB_EXPORT]: ExportCategory.DATA_FORMAT,
  [ExportType.CHART_EXPORT]: ExportCategory.DATA_FORMAT,
  [ExportType.TABLE_EXPORT]: ExportCategory.DATA_FORMAT,
  [ExportType.REPORT_EXPORT]: ExportCategory.DATA_SCOPE,
  [ExportType.DASHBOARD_EXPORT]: ExportCategory.DATA_SCOPE,
  [ExportType.WIDGET_EXPORT]: ExportCategory.DATA_SCOPE,
  [ExportType.METRIC_EXPORT]: ExportCategory.DATA_SCOPE,
  [ExportType.KPI_EXPORT]: ExportCategory.DATA_SCOPE,
  [ExportType.DATASET_EXPORT]: ExportCategory.DATA_SCOPE,
  [ExportType.RAW_DATA_EXPORT]: ExportCategory.DATA_TYPE,
  [ExportType.PROCESSED_DATA_EXPORT]: ExportCategory.DATA_TYPE,
  [ExportType.TRANSFORMED_DATA_EXPORT]: ExportCategory.DATA_TYPE,
  [ExportType.ANALYZED_DATA_EXPORT]: ExportCategory.DATA_TYPE,
  [ExportType.VISUALIZED_DATA_EXPORT]: ExportCategory.DATA_TYPE,
  [ExportType.STRUCTURED_EXPORT]: ExportCategory.DATA_FORMAT,
  [ExportType.UNSTRUCTURED_EXPORT]: ExportCategory.DATA_FORMAT,
  [ExportType.STREAMING_EXPORT]: ExportCategory.EXPORT_METHOD,
  [ExportType.BATCH_EXPORT]: ExportCategory.EXPORT_METHOD,
  [ExportType.REAL_TIME_EXPORT]: ExportCategory.EXPORT_TIMING,
  [ExportType.SCHEDULED_EXPORT]: ExportCategory.EXPORT_TIMING,
  [ExportType.ON_DEMAND_EXPORT]: ExportCategory.EXPORT_TIMING,
  [ExportType.ONE_TIME_EXPORT]: ExportCategory.EXPORT_TIMING,
  [ExportType.RECURRING_EXPORT]: ExportCategory.EXPORT_TIMING,
  [ExportType.CUSTOM_EXPORT]: ExportCategory.EXPORT_METHOD,
  [ExportType.COMPRESSED_EXPORT]: ExportCategory.EXPORT_PROCESSING,
  [ExportType.ENCRYPTED_EXPORT]: ExportCategory.EXPORT_PROCESSING,
  [ExportType.SIGNED_EXPORT]: ExportCategory.EXPORT_SECURITY,
  [ExportType.AUTHENTICATED_EXPORT]: ExportCategory.EXPORT_SECURITY,
  [ExportType.ANONYMOUS_EXPORT]: ExportCategory.EXPORT_ACCESS,
  [ExportType.PUBLIC_EXPORT]: ExportCategory.EXPORT_ACCESS,
  [ExportType.PRIVATE_EXPORT]: ExportCategory.EXPORT_ACCESS,
  [ExportType.SHARED_EXPORT]: ExportCategory.EXPORT_ACCESS,
  [ExportType.RESTRICTED_EXPORT]: ExportCategory.EXPORT_ACCESS,
};

/**
 * Export type configuration
 */
export interface ExportTypeConfig {
  label: string;
  description: string;
  category: ExportCategory;
  icon?: string;
  color?: string;
  priority: number;
  requiresDataSelection: boolean;
  requiresDateRange: boolean;
  supportsStreaming: boolean;
  isRealtime: boolean;
}

export const EXPORT_TYPE_CONFIG: Record<ExportType, ExportTypeConfig> = {
  [ExportType.FULL_EXPORT]: {
    label: 'Full Export',
    description: 'Export all available data',
    category: ExportCategory.DATA_SCOPE,
    icon: 'Database',
    color: '#3B82F6',
    priority: 1,
    requiresDataSelection: false,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.PARTIAL_EXPORT]: {
    label: 'Partial Export',
    description: 'Export selected data subset',
    category: ExportCategory.DATA_SCOPE,
    icon: 'Database',
    color: '#6366F1',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.SUMMARY_EXPORT]: {
    label: 'Summary Export',
    description: 'Export summarized data',
    category: ExportCategory.DATA_TYPE,
    icon: 'FileText',
    color: '#10B981',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.DETAILED_EXPORT]: {
    label: 'Detailed Export',
    description: 'Export detailed data with all fields',
    category: ExportCategory.DATA_TYPE,
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 1,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.FILTERED_EXPORT]: {
    label: 'Filtered Export',
    description: 'Export data with filters applied',
    category: ExportCategory.DATA_TYPE,
    icon: 'Filter',
    color: '#F59E0B',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.SORTED_EXPORT]: {
    label: 'Sorted Export',
    description: 'Export sorted data',
    category: ExportCategory.DATA_TYPE,
    icon: 'ArrowUpDown',
    color: '#6366F1',
    priority: 3,
    requiresDataSelection: true,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.GROUPED_EXPORT]: {
    label: 'Grouped Export',
    description: 'Export grouped data by dimensions',
    category: ExportCategory.DATA_TYPE,
    icon: 'Layers',
    color: '#10B981',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.AGGREGATED_EXPORT]: {
    label: 'Aggregated Export',
    description: 'Export aggregated data',
    category: ExportCategory.DATA_TYPE,
    icon: 'Sigma',
    color: '#22C55E',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.PIVOT_EXPORT]: {
    label: 'Pivot Export',
    description: 'Export pivoted data',
    category: ExportCategory.DATA_FORMAT,
    icon: 'Grid',
    color: '#EC4899',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.CROSS_TAB_EXPORT]: {
    label: 'Cross Tab Export',
    description: 'Export cross-tabulated data',
    category: ExportCategory.DATA_FORMAT,
    icon: 'Grid',
    color: '#F472B6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.CHART_EXPORT]: {
    label: 'Chart Export',
    description: 'Export chart data and visualization',
    category: ExportCategory.DATA_FORMAT,
    icon: 'BarChart',
    color: '#3B82F6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.TABLE_EXPORT]: {
    label: 'Table Export',
    description: 'Export tabular data',
    category: ExportCategory.DATA_FORMAT,
    icon: 'Table',
    color: '#6B7280',
    priority: 1,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.REPORT_EXPORT]: {
    label: 'Report Export',
    description: 'Export complete report data',
    category: ExportCategory.DATA_SCOPE,
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 1,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.DASHBOARD_EXPORT]: {
    label: 'Dashboard Export',
    description: 'Export dashboard data and layout',
    category: ExportCategory.DATA_SCOPE,
    icon: 'Layout',
    color: '#10B981',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.WIDGET_EXPORT]: {
    label: 'Widget Export',
    description: 'Export widget data',
    category: ExportCategory.DATA_SCOPE,
    icon: 'LayoutGrid',
    color: '#F59E0B',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.METRIC_EXPORT]: {
    label: 'Metric Export',
    description: 'Export metric data',
    category: ExportCategory.DATA_SCOPE,
    icon: 'DollarSign',
    color: '#22C55E',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.KPI_EXPORT]: {
    label: 'KPI Export',
    description: 'Export KPI data',
    category: ExportCategory.DATA_SCOPE,
    icon: 'Target',
    color: '#F59E0B',
    priority: 1,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.DATASET_EXPORT]: {
    label: 'Dataset Export',
    description: 'Export dataset data',
    category: ExportCategory.DATA_SCOPE,
    icon: 'Database',
    color: '#3B82F6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.RAW_DATA_EXPORT]: {
    label: 'Raw Data Export',
    description: 'Export unprocessed raw data',
    category: ExportCategory.DATA_TYPE,
    icon: 'FileText',
    color: '#6B7280',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: true,
    isRealtime: false,
  },
  [ExportType.PROCESSED_DATA_EXPORT]: {
    label: 'Processed Data Export',
    description: 'Export processed data',
    category: ExportCategory.DATA_TYPE,
    icon: 'FileText',
    color: '#10B981',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.TRANSFORMED_DATA_EXPORT]: {
    label: 'Transformed Data Export',
    description: 'Export transformed data',
    category: ExportCategory.DATA_TYPE,
    icon: 'FileText',
    color: '#8B5CF6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.ANALYZED_DATA_EXPORT]: {
    label: 'Analyzed Data Export',
    description: 'Export analyzed data with insights',
    category: ExportCategory.DATA_TYPE,
    icon: 'FileText',
    color: '#F59E0B',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.VISUALIZED_DATA_EXPORT]: {
    label: 'Visualized Data Export',
    description: 'Export visualized data and charts',
    category: ExportCategory.DATA_TYPE,
    icon: 'FileText',
    color: '#EC4899',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.STRUCTURED_EXPORT]: {
    label: 'Structured Export',
    description: 'Export structured data format',
    category: ExportCategory.DATA_FORMAT,
    icon: 'FileText',
    color: '#3B82F6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.UNSTRUCTURED_EXPORT]: {
    label: 'Unstructured Export',
    description: 'Export unstructured data format',
    category: ExportCategory.DATA_FORMAT,
    icon: 'FileText',
    color: '#6B7280',
    priority: 3,
    requiresDataSelection: true,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.STREAMING_EXPORT]: {
    label: 'Streaming Export',
    description: 'Export streaming data',
    category: ExportCategory.EXPORT_METHOD,
    icon: 'Zap',
    color: '#F59E0B',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: true,
    isRealtime: true,
  },
  [ExportType.BATCH_EXPORT]: {
    label: 'Batch Export',
    description: 'Export data in batches',
    category: ExportCategory.EXPORT_METHOD,
    icon: 'Database',
    color: '#6366F1',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.REAL_TIME_EXPORT]: {
    label: 'Real-Time Export',
    description: 'Export real-time data',
    category: ExportCategory.EXPORT_TIMING,
    icon: 'Activity',
    color: '#22C55E',
    priority: 1,
    requiresDataSelection: true,
    requiresDateRange: false,
    supportsStreaming: true,
    isRealtime: true,
  },
  [ExportType.SCHEDULED_EXPORT]: {
    label: 'Scheduled Export',
    description: 'Export on a schedule',
    category: ExportCategory.EXPORT_TIMING,
    icon: 'Calendar',
    color: '#8B5CF6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.ON_DEMAND_EXPORT]: {
    label: 'On-Demand Export',
    description: 'Export on request',
    category: ExportCategory.EXPORT_TIMING,
    icon: 'FilePlus',
    color: '#10B981',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.ONE_TIME_EXPORT]: {
    label: 'One-Time Export',
    description: 'One-time export',
    category: ExportCategory.EXPORT_TIMING,
    icon: 'FileText',
    color: '#6B7280',
    priority: 3,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.RECURRING_EXPORT]: {
    label: 'Recurring Export',
    description: 'Recurring export',
    category: ExportCategory.EXPORT_TIMING,
    icon: 'Repeat',
    color: '#F472B6',
    priority: 2,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.CUSTOM_EXPORT]: {
    label: 'Custom Export',
    description: 'Custom export configuration',
    category: ExportCategory.EXPORT_METHOD,
    icon: 'Settings',
    color: '#6B7280',
    priority: 3,
    requiresDataSelection: true,
    requiresDateRange: true,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.COMPRESSED_EXPORT]: {
    label: 'Compressed Export',
    description: 'Compressed export file',
    category: ExportCategory.EXPORT_PROCESSING,
    icon: 'FileArchive',
    color: '#F59E0B',
    priority: 2,
    requiresDataSelection: false,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.ENCRYPTED_EXPORT]: {
    label: 'Encrypted Export',
    description: 'Encrypted export file',
    category: ExportCategory.EXPORT_PROCESSING,
    icon: 'Lock',
    color: '#EF4444',
    priority: 2,
    requiresDataSelection: false,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.SIGNED_EXPORT]: {
    label: 'Signed Export',
    description: 'Digitally signed export',
    category: ExportCategory.EXPORT_SECURITY,
    icon: 'FileCheck',
    color: '#22C55E',
    priority: 2,
    requiresDataSelection: false,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.AUTHENTICATED_EXPORT]: {
    label: 'Authenticated Export',
    description: 'Authenticated export access',
    category: ExportCategory.EXPORT_SECURITY,
    icon: 'ShieldCheck',
    color: '#10B981',
    priority: 1,
    requiresDataSelection: false,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.ANONYMOUS_EXPORT]: {
    label: 'Anonymous Export',
    description: 'Anonymous export access',
    category: ExportCategory.EXPORT_ACCESS,
    icon: 'User',
    color: '#6B7280',
    priority: 3,
    requiresDataSelection: false,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.PUBLIC_EXPORT]: {
    label: 'Public Export',
    description: 'Publicly accessible export',
    category: ExportCategory.EXPORT_ACCESS,
    icon: 'Globe',
    color: '#22C55E',
    priority: 3,
    requiresDataSelection: false,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.PRIVATE_EXPORT]: {
    label: 'Private Export',
    description: 'Private export access',
    category: ExportCategory.EXPORT_ACCESS,
    icon: 'Lock',
    color: '#6B7280',
    priority: 2,
    requiresDataSelection: false,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.SHARED_EXPORT]: {
    label: 'Shared Export',
    description: 'Shared export access',
    category: ExportCategory.EXPORT_ACCESS,
    icon: 'Share2',
    color: '#8B5CF6',
    priority: 2,
    requiresDataSelection: false,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
  [ExportType.RESTRICTED_EXPORT]: {
    label: 'Restricted Export',
    description: 'Restricted export access',
    category: ExportCategory.EXPORT_ACCESS,
    icon: 'Shield',
    color: '#EF4444',
    priority: 2,
    requiresDataSelection: false,
    requiresDateRange: false,
    supportsStreaming: false,
    isRealtime: false,
  },
};

/**
 * Get export type label
 */
export function getExportTypeLabel(type: ExportType): string {
  return EXPORT_TYPE_CONFIG[type]?.label || type;
}

/**
 * Get export type description
 */
export function getExportTypeDescription(type: ExportType): string {
  return EXPORT_TYPE_CONFIG[type]?.description || '';
}

/**
 * Get export type category
 */
export function getExportTypeCategory(type: ExportType): ExportCategory {
  return EXPORT_TYPE_CATEGORY_MAP[type];
}

/**
 * Get export types by category
 */
export function getExportTypesByCategory(category: ExportCategory): ExportType[] {
  return Object.entries(EXPORT_TYPE_CATEGORY_MAP)
    .filter(([_, cat]) => cat === category)
    .map(([type]) => type as ExportType);
}

/**
 * Get data scope exports
 */
export function getDataScopeExports(): ExportType[] {
  return getExportTypesByCategory(ExportCategory.DATA_SCOPE);
}

/**
 * Get data format exports
 */
export function getDataFormatExports(): ExportType[] {
  return getExportTypesByCategory(ExportCategory.DATA_FORMAT);
}

/**
 * Get data type exports
 */
export function getDataTypeExports(): ExportType[] {
  return getExportTypesByCategory(ExportCategory.DATA_TYPE);
}

/**
 * Get export method exports
 */
export function getExportMethodExports(): ExportType[] {
  return getExportTypesByCategory(ExportCategory.EXPORT_METHOD);
}

/**
 * Get export timing exports
 */
export function getExportTimingExports(): ExportType[] {
  return getExportTypesByCategory(ExportCategory.EXPORT_TIMING);
}

/**
 * Get export security exports
 */
export function getExportSecurityExports(): ExportType[] {
  return getExportTypesByCategory(ExportCategory.EXPORT_SECURITY);
}

/**
 * Get export access exports
 */
export function getExportAccessExports(): ExportType[] {
  return getExportTypesByCategory(ExportCategory.EXPORT_ACCESS);
}

/**
 * Get export processing exports
 */
export function getExportProcessingExports(): ExportType[] {
  return getExportTypesByCategory(ExportCategory.EXPORT_PROCESSING);
}

/**
 * Check if export type requires data selection
 */
export function exportTypeRequiresDataSelection(type: ExportType): boolean {
  return EXPORT_TYPE_CONFIG[type]?.requiresDataSelection || false;
}

/**
 * Check if export type requires date range
 */
export function exportTypeRequiresDateRange(type: ExportType): boolean {
  return EXPORT_TYPE_CONFIG[type]?.requiresDateRange || false;
}

/**
 * Check if export type supports streaming
 */
export function exportTypeSupportsStreaming(type: ExportType): boolean {
  return EXPORT_TYPE_CONFIG[type]?.supportsStreaming || false;
}

/**
 * Check if export type is real-time
 */
export function isExportTypeRealtime(type: ExportType): boolean {
  return EXPORT_TYPE_CONFIG[type]?.isRealtime || false;
}

/**
 * Get export type priority
 */
export function getExportTypePriority(type: ExportType): number {
  return EXPORT_TYPE_CONFIG[type]?.priority || 3;
}

/**
 * Export type status
 */
export enum ExportTypeStatus {
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
 * Default status for export types
 */
export const EXPORT_TYPE_DEFAULT_STATUS: Record<ExportType, ExportTypeStatus> = {
  [ExportType.FULL_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.PARTIAL_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.SUMMARY_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.DETAILED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.FILTERED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.SORTED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.GROUPED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.AGGREGATED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.PIVOT_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.CROSS_TAB_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.CHART_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.TABLE_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.REPORT_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.DASHBOARD_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.WIDGET_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.METRIC_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.KPI_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.DATASET_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.RAW_DATA_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.PROCESSED_DATA_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.TRANSFORMED_DATA_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.ANALYZED_DATA_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.VISUALIZED_DATA_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.STRUCTURED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.UNSTRUCTURED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.STREAMING_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.BATCH_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.REAL_TIME_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.SCHEDULED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.ON_DEMAND_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.ONE_TIME_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.RECURRING_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.CUSTOM_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.COMPRESSED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.ENCRYPTED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.SIGNED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.AUTHENTICATED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.ANONYMOUS_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.PUBLIC_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.PRIVATE_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.SHARED_EXPORT]: ExportTypeStatus.ACTIVE,
  [ExportType.RESTRICTED_EXPORT]: ExportTypeStatus.ACTIVE,
};

/**
 * Get export type status
 */
export function getExportTypeStatus(type: ExportType): ExportTypeStatus {
  return EXPORT_TYPE_DEFAULT_STATUS[type] || ExportTypeStatus.INACTIVE;
}

/**
 * Set export type status
 */
export function setExportTypeStatus(type: ExportType, status: ExportTypeStatus): void {
  EXPORT_TYPE_DEFAULT_STATUS[type] = status;
}

/**
 * Export type priority levels
 */
export const EXPORT_TYPE_PRIORITY_LEVELS = {
  /** Critical - essential exports */
  CRITICAL: 1,
  /** High - important exports */
  HIGH: 2,
  /** Medium - useful exports */
  MEDIUM: 3,
  /** Low - nice to have */
  LOW: 4,
} as const;

/**
 * Get export types by priority
 */
export function getExportTypesByPriority(priority: number): ExportType[] {
  return Object.entries(EXPORT_TYPE_CONFIG)
    .filter(([_, config]) => config.priority === priority)
    .map(([type]) => type as ExportType);
}

/**
 * Get critical export types
 */
export function getCriticalExportTypes(): ExportType[] {
  return getExportTypesByPriority(EXPORT_TYPE_PRIORITY_LEVELS.CRITICAL);
}

/**
 * Export type groups
 */
export const EXPORT_TYPE_GROUPS = {
  /** Data scope exports */
  DATA_SCOPE: [
    ExportType.FULL_EXPORT,
    ExportType.PARTIAL_EXPORT,
    ExportType.REPORT_EXPORT,
    ExportType.DASHBOARD_EXPORT,
    ExportType.WIDGET_EXPORT,
    ExportType.METRIC_EXPORT,
    ExportType.KPI_EXPORT,
    ExportType.DATASET_EXPORT,
  ],
  /** Data type exports */
  DATA_TYPE: [
    ExportType.SUMMARY_EXPORT,
    ExportType.DETAILED_EXPORT,
    ExportType.FILTERED_EXPORT,
    ExportType.SORTED_EXPORT,
    ExportType.GROUPED_EXPORT,
    ExportType.AGGREGATED_EXPORT,
    ExportType.RAW_DATA_EXPORT,
    ExportType.PROCESSED_DATA_EXPORT,
    ExportType.TRANSFORMED_DATA_EXPORT,
    ExportType.ANALYZED_DATA_EXPORT,
    ExportType.VISUALIZED_DATA_EXPORT,
  ],
  /** Data format exports */
  DATA_FORMAT: [
    ExportType.PIVOT_EXPORT,
    ExportType.CROSS_TAB_EXPORT,
    ExportType.CHART_EXPORT,
    ExportType.TABLE_EXPORT,
    ExportType.STRUCTURED_EXPORT,
    ExportType.UNSTRUCTURED_EXPORT,
  ],
  /** Security exports */
  SECURITY: [
    ExportType.SIGNED_EXPORT,
    ExportType.AUTHENTICATED_EXPORT,
    ExportType.COMPRESSED_EXPORT,
    ExportType.ENCRYPTED_EXPORT,
  ],
} as const;
