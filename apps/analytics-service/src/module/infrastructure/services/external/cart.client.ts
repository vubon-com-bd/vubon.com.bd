/**
 * Cart Service Client
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface CartDTO {
  readonly id: string;
  readonly userId: string;
  readonly itemCount: number;
  readonly total: number;
  readonly updatedAt: string;
}

@Injectable()
export class CartClient {
  private readonly logger = new Logger(CartClient.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv('CART_SERVICE_URL', 'http://localhost:3004');
    this.timeout = Number(getOptionalEnv('CART_SERVICE_TIMEOUT', '3000'));
  }

  async getByUser(userId: string): Promise<CartDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/carts?userId=${userId}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return (await res.json()) as CartDTO;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Cart fetch failed (${userId}): ${msg.slice(0, 100)}`);
      return null;
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
