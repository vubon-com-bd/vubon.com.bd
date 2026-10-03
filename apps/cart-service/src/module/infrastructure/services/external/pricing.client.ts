/**
 * PricingClient — HTTP client for pricing-service
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { APP_URL_CONFIG } from '@vubon/shared-config/common';

export interface PriceSnapshot {
  readonly productId: string;
  readonly variantId?: string;
  readonly price: number;
  readonly compareAtPrice?: number;
  readonly currency: string;
}

export const PRICING_CLIENT = Symbol('PRICING_CLIENT');

@Injectable()
export class PricingClient {
  private readonly logger = new Logger(PricingClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs = 5_000;

  constructor() {
    this.baseUrl = `${APP_URL_CONFIG.api}/pricing`;
  }

  async getPrice(productId: string, variantId?: string): Promise<PriceSnapshot | null> {
    const url = variantId
      ? `${this.baseUrl}/${productId}/variants/${variantId}`
      : `${this.baseUrl}/${productId}`;
    return this.fetchJson<PriceSnapshot>(url);
  }

  async getPrices(
    items: readonly { productId: string; variantId?: string }[],
  ): Promise<readonly PriceSnapshot[]> {
    if (items.length === 0) return [];
    const res = await this.fetchJson<readonly PriceSnapshot[]>(
      `${this.baseUrl}/batch`,
      'POST',
      items,
    );
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
        this.logger.warn(`Pricing fetch failed ${res.status}: ${url}`);
        return null;
      }
      return (await res.json()) as T;
    } catch (err) {
      this.logger.warn(`Pricing fetch error: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
}
