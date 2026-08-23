/**
 * Notification Error Constants
 * Error definitions for notification system
 */

export const NOTIFICATION_ERROR = {
  // Error Categories
  CATEGORIES: {
    SYSTEM: 'system',
    NETWORK: 'network',
    AUTHENTICATION: 'authentication',
    AUTHORIZATION: 'authorization',
    VALIDATION: 'validation',
    DELIVERY: 'delivery',
    CONFIGURATION: 'configuration',
    RESOURCE: 'resource',
    RATE_LIMIT: 'rate_limit',
    TIMEOUT: 'timeout',
    UNKNOWN: 'unknown',
  } as const,

  // Error Codes
  CODES: {
    // System Errors
    SYSTEM_ERROR: 'system_error',
    INTERNAL_ERROR: 'internal_error',
    SERVICE_UNAVAILABLE: 'service_unavailable',

    // Network Errors
    NETWORK_ERROR: 'network_error',
    CONNECTION_FAILED: 'connection_failed',
    DNS_ERROR: 'dns_error',
    SSL_ERROR: 'ssl_error',

    // Authentication Errors
    AUTH_FAILED: 'auth_failed',
    INVALID_TOKEN: 'invalid_token',
    TOKEN_EXPIRED: 'token_expired',
    INVALID_CREDENTIALS: 'invalid_credentials',

    // Authorization Errors
    PERMISSION_DENIED: 'permission_denied',
    INSUFFICIENT_PERMISSIONS: 'insufficient_permissions',
    ROLE_REQUIRED: 'role_required',

    // Validation Errors
    INVALID_REQUEST: 'invalid_request',
    INVALID_PARAMETER: 'invalid_parameter',
    MISSING_PARAMETER: 'missing_parameter',
    INVALID_FORMAT: 'invalid_format',

    // Delivery Errors
    DELIVERY_FAILED: 'delivery_failed',
    SEND_FAILED: 'send_failed',
    BOUNCE_ERROR: 'bounce_error',
    SPAM_ERROR: 'spam_error',

    // Configuration Errors
    CONFIG_ERROR: 'config_error',
    INVALID_CONFIG: 'invalid_config',
    MISSING_CONFIG: 'missing_config',

    // Resource Errors
    RESOURCE_NOT_FOUND: 'resource_not_found',
    RESOURCE_EXHAUSTED: 'resource_exhausted',
    RESOURCE_LIMIT: 'resource_limit',

    // Rate Limit Errors
    RATE_LIMIT_EXCEEDED: 'rate_limit_exceeded',
    QUOTA_EXCEEDED: 'quota_exceeded',

    // Timeout Errors
    TIMEOUT_ERROR: 'timeout_error',
    REQUEST_TIMEOUT: 'request_timeout',
    RESPONSE_TIMEOUT: 'response_timeout',

    // Unknown Errors
    UNKNOWN_ERROR: 'unknown_error',
  } as const,

  // Error Severities
  SEVERITIES: {
    CRITICAL: 'critical',
    HIGH: 'high',
    MEDIUM: 'medium',
    LOW: 'low',
  } as const,

  // Error Status Codes (HTTP)
  HTTP_STATUS: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
  } as const,

  // Error Retry Strategies
  RETRY_STRATEGIES: {
    IMMEDIATE: 'immediate',
    FIXED: 'fixed',
    EXPONENTIAL: 'exponential',
    NONE: 'none',
  } as const,

  // Error Defaults
  DEFAULTS: {
    DEFAULT_SEVERITY: 'medium',
    DEFAULT_RETRY_STRATEGY: 'exponential',
    DEFAULT_RETRY_ATTEMPTS: 3,
    DEFAULT_RETRY_DELAY: 5000,
    DEFAULT_TIMEOUT: 30000,
  } as const,
} as const;

// Error Categories
export type NotificationErrorCategory =
  (typeof NOTIFICATION_ERROR.CATEGORIES)[keyof typeof NOTIFICATION_ERROR.CATEGORIES];

// Error Codes
export type NotificationErrorCode =
  (typeof NOTIFICATION_ERROR.CODES)[keyof typeof NOTIFICATION_ERROR.CODES];

// Error Severities
export type NotificationErrorSeverity =
  (typeof NOTIFICATION_ERROR.SEVERITIES)[keyof typeof NOTIFICATION_ERROR.SEVERITIES];

// Error Status Codes
export type NotificationErrorHttpStatus =
  (typeof NOTIFICATION_ERROR.HTTP_STATUS)[keyof typeof NOTIFICATION_ERROR.HTTP_STATUS];

// Error Retry Strategies
export type NotificationErrorRetryStrategy =
  (typeof NOTIFICATION_ERROR.RETRY_STRATEGIES)[keyof typeof NOTIFICATION_ERROR.RETRY_STRATEGIES];

// Error Defaults
export type NotificationErrorDefault =
  (typeof NOTIFICATION_ERROR.DEFAULTS)[keyof typeof NOTIFICATION_ERROR.DEFAULTS];

// Utility Functions
export function notificationerrorGetCategoryLabel(category: NotificationErrorCategory): string {
  const labels: Record<NotificationErrorCategory, string> = {
    [NOTIFICATION_ERROR.CATEGORIES.SYSTEM]: 'System Error',
    [NOTIFICATION_ERROR.CATEGORIES.NETWORK]: 'Network Error',
    [NOTIFICATION_ERROR.CATEGORIES.AUTHENTICATION]: 'Authentication Error',
    [NOTIFICATION_ERROR.CATEGORIES.AUTHORIZATION]: 'Authorization Error',
    [NOTIFICATION_ERROR.CATEGORIES.VALIDATION]: 'Validation Error',
    [NOTIFICATION_ERROR.CATEGORIES.DELIVERY]: 'Delivery Error',
    [NOTIFICATION_ERROR.CATEGORIES.CONFIGURATION]: 'Configuration Error',
    [NOTIFICATION_ERROR.CATEGORIES.RESOURCE]: 'Resource Error',
    [NOTIFICATION_ERROR.CATEGORIES.RATE_LIMIT]: 'Rate Limit Error',
    [NOTIFICATION_ERROR.CATEGORIES.TIMEOUT]: 'Timeout Error',
    [NOTIFICATION_ERROR.CATEGORIES.UNKNOWN]: 'Unknown Error',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationerrorGetCodeLabel(code: NotificationErrorCode): string {
  const labels: Record<NotificationErrorCode, string> = {
    // System Errors
    [NOTIFICATION_ERROR.CODES.SYSTEM_ERROR]: 'System Error',
    [NOTIFICATION_ERROR.CODES.INTERNAL_ERROR]: 'Internal Error',
    [NOTIFICATION_ERROR.CODES.SERVICE_UNAVAILABLE]: 'Service Unavailable',

    // Network Errors
    [NOTIFICATION_ERROR.CODES.NETWORK_ERROR]: 'Network Error',
    [NOTIFICATION_ERROR.CODES.CONNECTION_FAILED]: 'Connection Failed',
    [NOTIFICATION_ERROR.CODES.DNS_ERROR]: 'DNS Error',
    [NOTIFICATION_ERROR.CODES.SSL_ERROR]: 'SSL Error',

    // Authentication Errors
    [NOTIFICATION_ERROR.CODES.AUTH_FAILED]: 'Authentication Failed',
    [NOTIFICATION_ERROR.CODES.INVALID_TOKEN]: 'Invalid Token',
    [NOTIFICATION_ERROR.CODES.TOKEN_EXPIRED]: 'Token Expired',
    [NOTIFICATION_ERROR.CODES.INVALID_CREDENTIALS]: 'Invalid Credentials',

    // Authorization Errors
    [NOTIFICATION_ERROR.CODES.PERMISSION_DENIED]: 'Permission Denied',
    [NOTIFICATION_ERROR.CODES.INSUFFICIENT_PERMISSIONS]: 'Insufficient Permissions',
    [NOTIFICATION_ERROR.CODES.ROLE_REQUIRED]: 'Role Required',

    // Validation Errors
    [NOTIFICATION_ERROR.CODES.INVALID_REQUEST]: 'Invalid Request',
    [NOTIFICATION_ERROR.CODES.INVALID_PARAMETER]: 'Invalid Parameter',
    [NOTIFICATION_ERROR.CODES.MISSING_PARAMETER]: 'Missing Parameter',
    [NOTIFICATION_ERROR.CODES.INVALID_FORMAT]: 'Invalid Format',

    // Delivery Errors
    [NOTIFICATION_ERROR.CODES.DELIVERY_FAILED]: 'Delivery Failed',
    [NOTIFICATION_ERROR.CODES.SEND_FAILED]: 'Send Failed',
    [NOTIFICATION_ERROR.CODES.BOUNCE_ERROR]: 'Bounce Error',
    [NOTIFICATION_ERROR.CODES.SPAM_ERROR]: 'Spam Error',

    // Configuration Errors
    [NOTIFICATION_ERROR.CODES.CONFIG_ERROR]: 'Configuration Error',
    [NOTIFICATION_ERROR.CODES.INVALID_CONFIG]: 'Invalid Configuration',
    [NOTIFICATION_ERROR.CODES.MISSING_CONFIG]: 'Missing Configuration',

    // Resource Errors
    [NOTIFICATION_ERROR.CODES.RESOURCE_NOT_FOUND]: 'Resource Not Found',
    [NOTIFICATION_ERROR.CODES.RESOURCE_EXHAUSTED]: 'Resource Exhausted',
    [NOTIFICATION_ERROR.CODES.RESOURCE_LIMIT]: 'Resource Limit',

    // Rate Limit Errors
    [NOTIFICATION_ERROR.CODES.RATE_LIMIT_EXCEEDED]: 'Rate Limit Exceeded',
    [NOTIFICATION_ERROR.CODES.QUOTA_EXCEEDED]: 'Quota Exceeded',

    // Timeout Errors
    [NOTIFICATION_ERROR.CODES.TIMEOUT_ERROR]: 'Timeout Error',
    [NOTIFICATION_ERROR.CODES.REQUEST_TIMEOUT]: 'Request Timeout',
    [NOTIFICATION_ERROR.CODES.RESPONSE_TIMEOUT]: 'Response Timeout',

    // Unknown Errors
    [NOTIFICATION_ERROR.CODES.UNKNOWN_ERROR]: 'Unknown Error',
  };
  return labels[code] || 'Unknown Error Code';
}

export function notificationerrorGetSeverityLabel(severity: NotificationErrorSeverity): string {
  const labels: Record<NotificationErrorSeverity, string> = {
    [NOTIFICATION_ERROR.SEVERITIES.CRITICAL]: 'Critical',
    [NOTIFICATION_ERROR.SEVERITIES.HIGH]: 'High',
    [NOTIFICATION_ERROR.SEVERITIES.MEDIUM]: 'Medium',
    [NOTIFICATION_ERROR.SEVERITIES.LOW]: 'Low',
  };
  return labels[severity] || 'Unknown Severity';
}

export function notificationerrorGetRetryStrategyLabel(
  strategy: NotificationErrorRetryStrategy
): string {
  const labels: Record<NotificationErrorRetryStrategy, string> = {
    [NOTIFICATION_ERROR.RETRY_STRATEGIES.IMMEDIATE]: 'Immediate',
    [NOTIFICATION_ERROR.RETRY_STRATEGIES.FIXED]: 'Fixed',
    [NOTIFICATION_ERROR.RETRY_STRATEGIES.EXPONENTIAL]: 'Exponential',
    [NOTIFICATION_ERROR.RETRY_STRATEGIES.NONE]: 'None',
  };
  return labels[strategy] || 'Unknown Retry Strategy';
}

export function notificationerrorIsSystemError(category: NotificationErrorCategory): boolean {
  return category === NOTIFICATION_ERROR.CATEGORIES.SYSTEM;
}

export function notificationerrorIsNetworkError(category: NotificationErrorCategory): boolean {
  return category === NOTIFICATION_ERROR.CATEGORIES.NETWORK;
}

export function notificationerrorIsAuthError(category: NotificationErrorCategory): boolean {
  const authCategories: NotificationErrorCategory[] = [
    NOTIFICATION_ERROR.CATEGORIES.AUTHENTICATION,
    NOTIFICATION_ERROR.CATEGORIES.AUTHORIZATION,
  ];
  return authCategories.includes(category);
}

export function notificationerrorIsDeliveryError(category: NotificationErrorCategory): boolean {
  return category === NOTIFICATION_ERROR.CATEGORIES.DELIVERY;
}

export function notificationerrorIsRetryable(code: NotificationErrorCode): boolean {
  const retryableCodes: NotificationErrorCode[] = [
    NOTIFICATION_ERROR.CODES.NETWORK_ERROR,
    NOTIFICATION_ERROR.CODES.CONNECTION_FAILED,
    NOTIFICATION_ERROR.CODES.TIMEOUT_ERROR,
    NOTIFICATION_ERROR.CODES.REQUEST_TIMEOUT,
    NOTIFICATION_ERROR.CODES.RESPONSE_TIMEOUT,
    NOTIFICATION_ERROR.CODES.RATE_LIMIT_EXCEEDED,
    NOTIFICATION_ERROR.CODES.SERVICE_UNAVAILABLE,
    NOTIFICATION_ERROR.CODES.DELIVERY_FAILED,
    NOTIFICATION_ERROR.CODES.SEND_FAILED,
    NOTIFICATION_ERROR.CODES.BOUNCE_ERROR,
  ];
  return retryableCodes.includes(code);
}

export function notificationerrorGetDefaultRetryAttempts(): number {
  return NOTIFICATION_ERROR.DEFAULTS.DEFAULT_RETRY_ATTEMPTS;
}

export function notificationerrorGetDefaultRetryDelay(): number {
  return NOTIFICATION_ERROR.DEFAULTS.DEFAULT_RETRY_DELAY;
}

export function notificationerrorGetDefaultTimeout(): number {
  return NOTIFICATION_ERROR.DEFAULTS.DEFAULT_TIMEOUT;
}
