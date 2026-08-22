/**
 * AI Analytics Type Constants
 * Types and classifications for AI analytics
 */

export const AI_ANALYTICS_TYPE = {
  // Analysis Types
  ANALYSIS_TYPES: {
    TREND: 'trend',
    PATTERN: 'pattern',
    CORRELATION: 'correlation',
    REGRESSION: 'regression',
    CLUSTERING: 'clustering',
    CLASSIFICATION: 'classification',
    ANOMALY: 'anomaly',
    FORECAST: 'forecast',
    OPTIMIZATION: 'optimization',
    SIMULATION: 'simulation',
    WHAT_IF: 'what_if',
    SENSITIVITY: 'sensitivity',
  } as const,

  // Data Types
  DATA_TYPES: {
    NUMERICAL: 'numerical',
    CATEGORICAL: 'categorical',
    ORDINAL: 'ordinal',
    NOMINAL: 'nominal',
    BINARY: 'binary',
    TIME_SERIES: 'time_series',
    SPATIAL: 'spatial',
    TEXT: 'text',
    IMAGE: 'image',
    MIXED: 'mixed',
  } as const,

  // Analysis Methods
  METHODS: {
    STATISTICAL: 'statistical',
    MACHINE_LEARNING: 'machine_learning',
    DEEP_LEARNING: 'deep_learning',
    RULE_BASED: 'rule_based',
    HYBRID: 'hybrid',
    ENSEMBLE: 'ensemble',
  } as const,

  // Data Sources
  SOURCES: {
    DATABASE: 'database',
    DATA_WAREHOUSE: 'data_warehouse',
    DATA_LAKE: 'data_lake',
    STREAMING: 'streaming',
    API: 'api',
    FILE: 'file',
    EXTERNAL: 'external',
    THIRD_PARTY: 'third_party',
  } as const,

  // Analysis Scopes
  SCOPES: {
    GLOBAL: 'global',
    REGIONAL: 'regional',
    LOCAL: 'local',
    SEGMENT: 'segment',
    COHORT: 'cohort',
    INDIVIDUAL: 'individual',
  } as const,

  // Analysis Levels
  LEVELS: {
    SUMMARY: 'summary',
    DETAILED: 'detailed',
    GRANULAR: 'granular',
    AGGREGATED: 'aggregated',
    RAW: 'raw',
  } as const,
} as const;

// Analysis Types
export type AIAnalyticsAnalysisType =
  (typeof AI_ANALYTICS_TYPE.ANALYSIS_TYPES)[keyof typeof AI_ANALYTICS_TYPE.ANALYSIS_TYPES];

// Data Types
export type AIAnalyticsDataType =
  (typeof AI_ANALYTICS_TYPE.DATA_TYPES)[keyof typeof AI_ANALYTICS_TYPE.DATA_TYPES];

// Analysis Methods
export type AIAnalyticsMethod =
  (typeof AI_ANALYTICS_TYPE.METHODS)[keyof typeof AI_ANALYTICS_TYPE.METHODS];

// Data Sources
export type AIAnalyticsDataSource =
  (typeof AI_ANALYTICS_TYPE.SOURCES)[keyof typeof AI_ANALYTICS_TYPE.SOURCES];

// Analysis Scopes
export type AIAnalyticsScope =
  (typeof AI_ANALYTICS_TYPE.SCOPES)[keyof typeof AI_ANALYTICS_TYPE.SCOPES];

// Analysis Levels
export type AIAnalyticsLevel =
  (typeof AI_ANALYTICS_TYPE.LEVELS)[keyof typeof AI_ANALYTICS_TYPE.LEVELS];

// Utility Functions
export function getAnalyticsAnalysisTypeLabel(type: AIAnalyticsAnalysisType): string {
  const labels: Record<AIAnalyticsAnalysisType, string> = {
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.TREND]: 'Trend Analysis',
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.PATTERN]: 'Pattern Analysis',
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.CORRELATION]: 'Correlation Analysis',
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.REGRESSION]: 'Regression Analysis',
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.CLUSTERING]: 'Clustering Analysis',
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.CLASSIFICATION]: 'Classification Analysis',
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.ANOMALY]: 'Anomaly Detection',
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.FORECAST]: 'Forecasting',
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.OPTIMIZATION]: 'Optimization',
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.SIMULATION]: 'Simulation',
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.WHAT_IF]: 'What-If Analysis',
    [AI_ANALYTICS_TYPE.ANALYSIS_TYPES.SENSITIVITY]: 'Sensitivity Analysis',
  };
  return labels[type] || 'Unknown';
}

export function getAnalyticsDataTypeLabel(dataType: AIAnalyticsDataType): string {
  const labels: Record<AIAnalyticsDataType, string> = {
    [AI_ANALYTICS_TYPE.DATA_TYPES.NUMERICAL]: 'Numerical',
    [AI_ANALYTICS_TYPE.DATA_TYPES.CATEGORICAL]: 'Categorical',
    [AI_ANALYTICS_TYPE.DATA_TYPES.ORDINAL]: 'Ordinal',
    [AI_ANALYTICS_TYPE.DATA_TYPES.NOMINAL]: 'Nominal',
    [AI_ANALYTICS_TYPE.DATA_TYPES.BINARY]: 'Binary',
    [AI_ANALYTICS_TYPE.DATA_TYPES.TIME_SERIES]: 'Time Series',
    [AI_ANALYTICS_TYPE.DATA_TYPES.SPATIAL]: 'Spatial',
    [AI_ANALYTICS_TYPE.DATA_TYPES.TEXT]: 'Text',
    [AI_ANALYTICS_TYPE.DATA_TYPES.IMAGE]: 'Image',
    [AI_ANALYTICS_TYPE.DATA_TYPES.MIXED]: 'Mixed',
  };
  return labels[dataType] || 'Unknown';
}

export function getAnalyticsMethodLabel(method: AIAnalyticsMethod): string {
  const labels: Record<AIAnalyticsMethod, string> = {
    [AI_ANALYTICS_TYPE.METHODS.STATISTICAL]: 'Statistical',
    [AI_ANALYTICS_TYPE.METHODS.MACHINE_LEARNING]: 'Machine Learning',
    [AI_ANALYTICS_TYPE.METHODS.DEEP_LEARNING]: 'Deep Learning',
    [AI_ANALYTICS_TYPE.METHODS.RULE_BASED]: 'Rule Based',
    [AI_ANALYTICS_TYPE.METHODS.HYBRID]: 'Hybrid',
    [AI_ANALYTICS_TYPE.METHODS.ENSEMBLE]: 'Ensemble',
  };
  return labels[method] || 'Unknown';
}

export function getAnalyticsDataSourceLabel(source: AIAnalyticsDataSource): string {
  const labels: Record<AIAnalyticsDataSource, string> = {
    [AI_ANALYTICS_TYPE.SOURCES.DATABASE]: 'Database',
    [AI_ANALYTICS_TYPE.SOURCES.DATA_WAREHOUSE]: 'Data Warehouse',
    [AI_ANALYTICS_TYPE.SOURCES.DATA_LAKE]: 'Data Lake',
    [AI_ANALYTICS_TYPE.SOURCES.STREAMING]: 'Streaming',
    [AI_ANALYTICS_TYPE.SOURCES.API]: 'API',
    [AI_ANALYTICS_TYPE.SOURCES.FILE]: 'File',
    [AI_ANALYTICS_TYPE.SOURCES.EXTERNAL]: 'External',
    [AI_ANALYTICS_TYPE.SOURCES.THIRD_PARTY]: 'Third Party',
  };
  return labels[source] || 'Unknown';
}

export function getAnalyticsScopeLabel(scope: AIAnalyticsScope): string {
  const labels: Record<AIAnalyticsScope, string> = {
    [AI_ANALYTICS_TYPE.SCOPES.GLOBAL]: 'Global',
    [AI_ANALYTICS_TYPE.SCOPES.REGIONAL]: 'Regional',
    [AI_ANALYTICS_TYPE.SCOPES.LOCAL]: 'Local',
    [AI_ANALYTICS_TYPE.SCOPES.SEGMENT]: 'Segment',
    [AI_ANALYTICS_TYPE.SCOPES.COHORT]: 'Cohort',
    [AI_ANALYTICS_TYPE.SCOPES.INDIVIDUAL]: 'Individual',
  };
  return labels[scope] || 'Unknown';
}

export function getAnalyticsLevelLabel(level: AIAnalyticsLevel): string {
  const labels: Record<AIAnalyticsLevel, string> = {
    [AI_ANALYTICS_TYPE.LEVELS.SUMMARY]: 'Summary',
    [AI_ANALYTICS_TYPE.LEVELS.DETAILED]: 'Detailed',
    [AI_ANALYTICS_TYPE.LEVELS.GRANULAR]: 'Granular',
    [AI_ANALYTICS_TYPE.LEVELS.AGGREGATED]: 'Aggregated',
    [AI_ANALYTICS_TYPE.LEVELS.RAW]: 'Raw',
  };
  return labels[level] || 'Unknown';
}
