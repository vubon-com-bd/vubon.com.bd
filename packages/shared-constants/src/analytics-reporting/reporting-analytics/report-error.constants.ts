/**
 * @fileoverview Report error codes and messages definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Report error codes
 */
export enum ReportErrorCode {
  /** Report not found */
  REPORT_NOT_FOUND = 'REPORT_NOT_FOUND',
  /** Template not found */
  TEMPLATE_NOT_FOUND = 'TEMPLATE_NOT_FOUND',
  /** Dashboard not found */
  DASHBOARD_NOT_FOUND = 'DASHBOARD_NOT_FOUND',
  /** Widget not found */
  WIDGET_NOT_FOUND = 'WIDGET_NOT_FOUND',
  /** Filter not found */
  FILTER_NOT_FOUND = 'FILTER_NOT_FOUND',
  /** Export not found */
  EXPORT_NOT_FOUND = 'EXPORT_NOT_FOUND',
  /** Email not found */
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  /** Schedule not found */
  SCHEDULE_NOT_FOUND = 'SCHEDULE_NOT_FOUND',
  /** Permission denied */
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  /** Unauthorized access */
  UNAUTHORIZED = 'UNAUTHORIZED',
  /** Invalid input */
  INVALID_INPUT = 'INVALID_INPUT',
  /** Validation error */
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  /** Duplicate report */
  DUPLICATE_REPORT = 'DUPLICATE_REPORT',
  /** Conflict */
  CONFLICT = 'CONFLICT',
  /** Storage error */
  STORAGE_ERROR = 'STORAGE_ERROR',
  /** Database error */
  DATABASE_ERROR = 'DATABASE_ERROR',
  /** Cache error */
  CACHE_ERROR = 'CACHE_ERROR',
  /** Queue error */
  QUEUE_ERROR = 'QUEUE_ERROR',
  /** Network error */
  NETWORK_ERROR = 'NETWORK_ERROR',
  /** Timeout error */
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  /** Generation error */
  GENERATION_ERROR = 'GENERATION_ERROR',
  /** Compilation error */
  COMPILATION_ERROR = 'COMPILATION_ERROR',
  /** Render error */
  RENDER_ERROR = 'RENDER_ERROR',
  /** Export error */
  EXPORT_ERROR = 'EXPORT_ERROR',
  /** Email error */
  EMAIL_ERROR = 'EMAIL_ERROR',
  /** Schedule error */
  SCHEDULE_ERROR = 'SCHEDULE_ERROR',
  /** Dependency error */
  DEPENDENCY_ERROR = 'DEPENDENCY_ERROR',
  /** Partial failure */
  PARTIAL_FAILURE = 'PARTIAL_FAILURE',
  /** System overload */
  SYSTEM_OVERLOAD = 'SYSTEM_OVERLOAD',
  /** Resource limit exceeded */
  RESOURCE_LIMIT_EXCEEDED = 'RESOURCE_LIMIT_EXCEEDED',
  /** Quota exceeded */
  QUOTA_EXCEEDED = 'QUOTA_EXCEEDED',
  /** Rate limit exceeded */
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  /** Concurrency error */
  CONCURRENCY_ERROR = 'CONCURRENCY_ERROR',
  /** Transaction error */
  TRANSACTION_ERROR = 'TRANSACTION_ERROR',
  /** Rollback error */
  ROLLBACK_ERROR = 'ROLLBACK_ERROR',
  /** Commit error */
  COMMIT_ERROR = 'COMMIT_ERROR',
  /** Lock error */
  LOCK_ERROR = 'LOCK_ERROR',
  /** Deadlock error */
  DEADLOCK_ERROR = 'DEADLOCK_ERROR',
  /** Corrupted data */
  CORRUPTED_DATA = 'CORRUPTED_DATA',
  /** Invalid data */
  INVALID_DATA = 'INVALID_DATA',
  /** Missing data */
  MISSING_DATA = 'MISSING_DATA',
  /** Incomplete data */
  INCOMPLETE_DATA = 'INCOMPLETE_DATA',
  /** Outdated data */
  OUTDATED_DATA = 'OUTDATED_DATA',
  /** Inconsistent data */
  INCONSISTENT_DATA = 'INCONSISTENT_DATA',
  /** Security error */
  SECURITY_ERROR = 'SECURITY_ERROR',
  /** Authentication error */
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  /** Authorization error */
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  /** Encryption error */
  ENCRYPTION_ERROR = 'ENCRYPTION_ERROR',
  /** Decryption error */
  DECRYPTION_ERROR = 'DECRYPTION_ERROR',
  /** Compression error */
  COMPRESSION_ERROR = 'COMPRESSION_ERROR',
  /** Decompression error */
  DECOMPRESSION_ERROR = 'DECOMPRESSION_ERROR',
  /** Parse error */
  PARSE_ERROR = 'PARSE_ERROR',
  /** Serialization error */
  SERIALIZATION_ERROR = 'SERIALIZATION_ERROR',
  /** Deserialization error */
  DESERIALIZATION_ERROR = 'DESERIALIZATION_ERROR',
  /** Conversion error */
  CONVERSION_ERROR = 'CONVERSION_ERROR',
  /** Mapping error */
  MAPPING_ERROR = 'MAPPING_ERROR',
  /** Formatting error */
  FORMATTING_ERROR = 'FORMATTING_ERROR',
  /** Parsing error */
  PARSING_ERROR = 'PARSING_ERROR',
  /** Unknown error */
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

/**
 * Error severity levels
 */
export enum ReportErrorSeverity {
  /** Low severity - non-critical errors */
  LOW = 'LOW',
  /** Medium severity - operational errors */
  MEDIUM = 'MEDIUM',
  /** High severity - critical errors */
  HIGH = 'HIGH',
  /** Critical severity - system failures */
  CRITICAL = 'CRITICAL',
}

/**
 * Error category classification
 */
export enum ReportErrorCategory {
  /** Not found errors */
  NOT_FOUND = 'NOT_FOUND',
  /** Permission errors */
  PERMISSION = 'PERMISSION',
  /** Input errors */
  INPUT = 'INPUT',
  /** System errors */
  SYSTEM = 'SYSTEM',
  /** Data errors */
  DATA = 'DATA',
  /** Security errors */
  SECURITY = 'SECURITY',
  /** Network errors */
  NETWORK = 'NETWORK',
  /** Resource errors */
  RESOURCE = 'RESOURCE',
  /** Transaction errors */
  TRANSACTION = 'TRANSACTION',
  /** Processing errors */
  PROCESSING = 'PROCESSING',
  /** Unknown errors */
  UNKNOWN = 'UNKNOWN',
}

/**
 * Error configuration
 */
export interface ReportErrorConfig {
  code: ReportErrorCode;
  message: string;
  description: string;
  severity: ReportErrorSeverity;
  category: ReportErrorCategory;
  httpStatus?: number;
  retryable: boolean;
  userFriendlyMessage: string;
  suggestedAction?: string;
}

export const REPORT_ERROR_CONFIG: Record<ReportErrorCode, ReportErrorConfig> = {
  [ReportErrorCode.REPORT_NOT_FOUND]: {
    code: ReportErrorCode.REPORT_NOT_FOUND,
    message: 'Report not found',
    description: 'The requested report could not be found',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.NOT_FOUND,
    httpStatus: 404,
    retryable: false,
    userFriendlyMessage: 'Report not found. Please check the report ID.',
    suggestedAction: 'Verify the report ID or search for the report.',
  },
  [ReportErrorCode.TEMPLATE_NOT_FOUND]: {
    code: ReportErrorCode.TEMPLATE_NOT_FOUND,
    message: 'Template not found',
    description: 'The requested template could not be found',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.NOT_FOUND,
    httpStatus: 404,
    retryable: false,
    userFriendlyMessage: 'Template not found. Please check the template ID.',
    suggestedAction: 'Verify the template ID or browse available templates.',
  },
  [ReportErrorCode.DASHBOARD_NOT_FOUND]: {
    code: ReportErrorCode.DASHBOARD_NOT_FOUND,
    message: 'Dashboard not found',
    description: 'The requested dashboard could not be found',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.NOT_FOUND,
    httpStatus: 404,
    retryable: false,
    userFriendlyMessage: 'Dashboard not found. Please check the dashboard ID.',
    suggestedAction: 'Verify the dashboard ID or browse available dashboards.',
  },
  [ReportErrorCode.WIDGET_NOT_FOUND]: {
    code: ReportErrorCode.WIDGET_NOT_FOUND,
    message: 'Widget not found',
    description: 'The requested widget could not be found',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.NOT_FOUND,
    httpStatus: 404,
    retryable: false,
    userFriendlyMessage: 'Widget not found. Please check the widget ID.',
    suggestedAction: 'Verify the widget ID or browse available widgets.',
  },
  [ReportErrorCode.FILTER_NOT_FOUND]: {
    code: ReportErrorCode.FILTER_NOT_FOUND,
    message: 'Filter not found',
    description: 'The requested filter could not be found',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.NOT_FOUND,
    httpStatus: 404,
    retryable: false,
    userFriendlyMessage: 'Filter not found. Please check the filter ID.',
    suggestedAction: 'Verify the filter ID or browse available filters.',
  },
  [ReportErrorCode.EXPORT_NOT_FOUND]: {
    code: ReportErrorCode.EXPORT_NOT_FOUND,
    message: 'Export not found',
    description: 'The requested export could not be found',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.NOT_FOUND,
    httpStatus: 404,
    retryable: false,
    userFriendlyMessage: 'Export not found. Please check the export ID.',
    suggestedAction: 'Verify the export ID or browse available exports.',
  },
  [ReportErrorCode.EMAIL_NOT_FOUND]: {
    code: ReportErrorCode.EMAIL_NOT_FOUND,
    message: 'Email not found',
    description: 'The requested email could not be found',
    severity: ReportErrorSeverity.LOW,
    category: ReportErrorCategory.NOT_FOUND,
    httpStatus: 404,
    retryable: false,
    userFriendlyMessage: 'Email not found. Please check the email ID.',
    suggestedAction: 'Verify the email ID or browse available emails.',
  },
  [ReportErrorCode.SCHEDULE_NOT_FOUND]: {
    code: ReportErrorCode.SCHEDULE_NOT_FOUND,
    message: 'Schedule not found',
    description: 'The requested schedule could not be found',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.NOT_FOUND,
    httpStatus: 404,
    retryable: false,
    userFriendlyMessage: 'Schedule not found. Please check the schedule ID.',
    suggestedAction: 'Verify the schedule ID or browse available schedules.',
  },
  [ReportErrorCode.PERMISSION_DENIED]: {
    code: ReportErrorCode.PERMISSION_DENIED,
    message: 'Permission denied',
    description: 'User does not have permission to perform the action',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.PERMISSION,
    httpStatus: 403,
    retryable: false,
    userFriendlyMessage: 'Permission denied. You do not have access to this resource.',
    suggestedAction: 'Contact your administrator for access.',
  },
  [ReportErrorCode.UNAUTHORIZED]: {
    code: ReportErrorCode.UNAUTHORIZED,
    message: 'Unauthorized access',
    description: 'User is not authorized to access the resource',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.PERMISSION,
    httpStatus: 401,
    retryable: false,
    userFriendlyMessage: 'Unauthorized access. Please login again.',
    suggestedAction: 'Login with valid credentials.',
  },
  [ReportErrorCode.INVALID_INPUT]: {
    code: ReportErrorCode.INVALID_INPUT,
    message: 'Invalid input',
    description: 'The provided input is invalid',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.INPUT,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Invalid input. Please check your input values.',
    suggestedAction: 'Review and correct the input values.',
  },
  [ReportErrorCode.VALIDATION_ERROR]: {
    code: ReportErrorCode.VALIDATION_ERROR,
    message: 'Validation error',
    description: 'Input validation failed',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.INPUT,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Validation error. Please check your input.',
    suggestedAction: 'Review and correct the input values.',
  },
  [ReportErrorCode.DUPLICATE_REPORT]: {
    code: ReportErrorCode.DUPLICATE_REPORT,
    message: 'Duplicate report',
    description: 'A report with the same identifier already exists',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.INPUT,
    httpStatus: 409,
    retryable: false,
    userFriendlyMessage: 'Duplicate report. A report with this name already exists.',
    suggestedAction: 'Use a different name or update the existing report.',
  },
  [ReportErrorCode.CONFLICT]: {
    code: ReportErrorCode.CONFLICT,
    message: 'Conflict',
    description: 'The request conflicts with the current state',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.INPUT,
    httpStatus: 409,
    retryable: false,
    userFriendlyMessage: 'Conflict. Please refresh and try again.',
    suggestedAction: 'Refresh the page and try again.',
  },
  [ReportErrorCode.STORAGE_ERROR]: {
    code: ReportErrorCode.STORAGE_ERROR,
    message: 'Storage error',
    description: 'An error occurred while accessing storage',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.SYSTEM,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Storage error. Please try again later.',
    suggestedAction: 'Try again later or contact support.',
  },
  [ReportErrorCode.DATABASE_ERROR]: {
    code: ReportErrorCode.DATABASE_ERROR,
    message: 'Database error',
    description: 'An error occurred while accessing the database',
    severity: ReportErrorSeverity.CRITICAL,
    category: ReportErrorCategory.SYSTEM,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Database error. Please try again later.',
    suggestedAction: 'Try again later or contact support.',
  },
  [ReportErrorCode.CACHE_ERROR]: {
    code: ReportErrorCode.CACHE_ERROR,
    message: 'Cache error',
    description: 'An error occurred while accessing the cache',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.SYSTEM,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Cache error. Please try again.',
    suggestedAction: 'Try again later.',
  },
  [ReportErrorCode.QUEUE_ERROR]: {
    code: ReportErrorCode.QUEUE_ERROR,
    message: 'Queue error',
    description: 'An error occurred while accessing the queue',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.SYSTEM,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Queue error. Please try again.',
    suggestedAction: 'Try again later.',
  },
  [ReportErrorCode.NETWORK_ERROR]: {
    code: ReportErrorCode.NETWORK_ERROR,
    message: 'Network error',
    description: 'A network error occurred',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.NETWORK,
    httpStatus: 503,
    retryable: true,
    userFriendlyMessage: 'Network error. Please check your connection.',
    suggestedAction: 'Check your network connection and try again.',
  },
  [ReportErrorCode.TIMEOUT_ERROR]: {
    code: ReportErrorCode.TIMEOUT_ERROR,
    message: 'Timeout error',
    description: 'The request timed out',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.NETWORK,
    httpStatus: 504,
    retryable: true,
    userFriendlyMessage: 'Request timed out. Please try again.',
    suggestedAction: 'Try again later or reduce the data volume.',
  },
  [ReportErrorCode.GENERATION_ERROR]: {
    code: ReportErrorCode.GENERATION_ERROR,
    message: 'Generation error',
    description: 'An error occurred while generating the report',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Report generation failed. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [ReportErrorCode.COMPILATION_ERROR]: {
    code: ReportErrorCode.COMPILATION_ERROR,
    message: 'Compilation error',
    description: 'An error occurred while compiling the report',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Compilation error. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [ReportErrorCode.RENDER_ERROR]: {
    code: ReportErrorCode.RENDER_ERROR,
    message: 'Render error',
    description: 'An error occurred while rendering the report',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Render error. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [ReportErrorCode.EXPORT_ERROR]: {
    code: ReportErrorCode.EXPORT_ERROR,
    message: 'Export error',
    description: 'An error occurred while exporting',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Export failed. Please try again.',
    suggestedAction: 'Try again later or reduce the data volume.',
  },
  [ReportErrorCode.EMAIL_ERROR]: {
    code: ReportErrorCode.EMAIL_ERROR,
    message: 'Email error',
    description: 'An error occurred while sending email',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Email error. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [ReportErrorCode.SCHEDULE_ERROR]: {
    code: ReportErrorCode.SCHEDULE_ERROR,
    message: 'Schedule error',
    description: 'An error occurred while managing schedule',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Schedule error. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [ReportErrorCode.DEPENDENCY_ERROR]: {
    code: ReportErrorCode.DEPENDENCY_ERROR,
    message: 'Dependency error',
    description: 'A dependency error occurred',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Dependency error. Please check dependencies.',
    suggestedAction: 'Check and resolve dependency issues.',
  },
  [ReportErrorCode.PARTIAL_FAILURE]: {
    code: ReportErrorCode.PARTIAL_FAILURE,
    message: 'Partial failure',
    description: 'The operation completed with partial failure',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 207,
    retryable: false,
    userFriendlyMessage: 'Partial failure. Some operations failed.',
    suggestedAction: 'Review the results and retry failed operations.',
  },
  [ReportErrorCode.SYSTEM_OVERLOAD]: {
    code: ReportErrorCode.SYSTEM_OVERLOAD,
    message: 'System overload',
    description: 'The system is currently overloaded',
    severity: ReportErrorSeverity.CRITICAL,
    category: ReportErrorCategory.SYSTEM,
    httpStatus: 503,
    retryable: true,
    userFriendlyMessage: 'System overload. Please try again later.',
    suggestedAction: 'Wait and try again later.',
  },
  [ReportErrorCode.RESOURCE_LIMIT_EXCEEDED]: {
    code: ReportErrorCode.RESOURCE_LIMIT_EXCEEDED,
    message: 'Resource limit exceeded',
    description: 'Resource limit has been exceeded',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.RESOURCE,
    httpStatus: 507,
    retryable: false,
    userFriendlyMessage: 'Resource limit exceeded. Please free up resources.',
    suggestedAction: 'Free up resources or upgrade your plan.',
  },
  [ReportErrorCode.QUOTA_EXCEEDED]: {
    code: ReportErrorCode.QUOTA_EXCEEDED,
    message: 'Quota exceeded',
    description: 'User quota has been exceeded',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.RESOURCE,
    httpStatus: 403,
    retryable: false,
    userFriendlyMessage: 'Quota exceeded. Please upgrade your plan.',
    suggestedAction: 'Upgrade your plan or reduce usage.',
  },
  [ReportErrorCode.RATE_LIMIT_EXCEEDED]: {
    code: ReportErrorCode.RATE_LIMIT_EXCEEDED,
    message: 'Rate limit exceeded',
    description: 'Rate limit has been exceeded',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.RESOURCE,
    httpStatus: 429,
    retryable: true,
    userFriendlyMessage: 'Too many requests. Please wait and try again.',
    suggestedAction: 'Wait for rate limit to reset.',
  },
  [ReportErrorCode.CONCURRENCY_ERROR]: {
    code: ReportErrorCode.CONCURRENCY_ERROR,
    message: 'Concurrency error',
    description: 'A concurrency error occurred',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.SYSTEM,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Concurrency error. Please try again.',
    suggestedAction: 'Try again later.',
  },
  [ReportErrorCode.TRANSACTION_ERROR]: {
    code: ReportErrorCode.TRANSACTION_ERROR,
    message: 'Transaction error',
    description: 'A transaction error occurred',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.TRANSACTION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Transaction error. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [ReportErrorCode.ROLLBACK_ERROR]: {
    code: ReportErrorCode.ROLLBACK_ERROR,
    message: 'Rollback error',
    description: 'An error occurred during rollback',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.TRANSACTION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Rollback error. Please contact support.',
    suggestedAction: 'Contact support for assistance.',
  },
  [ReportErrorCode.COMMIT_ERROR]: {
    code: ReportErrorCode.COMMIT_ERROR,
    message: 'Commit error',
    description: 'An error occurred during commit',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.TRANSACTION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Commit error. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [ReportErrorCode.LOCK_ERROR]: {
    code: ReportErrorCode.LOCK_ERROR,
    message: 'Lock error',
    description: 'A lock error occurred',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.SYSTEM,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Lock error. Please try again.',
    suggestedAction: 'Try again later.',
  },
  [ReportErrorCode.DEADLOCK_ERROR]: {
    code: ReportErrorCode.DEADLOCK_ERROR,
    message: 'Deadlock error',
    description: 'A deadlock error occurred',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.SYSTEM,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Deadlock error. Please try again.',
    suggestedAction: 'Try again later.',
  },
  [ReportErrorCode.CORRUPTED_DATA]: {
    code: ReportErrorCode.CORRUPTED_DATA,
    message: 'Corrupted data',
    description: 'Data corruption detected',
    severity: ReportErrorSeverity.CRITICAL,
    category: ReportErrorCategory.DATA,
    httpStatus: 500,
    retryable: false,
    userFriendlyMessage: 'Data corruption detected. Please contact support.',
    suggestedAction: 'Contact support immediately.',
  },
  [ReportErrorCode.INVALID_DATA]: {
    code: ReportErrorCode.INVALID_DATA,
    message: 'Invalid data',
    description: 'The data is invalid',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.DATA,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Invalid data. Please check the data format.',
    suggestedAction: 'Review and correct the data.',
  },
  [ReportErrorCode.MISSING_DATA]: {
    code: ReportErrorCode.MISSING_DATA,
    message: 'Missing data',
    description: 'Required data is missing',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.DATA,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Missing data. Please provide all required data.',
    suggestedAction: 'Provide the missing data.',
  },
  [ReportErrorCode.INCOMPLETE_DATA]: {
    code: ReportErrorCode.INCOMPLETE_DATA,
    message: 'Incomplete data',
    description: 'The data is incomplete',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.DATA,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Incomplete data. Please provide complete data.',
    suggestedAction: 'Complete the data and try again.',
  },
  [ReportErrorCode.OUTDATED_DATA]: {
    code: ReportErrorCode.OUTDATED_DATA,
    message: 'Outdated data',
    description: 'The data is outdated',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.DATA,
    httpStatus: 409,
    retryable: false,
    userFriendlyMessage: 'Outdated data. Please refresh and try again.',
    suggestedAction: 'Refresh the data and try again.',
  },
  [ReportErrorCode.INCONSISTENT_DATA]: {
    code: ReportErrorCode.INCONSISTENT_DATA,
    message: 'Inconsistent data',
    description: 'The data is inconsistent',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.DATA,
    httpStatus: 409,
    retryable: false,
    userFriendlyMessage: 'Inconsistent data. Please resolve conflicts.',
    suggestedAction: 'Resolve data conflicts and try again.',
  },
  [ReportErrorCode.SECURITY_ERROR]: {
    code: ReportErrorCode.SECURITY_ERROR,
    message: 'Security error',
    description: 'A security error occurred',
    severity: ReportErrorSeverity.CRITICAL,
    category: ReportErrorCategory.SECURITY,
    httpStatus: 500,
    retryable: false,
    userFriendlyMessage: 'Security error. Please contact support.',
    suggestedAction: 'Contact support immediately.',
  },
  [ReportErrorCode.AUTHENTICATION_ERROR]: {
    code: ReportErrorCode.AUTHENTICATION_ERROR,
    message: 'Authentication error',
    description: 'Authentication failed',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.SECURITY,
    httpStatus: 401,
    retryable: false,
    userFriendlyMessage: 'Authentication failed. Please login again.',
    suggestedAction: 'Login with valid credentials.',
  },
  [ReportErrorCode.AUTHORIZATION_ERROR]: {
    code: ReportErrorCode.AUTHORIZATION_ERROR,
    message: 'Authorization error',
    description: 'Authorization failed',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.SECURITY,
    httpStatus: 403,
    retryable: false,
    userFriendlyMessage: 'Authorization failed. Access denied.',
    suggestedAction: 'Contact your administrator for access.',
  },
  [ReportErrorCode.ENCRYPTION_ERROR]: {
    code: ReportErrorCode.ENCRYPTION_ERROR,
    message: 'Encryption error',
    description: 'An error occurred during encryption',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.SECURITY,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Encryption error. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [ReportErrorCode.DECRYPTION_ERROR]: {
    code: ReportErrorCode.DECRYPTION_ERROR,
    message: 'Decryption error',
    description: 'An error occurred during decryption',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.SECURITY,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Decryption error. Please try again.',
    suggestedAction: 'Verify the encryption key and try again.',
  },
  [ReportErrorCode.COMPRESSION_ERROR]: {
    code: ReportErrorCode.COMPRESSION_ERROR,
    message: 'Compression error',
    description: 'An error occurred during compression',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Compression error. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [ReportErrorCode.DECOMPRESSION_ERROR]: {
    code: ReportErrorCode.DECOMPRESSION_ERROR,
    message: 'Decompression error',
    description: 'An error occurred during decompression',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Decompression error. Please check the file.',
    suggestedAction: 'Verify the file integrity and try again.',
  },
  [ReportErrorCode.PARSE_ERROR]: {
    code: ReportErrorCode.PARSE_ERROR,
    message: 'Parse error',
    description: 'An error occurred while parsing',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Parse error. Please check the input format.',
    suggestedAction: 'Review and correct the input format.',
  },
  [ReportErrorCode.SERIALIZATION_ERROR]: {
    code: ReportErrorCode.SERIALIZATION_ERROR,
    message: 'Serialization error',
    description: 'An error occurred during serialization',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Serialization error. Please try again.',
    suggestedAction: 'Check data types and try again.',
  },
  [ReportErrorCode.DESERIALIZATION_ERROR]: {
    code: ReportErrorCode.DESERIALIZATION_ERROR,
    message: 'Deserialization error',
    description: 'An error occurred during deserialization',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Deserialization error. Please check data format.',
    suggestedAction: 'Verify data format and try again.',
  },
  [ReportErrorCode.CONVERSION_ERROR]: {
    code: ReportErrorCode.CONVERSION_ERROR,
    message: 'Conversion error',
    description: 'An error occurred during conversion',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Conversion error. Please try again.',
    suggestedAction: 'Check data compatibility and try again.',
  },
  [ReportErrorCode.MAPPING_ERROR]: {
    code: ReportErrorCode.MAPPING_ERROR,
    message: 'Mapping error',
    description: 'An error occurred during mapping',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Mapping error. Please try again.',
    suggestedAction: 'Check mapping configuration and try again.',
  },
  [ReportErrorCode.FORMATTING_ERROR]: {
    code: ReportErrorCode.FORMATTING_ERROR,
    message: 'Formatting error',
    description: 'An error occurred during formatting',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Formatting error. Please try again.',
    suggestedAction: 'Check formatting configuration and try again.',
  },
  [ReportErrorCode.PARSING_ERROR]: {
    code: ReportErrorCode.PARSING_ERROR,
    message: 'Parsing error',
    description: 'An error occurred while parsing',
    severity: ReportErrorSeverity.MEDIUM,
    category: ReportErrorCategory.PROCESSING,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Parsing error. Please check the input.',
    suggestedAction: 'Review and correct the input.',
  },
  [ReportErrorCode.UNKNOWN_ERROR]: {
    code: ReportErrorCode.UNKNOWN_ERROR,
    message: 'Unknown error',
    description: 'An unknown error occurred',
    severity: ReportErrorSeverity.HIGH,
    category: ReportErrorCategory.UNKNOWN,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'An unknown error occurred. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
};

/**
 * Get error config by code
 */
export function getReportErrorConfig(code: ReportErrorCode): ReportErrorConfig | undefined {
  return REPORT_ERROR_CONFIG[code];
}

/**
 * Get error message
 */
export function getReportErrorMessage(code: ReportErrorCode): string {
  return REPORT_ERROR_CONFIG[code]?.message || 'Unknown error';
}

/**
 * Get error description
 */
export function getReportErrorDescription(code: ReportErrorCode): string {
  return REPORT_ERROR_CONFIG[code]?.description || 'No description available';
}

/**
 * Get error severity
 */
export function getReportErrorSeverity(code: ReportErrorCode): ReportErrorSeverity {
  return REPORT_ERROR_CONFIG[code]?.severity || ReportErrorSeverity.MEDIUM;
}

/**
 * Get error category
 */
export function getReportErrorCategory(code: ReportErrorCode): ReportErrorCategory {
  return REPORT_ERROR_CONFIG[code]?.category || ReportErrorCategory.UNKNOWN;
}

/**
 * Check if error is retryable
 */
export function isReportErrorRetryable(code: ReportErrorCode): boolean {
  return REPORT_ERROR_CONFIG[code]?.retryable || false;
}

/**
 * Get user-friendly message
 */
export function getReportUserFriendlyMessage(code: ReportErrorCode): string {
  return REPORT_ERROR_CONFIG[code]?.userFriendlyMessage || 'An error occurred. Please try again.';
}

/**
 * Get suggested action
 */
export function getReportSuggestedAction(code: ReportErrorCode): string | undefined {
  return REPORT_ERROR_CONFIG[code]?.suggestedAction;
}

/**
 * Get HTTP status code
 */
export function getReportErrorHttpStatus(code: ReportErrorCode): number | undefined {
  return REPORT_ERROR_CONFIG[code]?.httpStatus;
}

/**
 * Get errors by category
 */
export function getReportErrorsByCategory(category: ReportErrorCategory): ReportErrorCode[] {
  return Object.entries(REPORT_ERROR_CONFIG)
    .filter(([_, config]) => config.category === category)
    .map(([code]) => code as ReportErrorCode);
}

/**
 * Get errors by severity
 */
export function getReportErrorsBySeverity(severity: ReportErrorSeverity): ReportErrorCode[] {
  return Object.entries(REPORT_ERROR_CONFIG)
    .filter(([_, config]) => config.severity === severity)
    .map(([code]) => code as ReportErrorCode);
}

/**
 * Get critical errors
 */
export function getCriticalReportErrors(): ReportErrorCode[] {
  return getReportErrorsBySeverity(ReportErrorSeverity.CRITICAL);
}

/**
 * Get retryable errors
 */
export function getRetryableReportErrors(): ReportErrorCode[] {
  return Object.entries(REPORT_ERROR_CONFIG)
    .filter(([_, config]) => config.retryable)
    .map(([code]) => code as ReportErrorCode);
}

/**
 * Create error object
 */
export interface ReportError {
  code: ReportErrorCode;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

/**
 * Create error
 */
export function createReportError(
  code: ReportErrorCode,
  details?: Record<string, unknown>
): ReportError {
  return {
    code,
    message: getReportErrorMessage(code),
    details,
    timestamp: new Date(),
  };
}
