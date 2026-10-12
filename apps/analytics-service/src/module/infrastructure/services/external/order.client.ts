/**
 * Order Service Client
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface OrderDTO {
  readonly id: string;
  readonly userId: string;
  readonly status: string;
  readonly total: number;
  readonly currency: string;
  readonly itemCount: number;
  readonly createdAt: string;
}

@Injectable()
export class OrderClient {
  private readonly logger = new Logger(OrderClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('ORDER_SERVICE_URL', 'http://localhost:3006');
    this.timeout = Number(getOptionalEnv('ORDER_SERVICE_TIMEOUT', '5000'));
  }

  async getById(orderId: string): Promise<OrderDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/orders/${orderId}`, {
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as OrderDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Order fetch failed (${orderId}): ${msg.slice(0, 100)}`);
      return null;
    }
  }

  async getByUser(userId: string): Promise<readonly OrderDTO[]> {
    try {
      const res = await fetch(`${this.baseUrl}/orders?userId=${userId}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return [];
      return (await res.json()) as readonly OrderDTO[];
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
