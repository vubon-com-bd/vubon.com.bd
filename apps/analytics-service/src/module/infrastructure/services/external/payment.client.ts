/**
 * Payment Service Client
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface PaymentDTO {
  readonly id: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: string;
  readonly method: string;
  readonly createdAt: string;
}

@Injectable()
export class PaymentClient {
  private readonly logger = new Logger(PaymentClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('PAYMENT_SERVICE_URL', 'http://localhost:3007');
    this.timeout = Number(getOptionalEnv('PAYMENT_SERVICE_TIMEOUT', '5000'));
  }

  async getById(paymentId: string): Promise<PaymentDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/payments/${paymentId}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as PaymentDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Payment fetch failed (${paymentId}): ${msg.slice(0, 100)}`);
      return null;
    }
  }

  async getByOrder(orderId: string): Promise<readonly PaymentDTO[]> {
    try {
      const res = await fetch(`${this.baseUrl}/payments?orderId=${orderId}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly PaymentDTO[];
    } catch {
      return [];
    }
  }

  async isHealthy(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { signal: AbortSignal.timeout(2000) });
      return res.ok;
    } catch {
      return false;
    }
  }
}
