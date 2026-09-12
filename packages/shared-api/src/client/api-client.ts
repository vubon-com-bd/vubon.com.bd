/**
 * ApiClient — fetch-based HTTP client with timeout & retries.
 * @module shared-api/client/api-client
 */

import { apiConfig } from '../config/api.config';
import { ApiError, NetworkError, TimeoutError, statusToErrorCode } from './errors';
import { runRequestInterceptors, runResponseInterceptors } from './interceptors';

export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  /** Skip auth header injection (e.g. login/register). */
  skipAuth?: boolean;
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

class ApiClientClass {
  private readonly baseUrl: string;
  private readonly defaultTimeout: number;
  private readonly retries: number;
  private readonly retryDelay: number;

  constructor() {
    this.baseUrl = apiConfig.baseUrl;
    this.defaultTimeout = apiConfig.timeout;
    this.retries = apiConfig.retries;
    this.retryDelay = apiConfig.retryDelay;
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const timeout = options.timeout ?? this.defaultTimeout;

    let attempt = 0;
    let lastError: unknown;

    while (attempt <= this.retries) {
      attempt++;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);

      try {
        const initial = await runRequestInterceptors({
          url,
          method,
          headers: { 'Content-Type': 'application/json', ...options.headers },
          body,
        });

        const response = await fetch(initial.url, {
          method: initial.method,
          headers: initial.headers,
          body: initial.body ? JSON.stringify(initial.body) : undefined,
          signal: options.signal ?? controller.signal,
        });

        const contentType = response.headers.get('content-type') ?? '';
        const data: unknown = contentType.includes('application/json')
          ? await response.json()
          : await response.text();

        const wrapped = await runResponseInterceptors({
          status: response.status,
          data,
          headers: Object.fromEntries(response.headers.entries()),
        });

        if (!response.ok) {
          throw new ApiError(
            wrapped.status,
            statusToErrorCode(wrapped.status),
            `HTTP ${wrapped.status}`,
            wrapped.data
          );
        }

        return wrapped.data as T;
      } catch (error) {
        clearTimeout(timer);
        lastError = error;

        if (error instanceof ApiError) {
          // Do not retry 4xx client errors (except 429).
          if (error.statusCode < 500 && error.statusCode !== 429) throw error;
        }
        if (error instanceof Error && error.name === 'AbortError') {
          lastError = new TimeoutError();
        }
        if (!(error instanceof ApiError) && !(error instanceof TimeoutError)) {
          lastError = new NetworkError(
            error instanceof Error ? error.message : 'Network error',
            error
          );
        }

        if (attempt <= this.retries) {
          await sleep(this.retryDelay * attempt);
        }
      } finally {
        clearTimeout(timer);
      }
    }

    throw lastError;
  }

  get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, undefined, options);
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', path, body, options);
  }

  put<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PUT', path, body, options);
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>('PATCH', path, body, options);
  }

  delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, undefined, options);
  }
}

export const ApiClient = new ApiClientClass();
