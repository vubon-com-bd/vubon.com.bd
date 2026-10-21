/**
 * RetryService — exponential backoff retry helper
 * @module payment-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { retry } from '@vubon/shared-utils/common';

export const RETRY_SERVICE = Symbol('RETRY_SERVICE');

export interface RetryConfig {
  readonly attempts?: number;
  readonly delayMs?: number;
  readonly backoffFactor?: number;
  readonly maxDelayMs?: number;
  readonly shouldRetry?: (err: unknown, attempt: number) => boolean;
}

@Injectable()
export class RetryService {
  private readonly logger = new Logger(RetryService.name);

  async execute<T>(operation: string, fn: () => Promise<T>, config: RetryConfig = {}): Promise<T> {
    try {
      return await retry(fn, {
        attempts: config.attempts ?? 3,
        delayMs: config.delayMs ?? 200,
        backoffFactor: config.backoffFactor ?? 2,
        maxDelayMs: config.maxDelayMs ?? 5000,
        shouldRetry: config.shouldRetry,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`[${operation}] retries exhausted: ${msg}`);
      throw err;
    }
  }
}
