/**
 * API Interceptors
 * এপিআই ইন্টারসেপ্টর
 */
export interface InterceptorContext {
  request: {
    url: string;
    method: string;
    headers: Record<string, string>;
    data?: unknown;
    params?: Record<string, string>;
  };
  response: {
    data: unknown;
    status: number;
    statusText: string;
    headers: Record<string, string>;
  };
  error: Error;
}

export type RequestInterceptor = (
  config: InterceptorContext['request']
) => InterceptorContext['request'];
export type ResponseInterceptor = (
  response: InterceptorContext['response']
) => InterceptorContext['response'];
export type ErrorInterceptor = (error: Error) => Error;

export const createInterceptors = () => {
  const requestInterceptors: RequestInterceptor[] = [];
  const responseInterceptors: ResponseInterceptor[] = [];
  const errorInterceptors: ErrorInterceptor[] = [];

  return {
    // Request interceptors
    addRequestInterceptor: (interceptor: RequestInterceptor) => {
      requestInterceptors.push(interceptor);
    },
    applyRequestInterceptors: (
      config: InterceptorContext['request']
    ): InterceptorContext['request'] => {
      let result = config;
      for (const interceptor of requestInterceptors) {
        result = interceptor(result);
      }
      return result;
    },

    // Response interceptors
    addResponseInterceptor: (interceptor: ResponseInterceptor) => {
      responseInterceptors.push(interceptor);
    },
    applyResponseInterceptors: (
      response: InterceptorContext['response']
    ): InterceptorContext['response'] => {
      let result = response;
      for (const interceptor of responseInterceptors) {
        result = interceptor(result);
      }
      return result;
    },

    // Error interceptors
    addErrorInterceptor: (interceptor: ErrorInterceptor) => {
      errorInterceptors.push(interceptor);
    },
    applyErrorInterceptors: (error: Error): Error => {
      let result = error;
      for (const interceptor of errorInterceptors) {
        result = interceptor(result);
      }
      return result;
    },
  };
};

// Common interceptors
export const authInterceptor = (token: string): RequestInterceptor => {
  return (config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  };
};

export const loggingInterceptor = () => {
  return {
    request: (config: InterceptorContext['request']): InterceptorContext['request'] => {
      console.error(`[API] ${config.method} ${config.url}`);
      return config;
    },
    response: (response: InterceptorContext['response']): InterceptorContext['response'] => {
      console.error(`[API] Response ${response.status} ${response.statusText}`);
      return response;
    },
    error: (error: Error): Error => {
      console.error(`[API] Error:`, error.message);
      return error;
    },
  };
};

export const retryInterceptor = (maxAttempts: number = 3): ErrorInterceptor => {
  let attempts = 0;
  return (error) => {
    attempts++;
    if (attempts < maxAttempts) {
      console.error(`[API] Retry ${attempts}/${maxAttempts}`);
    }
    return error;
  };
};
