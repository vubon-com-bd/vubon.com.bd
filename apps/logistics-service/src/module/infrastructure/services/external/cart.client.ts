/**
 * CartClient — HTTP client for cart-service
 * @module logistics-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface CartDTO {
  readonly id: string;
  readonly userId?: string;
  readonly itemCount?: number;
  readonly totalAmount?: number;
}

const SERVICE_URL_KEY = 'CART_SERVICE_URL';
const DEFAULT_URL = 'http://localhost:3004';
const DEFAULT_TIMEOUT_MS = 5000;

@Injectable()
export class CartClient {
  private readonly logger = new Logger(CartClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv(SERVICE_URL_KEY, DEFAULT_URL);
    this.timeoutMs = Number(getOptionalEnv('CART_SERVICE_TIMEOUT_MS', String(DEFAULT_TIMEOUT_MS)));
  }

  async getById(id: string): Promise<CartDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/carts/${id}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        this.logger.warn(`Cart fetch failed (${id}): HTTP ${res.status}`);
        return null;
      }
      const body = (await res.json()) as { data?: CartDTO } | CartDTO;
      return 'data' in body && body.data ? body.data : (body as CartDTO);
    } catch (err) {
      this.logger.warn(`Cart fetch error (${id}): ${this.errMsg(err)}`);
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
