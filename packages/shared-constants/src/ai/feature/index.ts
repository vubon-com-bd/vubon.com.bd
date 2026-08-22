/**
 * AI Feature Constants Index
 * Export all feature constants and types for easy importing
 */

// AI Feature Constants
export {
  AI_FEATURE,
  AI_FEATURE_TYPES,
  getFeatureCategoryLabel,
  getFeatureTypeLabel,
  getFeatureStatusLabel,
  getFeatureLevelLabel,
  getFeatureAccessLabel,
  getFeatureDependencies,
  getFeatureMetricLabel,
  isFeatureActive,
  isFeatureAvailable,
  isFeatureDeprecated,
  getFeatureLevelPriority,
  getFeatureAccessPriority,
} from './ai-feature.constants';

export type {
  AIFeatureCategory,
  AIFeatureType,
  AIFeatureStatus,
  AIFeatureLevel,
  AIFeatureAccess,
  AIFeatureLimit,
  AIFeatureMetric,
} from './ai-feature.constants';

// AI Feature Type Constants
export {
  AI_FEATURE_TYPE,
  getFeatureDomainLabel,
  getFeatureSubDomainLabel,
  getFeatureComplexityLabel,
  getFeatureMaturityLabel,
  getFeatureDeploymentLabel,
  getFeatureIntegrationLabel,
  getFeatureComplexityScore,
  getFeatureMaturityScore,
} from './ai-feature-type.constants';

export type {
  AIFeatureDomain,
  AIFeatureSubDomain,
  AIFeatureComplexity,
  AIFeatureMaturity,
  AIFeatureDeployment,
  AIFeatureIntegration,
} from './ai-feature-type.constants';

// AI Feature Status Constants
export {
  AI_FEATURE_STATUS,
  AI_FEATURE_STATUS_TYPES,
  getFeatureStatusLabel as getFeatureStatusLabel2,
  getFeatureStatusCategory,
  getFeatureStatusSeverity,
  getFeatureStatusColor,
  isFeatureInDevelopment,
  isFeatureInTesting,
  isFeatureInProduction,
  isFeatureActive as isFeatureActive2,
  isFeatureDeprecated as isFeatureDeprecated2,
  getFeatureStatusProgress,
} from './ai-feature-status.constants';

export type {
  AIFeatureStatusType,
  AIFeatureStatusCategory,
  AIFeatureStatusSeverity,
  AIFeatureStatusColor,
} from './ai-feature-status.constants';
