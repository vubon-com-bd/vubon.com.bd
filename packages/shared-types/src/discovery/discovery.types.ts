/**
 * Discovery Types
 * Type definitions for discovery module based on shared-constants
 * @module DiscoveryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants discovery
// ============================================================
import {
  // Discovery Core
  DISCOVERY,
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
  DiscoveryStatus,
  DiscoveryAlgorithm,
  DiscoveryConfidence,
  DiscoveryDefault,
  DiscoveryLimit,
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
  // Recommendation
  DISCOVERY_RECOMMENDATION,
  DiscoveryRecommendationType,
  DiscoveryRecommendationCategory,
  DiscoveryRecommendationStatus,
  DiscoveryRecommendationScore,
  DiscoveryRecommendationDefault,
  DiscoveryRecommendationLimit,
  DiscoveryRecommendationError,
  discoveryRecommendationGetTypeLabel,
  discoveryRecommendationGetCategoryLabel,
  discoveryRecommendationGetStatusLabel,
  discoveryRecommendationGetErrorLabel,
  discoveryRecommendationIsActive,
  discoveryRecommendationIsGenerated,
  discoveryRecommendationGetDefaultLimit,
  discoveryRecommendationGetDefaultScore,
  // Recommendation Type
  DISCOVERY_RECOMMENDATION_TYPE,
  DiscoveryRecommendationCategoryType,
  DiscoveryRecommendationSubType,
  DiscoveryRecommendationScope,
  DiscoveryRecommendationContext,
  DiscoveryRecommendationPriority,
  discoveryRecommendationTypeGetCategoryLabel,
  discoveryRecommendationGetSubTypeLabel,
  discoveryRecommendationGetScopeLabel,
  discoveryRecommendationGetContextLabel,
  discoveryRecommendationGetPriorityLabel,
  discoveryRecommendationIsProductCategory,
  discoveryRecommendationIsContentCategory,
  discoveryRecommendationIsOfferCategory,
  // Recommendation Strategy
  DISCOVERY_RECOMMENDATION_STRATEGY,
  DiscoveryRecommendationStrategyType,
  DiscoveryRecommendationStrategyWeight,
  DiscoveryRecommendationStrategyGoal,
  DiscoveryRecommendationStrategyMetric,
  DiscoveryRecommendationStrategyDefault,
  DiscoveryRecommendationStrategyLimit,
  discoveryRecommendationStrategyGetTypeLabel,
  discoveryRecommendationStrategyGetGoalLabel,
  discoveryRecommendationStrategyGetMetricLabel,
  discoveryRecommendationStrategyIsPersonalized,
  discoveryRecommendationStrategyIsPopularity,
  discoveryRecommendationStrategyIsDiversity,
  discoveryRecommendationStrategyGetDefaultWeight,
  // Personalization
  DISCOVERY_PERSONALIZATION,
  DiscoveryPersonalizationType,
  DiscoveryPersonalizationCategory,
  DiscoveryPersonalizationDataSource,
  DiscoveryPersonalizationStatus,
  DiscoveryPersonalizationStrategy,
  DiscoveryPersonalizationDefault,
  DiscoveryPersonalizationLimit,
  DiscoveryPersonalizationError,
  discoveryPersonalizationGetTypeLabel,
  discoveryPersonalizationGetCategoryLabel,
  discoveryPersonalizationGetDataSourceLabel,
  discoveryPersonalizationGetStatusLabel,
  discoveryPersonalizationGetStrategyLabel,
  discoveryPersonalizationGetErrorLabel,
  discoveryPersonalizationIsActive,
  discoveryPersonalizationIsDeployed,
  discoveryPersonalizationGetDefaultLimit,
  // Trending
  DISCOVERY_TRENDING,
  DiscoveryTrendingType,
  DiscoveryTrendingPeriod,
  DiscoveryTrendingStatus,
  DiscoveryTrendingDefault,
  DiscoveryTrendingLimit,
  DiscoveryTrendingError,
  discoveryTrendingGetTypeLabel,
  discoveryTrendingGetPeriodLabel,
  discoveryTrendingGetStatusLabel,
  discoveryTrendingGetErrorLabel,
  discoveryTrendingIsActive,
  discoveryTrendingIsCalculated,
  discoveryTrendingGetDefaultLimit,
  // Popular
  DISCOVERY_POPULAR,
  DiscoveryPopularType,
  DiscoveryPopularMetric,
  DiscoveryPopularStatus,
  DiscoveryPopularDefault,
  DiscoveryPopularLimit,
  DiscoveryPopularError,
  discoveryPopularGetTypeLabel,
  discoveryPopularGetMetricLabel,
  discoveryPopularGetStatusLabel,
  discoveryPopularGetErrorLabel,
  discoveryPopularIsActive,
  discoveryPopularIsCalculated,
  discoveryPopularGetDefaultLimit,
  // Recently Viewed
  DISCOVERY_RECENTLY_VIEWED,
  DiscoveryRecentlyViewedType,
  DiscoveryRecentlyViewedStatus,
  DiscoveryRecentlyViewedDefault,
  DiscoveryRecentlyViewedLimit,
  DiscoveryRecentlyViewedError,
  discoveryRecentlyViewedGetTypeLabel,
  discoveryRecentlyViewedGetStatusLabel,
  discoveryRecentlyViewedGetErrorLabel,
  discoveryRecentlyViewedIsActive,
  discoveryRecentlyViewedIsTracking,
  discoveryRecentlyViewedGetDefaultLimit,
  discoveryRecentlyViewedGetMaxItems,
  // Frequently Bought
  DISCOVERY_FREQUENTLY_BOUGHT,
  DiscoveryFrequentlyBoughtType,
  DiscoveryFrequentlyBoughtAnalysis,
  DiscoveryFrequentlyBoughtStatus,
  DiscoveryFrequentlyBoughtDefault,
  DiscoveryFrequentlyBoughtLimit,
  DiscoveryFrequentlyBoughtError,
  discoveryFrequentlyBoughtGetTypeLabel,
  discoveryFrequentlyBoughtGetAnalysisLabel,
  discoveryFrequentlyBoughtGetStatusLabel,
  discoveryFrequentlyBoughtGetErrorLabel,
  discoveryFrequentlyBoughtIsActive,
  discoveryFrequentlyBoughtIsAnalyzed,
  discoveryFrequentlyBoughtGetDefaultLimit,
  discoveryFrequentlyBoughtGetDefaultConfidence,
  // Complementary
  DISCOVERY_COMPLEMENTARY,
  DiscoveryComplementaryType,
  DiscoveryComplementaryStatus,
  DiscoveryComplementaryDefault,
  DiscoveryComplementaryLimit,
  DiscoveryComplementaryError,
  discoveryComplementaryGetTypeLabel,
  discoveryComplementaryGetStatusLabel,
  discoveryComplementaryGetErrorLabel,
  discoveryComplementaryIsActive,
  discoveryComplementaryIsAnalyzed,
  discoveryComplementaryGetDefaultLimit,
  // Substitute
  DISCOVERY_SUBSTITUTE,
  DiscoverySubstituteType,
  DiscoverySubstituteStatus,
  DiscoverySubstituteDefault,
  DiscoverySubstituteLimit,
  DiscoverySubstituteError,
  discoverySubstituteGetTypeLabel,
  discoverySubstituteGetStatusLabel,
  discoverySubstituteGetErrorLabel,
  discoverySubstituteIsActive,
  discoverySubstituteIsAnalyzed,
  discoverySubstituteGetDefaultLimit,
  // Upselling
  DISCOVERY_UPSELLING,
  DiscoveryUpsellingType,
  DiscoveryUpsellingStrategy,
  DiscoveryUpsellingStatus,
  DiscoveryUpsellingDefault,
  DiscoveryUpsellingLimit,
  DiscoveryUpsellingError,
  discoveryUpsellingGetTypeLabel,
  discoveryUpsellingGetStrategyLabel,
  discoveryUpsellingGetStatusLabel,
  discoveryUpsellingGetErrorLabel,
  discoveryUpsellingIsActive,
  discoveryUpsellingIsAnalyzed,
  discoveryUpsellingGetDefaultLimit,
  // Cross-Selling
  DISCOVERY_CROSS_SELLING,
  DiscoveryCrossSellingType,
  DiscoveryCrossSellingStrategy,
  DiscoveryCrossSellingStatus,
  DiscoveryCrossSellingDefault,
  DiscoveryCrossSellingLimit,
  DiscoveryCrossSellingError,
  discoveryCrossSellingGetTypeLabel,
  discoveryCrossSellingGetStrategyLabel,
  discoveryCrossSellingGetStatusLabel,
  discoveryCrossSellingGetErrorLabel,
  discoveryCrossSellingIsActive,
  discoveryCrossSellingIsAnalyzed,
  discoveryCrossSellingGetDefaultLimit,
  discoveryCrossSellingGetDefaultConfidence,
  // Bundle
  DISCOVERY_BUNDLE,
  DiscoveryBundleType,
  DiscoveryBundleStatus,
  DiscoveryBundleDefault,
  DiscoveryBundleLimit,
  DiscoveryBundleError,
  discoveryBundleGetTypeLabel,
  discoveryBundleGetStatusLabel,
  discoveryBundleGetErrorLabel,
  discoveryBundleIsActive,
  discoveryBundleIsApproved,
  discoveryBundleGetDefaultLimit,
  discoveryBundleGetDefaultDiscount,
  discoveryBundleGetMaxItems,
  discoveryBundleGetMinItems,
  // Trending Now
  DISCOVERY_TRENDING_NOW,
  DiscoveryTrendingNowType,
  DiscoveryTrendingNowStatus,
  DiscoveryTrendingNowDefault,
  DiscoveryTrendingNowLimit,
  DiscoveryTrendingNowError,
  discoveryTrendingNowGetTypeLabel,
  discoveryTrendingNowGetStatusLabel,
  discoveryTrendingNowGetErrorLabel,
  discoveryTrendingNowIsActive,
  discoveryTrendingNowIsUpdated,
  discoveryTrendingNowGetDefaultLimit,
  discoveryTrendingNowGetDefaultUpdateInterval,
  // Seasonal
  DISCOVERY_SEASONAL,
  DiscoverySeasonalType,
  DiscoverySeason,
  DiscoverySeasonalStatus,
  DiscoverySeasonalDefault,
  DiscoverySeasonalLimit,
  DiscoverySeasonalError,
  discoverySeasonalGetTypeLabel,
  discoverySeasonalGetSeasonLabel,
  discoverySeasonalGetStatusLabel,
  discoverySeasonalGetErrorLabel,
  discoverySeasonalIsActive,
  discoverySeasonalIsScheduled,
  discoverySeasonalGetDefaultLimit,
  // Editorial
  DISCOVERY_EDITORIAL,
  DiscoveryEditorialType,
  DiscoveryEditorialCategory,
  DiscoveryEditorialStatus,
  DiscoveryEditorialDefault,
  DiscoveryEditorialLimit,
  DiscoveryEditorialError,
  discoveryEditorialGetTypeLabel,
  discoveryEditorialGetCategoryLabel,
  discoveryEditorialGetStatusLabel,
  discoveryEditorialGetErrorLabel,
  discoveryEditorialIsPublished,
  discoveryEditorialIsFeatured,
  discoveryEditorialIsApproved,
  discoveryEditorialGetDefaultLimit,
  // Discovery Error
  DISCOVERY_ERROR,
  DiscoveryErrorType,
  DiscoveryErrorSeverity,
  DiscoveryErrorCode,
  DiscoveryErrorDefault,
  discoveryErrorGetTypeLabel,
  discoveryErrorGetSeverityLabel,
  discoveryErrorGetCodeLabel,
  discoveryErrorIsRetryable,
  discoveryErrorGetDefaultRetryAttempts,
  discoveryErrorGetDefaultTimeout,
} from '@vubon/shared-constants';

// ============================================================
// Discovery Extended Types
// ============================================================

/**
 * Discovery with additional metadata
 */
export interface DiscoveryExtended extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryType;
  category: DiscoveryCategory;
  source: DiscoverySource;
  status: DiscoveryStatus;
  algorithm: DiscoveryAlgorithm;
  confidence: DiscoveryConfidence;
  isActive: boolean;
  isCompleted: boolean;
  isRecommended: boolean;
  isTrending: boolean;
  isSeasonal: boolean;
  metadata?: Metadata;
}

/**
 * Discovery recommendation
 */
export interface DiscoveryRecommendation extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryRecommendationType;
  category: DiscoveryRecommendationCategory;
  status: DiscoveryRecommendationStatus;
  score: DiscoveryRecommendationScore;
  itemId: ID;
  reason?: string;
  isActive: boolean;
  isGenerated: boolean;
  metadata?: Metadata;
}

/**
 * Discovery recommendation request
 */
export interface DiscoveryRecommendationRequest {
  /** Recommendation type */
  type: DiscoveryRecommendationType;
  /** Limit */
  limit?: number;
  /** Score threshold */
  minScore?: number;
  /** Context */
  context?: Record<string, unknown>;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Discovery recommendation response
 */
export interface DiscoveryRecommendationResponse {
  /** Recommendations */
  recommendations: DiscoveryRecommendation[];
  /** Total count */
  total: number;
  /** Requested limit */
  limit: number;
  /** Has more */
  hasMore: boolean;
  /** Timestamp */
  timestamp: Date;
}

/**
 * Discovery personalization
 */
export interface DiscoveryPersonalization extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryPersonalizationType;
  category: DiscoveryPersonalizationCategory;
  dataSource: DiscoveryPersonalizationDataSource;
  status: DiscoveryPersonalizationStatus;
  strategy: DiscoveryPersonalizationStrategy;
  userId: ID;
  isActive: boolean;
  isDeployed: boolean;
  metadata?: Metadata;
}

/**
 * Discovery trending
 */
export interface DiscoveryTrending extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryTrendingType;
  period: DiscoveryTrendingPeriod;
  status: DiscoveryTrendingStatus;
  itemId: ID;
  score: number;
  position: number;
  isActive: boolean;
  isCalculated: boolean;
  metadata?: Metadata;
}

/**
 * Discovery popular
 */
export interface DiscoveryPopular extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryPopularType;
  metric: DiscoveryPopularMetric;
  status: DiscoveryPopularStatus;
  itemId: ID;
  value: number;
  position: number;
  isActive: boolean;
  isCalculated: boolean;
  metadata?: Metadata;
}

/**
 * Discovery recently viewed
 */
export interface DiscoveryRecentlyViewed extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: DiscoveryRecentlyViewedType;
  status: DiscoveryRecentlyViewedStatus;
  itemId: ID;
  viewedAt: Date;
  isActive: boolean;
  isTracking: boolean;
  metadata?: Metadata;
}

/**
 * Discovery bundle
 */
export interface DiscoveryBundle extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryBundleType;
  status: DiscoveryBundleStatus;
  itemIds: ID[];
  discount: number;
  isActive: boolean;
  isApproved: boolean;
  metadata?: Metadata;
}

/**
 * Discovery editorial
 */
export interface DiscoveryEditorial extends BaseEntity, Timestamp {
  id: ID;
  type: DiscoveryEditorialType;
  category: DiscoveryEditorialCategory;
  status: DiscoveryEditorialStatus;
  title: string;
  description?: string;
  itemIds: ID[];
  isPublished: boolean;
  isFeatured: boolean;
  isApproved: boolean;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Discovery Core
  DISCOVERY,
  DiscoveryType,
  DiscoveryCategory,
  DiscoverySource,
  DiscoveryStatus,
  DiscoveryAlgorithm,
  DiscoveryConfidence,
  DiscoveryDefault,
  DiscoveryLimit,
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
  // Recommendation
  DISCOVERY_RECOMMENDATION,
  DiscoveryRecommendationType,
  DiscoveryRecommendationCategory,
  DiscoveryRecommendationStatus,
  DiscoveryRecommendationScore,
  DiscoveryRecommendationDefault,
  DiscoveryRecommendationLimit,
  DiscoveryRecommendationError,
  discoveryRecommendationGetTypeLabel,
  discoveryRecommendationGetCategoryLabel,
  discoveryRecommendationGetStatusLabel,
  discoveryRecommendationGetErrorLabel,
  discoveryRecommendationIsActive,
  discoveryRecommendationIsGenerated,
  discoveryRecommendationGetDefaultLimit,
  discoveryRecommendationGetDefaultScore,
  // Recommendation Type
  DISCOVERY_RECOMMENDATION_TYPE,
  DiscoveryRecommendationCategoryType,
  DiscoveryRecommendationSubType,
  DiscoveryRecommendationScope,
  DiscoveryRecommendationContext,
  DiscoveryRecommendationPriority,
  discoveryRecommendationTypeGetCategoryLabel,
  discoveryRecommendationGetSubTypeLabel,
  discoveryRecommendationGetScopeLabel,
  discoveryRecommendationGetContextLabel,
  discoveryRecommendationGetPriorityLabel,
  discoveryRecommendationIsProductCategory,
  discoveryRecommendationIsContentCategory,
  discoveryRecommendationIsOfferCategory,
  // Recommendation Strategy
  DISCOVERY_RECOMMENDATION_STRATEGY,
  DiscoveryRecommendationStrategyType,
  DiscoveryRecommendationStrategyWeight,
  DiscoveryRecommendationStrategyGoal,
  DiscoveryRecommendationStrategyMetric,
  DiscoveryRecommendationStrategyDefault,
  DiscoveryRecommendationStrategyLimit,
  discoveryRecommendationStrategyGetTypeLabel,
  discoveryRecommendationStrategyGetGoalLabel,
  discoveryRecommendationStrategyGetMetricLabel,
  discoveryRecommendationStrategyIsPersonalized,
  discoveryRecommendationStrategyIsPopularity,
  discoveryRecommendationStrategyIsDiversity,
  discoveryRecommendationStrategyGetDefaultWeight,
  // Personalization
  DISCOVERY_PERSONALIZATION,
  DiscoveryPersonalizationType,
  DiscoveryPersonalizationCategory,
  DiscoveryPersonalizationDataSource,
  DiscoveryPersonalizationStatus,
  DiscoveryPersonalizationStrategy,
  DiscoveryPersonalizationDefault,
  DiscoveryPersonalizationLimit,
  DiscoveryPersonalizationError,
  discoveryPersonalizationGetTypeLabel,
  discoveryPersonalizationGetCategoryLabel,
  discoveryPersonalizationGetDataSourceLabel,
  discoveryPersonalizationGetStatusLabel,
  discoveryPersonalizationGetStrategyLabel,
  discoveryPersonalizationGetErrorLabel,
  discoveryPersonalizationIsActive,
  discoveryPersonalizationIsDeployed,
  discoveryPersonalizationGetDefaultLimit,
  // Trending
  DISCOVERY_TRENDING,
  DiscoveryTrendingType,
  DiscoveryTrendingPeriod,
  DiscoveryTrendingStatus,
  DiscoveryTrendingDefault,
  DiscoveryTrendingLimit,
  DiscoveryTrendingError,
  discoveryTrendingGetTypeLabel,
  discoveryTrendingGetPeriodLabel,
  discoveryTrendingGetStatusLabel,
  discoveryTrendingGetErrorLabel,
  discoveryTrendingIsActive,
  discoveryTrendingIsCalculated,
  discoveryTrendingGetDefaultLimit,
  // Popular
  DISCOVERY_POPULAR,
  DiscoveryPopularType,
  DiscoveryPopularMetric,
  DiscoveryPopularStatus,
  DiscoveryPopularDefault,
  DiscoveryPopularLimit,
  DiscoveryPopularError,
  discoveryPopularGetTypeLabel,
  discoveryPopularGetMetricLabel,
  discoveryPopularGetStatusLabel,
  discoveryPopularGetErrorLabel,
  discoveryPopularIsActive,
  discoveryPopularIsCalculated,
  discoveryPopularGetDefaultLimit,
  // Recently Viewed
  DISCOVERY_RECENTLY_VIEWED,
  DiscoveryRecentlyViewedType,
  DiscoveryRecentlyViewedStatus,
  DiscoveryRecentlyViewedDefault,
  DiscoveryRecentlyViewedLimit,
  DiscoveryRecentlyViewedError,
  discoveryRecentlyViewedGetTypeLabel,
  discoveryRecentlyViewedGetStatusLabel,
  discoveryRecentlyViewedGetErrorLabel,
  discoveryRecentlyViewedIsActive,
  discoveryRecentlyViewedIsTracking,
  discoveryRecentlyViewedGetDefaultLimit,
  discoveryRecentlyViewedGetMaxItems,
  // Frequently Bought
  DISCOVERY_FREQUENTLY_BOUGHT,
  DiscoveryFrequentlyBoughtType,
  DiscoveryFrequentlyBoughtAnalysis,
  DiscoveryFrequentlyBoughtStatus,
  DiscoveryFrequentlyBoughtDefault,
  DiscoveryFrequentlyBoughtLimit,
  DiscoveryFrequentlyBoughtError,
  discoveryFrequentlyBoughtGetTypeLabel,
  discoveryFrequentlyBoughtGetAnalysisLabel,
  discoveryFrequentlyBoughtGetStatusLabel,
  discoveryFrequentlyBoughtGetErrorLabel,
  discoveryFrequentlyBoughtIsActive,
  discoveryFrequentlyBoughtIsAnalyzed,
  discoveryFrequentlyBoughtGetDefaultLimit,
  discoveryFrequentlyBoughtGetDefaultConfidence,
  // Complementary
  DISCOVERY_COMPLEMENTARY,
  DiscoveryComplementaryType,
  DiscoveryComplementaryStatus,
  DiscoveryComplementaryDefault,
  DiscoveryComplementaryLimit,
  DiscoveryComplementaryError,
  discoveryComplementaryGetTypeLabel,
  discoveryComplementaryGetStatusLabel,
  discoveryComplementaryGetErrorLabel,
  discoveryComplementaryIsActive,
  discoveryComplementaryIsAnalyzed,
  discoveryComplementaryGetDefaultLimit,
  // Substitute
  DISCOVERY_SUBSTITUTE,
  DiscoverySubstituteType,
  DiscoverySubstituteStatus,
  DiscoverySubstituteDefault,
  DiscoverySubstituteLimit,
  DiscoverySubstituteError,
  discoverySubstituteGetTypeLabel,
  discoverySubstituteGetStatusLabel,
  discoverySubstituteGetErrorLabel,
  discoverySubstituteIsActive,
  discoverySubstituteIsAnalyzed,
  discoverySubstituteGetDefaultLimit,
  // Upselling
  DISCOVERY_UPSELLING,
  DiscoveryUpsellingType,
  DiscoveryUpsellingStrategy,
  DiscoveryUpsellingStatus,
  DiscoveryUpsellingDefault,
  DiscoveryUpsellingLimit,
  DiscoveryUpsellingError,
  discoveryUpsellingGetTypeLabel,
  discoveryUpsellingGetStrategyLabel,
  discoveryUpsellingGetStatusLabel,
  discoveryUpsellingGetErrorLabel,
  discoveryUpsellingIsActive,
  discoveryUpsellingIsAnalyzed,
  discoveryUpsellingGetDefaultLimit,
  // Cross-Selling
  DISCOVERY_CROSS_SELLING,
  DiscoveryCrossSellingType,
  DiscoveryCrossSellingStrategy,
  DiscoveryCrossSellingStatus,
  DiscoveryCrossSellingDefault,
  DiscoveryCrossSellingLimit,
  DiscoveryCrossSellingError,
  discoveryCrossSellingGetTypeLabel,
  discoveryCrossSellingGetStrategyLabel,
  discoveryCrossSellingGetStatusLabel,
  discoveryCrossSellingGetErrorLabel,
  discoveryCrossSellingIsActive,
  discoveryCrossSellingIsAnalyzed,
  discoveryCrossSellingGetDefaultLimit,
  discoveryCrossSellingGetDefaultConfidence,
  // Bundle
  DISCOVERY_BUNDLE,
  DiscoveryBundleType,
  DiscoveryBundleStatus,
  DiscoveryBundleDefault,
  DiscoveryBundleLimit,
  DiscoveryBundleError,
  discoveryBundleGetTypeLabel,
  discoveryBundleGetStatusLabel,
  discoveryBundleGetErrorLabel,
  discoveryBundleIsActive,
  discoveryBundleIsApproved,
  discoveryBundleGetDefaultLimit,
  discoveryBundleGetDefaultDiscount,
  discoveryBundleGetMaxItems,
  discoveryBundleGetMinItems,
  // Trending Now
  DISCOVERY_TRENDING_NOW,
  DiscoveryTrendingNowType,
  DiscoveryTrendingNowStatus,
  DiscoveryTrendingNowDefault,
  DiscoveryTrendingNowLimit,
  DiscoveryTrendingNowError,
  discoveryTrendingNowGetTypeLabel,
  discoveryTrendingNowGetStatusLabel,
  discoveryTrendingNowGetErrorLabel,
  discoveryTrendingNowIsActive,
  discoveryTrendingNowIsUpdated,
  discoveryTrendingNowGetDefaultLimit,
  discoveryTrendingNowGetDefaultUpdateInterval,
  // Seasonal
  DISCOVERY_SEASONAL,
  DiscoverySeasonalType,
  DiscoverySeason,
  DiscoverySeasonalStatus,
  DiscoverySeasonalDefault,
  DiscoverySeasonalLimit,
  DiscoverySeasonalError,
  discoverySeasonalGetTypeLabel,
  discoverySeasonalGetSeasonLabel,
  discoverySeasonalGetStatusLabel,
  discoverySeasonalGetErrorLabel,
  discoverySeasonalIsActive,
  discoverySeasonalIsScheduled,
  discoverySeasonalGetDefaultLimit,
  // Editorial
  DISCOVERY_EDITORIAL,
  DiscoveryEditorialType,
  DiscoveryEditorialCategory,
  DiscoveryEditorialStatus,
  DiscoveryEditorialDefault,
  DiscoveryEditorialLimit,
  DiscoveryEditorialError,
  discoveryEditorialGetTypeLabel,
  discoveryEditorialGetCategoryLabel,
  discoveryEditorialGetStatusLabel,
  discoveryEditorialGetErrorLabel,
  discoveryEditorialIsPublished,
  discoveryEditorialIsFeatured,
  discoveryEditorialIsApproved,
  discoveryEditorialGetDefaultLimit,
  // Discovery Error
  DISCOVERY_ERROR,
  DiscoveryErrorType,
  DiscoveryErrorSeverity,
  DiscoveryErrorCode,
  DiscoveryErrorDefault,
  discoveryErrorGetTypeLabel,
  discoveryErrorGetSeverityLabel,
  discoveryErrorGetCodeLabel,
  discoveryErrorIsRetryable,
  discoveryErrorGetDefaultRetryAttempts,
  discoveryErrorGetDefaultTimeout,
};
