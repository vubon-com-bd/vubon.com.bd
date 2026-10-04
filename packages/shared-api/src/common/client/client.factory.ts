import { AxiosClient } from './axios-client';
import { FetchClient } from './fetch-client';
import type { HttpClient } from './client.types';

export type ClientKind = 'fetch' | 'axios';

let singleton: HttpClient | null = null;

/**
 * Create a client instance. Singleton by default.
 * `httpClient` (exported below) is the shared instance for the whole app.
 */
export function createHttpClient(kind: ClientKind = 'fetch'): HttpClient {
  if (singleton) return singleton;
  singleton = kind === 'axios' ? new AxiosClient() : new FetchClient();
  return singleton;
}

/** The ONE shared client. Import this everywhere. */
export const httpClient: HttpClient = createHttpClient('fetch');
