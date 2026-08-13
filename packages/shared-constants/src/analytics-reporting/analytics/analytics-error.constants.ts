/**
 * @fileoverview Analytics error codes and messages definitions
 * @package @vubun/shared-constants
 */

// External libraries - none needed for constants

// Shared packages - none needed for constants

// Project files - none needed for constants

/**
 * Analytics error codes
 */
export enum AnalyticsErrorCode {
  /** Invalid query syntax or structure */
  INVALID_QUERY = 'INVALID_QUERY',
  /** Requested data not found */
  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  /** Invalid time period specified */
  INVALID_PERIOD = 'INVALID_PERIOD',
  /** Error during data aggregation */
  AGGREGATION_ERROR = 'AGGREGATION_ERROR',
  /** Request timeout */
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  /** Rate limit exceeded */
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  /** Permission denied */
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  /** Database connection or query error */
  DATABASE_ERROR = 'DATABASE_ERROR',
  /** Cache system error */
  CACHE_ERROR = 'CACHE_ERROR',
  /** Invalid filter configuration */
  INVALID_FILTER = 'INVALID_FILTER',
  /** Invalid dimension specified */
  INVALID_DIMENSION = 'INVALID_DIMENSION',
  /** Invalid metric specified */
  INVALID_METRIC = 'INVALID_METRIC',
  /** Invalid comparison method */
  INVALID_COMPARISON = 'INVALID_COMPARISON',
  /** Invalid interval specified */
  INVALID_INTERVAL = 'INVALID_INTERVAL',
  /** Data export failed */
  EXPORT_FAILED = 'EXPORT_FAILED',
  /** Data import failed */
  IMPORT_FAILED = 'IMPORT_FAILED',
  /** Data validation failed */
  VALIDATION_FAILED = 'VALIDATION_FAILED',
  /** Data transformation failed */
  TRANSFORMATION_FAILED = 'TRANSFORMATION_FAILED',
  /** Data synchronization failed */
  SYNC_FAILED = 'SYNC_FAILED',
  /** Storage limit exceeded */
  STORAGE_LIMIT_EXCEEDED = 'STORAGE_LIMIT_EXCEEDED',
  /** Memory limit exceeded */
  MEMORY_LIMIT_EXCEEDED = 'MEMORY_LIMIT_EXCEEDED',
  /** CPU limit exceeded */
  CPU_LIMIT_EXCEEDED = 'CPU_LIMIT_EXCEEDED',
  /** Network error */
  NETWORK_ERROR = 'NETWORK_ERROR',
  /** SSL/TLS error */
  SSL_ERROR = 'SSL_ERROR',
  /** Authentication failed */
  AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED',
  /** Authorization failed */
  AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
  /** Invalid API key */
  INVALID_API_KEY = 'INVALID_API_KEY',
  /** Service unavailable */
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  /** Maintenance mode */
  MAINTENANCE_MODE = 'MAINTENANCE_MODE',
  /** Feature not enabled */
  FEATURE_NOT_ENABLED = 'FEATURE_NOT_ENABLED',
  /** Insufficient quota */
  INSUFFICIENT_QUOTA = 'INSUFFICIENT_QUOTA',
  /** Data corruption detected */
  DATA_CORRUPTION = 'DATA_CORRUPTION',
  /** Schema mismatch */
  SCHEMA_MISMATCH = 'SCHEMA_MISMATCH',
  /** Version mismatch */
  VERSION_MISMATCH = 'VERSION_MISMATCH',
  /** Serialization error */
  SERIALIZATION_ERROR = 'SERIALIZATION_ERROR',
  /** Deserialization error */
  DESERIALIZATION_ERROR = 'DESERIALIZATION_ERROR',
  /** File not found */
  FILE_NOT_FOUND = 'FILE_NOT_FOUND',
  /** Directory not found */
  DIRECTORY_NOT_FOUND = 'DIRECTORY_NOT_FOUND',
  /** File read error */
  FILE_READ_ERROR = 'FILE_READ_ERROR',
  /** File write error */
  FILE_WRITE_ERROR = 'FILE_WRITE_ERROR',
  /** File format unsupported */
  UNSUPPORTED_FILE_FORMAT = 'UNSUPPORTED_FILE_FORMAT',
  /** Data compression error */
  COMPRESSION_ERROR = 'COMPRESSION_ERROR',
  /** Data decompression error */
  DECOMPRESSION_ERROR = 'DECOMPRESSION_ERROR',
  /** Encryption error */
  ENCRYPTION_ERROR = 'ENCRYPTION_ERROR',
  /** Decryption error */
  DECRYPTION_ERROR = 'DECRYPTION_ERROR',
}

/**
 * Error severity levels
 */
export enum AnalyticsErrorSeverity {
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
export enum AnalyticsErrorCategory {
  /** Query-related errors */
  QUERY = 'QUERY',
  /** Data-related errors */
  DATA = 'DATA',
  /** System-related errors */
  SYSTEM = 'SYSTEM',
  /** Permission-related errors */
  PERMISSION = 'PERMISSION',
  /** Network-related errors */
  NETWORK = 'NETWORK',
  /** Resource-related errors */
  RESOURCE = 'RESOURCE',
  /** File-related errors */
  FILE = 'FILE',
  /** Security-related errors */
  SECURITY = 'SECURITY',
  /** Validation-related errors */
  VALIDATION = 'VALIDATION',
  /** Operation-related errors */
  OPERATION = 'OPERATION',
}

/**
 * Error configuration
 */
export interface AnalyticsErrorConfig {
  code: AnalyticsErrorCode;
  message: string;
  description: string;
  severity: AnalyticsErrorSeverity;
  category: AnalyticsErrorCategory;
  httpStatus?: number;
  retryable: boolean;
  userFriendlyMessage: string;
  suggestedAction?: string;
}

export const ANALYTICS_ERROR_CONFIG: Record<AnalyticsErrorCode, AnalyticsErrorConfig> = {
  [AnalyticsErrorCode.INVALID_QUERY]: {
    code: AnalyticsErrorCode.INVALID_QUERY,
    message: 'Invalid query syntax or structure',
    description: 'The provided query is malformed or contains invalid syntax',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.QUERY,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Invalid query. Please check your query syntax.',
    suggestedAction: 'Review and correct the query syntax.',
  },
  [AnalyticsErrorCode.DATA_NOT_FOUND]: {
    code: AnalyticsErrorCode.DATA_NOT_FOUND,
    message: 'Data not found',
    description: 'The requested data could not be found in the system',
    severity: AnalyticsErrorSeverity.LOW,
    category: AnalyticsErrorCategory.DATA,
    httpStatus: 404,
    retryable: false,
    userFriendlyMessage: 'No data found for the specified parameters.',
    suggestedAction: 'Check your parameters or adjust your search criteria.',
  },
  [AnalyticsErrorCode.INVALID_PERIOD]: {
    code: AnalyticsErrorCode.INVALID_PERIOD,
    message: 'Invalid time period',
    description: 'The specified time period is invalid or unsupported',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.QUERY,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Invalid time period selected.',
    suggestedAction: 'Please select a valid time period.',
  },
  [AnalyticsErrorCode.AGGREGATION_ERROR]: {
    code: AnalyticsErrorCode.AGGREGATION_ERROR,
    message: 'Aggregation error',
    description: 'Error occurred during data aggregation operation',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.OPERATION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Could not aggregate data. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [AnalyticsErrorCode.TIMEOUT_ERROR]: {
    code: AnalyticsErrorCode.TIMEOUT_ERROR,
    message: 'Timeout error',
    description: 'Request timed out while processing',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.SYSTEM,
    httpStatus: 504,
    retryable: true,
    userFriendlyMessage: 'Request timed out. Please try again.',
    suggestedAction: 'Reduce the time range or try again later.',
  },
  [AnalyticsErrorCode.RATE_LIMIT_EXCEEDED]: {
    code: AnalyticsErrorCode.RATE_LIMIT_EXCEEDED,
    message: 'Rate limit exceeded',
    description: 'API rate limit has been exceeded',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.SYSTEM,
    httpStatus: 429,
    retryable: true,
    userFriendlyMessage: 'Too many requests. Please wait and try again.',
    suggestedAction: 'Wait for the rate limit to reset.',
  },
  [AnalyticsErrorCode.PERMISSION_DENIED]: {
    code: AnalyticsErrorCode.PERMISSION_DENIED,
    message: 'Permission denied',
    description: 'User does not have permission to access the resource',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.PERMISSION,
    httpStatus: 403,
    retryable: false,
    userFriendlyMessage: 'You do not have permission to access this resource.',
    suggestedAction: 'Contact your administrator for access.',
  },
  [AnalyticsErrorCode.DATABASE_ERROR]: {
    code: AnalyticsErrorCode.DATABASE_ERROR,
    message: 'Database error',
    description: 'Database connection or query execution error',
    severity: AnalyticsErrorSeverity.CRITICAL,
    category: AnalyticsErrorCategory.SYSTEM,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Database error occurred. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [AnalyticsErrorCode.CACHE_ERROR]: {
    code: AnalyticsErrorCode.CACHE_ERROR,
    message: 'Cache error',
    description: 'Cache system encountered an error',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.SYSTEM,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Cache error. Please try again.',
    suggestedAction: 'Try again later.',
  },
  [AnalyticsErrorCode.INVALID_FILTER]: {
    code: AnalyticsErrorCode.INVALID_FILTER,
    message: 'Invalid filter',
    description: 'The provided filter configuration is invalid',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.QUERY,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Invalid filter applied. Please check your filters.',
    suggestedAction: 'Review and correct the filter settings.',
  },
  [AnalyticsErrorCode.INVALID_DIMENSION]: {
    code: AnalyticsErrorCode.INVALID_DIMENSION,
    message: 'Invalid dimension',
    description: 'The specified dimension is invalid or unsupported',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.QUERY,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Invalid dimension selected.',
    suggestedAction: 'Please select a valid dimension.',
  },
  [AnalyticsErrorCode.INVALID_METRIC]: {
    code: AnalyticsErrorCode.INVALID_METRIC,
    message: 'Invalid metric',
    description: 'The specified metric is invalid or unsupported',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.QUERY,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Invalid metric selected.',
    suggestedAction: 'Please select a valid metric.',
  },
  [AnalyticsErrorCode.INVALID_COMPARISON]: {
    code: AnalyticsErrorCode.INVALID_COMPARISON,
    message: 'Invalid comparison',
    description: 'The specified comparison method is invalid',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.QUERY,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Invalid comparison method.',
    suggestedAction: 'Please select a valid comparison method.',
  },
  [AnalyticsErrorCode.INVALID_INTERVAL]: {
    code: AnalyticsErrorCode.INVALID_INTERVAL,
    message: 'Invalid interval',
    description: 'The specified interval is invalid or unsupported',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.QUERY,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Invalid interval selected.',
    suggestedAction: 'Please select a valid interval.',
  },
  [AnalyticsErrorCode.EXPORT_FAILED]: {
    code: AnalyticsErrorCode.EXPORT_FAILED,
    message: 'Export failed',
    description: 'Data export operation failed',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.OPERATION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Export failed. Please try again.',
    suggestedAction: 'Try again later or reduce the data volume.',
  },
  [AnalyticsErrorCode.IMPORT_FAILED]: {
    code: AnalyticsErrorCode.IMPORT_FAILED,
    message: 'Import failed',
    description: 'Data import operation failed',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.OPERATION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Import failed. Please check your file and try again.',
    suggestedAction: 'Check file format and try again.',
  },
  [AnalyticsErrorCode.VALIDATION_FAILED]: {
    code: AnalyticsErrorCode.VALIDATION_FAILED,
    message: 'Validation failed',
    description: 'Data validation failed',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.VALIDATION,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Data validation failed. Please check your data.',
    suggestedAction: 'Review and correct the data.',
  },
  [AnalyticsErrorCode.TRANSFORMATION_FAILED]: {
    code: AnalyticsErrorCode.TRANSFORMATION_FAILED,
    message: 'Transformation failed',
    description: 'Data transformation operation failed',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.OPERATION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Data transformation failed. Please try again.',
    suggestedAction: 'Try again later or contact support.',
  },
  [AnalyticsErrorCode.SYNC_FAILED]: {
    code: AnalyticsErrorCode.SYNC_FAILED,
    message: 'Sync failed',
    description: 'Data synchronization failed',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.OPERATION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Data sync failed. Please try again.',
    suggestedAction: 'Check network connection and try again.',
  },
  [AnalyticsErrorCode.STORAGE_LIMIT_EXCEEDED]: {
    code: AnalyticsErrorCode.STORAGE_LIMIT_EXCEEDED,
    message: 'Storage limit exceeded',
    description: 'Storage capacity limit has been reached',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.RESOURCE,
    httpStatus: 507,
    retryable: false,
    userFriendlyMessage: 'Storage limit exceeded. Please free up space.',
    suggestedAction: 'Delete old data or upgrade storage.',
  },
  [AnalyticsErrorCode.MEMORY_LIMIT_EXCEEDED]: {
    code: AnalyticsErrorCode.MEMORY_LIMIT_EXCEEDED,
    message: 'Memory limit exceeded',
    description: 'Memory capacity limit has been reached',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.RESOURCE,
    httpStatus: 507,
    retryable: true,
    userFriendlyMessage: 'Memory limit exceeded. Please try with less data.',
    suggestedAction: 'Reduce the data volume or time range.',
  },
  [AnalyticsErrorCode.CPU_LIMIT_EXCEEDED]: {
    code: AnalyticsErrorCode.CPU_LIMIT_EXCEEDED,
    message: 'CPU limit exceeded',
    description: 'CPU capacity limit has been reached',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.RESOURCE,
    httpStatus: 507,
    retryable: true,
    userFriendlyMessage: 'CPU limit exceeded. Please try with less data.',
    suggestedAction: 'Reduce the data volume or time range.',
  },
  [AnalyticsErrorCode.NETWORK_ERROR]: {
    code: AnalyticsErrorCode.NETWORK_ERROR,
    message: 'Network error',
    description: 'Network connection error',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.NETWORK,
    httpStatus: 503,
    retryable: true,
    userFriendlyMessage: 'Network error. Please check your connection.',
    suggestedAction: 'Check your network connection and try again.',
  },
  [AnalyticsErrorCode.SSL_ERROR]: {
    code: AnalyticsErrorCode.SSL_ERROR,
    message: 'SSL error',
    description: 'SSL/TLS connection error',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.NETWORK,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'SSL error. Please try again later.',
    suggestedAction: 'Check SSL configuration or try again later.',
  },
  [AnalyticsErrorCode.AUTHENTICATION_FAILED]: {
    code: AnalyticsErrorCode.AUTHENTICATION_FAILED,
    message: 'Authentication failed',
    description: 'User authentication failed',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.PERMISSION,
    httpStatus: 401,
    retryable: false,
    userFriendlyMessage: 'Authentication failed. Please login again.',
    suggestedAction: 'Login again with valid credentials.',
  },
  [AnalyticsErrorCode.AUTHORIZATION_FAILED]: {
    code: AnalyticsErrorCode.AUTHORIZATION_FAILED,
    message: 'Authorization failed',
    description: 'User authorization failed',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.PERMISSION,
    httpStatus: 403,
    retryable: false,
    userFriendlyMessage: 'Authorization failed. Access denied.',
    suggestedAction: 'Contact your administrator for access.',
  },
  [AnalyticsErrorCode.INVALID_API_KEY]: {
    code: AnalyticsErrorCode.INVALID_API_KEY,
    message: 'Invalid API key',
    description: 'Invalid or expired API key',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.SECURITY,
    httpStatus: 401,
    retryable: false,
    userFriendlyMessage: 'Invalid API key. Please check your credentials.',
    suggestedAction: 'Regenerate or update your API key.',
  },
  [AnalyticsErrorCode.SERVICE_UNAVAILABLE]: {
    code: AnalyticsErrorCode.SERVICE_UNAVAILABLE,
    message: 'Service unavailable',
    description: 'Service is currently unavailable',
    severity: AnalyticsErrorSeverity.CRITICAL,
    category: AnalyticsErrorCategory.SYSTEM,
    httpStatus: 503,
    retryable: true,
    userFriendlyMessage: 'Service unavailable. Please try again later.',
    suggestedAction: 'Try again later.',
  },
  [AnalyticsErrorCode.MAINTENANCE_MODE]: {
    code: AnalyticsErrorCode.MAINTENANCE_MODE,
    message: 'Maintenance mode',
    description: 'System is in maintenance mode',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.SYSTEM,
    httpStatus: 503,
    retryable: true,
    userFriendlyMessage: 'System is under maintenance. Please try again later.',
    suggestedAction: 'Wait for maintenance to complete.',
  },
  [AnalyticsErrorCode.FEATURE_NOT_ENABLED]: {
    code: AnalyticsErrorCode.FEATURE_NOT_ENABLED,
    message: 'Feature not enabled',
    description: 'Requested feature is not enabled',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.SYSTEM,
    httpStatus: 403,
    retryable: false,
    userFriendlyMessage: 'This feature is not enabled for your account.',
    suggestedAction: 'Contact support to enable this feature.',
  },
  [AnalyticsErrorCode.INSUFFICIENT_QUOTA]: {
    code: AnalyticsErrorCode.INSUFFICIENT_QUOTA,
    message: 'Insufficient quota',
    description: 'User has insufficient quota for the request',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.RESOURCE,
    httpStatus: 403,
    retryable: false,
    userFriendlyMessage: 'Insufficient quota. Please upgrade your plan.',
    suggestedAction: 'Upgrade your plan or free up quota.',
  },
  [AnalyticsErrorCode.DATA_CORRUPTION]: {
    code: AnalyticsErrorCode.DATA_CORRUPTION,
    message: 'Data corruption',
    description: 'Data corruption detected',
    severity: AnalyticsErrorSeverity.CRITICAL,
    category: AnalyticsErrorCategory.DATA,
    httpStatus: 500,
    retryable: false,
    userFriendlyMessage: 'Data corruption detected. Please contact support.',
    suggestedAction: 'Contact support immediately.',
  },
  [AnalyticsErrorCode.SCHEMA_MISMATCH]: {
    code: AnalyticsErrorCode.SCHEMA_MISMATCH,
    message: 'Schema mismatch',
    description: 'Data schema mismatch',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.DATA,
    httpStatus: 500,
    retryable: false,
    userFriendlyMessage: 'Schema mismatch. Please check data compatibility.',
    suggestedAction: 'Update data schema or request migration.',
  },
  [AnalyticsErrorCode.VERSION_MISMATCH]: {
    code: AnalyticsErrorCode.VERSION_MISMATCH,
    message: 'Version mismatch',
    description: 'API version mismatch',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.SYSTEM,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'API version mismatch. Please update your client.',
    suggestedAction: 'Update to the latest API version.',
  },
  [AnalyticsErrorCode.SERIALIZATION_ERROR]: {
    code: AnalyticsErrorCode.SERIALIZATION_ERROR,
    message: 'Serialization error',
    description: 'Data serialization failed',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.OPERATION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Serialization error. Please try again.',
    suggestedAction: 'Check data types and try again.',
  },
  [AnalyticsErrorCode.DESERIALIZATION_ERROR]: {
    code: AnalyticsErrorCode.DESERIALIZATION_ERROR,
    message: 'Deserialization error',
    description: 'Data deserialization failed',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.OPERATION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Deserialization error. Please check data format.',
    suggestedAction: 'Verify data format and try again.',
  },
  [AnalyticsErrorCode.FILE_NOT_FOUND]: {
    code: AnalyticsErrorCode.FILE_NOT_FOUND,
    message: 'File not found',
    description: 'The specified file could not be found',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.FILE,
    httpStatus: 404,
    retryable: false,
    userFriendlyMessage: 'File not found. Please check the file path.',
    suggestedAction: 'Verify the file path and try again.',
  },
  [AnalyticsErrorCode.DIRECTORY_NOT_FOUND]: {
    code: AnalyticsErrorCode.DIRECTORY_NOT_FOUND,
    message: 'Directory not found',
    description: 'The specified directory could not be found',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.FILE,
    httpStatus: 404,
    retryable: false,
    userFriendlyMessage: 'Directory not found. Please check the path.',
    suggestedAction: 'Verify the directory path and try again.',
  },
  [AnalyticsErrorCode.FILE_READ_ERROR]: {
    code: AnalyticsErrorCode.FILE_READ_ERROR,
    message: 'File read error',
    description: 'Error reading the file',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.FILE,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'File read error. Please try again.',
    suggestedAction: 'Check file permissions and try again.',
  },
  [AnalyticsErrorCode.FILE_WRITE_ERROR]: {
    code: AnalyticsErrorCode.FILE_WRITE_ERROR,
    message: 'File write error',
    description: 'Error writing to the file',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.FILE,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'File write error. Please try again.',
    suggestedAction: 'Check disk space and permissions.',
  },
  [AnalyticsErrorCode.UNSUPPORTED_FILE_FORMAT]: {
    code: AnalyticsErrorCode.UNSUPPORTED_FILE_FORMAT,
    message: 'Unsupported file format',
    description: 'The file format is not supported',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.FILE,
    httpStatus: 400,
    retryable: false,
    userFriendlyMessage: 'Unsupported file format. Please use a supported format.',
    suggestedAction: 'Convert the file to a supported format.',
  },
  [AnalyticsErrorCode.COMPRESSION_ERROR]: {
    code: AnalyticsErrorCode.COMPRESSION_ERROR,
    message: 'Compression error',
    description: 'Error compressing data',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.OPERATION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Compression error. Please try again.',
    suggestedAction: 'Try again or contact support.',
  },
  [AnalyticsErrorCode.DECOMPRESSION_ERROR]: {
    code: AnalyticsErrorCode.DECOMPRESSION_ERROR,
    message: 'Decompression error',
    description: 'Error decompressing data',
    severity: AnalyticsErrorSeverity.MEDIUM,
    category: AnalyticsErrorCategory.OPERATION,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Decompression error. Please check the file.',
    suggestedAction: 'Verify the file integrity and try again.',
  },
  [AnalyticsErrorCode.ENCRYPTION_ERROR]: {
    code: AnalyticsErrorCode.ENCRYPTION_ERROR,
    message: 'Encryption error',
    description: 'Error encrypting data',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.SECURITY,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Encryption error. Please try again.',
    suggestedAction: 'Try again or contact support.',
  },
  [AnalyticsErrorCode.DECRYPTION_ERROR]: {
    code: AnalyticsErrorCode.DECRYPTION_ERROR,
    message: 'Decryption error',
    description: 'Error decrypting data',
    severity: AnalyticsErrorSeverity.HIGH,
    category: AnalyticsErrorCategory.SECURITY,
    httpStatus: 500,
    retryable: true,
    userFriendlyMessage: 'Decryption error. Please try again.',
    suggestedAction: 'Verify the encryption key and try again.',
  },
};

/**
 * Get error config by code
 */
export function getErrorConfig(code: AnalyticsErrorCode): AnalyticsErrorConfig | undefined {
  return ANALYTICS_ERROR_CONFIG[code];
}

/**
 * Get error message
 */
export function getErrorMessage(code: AnalyticsErrorCode): string {
  return ANALYTICS_ERROR_CONFIG[code]?.message || 'Unknown error';
}

/**
 * Get error description
 */
export function getErrorDescription(code: AnalyticsErrorCode): string {
  return ANALYTICS_ERROR_CONFIG[code]?.description || 'No description available';
}

/**
 * Get error severity
 */
export function getErrorSeverity(code: AnalyticsErrorCode): AnalyticsErrorSeverity {
  return ANALYTICS_ERROR_CONFIG[code]?.severity || AnalyticsErrorSeverity.MEDIUM;
}

/**
 * Get error category
 */
export function getErrorCategory(code: AnalyticsErrorCode): AnalyticsErrorCategory {
  return ANALYTICS_ERROR_CONFIG[code]?.category || AnalyticsErrorCategory.SYSTEM;
}

/**
 * Check if error is retryable
 */
export function isErrorRetryable(code: AnalyticsErrorCode): boolean {
  return ANALYTICS_ERROR_CONFIG[code]?.retryable || false;
}

/**
 * Get user-friendly message
 */
export function getUserFriendlyMessage(code: AnalyticsErrorCode): string {
  return (
    ANALYTICS_ERROR_CONFIG[code]?.userFriendlyMessage || 'An error occurred. Please try again.'
  );
}

/**
 * Get suggested action
 */
export function getSuggestedAction(code: AnalyticsErrorCode): string | undefined {
  return ANALYTICS_ERROR_CONFIG[code]?.suggestedAction;
}

/**
 * Get HTTP status code
 */
export function getErrorHttpStatus(code: AnalyticsErrorCode): number | undefined {
  return ANALYTICS_ERROR_CONFIG[code]?.httpStatus;
}

/**
 * Get errors by category
 */
export function getErrorsByCategory(category: AnalyticsErrorCategory): AnalyticsErrorCode[] {
  return Object.entries(ANALYTICS_ERROR_CONFIG)
    .filter(([_, config]) => config.category === category)
    .map(([code]) => code as AnalyticsErrorCode);
}

/**
 * Get errors by severity
 */
export function getErrorsBySeverity(severity: AnalyticsErrorSeverity): AnalyticsErrorCode[] {
  return Object.entries(ANALYTICS_ERROR_CONFIG)
    .filter(([_, config]) => config.severity === severity)
    .map(([code]) => code as AnalyticsErrorCode);
}

/**
 * Get critical errors
 */
export function getCriticalErrors(): AnalyticsErrorCode[] {
  return getErrorsBySeverity(AnalyticsErrorSeverity.CRITICAL);
}

/**
 * Get retryable errors
 */
export function getRetryableErrors(): AnalyticsErrorCode[] {
  return Object.entries(ANALYTICS_ERROR_CONFIG)
    .filter(([_, config]) => config.retryable)
    .map(([code]) => code as AnalyticsErrorCode);
}

/**
 * Create error object
 */
export interface AnalyticsError {
  code: AnalyticsErrorCode;
  message: string;
  details?: Record<string, unknown>;
  timestamp: Date;
}

/**
 * Create error
 */
export function createError(
  code: AnalyticsErrorCode,
  details?: Record<string, unknown>
): AnalyticsError {
  return {
    code,
    message: getErrorMessage(code),
    details,
    timestamp: new Date(),
  };
}
