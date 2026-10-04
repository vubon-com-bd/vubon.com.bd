/**
 * HTTP Helper — native fetch (Node 18+).
 */

export interface HttpRequestOptions {
  readonly method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  readonly headers?: Readonly<Record<string, string>>;
  readonly body?: unknown;
  readonly timeoutMs?: number;
}

export async function httpRequest<T = unknown>(
  url: string,
  options: HttpRequestOptions = {},
): Promise<T> {
  const { method = 'GET', headers = {}, body, timeoutMs = 30000 } = options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export async function httpGet<T = unknown>(
  url: string,
  options: Omit<HttpRequestOptions, 'method' | 'body'> = {},
): Promise<T> {
  return httpRequest<T>(url, { ...options, method: 'GET' });
}

export async function httpPost<T = unknown>(
  url: string,
  body?: unknown,
  options: Omit<HttpRequestOptions, 'method' | 'body'> = {},
): Promise<T> {
  return httpRequest<T>(url, { ...options, method: 'POST', body });
}

export async function httpPut<T = unknown>(
  url: string,
  body?: unknown,
  options: Omit<HttpRequestOptions, 'method' | 'body'> = {},
): Promise<T> {
  return httpRequest<T>(url, { ...options, method: 'PUT', body });
}

export async function httpDelete<T = unknown>(
  url: string,
  options: Omit<HttpRequestOptions, 'method' | 'body'> = {},
): Promise<T> {
  return httpRequest<T>(url, { ...options, method: 'DELETE' });
}
