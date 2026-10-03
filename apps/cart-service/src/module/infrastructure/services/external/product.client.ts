/**
 * ProductClient — HTTP client for product-service
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { APP_URL_CONFIG } from '@vubon/shared-config/common';

export interface ProductSnapshot {
  readonly id: string;
  readonly sku: string;
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly stock: number;
  readonly available: boolean;
  readonly imageUrl?: string;
}

export interface VariantSnapshot {
  readonly id: string;
  readonly productId: string;
  readonly sku: string;
  readonly price: number;
  readonly stock: number;
  readonly available: boolean;
}

export const PRODUCT_CLIENT = Symbol('PRODUCT_CLIENT');

@Injectable()
export class ProductClient {
  private readonly logger = new Logger(ProductClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs = 10_000;

  constructor() {
    this.baseUrl = `${APP_URL_CONFIG.api}/products`;
  }

  async getProduct(productId: string): Promise<ProductSnapshot | null> {
    return this.fetchJson<ProductSnapshot>(`${this.baseUrl}/${productId}`);
  }

  async getProducts(ids: readonly string[]): Promise<readonly ProductSnapshot[]> {
    if (ids.length === 0) return [];
    const query = ids.map((id) => `ids=${encodeURIComponent(id)}`).join('&');
    const res = await this.fetchJson<readonly ProductSnapshot[]>(`${this.baseUrl}?${query}`);
    return res ?? [];
  }

  async getVariant(variantId: string): Promise<VariantSnapshot | null> {
    return this.fetchJson<VariantSnapshot>(`${this.baseUrl}/variants/${variantId}`);
  }

  async getStock(productId: string, variantId?: string): Promise<number> {
    const url = variantId
      ? `${this.baseUrl}/${productId}/variants/${variantId}/stock`
      : `${this.baseUrl}/${productId}/stock`;
    const res = await this.fetchJson<{ stock: number }>(url);
    return res?.stock ?? 0;
  }

  private async fetchJson<T>(url: string): Promise<T | null> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
      });
      if (!res.ok) {
        this.logger.warn(`Product fetch failed ${res.status}: ${url}`);
        return null;
      }
      return (await res.json()) as T;
    } catch (err) {
      this.logger.warn(`Product fetch error: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
}
