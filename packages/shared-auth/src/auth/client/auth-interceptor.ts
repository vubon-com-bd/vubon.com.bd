/**
 * Auth Interceptor
 * প্রমীকরণ ইন্টারসেপ্টর
 */

import { HTTP_STATUS } from '@vubon/shared-constants';

export interface AuthInterceptorConfig {
  tokenStorage: {
    getAccessToken: () => string | null;
    getRefreshToken: () => string | null;
    setAccessToken: (token: string) => void;
    setRefreshToken: (token: string) => void;
    clearTokens: () => void;
  };
  onUnauthorized?: () => void;
  onTokenRefresh?: () => Promise<string>;
}

export interface AuthRequestConfig {
  headers: Record<string, string>;
  url?: string;
  method?: string;
}

export interface AuthError {
  response?: {
    status: number;
    data?: unknown;
  };
  config?: AuthRequestConfig;
  message?: string;
}

export class AuthInterceptor {
  private config: AuthInterceptorConfig;
  private isRefreshing: boolean = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor(config: AuthInterceptorConfig) {
    this.config = config;
  }

  /**
   * Add auth header to request
   * রিকোয়েস্টে অথ হেডার যোগ করা
   */
  addAuthHeader(request: AuthRequestConfig): Record<string, string> {
    const token = this.config.tokenStorage.getAccessToken();
    if (token) {
      return {
        ...request.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return request.headers;
  }

  /**
   * Handle response error
   * রেসপন্স এরর হ্যান্ডেল করা
   */
  async handleResponseError(error: AuthError): Promise<unknown> {
    const status = error.response?.status;

    if (status === HTTP_STATUS.UNAUTHORIZED) {
      return this.handleUnauthorized(error);
    }

    if (status === HTTP_STATUS.FORBIDDEN) {
      return this.handleForbidden(error);
    }

    throw error;
  }

  /**
   * Handle unauthorized error
   * আনঅথোরাইজড এরর হ্যান্ডেল করা
   */
  private async handleUnauthorized(error: AuthError): Promise<unknown> {
    const originalRequest = error.config;

    // If refresh token is available, try to refresh
    const refreshToken = this.config.tokenStorage.getRefreshToken();
    if (refreshToken && !this.isRefreshing) {
      this.isRefreshing = true;

      try {
        const newToken = await this.config.onTokenRefresh?.();
        if (newToken) {
          this.config.tokenStorage.setAccessToken(newToken);
          this.onRefreshSuccess(newToken);
          this.isRefreshing = false;

          // Retry original request with new token
          if (originalRequest) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            // In real implementation, retry the request
            return Promise.resolve({ data: {} });
          }
        }
      } catch (refreshError) {
        this.isRefreshing = false;
        this.onRefreshFailure();
        throw refreshError;
      }
    }

    // If already refreshing, queue the request
    if (this.isRefreshing) {
      return new Promise((resolve) => {
        this.refreshSubscribers.push((token: string) => {
          if (originalRequest) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            // In real implementation, retry the request
            resolve({ data: {} });
          }
        });
      });
    }

    // No refresh token available, trigger unauthorized
    if (this.config.onUnauthorized) {
      this.config.onUnauthorized();
    }
    throw error;
  }

  /**
   * Handle forbidden error
   * ফরবিডেন এরর হ্যান্ডেল করা
   */
  private handleForbidden(error: AuthError): Promise<never> {
    console.error('Access forbidden:', error);
    throw error;
  }

  /**
   * On refresh success
   * রিফ্রেশ সাফল্যে
   */
  private onRefreshSuccess(token: string): void {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  /**
   * On refresh failure
   * রিফ্রেশ ব্যর্থ হলে
   */
  private onRefreshFailure(): void {
    this.config.tokenStorage.clearTokens();
    if (this.config.onUnauthorized) {
      this.config.onUnauthorized();
    }
  }
}

export const createAuthInterceptor = (config: AuthInterceptorConfig): AuthInterceptor => {
  return new AuthInterceptor(config);
};
