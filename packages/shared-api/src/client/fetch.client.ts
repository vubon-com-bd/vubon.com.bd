/**
 * Fetch Client
 * ফেচ ক্লায়েন্ট
 */
export interface FetchClientConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  withCredentials: boolean;
}

export interface FetchRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
}

export class FetchClient {
  private config: FetchClientConfig;

  constructor(config: FetchClientConfig) {
    this.config = config;
  }

  async get<T = unknown>(url: string, config?: FetchRequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  async post<T = unknown>(url: string, data?: unknown, config?: FetchRequestConfig): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  async put<T = unknown>(url: string, data?: unknown, config?: FetchRequestConfig): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: FetchRequestConfig): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }

  async delete<T = unknown>(url: string, config?: FetchRequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  private async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    options?: FetchRequestConfig
  ): Promise<T> {
    const fullUrl = `${this.config.baseURL}${url}`;
    const headers = {
      ...this.config.headers,
      ...options?.headers,
    };

    // Build URL with params
    let finalUrl = fullUrl;
    if (options?.params) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(options.params)) {
        params.append(key, value);
      }
      finalUrl += `?${params.toString()}`;
    }

    const requestOptions: RequestInit = {
      method,
      headers: headers as HeadersInit,
      credentials: this.config.withCredentials ? 'include' : 'omit',
      signal: AbortSignal.timeout(options?.timeout || this.config.timeout),
    };

    if (data && method !== 'GET' && method !== 'DELETE') {
      requestOptions.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(finalUrl, requestOptions);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }

      return responseData as T;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  async stream(url: string, config?: FetchRequestConfig): Promise<ReadableStream> {
    const fullUrl = `${this.config.baseURL}${url}`;
    const headers = {
      ...this.config.headers,
      ...config?.headers,
    };

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: headers as HeadersInit,
      credentials: this.config.withCredentials ? 'include' : 'omit',
      signal: AbortSignal.timeout(config?.timeout || this.config.timeout),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
    }

    return response.body as ReadableStream;
  }

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
  return new FetchClient({
    baseURL,
    timeout,
    headers,
    withCredentials,
  });
};
