/**
 * SEO Robots Constants Index
 * Export all SEO robots constants and types for easy importing
 */

// SEO Robots Main Constants
export {
  SEO_ROBOTS,
  getSEORobotsTypeLabel,
  getSEORobotsStatusLabel,
  getSEORobotsDirectiveLabel,
  getSEORobotsUserAgentLabel,
  getSEORobotsErrorLabel,
  getRobotsStatusColor,
  isRobotsValid,
  isRobotsActive,
  getCombinedDirectives,
  formatRobotsDirective,
} from './seo-robots.constants';

export type {
  SEORobotsType,
  SEORobotsStatus,
  SEORobotsDirective,
  SEORobotsUserAgent,
  SEORobotsParameter,
  SEORobotsValidation,
  SEORobotsErrorType,
  SEORobotsMetric,
} from './seo-robots.constants';

// SEO Robots Type Constants
export {
  SEO_ROBOTS_TYPE,
  getSEORobotsCategoryLabel,
  getSEORobotsMetaSubTypeLabel,
  getSEORobotsXRobotsSubTypeLabel,
  getSEORobotsLinkSubTypeLabel,
  getSEORobotsScopeLabel,
  getSEORobotsPriorityLabel,
  getSEORobotsImplementationLabel,
} from './seo-robots-type.constants';

export type {
  SEORobotsTypeCategory,
  SEORobotsTypeMetaSubType,
  SEORobotsTypeXRobotsSubType,
  SEORobotsTypeLinkSubType,
  SEORobotsTypeScope,
  SEORobotsTypePriority,
  SEORobotsTypeImplementation,
} from './seo-robots-type.constants';

// SEO Robots Status Constants
export {
  SEO_ROBOTS_STATUS,
  getSEORobotsLifecycleLabel,
  getSEORobotsHealthLabel,
  getSEORobotsComplianceLabel,
  getSEORobotsPerformanceLabel,
  getSEORobotsValidationLabel,
  getSEORobotsStatusCategory,
  getSEORobotsStatusColor,
  isRobotsValid as isRobotsLifecycleValid,
  isRobotsProcessing,
} from './seo-robots-status.constants';

export type {
  SEORobotsLifecycleStatus,
  SEORobotsHealthStatus,
  SEORobotsComplianceStatus,
  SEORobotsPerformanceStatus,
  SEORobotsValidationStatus,
  SEORobotsStatusCategory,
} from './seo-robots-status.constants';
