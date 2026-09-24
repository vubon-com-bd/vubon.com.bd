export interface HttpClientConfig {
  readonly baseUrl: string;
  readonly timeoutMs: number;
  readonly retries: number;
}

export interface ClientResponse<T> {
  readonly data: T;
  readonly status: number;
}

export interface ExternalClient {
  get<T>(path: string): Promise<ClientResponse<T>>;
  post<T>(path: string, body: unknown): Promise<ClientResponse<T>>;
}
