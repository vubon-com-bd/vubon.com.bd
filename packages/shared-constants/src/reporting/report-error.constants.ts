/**
 * Report Error Constants
 * Error definitions for reporting system
 */

export const REPORT_ERROR = {
  // Error Categories
  CATEGORIES: {
    VALIDATION: 'validation',
    GENERATION: 'generation',
    EXPORT: 'export',
    DELIVERY: 'delivery',
    SCHEDULING: 'scheduling',
    PERMISSION: 'permission',
    DATABASE: 'database',
    NETWORK: 'network',
    SYSTEM: 'system',
    UNKNOWN: 'unknown',
  } as const,

  // Error Codes
  CODES: {
    // Validation Errors (1000-1999)
    VALIDATION_ERROR: 1000,
    INVALID_PARAMETERS: 1001,
    MISSING_REQUIRED_FIELD: 1002,
    INVALID_DATE_RANGE: 1003,
    INVALID_FILTER: 1004,
    INVALID_SORT: 1005,
    INVALID_FORMAT: 1006,
    INVALID_TEMPLATE: 1007,
    INVALID_SCHEDULE: 1008,
    INVALID_EXPORT: 1009,

    // Generation Errors (2000-2999)
    GENERATION_ERROR: 2000,
    GENERATION_FAILED: 2001,
    GENERATION_TIMEOUT: 2002,
    GENERATION_CANCELLED: 2003,
    DATA_NOT_FOUND: 2004,
    DATA_EMPTY: 2005,
    DATA_TOO_LARGE: 2006,
    DATA_FORMAT_ERROR: 2007,
    DATA_PROCESSING_ERROR: 2008,

    // Export Errors (3000-3999)
    EXPORT_ERROR: 3000,
    EXPORT_FAILED: 3001,
    EXPORT_TIMEOUT: 3002,
    EXPORT_SIZE_EXCEEDED: 3003,
    EXPORT_FORMAT_NOT_SUPPORTED: 3004,
    EXPORT_FILE_CREATION_FAILED: 3005,
    EXPORT_COMPRESSION_FAILED: 3006,
    EXPORT_ENCRYPTION_FAILED: 3007,

    // Delivery Errors (4000-4999)
    DELIVERY_ERROR: 4000,
    DELIVERY_FAILED: 4001,
    DELIVERY_TIMEOUT: 4002,
    EMAIL_SEND_FAILED: 4003,
    EMAIL_INVALID_RECIPIENT: 4004,
    EMAIL_SIZE_EXCEEDED: 4005,
    EMAIL_ATTACHMENT_FAILED: 4006,
    EMAIL_TEMPLATE_ERROR: 4007,
    WEBHOOK_FAILED: 4008,
    API_FAILED: 4009,

    // Scheduling Errors (5000-5999)
    SCHEDULING_ERROR: 5000,
    SCHEDULE_CREATION_FAILED: 5001,
    SCHEDULE_UPDATE_FAILED: 5002,
    SCHEDULE_DELETE_FAILED: 5003,
    SCHEDULE_EXECUTION_FAILED: 5004,
    SCHEDULE_INVALID_CRON: 5005,
    SCHEDULE_CONFLICT: 5006,
    SCHEDULE_EXPIRED: 5007,

    // Permission Errors (6000-6999)
    PERMISSION_ERROR: 6000,
    PERMISSION_DENIED: 6001,
    INSUFFICIENT_PERMISSIONS: 6002,
    AUTHENTICATION_REQUIRED: 6003,
    AUTHENTICATION_FAILED: 6004,
    INVALID_TOKEN: 6005,
    EXPIRED_TOKEN: 6006,
    INVALID_CREDENTIALS: 6007,
    ACCOUNT_LOCKED: 6008,

    // Database Errors (7000-7999)
    DATABASE_ERROR: 7000,
    DATABASE_CONNECTION_FAILED: 7001,
    DATABASE_QUERY_FAILED: 7002,
    DATABASE_TIMEOUT: 7003,
    DATABASE_CONSTRAINT_VIOLATION: 7004,
    DATABASE_DUPLICATE_ENTRY: 7005,
    DATABASE_RECORD_NOT_FOUND: 7006,

    // Network Errors (8000-8999)
    NETWORK_ERROR: 8000,
    NETWORK_TIMEOUT: 8001,
    NETWORK_CONNECTION_FAILED: 8002,
    NETWORK_UNREACHABLE: 8003,
    DNS_ERROR: 8004,
    SSL_ERROR: 8005,

    // System Errors (9000-9999)
    SYSTEM_ERROR: 9000,
    SYSTEM_TIMEOUT: 9001,
    SYSTEM_OVERLOAD: 9002,
    SYSTEM_MAINTENANCE: 9003,
    SYSTEM_CONFIGURATION_ERROR: 9004,
    SYSTEM_RESOURCE_EXHAUSTED: 9005,
    SYSTEM_UPGRADE_REQUIRED: 9006,

    // Unknown Errors (9999)
    UNKNOWN_ERROR: 9999,
  } as const,

  // Error Severity
  SEVERITY: {
    DEBUG: 'debug',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
    FATAL: 'fatal',
  } as const,

  // Error Messages
  MESSAGES: {
    // Validation Errors
    [1000]: 'Validation error occurred',
    [1001]: 'Invalid parameters provided',
    [1002]: 'Missing required field',
    [1003]: 'Invalid date range specified',
    [1004]: 'Invalid filter configuration',
    [1005]: 'Invalid sort configuration',
    [1006]: 'Invalid format specified',
    [1007]: 'Invalid template configuration',
    [1008]: 'Invalid schedule configuration',
    [1009]: 'Invalid export configuration',

    // Generation Errors
    [2000]: 'Report generation error',
    [2001]: 'Report generation failed',
    [2002]: 'Report generation timed out',
    [2003]: 'Report generation cancelled',
    [2004]: 'Data not found',
    [2005]: 'Data is empty',
    [2006]: 'Data is too large',
    [2007]: 'Data format error',
    [2008]: 'Data processing error',

    // Export Errors
    [3000]: 'Export error occurred',
    [3001]: 'Export failed',
    [3002]: 'Export timed out',
    [3003]: 'Export size exceeded',
    [3004]: 'Export format not supported',
    [3005]: 'Export file creation failed',
    [3006]: 'Export compression failed',
    [3007]: 'Export encryption failed',

    // Delivery Errors
    [4000]: 'Delivery error occurred',
    [4001]: 'Delivery failed',
    [4002]: 'Delivery timed out',
    [4003]: 'Email send failed',
    [4004]: 'Invalid email recipient',
    [4005]: 'Email size exceeded',
    [4006]: 'Email attachment failed',
    [4007]: 'Email template error',
    [4008]: 'Webhook failed',
    [4009]: 'API call failed',

    // Scheduling Errors
    [5000]: 'Scheduling error occurred',
    [5001]: 'Schedule creation failed',
    [5002]: 'Schedule update failed',
    [5003]: 'Schedule deletion failed',
    [5004]: 'Schedule execution failed',
    [5005]: 'Invalid cron expression',
    [5006]: 'Schedule conflict detected',
    [5007]: 'Schedule has expired',

    // Permission Errors
    [6000]: 'Permission error occurred',
    [6001]: 'Permission denied',
    [6002]: 'Insufficient permissions',
    [6003]: 'Authentication required',
    [6004]: 'Authentication failed',
    [6005]: 'Invalid token',
    [6006]: 'Token has expired',
    [6007]: 'Invalid credentials',
    [6008]: 'Account is locked',

    // Database Errors
    [7000]: 'Database error occurred',
    [7001]: 'Database connection failed',
    [7002]: 'Database query failed',
    [7003]: 'Database timeout',
    [7004]: 'Database constraint violation',
    [7005]: 'Duplicate entry',
    [7006]: 'Record not found',

    // Network Errors
    [8000]: 'Network error occurred',
    [8001]: 'Network timeout',
    [8002]: 'Network connection failed',
    [8003]: 'Network unreachable',
    [8004]: 'DNS resolution failed',
    [8005]: 'SSL certificate error',

    // System Errors
    [9000]: 'System error occurred',
    [9001]: 'System timeout',
    [9002]: 'System overload',
    [9003]: 'System maintenance in progress',
    [9004]: 'System configuration error',
    [9005]: 'System resource exhausted',
    [9006]: 'System upgrade required',

    // Unknown Errors
    [9999]: 'An unknown error occurred',
  } as const,

  // Error Retry Settings
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // milliseconds
    BACKOFF_MULTIPLIER: 2,
    MAX_DELAY: 60000, // milliseconds
    RETRYABLE_ERRORS: [
      2000,
      2001,
      2002, // Generation errors
      3000,
      3001,
      3002, // Export errors
      4000,
      4001,
      4002, // Delivery errors
      5000,
      5004, // Scheduling errors
      7000,
      7001,
      7002, // Database errors
      8000,
      8001,
      8002, // Network errors
    ] as number[],
  } as const,

  // Error Recovery Actions
  RECOVERY_ACTIONS: {
    RETRY: 'retry',
    RETRY_WITH_BACKOFF: 'retry_with_backoff',
    RETRY_WITH_DIFFERENT_PARAMS: 'retry_with_different_params',
    NOTIFY_ADMIN: 'notify_admin',
    NOTIFY_USER: 'notify_user',
    LOG_ONLY: 'log_only',
    ABORT: 'abort',
  } as const,
} as const;

// Error Categories
export type ReportErrorCategory =
  (typeof REPORT_ERROR.CATEGORIES)[keyof typeof REPORT_ERROR.CATEGORIES];

// Error Codes
export type ReportErrorCode = (typeof REPORT_ERROR.CODES)[keyof typeof REPORT_ERROR.CODES];

// Error Severity
export type ReportErrorSeverity =
  (typeof REPORT_ERROR.SEVERITY)[keyof typeof REPORT_ERROR.SEVERITY];

// Recovery Actions
export type ReportRecoveryAction =
  (typeof REPORT_ERROR.RECOVERY_ACTIONS)[keyof typeof REPORT_ERROR.RECOVERY_ACTIONS];

// Utility Functions
export function reportErrorGetCategoryLabel(category: ReportErrorCategory): string {
  const labels: Record<ReportErrorCategory, string> = {
    [REPORT_ERROR.CATEGORIES.VALIDATION]: 'Validation Error',
    [REPORT_ERROR.CATEGORIES.GENERATION]: 'Generation Error',
    [REPORT_ERROR.CATEGORIES.EXPORT]: 'Export Error',
    [REPORT_ERROR.CATEGORIES.DELIVERY]: 'Delivery Error',
    [REPORT_ERROR.CATEGORIES.SCHEDULING]: 'Scheduling Error',
    [REPORT_ERROR.CATEGORIES.PERMISSION]: 'Permission Error',
    [REPORT_ERROR.CATEGORIES.DATABASE]: 'Database Error',
    [REPORT_ERROR.CATEGORIES.NETWORK]: 'Network Error',
    [REPORT_ERROR.CATEGORIES.SYSTEM]: 'System Error',
    [REPORT_ERROR.CATEGORIES.UNKNOWN]: 'Unknown Error',
  };
  return labels[category] || 'Unknown Category';
}

export function reportErrorGetSeverityLabel(severity: ReportErrorSeverity): string {
  const labels: Record<ReportErrorSeverity, string> = {
    [REPORT_ERROR.SEVERITY.DEBUG]: 'Debug',
    [REPORT_ERROR.SEVERITY.INFO]: 'Info',
    [REPORT_ERROR.SEVERITY.WARNING]: 'Warning',
    [REPORT_ERROR.SEVERITY.ERROR]: 'Error',
    [REPORT_ERROR.SEVERITY.CRITICAL]: 'Critical',
    [REPORT_ERROR.SEVERITY.FATAL]: 'Fatal',
  };
  return labels[severity] || 'Unknown Severity';
}

export function reportErrorGetMessage(code: ReportErrorCode): string {
  return REPORT_ERROR.MESSAGES[code] || 'Unknown error message';
}

export function reportErrorGetCategory(code: ReportErrorCode): ReportErrorCategory {
  if (code >= 1000 && code < 2000) return REPORT_ERROR.CATEGORIES.VALIDATION;
  if (code >= 2000 && code < 3000) return REPORT_ERROR.CATEGORIES.GENERATION;
  if (code >= 3000 && code < 4000) return REPORT_ERROR.CATEGORIES.EXPORT;
  if (code >= 4000 && code < 5000) return REPORT_ERROR.CATEGORIES.DELIVERY;
  if (code >= 5000 && code < 6000) return REPORT_ERROR.CATEGORIES.SCHEDULING;
  if (code >= 6000 && code < 7000) return REPORT_ERROR.CATEGORIES.PERMISSION;
  if (code >= 7000 && code < 8000) return REPORT_ERROR.CATEGORIES.DATABASE;
  if (code >= 8000 && code < 9000) return REPORT_ERROR.CATEGORIES.NETWORK;
  if (code >= 9000 && code < 10000) return REPORT_ERROR.CATEGORIES.SYSTEM;
  return REPORT_ERROR.CATEGORIES.UNKNOWN;
}

export function reportErrorGetSeverity(code: ReportErrorCode): ReportErrorSeverity {
  if (code >= 1000 && code < 2000) return REPORT_ERROR.SEVERITY.WARNING;
  if (code >= 2000 && code < 3000) return REPORT_ERROR.SEVERITY.ERROR;
  if (code >= 3000 && code < 4000) return REPORT_ERROR.SEVERITY.ERROR;
  if (code >= 4000 && code < 5000) return REPORT_ERROR.SEVERITY.ERROR;
  if (code >= 5000 && code < 6000) return REPORT_ERROR.SEVERITY.WARNING;
  if (code >= 6000 && code < 7000) return REPORT_ERROR.SEVERITY.ERROR;
  if (code >= 7000 && code < 8000) return REPORT_ERROR.SEVERITY.CRITICAL;
  if (code >= 8000 && code < 9000) return REPORT_ERROR.SEVERITY.WARNING;
  if (code >= 9000 && code < 10000) return REPORT_ERROR.SEVERITY.CRITICAL;
  return REPORT_ERROR.SEVERITY.ERROR;
}

export function reportErrorShouldRetry(code: ReportErrorCode): boolean {
  const retryableErrors = REPORT_ERROR.RETRY.RETRYABLE_ERRORS as number[];
  return retryableErrors.includes(code);
}

export function reportErrorGetRecoveryAction(code: ReportErrorCode): ReportRecoveryAction {
  if (reportErrorShouldRetry(code)) {
    if (code >= 8000 && code < 9000) {
      return REPORT_ERROR.RECOVERY_ACTIONS.RETRY_WITH_BACKOFF;
    }
    if (code >= 7000 && code < 8000) {
      return REPORT_ERROR.RECOVERY_ACTIONS.RETRY_WITH_BACKOFF;
    }
    return REPORT_ERROR.RECOVERY_ACTIONS.RETRY;
  }

  if (code >= 6000 && code < 7000) {
    return REPORT_ERROR.RECOVERY_ACTIONS.NOTIFY_USER;
  }

  if (code >= 9000 && code < 10000) {
    return REPORT_ERROR.RECOVERY_ACTIONS.NOTIFY_ADMIN;
  }

  return REPORT_ERROR.RECOVERY_ACTIONS.LOG_ONLY;
}

export function reportErrorGetMaxRetries(): number {
  return REPORT_ERROR.RETRY.MAX_ATTEMPTS;
}

export function reportErrorGetRetryDelay(attempt: number): number {
  const baseDelay = REPORT_ERROR.RETRY.DELAY;
  const multiplier = REPORT_ERROR.RETRY.BACKOFF_MULTIPLIER;
  const maxDelay = REPORT_ERROR.RETRY.MAX_DELAY;
  const delay = baseDelay * Math.pow(multiplier, attempt - 1);
  return Math.min(delay, maxDelay);
}

export function reportErrorIsValidCode(code: number): code is ReportErrorCode {
  return Object.values(REPORT_ERROR.CODES).includes(code as ReportErrorCode);
}

export function reportErrorIsValidSeverity(severity: string): severity is ReportErrorSeverity {
  return Object.values(REPORT_ERROR.SEVERITY).includes(severity as ReportErrorSeverity);
}

export function reportErrorGetRecoveryActionLabel(action: ReportRecoveryAction): string {
  const labels: Record<ReportRecoveryAction, string> = {
    [REPORT_ERROR.RECOVERY_ACTIONS.RETRY]: 'Retry',
    [REPORT_ERROR.RECOVERY_ACTIONS.RETRY_WITH_BACKOFF]: 'Retry with Backoff',
    [REPORT_ERROR.RECOVERY_ACTIONS.RETRY_WITH_DIFFERENT_PARAMS]: 'Retry with Different Parameters',
    [REPORT_ERROR.RECOVERY_ACTIONS.NOTIFY_ADMIN]: 'Notify Administrator',
    [REPORT_ERROR.RECOVERY_ACTIONS.NOTIFY_USER]: 'Notify User',
    [REPORT_ERROR.RECOVERY_ACTIONS.LOG_ONLY]: 'Log Only',
    [REPORT_ERROR.RECOVERY_ACTIONS.ABORT]: 'Abort',
  };
  return labels[action] || 'Unknown Action';
}

export function reportErrorIsFatal(code: ReportErrorCode): boolean {
  const fatalCodes: ReportErrorCode[] = [
    REPORT_ERROR.CODES.SYSTEM_ERROR,
    REPORT_ERROR.CODES.SYSTEM_OVERLOAD,
    REPORT_ERROR.CODES.SYSTEM_RESOURCE_EXHAUSTED,
  ];
  return fatalCodes.includes(code);
}
