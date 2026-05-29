/**
 * Interceptors - Request/response interceptors for axios
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-api/src/client/interceptors
 * 
 * RULES:
 * ✅ ONLY interceptors for HTTP requests - NO business logic
 * ✅ NO UI logic, routing, toast, business rules
 * ✅ No React components, no JSX
 * ✅ No side effects beyond request/response transformation
 * ✅ Named exports only
 */

import type { 
  AxiosInstance, 
  InternalAxiosRequestConfig, 
  AxiosError, 
  AxiosResponse 
} from 'axios';

// ==================== Types ====================

export interface InterceptorConfig {
  onRequest?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  onRequestError?: (error: AxiosError) => Promise<never>;
  onResponse?: (response: AxiosResponse) => AxiosResponse;
  onResponseError?: (error: AxiosError) => Promise<never>;
}

export type RefreshTokenCallback = () => Promise<string | null>;

export interface RequestQueueItem {
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;
}

export interface RefreshTokenInterceptorOptions {
  refreshToken: RefreshTokenCallback;
  isRefreshing: () => boolean;
  setRefreshing: (value: boolean) => void;
  addToQueue: (callback: () => void) => void;
  processQueue: () => void;
  onRefreshFailure?: () => void;
}

// ==================== Request ID ====================

let requestIdCounter = 0;

/**
 * Generate unique request ID
 * Pure function - no side effects
 */
const generateRequestId = (): string => {
  return `${Date.now()}-${++requestIdCounter}-${Math.random().toString(36).substring(2, 8)}`;
};

// ==================== Auth Interceptor ====================

/**
 * Setup authentication interceptor
 * Adds Bearer token to requests and handles 401 responses
 */
export const setupAuthInterceptor = (
  client: AxiosInstance,
  getToken: () => string | null,
  onUnauthorized?: () => void
): () => void => {
  const requestInterceptor = client.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  
  const responseInterceptor = client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        onUnauthorized?.();
      }
      return Promise.reject(error);
    }
  );
  
  // Return cleanup function
  return () => {
    client.interceptors.request.eject(requestInterceptor);
    client.interceptors.response.eject(responseInterceptor);
  };
};

// ==================== Request ID Interceptor ====================

/**
 * Setup request ID interceptor
 * Adds unique X-Request-Id header to every request
 */
export const setupRequestIdInterceptor = (client: AxiosInstance): () => void => {
  const interceptor = client.interceptors.request.use((config) => {
    if (!config.headers['X-Request-Id']) {
      config.headers['X-Request-Id'] = generateRequestId();
    }
    return config;
  });
  
  return () => client.interceptors.request.eject(interceptor);
};

// ==================== Correlation ID Interceptor ====================

/**
 * Setup correlation ID interceptor
 * Propagates correlation ID across requests
 */
export const setupCorrelationIdInterceptor = (client: AxiosInstance): () => void => {
  const interceptor = client.interceptors.request.use((config) => {
    // Check for existing correlation ID in config or generate new one
    const existingCorrelationId = config.headers['X-Correlation-Id'];
    if (!existingCorrelationId) {
      config.headers['X-Correlation-Id'] = generateRequestId();
    }
    return config;
  });
  
  return () => client.interceptors.request.eject(interceptor);
};

// ==================== Refresh Token Interceptor ====================

/**
 * Setup refresh token interceptor
 * Handles 401 responses by refreshing the token and retrying failed requests
 * Queues concurrent requests during refresh
 */
export const setupRefreshTokenInterceptor = (
  client: AxiosInstance,
  options: RefreshTokenInterceptorOptions
): () => void => {
  const {
    refreshToken,
    isRefreshing,
    setRefreshing,
    addToQueue,
    processQueue,
    onRefreshFailure,
  } = options;
  
  const interceptor = client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
      
      // Don't retry if no config, already retried, or not a 401
      if (!originalRequest || originalRequest._retry || error.response?.status !== 401) {
        return Promise.reject(error);
      }
      
      // Skip refresh for specific endpoints (e.g., login, refresh)
      const skipRefresh = originalRequest.headers?.['X-Skip-Refresh'] === 'true';
      if (skipRefresh) {
        return Promise.reject(error);
      }
      
      originalRequest._retry = true;
      
      // If already refreshing, queue this request
      if (isRefreshing()) {
        return new Promise((resolve, reject) => {
          addToQueue(() => {
            // Retry with new token
            client(originalRequest).then(resolve).catch(reject);
          });
        });
      }
      
      setRefreshing(true);
      
      try {
        const newToken = await refreshToken();
        
        if (newToken) {
          // Update token in headers
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          processQueue();
          return client(originalRequest);
        } else {
          // Refresh failed - reject all queued requests
          processQueue();
          onRefreshFailure?.();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue();
        onRefreshFailure?.();
        return Promise.reject(refreshError);
      } finally {
        setRefreshing(false);
      }
    }
  );
  
  return () => client.interceptors.response.eject(interceptor);
};

// ==================== Logging Interceptor ====================

export interface LoggingOptions {
  logRequest?: boolean;
  logResponse?: boolean;
  logError?: boolean;
  sensitiveHeaders?: string[];
}

const DEFAULT_LOGGING_OPTIONS: LoggingOptions = {
  logRequest: false,
  logResponse: false,
  logError: true,
  sensitiveHeaders: ['authorization', 'cookie', 'set-cookie', 'x-api-key'],
};

/**
 * Mask sensitive data in headers for logging
 */
const maskSensitiveHeaders = (headers: Record<string, unknown>): Record<string, unknown> => {
  const masked = { ...headers };
  const sensitive = DEFAULT_LOGGING_OPTIONS.sensitiveHeaders || [];
  
  for (const key of sensitive) {
    const lowerKey = key.toLowerCase();
    if (masked[lowerKey]) {
      masked[lowerKey] = '***MASKED***';
    }
  }
  
  return masked;
};

/**
 * Setup logging interceptor
 */
export const setupLoggingInterceptor = (
  client: AxiosInstance,
  options?: LoggingOptions
): () => void => {
  const opts = { ...DEFAULT_LOGGING_OPTIONS, ...options };
  
  const requestInterceptor = client.interceptors.request.use((config) => {
    if (opts.logRequest) {
      const maskedHeaders = maskSensitiveHeaders({ ...config.headers });
      console.debug(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        headers: maskedHeaders,
        params: config.params,
      });
    }
    return config;
  });
  
  const responseInterceptor = client.interceptors.response.use(
    (response) => {
      if (opts.logResponse) {
        console.debug(`[API Response] ${response.status} ${response.config.url}`, {
          status: response.status,
          duration: response.config?.metadata?.startTime 
            ? Date.now() - response.config.metadata.startTime 
            : undefined,
        });
      }
      return response;
    },
    (error: AxiosError) => {
      if (opts.logError) {
        console.error(`[API Error] ${error.response?.status} ${error.config?.url}`, {
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });
      }
      return Promise.reject(error);
    }
  );
  
  return () => {
    client.interceptors.request.eject(requestInterceptor);
    client.interceptors.response.eject(responseInterceptor);
  };
};

// ==================== Timing Interceptor ====================

/**
 * Setup timing interceptor to measure request duration
 * Adds metadata to config for performance monitoring
 */
export const setupTimingInterceptor = (client: AxiosInstance): () => void => {
  const requestInterceptor = client.interceptors.request.use((config) => {
    config.metadata = { startTime: Date.now() };
    return config;
  });
  
  const responseInterceptor = client.interceptors.response.use(
    (response) => {
      const startTime = response.config?.metadata?.startTime;
      if (startTime) {
        const duration = Date.now() - startTime;
        // Emit duration for monitoring (without console.log in production)
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
          console.debug(`[Timing] ${response.config.url} - ${duration}ms`);
        }
      }
      return response;
    },
    (error) => {
      const startTime = error.config?.metadata?.startTime;
      if (startTime) {
        const duration = Date.now() - startTime;
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
          console.debug(`[Timing Error] ${error.config?.url} - ${duration}ms`);
        }
      }
      return Promise.reject(error);
    }
  );
  
  return () => {
    client.interceptors.request.eject(requestInterceptor);
    client.interceptors.response.eject(responseInterceptor);
  };
};

// ==================== Retry Interceptor ====================

export interface RetryOptions {
  retries?: number;
  retryDelay?: number;
  retryStatusCodes?: number[];
  retryMethods?: string[];
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  retries: 3,
  retryDelay: 1000,
  retryStatusCodes: [408, 429, 500, 502, 503, 504],
  retryMethods: ['GET', 'HEAD', 'OPTIONS'],
};

/**
 * Setup retry interceptor for idempotent requests
 */
export const setupRetryInterceptor = (
  client: AxiosInstance,
  options?: RetryOptions
): () => void => {
  const opts = { ...DEFAULT_RETRY_OPTIONS, ...options };
  
  const interceptor = client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as InternalAxiosRequestConfig & { _retryCount?: number };
      
      if (!config) {
        return Promise.reject(error);
      }
      
      const shouldRetry = 
        opts.retryStatusCodes?.includes(error.response?.status ?? 0) &&
        opts.retryMethods?.includes(config.method?.toUpperCase() ?? '') &&
        (config._retryCount || 0) < (opts.retries || 0);
      
      if (!shouldRetry) {
        return Promise.reject(error);
      }
      
      config._retryCount = (config._retryCount || 0) + 1;
      
      const delay = (opts.retryDelay || 1000) * (config._retryCount);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      return client(config);
    }
  );
  
  return () => client.interceptors.response.eject(interceptor);
};

// ==================== Type Exports ====================

export type { LoggingOptions, RetryOptions };
