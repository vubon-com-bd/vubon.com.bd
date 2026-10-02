/**
 * ShippingClient — HTTP client for logistics-service
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { APP_URL_CONFIG } from '@vubon/shared-config/common';

export interface ShippingQuote {
  readonly method: string;
  readonly cost: number;
  readonly currency: string;
  readonly estimatedDaysMin: number;
  readonly estimatedDaysMax: number;
}

export const SHIPPING_CLIENT = Symbol('SHIPPING_CLIENT');

@Injectable()
export class ShippingClient {
  private readonly logger = new Logger(ShippingClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs = 5_000;

  constructor() {
    this.baseUrl = `${APP_URL_CONFIG.api}/shipping`;
  }

  async quote(params: {
    method: string;
    subtotal: number;
    addressId?: string;
    weightKg?: number;
  }): Promise<ShippingQuote | null> {
    return this.fetchJson<ShippingQuote>(`${this.baseUrl}/quote`, 'POST', params);
  }

  async listMethods(): Promise<readonly ShippingQuote[]> {
    const res = await this.fetchJson<readonly ShippingQuote[]>(`${this.baseUrl}/methods`);
    return res ?? [];
  }

  private async fetchJson<T>(
    url: string,
    method = 'GET',
    body?: unknown,
  ): Promise<T | null> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      if (!res.ok) {
        this.logger.warn(`Shipping fetch failed ${res.status}`);
        return null;
      }
      return (await res.json()) as T;
    } catch (err) {
      this.logger.warn(`Shipping fetch error: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
}
