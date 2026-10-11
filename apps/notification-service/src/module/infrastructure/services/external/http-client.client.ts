/**
 * BaseHttpClient — minimal fetch-based HTTP client for cross-service calls
 * @module notification-service/infrastructure/services/external
 *
 * Uses native fetch (Node 18+) — no external dependency required.
 * Gracefully degrades when base URL is missing.
 */
import { Logger } from '@nestjs/common';

export interface BaseHttpClientConfig {
  readonly name: string;
  readonly envKey: string;
  readonly defaultTimeoutMs?: number;
}

export class BaseHttpClient {
  protected readonly logger: Logger;
  private readonly baseUrl: string | null;
  private readonly timeoutMs: number;

  constructor(protected readonly config: BaseHttpClientConfig) {
    this.logger = new Logger(config.name);
    const raw = process.env[config.envKey];
    this.baseUrl = raw && raw.trim().length > 0 ? raw.replace(/\/$/, '') : null;
    this.timeoutMs = config.defaultTimeoutMs ?? 10_000;
    if (!this.baseUrl) {
      this.logger.warn(
        `${config.name}: env ${config.envKey} not set — cross-service calls will be skipped`,
      );
    }
  }

  isEnabled(): boolean {
    return this.baseUrl !== null;
  }

  protected async get<T>(path: string, authToken?: string): Promise<T | null> {
    if (!this.baseUrl) return null;
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        this.logger.warn(`GET ${path} → HTTP ${res.status}`);
        return null;
      }
      return (await res.json()) as T;
    } catch (err) {
      this.logger.warn(`GET ${path} failed: ${(err as Error).message}`);
      return null;
    }
  }

  protected async post<T>(
    path: string,
    body: unknown,
    authToken?: string,
  ): Promise<T | null> {
    if (!this.baseUrl) return null;
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        this.logger.warn(`POST ${path} → HTTP ${res.status}`);
        return null;
      }
      return (await res.json()) as T;
    } catch (err) {
      this.logger.warn(`POST ${path} failed: ${(err as Error).message}`);
      return null;
    }
  }
}
