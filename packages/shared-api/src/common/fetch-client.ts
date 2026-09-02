import { ApiClient, ApiClientConfig, ApiClientOptions, RetryConfig } from './api-client';

export class FetchClient implements ApiClient {
  private config: ApiClientConfig;
  private retryConfig: RetryConfig;

  constructor(config: ApiClientConfig, retryConfig?: RetryConfig) {
    this.config = config;
    this.retryConfig = retryConfig || {
      attempts: 3,
      delay: 1000,
      backoff: 'exponential',
      statusCodes: [500, 502, 503, 504],
    };
  }

  async get<T = unknown>(url: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>('GET', url, undefined, options);
  }

  async post<T = unknown>(url: string, data?: unknown, options?: ApiClientOptions): Promise<T> {
    return this.request<T>('POST', url, data, options);
  }

  async put<T = unknown>(url: string, data?: unknown, options?: ApiClientOptions): Promise<T> {
    return this.request<T>('PUT', url, data, options);
  }

  async patch<T = unknown>(url: string, data?: unknown, options?: ApiClientOptions): Promise<T> {
    return this.request<T>('PATCH', url, data, options);
  }

  async delete<T = unknown>(url: string, options?: ApiClientOptions): Promise<T> {
    return this.request<T>('DELETE', url, undefined, options);
  }

  private async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    options?: ApiClientOptions
  ): Promise<T> {
    const fullUrl = `${this.config.baseURL}${url}`;
    const headers = {
      ...this.config.headers,
      ...options?.headers,
    };

    let attempt = 0;
    let lastError: Error | null = null;

    while (attempt < this.retryConfig.attempts) {
      try {
        const requestOptions: RequestInit = {
          method,
          headers: headers as HeadersInit,
          credentials: this.config.withCredentials ? 'include' : 'omit',
          signal: AbortSignal.timeout(options?.timeout || this.config.timeout),
        };

        if (data && method !== 'GET' && method !== 'DELETE') {
          requestOptions.body = JSON.stringify(data);
        }

        const response = await fetch(fullUrl, requestOptions);
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }

        return responseData as T;
      } catch (error) {
        lastError = error as Error;

        if (this.retryConfig.statusCodes.includes(500)) {
          attempt++;
          if (attempt < this.retryConfig.attempts) {
            const delay = this.getRetryDelay(attempt);
            await this.sleep(delay);
            continue;
          }
        }
        throw error;
      }
    }

    throw lastError || new Error('Request failed');
  }

  private getRetryDelay(attempt: number): number {
    if (this.retryConfig.backoff === 'exponential') {
      return this.retryConfig.delay * Math.pow(2, attempt - 1);
    }
    return this.retryConfig.delay;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Streaming support
  async stream(url: string, options?: ApiClientOptions): Promise<ReadableStream> {
    const fullUrl = `${this.config.baseURL}${url}`;
    const headers = {
      ...this.config.headers,
      ...options?.headers,
    };

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers as HeadersInit,
      credentials: this.config.withCredentials ? 'include' : 'omit',
      signal: AbortSignal.timeout(options?.timeout || this.config.timeout),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    return response.body as ReadableStream;
  }

  // Abort request
  abort(controller: AbortController): void {
    controller.abort();
  }
}

export const createFetchClient = (
  baseURL: string,
  timeout: number = 30000,
  headers: Record<string, string> = {},
  withCredentials: boolean = true
): FetchClient => {
  const config: ApiClientConfig = {
    baseURL,
    timeout,
    headers,
    withCredentials,
  };

  return new FetchClient(config);
};
