import { Injectable, Logger } from '@nestjs/common';
import { RETRY_CONFIG } from '../../config/retry.config';

export interface RetryOptions {
  readonly maxAttempts?: number;
  readonly initialDelayMs?: number;
  readonly maxDelayMs?: number;
  readonly backoffMultiplier?: number;
  readonly retryable?: (error: unknown) => boolean;
}

@Injectable()
export class RetryService {
  private readonly logger = new Logger(RetryService.name);

  async execute<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {},
  ): Promise<T> {
    const maxAttempts = options.maxAttempts ?? RETRY_CONFIG.maxAttempts;
    const initialDelayMs = options.initialDelayMs ?? RETRY_CONFIG.initialDelayMs;
    const maxDelayMs = options.maxDelayMs ?? RETRY_CONFIG.maxDelayMs;
    const multiplier = options.backoffMultiplier ?? RETRY_CONFIG.backoffMultiplier;
    const retryable = options.retryable ?? (() => true);

    let attempt = 0;
    let delay = initialDelayMs;

    while (attempt < maxAttempts) {
      try {
        return await fn();
      } catch (error) {
        attempt += 1;
        if (attempt >= maxAttempts || !retryable(error)) {
          throw error;
        }
        this.logger.warn(`Retry attempt ${attempt}/${maxAttempts} after ${delay}ms`);
        await new Promise((r) => setTimeout(r, delay));
        delay = Math.min(delay * multiplier, maxDelayMs);
      }
    }

    throw new Error('Retry exhausted');
  }
}
