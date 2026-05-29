/**
 * Axios Client - Enterprise HTTP client configuration
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-api/src/client/axios.client
 *
 * RULES:
 * ✅ ONLY HTTP client configuration - NO business logic
 * ✅ NO UI, routing, toast, React components
 * ✅ No side effects beyond client creation
 * ✅ Named exports only
 * ✅ No database or framework imports
 */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios';

// Import types from shared packages
import type { ApiResponse, ApiErrorResponse } from '@vubon/auth-types';

// Import config from shared-config (optional - can be overridden)
import { env } from '@vubon/shared-config/env';

// ==================== Configuration ====================

export interface HttpClientConfig {
  baseURL: string;
  timeout: number;
  withCredentials: boolean;
  headers: Record<string, string>;
  maxRedirects?: number;
  maxContentLength?: number;
  proxy?: boolean;
  /** Maximum number of retries for failed requests */
  maxRetries?: number;
  /** Retry delay in milliseconds (base for exponential backoff) */
  retryDelayMs?: number;
}

export const DEFAULT_CLIENT_CONFIG: HttpClientConfig = {
  baseURL: (typeof window !== 'undefined' ? window.location.origin : env.API_URL) || 'http://localhost:3000',
  timeout: env.HTTP_TIMEOUT ? Number(env.HTTP_TIMEOUT) : 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-Client-Version': '1.0.0',
    'X-Platform': 'web',
  },
  maxRedirects: 5,
  maxContentLength: 10 * 1024 * 1024, // 10MB
  proxy: false,
  maxRetries: 3,
  retryDelayMs: 1000,
};

// ==================== Types ====================

export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipRefresh?: boolean;
  retryCount?: number;
  /** Skip retry for this specific request */
  skipRetry?: boolean;
  /** Request priority for queueing */
  priority?: 'high' | 'normal' | 'low';
}

export type RequestInterceptor = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
export type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
export type ErrorInterceptor = (error: AxiosError) => Promise<never>;

/**
 * Request queue item interface
 */
interface QueuedRequest {
  config: RequestConfig;
  resolve: (value: AxiosResponse) => void;
  reject: (reason?: unknown) => void;
  priority: number;
  timestamp: number;
}

// ==================== Client Creation ====================

let clientInstance: AxiosInstance | null = null;
let interceptorsRegistered = false;

// Request queue for handling concurrent requests
let requestQueue: QueuedRequest[] = [];
let isProcessingQueue = false;
let activeRequests = 0;
const MAX_CONCURRENT_REQUESTS = 5;

/**
 * Create axios instance with configuration
 * Pure factory function - no side effects
 */
export const createAxiosClient = (config?: Partial<HttpClientConfig>): AxiosInstance => {
  const finalConfig = { ...DEFAULT_CLIENT_CONFIG, ...config };

  const client = axios.create({
    baseURL: finalConfig.baseURL,
    timeout: finalConfig.timeout,
    withCredentials: finalConfig.withCredentials,
    headers: finalConfig.headers,
    maxRedirects: finalConfig.maxRedirects,
    maxContentLength: finalConfig.maxContentLength,
    proxy: finalConfig.proxy,
  });

  return client;
};

/**
 * Process queued requests
 */
const processQueue = async (): Promise<void> => {
  if (isProcessingQueue || requestQueue.length === 0) return;
  if (activeRequests >= MAX_CONCURRENT_REQUESTS) return;

  isProcessingQueue = true;

  try {
    // Sort by priority (higher number = higher priority)
    requestQueue.sort((a, b) => b.priority - a.priority);

    while (requestQueue.length > 0 && activeRequests < MAX_CONCURRENT_REQUESTS) {
      const queued = requestQueue.shift();
      if (!queued) continue;

      activeRequests++;

      const { config, resolve, reject } = queued;

      // Execute request without queueing again
      const client = getAxiosClient();
      client(config)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          activeRequests--;
          processQueue(); // Process next batch
        });
    }
  } finally {
    isProcessingQueue = false;
  }
};

/**
 * Queue a request (for rate limiting / concurrency control)
 */
export const queueRequest = (config: RequestConfig): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    const priorityMap = { high: 3, normal: 2, low: 1 };
    const priority = priorityMap[config.priority || 'normal'];

    requestQueue.push({
      config,
      resolve,
      reject,
      priority,
      timestamp: Date.now(),
    });

    processQueue();
  });
};

/**
 * Register interceptors (called after client creation)
 * Separate function to avoid circular dependencies
 */
export const registerInterceptors = (
  client: AxiosInstance,
  onRequest?: RequestInterceptor,
  onResponse?: ResponseInterceptor,
  onError?: ErrorInterceptor
): void => {
  if (onRequest) {
    client.interceptors.request.use(onRequest);
  }

  if (onResponse || onError) {
    client.interceptors.response.use(
      onResponse || ((response) => response),
      onError || ((error) => Promise.reject(error))
    );
  }
};

/**
 * Get or create singleton client instance
 */
export const getAxiosClient = (config?: Partial<HttpClientConfig>): AxiosInstance => {
  if (!clientInstance) {
    clientInstance = createAxiosClient(config);
  }
  return clientInstance;
};

/**
 * Reset client instance (useful for testing or logout)
 */
export const resetAxiosClient = (): void => {
  if (clientInstance) {
    // Remove all interceptors before destroying
    clientInstance.interceptors.request.clear();
    clientInstance.interceptors.response.clear();
    clientInstance = null;
  }
  interceptorsRegistered = false;
  requestQueue = [];
  activeRequests = 0;
  isProcessingQueue = false;
};

/**
 * Set client base URL dynamically
 */
export const setClientBaseURL = (baseURL: string): void => {
  if (clientInstance) {
    clientInstance.defaults.baseURL = baseURL;
  }
};

/**
 * Set client timeout dynamically
 */
export const setClientTimeout = (timeout: number): void => {
  if (clientInstance) {
    clientInstance.defaults.timeout = timeout;
  }
};

/**
 * Set client auth token
 */
export const setClientAuthToken = (token: string | null): void => {
  if (clientInstance) {
    if (token) {
      clientInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete clientInstance.defaults.headers.common['Authorization'];
    }
  }
};

/**
 * Set client headers dynamically
 */
export const setClientHeader = (key: string, value: string): void => {
  if (clientInstance) {
    clientInstance.defaults.headers.common[key] = value;
  }
};

/**
 * Remove client header
 */
export const removeClientHeader = (key: string): void => {
  if (clientInstance) {
    delete clientInstance.defaults.headers.common[key];
  }
};

/**
 * Check if client is initialized
 */
export const isClientInitialized = (): boolean => {
  return clientInstance !== null;
};

/**
 * Get current client configuration
 */
export const getClientConfig = (): Partial<HttpClientConfig> | null => {
  if (!clientInstance) return null;

  return {
    baseURL: clientInstance.defaults.baseURL,
    timeout: clientInstance.defaults.timeout,
    withCredentials: clientInstance.defaults.withCredentials,
    headers: clientInstance.defaults.headers.common as Record<string, string>,
  };
};

// ==================== Request Helpers ====================

/**
 * Create a request config with abort signal
 */
export const createAbortableConfig = (timeoutMs?: number): RequestConfig => {
  const controller = new AbortController();
  const config: RequestConfig = {
    signal: controller.signal,
  };

  if (timeoutMs) {
    setTimeout(() => controller.abort(), timeoutMs);
  }

  return config;
};

/**
 * Cancel pending request
 */
export const cancelRequest = (controller: AbortController): void => {
  controller.abort();
};

/**
 * Get queue status
 */
export const getQueueStatus = (): {
  queuedRequests: number;
  activeRequests: number;
  maxConcurrent: number;
} => {
  return {
    queuedRequests: requestQueue.length,
    activeRequests,
    maxConcurrent: MAX_CONCURRENT_REQUESTS,
  };
};

/**
 * Clear all queued requests
 */
export const clearQueue = (): void => {
  const failedRequests = [...requestQueue];
  requestQueue = [];
  activeRequests = 0;

  // Reject all pending requests
  failedRequests.forEach(({ reject }) => {
    reject(new Error('Request queue cleared'));
  });
};

// ==================== Type Exports ====================

export type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  ApiResponse,
  ApiErrorResponse,
};
