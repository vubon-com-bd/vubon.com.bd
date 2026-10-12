/**
 * BaseLogisticsCourierAdapter — common logic for all logistics couriers
 * @module logistics-service/infrastructure/external/couriers
 *
 * Extends shared-kernel BaseCourierService with:
 *  - HTTP client via shared-utils (httpPost/httpGet)
 *  - retry with exponential backoff
 *  - consistent error wrapping
 *  - structured logging
 */
import { Logger } from '@nestjs/common';
import { BaseCourierService } from '@vubon/shared-kernel/infrastructure/external/courier';
import type {
  CourierCreateShipmentInput,
  CourierCreateShipmentResult,
  CourierTrackResult,
  CourierCancelResult,
} from '@vubon/shared-kernel/infrastructure/external/courier';
import { httpPost, httpGet } from '@vubon/shared-utils/common';

export interface RetryOptions {
  readonly attempts: number;
  readonly baseDelayMs: number;
}

export abstract class BaseLogisticsCourierAdapter extends BaseCourierService {
  abstract readonly name: string;
  protected readonly logger: Logger;
  protected abstract readonly config: {
    readonly enabled: boolean;
    readonly baseUrl: string;
    readonly timeoutMs: number;
  };
  protected readonly retry: RetryOptions = { attempts: 3, baseDelayMs: 500 };

  protected constructor(name: string) {
    super();
    this.logger = new Logger(name);
  }

  protected async withRetry<T>(fn: () => Promise<T>, context: string): Promise<T> {
    let lastErr: unknown;
    for (let i = 0; i < this.retry.attempts; i++) {
      try {
        return await fn();
      } catch (err) {
        lastErr = err;
        const msg = err instanceof Error ? err.message : String(err);
        this.logger.warn(`[${context}] attempt ${i + 1}/${this.retry.attempts} failed: ${msg}`);
        if (i < this.retry.attempts - 1) {
          await new Promise((r) => setTimeout(r, this.retry.baseDelayMs * Math.pow(2, i)));
        }
      }
    }
    throw lastErr;
  }

  protected async post<T>(path: string, body: unknown): Promise<T> {
    return httpPost<T>(`${this.config.baseUrl}${path}`, body, { timeoutMs: this.config.timeoutMs });
  }

  protected async get<T>(path: string): Promise<T> {
    return httpGet<T>(`${this.config.baseUrl}${path}`, { timeoutMs: this.config.timeoutMs });
  }

  protected ensureEnabled(): void {
    if (!this.config.enabled) {
      throw new CourierAdapterError(
        `Courier ${this.name} is disabled`,
        'COURIER_DISABLED',
        { courier: this.name },
      );
    }
  }

  protected errResult(context: string, err: unknown): { success: false; error: string } {
    const msg = err instanceof Error ? err.message : String(err);
    this.logger.error(`[${context}] ${msg}`);
    return { success: false, error: msg };
  }
}

export class CourierAdapterError extends Error {
  readonly code: string;
  readonly context?: Readonly<Record<string, unknown>>;
  constructor(message: string, code: string, context?: Readonly<Record<string, unknown>>) {
    super(message);
    this.name = 'CourierAdapterError';
    this.code = code;
    this.context = context;
  }
}
