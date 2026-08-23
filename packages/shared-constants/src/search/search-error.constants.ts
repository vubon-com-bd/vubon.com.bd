/**
 * Search Error Constants
 * Error definitions for search
 */

export const SEARCH_ERROR = {
  // Error Types
  TYPES: {
    QUERY: 'query_error',
    INDEX: 'index_error',
    ANALYZER: 'analyzer_error',
    SYNTAX: 'syntax_error',
    TIMEOUT: 'timeout_error',
    RATE_LIMIT: 'rate_limit_error',
    PERMISSION: 'permission_error',
    VALIDATION: 'validation_error',
    SYSTEM: 'system_error',
    NETWORK: 'network_error',
    CUSTOM: 'custom_error',
  } as const,

  // Error Codes
  CODES: {
    QUERY_TOO_SHORT: 'SEARCH_001',
    QUERY_TOO_LONG: 'SEARCH_002',
    INVALID_QUERY: 'SEARCH_003',
    INDEX_NOT_FOUND: 'SEARCH_004',
    FIELD_NOT_FOUND: 'SEARCH_005',
    ANALYZER_ERROR: 'SEARCH_006',
    TIMEOUT: 'SEARCH_007',
    RATE_LIMIT: 'SEARCH_008',
    PERMISSION_DENIED: 'SEARCH_009',
    INVALID_SORT: 'SEARCH_010',
    INVALID_FILTER: 'SEARCH_011',
    INVALID_FACET: 'SEARCH_012',
    SYNTAX_ERROR: 'SEARCH_013',
    INDEX_ERROR: 'SEARCH_014',
    SYSTEM_ERROR: 'SEARCH_015',
    NETWORK_ERROR: 'SEARCH_016',
    VALIDATION_ERROR: 'SEARCH_017',
  } as const,

  // Error Severities
  SEVERITIES: {
    CRITICAL: 'critical',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    DEBUG: 'debug',
  } as const,

  // Error Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'system_error',
    DEFAULT_SEVERITY: 'error',
    DEFAULT_CODE: 'SEARCH_015',
    MAX_RETRY_ATTEMPTS: 3,
    RETRY_DELAY_MS: 1000,
    CACHE_ERRORS: true,
    ERROR_TTL: 300,
  } as const,
} as const;

// Error Types
export type SearchErrorType = (typeof SEARCH_ERROR.TYPES)[keyof typeof SEARCH_ERROR.TYPES];

// Error Codes
export type SearchErrorCode = (typeof SEARCH_ERROR.CODES)[keyof typeof SEARCH_ERROR.CODES];

// Error Severities
export type SearchErrorSeverity =
  (typeof SEARCH_ERROR.SEVERITIES)[keyof typeof SEARCH_ERROR.SEVERITIES];

// Error Defaults
export type SearchErrorDefault = (typeof SEARCH_ERROR.DEFAULTS)[keyof typeof SEARCH_ERROR.DEFAULTS];

// Utility Functions
export function searchErrorGetTypeLabel(type: SearchErrorType): string {
  const labels: Record<SearchErrorType, string> = {
    [SEARCH_ERROR.TYPES.QUERY]: 'Query Error',
    [SEARCH_ERROR.TYPES.INDEX]: 'Index Error',
    [SEARCH_ERROR.TYPES.ANALYZER]: 'Analyzer Error',
    [SEARCH_ERROR.TYPES.SYNTAX]: 'Syntax Error',
    [SEARCH_ERROR.TYPES.TIMEOUT]: 'Timeout Error',
    [SEARCH_ERROR.TYPES.RATE_LIMIT]: 'Rate Limit Error',
    [SEARCH_ERROR.TYPES.PERMISSION]: 'Permission Error',
    [SEARCH_ERROR.TYPES.VALIDATION]: 'Validation Error',
    [SEARCH_ERROR.TYPES.SYSTEM]: 'System Error',
    [SEARCH_ERROR.TYPES.NETWORK]: 'Network Error',
    [SEARCH_ERROR.TYPES.CUSTOM]: 'Custom Error',
  };
  return labels[type] || 'Unknown Error Type';
}

export function searchErrorGetCodeLabel(code: SearchErrorCode): string {
  const labels: Record<SearchErrorCode, string> = {
    [SEARCH_ERROR.CODES.QUERY_TOO_SHORT]: 'Query Too Short',
    [SEARCH_ERROR.CODES.QUERY_TOO_LONG]: 'Query Too Long',
    [SEARCH_ERROR.CODES.INVALID_QUERY]: 'Invalid Query',
    [SEARCH_ERROR.CODES.INDEX_NOT_FOUND]: 'Index Not Found',
    [SEARCH_ERROR.CODES.FIELD_NOT_FOUND]: 'Field Not Found',
    [SEARCH_ERROR.CODES.ANALYZER_ERROR]: 'Analyzer Error',
    [SEARCH_ERROR.CODES.TIMEOUT]: 'Timeout',
    [SEARCH_ERROR.CODES.RATE_LIMIT]: 'Rate Limit Exceeded',
    [SEARCH_ERROR.CODES.PERMISSION_DENIED]: 'Permission Denied',
    [SEARCH_ERROR.CODES.INVALID_SORT]: 'Invalid Sort',
    [SEARCH_ERROR.CODES.INVALID_FILTER]: 'Invalid Filter',
    [SEARCH_ERROR.CODES.INVALID_FACET]: 'Invalid Facet',
    [SEARCH_ERROR.CODES.SYNTAX_ERROR]: 'Syntax Error',
    [SEARCH_ERROR.CODES.INDEX_ERROR]: 'Index Error',
    [SEARCH_ERROR.CODES.SYSTEM_ERROR]: 'System Error',
    [SEARCH_ERROR.CODES.NETWORK_ERROR]: 'Network Error',
    [SEARCH_ERROR.CODES.VALIDATION_ERROR]: 'Validation Error',
  };
  return labels[code] || 'Unknown Error Code';
}

export function searchErrorGetSeverityLabel(severity: SearchErrorSeverity): string {
  const labels: Record<SearchErrorSeverity, string> = {
    [SEARCH_ERROR.SEVERITIES.CRITICAL]: 'Critical',
    [SEARCH_ERROR.SEVERITIES.ERROR]: 'Error',
    [SEARCH_ERROR.SEVERITIES.WARNING]: 'Warning',
    [SEARCH_ERROR.SEVERITIES.INFO]: 'Info',
    [SEARCH_ERROR.SEVERITIES.DEBUG]: 'Debug',
  };
  return labels[severity] || 'Unknown Severity';
}

export function searchErrorIsQueryType(type: SearchErrorType): boolean {
  const queryTypes: SearchErrorType[] = [
    SEARCH_ERROR.TYPES.QUERY,
    SEARCH_ERROR.TYPES.SYNTAX,
    SEARCH_ERROR.TYPES.VALIDATION,
  ];
  return queryTypes.includes(type);
}

export function searchErrorIsSystemType(type: SearchErrorType): boolean {
  const systemTypes: SearchErrorType[] = [
    SEARCH_ERROR.TYPES.INDEX,
    SEARCH_ERROR.TYPES.ANALYZER,
    SEARCH_ERROR.TYPES.SYSTEM,
    SEARCH_ERROR.TYPES.NETWORK,
  ];
  return systemTypes.includes(type);
}

export function searchErrorIsPermissionType(type: SearchErrorType): boolean {
  return type === SEARCH_ERROR.TYPES.PERMISSION;
}

export function searchErrorIsRateLimitType(type: SearchErrorType): boolean {
  return type === SEARCH_ERROR.TYPES.RATE_LIMIT;
}

export function searchErrorIsTimeoutType(type: SearchErrorType): boolean {
  return type === SEARCH_ERROR.TYPES.TIMEOUT;
}

export function searchErrorGetDefaultType(): SearchErrorType {
  return SEARCH_ERROR.DEFAULTS.DEFAULT_TYPE;
}

export function searchErrorGetDefaultSeverity(): SearchErrorSeverity {
  return SEARCH_ERROR.DEFAULTS.DEFAULT_SEVERITY;
}

export function searchErrorGetMaxRetryAttempts(): number {
  return SEARCH_ERROR.DEFAULTS.MAX_RETRY_ATTEMPTS;
}

export function searchErrorGetRetryDelayMs(): number {
  return SEARCH_ERROR.DEFAULTS.RETRY_DELAY_MS;
}

export function searchErrorShouldCacheErrors(): boolean {
  return SEARCH_ERROR.DEFAULTS.CACHE_ERRORS;
}
