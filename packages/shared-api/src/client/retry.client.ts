/**
 * Retry Client - Exponential backoff and retry strategy
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-api/src/client/retry.client
 * 
 * RULES:
 * ✅ ONLY retry logic - NO business-specific retry rules
 * ✅ No UI logic, no toast, no routing
 * ✅ Pure retry strategy with exponential backoff
 * ✅ Named exports only
 * ✅ No side effects beyond setTimeout
 */

import type { AxiosError } from 'axios';

// ==================== Types ====================

export interface RetryConfig {
  maxRetries: number;
  initialDelayMs: number;
  backoffMultiplier: number;
  maxDelayMs: number;
  retryableStatuses: readonly number[];
  retryableErrors: readonly string[];
  retryableMethods?: readonly string[];
  jitterEnabled?: boolean;
}

export interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  backoffMultiplier?: number;
  retryableStatuses?: readonly number[];
  retryableErrors?: readonly string[];
}

export interface RetryableError {
  status?: number;
  code?: string;
  message?: string;
  method?: string;
}

// ==================== Constants ====================

const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_INITIAL_DELAY_MS = 1000;
const DEFAULT_BACKOFF_MULTIPLIER = 2;
const DEFAULT_MAX_DELAY_MS = 30000; // 30 seconds

// Status codes that should NEVER be retried (client errors)
export const NEVER_RETRY_STATUSES: readonly number[] = [
  400, // Bad Request
  401, // Unauthorized
  403, // Forbidden
  404, // Not Found
  405, // Method Not Allowed
  409, // Conflict
  410, // Gone
  422, // Unprocessable Entity
  451, // Unavailable For Legal Reasons
];

// Status codes that should be retried (server errors or rate limits)
export const DEFAULT_RETRYABLE_STATUSES: readonly number[] = [
  408, // Request Timeout
  429, // Too Many Requests
  500, // Internal Server Error
  502, // Bad Gateway
  503, // Service Unavailable
  504, // Gateway Timeout
];

// Error codes that should be retried (network level)
export const DEFAULT_RETRYABLE_ERRORS: readonly string[] = [
  'ECONNRESET',
  'ETIMEDOUT',
  'ENOTFOUND',
  'ECONNREFUSED',
  'ENETUNREACH',
  'EAI_AGAIN',
  'Network Error',
  'timeout',
  'aborted',
];

// HTTP methods that are idempotent (safe to retry)
export const IDEMPOTENT_METHODS: readonly string[] = ['GET', 'HEAD', 'OPTIONS', 'PUT', 'DELETE'];
export const NON_IDEMPOTENT_METHODS: readonly string[] = ['POST', 'PATCH'];

// Messages that should NEVER be retried
export const NEVER_RETRY_MESSAGES: readonly string[] = [
  'Invalid credentials',
  'Validation error',
  'Permission denied',
  'Not found',
  'Already exists',
  'Insufficient funds',
  'Invalid token',
  'Expired token',
];

// ==================== Core Retry Logic ====================

/**
 * Check if error should be retried based on status, code, and method
 * Pure function - no side effects
 */
export const shouldRetry = (
  error: AxiosError,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): boolean => {
  const { retryableStatuses, retryableErrors, retryableMethods } = config;
  
  // Check HTTP method (don't retry non-idempotent by default unless specified)
  const method = error.config?.method?.toUpperCase() || '';
  if (retryableMethods) {
    if (!retryableMethods.includes(method)) {
      return false;
    }
  } else if (NON_IDEMPOTENT_METHODS.includes(method)) {
    // By default, don't retry POST/PATCH unless configured
    return false;
  }
  
  // Check status code
  if (error.response?.status) {
    const status = error.response.status;
    
    // Never retry certain client errors
    if (NEVER_RETRY_STATUSES.includes(status)) {
      return false;
    }
    
    // Retry if in retryable statuses
    if (retryableStatuses.includes(status)) {
      return true;
    }
  }
  
  // Check error code (network errors)
  if (error.code && retryableErrors.includes(error.code)) {
    return true;
  }
  
  // Check error message for known patterns
  if (error.message) {
    for (const neverRetry of NEVER_RETRY_MESSAGES) {
      if (error.message.includes(neverRetry)) {
        return false;
      }
    }
    
    // Retry on connection-related messages
    if (
      error.message.includes('socket hang up') ||
      error.message.includes('ECONNRESET') ||
      error.message.includes('timeout')
    ) {
      return true;
    }
  }
  
  return false;
};

/**
 * Calculate delay with exponential backoff and optional jitter
 * Pure function - no side effects
 * 
 * @param attempt - Current attempt number (1-indexed)
 * @param config - Retry configuration
 * @returns Delay in milliseconds
 */
export const calculateDelay = (
  attempt: number,
  config: RetryConfig = DEFAULT_RETRY_CONFIG
): number => {
  const { initialDelayMs, backoffMultiplier, maxDelayMs, jitterEnabled = true } = config;
  
  // Exponential backoff: delay = initial * (multiplier ^ (attempt - 1))
  let delay = initialDelayMs * Math.pow(backoffMultiplier, attempt - 1);
  
  // Add jitter to avoid thundering herd (random ±20%)
  if (jitterEnabled) {
    const jitterFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    delay = delay * jitterFactor;
  }
  
  // Cap at maximum delay
  return Math.min(delay, maxDelayMs);
};

/**
 * Execute function with retry logic using exponential backoff
 * 
 * @param fn - Async function to execute
 * @param config - Retry configuration
 * @param attempt - Current attempt (internal use)
 * @returns Promise resolving to function result
 */
export const withRetry = async <T>(
  fn: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG,
  attempt: number = 1
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    const axiosError = error as AxiosError;
    
    // Check if we should retry
    if (attempt >= config.maxRetries || !shouldRetry(axiosError, config)) {
      throw error;
    }
    
    // Calculate delay and wait
    const delay = calculateDelay(attempt, config);
    await new Promise((resolve) => setTimeout(resolve, delay));
    
    // Retry recursively
    return withRetry(fn, config, attempt + 1);
  }
};

// ==================== Retry Handler Class ====================

export class RetryHandler {
  private config: RetryConfig;
  
  constructor(config: Partial<RetryConfig> = {}) {
    this.config = {
      maxRetries: DEFAULT_MAX_RETRIES,
      initialDelayMs: DEFAULT_INITIAL_DELAY_MS,
      backoffMultiplier: DEFAULT_BACKOFF_MULTIPLIER,
      maxDelayMs: DEFAULT_MAX_DELAY_MS,
      jitterEnabled: true,
      retryableStatuses: [...DEFAULT_RETRYABLE_STATUSES],
      retryableErrors: [...DEFAULT_RETRYABLE_ERRORS],
      ...config,
    };
  }
  
  /**
   * Execute function with retry
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    return withRetry(fn, this.config);
  }
  
  /**
   * Execute with custom retry count (override config)
   */
  async executeWithMaxRetries<T>(fn: () => Promise<T>, maxRetries: number): Promise<T> {
    return withRetry(fn, { ...this.config, maxRetries }, 1);
  }
  
  /**
   * Check if error should be retried using current config
   */
  shouldRetry(error: AxiosError): boolean {
    return shouldRetry(error, this.config);
  }
  
  /**
   * Calculate delay for a given attempt
   */
  calculateDelay(attempt: number): number {
    return calculateDelay(attempt, this.config);
  }
  
  /**
   * Update retry configuration
   */
  updateConfig(config: Partial<RetryConfig>): void {
    this.config = {
      ...this.config,
      ...config,
    };
  }
  
  /**
   * Get current retry configuration
   */
  getConfig(): RetryConfig {
    return { ...this.config };
  }
  
  /**
   * Reset to default configuration
   */
  resetConfig(): void {
    this.config = {
      maxRetries: DEFAULT_MAX_RETRIES,
      initialDelayMs: DEFAULT_INITIAL_DELAY_MS,
      backoffMultiplier: DEFAULT_BACKOFF_MULTIPLIER,
      maxDelayMs: DEFAULT_MAX_DELAY_MS,
      jitterEnabled: true,
      retryableStatuses: [...DEFAULT_RETRYABLE_STATUSES],
      retryableErrors: [...DEFAULT_RETRYABLE_ERRORS],
    };
  }
}

// ==================== Default Configurations ====================

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: DEFAULT_MAX_RETRIES,
  initialDelayMs: DEFAULT_INITIAL_DELAY_MS,
  backoffMultiplier: DEFAULT_BACKOFF_MULTIPLIER,
  maxDelayMs: DEFAULT_MAX_DELAY_MS,
  jitterEnabled: true,
  retryableStatuses: [...DEFAULT_RETRYABLE_STATUSES],
  retryableErrors: [...DEFAULT_RETRYABLE_ERRORS],
};

export const AGGRESSIVE_RETRY_CONFIG: RetryConfig = {
  maxRetries: 5,
  initialDelayMs: 500,
  backoffMultiplier: 2,
  maxDelayMs: 60000,
  jitterEnabled: true,
  retryableStatuses: [...DEFAULT_RETRYABLE_STATUSES],
  retryableErrors: [...DEFAULT_RETRYABLE_ERRORS],
};

export const CONSERVATIVE_RETRY_CONFIG: RetryConfig = {
  maxRetries: 2,
  initialDelayMs: 2000,
  backoffMultiplier: 3,
  maxDelayMs: 30000,
  jitterEnabled: true,
  retryableStatuses: [408, 429, 500, 502, 503],
  retryableErrors: ['ECONNRESET', 'ETIMEDOUT'],
};

// ==================== Factory Functions ====================

/**
 * Create a retry handler with default configuration
 */
export const createRetryHandler = (config?: Partial<RetryConfig>): RetryHandler => {
  return new RetryHandler(config);
};

/**
 * Create a retry handler for idempotent operations
 */
export const createIdempotentRetryHandler = (): RetryHandler => {
  return new RetryHandler({
    retryableMethods: [...IDEMPOTENT_METHODS],
  });
};

// ==================== Singleton Instance ====================

let defaultRetryHandler: RetryHandler | null = null;

/**
 * Get or create default retry handler singleton
 */
export const getDefaultRetryHandler = (): RetryHandler => {
  if (!defaultRetryHandler) {
    defaultRetryHandler = createRetryHandler();
  }
  return defaultRetryHandler;
};

/**
 * Reset default retry handler
 */
export const resetDefaultRetryHandler = (): void => {
  if (defaultRetryHandler) {
    defaultRetryHandler.resetConfig();
  }
};

// ==================== Type Exports ====================

export type { RetryHandler as RetryHandlerType };
