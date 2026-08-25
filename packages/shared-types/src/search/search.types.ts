/**
 * Search Types
 * Type definitions for search based on shared-constants
 * @module SearchTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants search
// ============================================================
import {
  // Search Core
  SEARCH,
  SearchType,
  SearchMode,
  SearchLanguage,
  SearchRegion,
  SearchDefault,
  SearchLimit,
  SearchError,
  searchGetTypeLabel,
  searchGetModeLabel,
  searchGetLanguageLabel,
  searchGetRegionLabel,
  searchGetErrorLabel,
  searchGetDefaultPageSize,
  searchGetMaxPageSize,
  searchGetDefaultTimeout,
  searchIsExactMode,
  searchIsFuzzyMode,
  searchIsSemanticMode,
  searchIsHybridMode,
  searchGetDefaultFuzzyEditDistance,
  searchGetDefaultMinShouldMatch,
  // Search Type
  SEARCH_TYPE,
  SearchCategoryType,
  SearchSubType,
  SearchContext,
  SearchIntent,
  SearchComplexity,
  searchTypeGetCategoryLabel,
  searchTypeGetSubTypeLabel,
  searchTypeGetContextLabel,
  searchTypeGetIntentLabel,
  searchTypeGetComplexityLabel,
  searchTypeIsProductCategory,
  searchTypeIsContentCategory,
  searchTypeIsDocumentCategory,
  searchTypeIsUserCategory,
  searchTypeIsEcommerceContext,
  searchTypeIsTransactionalIntent,
  // Search Sort
  SEARCH_SORT,
  SearchSortField,
  SearchSortOrder,
  SearchSortType,
  SearchSortMode,
  SearchSortDefault,
  SearchSortLimit,
  searchSortGetFieldLabel,
  searchSortGetOrderLabel,
  searchSortGetTypeLabel,
  searchSortGetModeLabel,
  searchSortGetDefaultField,
  searchSortGetDefaultOrder,
  searchSortIsPriceField,
  searchSortIsRatingField,
  searchSortIsPopularityField,
  searchSortIsGeoField,
  searchSortIsAscending,
  searchSortIsDescending,
  searchSortGetMaxSortFields,
  // Search Filter
  SEARCH_FILTER,
  SearchFilterType,
  SearchFilterOperator,
  SearchFilterLogic,
  SearchFilterMode,
  SearchFilterDefault,
  SearchFilterLimit,
  searchFilterGetTypeLabel,
  searchFilterGetOperatorLabel,
  searchFilterGetLogicLabel,
  searchFilterGetModeLabel,
  searchFilterIsTermType,
  searchFilterIsRangeType,
  searchFilterIsBoolType,
  searchFilterIsGeoType,
  searchFilterIsNestedType,
  searchFilterGetDefaultLogic,
  searchFilterGetMaxFilters,
  // Search Operator
  SEARCH_OPERATOR,
  SearchBooleanOperator,
  SearchComparisonOperator,
  SearchStringOperator,
  SearchNumericOperator,
  SearchGeoOperator,
  SearchDateOperator,
  SearchArrayOperator,
  SearchLogicalOperator,
  SearchAggregationOperator,
  SearchOperatorPriority,
  searchOperatorGetBooleanLabel,
  searchOperatorGetComparisonLabel,
  searchOperatorGetStringLabel,
  searchOperatorGetGeoLabel,
  searchOperatorGetDateLabel,
  searchOperatorIsBoolean,
  searchOperatorIsComparison,
  searchOperatorIsString,
  searchOperatorIsGeo,
  searchOperatorIsDate,
  searchOperatorIsArray,
  searchOperatorIsLogical,
  searchOperatorGetPriority,
  // Search Match
  SEARCH_MATCH,
  SearchMatchType,
  SearchMatchOperator,
  SearchMatchMode,
  SearchMatchZeroTerms,
  SearchMatchFuzziness,
  SearchMatchDefault,
  SearchMatchLimit,
  searchMatchGetTypeLabel,
  searchMatchGetOperatorLabel,
  searchMatchGetModeLabel,
  searchMatchGetZeroTermsLabel,
  searchMatchIsPhraseType,
  searchMatchIsTermType,
  searchMatchIsFuzzyType,
  searchMatchIsRangeType,
  searchMatchIsQueryStringType,
  searchMatchGetDefaultType,
  searchMatchGetDefaultOperator,
  searchMatchGetDefaultFuzziness,
  // Search Boost
  SEARCH_BOOST,
  SearchBoostType,
  SearchBoostFactor,
  SearchBoostFunction,
  SearchBoostMode,
  SearchBoostDefault,
  SearchBoostLimit,
  searchBoostGetTypeLabel,
  searchBoostGetFunctionLabel,
  searchBoostGetModeLabel,
  searchBoostIsTermType,
  searchBoostIsFieldType,
  searchBoostIsFunctionType,
  searchBoostIsScriptType,
  searchBoostIsWeightType,
  searchBoostGetDefaultFactor,
  searchBoostGetMinFactor,
  searchBoostGetMaxFactor,
  searchBoostGetDefaultFieldBoost,
  searchBoostGetDefaultTermBoost,
  // Search Analytics
  SEARCH_ANALYTICS,
  SearchAnalyticsType,
  SearchAnalyticsMetric,
  SearchAnalyticsDimension,
  SearchAnalyticsTimeframe,
  SearchAnalyticsAggregation,
  SearchAnalyticsDefault,
  SearchAnalyticsLimit,
  searchAnalyticsGetTypeLabel,
  searchAnalyticsGetMetricLabel,
  searchAnalyticsGetDimensionLabel,
  searchAnalyticsGetTimeframeLabel,
  searchAnalyticsGetAggregationLabel,
  searchAnalyticsGetDefaultTimeframe,
  searchAnalyticsGetMaxMetrics,
  searchAnalyticsGetDataRetentionDays,
  // Search Suggestion
  SEARCH_SUGGESTION,
  SearchSuggestionType,
  SearchSuggestionMode,
  SearchSuggestionWeight,
  SearchSuggestionDefault,
  SearchSuggestionLimit,
  searchSuggestionGetTypeLabel,
  searchSuggestionGetModeLabel,
  searchSuggestionGetWeightLabel,
  searchSuggestionIsQueryType,
  searchSuggestionIsCompletionType,
  searchSuggestionIsContextType,
  searchSuggestionGetDefaultLimit,
  searchSuggestionGetMaxLimit,
  searchSuggestionGetMinChars,
  searchSuggestionGetDefaultWeight,
  searchSuggestionIsPopularMode,
  searchSuggestionIsPersonalizedMode,
  searchSuggestionIsHybridMode,
  // Search Synonym
  SEARCH_SYNONYM,
  SearchSynonymType,
  SearchSynonymFormat,
  SearchSynonymScope,
  SearchSynonymRelation,
  SearchSynonymDefault,
  SearchSynonymLimit,
  searchSynonymGetTypeLabel,
  searchSynonymGetFormatLabel,
  searchSynonymGetScopeLabel,
  searchSynonymGetRelationLabel,
  searchSynonymIsEquivalentType,
  searchSynonymIsOneWayType,
  searchSynonymIsMultiWayType,
  searchSynonymIsContextualType,
  searchSynonymGetMaxSynonyms,
  searchSynonymGetMaxSynonymGroup,
  searchSynonymIsCaseSensitive,
  searchSynonymShouldExpand,
  // Search Stopword
  SEARCH_STOPWORD,
  SearchStopwordType,
  SearchStopwordLanguage,
  SearchStopwordDefault,
  SearchStopwordLimit,
  searchStopwordGetTypeLabel,
  searchStopwordGetLanguageLabel,
  searchStopwordIsStandardType,
  searchStopwordIsCustomType,
  searchStopwordIsLanguageType,
  searchStopwordGetMaxStopwords,
  searchStopwordGetCommonEn,
  searchStopwordIsCommonEn,
  searchStopwordIsCaseSensitive,
  searchStopwordShouldRemoveDuplicates,
  searchStopwordShouldAutoUpdate,
  // Search Index
  SEARCH_INDEX,
  SearchIndexType,
  SearchIndexStatus,
  SearchIndexAnalyzer,
  SearchIndexMapping,
  SearchIndexDefault,
  SearchIndexLimit,
  searchIndexGetTypeLabel,
  searchIndexGetStatusLabel,
  searchIndexGetAnalyzerLabel,
  searchIndexGetMappingLabel,
  searchIndexIsProductType,
  searchIndexIsContentType,
  searchIndexIsOpen,
  searchIndexIsActive,
  searchIndexIsError,
  searchIndexGetDefaultShards,
  searchIndexGetDefaultReplicas,
  searchIndexGetDefaultBatchSize,
  searchIndexGetMaxShards,
  // Search Relevance
  SEARCH_RELEVANCE,
  SearchRelevanceType,
  SearchRelevanceFactor,
  SearchRelevanceWeight,
  SearchRelevanceDefault,
  SearchRelevanceLimit,
  searchRelevanceGetTypeLabel,
  searchRelevanceGetFactorLabel,
  searchRelevanceGetWeightLabel,
  searchRelevanceIsBM25,
  searchRelevanceIsTFIDF,
  searchRelevanceIsSemantic,
  searchRelevanceIsHybrid,
  searchRelevanceGetDefaultType,
  searchRelevanceGetMinScore,
  searchRelevanceGetDefaultBoost,
  searchRelevanceGetMinShouldMatch,
  searchRelevanceGetTitleWeight,
  searchRelevanceGetDescriptionWeight,
  // Autocomplete
  SEARCH_AUTOCOMPLETE,
  SearchAutocompleteType,
  SearchAutocompleteMode,
  SearchAutocompleteSource,
  SearchAutocompleteDefault,
  SearchAutocompleteLimit,
  searchAutocompleteGetTypeLabel,
  searchAutocompleteGetModeLabel,
  searchAutocompleteGetSourceLabel,
  searchAutocompleteIsQueryType,
  searchAutocompleteIsProductType,
  searchAutocompleteIsContextualType,
  searchAutocompleteGetDefaultLimit,
  searchAutocompleteGetMaxLimit,
  searchAutocompleteGetMinChars,
  searchAutocompleteGetDebounceMs,
  searchAutocompleteShouldHighlight,
  searchAutocompleteIsPrefixMode,
  searchAutocompleteIsFuzzyMode,
  searchAutocompleteIsSmartMode,
  // Facet
  SEARCH_FACET,
  SearchFacetType,
  SearchFacetMode,
  SearchFacetOrder,
  SearchFacetDefault,
  SearchFacetLimit,
  searchFacetGetTypeLabel,
  searchFacetGetModeLabel,
  searchFacetGetOrderLabel,
  searchFacetIsTermsType,
  searchFacetIsRangeType,
  searchFacetIsDateType,
  searchFacetIsHistogramType,
  searchFacetIsNestedType,
  searchFacetIsGeoType,
  searchFacetGetDefaultSize,
  searchFacetGetMaxSize,
  searchFacetGetMinDocCount,
  searchFacetGetDefaultOrder,
  searchFacetGetMaxDepth,
  // Filter Consolidated
  SEARCH_FILTER_CONSOLIDATED,
  SearchFilterConsolidatedType,
  SearchFilterConsolidatedOperator,
  SearchFilterConsolidatedLogic,
  SearchFilterConsolidatedDefault,
  SearchFilterConsolidatedLimit,
  searchFilterConsolidatedGetTypeLabel,
  searchFilterConsolidatedGetOperatorLabel,
  searchFilterConsolidatedGetLogicLabel,
  searchFilterConsolidatedIsTermType,
  searchFilterConsolidatedIsRangeType,
  searchFilterConsolidatedIsGeoType,
  searchFilterConsolidatedIsNestedType,
  searchFilterConsolidatedGetMaxFilters,
  searchFilterConsolidatedGetDefaultLogic,
  searchFilterConsolidatedIsCaseSensitive,
  searchFilterConsolidatedGetMaxNestedDepth,
  // Sort Consolidated
  SEARCH_SORT_CONSOLIDATED,
  SearchSortConsolidatedField,
  SearchSortConsolidatedOrder,
  SearchSortConsolidatedType,
  SearchSortConsolidatedDefault,
  SearchSortConsolidatedLimit,
  searchSortConsolidatedGetFieldLabel,
  searchSortConsolidatedGetOrderLabel,
  searchSortConsolidatedGetTypeLabel,
  searchSortConsolidatedIsPriceField,
  searchSortConsolidatedIsRatingField,
  searchSortConsolidatedIsPopularityField,
  searchSortConsolidatedIsGeoField,
  searchSortConsolidatedGetDefaultField,
  searchSortConsolidatedGetDefaultOrder,
  searchSortConsolidatedIsAscending,
  searchSortConsolidatedIsDescending,
  searchSortConsolidatedGetMaxSortFields,
  // Search Error
  SEARCH_ERROR,
  SearchErrorType,
  SearchErrorCode,
  SearchErrorSeverity,
  SearchErrorDefault,
  searchErrorGetTypeLabel,
  searchErrorGetCodeLabel,
  searchErrorGetSeverityLabel,
  searchErrorIsQueryType,
  searchErrorIsSystemType,
  searchErrorIsPermissionType,
  searchErrorIsRateLimitType,
  searchErrorIsTimeoutType,
  searchErrorGetDefaultType,
  searchErrorGetDefaultSeverity,
  searchErrorGetMaxRetryAttempts,
  searchErrorGetRetryDelayMs,
  searchErrorShouldCacheErrors,
} from '@vubon/shared-constants';

// ============================================================
// Search Extended Types
// ============================================================

/**
 * Search with additional metadata
 */
export interface SearchExtended extends BaseEntity, Timestamp {
  id: ID;
  userId?: ID;
  type: SearchType;
  mode: SearchMode;
  language: SearchLanguage;
  region: SearchRegion;
  query: string;
  filters: SearchFilter[];
  sort: SearchSort[];
  page: number;
  pageSize: number;
  timeout: number;
  metadata?: Metadata;
}

/**
 * Search filter
 */
export interface SearchFilter {
  type: SearchFilterType;
  field: string;
  operator: SearchFilterOperator;
  value: unknown;
  logic?: SearchFilterLogic;
  mode?: SearchFilterMode;
}

/**
 * Search sort
 */
export interface SearchSort {
  field: SearchSortField;
  order: SearchSortOrder;
  type?: SearchSortType;
  mode?: SearchSortMode;
}

/**
 * Search result
 */
export interface SearchResult<T = unknown> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  facets?: SearchFacet[];
  suggestions?: SearchSuggestion[];
  analytics?: SearchAnalytics;
  took: number;
  timedOut: boolean;
}

/**
 * Search facet
 */
export interface SearchFacet {
  field: string;
  type: SearchFacetType;
  buckets: SearchFacetBucket[];
}

/**
 * Search facet bucket
 */
export interface SearchFacetBucket {
  key: string;
  count: number;
  from?: number;
  to?: number;
}

/**
 * Search suggestion
 */
export interface SearchSuggestion {
  text: string;
  weight: number;
  type: SearchSuggestionType;
  mode: SearchSuggestionMode;
}

/**
 * Search analytics
 */
export interface SearchAnalytics {
  query: string;
  totalResults: number;
  clicks: number;
  impressions: number;
  ctr: number;
  avgPosition: number;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Search validation
 */
export interface SearchValidation {
  isValid: boolean;
  query: string;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Search history
 */
export interface SearchHistory extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  query: string;
  type: SearchType;
  mode: SearchMode;
  filters: SearchFilter[];
  sort: SearchSort[];
  results: number;
  clicked: boolean;
  clickedItemId?: string;
  metadata?: Metadata;
}

/**
 * Search export
 */
export interface SearchExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filters: SearchFilter[];
  sort: SearchSort[];
  fields: string[];
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core Search
  SEARCH,
  SearchType,
  SearchMode,
  SearchLanguage,
  SearchRegion,
  SearchDefault,
  SearchLimit,
  SearchError,
  searchGetTypeLabel,
  searchGetModeLabel,
  searchGetLanguageLabel,
  searchGetRegionLabel,
  searchGetErrorLabel,
  searchGetDefaultPageSize,
  searchGetMaxPageSize,
  searchGetDefaultTimeout,
  searchIsExactMode,
  searchIsFuzzyMode,
  searchIsSemanticMode,
  searchIsHybridMode,
  searchGetDefaultFuzzyEditDistance,
  searchGetDefaultMinShouldMatch,
  // Search Type
  SEARCH_TYPE,
  SearchCategoryType,
  SearchSubType,
  SearchContext,
  SearchIntent,
  SearchComplexity,
  searchTypeGetCategoryLabel,
  searchTypeGetSubTypeLabel,
  searchTypeGetContextLabel,
  searchTypeGetIntentLabel,
  searchTypeGetComplexityLabel,
  searchTypeIsProductCategory,
  searchTypeIsContentCategory,
  searchTypeIsDocumentCategory,
  searchTypeIsUserCategory,
  searchTypeIsEcommerceContext,
  searchTypeIsTransactionalIntent,
  // Search Sort
  SEARCH_SORT,
  SearchSortField,
  SearchSortOrder,
  SearchSortType,
  SearchSortMode,
  SearchSortDefault,
  SearchSortLimit,
  searchSortGetFieldLabel,
  searchSortGetOrderLabel,
  searchSortGetTypeLabel,
  searchSortGetModeLabel,
  searchSortGetDefaultField,
  searchSortGetDefaultOrder,
  searchSortIsPriceField,
  searchSortIsRatingField,
  searchSortIsPopularityField,
  searchSortIsGeoField,
  searchSortIsAscending,
  searchSortIsDescending,
  searchSortGetMaxSortFields,
  // Search Filter
  SEARCH_FILTER,
  SearchFilterType,
  SearchFilterOperator,
  SearchFilterLogic,
  SearchFilterMode,
  SearchFilterDefault,
  SearchFilterLimit,
  searchFilterGetTypeLabel,
  searchFilterGetOperatorLabel,
  searchFilterGetLogicLabel,
  searchFilterGetModeLabel,
  searchFilterIsTermType,
  searchFilterIsRangeType,
  searchFilterIsBoolType,
  searchFilterIsGeoType,
  searchFilterIsNestedType,
  searchFilterGetDefaultLogic,
  searchFilterGetMaxFilters,
  // Search Operator
  SEARCH_OPERATOR,
  SearchBooleanOperator,
  SearchComparisonOperator,
  SearchStringOperator,
  SearchNumericOperator,
  SearchGeoOperator,
  SearchDateOperator,
  SearchArrayOperator,
  SearchLogicalOperator,
  SearchAggregationOperator,
  SearchOperatorPriority,
  searchOperatorGetBooleanLabel,
  searchOperatorGetComparisonLabel,
  searchOperatorGetStringLabel,
  searchOperatorGetGeoLabel,
  searchOperatorGetDateLabel,
  searchOperatorIsBoolean,
  searchOperatorIsComparison,
  searchOperatorIsString,
  searchOperatorIsGeo,
  searchOperatorIsDate,
  searchOperatorIsArray,
  searchOperatorIsLogical,
  searchOperatorGetPriority,
  // Search Match
  SEARCH_MATCH,
  SearchMatchType,
  SearchMatchOperator,
  SearchMatchMode,
  SearchMatchZeroTerms,
  SearchMatchFuzziness,
  SearchMatchDefault,
  SearchMatchLimit,
  searchMatchGetTypeLabel,
  searchMatchGetOperatorLabel,
  searchMatchGetModeLabel,
  searchMatchGetZeroTermsLabel,
  searchMatchIsPhraseType,
  searchMatchIsTermType,
  searchMatchIsFuzzyType,
  searchMatchIsRangeType,
  searchMatchIsQueryStringType,
  searchMatchGetDefaultType,
  searchMatchGetDefaultOperator,
  searchMatchGetDefaultFuzziness,
  // Search Boost
  SEARCH_BOOST,
  SearchBoostType,
  SearchBoostFactor,
  SearchBoostFunction,
  SearchBoostMode,
  SearchBoostDefault,
  SearchBoostLimit,
  searchBoostGetTypeLabel,
  searchBoostGetFunctionLabel,
  searchBoostGetModeLabel,
  searchBoostIsTermType,
  searchBoostIsFieldType,
  searchBoostIsFunctionType,
  searchBoostIsScriptType,
  searchBoostIsWeightType,
  searchBoostGetDefaultFactor,
  searchBoostGetMinFactor,
  searchBoostGetMaxFactor,
  searchBoostGetDefaultFieldBoost,
  searchBoostGetDefaultTermBoost,
  // Search Analytics
  SEARCH_ANALYTICS,
  SearchAnalyticsType,
  SearchAnalyticsMetric,
  SearchAnalyticsDimension,
  SearchAnalyticsTimeframe,
  SearchAnalyticsAggregation,
  SearchAnalyticsDefault,
  SearchAnalyticsLimit,
  searchAnalyticsGetTypeLabel,
  searchAnalyticsGetMetricLabel,
  searchAnalyticsGetDimensionLabel,
  searchAnalyticsGetTimeframeLabel,
  searchAnalyticsGetAggregationLabel,
  searchAnalyticsGetDefaultTimeframe,
  searchAnalyticsGetMaxMetrics,
  searchAnalyticsGetDataRetentionDays,
  // Search Suggestion
  SEARCH_SUGGESTION,
  SearchSuggestionType,
  SearchSuggestionMode,
  SearchSuggestionWeight,
  SearchSuggestionDefault,
  SearchSuggestionLimit,
  searchSuggestionGetTypeLabel,
  searchSuggestionGetModeLabel,
  searchSuggestionGetWeightLabel,
  searchSuggestionIsQueryType,
  searchSuggestionIsCompletionType,
  searchSuggestionIsContextType,
  searchSuggestionGetDefaultLimit,
  searchSuggestionGetMaxLimit,
  searchSuggestionGetMinChars,
  searchSuggestionGetDefaultWeight,
  searchSuggestionIsPopularMode,
  searchSuggestionIsPersonalizedMode,
  searchSuggestionIsHybridMode,
  // Search Synonym
  SEARCH_SYNONYM,
  SearchSynonymType,
  SearchSynonymFormat,
  SearchSynonymScope,
  SearchSynonymRelation,
  SearchSynonymDefault,
  SearchSynonymLimit,
  searchSynonymGetTypeLabel,
  searchSynonymGetFormatLabel,
  searchSynonymGetScopeLabel,
  searchSynonymGetRelationLabel,
  searchSynonymIsEquivalentType,
  searchSynonymIsOneWayType,
  searchSynonymIsMultiWayType,
  searchSynonymIsContextualType,
  searchSynonymGetMaxSynonyms,
  searchSynonymGetMaxSynonymGroup,
  searchSynonymIsCaseSensitive,
  searchSynonymShouldExpand,
  // Search Stopword
  SEARCH_STOPWORD,
  SearchStopwordType,
  SearchStopwordLanguage,
  SearchStopwordDefault,
  SearchStopwordLimit,
  searchStopwordGetTypeLabel,
  searchStopwordGetLanguageLabel,
  searchStopwordIsStandardType,
  searchStopwordIsCustomType,
  searchStopwordIsLanguageType,
  searchStopwordGetMaxStopwords,
  searchStopwordGetCommonEn,
  searchStopwordIsCommonEn,
  searchStopwordIsCaseSensitive,
  searchStopwordShouldRemoveDuplicates,
  searchStopwordShouldAutoUpdate,
  // Search Index
  SEARCH_INDEX,
  SearchIndexType,
  SearchIndexStatus,
  SearchIndexAnalyzer,
  SearchIndexMapping,
  SearchIndexDefault,
  SearchIndexLimit,
  searchIndexGetTypeLabel,
  searchIndexGetStatusLabel,
  searchIndexGetAnalyzerLabel,
  searchIndexGetMappingLabel,
  searchIndexIsProductType,
  searchIndexIsContentType,
  searchIndexIsOpen,
  searchIndexIsActive,
  searchIndexIsError,
  searchIndexGetDefaultShards,
  searchIndexGetDefaultReplicas,
  searchIndexGetDefaultBatchSize,
  searchIndexGetMaxShards,
  // Search Relevance
  SEARCH_RELEVANCE,
  SearchRelevanceType,
  SearchRelevanceFactor,
  SearchRelevanceWeight,
  SearchRelevanceDefault,
  SearchRelevanceLimit,
  searchRelevanceGetTypeLabel,
  searchRelevanceGetFactorLabel,
  searchRelevanceGetWeightLabel,
  searchRelevanceIsBM25,
  searchRelevanceIsTFIDF,
  searchRelevanceIsSemantic,
  searchRelevanceIsHybrid,
  searchRelevanceGetDefaultType,
  searchRelevanceGetMinScore,
  searchRelevanceGetDefaultBoost,
  searchRelevanceGetMinShouldMatch,
  searchRelevanceGetTitleWeight,
  searchRelevanceGetDescriptionWeight,
  // Autocomplete
  SEARCH_AUTOCOMPLETE,
  SearchAutocompleteType,
  SearchAutocompleteMode,
  SearchAutocompleteSource,
  SearchAutocompleteDefault,
  SearchAutocompleteLimit,
  searchAutocompleteGetTypeLabel,
  searchAutocompleteGetModeLabel,
  searchAutocompleteGetSourceLabel,
  searchAutocompleteIsQueryType,
  searchAutocompleteIsProductType,
  searchAutocompleteIsContextualType,
  searchAutocompleteGetDefaultLimit,
  searchAutocompleteGetMaxLimit,
  searchAutocompleteGetMinChars,
  searchAutocompleteGetDebounceMs,
  searchAutocompleteShouldHighlight,
  searchAutocompleteIsPrefixMode,
  searchAutocompleteIsFuzzyMode,
  searchAutocompleteIsSmartMode,
  // Facet
  SEARCH_FACET,
  SearchFacetType,
  SearchFacetMode,
  SearchFacetOrder,
  SearchFacetDefault,
  SearchFacetLimit,
  searchFacetGetTypeLabel,
  searchFacetGetModeLabel,
  searchFacetGetOrderLabel,
  searchFacetIsTermsType,
  searchFacetIsRangeType,
  searchFacetIsDateType,
  searchFacetIsHistogramType,
  searchFacetIsNestedType,
  searchFacetIsGeoType,
  searchFacetGetDefaultSize,
  searchFacetGetMaxSize,
  searchFacetGetMinDocCount,
  searchFacetGetDefaultOrder,
  searchFacetGetMaxDepth,
  // Filter Consolidated
  SEARCH_FILTER_CONSOLIDATED,
  SearchFilterConsolidatedType,
  SearchFilterConsolidatedOperator,
  SearchFilterConsolidatedLogic,
  SearchFilterConsolidatedDefault,
  SearchFilterConsolidatedLimit,
  searchFilterConsolidatedGetTypeLabel,
  searchFilterConsolidatedGetOperatorLabel,
  searchFilterConsolidatedGetLogicLabel,
  searchFilterConsolidatedIsTermType,
  searchFilterConsolidatedIsRangeType,
  searchFilterConsolidatedIsGeoType,
  searchFilterConsolidatedIsNestedType,
  searchFilterConsolidatedGetMaxFilters,
  searchFilterConsolidatedGetDefaultLogic,
  searchFilterConsolidatedIsCaseSensitive,
  searchFilterConsolidatedGetMaxNestedDepth,
  // Sort Consolidated
  SEARCH_SORT_CONSOLIDATED,
  SearchSortConsolidatedField,
  SearchSortConsolidatedOrder,
  SearchSortConsolidatedType,
  SearchSortConsolidatedDefault,
  SearchSortConsolidatedLimit,
  searchSortConsolidatedGetFieldLabel,
  searchSortConsolidatedGetOrderLabel,
  searchSortConsolidatedGetTypeLabel,
  searchSortConsolidatedIsPriceField,
  searchSortConsolidatedIsRatingField,
  searchSortConsolidatedIsPopularityField,
  searchSortConsolidatedIsGeoField,
  searchSortConsolidatedGetDefaultField,
  searchSortConsolidatedGetDefaultOrder,
  searchSortConsolidatedIsAscending,
  searchSortConsolidatedIsDescending,
  searchSortConsolidatedGetMaxSortFields,
  // Search Error
  SEARCH_ERROR,
  SearchErrorType,
  SearchErrorCode,
  SearchErrorSeverity,
  SearchErrorDefault,
  searchErrorGetTypeLabel,
  searchErrorGetCodeLabel,
  searchErrorGetSeverityLabel,
  searchErrorIsQueryType,
  searchErrorIsSystemType,
  searchErrorIsPermissionType,
  searchErrorIsRateLimitType,
  searchErrorIsTimeoutType,
  searchErrorGetDefaultType,
  searchErrorGetDefaultSeverity,
  searchErrorGetMaxRetryAttempts,
  searchErrorGetRetryDelayMs,
  searchErrorShouldCacheErrors,
};
