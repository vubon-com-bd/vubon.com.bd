/**
 * Shared HTTP client types.
 * No runtime code here — only shapes.
 */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';

export interface HttpRequestConfig {
  readonly method: HttpMethod;
  readonly url: string;
  readonly headers?: Record<string, string>;
  readonly query?: Record<string, string | number | boolean | undefined | null>;
  readonly body?: unknown;
  readonly signal?: AbortSignal;
  readonly timeout?: number;
  /** Free-form meta for interceptors (correlation id, etc.). */
  readonly meta?: Record<string, unknown>;
}

export interface HttpResponse<T = unknown> {
  readonly status: number;
  readonly data: T;
  readonly headers: Record<string, string>;
  readonly requestId: string;
}

export interface HttpClient {
  request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponse<T>>;
  get<T = unknown>(
    url: string,
    options?: Omit<HttpRequestConfig, 'method' | 'url'>
  ): Promise<HttpResponse<T>>;
  post<T = unknown>(
    url: string,
    body?: unknown,
    options?: Omit<HttpRequestConfig, 'method' | 'url' | 'body'>
  ): Promise<HttpResponse<T>>;
  put<T = unknown>(
    url: string,
    body?: unknown,
    options?: Omit<HttpRequestConfig, 'method' | 'url' | 'body'>
  ): Promise<HttpResponse<T>>;
  patch<T = unknown>(
    url: string,
    body?: unknown,
    options?: Omit<HttpRequestConfig, 'method' | 'url' | 'body'>
  ): Promise<HttpResponse<T>>;
  delete<T = unknown>(
    url: string,
    options?: Omit<HttpRequestConfig, 'method' | 'url'>
  ): Promise<HttpResponse<T>>;
}

export type RequestInterceptor = (
  config: HttpRequestConfig
) => HttpRequestConfig | Promise<HttpRequestConfig>;

export type ResponseInterceptor = <T>(
  response: HttpResponse<T>
) => HttpResponse<T> | Promise<HttpResponse<T>>;

export type ErrorInterceptor = (error: unknown) => unknown | Promise<unknown>;
