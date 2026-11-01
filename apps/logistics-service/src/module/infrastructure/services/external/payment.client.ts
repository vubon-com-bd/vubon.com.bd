/**
 * PaymentClient — HTTP client for payment-service
 * @module logistics-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface PaymentDTO {
  readonly id: string;
  readonly orderId?: string;
  readonly amount?: number;
  readonly currency?: string;
  readonly status?: string;
}

const SERVICE_URL_KEY = 'PAYMENT_SERVICE_URL';
const DEFAULT_URL = 'http://localhost:3006';
const DEFAULT_TIMEOUT_MS = 5000;

@Injectable()
export class PaymentClient {
  private readonly logger = new Logger(PaymentClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv(SERVICE_URL_KEY, DEFAULT_URL);
    this.timeoutMs = Number(getOptionalEnv('PAYMENT_SERVICE_TIMEOUT_MS', String(DEFAULT_TIMEOUT_MS)));
  }

  async getById(id: string): Promise<PaymentDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/payments/${id}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        this.logger.warn(`Payment fetch failed (${id}): HTTP ${res.status}`);
        return null;
      }
      const body = (await res.json()) as { data?: PaymentDTO } | PaymentDTO;
      return 'data' in body && body.data ? body.data : (body as PaymentDTO);
    } catch (err) {
      this.logger.warn(`Payment fetch error (${id}): ${this.errMsg(err)}`);
      return null;
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  private errMsg(err: unknown): string {
    return err instanceof Error ? err.message : 'unknown';
  }
}
