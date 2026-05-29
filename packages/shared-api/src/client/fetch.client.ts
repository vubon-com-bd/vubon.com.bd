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

// ==================== Types ====================

export interface FetchClientConfig extends RequestInit {
  baseURL?: string;
  timeout?: number;
  params?: Record<string, string>;
  skipAuth?: boolean;
  skipRefresh?: boolean;
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
}

// HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

// Request interceptor type
export type RequestInterceptor = (url: string, options: RequestInit) => { url: string; options: RequestInit };
export type ResponseInterceptor = <T>(response: FetchResponse<T>) => FetchResponse<T> | Promise<FetchResponse<T>>;
export type ErrorInterceptor = (error: FetchError) => Promise<never>;

// ==================== Constants ====================

const DEFAULT_TIMEOUT = 30000;
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
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
 * Create fetch timeout promise
 */
const createTimeoutPromise = (timeout: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timeout after ${timeout}ms`));
    }, timeout);
  });
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
  data?: unknown
): Promise<FetchError> => {
  const error = new Error(`HTTP ${response.status}: ${response.statusText}`) as FetchError;
  error.name = 'FetchError';
  error.status = response.status;
  error.statusText = response.statusText;
  error.response = response;
  error.data = data;
  return error;
};

// ==================== Fetch Client Factory ====================

/**
 * Create fetch client with interceptors and timeout support
 */
export const createFetchClient = (
  config: FetchClientConfig = {},
  requestInterceptors: RequestInterceptor[] = [],
  responseInterceptors: ResponseInterceptor[] = [],
  errorInterceptors: ErrorInterceptor[] = []
) => {
  const baseURL = config.baseURL || (typeof window !== 'undefined' ? window.location.origin : '');
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
   * Generic request method
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
        throw await createFetchError(response, data);
      }
      
      // Apply response interceptors
      return applyResponseInterceptors(fetchResponse);
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        await applyErrorInterceptors(fetchError);
      }
      throw error;
    }
  };
  
  return {
    /**
     * GET request
     */
    get: <T>(path: string, params?: Record<string, string>, config?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return request<T>(path, 'GET', undefined, params, config);
    },
    
    /**
     * POST request
     */
    post: <T>(path: string, body?: unknown, config?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return request<T>(path, 'POST', body, undefined, config);
    },
    
    /**
     * PUT request
     */
    put: <T>(path: string, body?: unknown, config?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return request<T>(path, 'PUT', body, undefined, config);
    },
    
    /**
     * PATCH request
     */
    patch: <T>(path: string, body?: unknown, config?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return request<T>(path, 'PATCH', body, undefined, config);
    },
    
    /**
     * DELETE request
     */
    delete: <T>(path: string, config?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return request<T>(path, 'DELETE', undefined, undefined, config);
    },
    
    /**
     * HEAD request
     */
    head: <T>(path: string, config?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return request<T>(path, 'HEAD', undefined, undefined, config);
    },
    
    /**
     * OPTIONS request
     */
    options: <T>(path: string, config?: Partial<FetchClientConfig>): Promise<FetchResponse<T>> => {
      return request<T>(path, 'OPTIONS', undefined, undefined, config);
    },
  };
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
  defaultClientInstance = null;
};

// ==================== Type Exports ====================

export type FetchClient = ReturnType<typeof createFetchClient>;
export type { ApiResponse, ApiErrorResponse };
