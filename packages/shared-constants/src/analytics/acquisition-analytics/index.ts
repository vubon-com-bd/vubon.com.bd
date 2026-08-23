/**
 * Acquisition Analytics Constants Index
 * Export all acquisition analytics constants and types for easy importing
 */

// Acquisition Analytics Main Constants
export {
  ACQUISITION_ANALYTICS,
  getAcquisitionAnalyticsStatusLabel,
  getAcquisitionAnalyticsEventLabel,
  getAcquisitionAnalyticsDimensionLabel,
  getAcquisitionAnalyticsSegmentLabel,
  getAcquisitionAnalyticsCohortLabel,
  getAcquisitionAnalyticsGranularityLabel,
  isAcquisitionAnalyticsActive,
  isAcquisitionAnalyticsCompleted,
  isAcquisitionAnalyticsFailed,
  isAcquisitionAnalyticsLeadEvent,
  isAcquisitionAnalyticsCustomerEvent,
  isAcquisitionAnalyticsChannelEvent,
} from './acquisition-analytics.constants';

export type {
  AcquisitionAnalyticsType,
  AcquisitionAnalyticsStatus,
  AcquisitionAnalyticsScope,
  AcquisitionAnalyticsEvent,
  AcquisitionAnalyticsDimension,
  AcquisitionAnalyticsMetric,
  AcquisitionAnalyticsSegment,
  AcquisitionAnalyticsCohort,
  AcquisitionAnalyticsGranularity,
} from './acquisition-analytics.constants';

// Acquisition Analytics Type Constants
export {
  ACQUISITION_ANALYTICS_TYPE,
  getAcquisitionAnalyticsAnalysisTypeLabel,
  getAcquisitionAnalyticsDataTypeLabel,
  getAcquisitionAnalyticsLeadStatusLabel,
  getAcquisitionAnalyticsLeadTypeLabel,
  getAcquisitionAnalyticsAcquisitionChannelLabel,
  getAcquisitionAnalyticsAcquisitionSourceLabel,
  getAcquisitionAnalyticsAcquisitionMediumLabel,
  getAcquisitionAnalyticsFunnelStageLabel,
  getAcquisitionAnalyticsCACCategoryLabel,
  getAcquisitionAnalyticsROICategoryLabel,
  isAcquisitionAnalyticsChannelAnalysis,
  isAcquisitionAnalyticsCustomerAnalysis,
  isAcquisitionAnalyticsCostAnalysis,
  isAcquisitionAnalyticsFunnelAnalysis,
  isAcquisitionAnalyticsComparative,
  isAcquisitionAnalyticsPredictive,
  getAcquisitionAnalyticsCACCategory,
  getAcquisitionAnalyticsROICategory,
} from './acquisition-analytics-type.constants';

export type {
  AcquisitionAnalyticsAnalysisType,
  AcquisitionAnalyticsDataType,
  AcquisitionAnalyticsLeadStatus,
  AcquisitionAnalyticsLeadType,
  AcquisitionAnalyticsAcquisitionChannel,
  AcquisitionAnalyticsAcquisitionSource,
  AcquisitionAnalyticsAcquisitionMedium,
  AcquisitionAnalyticsFunnelStage,
  AcquisitionAnalyticsCACCategory,
  AcquisitionAnalyticsROICategory,
} from './acquisition-analytics-type.constants';

// Acquisition Analytics Metric Constants
export {
  ACQUISITION_ANALYTICS_METRIC,
  getAcquisitionAnalyticsMetricLabel,
  getAcquisitionAnalyticsMetricCategoryLabel,
  getAcquisitionAnalyticsMetricTypeLabel,
  getAcquisitionAnalyticsMetricFormatLabel,
  getAcquisitionAnalyticsMetricPriorityLabel,
  getAcquisitionAnalyticsMetricCategory,
  getAcquisitionAnalyticsMetricType,
  getAcquisitionAnalyticsMetricFormat,
  calculateAcquisitionAnalyticsLeadConversionRate,
  calculateAcquisitionAnalyticsCAC,
  calculateAcquisitionAnalyticsLTVToCACRatio,
  calculateAcquisitionAnalyticsROI,
  calculateAcquisitionAnalyticsROAS,
  calculateAcquisitionAnalyticsFunnelConversion,
  calculateAcquisitionAnalyticsFunnelDropoff,
  calculateAcquisitionAnalyticsCostPerLead,
} from './acquisition-analytics-metric.constants';

export type {
  AcquisitionAnalyticsLeadMetric,
  AcquisitionAnalyticsCustomerMetric,
  AcquisitionAnalyticsChannelMetric,
  AcquisitionAnalyticsCampaignMetric,
  AcquisitionAnalyticsCostMetric,
  AcquisitionAnalyticsROIMetric,
  AcquisitionAnalyticsFunnelMetric,
  AcquisitionAnalyticsComparisonMetric,
  AcquisitionAnalyticsMetricCategory,
  AcquisitionAnalyticsMetricType,
  AcquisitionAnalyticsMetricFormat,
  AcquisitionAnalyticsMetricPriority,
} from './acquisition-analytics-metric.constants';
