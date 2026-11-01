import { ErrorFactory } from '../errors/error-factory';
import { resolveClientConfig } from './client.config';
import type { HttpClient, HttpRequestConfig, HttpResponse } from './client.types';

/**
 * Native fetch-based client.
 * Wraps fetch, applies timeout via AbortController, maps errors via ErrorFactory.
 */
export class FetchClient implements HttpClient {
  private readonly config = resolveClientConfig();

  private buildUrl(url: string, query?: HttpRequestConfig['query']): string {
    const base = url.startsWith('http') ? url : `${this.config.baseUrl}${url}`;
    if (!query) return base;
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(query)) {
      if (v !== undefined) params.set(k, String(v));
    }
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }

  private async execute<T>(cfg: HttpRequestConfig): Promise<HttpResponse<T>> {
    const controller = new AbortController();
    const timeoutMs = cfg.timeout ?? this.config.defaultTimeoutMs;
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    if (cfg.signal) {
      if (cfg.signal.aborted) controller.abort();
      else
        cfg.signal.addEventListener('abort', () => controller.abort(), {
          once: true,
        });
    }

    const requestId =
      (cfg.meta?.requestId as string | undefined) ??
      (cfg.headers?.['X-Request-Id'] as string | undefined) ??
      `req_${Date.now().toString(36)}`;

    try {
      const res = await fetch(this.buildUrl(cfg.url, cfg.query), {
        method: cfg.method,
        headers: {
          ...this.config.defaultHeaders,
          'User-Agent': this.config.userAgent,
          'X-Request-Id': requestId,
          ...(cfg.headers ?? {}),
        },
        body: cfg.body === undefined ? undefined : JSON.stringify(cfg.body),
        signal: controller.signal,
      });

      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => {
        headers[k.toLowerCase()] = v;
      });

      let data: unknown = null;
      const text = await res.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          data = text;
        }
      }

      if (!res.ok) {
        const retryAfter = headers['retry-after'] ? Number(headers['retry-after']) : undefined;
        throw ErrorFactory.fromHttp({
          status: res.status,
          method: cfg.method,
          url: cfg.url,
          responseBody: data,
          retryAfter,
        });
      }

      return {
        status: res.status,
        data: data as T,
        headers,
        requestId,
      };
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        throw ErrorFactory.fromTimeout(timeoutMs, err);
      }
      if (err && typeof err === 'object' && 'code' in err) throw err;
      throw ErrorFactory.fromNetwork(err);
    } finally {
      clearTimeout(timer);
    }
  }

  request<T>(cfg: HttpRequestConfig): Promise<HttpResponse<T>> {
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
