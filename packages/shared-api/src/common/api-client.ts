/**
 * API Client Interface
 * এপিআই ক্লায়েন্ট ইন্টারফেস
 */
export interface ApiClient {
  get<T = unknown>(url: string, config?: unknown): Promise<T>;
  post<T = unknown>(url: string, data?: unknown, config?: unknown): Promise<T>;
  put<T = unknown>(url: string, data?: unknown, config?: unknown): Promise<T>;
  patch<T = unknown>(url: string, data?: unknown, config?: unknown): Promise<T>;
  delete<T = unknown>(url: string, config?: unknown): Promise<T>;
}

export interface ApiClientConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  withCredentials: boolean;
}

export interface ApiClientOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
  retry?: RetryConfig;
}

export interface RetryConfig {
  attempts: number;
  delay: number;
  backoff: 'linear' | 'exponential';
  statusCodes: number[];
}

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: ApiClientConfig;
}
