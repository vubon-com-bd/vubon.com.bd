/**
 * Analytics Error Constants
 * Error types and codes for analytics system
 */

export const ANALYTICS_ERROR = {
  // Error Types
  TYPES: {
    // System Errors
    SYSTEM_ERROR: 'system_error',
    INTERNAL_ERROR: 'internal_error',
    CONNECTION_ERROR: 'connection_error',
    TIMEOUT_ERROR: 'timeout_error',
    RESOURCE_ERROR: 'resource_error',

    // Data Errors
    DATA_ERROR: 'data_error',
    DATA_NOT_FOUND: 'data_not_found',
    DATA_CORRUPTED: 'data_corrupted',
    DATA_INCOMPLETE: 'data_incomplete',
    DATA_OUTDATED: 'data_outdated',
    DATA_STALE: 'data_stale',

    // Query Errors
    QUERY_ERROR: 'query_error',
    INVALID_QUERY: 'invalid_query',
    QUERY_TIMEOUT: 'query_timeout',
    QUERY_TOO_COMPLEX: 'query_too_complex',

    // Processing Errors
    PROCESSING_ERROR: 'processing_error',
    AGGREGATION_ERROR: 'aggregation_error',
    CALCULATION_ERROR: 'calculation_error',
    TRANSFORMATION_ERROR: 'transformation_error',

    // Validation Errors
    VALIDATION_ERROR: 'validation_error',
    INVALID_PARAMETER: 'invalid_parameter',
    MISSING_PARAMETER: 'missing_parameter',
    INVALID_FORMAT: 'invalid_format',

    // Permission Errors
    PERMISSION_ERROR: 'permission_error',
    UNAUTHORIZED: 'unauthorized',
    FORBIDDEN: 'forbidden',
    ACCESS_DENIED: 'access_denied',

    // Integration Errors
    INTEGRATION_ERROR: 'integration_error',
    THIRD_PARTY_ERROR: 'third_party_error',
    API_ERROR: 'api_error',

    // Configuration Errors
    CONFIG_ERROR: 'config_error',
    MISSING_CONFIG: 'missing_config',
    INVALID_CONFIG: 'invalid_config',
  } as const,

  // Error Codes
  CODES: {
    // 1xxx: System Errors
    SYS_1000: 'SYS_1000',
    SYS_1001: 'SYS_1001',
    SYS_1002: 'SYS_1002',
    SYS_1003: 'SYS_1003',
    SYS_1004: 'SYS_1004',

    // 2xxx: Data Errors
    DAT_2000: 'DAT_2000',
    DAT_2001: 'DAT_2001',
    DAT_2002: 'DAT_2002',
    DAT_2003: 'DAT_2003',
    DAT_2004: 'DAT_2004',
    DAT_2005: 'DAT_2005',

    // 3xxx: Query Errors
    QRY_3000: 'QRY_3000',
    QRY_3001: 'QRY_3001',
    QRY_3002: 'QRY_3002',
    QRY_3003: 'QRY_3003',

    // 4xxx: Processing Errors
    PRC_4000: 'PRC_4000',
    PRC_4001: 'PRC_4001',
    PRC_4002: 'PRC_4002',
    PRC_4003: 'PRC_4003',

    // 5xxx: Validation Errors
    VAL_5000: 'VAL_5000',
    VAL_5001: 'VAL_5001',
    VAL_5002: 'VAL_5002',
    VAL_5003: 'VAL_5003',

    // 6xxx: Permission Errors
    PER_6000: 'PER_6000',
    PER_6001: 'PER_6001',
    PER_6002: 'PER_6002',
    PER_6003: 'PER_6003',

    // 7xxx: Integration Errors
    INT_7000: 'INT_7000',
    INT_7001: 'INT_7001',
    INT_7002: 'INT_7002',

    // 8xxx: Configuration Errors
    CFG_8000: 'CFG_8000',
    CFG_8001: 'CFG_8001',
    CFG_8002: 'CFG_8002',
  } as const,

  // Error Severity
  SEVERITY: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Error Categories
  CATEGORIES: {
    SYSTEM: 'system',
    DATA: 'data',
    QUERY: 'query',
    PROCESSING: 'processing',
    VALIDATION: 'validation',
    PERMISSION: 'permission',
    INTEGRATION: 'integration',
    CONFIG: 'config',
  } as const,

  // Error Actions
  ACTIONS: {
    RETRY: 'retry',
    RETRY_LATER: 'retry_later',
    CANCEL: 'cancel',
    UPDATE: 'update',
    CONTACT_SUPPORT: 'contact_support',
    CHECK_CONFIG: 'check_config',
    VALIDATE_INPUT: 'validate_input',
  } as const,

  // Error Sources
  SOURCES: {
    SYSTEM: 'system',
    DATABASE: 'database',
    API: 'api',
    THIRD_PARTY: 'third_party',
    USER: 'user',
    CONFIG: 'config',
  } as const,
} as const;

// Analytics Error Types
export type AnalyticsErrorType = (typeof ANALYTICS_ERROR.TYPES)[keyof typeof ANALYTICS_ERROR.TYPES];

// Analytics Error Codes
export type AnalyticsErrorCode = (typeof ANALYTICS_ERROR.CODES)[keyof typeof ANALYTICS_ERROR.CODES];

// Analytics Error Severity
export type AnalyticsErrorSeverity =
  (typeof ANALYTICS_ERROR.SEVERITY)[keyof typeof ANALYTICS_ERROR.SEVERITY];

// Analytics Error Categories
export type AnalyticsErrorCategory =
  (typeof ANALYTICS_ERROR.CATEGORIES)[keyof typeof ANALYTICS_ERROR.CATEGORIES];

// Analytics Error Actions
export type AnalyticsErrorAction =
  (typeof ANALYTICS_ERROR.ACTIONS)[keyof typeof ANALYTICS_ERROR.ACTIONS];

// Analytics Error Sources
export type AnalyticsErrorSource =
  (typeof ANALYTICS_ERROR.SOURCES)[keyof typeof ANALYTICS_ERROR.SOURCES];

// Analytics Error Labels
export function getAnalyticsErrorLabel(error: AnalyticsErrorType): string {
  const labels: Record<AnalyticsErrorType, string> = {
    [ANALYTICS_ERROR.TYPES.SYSTEM_ERROR]: 'System Error',
    [ANALYTICS_ERROR.TYPES.INTERNAL_ERROR]: 'Internal Error',
    [ANALYTICS_ERROR.TYPES.CONNECTION_ERROR]: 'Connection Error',
    [ANALYTICS_ERROR.TYPES.TIMEOUT_ERROR]: 'Timeout Error',
    [ANALYTICS_ERROR.TYPES.RESOURCE_ERROR]: 'Resource Error',
    [ANALYTICS_ERROR.TYPES.DATA_ERROR]: 'Data Error',
    [ANALYTICS_ERROR.TYPES.DATA_NOT_FOUND]: 'Data Not Found',
    [ANALYTICS_ERROR.TYPES.DATA_CORRUPTED]: 'Data Corrupted',
    [ANALYTICS_ERROR.TYPES.DATA_INCOMPLETE]: 'Data Incomplete',
    [ANALYTICS_ERROR.TYPES.DATA_OUTDATED]: 'Data Outdated',
    [ANALYTICS_ERROR.TYPES.DATA_STALE]: 'Data Stale',
    [ANALYTICS_ERROR.TYPES.QUERY_ERROR]: 'Query Error',
    [ANALYTICS_ERROR.TYPES.INVALID_QUERY]: 'Invalid Query',
    [ANALYTICS_ERROR.TYPES.QUERY_TIMEOUT]: 'Query Timeout',
    [ANALYTICS_ERROR.TYPES.QUERY_TOO_COMPLEX]: 'Query Too Complex',
    [ANALYTICS_ERROR.TYPES.PROCESSING_ERROR]: 'Processing Error',
    [ANALYTICS_ERROR.TYPES.AGGREGATION_ERROR]: 'Aggregation Error',
    [ANALYTICS_ERROR.TYPES.CALCULATION_ERROR]: 'Calculation Error',
    [ANALYTICS_ERROR.TYPES.TRANSFORMATION_ERROR]: 'Transformation Error',
    [ANALYTICS_ERROR.TYPES.VALIDATION_ERROR]: 'Validation Error',
    [ANALYTICS_ERROR.TYPES.INVALID_PARAMETER]: 'Invalid Parameter',
    [ANALYTICS_ERROR.TYPES.MISSING_PARAMETER]: 'Missing Parameter',
    [ANALYTICS_ERROR.TYPES.INVALID_FORMAT]: 'Invalid Format',
    [ANALYTICS_ERROR.TYPES.PERMISSION_ERROR]: 'Permission Error',
    [ANALYTICS_ERROR.TYPES.UNAUTHORIZED]: 'Unauthorized',
    [ANALYTICS_ERROR.TYPES.FORBIDDEN]: 'Forbidden',
    [ANALYTICS_ERROR.TYPES.ACCESS_DENIED]: 'Access Denied',
    [ANALYTICS_ERROR.TYPES.INTEGRATION_ERROR]: 'Integration Error',
    [ANALYTICS_ERROR.TYPES.THIRD_PARTY_ERROR]: 'Third Party Error',
    [ANALYTICS_ERROR.TYPES.API_ERROR]: 'API Error',
    [ANALYTICS_ERROR.TYPES.CONFIG_ERROR]: 'Configuration Error',
    [ANALYTICS_ERROR.TYPES.MISSING_CONFIG]: 'Missing Configuration',
    [ANALYTICS_ERROR.TYPES.INVALID_CONFIG]: 'Invalid Configuration',
  };
  return labels[error] || 'Unknown Error';
}

// Analytics Error Code Labels
export function getAnalyticsErrorCodeLabel(code: AnalyticsErrorCode): string {
  const labels: Record<AnalyticsErrorCode, string> = {
    [ANALYTICS_ERROR.CODES.SYS_1000]: 'System Error',
    [ANALYTICS_ERROR.CODES.SYS_1001]: 'Internal Error',
    [ANALYTICS_ERROR.CODES.SYS_1002]: 'Connection Error',
    [ANALYTICS_ERROR.CODES.SYS_1003]: 'Timeout Error',
    [ANALYTICS_ERROR.CODES.SYS_1004]: 'Resource Error',
    [ANALYTICS_ERROR.CODES.DAT_2000]: 'Data Error',
    [ANALYTICS_ERROR.CODES.DAT_2001]: 'Data Not Found',
    [ANALYTICS_ERROR.CODES.DAT_2002]: 'Data Corrupted',
    [ANALYTICS_ERROR.CODES.DAT_2003]: 'Data Incomplete',
    [ANALYTICS_ERROR.CODES.DAT_2004]: 'Data Outdated',
    [ANALYTICS_ERROR.CODES.DAT_2005]: 'Data Stale',
    [ANALYTICS_ERROR.CODES.QRY_3000]: 'Query Error',
    [ANALYTICS_ERROR.CODES.QRY_3001]: 'Invalid Query',
    [ANALYTICS_ERROR.CODES.QRY_3002]: 'Query Timeout',
    [ANALYTICS_ERROR.CODES.QRY_3003]: 'Query Too Complex',
    [ANALYTICS_ERROR.CODES.PRC_4000]: 'Processing Error',
    [ANALYTICS_ERROR.CODES.PRC_4001]: 'Aggregation Error',
    [ANALYTICS_ERROR.CODES.PRC_4002]: 'Calculation Error',
    [ANALYTICS_ERROR.CODES.PRC_4003]: 'Transformation Error',
    [ANALYTICS_ERROR.CODES.VAL_5000]: 'Validation Error',
    [ANALYTICS_ERROR.CODES.VAL_5001]: 'Invalid Parameter',
    [ANALYTICS_ERROR.CODES.VAL_5002]: 'Missing Parameter',
    [ANALYTICS_ERROR.CODES.VAL_5003]: 'Invalid Format',
    [ANALYTICS_ERROR.CODES.PER_6000]: 'Permission Error',
    [ANALYTICS_ERROR.CODES.PER_6001]: 'Unauthorized',
    [ANALYTICS_ERROR.CODES.PER_6002]: 'Forbidden',
    [ANALYTICS_ERROR.CODES.PER_6003]: 'Access Denied',
    [ANALYTICS_ERROR.CODES.INT_7000]: 'Integration Error',
    [ANALYTICS_ERROR.CODES.INT_7001]: 'Third Party Error',
    [ANALYTICS_ERROR.CODES.INT_7002]: 'API Error',
    [ANALYTICS_ERROR.CODES.CFG_8000]: 'Configuration Error',
    [ANALYTICS_ERROR.CODES.CFG_8001]: 'Missing Configuration',
    [ANALYTICS_ERROR.CODES.CFG_8002]: 'Invalid Configuration',
  };
  return labels[code] || 'Unknown Code';
}

// Analytics Error Severity Labels
export function getAnalyticsErrorSeverityLabel(severity: AnalyticsErrorSeverity): string {
  const labels: Record<AnalyticsErrorSeverity, string> = {
    [ANALYTICS_ERROR.SEVERITY.CRITICAL]: 'Critical',
    [ANALYTICS_ERROR.SEVERITY.HIGH]: 'High',
    [ANALYTICS_ERROR.SEVERITY.MEDIUM]: 'Medium',
    [ANALYTICS_ERROR.SEVERITY.LOW]: 'Low',
  };
  return labels[severity] || 'Unknown';
}

// Analytics Error Category Labels
export function getAnalyticsErrorCategoryLabel(category: AnalyticsErrorCategory): string {
  const labels: Record<AnalyticsErrorCategory, string> = {
    [ANALYTICS_ERROR.CATEGORIES.SYSTEM]: 'System',
    [ANALYTICS_ERROR.CATEGORIES.DATA]: 'Data',
    [ANALYTICS_ERROR.CATEGORIES.QUERY]: 'Query',
    [ANALYTICS_ERROR.CATEGORIES.PROCESSING]: 'Processing',
    [ANALYTICS_ERROR.CATEGORIES.VALIDATION]: 'Validation',
    [ANALYTICS_ERROR.CATEGORIES.PERMISSION]: 'Permission',
    [ANALYTICS_ERROR.CATEGORIES.INTEGRATION]: 'Integration',
    [ANALYTICS_ERROR.CATEGORIES.CONFIG]: 'Configuration',
  };
  return labels[category] || 'Unknown';
}

// Analytics Error Action Labels
export function getAnalyticsErrorActionLabel(action: AnalyticsErrorAction): string {
  const labels: Record<AnalyticsErrorAction, string> = {
    [ANALYTICS_ERROR.ACTIONS.RETRY]: 'Retry',
    [ANALYTICS_ERROR.ACTIONS.RETRY_LATER]: 'Retry Later',
    [ANALYTICS_ERROR.ACTIONS.CANCEL]: 'Cancel',
    [ANALYTICS_ERROR.ACTIONS.UPDATE]: 'Update',
    [ANALYTICS_ERROR.ACTIONS.CONTACT_SUPPORT]: 'Contact Support',
    [ANALYTICS_ERROR.ACTIONS.CHECK_CONFIG]: 'Check Configuration',
    [ANALYTICS_ERROR.ACTIONS.VALIDATE_INPUT]: 'Validate Input',
  };
  return labels[action] || 'Unknown';
}

// Analytics Error Source Labels
export function getAnalyticsErrorSourceLabel(source: AnalyticsErrorSource): string {
  const labels: Record<AnalyticsErrorSource, string> = {
    [ANALYTICS_ERROR.SOURCES.SYSTEM]: 'System',
    [ANALYTICS_ERROR.SOURCES.DATABASE]: 'Database',
    [ANALYTICS_ERROR.SOURCES.API]: 'API',
    [ANALYTICS_ERROR.SOURCES.THIRD_PARTY]: 'Third Party',
    [ANALYTICS_ERROR.SOURCES.USER]: 'User',
    [ANALYTICS_ERROR.SOURCES.CONFIG]: 'Configuration',
  };
  return labels[source] || 'Unknown';
}

// Get error category from error type
export function getAnalyticsErrorCategory(errorType: AnalyticsErrorType): AnalyticsErrorCategory {
  if (
    errorType.includes('system') ||
    errorType.includes('internal') ||
    errorType.includes('connection') ||
    errorType.includes('timeout') ||
    errorType.includes('resource')
  ) {
    return ANALYTICS_ERROR.CATEGORIES.SYSTEM;
  }

  if (errorType.includes('data')) return ANALYTICS_ERROR.CATEGORIES.DATA;
  if (errorType.includes('query')) return ANALYTICS_ERROR.CATEGORIES.QUERY;
  if (
    errorType.includes('processing') ||
    errorType.includes('aggregation') ||
    errorType.includes('calculation') ||
    errorType.includes('transformation')
  ) {
    return ANALYTICS_ERROR.CATEGORIES.PROCESSING;
  }

  if (
    errorType.includes('validation') ||
    errorType.includes('parameter') ||
    errorType.includes('format')
  ) {
    return ANALYTICS_ERROR.CATEGORIES.VALIDATION;
  }

  if (
    errorType.includes('permission') ||
    errorType.includes('authorized') ||
    errorType.includes('forbidden') ||
    errorType.includes('access')
  ) {
    return ANALYTICS_ERROR.CATEGORIES.PERMISSION;
  }

  if (
    errorType.includes('integration') ||
    errorType.includes('third_party') ||
    errorType.includes('api')
  ) {
    return ANALYTICS_ERROR.CATEGORIES.INTEGRATION;
  }

  if (errorType.includes('config')) return ANALYTICS_ERROR.CATEGORIES.CONFIG;

  return ANALYTICS_ERROR.CATEGORIES.SYSTEM;
}

// Get error severity from error type
export function getAnalyticsErrorSeverity(errorType: AnalyticsErrorType): AnalyticsErrorSeverity {
  const criticalErrors: AnalyticsErrorType[] = [
    ANALYTICS_ERROR.TYPES.SYSTEM_ERROR,
    ANALYTICS_ERROR.TYPES.INTERNAL_ERROR,
    ANALYTICS_ERROR.TYPES.DATA_CORRUPTED,
    ANALYTICS_ERROR.TYPES.PERMISSION_ERROR,
  ];

  const highErrors: AnalyticsErrorType[] = [
    ANALYTICS_ERROR.TYPES.CONNECTION_ERROR,
    ANALYTICS_ERROR.TYPES.DATA_NOT_FOUND,
    ANALYTICS_ERROR.TYPES.QUERY_ERROR,
    ANALYTICS_ERROR.TYPES.PROCESSING_ERROR,
    ANALYTICS_ERROR.TYPES.INTEGRATION_ERROR,
  ];

  const mediumErrors: AnalyticsErrorType[] = [
    ANALYTICS_ERROR.TYPES.TIMEOUT_ERROR,
    ANALYTICS_ERROR.TYPES.DATA_INCOMPLETE,
    ANALYTICS_ERROR.TYPES.INVALID_QUERY,
    ANALYTICS_ERROR.TYPES.VALIDATION_ERROR,
    ANALYTICS_ERROR.TYPES.API_ERROR,
  ];

  if (criticalErrors.includes(errorType)) return ANALYTICS_ERROR.SEVERITY.CRITICAL;
  if (highErrors.includes(errorType)) return ANALYTICS_ERROR.SEVERITY.HIGH;
  if (mediumErrors.includes(errorType)) return ANALYTICS_ERROR.SEVERITY.MEDIUM;

  return ANALYTICS_ERROR.SEVERITY.LOW;
}
