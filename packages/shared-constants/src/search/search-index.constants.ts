/**
 * Search Index Constants
 * Index configurations for search
 */

export const SEARCH_INDEX = {
  // Index Types
  TYPES: {
    PRODUCT: 'product',
    CATEGORY: 'category',
    BRAND: 'brand',
    VENDOR: 'vendor',
    USER: 'user',
    CONTENT: 'content',
    ORDER: 'order',
    DOCUMENT: 'document',
    CUSTOM: 'custom',
  } as const,

  // Index Statuses
  STATUSES: {
    CREATING: 'creating',
    CREATED: 'created',
    OPEN: 'open',
    CLOSED: 'closed',
    REINDEXING: 'reindexing',
    DELETING: 'deleting',
    DELETED: 'deleted',
    ERROR: 'error',
    PAUSED: 'paused',
    INACTIVE: 'inactive',
    ACTIVE: 'active',
  } as const,

  // Index Analyzers
  ANALYZERS: {
    STANDARD: 'standard',
    SIMPLE: 'simple',
    WHITESPACE: 'whitespace',
    STOP: 'stop',
    KEYWORD: 'keyword',
    PATTERN: 'pattern',
    LANGUAGE: 'language',
    FINGERPRINT: 'fingerprint',
    CUSTOM: 'custom',
  } as const,

  // Index Mappings
  MAPPINGS: {
    DYNAMIC: 'dynamic',
    STRICT: 'strict',
    RUNTIME: 'runtime',
    CUSTOM: 'custom',
  } as const,

  // Index Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'product',
    DEFAULT_STATUS: 'open',
    DEFAULT_ANALYZER: 'standard',
    DEFAULT_MAPPING: 'dynamic',
    DEFAULT_SHARDS: 1,
    DEFAULT_REPLICAS: 1,
    MAX_SHARDS: 5,
    MAX_REPLICAS: 3,
    DEFAULT_BATCH_SIZE: 100,
    MAX_BATCH_SIZE: 1000,
    REFRESH_INTERVAL: '1s',
    MAX_RESULT_WINDOW: 10000,
    DEFAULT_TIMEOUT: 30000,
  } as const,

  // Index Limits
  LIMITS: {
    MAX_SHARDS: 5,
    MAX_REPLICAS: 3,
    MAX_BATCH_SIZE: 1000,
    MAX_RESULT_WINDOW: 10000,
    MAX_FIELDS: 1000,
    MAX_INDEX_NAME_LENGTH: 255,
    MIN_SHARDS: 1,
    MIN_REPLICAS: 0,
    MAX_INDEX_SIZE_GB: 100,
  } as const,
} as const;

// Index Types
export type SearchIndexType = (typeof SEARCH_INDEX.TYPES)[keyof typeof SEARCH_INDEX.TYPES];

// Index Statuses
export type SearchIndexStatus = (typeof SEARCH_INDEX.STATUSES)[keyof typeof SEARCH_INDEX.STATUSES];

// Index Analyzers
export type SearchIndexAnalyzer =
  (typeof SEARCH_INDEX.ANALYZERS)[keyof typeof SEARCH_INDEX.ANALYZERS];

// Index Mappings
export type SearchIndexMapping = (typeof SEARCH_INDEX.MAPPINGS)[keyof typeof SEARCH_INDEX.MAPPINGS];

// Index Defaults
export type SearchIndexDefault = (typeof SEARCH_INDEX.DEFAULTS)[keyof typeof SEARCH_INDEX.DEFAULTS];

// Index Limits
export type SearchIndexLimit = (typeof SEARCH_INDEX.LIMITS)[keyof typeof SEARCH_INDEX.LIMITS];

// Utility Functions
export function searchIndexGetTypeLabel(type: SearchIndexType): string {
  const labels: Record<SearchIndexType, string> = {
    [SEARCH_INDEX.TYPES.PRODUCT]: 'Product',
    [SEARCH_INDEX.TYPES.CATEGORY]: 'Category',
    [SEARCH_INDEX.TYPES.BRAND]: 'Brand',
    [SEARCH_INDEX.TYPES.VENDOR]: 'Vendor',
    [SEARCH_INDEX.TYPES.USER]: 'User',
    [SEARCH_INDEX.TYPES.CONTENT]: 'Content',
    [SEARCH_INDEX.TYPES.ORDER]: 'Order',
    [SEARCH_INDEX.TYPES.DOCUMENT]: 'Document',
    [SEARCH_INDEX.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Index Type';
}

export function searchIndexGetStatusLabel(status: SearchIndexStatus): string {
  const labels: Record<SearchIndexStatus, string> = {
    [SEARCH_INDEX.STATUSES.CREATING]: 'Creating',
    [SEARCH_INDEX.STATUSES.CREATED]: 'Created',
    [SEARCH_INDEX.STATUSES.OPEN]: 'Open',
    [SEARCH_INDEX.STATUSES.CLOSED]: 'Closed',
    [SEARCH_INDEX.STATUSES.REINDEXING]: 'Reindexing',
    [SEARCH_INDEX.STATUSES.DELETING]: 'Deleting',
    [SEARCH_INDEX.STATUSES.DELETED]: 'Deleted',
    [SEARCH_INDEX.STATUSES.ERROR]: 'Error',
    [SEARCH_INDEX.STATUSES.PAUSED]: 'Paused',
    [SEARCH_INDEX.STATUSES.INACTIVE]: 'Inactive',
    [SEARCH_INDEX.STATUSES.ACTIVE]: 'Active',
  };
  return labels[status] || 'Unknown Status';
}

export function searchIndexGetAnalyzerLabel(analyzer: SearchIndexAnalyzer): string {
  const labels: Record<SearchIndexAnalyzer, string> = {
    [SEARCH_INDEX.ANALYZERS.STANDARD]: 'Standard',
    [SEARCH_INDEX.ANALYZERS.SIMPLE]: 'Simple',
    [SEARCH_INDEX.ANALYZERS.WHITESPACE]: 'Whitespace',
    [SEARCH_INDEX.ANALYZERS.STOP]: 'Stop',
    [SEARCH_INDEX.ANALYZERS.KEYWORD]: 'Keyword',
    [SEARCH_INDEX.ANALYZERS.PATTERN]: 'Pattern',
    [SEARCH_INDEX.ANALYZERS.LANGUAGE]: 'Language',
    [SEARCH_INDEX.ANALYZERS.FINGERPRINT]: 'Fingerprint',
    [SEARCH_INDEX.ANALYZERS.CUSTOM]: 'Custom',
  };
  return labels[analyzer] || 'Unknown Analyzer';
}

export function searchIndexGetMappingLabel(mapping: SearchIndexMapping): string {
  const labels: Record<SearchIndexMapping, string> = {
    [SEARCH_INDEX.MAPPINGS.DYNAMIC]: 'Dynamic',
    [SEARCH_INDEX.MAPPINGS.STRICT]: 'Strict',
    [SEARCH_INDEX.MAPPINGS.RUNTIME]: 'Runtime',
    [SEARCH_INDEX.MAPPINGS.CUSTOM]: 'Custom',
  };
  return labels[mapping] || 'Unknown Mapping';
}

export function searchIndexIsProductType(type: SearchIndexType): boolean {
  return type === SEARCH_INDEX.TYPES.PRODUCT;
}

export function searchIndexIsContentType(type: SearchIndexType): boolean {
  return type === SEARCH_INDEX.TYPES.CONTENT;
}

export function searchIndexIsOpen(status: SearchIndexStatus): boolean {
  return status === SEARCH_INDEX.STATUSES.OPEN;
}

export function searchIndexIsActive(status: SearchIndexStatus): boolean {
  const activeStatuses: SearchIndexStatus[] = [
    SEARCH_INDEX.STATUSES.OPEN,
    SEARCH_INDEX.STATUSES.ACTIVE,
    SEARCH_INDEX.STATUSES.CREATED,
  ];
  return activeStatuses.includes(status);
}

export function searchIndexIsError(status: SearchIndexStatus): boolean {
  return status === SEARCH_INDEX.STATUSES.ERROR;
}

export function searchIndexGetDefaultShards(): number {
  return SEARCH_INDEX.DEFAULTS.DEFAULT_SHARDS;
}

export function searchIndexGetDefaultReplicas(): number {
  return SEARCH_INDEX.DEFAULTS.DEFAULT_REPLICAS;
}

export function searchIndexGetDefaultBatchSize(): number {
  return SEARCH_INDEX.DEFAULTS.DEFAULT_BATCH_SIZE;
}

export function searchIndexGetMaxShards(): number {
  return SEARCH_INDEX.DEFAULTS.MAX_SHARDS;
}
