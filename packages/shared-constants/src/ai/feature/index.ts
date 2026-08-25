/**
 * AI Feature Index
 * Export all AI feature constants and types for easy importing
 */

// Export all constants from ai-feature.constants
export {
  AI_FEATURE_TYPES,
  AI_FEATURE,
  getAiFeatureCategoryLabel,
  getAiFeatureTypeLabel,
  getAiFeatureStatusLabel,
  getAiFeatureLevelLabel,
  getAiFeatureAccessLabel,
  getAiFeatureDependencies,
  getAiFeatureMetricLabel,
  isAiFeatureActive,
  isAiFeatureAvailable,
  isAiFeatureDeprecated,
  getAiFeatureLevelPriority,
  getAiFeatureAccessPriority,
} from './ai-feature.constants';

// Export all types from ai-feature.constants
export type {
  AIFeatureType,
  AIFeatureCategory,
  AIFeatureStatus,
  AIFeatureLevel,
  AIFeatureAccess,
  AIFeatureLimit,
  AIFeatureMetric,
} from './ai-feature.constants';

// Export all constants from ai-feature-type.constants
export {
  AI_FEATURE_TYPE,
  getAiFeatureDomainLabel,
  getAiFeatureSubDomainLabel,
  getAiFeatureComplexityLabel,
  getAiFeatureMaturityLabel,
  getAiFeatureDeploymentLabel,
  getAiFeatureIntegrationLabel,
  getAiFeatureComplexityScore,
  getAiFeatureMaturityScore,
} from './ai-feature-type.constants';

// Export all types from ai-feature-type.constants
export type {
  AIFeatureDomain,
  AIFeatureSubDomain,
  AIFeatureComplexity,
  AIFeatureMaturity,
  AIFeatureDeployment,
  AIFeatureIntegration,
} from './ai-feature-type.constants';

// Export all constants from ai-feature-status.constants
export {
  AI_FEATURE_STATUS_TYPES,
  AI_FEATURE_STATUS,
  getAiFeatureStatusLabel as getAiFeatureStatusLabelDetailed,
  getAiFeatureStatusCategory,
  getAiFeatureStatusSeverity,
  getAiFeatureStatusColor,
  isAiFeatureInDevelopment,
  isAiFeatureInTesting,
  isAiFeatureInProduction,
  isAiFeatureActiveStatus,
  isAiFeatureDeprecatedStatus,
  getAiFeatureStatusProgress,
} from './ai-feature-status.constants';

// Export all types from ai-feature-status.constants
export type {
  AIFeatureStatusType,
  AIFeatureStatusCategory,
  AIFeatureStatusSeverity,
  AIFeatureStatusColor,
} from './ai-feature-status.constants';
