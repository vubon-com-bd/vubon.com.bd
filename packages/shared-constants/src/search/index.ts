/**
 * Search Constants Index
 * Export all search constants and types for easy importing
 */

// Search Constants
export {
  SEARCH,
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
} from './search.constants';

export type {
  SearchType,
  SearchMode,
  SearchLanguage,
  SearchRegion,
  SearchDefault,
  SearchLimit,
  SearchError,
} from './search.constants';

// Search Type Constants
export {
  SEARCH_TYPE,
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
} from './search-type.constants';

export type {
  SearchCategoryType,
  SearchSubType,
  SearchContext,
  SearchIntent,
  SearchComplexity,
} from './search-type.constants';

// Search Sort Constants
export {
  SEARCH_SORT,
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
} from './search-sort.constants';

export type {
  SearchSortField,
  SearchSortOrder,
  SearchSortType,
  SearchSortMode,
  SearchSortDefault,
  SearchSortLimit,
} from './search-sort.constants';

// Search Filter Constants
export {
  SEARCH_FILTER,
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
} from './search-filter.constants';

export type {
  SearchFilterType,
  SearchFilterOperator,
  SearchFilterLogic,
  SearchFilterMode,
  SearchFilterDefault,
  SearchFilterLimit,
} from './search-filter.constants';

// Search Operator Constants
export {
  SEARCH_OPERATOR,
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
} from './search-operator.constants';

export type {
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
} from './search-operator.constants';

// Search Match Constants
export {
  SEARCH_MATCH,
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
} from './search-match.constants';

export type {
  SearchMatchType,
  SearchMatchOperator,
  SearchMatchMode,
  SearchMatchZeroTerms,
  SearchMatchFuzziness,
  SearchMatchDefault,
  SearchMatchLimit,
} from './search-match.constants';

// Search Boost Constants
export {
  SEARCH_BOOST,
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
} from './search-boost.constants';

export type {
  SearchBoostType,
  SearchBoostFactor,
  SearchBoostFunction,
  SearchBoostMode,
  SearchBoostDefault,
  SearchBoostLimit,
} from './search-boost.constants';

// Search Analytics Constants
export {
  SEARCH_ANALYTICS,
  searchAnalyticsGetTypeLabel,
  searchAnalyticsGetMetricLabel,
  searchAnalyticsGetDimensionLabel,
  searchAnalyticsGetTimeframeLabel,
  searchAnalyticsGetAggregationLabel,
  searchAnalyticsGetDefaultTimeframe,
  searchAnalyticsGetMaxMetrics,
  searchAnalyticsGetDataRetentionDays,
} from './search-analytics.constants';

export type {
  SearchAnalyticsType,
  SearchAnalyticsMetric,
  SearchAnalyticsDimension,
  SearchAnalyticsTimeframe,
  SearchAnalyticsAggregation,
  SearchAnalyticsDefault,
  SearchAnalyticsLimit,
} from './search-analytics.constants';

// Search Suggestion Constants
export {
  SEARCH_SUGGESTION,
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
} from './search-suggestion.constants';

export type {
  SearchSuggestionType,
  SearchSuggestionMode,
  SearchSuggestionWeight,
  SearchSuggestionDefault,
  SearchSuggestionLimit,
} from './search-suggestion.constants';

// Search Synonym Constants
export {
  SEARCH_SYNONYM,
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
} from './search-synonym.constants';

export type {
  SearchSynonymType,
  SearchSynonymFormat,
  SearchSynonymScope,
  SearchSynonymRelation,
  SearchSynonymDefault,
  SearchSynonymLimit,
} from './search-synonym.constants';

// Search Stopword Constants
export {
  SEARCH_STOPWORD,
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
} from './search-stopword.constants';

export type {
  SearchStopwordType,
  SearchStopwordLanguage,
  SearchStopwordDefault,
  SearchStopwordLimit,
} from './search-stopword.constants';

// Search Index Constants
export {
  SEARCH_INDEX,
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
} from './search-index.constants';

export type {
  SearchIndexType,
  SearchIndexStatus,
  SearchIndexAnalyzer,
  SearchIndexMapping,
  SearchIndexDefault,
  SearchIndexLimit,
} from './search-index.constants';

// Search Relevance Constants
export {
  SEARCH_RELEVANCE,
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
} from './search-relevance.constants';

export type {
  SearchRelevanceType,
  SearchRelevanceFactor,
  SearchRelevanceWeight,
  SearchRelevanceDefault,
  SearchRelevanceLimit,
} from './search-relevance.constants';

// Autocomplete Constants
export {
  SEARCH_AUTOCOMPLETE,
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
} from './autocomplete.constants';

export type {
  SearchAutocompleteType,
  SearchAutocompleteMode,
  SearchAutocompleteSource,
  SearchAutocompleteDefault,
  SearchAutocompleteLimit,
} from './autocomplete.constants';

// Facet Constants
export {
  SEARCH_FACET,
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
} from './facet.constants';

export type {
  SearchFacetType,
  SearchFacetMode,
  SearchFacetOrder,
  SearchFacetDefault,
  SearchFacetLimit,
} from './facet.constants';

// Filter Consolidated Constants
export {
  SEARCH_FILTER_CONSOLIDATED,
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
} from './filter.constants';

export type {
  SearchFilterConsolidatedType,
  SearchFilterConsolidatedOperator,
  SearchFilterConsolidatedLogic,
  SearchFilterConsolidatedDefault,
  SearchFilterConsolidatedLimit,
} from './filter.constants';

// Sort Consolidated Constants
export {
  SEARCH_SORT_CONSOLIDATED,
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
} from './sort.constants';

export type {
  SearchSortConsolidatedField,
  SearchSortConsolidatedOrder,
  SearchSortConsolidatedType,
  SearchSortConsolidatedDefault,
  SearchSortConsolidatedLimit,
} from './sort.constants';

// Search Error Constants
export {
  SEARCH_ERROR,
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
} from './search-error.constants';

export type {
  SearchErrorType,
  SearchErrorCode,
  SearchErrorSeverity,
  SearchErrorDefault,
} from './search-error.constants';
