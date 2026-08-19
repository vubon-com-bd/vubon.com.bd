/**
 * সার্চ ও ডিসকভারি ডোমেইনের জন্য সাধারণ কনস্ট্যান্টসমূহ
 *
 * এই ফাইলটি শুধুমাত্র Search এবং Discovery ডোমেইনের জন্য প্রযোজ্য
 * কনস্ট্যান্ট ধারণ করে। এখানে জেনেরিক কনস্ট্যান্ট (HTTP স্ট্যাটাস,
 * রেজেক্স, ক্যাশ, কিউ) রাখা হবে না।
 */

// ============================================
// ১. সার্চ ও পেজিনেশনের ডিফল্ট মান
// ============================================

/**
 * ডিফল্ট পেজ সাইজ (প্রতি পেজে কতটি রেজাল্ট দেখাবে)
 */
export const DEFAULT_PAGE_SIZE = 20;

/**
 * সর্বোচ্চ পেজ সাইজ (একবারে সর্বোচ্চ কতটি রেজাল্ট আনা যাবে)
 */
export const MAX_PAGE_SIZE = 100;

/**
 * ডিফল্ট সার্চ রেজাল্ট সংখ্যা
 */
export const DEFAULT_SEARCH_RESULTS = 20;

/**
 * ন্যূনতম সার্চ ক্যোয়ারী দৈর্ঘ্য
 */
export const MIN_SEARCH_QUERY_LENGTH = 2;

/**
 * সর্বোচ্চ সার্চ ক্যোয়ারী দৈর্ঘ্য
 */
export const MAX_SEARCH_QUERY_LENGTH = 200;

/**
 * ডিফল্ট পেজ নম্বর
 */
export const DEFAULT_PAGE = 1;

// ============================================
// ২. সার্চ টাইপ ও অপারেটর সংক্রান্ত এনাম
// ============================================

/**
 * সার্চ টাইপ এনাম
 */
export enum SearchType {
  PRODUCT = 'PRODUCT',
  CATEGORY = 'CATEGORY',
  BRAND = 'BRAND',
  VENDOR = 'VENDOR',
  ALL = 'ALL',
}

/**
 * ডিফল্ট সার্চ টাইপ
 */
export const DEFAULT_SEARCH_TYPE = SearchType.PRODUCT;

/**
 * সার্চ টাইপ লেবেলসমূহ (বাংলায়)
 */
export const SEARCH_TYPE_LABELS_BN: Record<SearchType, string> = {
  [SearchType.PRODUCT]: 'পণ্য',
  [SearchType.CATEGORY]: 'ক্যাটাগরি',
  [SearchType.BRAND]: 'ব্র্যান্ড',
  [SearchType.VENDOR]: 'দোকান',
  [SearchType.ALL]: 'সব',
} as const;

/**
 * সার্চ টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const SEARCH_TYPE_LABELS_EN: Record<SearchType, string> = {
  [SearchType.PRODUCT]: 'Product',
  [SearchType.CATEGORY]: 'Category',
  [SearchType.BRAND]: 'Brand',
  [SearchType.VENDOR]: 'Vendor',
  [SearchType.ALL]: 'All',
} as const;

/**
 * সার্চ অপারেটর এনাম
 */
export enum SearchOperator {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
}

/**
 * সার্চ অপারেটর লেবেলসমূহ (বাংলায়)
 */
export const SEARCH_OPERATOR_LABELS_BN: Record<SearchOperator, string> = {
  [SearchOperator.AND]: 'এবং',
  [SearchOperator.OR]: 'অথবা',
  [SearchOperator.NOT]: 'না',
} as const;

/**
 * সার্চ অপারেটর লেবেলসমূহ (ইংরেজিতে)
 */
export const SEARCH_OPERATOR_LABELS_EN: Record<SearchOperator, string> = {
  [SearchOperator.AND]: 'AND',
  [SearchOperator.OR]: 'OR',
  [SearchOperator.NOT]: 'NOT',
} as const;

/**
 * সার্চ ম্যাচ টাইপ এনাম
 */
export enum SearchMatchType {
  EXACT = 'EXACT',
  FUZZY = 'FUZZY',
  PREFIX = 'PREFIX',
  PHRASE = 'PHRASE',
  WILDCARD = 'WILDCARD',
}

/**
 * সার্চ ম্যাচ টাইপ লেবেলসমূহ (বাংলায়)
 */
export const SEARCH_MATCH_TYPE_LABELS_BN: Record<SearchMatchType, string> = {
  [SearchMatchType.EXACT]: 'হুবহু',
  [SearchMatchType.FUZZY]: 'আসন্ন',
  [SearchMatchType.PREFIX]: 'উপসর্গ',
  [SearchMatchType.PHRASE]: 'বাক্যাংশ',
  [SearchMatchType.WILDCARD]: 'ওয়াইল্ডকার্ড',
} as const;

/**
 * সার্চ ম্যাচ টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const SEARCH_MATCH_TYPE_LABELS_EN: Record<SearchMatchType, string> = {
  [SearchMatchType.EXACT]: 'Exact',
  [SearchMatchType.FUZZY]: 'Fuzzy',
  [SearchMatchType.PREFIX]: 'Prefix',
  [SearchMatchType.PHRASE]: 'Phrase',
  [SearchMatchType.WILDCARD]: 'Wildcard',
} as const;

// ============================================
// ৩. বুস্টিং ও রিলেভেন্স কনফিগারেশন
// ============================================

/**
 * সার্চ ফিল্ড বুস্ট ফ্যাক্টরসমূহ
 */
export const SEARCH_BOOST_FACTORS = {
  TITLE_BOOST: 5.0,
  DESCRIPTION_BOOST: 2.0,
  CATEGORY_BOOST: 3.0,
  BRAND_BOOST: 4.0,
  TAG_BOOST: 1.5,
  SKU_BOOST: 1.0,
} as const;

/**
 * ডিফল্ট বুস্ট ভ্যালু
 */
export const DEFAULT_BOOST = 1.0;

/**
 * রিলেভেন্স থ্রেশহোল্ড
 */
export const RELEVANCE_THRESHOLD = {
  HIGH: 0.8,
  MEDIUM: 0.5,
  LOW: 0.3,
} as const;

/**
 * ডিফল্ট রিলেভেন্স থ্রেশহোল্ড
 */
export const DEFAULT_RELEVANCE_THRESHOLD = RELEVANCE_THRESHOLD.MEDIUM;

/**
 * রিলেভেন্স থ্রেশহোল্ড লেবেলসমূহ (বাংলায়)
 */
export const RELEVANCE_THRESHOLD_LABELS_BN: Record<keyof typeof RELEVANCE_THRESHOLD, string> = {
  HIGH: 'উচ্চ',
  MEDIUM: 'মধ্যম',
  LOW: 'নিম্ন',
} as const;

/**
 * রিলেভেন্স থ্রেশহোল্ড লেবেলসমূহ (ইংরেজিতে)
 */
export const RELEVANCE_THRESHOLD_LABELS_EN: Record<keyof typeof RELEVANCE_THRESHOLD, string> = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
} as const;

// ============================================
// ৪. ফ্যাসেট, ফিল্টার ও সর্ট কনফিগারেশন
// ============================================

/**
 * ফ্যাসেট ফিল্ডসমূহ
 */
export const FACET_FIELDS = ['category', 'brand', 'price_range', 'rating'] as const;

/**
 * ডিফল্ট ফ্যাসেট সাইজ
 */
export const DEFAULT_FACET_SIZE = 50;

/**
 * সর্বোচ্চ ফ্যাসেট সাইজ
 */
export const MAX_FACET_SIZE = 1000;

/**
 * সর্ট ফিল্ডসমূহ
 */
export const SORT_FIELDS = ['relevance', 'price', 'rating', 'newest'] as const;

/**
 * ডিফল্ট সর্ট ফিল্ড
 */
export const DEFAULT_SORT_FIELD = 'relevance' as const;

/**
 * সর্ট অর্ডার
 */
export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

/**
 * ডিফল্ট সর্ট অর্ডার
 */
export const DEFAULT_SORT_ORDER = SortOrder.DESC;

/**
 * ফিল্টার টাইপ এনাম
 */
export enum FilterUIType {
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  RANGE = 'RANGE',
  DROPDOWN = 'DROPDOWN',
  TAGS = 'TAGS',
}

/**
 * ফিল্টার টাইপ লেবেলসমূহ (বাংলায়)
 */
export const FILTER_UI_TYPE_LABELS_BN: Record<FilterUIType, string> = {
  [FilterUIType.CHECKBOX]: 'চেকবক্স',
  [FilterUIType.RADIO]: 'রেডিও',
  [FilterUIType.RANGE]: 'রেঞ্জ',
  [FilterUIType.DROPDOWN]: 'ড্রপডাউন',
  [FilterUIType.TAGS]: 'ট্যাগ',
} as const;

/**
 * ফিল্টার টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const FILTER_UI_TYPE_LABELS_EN: Record<FilterUIType, string> = {
  [FilterUIType.CHECKBOX]: 'Checkbox',
  [FilterUIType.RADIO]: 'Radio',
  [FilterUIType.RANGE]: 'Range',
  [FilterUIType.DROPDOWN]: 'Dropdown',
  [FilterUIType.TAGS]: 'Tags',
} as const;

// ============================================
// ৫. রেকমেন্ডেশন ও ডিসকভারি কনফিগারেশন
// ============================================

/**
 * রেকমেন্ডেশন টাইপ এনাম
 */
export enum RecommendationType {
  PERSONALIZED = 'PERSONALIZED',
  TRENDING = 'TRENDING',
  POPULAR = 'POPULAR',
  RECENTLY_VIEWED = 'RECENTLY_VIEWED',
  FREQUENTLY_BOUGHT = 'FREQUENTLY_BOUGHT',
  COMPLEMENTARY = 'COMPLEMENTARY',
  SUBSTITUTE = 'SUBSTITUTE',
  UPSELLING = 'UPSELLING',
  CROSS_SELLING = 'CROSS_SELLING',
  BUNDLE = 'BUNDLE',
}

/**
 * রেকমেন্ডেশন টাইপ লেবেলসমূহ (বাংলায়)
 */
export const RECOMMENDATION_TYPE_LABELS_BN: Record<RecommendationType, string> = {
  [RecommendationType.PERSONALIZED]: 'ব্যক্তিগতকৃত',
  [RecommendationType.TRENDING]: 'ট্রেন্ডিং',
  [RecommendationType.POPULAR]: 'জনপ্রিয়',
  [RecommendationType.RECENTLY_VIEWED]: 'সম্প্রতি দেখা',
  [RecommendationType.FREQUENTLY_BOUGHT]: 'সাথে কেনা',
  [RecommendationType.COMPLEMENTARY]: 'পরিপূরক',
  [RecommendationType.SUBSTITUTE]: 'বিকল্প',
  [RecommendationType.UPSELLING]: 'আপসেল',
  [RecommendationType.CROSS_SELLING]: 'ক্রস-সেল',
  [RecommendationType.BUNDLE]: 'বান্ডল',
} as const;

/**
 * রেকমেন্ডেশন টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const RECOMMENDATION_TYPE_LABELS_EN: Record<RecommendationType, string> = {
  [RecommendationType.PERSONALIZED]: 'Personalized',
  [RecommendationType.TRENDING]: 'Trending',
  [RecommendationType.POPULAR]: 'Popular',
  [RecommendationType.RECENTLY_VIEWED]: 'Recently Viewed',
  [RecommendationType.FREQUENTLY_BOUGHT]: 'Frequently Bought',
  [RecommendationType.COMPLEMENTARY]: 'Complementary',
  [RecommendationType.SUBSTITUTE]: 'Substitute',
  [RecommendationType.UPSELLING]: 'Upselling',
  [RecommendationType.CROSS_SELLING]: 'Cross-Selling',
  [RecommendationType.BUNDLE]: 'Bundle',
} as const;

/**
 * রেকমেন্ডেশন স্ট্র্যাটেজি এনাম
 */
export enum RecommendationStrategy {
  COLLABORATIVE_FILTERING = 'COLLABORATIVE_FILTERING',
  CONTENT_BASED = 'CONTENT_BASED',
  HYBRID = 'HYBRID',
}

/**
 * রেকমেন্ডেশন স্ট্র্যাটেজি লেবেলসমূহ (বাংলায়)
 */
export const RECOMMENDATION_STRATEGY_LABELS_BN: Record<RecommendationStrategy, string> = {
  [RecommendationStrategy.COLLABORATIVE_FILTERING]: 'সহযোগী ফিল্টারিং',
  [RecommendationStrategy.CONTENT_BASED]: 'কন্টেন্ট ভিত্তিক',
  [RecommendationStrategy.HYBRID]: 'হাইব্রিড',
} as const;

/**
 * রেকমেন্ডেশন স্ট্র্যাটেজি লেবেলসমূহ (ইংরেজিতে)
 */
export const RECOMMENDATION_STRATEGY_LABELS_EN: Record<RecommendationStrategy, string> = {
  [RecommendationStrategy.COLLABORATIVE_FILTERING]: 'Collaborative Filtering',
  [RecommendationStrategy.CONTENT_BASED]: 'Content Based',
  [RecommendationStrategy.HYBRID]: 'Hybrid',
} as const;

/**
 * ডিফল্ট রেকমেন্ডেশন সংখ্যা
 */
export const DEFAULT_RECOMMENDATION_COUNT = 12;

/**
 * সর্বোচ্চ রেকমেন্ডেশন সংখ্যা
 */
export const MAX_RECOMMENDATION_COUNT = 50;

/**
 * পার্সোনালাইজেশন টাইপ এনাম
 */
export enum PersonalizationType {
  EXPLICIT = 'EXPLICIT',
  IMPLICIT = 'IMPLICIT',
  HYBRID = 'HYBRID',
}

/**
 * পার্সোনালাইজেশন টাইপ লেবেলসমূহ (বাংলায়)
 */
export const PERSONALIZATION_TYPE_LABELS_BN: Record<PersonalizationType, string> = {
  [PersonalizationType.EXPLICIT]: 'স্পষ্ট',
  [PersonalizationType.IMPLICIT]: 'অন্তর্নিহিত',
  [PersonalizationType.HYBRID]: 'হাইব্রিড',
} as const;

/**
 * পার্সোনালাইজেশন টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const PERSONALIZATION_TYPE_LABELS_EN: Record<PersonalizationType, string> = {
  [PersonalizationType.EXPLICIT]: 'Explicit',
  [PersonalizationType.IMPLICIT]: 'Implicit',
  [PersonalizationType.HYBRID]: 'Hybrid',
} as const;

// ============================================
// ৬. সাজেশন ও অটোকমপ্লিট কনফিগারেশন
// ============================================

/**
 * সাজেশন টাইপ এনাম
 */
export enum SuggestionType {
  TERM = 'TERM',
  PHRASE = 'PHRASE',
  COMPLETE = 'COMPLETE',
}

/**
 * সাজেশন টাইপ লেবেলসমূহ (বাংলায়)
 */
export const SUGGESTION_TYPE_LABELS_BN: Record<SuggestionType, string> = {
  [SuggestionType.TERM]: 'শব্দ',
  [SuggestionType.PHRASE]: 'বাক্যাংশ',
  [SuggestionType.COMPLETE]: 'অটো-কমপ্লিট',
} as const;

/**
 * সাজেশন টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const SUGGESTION_TYPE_LABELS_EN: Record<SuggestionType, string> = {
  [SuggestionType.TERM]: 'Term',
  [SuggestionType.PHRASE]: 'Phrase',
  [SuggestionType.COMPLETE]: 'Auto-Complete',
} as const;

/**
 * ডিফল্ট সাজেশন সংখ্যা
 */
export const DEFAULT_SUGGESTION_COUNT = 10;

/**
 * অটোকমপ্লিট মিনিমাম ক্যারেক্টার
 */
export const AUTOCOMPLETE_MIN_CHARS = 2;

/**
 * অটোকমপ্লিট ম্যাক্সিমাম ক্যারেক্টার
 */
export const AUTOCOMPLETE_MAX_CHARS = 50;

/**
 * অটোকমপ্লিট ক্যাশের সময় (সেকেন্ডে)
 */
export const AUTOCOMPLETE_CACHE_TTL_SECONDS = 1800;

// ============================================
// ৭. সিনোনিম ও স্টপওয়ার্ড কনফিগারেশন
// ============================================

/**
 * সিনোনিম টাইপ এনাম
 */
export enum SynonymType {
  EXPLICIT = 'EXPLICIT',
  EQUIVALENT = 'EQUIVALENT',
  ALIAS = 'ALIAS',
}

/**
 * সিনোনিম টাইপ লেবেলসমূহ (বাংলায়)
 */
export const SYNONYM_TYPE_LABELS_BN: Record<SynonymType, string> = {
  [SynonymType.EXPLICIT]: 'স্পষ্ট',
  [SynonymType.EQUIVALENT]: 'সমতুল্য',
  [SynonymType.ALIAS]: 'ডাকনাম',
} as const;

/**
 * সিনোনিম টাইপ লেবেলসমূহ (ইংরেজিতে)
 */
export const SYNONYM_TYPE_LABELS_EN: Record<SynonymType, string> = {
  [SynonymType.EXPLICIT]: 'Explicit',
  [SynonymType.EQUIVALENT]: 'Equivalent',
  [SynonymType.ALIAS]: 'Alias',
} as const;

/**
 * ডিফল্ট সিনোনিম ফাইল পাথ
 */
export const DEFAULT_SYNONYM_FILE_PATH = 'data/synonyms.txt';

/**
 * স্টপওয়ার্ড ভাষা এনাম
 */
export enum StopwordLanguage {
  BENGALI = 'BENGALI',
  ENGLISH = 'ENGLISH',
}

/**
 * স্টপওয়ার্ড ভাষা লেবেলসমূহ (বাংলায়)
 */
export const STOPWORD_LANGUAGE_LABELS_BN: Record<StopwordLanguage, string> = {
  [StopwordLanguage.BENGALI]: 'বাংলা',
  [StopwordLanguage.ENGLISH]: 'ইংরেজি',
} as const;

/**
 * স্টপওয়ার্ড ভাষা লেবেলসমূহ (ইংরেজিতে)
 */
export const STOPWORD_LANGUAGE_LABELS_EN: Record<StopwordLanguage, string> = {
  [StopwordLanguage.BENGALI]: 'Bengali',
  [StopwordLanguage.ENGLISH]: 'English',
} as const;

// ============================================
// ৮. ডোমেইন-নির্দিষ্ট এরর কোড
// ============================================

/**
 * সার্চ এরর কোড এনাম
 */
export enum SearchErrorCode {
  EMPTY_QUERY = 'SEARCH_001',
  INVALID_FILTER = 'SEARCH_002',
  INVALID_SORT = 'SEARCH_003',
  QUERY_TOO_SHORT = 'SEARCH_004',
  QUERY_TOO_LONG = 'SEARCH_005',
  INVALID_SEARCH_TYPE = 'SEARCH_006',
}

/**
 * সার্চ এরর মেসেজসমূহ (বাংলায়)
 */
export const SEARCH_ERROR_MESSAGES_BN: Record<SearchErrorCode, string> = {
  [SearchErrorCode.EMPTY_QUERY]: 'সার্চ ক্যোয়ারী খালি রাখা যাবে না',
  [SearchErrorCode.INVALID_FILTER]: 'ফিল্টার সঠিক নয়',
  [SearchErrorCode.INVALID_SORT]: 'সর্টিং অপশন সঠিক নয়',
  [SearchErrorCode.QUERY_TOO_SHORT]: `সার্চ ক্যোয়ারী ${MIN_SEARCH_QUERY_LENGTH} ক্যারেক্টারের কম হতে পারে না`,
  [SearchErrorCode.QUERY_TOO_LONG]: `সার্চ ক্যোয়ারী ${MAX_SEARCH_QUERY_LENGTH} ক্যারেক্টারের বেশি হতে পারে না`,
  [SearchErrorCode.INVALID_SEARCH_TYPE]: 'সার্চ টাইপ সঠিক নয়',
} as const;

/**
 * সার্চ এরর মেসেজসমূহ (ইংরেজিতে)
 */
export const SEARCH_ERROR_MESSAGES_EN: Record<SearchErrorCode, string> = {
  [SearchErrorCode.EMPTY_QUERY]: 'Search query cannot be empty',
  [SearchErrorCode.INVALID_FILTER]: 'Invalid filter',
  [SearchErrorCode.INVALID_SORT]: 'Invalid sort option',
  [SearchErrorCode.QUERY_TOO_SHORT]: `Search query must be at least ${MIN_SEARCH_QUERY_LENGTH} characters`,
  [SearchErrorCode.QUERY_TOO_LONG]: `Search query cannot exceed ${MAX_SEARCH_QUERY_LENGTH} characters`,
  [SearchErrorCode.INVALID_SEARCH_TYPE]: 'Invalid search type',
} as const;

/**
 * ডিসকভারি এরর কোড এনাম
 */
export enum DiscoveryErrorCode {
  RECOMMENDATION_FAILED = 'REC_001',
  TRENDING_FAILED = 'TREND_001',
  PERSONALIZATION_FAILED = 'PERS_001',
  BUNDLE_FAILED = 'BUNDLE_001',
  CROSS_SELL_FAILED = 'CROSS_001',
}

/**
 * ডিসকভারি এরর মেসেজসমূহ (বাংলায়)
 */
export const DISCOVERY_ERROR_MESSAGES_BN: Record<DiscoveryErrorCode, string> = {
  [DiscoveryErrorCode.RECOMMENDATION_FAILED]: 'রেকমেন্ডেশন তৈরি করা যায়নি',
  [DiscoveryErrorCode.TRENDING_FAILED]: 'ট্রেন্ডিং ডেটা পাওয়া যায়নি',
  [DiscoveryErrorCode.PERSONALIZATION_FAILED]: 'পার্সোনালাইজেশন সেটিংস আপডেট করা যায়নি',
  [DiscoveryErrorCode.BUNDLE_FAILED]: 'বান্ডল তৈরি করা যায়নি',
  [DiscoveryErrorCode.CROSS_SELL_FAILED]: 'ক্রস-সেল আইটেম পাওয়া যায়নি',
} as const;

/**
 * ডিসকভারি এরর মেসেজসমূহ (ইংরেজিতে)
 */
export const DISCOVERY_ERROR_MESSAGES_EN: Record<DiscoveryErrorCode, string> = {
  [DiscoveryErrorCode.RECOMMENDATION_FAILED]: 'Unable to generate recommendations',
  [DiscoveryErrorCode.TRENDING_FAILED]: 'Trending data not found',
  [DiscoveryErrorCode.PERSONALIZATION_FAILED]: 'Unable to update personalization settings',
  [DiscoveryErrorCode.BUNDLE_FAILED]: 'Unable to create bundle',
  [DiscoveryErrorCode.CROSS_SELL_FAILED]: 'Cross-sell items not found',
} as const;

// ============================================
// ৯. সার্চ-নির্দিষ্ট টাইমআউট
// ============================================

/**
 * সার্চ টাইমআউট (মিলিসেকেন্ডে)
 */
export const SEARCH_TIMEOUT_MS = 5000;

/**
 * ডিসকভারি টাইমআউট (মিলিসেকেন্ডে)
 */
export const DISCOVERY_TIMEOUT_MS = 3000;

// ============================================
// ১০. সার্চ ফিল্ডের তালিকা
// ============================================

/**
 * সার্চ ফিল্ডসমূহ (যেখানে অনুসন্ধান করা হবে)
 */
export const SEARCH_FIELDS = ['title', 'description', 'category', 'brand', 'tags'] as const;

/**
 * সার্চ ফিল্ড লেবেলসমূহ (বাংলায়)
 */
export const SEARCH_FIELD_LABELS_BN: Record<(typeof SEARCH_FIELDS)[number], string> = {
  title: 'শিরোনাম',
  description: 'বিবরণ',
  category: 'ক্যাটাগরি',
  brand: 'ব্র্যান্ড',
  tags: 'ট্যাগ',
} as const;

/**
 * সার্চ ফিল্ড লেবেলসমূহ (ইংরেজিতে)
 */
export const SEARCH_FIELD_LABELS_EN: Record<(typeof SEARCH_FIELDS)[number], string> = {
  title: 'Title',
  description: 'Description',
  category: 'Category',
  brand: 'Brand',
  tags: 'Tags',
} as const;

// ============================================
// ১১. সার্চ ক্যোয়ারী ভ্যালিডেশন
// ============================================

/**
 * সার্চ ক্যোয়ারী ভ্যালিডেশন এরর মেসেজসমূহ
 */
export const SEARCH_QUERY_VALIDATION_ERRORS = {
  EMPTY: 'সার্চ ক্যোয়ারী খালি রাখা যাবে না',
  TOO_SHORT: `সার্চ ক্যোয়ারী ${MIN_SEARCH_QUERY_LENGTH} ক্যারেক্টারের কম হতে পারে না`,
  TOO_LONG: `সার্চ ক্যোয়ারী ${MAX_SEARCH_QUERY_LENGTH} ক্যারেক্টারের বেশি হতে পারে না`,
  INVALID_CHARS: 'সার্চ ক্যোয়ারীতে অবৈধ অক্ষর রয়েছে',
} as const;

/**
 * সার্চ ক্যোয়ারী টাইপ
 */
export type SearchQuery = {
  query: string;
  type?: SearchType;
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: SortOrder;
  filters?: Record<string, unknown>;
};
