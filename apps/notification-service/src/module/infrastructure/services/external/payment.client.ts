/**
 * Payment Service Client
 * @module notification-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface PaymentSummaryDTO {
  readonly id: string;
  readonly orderId: string;
  readonly userId: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: string;
}

@Injectable()
export class PaymentClient {
  private readonly logger = new Logger(PaymentClient.name);
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = getOptionalEnv('PAYMENT_SERVICE_URL', 'http://localhost:3005');
  }

  async getById(id: string): Promise<PaymentSummaryDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/payments/${id}`, {
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) return null;
      return (await res.json()) as PaymentSummaryDTO;
    } catch (err) {
      this.logger.warn(`Fetch payment ${id} failed: ${String(err).slice(0, 100)}`);
      return null;
    }
  }
}
