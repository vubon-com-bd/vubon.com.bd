/**
 * Order Service Client
 * @module notification-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface OrderSummaryDTO {
  readonly id: string;
  readonly userId: string;
  readonly status: string;
  readonly total: number;
  readonly currency: string;
  readonly createdAt: string;
}

@Injectable()
export class OrderClient {
  private readonly logger = new Logger(OrderClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv('ORDER_SERVICE_URL', 'http://localhost:3002');
    this.timeoutMs = Number(getOptionalEnv('ORDER_SERVICE_TIMEOUT', '5000'));
  }

  async getById(id: string): Promise<OrderSummaryDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/orders/${id}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) return null;
      return (await res.json()) as OrderSummaryDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Fetch order ${id} failed: ${msg.slice(0, 100)}`);
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
}
