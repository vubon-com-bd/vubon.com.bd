/**
 * SEO Report Constants Index
 * Export all SEO report constants and types for easy importing
 */

// SEO Report Main Constants
export {
  SEO_REPORT,
  getSEOReportTypeLabel,
  getSEOReportStatusLabel,
  getSEOReportFormatLabel,
  getSEOReportFrequencyLabel,
  getSEOReportPriorityLabel,
  getSEOReportDeliveryLabel,
  getSEOReportSectionLabel,
  getSEOReportErrorLabel,
  seoReportGetStatusColor,
  isSEOReportComplete,
  isSEOReportProcessing,
} from './seo-report.constants';

export type {
  SEOReportType,
  SEOReportStatus,
  SEOReportFormat,
  SEOReportFrequency,
  SEOReportPriority,
  SEOReportDelivery,
  SEOReportSection,
  SEOReportErrorType,
  SEOReportMetric,
} from './seo-report.constants';

// SEO Report Type Constants
export {
  SEO_REPORT_TYPE,
  getSEOReportCategoryLabel,
  getSEOReportSubTypeLabel,
  getSEOReportScopeLabel,
  getSEOReportGranularityLabel,
  getSEOReportAudienceLabel,
  getSEOReportPurposeLabel,
} from './seo-report-type.constants';

export type {
  SEOReportTypeCategory,
  SEOReportTypeSubType,
  SEOReportTypeScope,
  SEOReportTypeGranularity,
  SEOReportTypeAudience,
  SEOReportTypePurpose,
} from './seo-report-type.constants';

// SEO Report Status Constants
export {
  SEO_REPORT_STATUS,
  getSEOReportLifecycleLabel,
  getSEOReportHealthLabel,
  getSEOReportQualityLabel,
  getSEOReportDeliveryLabel as getSEOReportDeliveryStatusLabel,
  getSEOReportValidationLabel,
  getSEOReportStatusCategory,
  getSEOReportStatusColor,
  isReportGenerated as isSEOReportGenerated,
  isReportProcessing as isSEOReportLifecycleProcessing,
} from './seo-report-status.constants';

export type {
  SEOReportLifecycleStatus,
  SEOReportHealthStatus,
  SEOReportQualityStatus,
  SEOReportDeliveryStatus,
  SEOReportValidationStatus,
  SEOReportStatusCategory,
} from './seo-report-status.constants';
