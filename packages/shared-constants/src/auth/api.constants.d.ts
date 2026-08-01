/**
 * API constants for the monorepo
 * All API-related constants are centralized here for consistent API management
 */
/**
 * API versioning constants
 */
export declare const API_VERSIONS: {
    /**
     * Version 1 - Current stable version
     */
    readonly V1: "v1";
    /**
     * Version 2 - Beta/Experimental version
     */
    readonly V2: "v2";
    /**
     * Version 3 - Future version
     */
    readonly V3: "v3";
    /**
     * Latest version alias
     */
    readonly LATEST: "v1";
    /**
     * Default version
     */
    readonly DEFAULT: "v1";
};
export type APIVersion = (typeof API_VERSIONS)[keyof typeof API_VERSIONS];
/**
 * API version prefix for routes
 */
export declare const API_VERSION_PREFIXES: {
    readonly v1: "/api/v1";
    readonly v2: "/api/v2";
    readonly v3: "/api/v3";
};
export type APIVersionPrefix = (typeof API_VERSION_PREFIXES)[keyof typeof API_VERSION_PREFIXES];
/**
 * Base API routes
 */
export declare const API_BASE_ROUTES: {
    /**
     * Authentication routes
     */
    readonly AUTH: "/auth";
    /**
     * User routes
     */
    readonly USERS: "/users";
    /**
     * Admin routes
     */
    readonly ADMIN: "/admin";
    /**
     * Product routes
     */
    readonly PRODUCTS: "/products";
    /**
     * Order routes
     */
    readonly ORDERS: "/orders";
    /**
     * Payment routes
     */
    readonly PAYMENTS: "/payments";
    /**
     * Content routes
     */
    readonly CONTENT: "/content";
    /**
     * Settings routes
     */
    readonly SETTINGS: "/settings";
    /**
     * Analytics routes
     */
    readonly ANALYTICS: "/analytics";
    /**
     * Notification routes
     */
    readonly NOTIFICATIONS: "/notifications";
    /**
     * Support routes
     */
    readonly SUPPORT: "/support";
    /**
     * Webhook routes
     */
    readonly WEBHOOKS: "/webhooks";
    /**
     * Health check routes
     */
    readonly HEALTH: "/health";
    /**
     * Metrics routes
     */
    readonly METRICS: "/metrics";
    /**
     * Files routes
     */
    readonly FILES: "/files";
    /**
     * Search routes
     */
    readonly SEARCH: "/search";
    /**
     * Reports routes
     */
    readonly REPORTS: "/reports";
    /**
     * Dashboard routes
     */
    readonly DASHBOARD: "/dashboard";
    /**
     * Integration routes
     */
    readonly INTEGRATIONS: "/integrations";
};
export type APIBaseRoute = (typeof API_BASE_ROUTES)[keyof typeof API_BASE_ROUTES];
/**
 * Authentication API endpoints
 */
export declare const AUTH_ENDPOINTS: {
    readonly LOGIN: "/login";
    readonly REGISTER: "/register";
    readonly LOGOUT: "/logout";
    readonly REFRESH_TOKEN: "/refresh-token";
    readonly VERIFY_EMAIL: "/verify-email";
    readonly RESEND_VERIFICATION: "/resend-verification";
    readonly FORGOT_PASSWORD: "/forgot-password";
    readonly RESET_PASSWORD: "/reset-password";
    readonly CHANGE_PASSWORD: "/change-password";
    readonly PROFILE: "/profile";
    readonly DELETE_ACCOUNT: "/delete-account";
    readonly SESSIONS: "/sessions";
    readonly REVOKE_SESSION: "/sessions/revoke";
    readonly CSRF_TOKEN: "/csrf-token";
    readonly MFA_SETUP: "/mfa/setup";
    readonly MFA_VERIFY: "/mfa/verify";
    readonly MFA_RECOVER: "/mfa/recover";
    readonly SOCIAL_LOGIN: "/social/login";
    readonly SOCIAL_CALLBACK: "/social/callback";
    readonly DEVICE_VERIFY: "/device/verify";
    readonly DEVICE_UNTRUST: "/device/untrust";
};
export type AuthEndpoint = (typeof AUTH_ENDPOINTS)[keyof typeof AUTH_ENDPOINTS];
/**
 * User API endpoints
 */
export declare const USER_ENDPOINTS: {
    readonly LIST: "/";
    readonly DETAILS: "/:id";
    readonly CREATE: "/";
    readonly UPDATE: "/:id";
    readonly DELETE: "/:id";
    readonly BULK_DELETE: "/bulk-delete";
    readonly ROLES: "/:id/roles";
    readonly PERMISSIONS: "/:id/permissions";
    readonly STATUS: "/:id/status";
    readonly SESSIONS: "/:id/sessions";
    readonly ACTIVITY: "/:id/activity";
    readonly EXPORT: "/export";
    readonly IMPORT: "/import";
    readonly PROFILE: "/profile";
    readonly SETTINGS: "/settings";
    readonly PASSWORD: "/password";
    readonly EMAIL: "/email";
    readonly PHONE: "/phone";
    readonly DEVICES: "/devices";
    readonly DEVICE: "/devices/:deviceId";
};
export type UserEndpoint = (typeof USER_ENDPOINTS)[keyof typeof USER_ENDPOINTS];
/**
 * Admin API endpoints
 */
export declare const ADMIN_ENDPOINTS: {
    readonly DASHBOARD: "/dashboard";
    readonly USERS: "/users";
    readonly ROLES: "/roles";
    readonly PERMISSIONS: "/permissions";
    readonly SETTINGS: "/settings";
    readonly SYSTEM: "/system";
    readonly LOGS: "/logs";
    readonly BACKUPS: "/backups";
    readonly MAINTENANCE: "/maintenance";
    readonly ANALYTICS: "/analytics";
    readonly REPORTS: "/reports";
    readonly AUDIT: "/audit";
    readonly WEBHOOKS: "/webhooks";
    readonly INTEGRATIONS: "/integrations";
};
export type AdminEndpoint = (typeof ADMIN_ENDPOINTS)[keyof typeof ADMIN_ENDPOINTS];
/**
 * Product API endpoints
 */
export declare const PRODUCT_ENDPOINTS: {
    readonly LIST: "/";
    readonly DETAILS: "/:id";
    readonly CREATE: "/";
    readonly UPDATE: "/:id";
    readonly DELETE: "/:id";
    readonly CATEGORIES: "/categories";
    readonly CATEGORY_DETAILS: "/categories/:id";
    readonly INVENTORY: "/:id/inventory";
    readonly PRICING: "/:id/pricing";
    readonly REVIEWS: "/:id/reviews";
    readonly IMAGES: "/:id/images";
    readonly VARIATIONS: "/:id/variations";
    readonly SEARCH: "/search";
    readonly FILTER: "/filter";
    readonly BULK: "/bulk";
    readonly EXPORT: "/export";
    readonly IMPORT: "/import";
};
export type ProductEndpoint = (typeof PRODUCT_ENDPOINTS)[keyof typeof PRODUCT_ENDPOINTS];
/**
 * Order API endpoints
 */
export declare const ORDER_ENDPOINTS: {
    readonly LIST: "/";
    readonly DETAILS: "/:id";
    readonly CREATE: "/";
    readonly UPDATE: "/:id";
    readonly DELETE: "/:id";
    readonly STATUS: "/:id/status";
    readonly CANCEL: "/:id/cancel";
    readonly REFUND: "/:id/refund";
    readonly SHIPPING: "/:id/shipping";
    readonly TRACKING: "/:id/tracking";
    readonly ITEMS: "/:id/items";
    readonly HISTORY: "/:id/history";
    readonly EXPORT: "/export";
    readonly IMPORT: "/import";
};
export type OrderEndpoint = (typeof ORDER_ENDPOINTS)[keyof typeof ORDER_ENDPOINTS];
/**
 * Payment API endpoints
 */
export declare const PAYMENT_ENDPOINTS: {
    readonly LIST: "/";
    readonly DETAILS: "/:id";
    readonly PROCESS: "/process";
    readonly VERIFY: "/verify";
    readonly REFUND: "/refund";
    readonly GATEWAYS: "/gateways";
    readonly GATEWAY_CONFIG: "/gateways/:id/config";
    readonly METHODS: "/methods";
    readonly HISTORY: "/history";
    readonly RECONCILE: "/reconcile";
    readonly EXPORT: "/export";
};
export type PaymentEndpoint = (typeof PAYMENT_ENDPOINTS)[keyof typeof PAYMENT_ENDPOINTS];
/**
 * Webhook endpoints for payment gateways
 */
export declare const WEBHOOK_ENDPOINTS: {
    /**
     * bKash webhook endpoint
     */
    readonly BKASH: "/bkash";
    /**
     * Nagad webhook endpoint
     */
    readonly NAGAD: "/nagad";
    /**
     * Rocket webhook endpoint
     */
    readonly ROCKET: "/rocket";
    /**
     * SSL Commerz webhook endpoint
     */
    readonly SSL_COMMERZ: "/ssl-commerz";
    /**
     * Stripe webhook endpoint
     */
    readonly STRIPE: "/stripe";
    /**
     * PayPal webhook endpoint
     */
    readonly PAYPAL: "/paypal";
    /**
     * Razorpay webhook endpoint
     */
    readonly RAZORPAY: "/razorpay";
    /**
     * Generic webhook endpoint
     */
    readonly GENERIC: "/generic";
};
export type WebhookEndpoint = (typeof WEBHOOK_ENDPOINTS)[keyof typeof WEBHOOK_ENDPOINTS];
/**
 * API timeout configurations
 */
export declare const API_TIMEOUTS: {
    /**
     * Default API timeout in milliseconds
     */
    readonly DEFAULT: 30000;
    /**
     * Short timeout for fast operations
     */
    readonly SHORT: 5000;
    /**
     * Medium timeout for moderate operations
     */
    readonly MEDIUM: 60000;
    /**
     * Long timeout for heavy operations
     */
    readonly LONG: 120000;
    /**
     * File upload timeout
     */
    readonly UPLOAD: 180000;
    /**
     * Authentication timeout
     */
    readonly AUTH: 10000;
    /**
     * Payment processing timeout
     */
    readonly PAYMENT: 45000;
    /**
     * Webhook timeout
     */
    readonly WEBHOOK: 15000;
    /**
     * Database query timeout
     */
    readonly DB_QUERY: 30000;
    /**
     * External API timeout
     */
    readonly EXTERNAL_API: 60000;
};
export type APITimeout = (typeof API_TIMEOUTS)[keyof typeof API_TIMEOUTS];
/**
 * API retry configurations
 */
export declare const API_RETRY: {
    /**
     * Maximum number of retry attempts
     */
    readonly MAX_ATTEMPTS: 3;
    /**
     * Initial delay between retries in milliseconds
     */
    readonly INITIAL_DELAY: 1000;
    /**
     * Maximum delay between retries in milliseconds
     */
    readonly MAX_DELAY: 10000;
    /**
     * Backoff multiplier
     */
    readonly BACKOFF_MULTIPLIER: 2;
    /**
     * Retry on HTTP status codes
     */
    readonly RETRY_STATUS_CODES: readonly [408, 429, 500, 502, 503, 504];
    /**
     * Retry on network errors
     */
    readonly RETRY_ON_NETWORK_ERRORS: true;
    /**
     * Retry on timeout errors
     */
    readonly RETRY_ON_TIMEOUT: true;
    /**
     * Whether to use exponential backoff
     */
    readonly USE_EXPONENTIAL_BACKOFF: true;
    /**
     * Whether to retry idempotent requests only
     */
    readonly RETRY_IDEMPOTENT_ONLY: false;
};
/**
 * Circuit breaker configurations
 */
export declare const CIRCUIT_BREAKER: {
    /**
     * Maximum number of failures before circuit opens
     */
    readonly FAILURE_THRESHOLD: 5;
    /**
     * Time window for counting failures in seconds
     */
    readonly WINDOW_DURATION: 60;
    /**
     * Time in seconds to wait before attempting recovery
     */
    readonly RECOVERY_TIMEOUT: 30;
    /**
     * Maximum number of requests allowed when half-open
     */
    readonly HALF_OPEN_MAX_REQUESTS: 3;
    /**
     * Success threshold to close circuit
     */
    readonly SUCCESS_THRESHOLD: 2;
    /**
     * Whether to enable circuit breaker
     */
    readonly ENABLED: true;
    /**
     * Whether to log circuit breaker events
     */
    readonly LOG_EVENTS: true;
};
/**
 * Rate limiting configurations
 */
export declare const RATE_LIMIT: {
    /**
     * Login rate limit: 5 attempts per 15 minutes
     */
    readonly LOGIN: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 5;
    };
    /**
     * Registration rate limit: 3 attempts per 1 hour
     */
    readonly REGISTRATION: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 3;
    };
    /**
     * General API rate limit: 100 requests per minute
     */
    readonly GENERAL: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 100;
    };
    /**
     * Admin API rate limit: 50 requests per minute
     */
    readonly ADMIN: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 50;
    };
    /**
     * Payment API rate limit: 20 requests per minute
     */
    readonly PAYMENT: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 20;
    };
    /**
     * Password reset rate limit: 3 requests per hour
     */
    readonly PASSWORD_RESET: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 3;
    };
    /**
     * Email verification rate limit: 3 requests per hour
     */
    readonly EMAIL_VERIFICATION: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 3;
    };
    /**
     * Bulk operation rate limit: 10 requests per minute
     */
    readonly BULK: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 10;
    };
    /**
     * File upload rate limit: 5 requests per minute
     */
    readonly UPLOAD: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 5;
    };
};
/**
 * Connection pool configurations
 */
export declare const CONNECTION_POOL: {
    /**
     * Minimum connections in pool
     */
    readonly MIN: 2;
    /**
     * Maximum connections in pool
     */
    readonly MAX: 20;
    /**
     * Connection timeout in milliseconds
     */
    readonly TIMEOUT: 30000;
    /**
     * Idle timeout in milliseconds
     */
    readonly IDLE_TIMEOUT: 60000;
    /**
     * Connection lifetime in milliseconds
     */
    readonly LIFETIME: 3600000;
    /**
     * Whether to enable keep-alive
     */
    readonly KEEP_ALIVE: true;
    /**
     * Keep-alive timeout in milliseconds
     */
    readonly KEEP_ALIVE_TIMEOUT: 5000;
};
/**
 * API response formats
 */
export declare const API_RESPONSE_FORMATS: {
    readonly JSON: "json";
    readonly XML: "xml";
    readonly HTML: "html";
    readonly TEXT: "text";
    readonly CSV: "csv";
    readonly PDF: "pdf";
    readonly EXCEL: "excel";
};
export type APIResponseFormat = (typeof API_RESPONSE_FORMATS)[keyof typeof API_RESPONSE_FORMATS];
/**
 * API content types
 */
export declare const API_CONTENT_TYPES: {
    readonly JSON: "application/json";
    readonly XML: "application/xml";
    readonly HTML: "text/html";
    readonly TEXT: "text/plain";
    readonly CSV: "text/csv";
    readonly PDF: "application/pdf";
    readonly EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    readonly FORM: "application/x-www-form-urlencoded";
    readonly MULTIPART: "multipart/form-data";
    readonly JSON_PATCH: "application/json-patch+json";
    readonly JSON_MERGE: "application/merge-patch+json";
    readonly PROBLEM: "application/problem+json";
    readonly HAL: "application/hal+json";
    readonly STREAM: "application/stream+json";
};
export type APIContentType = (typeof API_CONTENT_TYPES)[keyof typeof API_CONTENT_TYPES];
/**
 * API configuration interface
 */
export interface APIConfig {
    /**
     * Base URL of the API
     */
    baseUrl: string;
    /**
     * API version
     */
    version: APIVersion;
    /**
     * Default timeout in milliseconds
     */
    timeout: number;
    /**
     * Retry configuration
     */
    retry: typeof API_RETRY;
    /**
     * Circuit breaker configuration
     */
    circuitBreaker: typeof CIRCUIT_BREAKER;
    /**
     * Rate limit configuration
     */
    rateLimit: typeof RATE_LIMIT;
    /**
     * Connection pool configuration
     */
    connectionPool: typeof CONNECTION_POOL;
    /**
     * Default headers
     */
    defaultHeaders: Record<string, string>;
    /**
     * Whether to include credentials
     */
    withCredentials: boolean;
}
/**
 * Default API configuration
 */
export declare const DEFAULT_API_CONFIG: Omit<APIConfig, 'baseUrl'>;
/**
 * API error codes
 */
export declare const API_ERROR_CODES: {
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly CONFLICT: "CONFLICT";
    readonly RATE_LIMITED: "RATE_LIMITED";
    readonly INTERNAL_ERROR: "INTERNAL_ERROR";
    readonly SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE";
    readonly BAD_REQUEST: "BAD_REQUEST";
    readonly METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED";
    readonly UNSUPPORTED_MEDIA: "UNSUPPORTED_MEDIA";
    readonly TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS";
    readonly NETWORK_ERROR: "NETWORK_ERROR";
    readonly TIMEOUT: "TIMEOUT";
    readonly CIRCUIT_OPEN: "CIRCUIT_OPEN";
    readonly WEBHOOK_FAILED: "WEBHOOK_FAILED";
};
export type APIErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];
/**
 * API events for logging
 */
export declare const API_EVENTS: {
    readonly REQUEST_START: "api.request.start";
    readonly REQUEST_SUCCESS: "api.request.success";
    readonly REQUEST_FAILURE: "api.request.failure";
    readonly REQUEST_TIMEOUT: "api.request.timeout";
    readonly RATE_LIMIT_HIT: "api.rate.limit.hit";
    readonly RATE_LIMIT_EXCEEDED: "api.rate.limit.exceeded";
    readonly CIRCUIT_OPENED: "api.circuit.opened";
    readonly CIRCUIT_CLOSED: "api.circuit.closed";
    readonly CIRCUIT_HALF_OPEN: "api.circuit.half_open";
    readonly RETRY_ATTEMPT: "api.retry.attempt";
    readonly RETRY_SUCCESS: "api.retry.success";
    readonly RETRY_FAILURE: "api.retry.failure";
    readonly WEBHOOK_RECEIVED: "api.webhook.received";
    readonly WEBHOOK_PROCESSED: "api.webhook.processed";
    readonly WEBHOOK_FAILED: "api.webhook.failed";
};
export type APIEvent = (typeof API_EVENTS)[keyof typeof API_EVENTS];
/**
 * Helper function to build API URL
 */
export declare const buildAPIUrl: (version: APIVersion, path: string) => string;
/**
 * Helper function to get full endpoint path
 */
export declare const getFullEndpoint: (baseRoute: APIBaseRoute, endpoint: string, version?: APIVersion) => string;
/**
 * Helper function to get auth endpoint
 */
export declare const getAuthEndpoint: (endpoint: AuthEndpoint, version?: APIVersion) => string;
/**
 * Helper function to get user endpoint
 */
export declare const getUserEndpoint: (endpoint: UserEndpoint, version?: APIVersion) => string;
/**
 * Helper function to get admin endpoint
 */
export declare const getAdminEndpoint: (endpoint: AdminEndpoint, version?: APIVersion) => string;
/**
 * Helper function to get product endpoint
 */
export declare const getProductEndpoint: (endpoint: ProductEndpoint, version?: APIVersion) => string;
/**
 * Helper function to get order endpoint
 */
export declare const getOrderEndpoint: (endpoint: OrderEndpoint, version?: APIVersion) => string;
/**
 * Helper function to get payment endpoint
 */
export declare const getPaymentEndpoint: (endpoint: PaymentEndpoint, version?: APIVersion) => string;
/**
 * Helper function to get webhook endpoint
 */
export declare const getWebhookEndpoint: (endpoint: WebhookEndpoint, version?: APIVersion) => string;
/**
 * All API constants for export
 */
export declare const API_CONSTANTS: {
    readonly VERSIONS: {
        /**
         * Version 1 - Current stable version
         */
        readonly V1: "v1";
        /**
         * Version 2 - Beta/Experimental version
         */
        readonly V2: "v2";
        /**
         * Version 3 - Future version
         */
        readonly V3: "v3";
        /**
         * Latest version alias
         */
        readonly LATEST: "v1";
        /**
         * Default version
         */
        readonly DEFAULT: "v1";
    };
    readonly VERSION_PREFIXES: {
        readonly v1: "/api/v1";
        readonly v2: "/api/v2";
        readonly v3: "/api/v3";
    };
    readonly BASE_ROUTES: {
        /**
         * Authentication routes
         */
        readonly AUTH: "/auth";
        /**
         * User routes
         */
        readonly USERS: "/users";
        /**
         * Admin routes
         */
        readonly ADMIN: "/admin";
        /**
         * Product routes
         */
        readonly PRODUCTS: "/products";
        /**
         * Order routes
         */
        readonly ORDERS: "/orders";
        /**
         * Payment routes
         */
        readonly PAYMENTS: "/payments";
        /**
         * Content routes
         */
        readonly CONTENT: "/content";
        /**
         * Settings routes
         */
        readonly SETTINGS: "/settings";
        /**
         * Analytics routes
         */
        readonly ANALYTICS: "/analytics";
        /**
         * Notification routes
         */
        readonly NOTIFICATIONS: "/notifications";
        /**
         * Support routes
         */
        readonly SUPPORT: "/support";
        /**
         * Webhook routes
         */
        readonly WEBHOOKS: "/webhooks";
        /**
         * Health check routes
         */
        readonly HEALTH: "/health";
        /**
         * Metrics routes
         */
        readonly METRICS: "/metrics";
        /**
         * Files routes
         */
        readonly FILES: "/files";
        /**
         * Search routes
         */
        readonly SEARCH: "/search";
        /**
         * Reports routes
         */
        readonly REPORTS: "/reports";
        /**
         * Dashboard routes
         */
        readonly DASHBOARD: "/dashboard";
        /**
         * Integration routes
         */
        readonly INTEGRATIONS: "/integrations";
    };
    readonly AUTH: {
        readonly LOGIN: "/login";
        readonly REGISTER: "/register";
        readonly LOGOUT: "/logout";
        readonly REFRESH_TOKEN: "/refresh-token";
        readonly VERIFY_EMAIL: "/verify-email";
        readonly RESEND_VERIFICATION: "/resend-verification";
        readonly FORGOT_PASSWORD: "/forgot-password";
        readonly RESET_PASSWORD: "/reset-password";
        readonly CHANGE_PASSWORD: "/change-password";
        readonly PROFILE: "/profile";
        readonly DELETE_ACCOUNT: "/delete-account";
        readonly SESSIONS: "/sessions";
        readonly REVOKE_SESSION: "/sessions/revoke";
        readonly CSRF_TOKEN: "/csrf-token";
        readonly MFA_SETUP: "/mfa/setup";
        readonly MFA_VERIFY: "/mfa/verify";
        readonly MFA_RECOVER: "/mfa/recover";
        readonly SOCIAL_LOGIN: "/social/login";
        readonly SOCIAL_CALLBACK: "/social/callback";
        readonly DEVICE_VERIFY: "/device/verify";
        readonly DEVICE_UNTRUST: "/device/untrust";
    };
    readonly USERS: {
        readonly LIST: "/";
        readonly DETAILS: "/:id";
        readonly CREATE: "/";
        readonly UPDATE: "/:id";
        readonly DELETE: "/:id";
        readonly BULK_DELETE: "/bulk-delete";
        readonly ROLES: "/:id/roles";
        readonly PERMISSIONS: "/:id/permissions";
        readonly STATUS: "/:id/status";
        readonly SESSIONS: "/:id/sessions";
        readonly ACTIVITY: "/:id/activity";
        readonly EXPORT: "/export";
        readonly IMPORT: "/import";
        readonly PROFILE: "/profile";
        readonly SETTINGS: "/settings";
        readonly PASSWORD: "/password";
        readonly EMAIL: "/email";
        readonly PHONE: "/phone";
        readonly DEVICES: "/devices";
        readonly DEVICE: "/devices/:deviceId";
    };
    readonly ADMIN: {
        readonly DASHBOARD: "/dashboard";
        readonly USERS: "/users";
        readonly ROLES: "/roles";
        readonly PERMISSIONS: "/permissions";
        readonly SETTINGS: "/settings";
        readonly SYSTEM: "/system";
        readonly LOGS: "/logs";
        readonly BACKUPS: "/backups";
        readonly MAINTENANCE: "/maintenance";
        readonly ANALYTICS: "/analytics";
        readonly REPORTS: "/reports";
        readonly AUDIT: "/audit";
        readonly WEBHOOKS: "/webhooks";
        readonly INTEGRATIONS: "/integrations";
    };
    readonly PRODUCTS: {
        readonly LIST: "/";
        readonly DETAILS: "/:id";
        readonly CREATE: "/";
        readonly UPDATE: "/:id";
        readonly DELETE: "/:id";
        readonly CATEGORIES: "/categories";
        readonly CATEGORY_DETAILS: "/categories/:id";
        readonly INVENTORY: "/:id/inventory";
        readonly PRICING: "/:id/pricing";
        readonly REVIEWS: "/:id/reviews";
        readonly IMAGES: "/:id/images";
        readonly VARIATIONS: "/:id/variations";
        readonly SEARCH: "/search";
        readonly FILTER: "/filter";
        readonly BULK: "/bulk";
        readonly EXPORT: "/export";
        readonly IMPORT: "/import";
    };
    readonly ORDERS: {
        readonly LIST: "/";
        readonly DETAILS: "/:id";
        readonly CREATE: "/";
        readonly UPDATE: "/:id";
        readonly DELETE: "/:id";
        readonly STATUS: "/:id/status";
        readonly CANCEL: "/:id/cancel";
        readonly REFUND: "/:id/refund";
        readonly SHIPPING: "/:id/shipping";
        readonly TRACKING: "/:id/tracking";
        readonly ITEMS: "/:id/items";
        readonly HISTORY: "/:id/history";
        readonly EXPORT: "/export";
        readonly IMPORT: "/import";
    };
    readonly PAYMENTS: {
        readonly LIST: "/";
        readonly DETAILS: "/:id";
        readonly PROCESS: "/process";
        readonly VERIFY: "/verify";
        readonly REFUND: "/refund";
        readonly GATEWAYS: "/gateways";
        readonly GATEWAY_CONFIG: "/gateways/:id/config";
        readonly METHODS: "/methods";
        readonly HISTORY: "/history";
        readonly RECONCILE: "/reconcile";
        readonly EXPORT: "/export";
    };
    readonly WEBHOOKS: {
        /**
         * bKash webhook endpoint
         */
        readonly BKASH: "/bkash";
        /**
         * Nagad webhook endpoint
         */
        readonly NAGAD: "/nagad";
        /**
         * Rocket webhook endpoint
         */
        readonly ROCKET: "/rocket";
        /**
         * SSL Commerz webhook endpoint
         */
        readonly SSL_COMMERZ: "/ssl-commerz";
        /**
         * Stripe webhook endpoint
         */
        readonly STRIPE: "/stripe";
        /**
         * PayPal webhook endpoint
         */
        readonly PAYPAL: "/paypal";
        /**
         * Razorpay webhook endpoint
         */
        readonly RAZORPAY: "/razorpay";
        /**
         * Generic webhook endpoint
         */
        readonly GENERIC: "/generic";
    };
    readonly TIMEOUTS: {
        /**
         * Default API timeout in milliseconds
         */
        readonly DEFAULT: 30000;
        /**
         * Short timeout for fast operations
         */
        readonly SHORT: 5000;
        /**
         * Medium timeout for moderate operations
         */
        readonly MEDIUM: 60000;
        /**
         * Long timeout for heavy operations
         */
        readonly LONG: 120000;
        /**
         * File upload timeout
         */
        readonly UPLOAD: 180000;
        /**
         * Authentication timeout
         */
        readonly AUTH: 10000;
        /**
         * Payment processing timeout
         */
        readonly PAYMENT: 45000;
        /**
         * Webhook timeout
         */
        readonly WEBHOOK: 15000;
        /**
         * Database query timeout
         */
        readonly DB_QUERY: 30000;
        /**
         * External API timeout
         */
        readonly EXTERNAL_API: 60000;
    };
    readonly RETRY: {
        /**
         * Maximum number of retry attempts
         */
        readonly MAX_ATTEMPTS: 3;
        /**
         * Initial delay between retries in milliseconds
         */
        readonly INITIAL_DELAY: 1000;
        /**
         * Maximum delay between retries in milliseconds
         */
        readonly MAX_DELAY: 10000;
        /**
         * Backoff multiplier
         */
        readonly BACKOFF_MULTIPLIER: 2;
        /**
         * Retry on HTTP status codes
         */
        readonly RETRY_STATUS_CODES: readonly [408, 429, 500, 502, 503, 504];
        /**
         * Retry on network errors
         */
        readonly RETRY_ON_NETWORK_ERRORS: true;
        /**
         * Retry on timeout errors
         */
        readonly RETRY_ON_TIMEOUT: true;
        /**
         * Whether to use exponential backoff
         */
        readonly USE_EXPONENTIAL_BACKOFF: true;
        /**
         * Whether to retry idempotent requests only
         */
        readonly RETRY_IDEMPOTENT_ONLY: false;
    };
    readonly CIRCUIT_BREAKER: {
        /**
         * Maximum number of failures before circuit opens
         */
        readonly FAILURE_THRESHOLD: 5;
        /**
         * Time window for counting failures in seconds
         */
        readonly WINDOW_DURATION: 60;
        /**
         * Time in seconds to wait before attempting recovery
         */
        readonly RECOVERY_TIMEOUT: 30;
        /**
         * Maximum number of requests allowed when half-open
         */
        readonly HALF_OPEN_MAX_REQUESTS: 3;
        /**
         * Success threshold to close circuit
         */
        readonly SUCCESS_THRESHOLD: 2;
        /**
         * Whether to enable circuit breaker
         */
        readonly ENABLED: true;
        /**
         * Whether to log circuit breaker events
         */
        readonly LOG_EVENTS: true;
    };
    readonly RATE_LIMIT: {
        /**
         * Login rate limit: 5 attempts per 15 minutes
         */
        readonly LOGIN: {
            readonly WINDOW_MS: number;
            readonly MAX_REQUESTS: 5;
        };
        /**
         * Registration rate limit: 3 attempts per 1 hour
         */
        readonly REGISTRATION: {
            readonly WINDOW_MS: number;
            readonly MAX_REQUESTS: 3;
        };
        /**
         * General API rate limit: 100 requests per minute
         */
        readonly GENERAL: {
            readonly WINDOW_MS: number;
            readonly MAX_REQUESTS: 100;
        };
        /**
         * Admin API rate limit: 50 requests per minute
         */
        readonly ADMIN: {
            readonly WINDOW_MS: number;
            readonly MAX_REQUESTS: 50;
        };
        /**
         * Payment API rate limit: 20 requests per minute
         */
        readonly PAYMENT: {
            readonly WINDOW_MS: number;
            readonly MAX_REQUESTS: 20;
        };
        /**
         * Password reset rate limit: 3 requests per hour
         */
        readonly PASSWORD_RESET: {
            readonly WINDOW_MS: number;
            readonly MAX_REQUESTS: 3;
        };
        /**
         * Email verification rate limit: 3 requests per hour
         */
        readonly EMAIL_VERIFICATION: {
            readonly WINDOW_MS: number;
            readonly MAX_REQUESTS: 3;
        };
        /**
         * Bulk operation rate limit: 10 requests per minute
         */
        readonly BULK: {
            readonly WINDOW_MS: number;
            readonly MAX_REQUESTS: 10;
        };
        /**
         * File upload rate limit: 5 requests per minute
         */
        readonly UPLOAD: {
            readonly WINDOW_MS: number;
            readonly MAX_REQUESTS: 5;
        };
    };
    readonly CONNECTION_POOL: {
        /**
         * Minimum connections in pool
         */
        readonly MIN: 2;
        /**
         * Maximum connections in pool
         */
        readonly MAX: 20;
        /**
         * Connection timeout in milliseconds
         */
        readonly TIMEOUT: 30000;
        /**
         * Idle timeout in milliseconds
         */
        readonly IDLE_TIMEOUT: 60000;
        /**
         * Connection lifetime in milliseconds
         */
        readonly LIFETIME: 3600000;
        /**
         * Whether to enable keep-alive
         */
        readonly KEEP_ALIVE: true;
        /**
         * Keep-alive timeout in milliseconds
         */
        readonly KEEP_ALIVE_TIMEOUT: 5000;
    };
    readonly RESPONSE_FORMATS: {
        readonly JSON: "json";
        readonly XML: "xml";
        readonly HTML: "html";
        readonly TEXT: "text";
        readonly CSV: "csv";
        readonly PDF: "pdf";
        readonly EXCEL: "excel";
    };
    readonly CONTENT_TYPES: {
        readonly JSON: "application/json";
        readonly XML: "application/xml";
        readonly HTML: "text/html";
        readonly TEXT: "text/plain";
        readonly CSV: "text/csv";
        readonly PDF: "application/pdf";
        readonly EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        readonly FORM: "application/x-www-form-urlencoded";
        readonly MULTIPART: "multipart/form-data";
        readonly JSON_PATCH: "application/json-patch+json";
        readonly JSON_MERGE: "application/merge-patch+json";
        readonly PROBLEM: "application/problem+json";
        readonly HAL: "application/hal+json";
        readonly STREAM: "application/stream+json";
    };
    readonly ERROR_CODES: {
        readonly UNAUTHORIZED: "UNAUTHORIZED";
        readonly FORBIDDEN: "FORBIDDEN";
        readonly NOT_FOUND: "NOT_FOUND";
        readonly VALIDATION_ERROR: "VALIDATION_ERROR";
        readonly CONFLICT: "CONFLICT";
        readonly RATE_LIMITED: "RATE_LIMITED";
        readonly INTERNAL_ERROR: "INTERNAL_ERROR";
        readonly SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE";
        readonly BAD_REQUEST: "BAD_REQUEST";
        readonly METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED";
        readonly UNSUPPORTED_MEDIA: "UNSUPPORTED_MEDIA";
        readonly TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS";
        readonly NETWORK_ERROR: "NETWORK_ERROR";
        readonly TIMEOUT: "TIMEOUT";
        readonly CIRCUIT_OPEN: "CIRCUIT_OPEN";
        readonly WEBHOOK_FAILED: "WEBHOOK_FAILED";
    };
    readonly EVENTS: {
        readonly REQUEST_START: "api.request.start";
        readonly REQUEST_SUCCESS: "api.request.success";
        readonly REQUEST_FAILURE: "api.request.failure";
        readonly REQUEST_TIMEOUT: "api.request.timeout";
        readonly RATE_LIMIT_HIT: "api.rate.limit.hit";
        readonly RATE_LIMIT_EXCEEDED: "api.rate.limit.exceeded";
        readonly CIRCUIT_OPENED: "api.circuit.opened";
        readonly CIRCUIT_CLOSED: "api.circuit.closed";
        readonly CIRCUIT_HALF_OPEN: "api.circuit.half_open";
        readonly RETRY_ATTEMPT: "api.retry.attempt";
        readonly RETRY_SUCCESS: "api.retry.success";
        readonly RETRY_FAILURE: "api.retry.failure";
        readonly WEBHOOK_RECEIVED: "api.webhook.received";
        readonly WEBHOOK_PROCESSED: "api.webhook.processed";
        readonly WEBHOOK_FAILED: "api.webhook.failed";
    };
};
/**
 * All API constants for export
 */
export declare const ALL_API_CONSTANTS: {
    readonly REQUEST_START: "api.request.start";
    readonly REQUEST_SUCCESS: "api.request.success";
    readonly REQUEST_FAILURE: "api.request.failure";
    readonly REQUEST_TIMEOUT: "api.request.timeout";
    readonly RATE_LIMIT_HIT: "api.rate.limit.hit";
    readonly RATE_LIMIT_EXCEEDED: "api.rate.limit.exceeded";
    readonly CIRCUIT_OPENED: "api.circuit.opened";
    readonly CIRCUIT_CLOSED: "api.circuit.closed";
    readonly CIRCUIT_HALF_OPEN: "api.circuit.half_open";
    readonly RETRY_ATTEMPT: "api.retry.attempt";
    readonly RETRY_SUCCESS: "api.retry.success";
    readonly RETRY_FAILURE: "api.retry.failure";
    readonly WEBHOOK_RECEIVED: "api.webhook.received";
    readonly WEBHOOK_PROCESSED: "api.webhook.processed";
    readonly WEBHOOK_FAILED: "api.webhook.failed";
    readonly UNAUTHORIZED: "UNAUTHORIZED";
    readonly FORBIDDEN: "FORBIDDEN";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly CONFLICT: "CONFLICT";
    readonly RATE_LIMITED: "RATE_LIMITED";
    readonly INTERNAL_ERROR: "INTERNAL_ERROR";
    readonly SERVICE_UNAVAILABLE: "SERVICE_UNAVAILABLE";
    readonly BAD_REQUEST: "BAD_REQUEST";
    readonly METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED";
    readonly UNSUPPORTED_MEDIA: "UNSUPPORTED_MEDIA";
    readonly TOO_MANY_REQUESTS: "TOO_MANY_REQUESTS";
    readonly NETWORK_ERROR: "NETWORK_ERROR";
    readonly TIMEOUT: "TIMEOUT";
    readonly CIRCUIT_OPEN: "CIRCUIT_OPEN";
    readonly JSON: "application/json";
    readonly XML: "application/xml";
    readonly HTML: "text/html";
    readonly TEXT: "text/plain";
    readonly CSV: "text/csv";
    readonly PDF: "application/pdf";
    readonly EXCEL: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    readonly FORM: "application/x-www-form-urlencoded";
    readonly MULTIPART: "multipart/form-data";
    readonly JSON_PATCH: "application/json-patch+json";
    readonly JSON_MERGE: "application/merge-patch+json";
    readonly PROBLEM: "application/problem+json";
    readonly HAL: "application/hal+json";
    readonly STREAM: "application/stream+json";
    /**
     * Minimum connections in pool
     */
    readonly MIN: 2;
    /**
     * Maximum connections in pool
     */
    readonly MAX: 20;
    /**
     * Idle timeout in milliseconds
     */
    readonly IDLE_TIMEOUT: 60000;
    /**
     * Connection lifetime in milliseconds
     */
    readonly LIFETIME: 3600000;
    /**
     * Whether to enable keep-alive
     */
    readonly KEEP_ALIVE: true;
    /**
     * Keep-alive timeout in milliseconds
     */
    readonly KEEP_ALIVE_TIMEOUT: 5000;
    /**
     * Login rate limit: 5 attempts per 15 minutes
     */
    readonly LOGIN: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 5;
    };
    /**
     * Registration rate limit: 3 attempts per 1 hour
     */
    readonly REGISTRATION: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 3;
    };
    /**
     * General API rate limit: 100 requests per minute
     */
    readonly GENERAL: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 100;
    };
    /**
     * Admin API rate limit: 50 requests per minute
     */
    readonly ADMIN: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 50;
    };
    /**
     * Payment API rate limit: 20 requests per minute
     */
    readonly PAYMENT: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 20;
    };
    /**
     * Password reset rate limit: 3 requests per hour
     */
    readonly PASSWORD_RESET: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 3;
    };
    /**
     * Email verification rate limit: 3 requests per hour
     */
    readonly EMAIL_VERIFICATION: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 3;
    };
    /**
     * Bulk operation rate limit: 10 requests per minute
     */
    readonly BULK: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 10;
    };
    /**
     * File upload rate limit: 5 requests per minute
     */
    readonly UPLOAD: {
        readonly WINDOW_MS: number;
        readonly MAX_REQUESTS: 5;
    };
    /**
     * Maximum number of failures before circuit opens
     */
    readonly FAILURE_THRESHOLD: 5;
    /**
     * Time window for counting failures in seconds
     */
    readonly WINDOW_DURATION: 60;
    /**
     * Time in seconds to wait before attempting recovery
     */
    readonly RECOVERY_TIMEOUT: 30;
    /**
     * Maximum number of requests allowed when half-open
     */
    readonly HALF_OPEN_MAX_REQUESTS: 3;
    /**
     * Success threshold to close circuit
     */
    readonly SUCCESS_THRESHOLD: 2;
    /**
     * Whether to enable circuit breaker
     */
    readonly ENABLED: true;
    /**
     * Whether to log circuit breaker events
     */
    readonly LOG_EVENTS: true;
    /**
     * Maximum number of retry attempts
     */
    readonly MAX_ATTEMPTS: 3;
    /**
     * Initial delay between retries in milliseconds
     */
    readonly INITIAL_DELAY: 1000;
    /**
     * Maximum delay between retries in milliseconds
     */
    readonly MAX_DELAY: 10000;
    /**
     * Backoff multiplier
     */
    readonly BACKOFF_MULTIPLIER: 2;
    /**
     * Retry on HTTP status codes
     */
    readonly RETRY_STATUS_CODES: readonly [408, 429, 500, 502, 503, 504];
    /**
     * Retry on network errors
     */
    readonly RETRY_ON_NETWORK_ERRORS: true;
    /**
     * Retry on timeout errors
     */
    readonly RETRY_ON_TIMEOUT: true;
    /**
     * Whether to use exponential backoff
     */
    readonly USE_EXPONENTIAL_BACKOFF: true;
    /**
     * Whether to retry idempotent requests only
     */
    readonly RETRY_IDEMPOTENT_ONLY: false;
    /**
     * Default API timeout in milliseconds
     */
    readonly DEFAULT: 30000;
    /**
     * Short timeout for fast operations
     */
    readonly SHORT: 5000;
    /**
     * Medium timeout for moderate operations
     */
    readonly MEDIUM: 60000;
    /**
     * Long timeout for heavy operations
     */
    readonly LONG: 120000;
    /**
     * Authentication timeout
     */
    readonly AUTH: 10000;
    /**
     * Webhook timeout
     */
    readonly WEBHOOK: 15000;
    /**
     * Database query timeout
     */
    readonly DB_QUERY: 30000;
    /**
     * External API timeout
     */
    readonly EXTERNAL_API: 60000;
    /**
     * bKash webhook endpoint
     */
    readonly BKASH: "/bkash";
    /**
     * Nagad webhook endpoint
     */
    readonly NAGAD: "/nagad";
    /**
     * Rocket webhook endpoint
     */
    readonly ROCKET: "/rocket";
    /**
     * SSL Commerz webhook endpoint
     */
    readonly SSL_COMMERZ: "/ssl-commerz";
    /**
     * Stripe webhook endpoint
     */
    readonly STRIPE: "/stripe";
    /**
     * PayPal webhook endpoint
     */
    readonly PAYPAL: "/paypal";
    /**
     * Razorpay webhook endpoint
     */
    readonly RAZORPAY: "/razorpay";
    /**
     * Generic webhook endpoint
     */
    readonly GENERIC: "/generic";
    readonly LIST: "/";
    readonly DETAILS: "/:id";
    readonly PROCESS: "/process";
    readonly VERIFY: "/verify";
    readonly REFUND: "/refund";
    readonly GATEWAYS: "/gateways";
    readonly GATEWAY_CONFIG: "/gateways/:id/config";
    readonly METHODS: "/methods";
    readonly HISTORY: "/history";
    readonly RECONCILE: "/reconcile";
    readonly EXPORT: "/export";
    readonly CREATE: "/";
    readonly UPDATE: "/:id";
    readonly DELETE: "/:id";
    readonly STATUS: "/:id/status";
    readonly CANCEL: "/:id/cancel";
    readonly SHIPPING: "/:id/shipping";
    readonly TRACKING: "/:id/tracking";
    readonly ITEMS: "/:id/items";
    readonly IMPORT: "/import";
    readonly CATEGORIES: "/categories";
    readonly CATEGORY_DETAILS: "/categories/:id";
    readonly INVENTORY: "/:id/inventory";
    readonly PRICING: "/:id/pricing";
    readonly REVIEWS: "/:id/reviews";
    readonly IMAGES: "/:id/images";
    readonly VARIATIONS: "/:id/variations";
    readonly SEARCH: "/search";
    readonly FILTER: "/filter";
    readonly DASHBOARD: "/dashboard";
    readonly USERS: "/users";
    readonly ROLES: "/roles";
    readonly PERMISSIONS: "/permissions";
    readonly SETTINGS: "/settings";
    readonly SYSTEM: "/system";
    readonly LOGS: "/logs";
    readonly BACKUPS: "/backups";
    readonly MAINTENANCE: "/maintenance";
    readonly ANALYTICS: "/analytics";
    readonly REPORTS: "/reports";
    readonly AUDIT: "/audit";
    readonly WEBHOOKS: "/webhooks";
    readonly INTEGRATIONS: "/integrations";
    readonly BULK_DELETE: "/bulk-delete";
    readonly SESSIONS: "/:id/sessions";
    readonly ACTIVITY: "/:id/activity";
    readonly PROFILE: "/profile";
    readonly PASSWORD: "/password";
    readonly EMAIL: "/email";
    readonly PHONE: "/phone";
    readonly DEVICES: "/devices";
    readonly DEVICE: "/devices/:deviceId";
    readonly REGISTER: "/register";
    readonly LOGOUT: "/logout";
    readonly REFRESH_TOKEN: "/refresh-token";
    readonly VERIFY_EMAIL: "/verify-email";
    readonly RESEND_VERIFICATION: "/resend-verification";
    readonly FORGOT_PASSWORD: "/forgot-password";
    readonly RESET_PASSWORD: "/reset-password";
    readonly CHANGE_PASSWORD: "/change-password";
    readonly DELETE_ACCOUNT: "/delete-account";
    readonly REVOKE_SESSION: "/sessions/revoke";
    readonly CSRF_TOKEN: "/csrf-token";
    readonly MFA_SETUP: "/mfa/setup";
    readonly MFA_VERIFY: "/mfa/verify";
    readonly MFA_RECOVER: "/mfa/recover";
    readonly SOCIAL_LOGIN: "/social/login";
    readonly SOCIAL_CALLBACK: "/social/callback";
    readonly DEVICE_VERIFY: "/device/verify";
    readonly DEVICE_UNTRUST: "/device/untrust";
    /**
     * Product routes
     */
    readonly PRODUCTS: "/products";
    /**
     * Order routes
     */
    readonly ORDERS: "/orders";
    /**
     * Payment routes
     */
    readonly PAYMENTS: "/payments";
    /**
     * Content routes
     */
    readonly CONTENT: "/content";
    /**
     * Notification routes
     */
    readonly NOTIFICATIONS: "/notifications";
    /**
     * Support routes
     */
    readonly SUPPORT: "/support";
    /**
     * Health check routes
     */
    readonly HEALTH: "/health";
    /**
     * Metrics routes
     */
    readonly METRICS: "/metrics";
    /**
     * Files routes
     */
    readonly FILES: "/files";
    readonly v1: "/api/v1";
    readonly v2: "/api/v2";
    readonly v3: "/api/v3";
    /**
     * Version 1 - Current stable version
     */
    readonly V1: "v1";
    /**
     * Version 2 - Beta/Experimental version
     */
    readonly V2: "v2";
    /**
     * Version 3 - Future version
     */
    readonly V3: "v3";
    /**
     * Latest version alias
     */
    readonly LATEST: "v1";
};
//# sourceMappingURL=api.constants.d.ts.map