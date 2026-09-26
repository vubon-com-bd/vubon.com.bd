import { resolveClientConfig } from './client.config';
import type { HttpClient, HttpRequestConfig, HttpResponse } from './client.types';

/**
 * Placeholder axios-based client.
 * If axios is not installed yet, DO NOT import this file anywhere.
 * When you add axios as a dependency, replace the body of `execute`.
 */
export class AxiosClient implements HttpClient {
  private readonly config = resolveClientConfig();

  private async execute<T>(cfg: HttpRequestConfig): Promise<HttpResponse<T>> {
    // TODO: wire axios instance here.
    // For now fall back to fetch-based path to keep build green.
    const { FetchClient } = await import('./fetch-client');
    return new FetchClient().request<T>(cfg);
  }

  request<T>(cfg: HttpRequestConfig) {
    return this.execute<T>(cfg);
  }
  get<T>(url: string, o: Omit<HttpRequestConfig, 'method' | 'url'> = {}) {
    return this.execute<T>({ ...o, method: 'GET', url });
  }
  post<T>(url: string, body?: unknown, o: Omit<HttpRequestConfig, 'method' | 'url' | 'body'> = {}) {
    return this.execute<T>({ ...o, method: 'POST', url, body });
  }
  put<T>(url: string, body?: unknown, o: Omit<HttpRequestConfig, 'method' | 'url' | 'body'> = {}) {
    return this.execute<T>({ ...o, method: 'PUT', url, body });
  }
  patch<T>(
    url: string,
    body?: unknown,
    o: Omit<HttpRequestConfig, 'method' | 'url' | 'body'> = {}
  ) {
    return this.execute<T>({ ...o, method: 'PATCH', url, body });
  }
  delete<T>(url: string, o: Omit<HttpRequestConfig, 'method' | 'url'> = {}) {
    return this.execute<T>({ ...o, method: 'DELETE', url });
  }
}
