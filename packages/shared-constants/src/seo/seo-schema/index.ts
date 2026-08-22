/**
 * SEO Schema Constants Index
 * Export all SEO schema constants and types for easy importing
 */

// SEO Schema Main Constants
export {
  SEO_SCHEMA,
  getSEOSchemaTypeLabel,
  getSEOSchemaStatusLabel,
  getSEOSchemaValidationLabel,
  getSEOSchemaFormatLabel,
  getSEOSchemaPriorityLabel,
  getSEOSchemaErrorLabel,
  getSEOSchemaToolLabel,
  getSchemaStatusColor,
  isSchemaValid,
  isSchemaActive,
  getSchemaCategory,
} from './seo-schema.constants';

export type {
  SEOSchemaType,
  SEOSchemaStatus,
  SEOSchemaValidation,
  SEOSchemaFormat,
  SEOSchemaContext,
  SEOSchemaPriority,
  SEOSchemaErrorType,
  SEOSchemaMetric,
  SEOSchemaTool,
} from './seo-schema.constants';

// SEO Schema Type Constants
export {
  SEO_SCHEMA_TYPE,
  getSEOSchemaCategoryLabel,
  getSEOSchemaSubTypeLabel,
  getSEOSchemaPropertyLabel,
  getSEOSchemaPropertyGroupLabel,
  getSEOSchemaComplexityLabel,
  getSEOSchemaPurposeLabel,
} from './seo-schema-type.constants';

export type {
  SEOSchemaTypeCategory,
  SEOSchemaTypeSubType,
  SEOSchemaTypeProperty,
  SEOSchemaTypePropertyGroup,
  SEOSchemaTypeComplexity,
  SEOSchemaTypePurpose,
} from './seo-schema-type.constants';

// SEO Schema Status Constants
export {
  SEO_SCHEMA_STATUS,
  getSEOSchemaLifecycleLabel,
  getSEOSchemaHealthLabel,
  getSEOSchemaQualityLabel,
  getSEOSchemaComplianceLabel,
  getSEOSchemaPerformanceLabel,
  getSEOSchemaStatusCategory,
  getSEOSchemaStatusColor,
  isSchemaValid as isSchemaLifecycleValid,
  isSchemaProcessing,
} from './seo-schema-status.constants';

export type {
  SEOSchemaLifecycleStatus,
  SEOSchemaHealthStatus,
  SEOSchemaQualityStatus,
  SEOSchemaComplianceStatus,
  SEOSchemaPerformanceStatus,
  SEOSchemaStatusCategory,
} from './seo-schema-status.constants';
