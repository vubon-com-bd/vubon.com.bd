/**
 * BaseHttpProvider — shared HTTP scaffolding for HTTP-based providers
 * @module notification-service/infrastructure/providers/base
 */
import { Logger } from '@nestjs/common';
import {
  ProviderError,
  ProviderNetworkError,
  ProviderRateLimitError,
  type IProvider,
  type ProviderChannel,
  type ProviderHealthStatus,
  type ProviderInfo,
  type ProviderRateLimits,
} from './provider.types.js';

export interface HttpProviderConfig {
  readonly name: string;
  readonly channel: ProviderChannel;
  readonly timeoutMs?: number;
  readonly maxRetries?: number;
  readonly perSecond?: number;
  readonly perDay?: number;
}

export abstract class BaseHttpProvider implements IProvider {
  readonly name: string;
  readonly channel: ProviderChannel;

  protected readonly logger: Logger;
  protected readonly timeoutMs: number;

  constructor(protected readonly config: HttpProviderConfig) {
    this.name = config.name;
    this.channel = config.channel;
    this.logger = new Logger(config.name);
    this.timeoutMs = config.timeoutMs ?? 15_000;
  }

  abstract isEnabled(): boolean;
  abstract health(): Promise<ProviderHealthStatus>;

  info(): ProviderInfo {
    return {
      name: this.name,
      channel: this.channel,
      enabled: this.isEnabled(),
    };
  }

  rateLimits(): ProviderRateLimits {
    return {
      perSecond: this.config.perSecond ?? 100,
      perDay: this.config.perDay ?? 50_000,
    };
  }

  protected async httpRequest<TResponse = unknown>(input: {
    readonly method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    readonly url: string;
    readonly headers?: Readonly<Record<string, string>>;
    readonly body?: unknown;
    readonly bodyRaw?: string;
  }): Promise<{ status: number; body: TResponse; headers: Record<string, string> }> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const res = await fetch(input.url, {
        method: input.method,
        headers: {
          'Content-Type': 'application/json',
          ...(input.headers ?? {}),
        },
        body: input.bodyRaw ?? (input.body === undefined ? undefined : JSON.stringify(input.body)),
        signal: controller.signal,
      });

      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => { headers[k.toLowerCase()] = v; });

      const text = await res.text();
      let body: unknown = null;
      if (text) {
        try { body = JSON.parse(text); } catch { body = text; }
      }

      if (res.status === 429) {
        const retryAfterSec = Number(headers['retry-after'] ?? 60);
        throw new ProviderRateLimitError(this.name, retryAfterSec * 1000);
      }

      if (!res.ok) {
        const message = this.extractErrorMessage(body) ?? `HTTP ${res.status}`;
        throw new ProviderError(
          `HTTP ${res.status}: ${message}`,
          this.name,
          `HTTP_${res.status}`,
          res.status >= 500,
          body,
        );
      }

      return { status: res.status, body: body as TResponse, headers };
    } catch (err) {
      if (err instanceof ProviderError) throw err;
      const message = err instanceof Error ? err.message : String(err);
      throw new ProviderNetworkError(this.name, message, err);
    } finally {
      clearTimeout(timer);
    }
  }

  protected extractErrorMessage(body: unknown): string | undefined {
    if (!body) return undefined;
    if (typeof body === 'string') return body;
    if (typeof body === 'object') {
      const obj = body as Record<string, unknown>;
      if (typeof obj['message'] === 'string') return obj['message'];
      if (typeof obj['error'] === 'string') return obj['error'];
      if (Array.isArray(obj['errors']) && obj['errors'].length > 0) {
        const first = obj['errors'][0] as Record<string, unknown>;
        if (typeof first['message'] === 'string') return first['message'];
      }
    }
    return undefined;
  }
}
