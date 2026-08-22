/**
 * AI Search Type Constants
 * Types and classifications for AI search
 */

export const AI_SEARCH_TYPE = {
  // Search Categories
  CATEGORIES: {
    PRODUCT: 'product',
    CONTENT: 'content',
    USER: 'user',
    ORDER: 'order',
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
    REVIEW: 'review',
    BLOG: 'blog',
    DOCUMENT: 'document',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
  } as const,

  // Search Sub-Types
  SUB_TYPES: {
    // Product Search
    PRODUCT_NAME: 'product_name',
    PRODUCT_DESCRIPTION: 'product_description',
    PRODUCT_SKU: 'product_sku',
    PRODUCT_CATEGORY: 'product_category',
    PRODUCT_BRAND: 'product_brand',

    // Content Search
    TITLE: 'title',
    BODY: 'body',
    TAGS: 'tags',
    META: 'meta',

    // User Search
    USERNAME: 'username',
    EMAIL: 'email',
    PHONE: 'phone',
    FULL_NAME: 'full_name',

    // Order Search
    ORDER_ID: 'order_id',
    ORDER_STATUS: 'order_status',
    ORDER_DATE: 'order_date',

    // Location Search
    ADDRESS: 'address',
    CITY: 'city',
    STATE: 'state',
    COUNTRY: 'country',
    ZIP_CODE: 'zip_code',

    // Time Search
    DATE: 'date',
    TIME: 'time',
    DATE_RANGE: 'date_range',
    TIME_RANGE: 'time_range',
  } as const,

  // Search Sources
  SOURCES: {
    DATABASE: 'database',
    ELASTICSEARCH: 'elasticsearch',
    VECTOR_DB: 'vector_db',
    CACHE: 'cache',
    EXTERNAL: 'external',
    HYBRID: 'hybrid',
  } as const,

  // Search Modes
  MODES: {
    EXACT: 'exact',
    PARTIAL: 'partial',
    FUZZY: 'fuzzy',
    PHRASE: 'phrase',
    PREFIX: 'prefix',
    SUFFIX: 'suffix',
    WILDCARD: 'wildcard',
    REGEX: 'regex',
  } as const,

  // Search Operators
  OPERATORS: {
    AND: 'and',
    OR: 'or',
    NOT: 'not',
    PLUS: 'plus',
    MINUS: 'minus',
    QUOTE: 'quote',
    PARENTHESIS: 'parenthesis',
    BRACKET: 'bracket',
  } as const,

  // Search Scopes
  SCOPES: {
    GLOBAL: 'global',
    CATEGORY: 'category',
    BRAND: 'brand',
    STORE: 'store',
    USER: 'user',
    SESSION: 'session',
    DEVICE: 'device',
  } as const,
} as const;

// Search Categories
export type AISearchCategory =
  (typeof AI_SEARCH_TYPE.CATEGORIES)[keyof typeof AI_SEARCH_TYPE.CATEGORIES];

// Search Sub-Types
export type AISearchSubType =
  (typeof AI_SEARCH_TYPE.SUB_TYPES)[keyof typeof AI_SEARCH_TYPE.SUB_TYPES];

// Search Sources
export type AISearchSource = (typeof AI_SEARCH_TYPE.SOURCES)[keyof typeof AI_SEARCH_TYPE.SOURCES];

// Search Modes
export type AISearchModeType = (typeof AI_SEARCH_TYPE.MODES)[keyof typeof AI_SEARCH_TYPE.MODES];

// Search Operators
export type AISearchOperator =
  (typeof AI_SEARCH_TYPE.OPERATORS)[keyof typeof AI_SEARCH_TYPE.OPERATORS];

// Search Scopes
export type AISearchScope = (typeof AI_SEARCH_TYPE.SCOPES)[keyof typeof AI_SEARCH_TYPE.SCOPES];

// Utility Functions
export function getSearchCategoryLabel(category: AISearchCategory): string {
  const labels: Record<AISearchCategory, string> = {
    [AI_SEARCH_TYPE.CATEGORIES.PRODUCT]: 'Product',
    [AI_SEARCH_TYPE.CATEGORIES.CONTENT]: 'Content',
    [AI_SEARCH_TYPE.CATEGORIES.USER]: 'User',
    [AI_SEARCH_TYPE.CATEGORIES.ORDER]: 'Order',
    [AI_SEARCH_TYPE.CATEGORIES.CATEGORY]: 'Category',
    [AI_SEARCH_TYPE.CATEGORIES.BRAND]: 'Brand',
    [AI_SEARCH_TYPE.CATEGORIES.VENDOR]: 'Vendor',
    [AI_SEARCH_TYPE.CATEGORIES.REVIEW]: 'Review',
    [AI_SEARCH_TYPE.CATEGORIES.BLOG]: 'Blog',
    [AI_SEARCH_TYPE.CATEGORIES.DOCUMENT]: 'Document',
    [AI_SEARCH_TYPE.CATEGORIES.IMAGE]: 'Image',
    [AI_SEARCH_TYPE.CATEGORIES.VIDEO]: 'Video',
    [AI_SEARCH_TYPE.CATEGORIES.AUDIO]: 'Audio',
  };
  return labels[category] || 'Unknown';
}

export function getSearchSubTypeLabel(subType: AISearchSubType): string {
  const labels: Record<AISearchSubType, string> = {
    [AI_SEARCH_TYPE.SUB_TYPES.PRODUCT_NAME]: 'Product Name',
    [AI_SEARCH_TYPE.SUB_TYPES.PRODUCT_DESCRIPTION]: 'Product Description',
    [AI_SEARCH_TYPE.SUB_TYPES.PRODUCT_SKU]: 'Product SKU',
    [AI_SEARCH_TYPE.SUB_TYPES.PRODUCT_CATEGORY]: 'Product Category',
    [AI_SEARCH_TYPE.SUB_TYPES.PRODUCT_BRAND]: 'Product Brand',
    [AI_SEARCH_TYPE.SUB_TYPES.TITLE]: 'Title',
    [AI_SEARCH_TYPE.SUB_TYPES.BODY]: 'Body',
    [AI_SEARCH_TYPE.SUB_TYPES.TAGS]: 'Tags',
    [AI_SEARCH_TYPE.SUB_TYPES.META]: 'Meta',
    [AI_SEARCH_TYPE.SUB_TYPES.USERNAME]: 'Username',
    [AI_SEARCH_TYPE.SUB_TYPES.EMAIL]: 'Email',
    [AI_SEARCH_TYPE.SUB_TYPES.PHONE]: 'Phone',
    [AI_SEARCH_TYPE.SUB_TYPES.FULL_NAME]: 'Full Name',
    [AI_SEARCH_TYPE.SUB_TYPES.ORDER_ID]: 'Order ID',
    [AI_SEARCH_TYPE.SUB_TYPES.ORDER_STATUS]: 'Order Status',
    [AI_SEARCH_TYPE.SUB_TYPES.ORDER_DATE]: 'Order Date',
    [AI_SEARCH_TYPE.SUB_TYPES.ADDRESS]: 'Address',
    [AI_SEARCH_TYPE.SUB_TYPES.CITY]: 'City',
    [AI_SEARCH_TYPE.SUB_TYPES.STATE]: 'State',
    [AI_SEARCH_TYPE.SUB_TYPES.COUNTRY]: 'Country',
    [AI_SEARCH_TYPE.SUB_TYPES.ZIP_CODE]: 'Zip Code',
    [AI_SEARCH_TYPE.SUB_TYPES.DATE]: 'Date',
    [AI_SEARCH_TYPE.SUB_TYPES.TIME]: 'Time',
    [AI_SEARCH_TYPE.SUB_TYPES.DATE_RANGE]: 'Date Range',
    [AI_SEARCH_TYPE.SUB_TYPES.TIME_RANGE]: 'Time Range',
  };
  return labels[subType] || 'Unknown';
}

export function getSearchSourceLabel(source: AISearchSource): string {
  const labels: Record<AISearchSource, string> = {
    [AI_SEARCH_TYPE.SOURCES.DATABASE]: 'Database',
    [AI_SEARCH_TYPE.SOURCES.ELASTICSEARCH]: 'Elasticsearch',
    [AI_SEARCH_TYPE.SOURCES.VECTOR_DB]: 'Vector DB',
    [AI_SEARCH_TYPE.SOURCES.CACHE]: 'Cache',
    [AI_SEARCH_TYPE.SOURCES.EXTERNAL]: 'External',
    [AI_SEARCH_TYPE.SOURCES.HYBRID]: 'Hybrid',
  };
  return labels[source] || 'Unknown';
}

export function getSearchModeTypeLabel(mode: AISearchModeType): string {
  const labels: Record<AISearchModeType, string> = {
    [AI_SEARCH_TYPE.MODES.EXACT]: 'Exact',
    [AI_SEARCH_TYPE.MODES.PARTIAL]: 'Partial',
    [AI_SEARCH_TYPE.MODES.FUZZY]: 'Fuzzy',
    [AI_SEARCH_TYPE.MODES.PHRASE]: 'Phrase',
    [AI_SEARCH_TYPE.MODES.PREFIX]: 'Prefix',
    [AI_SEARCH_TYPE.MODES.SUFFIX]: 'Suffix',
    [AI_SEARCH_TYPE.MODES.WILDCARD]: 'Wildcard',
    [AI_SEARCH_TYPE.MODES.REGEX]: 'Regex',
  };
  return labels[mode] || 'Unknown';
}

export function getSearchOperatorLabel(operator: AISearchOperator): string {
  const labels: Record<AISearchOperator, string> = {
    [AI_SEARCH_TYPE.OPERATORS.AND]: 'AND',
    [AI_SEARCH_TYPE.OPERATORS.OR]: 'OR',
    [AI_SEARCH_TYPE.OPERATORS.NOT]: 'NOT',
    [AI_SEARCH_TYPE.OPERATORS.PLUS]: 'Plus (+)',
    [AI_SEARCH_TYPE.OPERATORS.MINUS]: 'Minus (-)',
    [AI_SEARCH_TYPE.OPERATORS.QUOTE]: 'Quote (")',
    [AI_SEARCH_TYPE.OPERATORS.PARENTHESIS]: 'Parenthesis ()',
    [AI_SEARCH_TYPE.OPERATORS.BRACKET]: 'Bracket []',
  };
  return labels[operator] || 'Unknown';
}

export function getSearchScopeLabel(scope: AISearchScope): string {
  const labels: Record<AISearchScope, string> = {
    [AI_SEARCH_TYPE.SCOPES.GLOBAL]: 'Global',
    [AI_SEARCH_TYPE.SCOPES.CATEGORY]: 'Category',
    [AI_SEARCH_TYPE.SCOPES.BRAND]: 'Brand',
    [AI_SEARCH_TYPE.SCOPES.STORE]: 'Store',
    [AI_SEARCH_TYPE.SCOPES.USER]: 'User',
    [AI_SEARCH_TYPE.SCOPES.SESSION]: 'Session',
    [AI_SEARCH_TYPE.SCOPES.DEVICE]: 'Device',
  };
  return labels[scope] || 'Unknown';
}
