/**
 * Fetch Client - Native fetch wrapper for enterprise use
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-api/client/fetch.client
 * 
 * RULES:
 * ✅ ONLY native fetch wrapper - NO business logic
 * ✅ NO UI, routing, toast, React components
 * ✅ No side effects beyond HTTP requests
 * ✅ Named exports only
 * ✅ No database or framework imports
 */

// Import types from shared packages
import type { ApiResponse, ApiErrorResponse } from '@vubon/auth-types';
import { env } from '@vubon/shared-config/env';

// ==================== Types ====================

export interface FetchClientConfig extends RequestInit {
  baseURL?: string;
  timeout?: number;
  params?: Record<string, string>;
  skipAuth?: boolean;
  skipRefresh?: boolean;
  skipRetry?: boolean;
  priority?: 'high' | 'normal' | 'low';
  maxRetries?: number;
  retryDelayMs?: number;
}

export interface FetchResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
  ok: boolean;
}

export interface FetchError extends Error {
  status?: number;
  statusText?: string;
  data?: unknown;
  response?: Response;
  config?: FetchClientConfig;
  retryCount?: number;
}

// HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

// Request interceptor type
export type RequestInterceptor = (url: string, options: RequestInit) => { url: string; options: RequestInit };
export type ResponseInterceptor = <T>(response: FetchResponse<T>) => FetchResponse<T> | Promise<FetchResponse<T>>;
export type ErrorInterceptor = (error: FetchError) => Promise<never>;

/**
 * Request queue item interface
 */
interface QueuedRequest {
  config: FetchClientConfig;
  path: string;
  method: HttpMethod;
  body?: unknown;
  params?: Record<string, string>;
  resolve: (value: FetchResponse<unknown>) => void;
  reject: (reason?: unknown) => void;
  priority: number;
  timestamp: number;
  retryCount: number;
}

// ==================== Constants ====================

const DEFAULT_TIMEOUT = env.HTTP_TIMEOUT ? Number(env.HTTP_TIMEOUT) : 30000;
const DEFAULT_MAX_RETRIES = 3;
const DEFAULT_RETRY_DELAY_MS = 1000;
const MAX_CONCURRENT_REQUESTS = 5;

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  'X-Client-Version': '1.0.0',
  'X-Platform': 'web',
};

// Retriable HTTP status codes
const RETRIABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];

// ==================== Request Queue ====================

let requestQueue: QueuedRequest[] = [];
let activeRequests = 0;
let isProcessingQueue = false;

/**
 * Process queued requests (concurrency control)
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
      
      const { config, path, method, body, params, resolve, reject, retryCount } = queued;
      
      // Execute request without queueing again
      const client = getFetchClient();
      const requestConfig: FetchClientConfig = {
        ...config,
        skipRetry: true, // Prevent infinite retry loop
      };
      
      // Ensure maxRetries and retryDelayMs are passed
      if (retryCount === 0) {
        requestConfig.maxRetries = config.maxRetries;
        requestConfig.retryDelayMs = config.retryDelayMs;
      }
      
      executeRequest(client, path, method, body, params, requestConfig)
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
const queueRequest = (
  client: ReturnType<typeof createFetchClient>,
  path: string,
  method: HttpMethod,
  body: unknown,
  params: Record<string, string> | undefined,
  config: FetchClientConfig
): Promise<FetchResponse<unknown>> => {
  return new Promise((resolve, reject) => {
    const priorityMap = { high: 3, normal: 2, low: 1 };
    const priority = priorityMap[config.priority || 'normal'];
    
    requestQueue.push({
      config,
      path,
      method,
      body,
      params,
      resolve,
      reject,
      priority,
      timestamp: Date.now(),
      retryCount: 0,
    });
    
    processQueue();
  });
};

/**
 * Execute request with retry logic
 */
const executeRequest = async <T>(
  client: ReturnType<typeof createFetchClient>,
  path: string,
  method: HttpMethod,
  body?: unknown,
  params?: Record<string, string>,
  config?: FetchClientConfig,
  retryCount: number = 0
): Promise<FetchResponse<T>> => {
  const maxRetries = config?.maxRetries ?? DEFAULT_MAX_RETRIES;
  const retryDelayMs = config?.retryDelayMs ?? DEFAULT_RETRY_DELAY_MS;
  
  try {
    return await client.request<T>(path, method, body, params, config);
  } catch (error) {
    const fetchError = error as FetchError;
    const shouldRetry = 
      !config?.skipRetry &&
      retryCount < maxRetries &&
      (fetchError.status ? RETRIABLE_STATUS_CODES.includes(fetchError.status) : true);
    
    if (shouldRetry) {
      const delay = retryDelayMs * Math.pow(2, retryCount);
      await new Promise(resolve => setTimeout(resolve, delay));
      return executeRequest(client, path, method, body, params, config, retryCount + 1);
    }
    
    throw error;
  }
};

// ==================== Private Helpers ====================

/**
 * Build URL with query parameters
 */
const buildURL = (baseURL: string, path: string, params?: Record<string, string>): string => {
  const normalizedBase = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = new URL(normalizedPath, normalizedBase);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, value);
      }
    });
  }
  
  return url.toString();
};

/**
 * Create fetch request with timeout
 */
const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
};

/**
 * Parse response data based on content type
 */
const parseResponseData = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get('content-type');
  
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  
  if (contentType?.includes('text/')) {
    return response.text();
  }
  
  return response.blob();
};

/**
 * Create fetch error object
 */
const createFetchError = async (
  response: Response,
  data?: unknown,
  config?: FetchClientConfig
): Promise<FetchError> => {
  const error = new Error(`HTTP ${response.status}: ${response.statusText}`) as FetchError;
  error.name = 'FetchError';
  error.status = response.status;
  error.statusText = response.statusText;
  error.response = response;
  error.data = data;
  error.config = config;
  return error;
};

// ==================== Fetch Client Factory ====================

/**
 * Create fetch client with interceptors, timeout support, queue, and retry
 */
export const createFetchClient = (
  config: FetchClientConfig = {},
  requestInterceptors: RequestInterceptor[] = [],
  responseInterceptors: ResponseInterceptor[] = [],
  errorInterceptors: ErrorInterceptor[] = []
) => {
  const baseURL = config.baseURL || env.API_URL || (typeof window !== 'undefined' ? window.location.origin : '');
  const timeout = config.timeout || DEFAULT_TIMEOUT;
  const baseHeaders = {
    ...DEFAULT_HEADERS,
    ...config.headers,
  };
  
  /**
   * Apply request interceptors
   */
  const applyRequestInterceptors = (
    url: string,
    options: RequestInit
  ): { url: string; options: RequestInit } => {
    let result = { url, options };
    for (const interceptor of requestInterceptors) {
      result = interceptor(result.url, result.options);
    }
    return result;
  };
  
  /**
   * Apply response interceptors
   */
  const applyResponseInterceptors = async <T>(
    response: FetchResponse<T>
  ): Promise<FetchResponse<T>> => {
    let result = response;
    for (const interceptor of responseInterceptors) {
      result = await interceptor(result);
    }
    return result;
  };
  
  /**
   * Apply error interceptors
   */
  const applyErrorInterceptors = async (error: FetchError): Promise<never> => {
    let currentError = error;
    for (const interceptor of errorInterceptors) {
      try {
        await interceptor(currentError);
      } catch (newError) {
        currentError = newError as FetchError;
      }
    }
    throw currentError;
  };
  
  /**
   * Generic request method (internal - without queue)
   */
  const request = async <T>(
    path: string,
    method: HttpMethod,
    body?: unknown,
    params?: Record<string, string>,
    customConfig?: Partial<FetchClientConfig>
  ): Promise<FetchResponse<T>> => {
    // Build URL
    const url = buildURL(baseURL, path, params);
    
    // Prepare options
    const options: RequestInit = {
      method,
      headers: { ...baseHeaders, ...customConfig?.headers },
      credentials: 'include',
      ...customConfig,
    };
    
    if (body && method !== 'GET' && method !== 'DELETE') {
      options.body = JSON.stringify(body);
    }
    
    // Apply request interceptors
    const { url: finalUrl, options: finalOptions } = applyRequestInterceptors(url, options);
    
    try {
      // Make request
      const response = await fetchWithTimeout(finalUrl, finalOptions, customConfig?.timeout || timeout);
      
      // Parse response
      const data = await parseResponseData(response);
      
      // Build response object
      const fetchResponse: FetchResponse<T> = {
        data: data as T,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        ok: response.ok,
      };
      
      // Handle error responses
      if (!response.ok) {
        throw await createFetchError(response, data, customConfig);
      }
      
      // Apply response interceptors
      return applyResponseInterceptors(fetchResponse);
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (!customConfig?.skipRetry) {
          fetchError.retryCount = (fetchError.retryCount || 0) + 1;
        }
        await applyErrorInterceptors(fetchError);
      }
      throw error;
    }
  };
  
  /**
   * Public request method with queue and retry support
   */
  const requestWithQueue = async <T>(
    path: string,
    method: HttpMethod,
    body?: unknown,
    params?: Record<string, string>,
    customConfig?: FetchClientConfig
  ): Promise<FetchResponse<T>> => {
    // Use queue for concurrency control
    if (customConfig?.priority !== undefined) {
      return queueRequest(client, path, method, body, params, customConfig) as Promise<FetchResponse<T>>;
    }
    
    // Execute with retry logic
    return executeRequest<T>(client, path, method, body, params, customConfig);
  };
  
  const client = {
    /**
     * Internal request method (without queue)
     */
    request,
    
    /**
     * GET request with queue and retry
     */
    get: <T>(path: string, params?: Record<string, string>, customConfig?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return requestWithQueue<T>(path, 'GET', undefined, params, customConfig);
    },
    
    /**
     * POST request with queue and retry
     */
    post: <T>(path: string, body?: unknown, customConfig?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return requestWithQueue<T>(path, 'POST', body, undefined, customConfig);
    },
    
    /**
     * PUT request with queue and retry
     */
    put: <T>(path: string, body?: unknown, customConfig?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return requestWithQueue<T>(path, 'PUT', body, undefined, customConfig);
    },
    
    /**
     * PATCH request with queue and retry
     */
    patch: <T>(path: string, body?: unknown, customConfig?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return requestWithQueue<T>(path, 'PATCH', body, undefined, customConfig);
    },
    
    /**
     * DELETE request with queue and retry
     */
    delete: <T>(path: string, customConfig?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return requestWithQueue<T>(path, 'DELETE', undefined, undefined, customConfig);
    },
    
    /**
     * HEAD request with queue and retry
     */
    head: <T>(path: string, customConfig?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return requestWithQueue<T>(path, 'HEAD', undefined, undefined, customConfig);
    },
    
    /**
     * OPTIONS request with queue and retry
     */
    options: <T>(path: string, customConfig?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return requestWithQueue<T>(path, 'OPTIONS', undefined, undefined, customConfig);
    },
    
    /**
     * Get queue status
     */
    getQueueStatus: (): { queuedRequests: number; activeRequests: number; maxConcurrent: number } => {
      return {
        queuedRequests: requestQueue.length,
        activeRequests,
        maxConcurrent: MAX_CONCURRENT_REQUESTS,
      };
    },
    
    /**
     * Clear all queued requests
     */
    clearQueue: (): void => {
      const failedRequests = [...requestQueue];
      requestQueue = [];
      activeRequests = 0;
      
      failedRequests.forEach(({ reject }) => {
        reject(new Error('Request queue cleared'));
      });
    },
  };
  
  return client;
};

// ==================== Singleton Client ====================

let defaultClientInstance: ReturnType<typeof createFetchClient> | null = null;

/**
 * Get or create default fetch client instance
 */
export const getFetchClient = (config?: FetchClientConfig): ReturnType<typeof createFetchClient> => {
  if (!defaultClientInstance) {
    defaultClientInstance = createFetchClient(config);
  }
  return defaultClientInstance;
};

/**
 * Reset default fetch client instance
 */
export const resetFetchClient = (): void => {
  if (defaultClientInstance) {
    defaultClientInstance.clearQueue();
  }
  defaultClientInstance = null;
};

/**
 * Get queue status from default client
 */
export const getQueueStatus = (): { queuedRequests: number; activeRequests: number; maxConcurrent: number } => {
  const client = getFetchClient();
  return client.getQueueStatus();
};

/**
 * Clear queue from default client
 */
export const clearQueue = (): void => {
  const client = getFetchClient();
  client.clearQueue();
};

// ==================== Type Exports ====================

export type FetchClient = ReturnType<typeof createFetchClient>;
export type { ApiResponse, ApiErrorResponse };
