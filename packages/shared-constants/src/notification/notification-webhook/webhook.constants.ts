/**
 * Webhook Constants
 * Core webhook notification configuration and settings
 */

export const NOTIFICATIONWEBHOOK = {
  // Webhook Types
  TYPES: {
    OUTGOING: 'outgoing',
    INCOMING: 'incoming',
    BOTH: 'both',
    CUSTOM: 'custom',
  } as const,

  // Webhook Categories
  CATEGORIES: {
    SYSTEM: 'system',
    TRANSACTIONAL: 'transactional',
    OPERATIONAL: 'operational',
    MARKETING: 'marketing',
    INTEGRATION: 'integration',
    MONITORING: 'monitoring',
    ALERT: 'alert',
    CUSTOM: 'custom',
  } as const,

  // Webhook Methods
  METHODS: {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS',
  } as const,

  // Webhook Formats
  FORMATS: {
    JSON: 'json',
    XML: 'xml',
    FORM: 'form',
    PLAIN: 'plain',
    HTML: 'html',
    CUSTOM: 'custom',
  } as const,

  // Webhook Auth Types
  AUTH_TYPES: {
    NONE: 'none',
    BASIC: 'basic',
    BEARER: 'bearer',
    API_KEY: 'api_key',
    OAUTH2: 'oauth2',
    HMAC: 'hmac',
    CUSTOM: 'custom',
  } as const,

  // Webhook Retry Strategies
  RETRY_STRATEGIES: {
    FIXED: 'fixed',
    EXPONENTIAL: 'exponential',
    LINEAR: 'linear',
    NONE: 'none',
    CUSTOM: 'custom',
  } as const,

  // Webhook Defaults
  DEFAULTS: {
    DEFAULT_TYPE: 'outgoing',
    DEFAULT_CATEGORY: 'integration',
    DEFAULT_METHOD: 'POST',
    DEFAULT_FORMAT: 'json',
    DEFAULT_AUTH_TYPE: 'none',
    DEFAULT_RETRY_STRATEGY: 'exponential',
    DEFAULT_TIMEOUT: 30000,
    DEFAULT_RETRY_ATTEMPTS: 3,
    DEFAULT_RETRY_DELAY: 5000,
    MAX_RETRY_ATTEMPTS: 10,
    MAX_TIMEOUT: 120000,
    DEFAULT_BATCH_SIZE: 100,
    DEFAULT_MAX_PAYLOAD_SIZE: 1048576,
    DEFAULT_CONCURRENT_LIMIT: 10,
  } as const,

  // Webhook Limits
  LIMITS: {
    MIN_URL_LENGTH: 5,
    MAX_URL_LENGTH: 2000,
    MAX_HEADERS: 50,
    MAX_PAYLOAD_SIZE_KB: 1024,
    MAX_TIMEOUT_MS: 120000,
    MIN_TIMEOUT_MS: 1000,
    MAX_RETRY_ATTEMPTS: 10,
    MAX_CONCURRENT: 50,
    MAX_BATCH_SIZE: 1000,
    MAX_SECRET_LENGTH: 100,
  } as const,

  // Webhook Errors
  ERRORS: {
    REQUEST_FAILED: 'request_failed',
    TIMEOUT: 'timeout',
    INVALID_URL: 'invalid_url',
    INVALID_PAYLOAD: 'invalid_payload',
    AUTHENTICATION_FAILED: 'authentication_failed',
    RATE_LIMIT: 'rate_limit',
    NETWORK_ERROR: 'network_error',
    SSL_ERROR: 'ssl_error',
    PARSE_ERROR: 'parse_error',
    SERVER_ERROR: 'server_error',
    CLIENT_ERROR: 'client_error',
  } as const,
} as const;

// Webhook Types
export type NotificationWebhookType =
  (typeof NOTIFICATIONWEBHOOK.TYPES)[keyof typeof NOTIFICATIONWEBHOOK.TYPES];

// Webhook Categories
export type NotificationWebhookCategory =
  (typeof NOTIFICATIONWEBHOOK.CATEGORIES)[keyof typeof NOTIFICATIONWEBHOOK.CATEGORIES];

// Webhook Methods
export type NotificationWebhookMethod =
  (typeof NOTIFICATIONWEBHOOK.METHODS)[keyof typeof NOTIFICATIONWEBHOOK.METHODS];

// Webhook Formats
export type NotificationWebhookFormat =
  (typeof NOTIFICATIONWEBHOOK.FORMATS)[keyof typeof NOTIFICATIONWEBHOOK.FORMATS];

// Webhook Auth Types
export type NotificationWebhookAuthType =
  (typeof NOTIFICATIONWEBHOOK.AUTH_TYPES)[keyof typeof NOTIFICATIONWEBHOOK.AUTH_TYPES];

// Webhook Retry Strategies
export type NotificationWebhookRetryStrategy =
  (typeof NOTIFICATIONWEBHOOK.RETRY_STRATEGIES)[keyof typeof NOTIFICATIONWEBHOOK.RETRY_STRATEGIES];

// Webhook Defaults
export type NotificationWebhookDefault =
  (typeof NOTIFICATIONWEBHOOK.DEFAULTS)[keyof typeof NOTIFICATIONWEBHOOK.DEFAULTS];

// Webhook Limits
export type NotificationWebhookLimit =
  (typeof NOTIFICATIONWEBHOOK.LIMITS)[keyof typeof NOTIFICATIONWEBHOOK.LIMITS];

// Webhook Errors
export type NotificationWebhookError =
  (typeof NOTIFICATIONWEBHOOK.ERRORS)[keyof typeof NOTIFICATIONWEBHOOK.ERRORS];

// Utility Functions
export function notificationwebhookGetTypeLabel(type: NotificationWebhookType): string {
  const labels: Record<NotificationWebhookType, string> = {
    [NOTIFICATIONWEBHOOK.TYPES.OUTGOING]: 'Outgoing',
    [NOTIFICATIONWEBHOOK.TYPES.INCOMING]: 'Incoming',
    [NOTIFICATIONWEBHOOK.TYPES.BOTH]: 'Both',
    [NOTIFICATIONWEBHOOK.TYPES.CUSTOM]: 'Custom',
  };
  return labels[type] || 'Unknown Webhook Type';
}

export function notificationwebhookGetCategoryLabel(category: NotificationWebhookCategory): string {
  const labels: Record<NotificationWebhookCategory, string> = {
    [NOTIFICATIONWEBHOOK.CATEGORIES.SYSTEM]: 'System',
    [NOTIFICATIONWEBHOOK.CATEGORIES.TRANSACTIONAL]: 'Transactional',
    [NOTIFICATIONWEBHOOK.CATEGORIES.OPERATIONAL]: 'Operational',
    [NOTIFICATIONWEBHOOK.CATEGORIES.MARKETING]: 'Marketing',
    [NOTIFICATIONWEBHOOK.CATEGORIES.INTEGRATION]: 'Integration',
    [NOTIFICATIONWEBHOOK.CATEGORIES.MONITORING]: 'Monitoring',
    [NOTIFICATIONWEBHOOK.CATEGORIES.ALERT]: 'Alert',
    [NOTIFICATIONWEBHOOK.CATEGORIES.CUSTOM]: 'Custom',
  };
  return labels[category] || 'Unknown Category';
}

export function notificationwebhookGetMethodLabel(method: NotificationWebhookMethod): string {
  const labels: Record<NotificationWebhookMethod, string> = {
    [NOTIFICATIONWEBHOOK.METHODS.GET]: 'GET',
    [NOTIFICATIONWEBHOOK.METHODS.POST]: 'POST',
    [NOTIFICATIONWEBHOOK.METHODS.PUT]: 'PUT',
    [NOTIFICATIONWEBHOOK.METHODS.PATCH]: 'PATCH',
    [NOTIFICATIONWEBHOOK.METHODS.DELETE]: 'DELETE',
    [NOTIFICATIONWEBHOOK.METHODS.HEAD]: 'HEAD',
    [NOTIFICATIONWEBHOOK.METHODS.OPTIONS]: 'OPTIONS',
  };
  return labels[method] || 'Unknown Method';
}

export function notificationwebhookGetFormatLabel(format: NotificationWebhookFormat): string {
  const labels: Record<NotificationWebhookFormat, string> = {
    [NOTIFICATIONWEBHOOK.FORMATS.JSON]: 'JSON',
    [NOTIFICATIONWEBHOOK.FORMATS.XML]: 'XML',
    [NOTIFICATIONWEBHOOK.FORMATS.FORM]: 'Form',
    [NOTIFICATIONWEBHOOK.FORMATS.PLAIN]: 'Plain',
    [NOTIFICATIONWEBHOOK.FORMATS.HTML]: 'HTML',
    [NOTIFICATIONWEBHOOK.FORMATS.CUSTOM]: 'Custom',
  };
  return labels[format] || 'Unknown Format';
}

export function notificationwebhookGetAuthTypeLabel(authType: NotificationWebhookAuthType): string {
  const labels: Record<NotificationWebhookAuthType, string> = {
    [NOTIFICATIONWEBHOOK.AUTH_TYPES.NONE]: 'None',
    [NOTIFICATIONWEBHOOK.AUTH_TYPES.BASIC]: 'Basic Auth',
    [NOTIFICATIONWEBHOOK.AUTH_TYPES.BEARER]: 'Bearer Token',
    [NOTIFICATIONWEBHOOK.AUTH_TYPES.API_KEY]: 'API Key',
    [NOTIFICATIONWEBHOOK.AUTH_TYPES.OAUTH2]: 'OAuth2',
    [NOTIFICATIONWEBHOOK.AUTH_TYPES.HMAC]: 'HMAC',
    [NOTIFICATIONWEBHOOK.AUTH_TYPES.CUSTOM]: 'Custom',
  };
  return labels[authType] || 'Unknown Auth Type';
}

export function notificationwebhookGetRetryStrategyLabel(
  strategy: NotificationWebhookRetryStrategy
): string {
  const labels: Record<NotificationWebhookRetryStrategy, string> = {
    [NOTIFICATIONWEBHOOK.RETRY_STRATEGIES.FIXED]: 'Fixed',
    [NOTIFICATIONWEBHOOK.RETRY_STRATEGIES.EXPONENTIAL]: 'Exponential',
    [NOTIFICATIONWEBHOOK.RETRY_STRATEGIES.LINEAR]: 'Linear',
    [NOTIFICATIONWEBHOOK.RETRY_STRATEGIES.NONE]: 'None',
    [NOTIFICATIONWEBHOOK.RETRY_STRATEGIES.CUSTOM]: 'Custom',
  };
  return labels[strategy] || 'Unknown Retry Strategy';
}

export function notificationwebhookGetErrorLabel(error: NotificationWebhookError): string {
  const labels: Record<NotificationWebhookError, string> = {
    [NOTIFICATIONWEBHOOK.ERRORS.REQUEST_FAILED]: 'Request Failed',
    [NOTIFICATIONWEBHOOK.ERRORS.TIMEOUT]: 'Timeout',
    [NOTIFICATIONWEBHOOK.ERRORS.INVALID_URL]: 'Invalid URL',
    [NOTIFICATIONWEBHOOK.ERRORS.INVALID_PAYLOAD]: 'Invalid Payload',
    [NOTIFICATIONWEBHOOK.ERRORS.AUTHENTICATION_FAILED]: 'Authentication Failed',
    [NOTIFICATIONWEBHOOK.ERRORS.RATE_LIMIT]: 'Rate Limit',
    [NOTIFICATIONWEBHOOK.ERRORS.NETWORK_ERROR]: 'Network Error',
    [NOTIFICATIONWEBHOOK.ERRORS.SSL_ERROR]: 'SSL Error',
    [NOTIFICATIONWEBHOOK.ERRORS.PARSE_ERROR]: 'Parse Error',
    [NOTIFICATIONWEBHOOK.ERRORS.SERVER_ERROR]: 'Server Error',
    [NOTIFICATIONWEBHOOK.ERRORS.CLIENT_ERROR]: 'Client Error',
  };
  return labels[error] || 'Unknown Error';
}

export function notificationwebhookGetDefaultTimeout(): number {
  return NOTIFICATIONWEBHOOK.DEFAULTS.DEFAULT_TIMEOUT;
}

export function notificationwebhookGetDefaultRetryAttempts(): number {
  return NOTIFICATIONWEBHOOK.DEFAULTS.DEFAULT_RETRY_ATTEMPTS;
}

export function notificationwebhookIsOutgoing(type: NotificationWebhookType): boolean {
  return type === NOTIFICATIONWEBHOOK.TYPES.OUTGOING || type === NOTIFICATIONWEBHOOK.TYPES.BOTH;
}

export function notificationwebhookIsIncoming(type: NotificationWebhookType): boolean {
  return type === NOTIFICATIONWEBHOOK.TYPES.INCOMING || type === NOTIFICATIONWEBHOOK.TYPES.BOTH;
}

export function notificationwebhookIsSystemCategory(
  category: NotificationWebhookCategory
): boolean {
  const systemCategories: NotificationWebhookCategory[] = [
    NOTIFICATIONWEBHOOK.CATEGORIES.SYSTEM,
    NOTIFICATIONWEBHOOK.CATEGORIES.MONITORING,
    NOTIFICATIONWEBHOOK.CATEGORIES.ALERT,
  ];
  return systemCategories.includes(category);
}
