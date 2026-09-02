/**
 * Axios Client
 * অ্যাক্সিওস ক্লায়েন্ট
 */
export interface AxiosClientConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
  withCredentials: boolean;
}

export interface AxiosRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
}

export interface AxiosResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface AxiosRequestConfigType {
  method: string;
  url: string;
  headers: Record<string, string>;
  data: unknown;
  params: Record<string, string>;
  timeout: number;
  withCredentials: boolean;
}

export type AxiosRequestInterceptor = (config: AxiosRequestConfigType) => AxiosRequestConfigType;

export type AxiosResponseInterceptor = <T>(response: AxiosResponse<T>) => AxiosResponse<T>;
export type AxiosErrorInterceptor = (error: Error) => Error;

export class AxiosClient {
  private config: AxiosClientConfig;
  private requestInterceptors: AxiosRequestInterceptor[];
  private responseInterceptors: AxiosResponseInterceptor[];
  private errorInterceptors: AxiosErrorInterceptor[];

  constructor(config: AxiosClientConfig) {
    this.config = config;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
    this.errorInterceptors = [];
  }

  async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  async post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  async put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  async patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  private async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const fullUrl = `${this.config.baseURL}${url}`;
    const headers = {
      ...this.config.headers,
      ...options?.headers,
    };

    // Build request config with required fields
    let requestConfig: AxiosRequestConfigType = {
      method,
      url: fullUrl,
      headers,
      data: data ?? null,
      params: options?.params || {},
      timeout: options?.timeout || this.config.timeout,
      withCredentials: this.config.withCredentials,
    };

    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      requestConfig = interceptor(requestConfig);
    }

    try {
      const response = await fetch(fullUrl, {
        method: requestConfig.method,
        headers: requestConfig.headers as HeadersInit,
        body: requestConfig.data ? JSON.stringify(requestConfig.data) : undefined,
        credentials: requestConfig.withCredentials ? 'include' : 'omit',
        signal: AbortSignal.timeout(requestConfig.timeout),
      });

      const responseData = await response.json();

      let axiosResponse: AxiosResponse<T> = {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      };

      // Apply response interceptors
      for (const interceptor of this.responseInterceptors) {
        axiosResponse = interceptor(axiosResponse);
      }

      if (!response.ok) {
        const error = new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        let finalError = error;
        for (const interceptor of this.errorInterceptors) {
          finalError = interceptor(finalError);
        }
        throw finalError;
      }

      return axiosResponse.data as T;
    } catch (error) {
      let finalError = error as Error;
      for (const interceptor of this.errorInterceptors) {
        finalError = interceptor(finalError);
      }
      throw finalError;
    }
  }

  addRequestInterceptor(interceptor: AxiosRequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(interceptor: AxiosResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  addErrorInterceptor(interceptor: AxiosErrorInterceptor): void {
    this.errorInterceptors.push(interceptor);
  }
}

export const createAxiosClient = (
  baseURL: string,
  timeout: number = 30000,
  headers: Record<string, string> = {},
  withCredentials: boolean = true
): AxiosClient => {
  return new AxiosClient({
    baseURL,
    timeout,
    headers,
    withCredentials,
  });
};
