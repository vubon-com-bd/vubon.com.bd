/**
 * Discovery Constants Index
 * Export all discovery constants and types for easy importing
 */

// Discovery Constants
export {
  DISCOVERY,
  discoveryGetTypeLabel,
  discoveryGetCategoryLabel,
  discoveryGetSourceLabel,
  discoveryGetStatusLabel,
  discoveryGetAlgorithmLabel,
  discoveryGetConfidenceLabel,
  discoveryGetDefaultLimit,
  discoveryGetDefaultConfidence,
  discoveryIsActive,
  discoveryIsCompleted,
  discoveryIsRecommended,
  discoveryIsTrending,
  discoveryIsSeasonal,
} from './discovery.constants';

export type {
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
  DiscoveryStatus,
  DiscoveryAlgorithm,
  DiscoveryConfidence,
  DiscoveryDefault,
  DiscoveryLimit,
} from './discovery.constants';

// Recommendation Constants
export {
  DISCOVERY_RECOMMENDATION,
  discoveryRecommendationGetTypeLabel,
  discoveryRecommendationGetCategoryLabel,
  discoveryRecommendationGetStatusLabel,
  discoveryRecommendationGetErrorLabel,
  discoveryRecommendationIsActive,
  discoveryRecommendationIsGenerated,
  discoveryRecommendationGetDefaultLimit,
  discoveryRecommendationGetDefaultScore,
} from './recommendation.constants';

export type {
  DiscoveryRecommendationType,
  DiscoveryRecommendationCategory,
  DiscoveryRecommendationStatus,
  DiscoveryRecommendationScore,
  DiscoveryRecommendationDefault,
  DiscoveryRecommendationLimit,
  DiscoveryRecommendationError,
} from './recommendation.constants';

// Recommendation Type Constants
export {
  DISCOVERY_RECOMMENDATION_TYPE,
  discoveryRecommendationGetCategoryLabel as discoveryRecommendationTypeGetCategoryLabel,
  discoveryRecommendationGetSubTypeLabel,
  discoveryRecommendationGetScopeLabel,
  discoveryRecommendationGetContextLabel,
  discoveryRecommendationGetPriorityLabel,
  discoveryRecommendationIsProductCategory,
  discoveryRecommendationIsContentCategory,
  discoveryRecommendationIsOfferCategory,
} from './recommendation-type.constants';

export type {
  DiscoveryRecommendationCategoryType,
  DiscoveryRecommendationSubType,
  DiscoveryRecommendationScope,
  DiscoveryRecommendationContext,
  DiscoveryRecommendationPriority,
} from './recommendation-type.constants';

// Recommendation Strategy Constants
export {
  DISCOVERY_RECOMMENDATION_STRATEGY,
  discoveryRecommendationStrategyGetTypeLabel,
  discoveryRecommendationStrategyGetGoalLabel,
  discoveryRecommendationStrategyGetMetricLabel,
  discoveryRecommendationStrategyIsPersonalized,
  discoveryRecommendationStrategyIsPopularity,
  discoveryRecommendationStrategyIsDiversity,
  discoveryRecommendationStrategyGetDefaultWeight,
} from './recommendation-strategy.constants';

export type {
  DiscoveryRecommendationStrategyType,
  DiscoveryRecommendationStrategyWeight,
  DiscoveryRecommendationStrategyGoal,
  DiscoveryRecommendationStrategyMetric,
  DiscoveryRecommendationStrategyDefault,
  DiscoveryRecommendationStrategyLimit,
} from './recommendation-strategy.constants';

// Personalization Constants
export {
  DISCOVERY_PERSONALIZATION,
  discoveryPersonalizationGetTypeLabel,
  discoveryPersonalizationGetCategoryLabel,
  discoveryPersonalizationGetDataSourceLabel,
  discoveryPersonalizationGetStatusLabel,
  discoveryPersonalizationGetStrategyLabel,
  discoveryPersonalizationGetErrorLabel,
  discoveryPersonalizationIsActive,
  discoveryPersonalizationIsDeployed,
  discoveryPersonalizationGetDefaultLimit,
} from './personalization.constants';

export type {
  DiscoveryPersonalizationType,
  DiscoveryPersonalizationCategory,
  DiscoveryPersonalizationDataSource,
  DiscoveryPersonalizationStatus,
  DiscoveryPersonalizationStrategy,
  DiscoveryPersonalizationDefault,
  DiscoveryPersonalizationLimit,
  DiscoveryPersonalizationError,
} from './personalization.constants';

// Trending Constants
export {
  DISCOVERY_TRENDING,
  discoveryTrendingGetTypeLabel,
  discoveryTrendingGetPeriodLabel,
  discoveryTrendingGetStatusLabel,
  discoveryTrendingGetErrorLabel,
  discoveryTrendingIsActive,
  discoveryTrendingIsCalculated,
  discoveryTrendingGetDefaultLimit,
} from './trending.constants';

export type {
  DiscoveryTrendingType,
  DiscoveryTrendingPeriod,
  DiscoveryTrendingStatus,
  DiscoveryTrendingDefault,
  DiscoveryTrendingLimit,
  DiscoveryTrendingError,
} from './trending.constants';

// Popular Constants
export {
  DISCOVERY_POPULAR,
  discoveryPopularGetTypeLabel,
  discoveryPopularGetMetricLabel,
  discoveryPopularGetStatusLabel,
  discoveryPopularGetErrorLabel,
  discoveryPopularIsActive,
  discoveryPopularIsCalculated,
  discoveryPopularGetDefaultLimit,
} from './popular.constants';

export type {
  DiscoveryPopularType,
  DiscoveryPopularMetric,
  DiscoveryPopularStatus,
  DiscoveryPopularDefault,
  DiscoveryPopularLimit,
  DiscoveryPopularError,
} from './popular.constants';

// Recently Viewed Constants
export {
  DISCOVERY_RECENTLY_VIEWED,
  discoveryRecentlyViewedGetTypeLabel,
  discoveryRecentlyViewedGetStatusLabel,
  discoveryRecentlyViewedGetErrorLabel,
  discoveryRecentlyViewedIsActive,
  discoveryRecentlyViewedIsTracking,
  discoveryRecentlyViewedGetDefaultLimit,
  discoveryRecentlyViewedGetMaxItems,
} from './recently-viewed.constants';

export type {
  DiscoveryRecentlyViewedType,
  DiscoveryRecentlyViewedStatus,
  DiscoveryRecentlyViewedDefault,
  DiscoveryRecentlyViewedLimit,
  DiscoveryRecentlyViewedError,
} from './recently-viewed.constants';

// Frequently Bought Constants
export {
  DISCOVERY_FREQUENTLY_BOUGHT,
  discoveryFrequentlyBoughtGetTypeLabel,
  discoveryFrequentlyBoughtGetAnalysisLabel,
  discoveryFrequentlyBoughtGetStatusLabel,
  discoveryFrequentlyBoughtGetErrorLabel,
  discoveryFrequentlyBoughtIsActive,
  discoveryFrequentlyBoughtIsAnalyzed,
  discoveryFrequentlyBoughtGetDefaultLimit,
  discoveryFrequentlyBoughtGetDefaultConfidence,
} from './frequently-bought.constants';

export type {
  DiscoveryFrequentlyBoughtType,
  DiscoveryFrequentlyBoughtAnalysis,
  DiscoveryFrequentlyBoughtStatus,
  DiscoveryFrequentlyBoughtDefault,
  DiscoveryFrequentlyBoughtLimit,
  DiscoveryFrequentlyBoughtError,
} from './frequently-bought.constants';

// Complementary Constants
export {
  DISCOVERY_COMPLEMENTARY,
  discoveryComplementaryGetTypeLabel,
  discoveryComplementaryGetStatusLabel,
  discoveryComplementaryGetErrorLabel,
  discoveryComplementaryIsActive,
  discoveryComplementaryIsAnalyzed,
  discoveryComplementaryGetDefaultLimit,
} from './complementary.constants';

export type {
  DiscoveryComplementaryType,
  DiscoveryComplementaryStatus,
  DiscoveryComplementaryDefault,
  DiscoveryComplementaryLimit,
  DiscoveryComplementaryError,
} from './complementary.constants';

// Substitute Constants
export {
  DISCOVERY_SUBSTITUTE,
  discoverySubstituteGetTypeLabel,
  discoverySubstituteGetStatusLabel,
  discoverySubstituteGetErrorLabel,
  discoverySubstituteIsActive,
  discoverySubstituteIsAnalyzed,
  discoverySubstituteGetDefaultLimit,
} from './substitute.constants';

export type {
  DiscoverySubstituteType,
  DiscoverySubstituteStatus,
  DiscoverySubstituteDefault,
  DiscoverySubstituteLimit,
  DiscoverySubstituteError,
} from './substitute.constants';

// Upselling Constants
export {
  DISCOVERY_UPSELLING,
  discoveryUpsellingGetTypeLabel,
  discoveryUpsellingGetStrategyLabel,
  discoveryUpsellingGetStatusLabel,
  discoveryUpsellingGetErrorLabel,
  discoveryUpsellingIsActive,
  discoveryUpsellingIsAnalyzed,
  discoveryUpsellingGetDefaultLimit,
} from './upselling.constants';

export type {
  DiscoveryUpsellingType,
  DiscoveryUpsellingStrategy,
  DiscoveryUpsellingStatus,
  DiscoveryUpsellingDefault,
  DiscoveryUpsellingLimit,
  DiscoveryUpsellingError,
} from './upselling.constants';

// Cross-Selling Constants
export {
  DISCOVERY_CROSS_SELLING,
  discoveryCrossSellingGetTypeLabel,
  discoveryCrossSellingGetStrategyLabel,
  discoveryCrossSellingGetStatusLabel,
  discoveryCrossSellingGetErrorLabel,
  discoveryCrossSellingIsActive,
  discoveryCrossSellingIsAnalyzed,
  discoveryCrossSellingGetDefaultLimit,
  discoveryCrossSellingGetDefaultConfidence,
} from './cross-selling.constants';

export type {
  DiscoveryCrossSellingType,
  DiscoveryCrossSellingStrategy,
  DiscoveryCrossSellingStatus,
  DiscoveryCrossSellingDefault,
  DiscoveryCrossSellingLimit,
  DiscoveryCrossSellingError,
} from './cross-selling.constants';

// Bundle Constants
export {
  DISCOVERY_BUNDLE,
  discoveryBundleGetTypeLabel,
  discoveryBundleGetStatusLabel,
  discoveryBundleGetErrorLabel,
  discoveryBundleIsActive,
  discoveryBundleIsApproved,
  discoveryBundleGetDefaultLimit,
  discoveryBundleGetDefaultDiscount,
  discoveryBundleGetMaxItems,
  discoveryBundleGetMinItems,
} from './bundle.constants';

export type {
  DiscoveryBundleType,
  DiscoveryBundleStatus,
  DiscoveryBundleDefault,
  DiscoveryBundleLimit,
  DiscoveryBundleError,
} from './bundle.constants';

// Trending Now Constants
export {
  DISCOVERY_TRENDING_NOW,
  discoveryTrendingNowGetTypeLabel,
  discoveryTrendingNowGetStatusLabel,
  discoveryTrendingNowGetErrorLabel,
  discoveryTrendingNowIsActive,
  discoveryTrendingNowIsUpdated,
  discoveryTrendingNowGetDefaultLimit,
  discoveryTrendingNowGetDefaultUpdateInterval,
} from './trending-now.constants';

export type {
  DiscoveryTrendingNowType,
  DiscoveryTrendingNowStatus,
  DiscoveryTrendingNowDefault,
  DiscoveryTrendingNowLimit,
  DiscoveryTrendingNowError,
} from './trending-now.constants';

// Seasonal Constants
export {
  DISCOVERY_SEASONAL,
  discoverySeasonalGetTypeLabel,
  discoverySeasonalGetSeasonLabel,
  discoverySeasonalGetStatusLabel,
  discoverySeasonalGetErrorLabel,
  discoverySeasonalIsActive,
  discoverySeasonalIsScheduled,
  discoverySeasonalGetDefaultLimit,
} from './seasonal.constants';

export type {
  DiscoverySeasonalType,
  DiscoverySeason,
  DiscoverySeasonalStatus,
  DiscoverySeasonalDefault,
  DiscoverySeasonalLimit,
  DiscoverySeasonalError,
} from './seasonal.constants';

// Editorial Constants
export {
  DISCOVERY_EDITORIAL,
  discoveryEditorialGetTypeLabel,
  discoveryEditorialGetCategoryLabel,
  discoveryEditorialGetStatusLabel,
  discoveryEditorialGetErrorLabel,
  discoveryEditorialIsPublished,
  discoveryEditorialIsFeatured,
  discoveryEditorialIsApproved,
  discoveryEditorialGetDefaultLimit,
} from './editorial.constants';

export type {
  DiscoveryEditorialType,
  DiscoveryEditorialCategory,
  DiscoveryEditorialStatus,
  DiscoveryEditorialDefault,
  DiscoveryEditorialLimit,
  DiscoveryEditorialError,
} from './editorial.constants';

// Discovery Error Constants
export {
  DISCOVERY_ERROR,
  discoveryErrorGetTypeLabel,
  discoveryErrorGetSeverityLabel,
  discoveryErrorGetCodeLabel,
  discoveryErrorIsRetryable,
  discoveryErrorGetDefaultRetryAttempts,
  discoveryErrorGetDefaultTimeout,
} from './discovery-error.constants';

export type {
  DiscoveryErrorType,
  DiscoveryErrorSeverity,
  DiscoveryErrorCode,
  DiscoveryErrorDefault,
} from './discovery-error.constants';
