/**
 * TaxClient — HTTP client for tax-service
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { APP_URL_CONFIG } from '@vubon/shared-config/common';

export interface TaxCalculation {
  readonly rate: number;
  readonly amount: number;
  readonly inclusive: boolean;
  readonly currency: string;
}

export const TAX_CLIENT = Symbol('TAX_CLIENT');

@Injectable()
export class TaxClient {
  private readonly logger = new Logger(TaxClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs = 5_000;

  constructor() {
    this.baseUrl = `${APP_URL_CONFIG.api}/tax`;
  }

  async calculate(subtotal: number, region?: string): Promise<TaxCalculation | null> {
    return this.fetchJson<TaxCalculation>(`${this.baseUrl}/calculate`, 'POST', { subtotal, region });
  }

  async getRate(region: string): Promise<number> {
    const res = await this.fetchJson<{ rate: number }>(`${this.baseUrl}/rate?region=${encodeURIComponent(region)}`);
    return res?.rate ?? 0;
  }

  private async fetchJson<T>(url: string, method = 'GET', body?: unknown): Promise<T | null> {
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
        this.logger.warn(`Tax fetch failed ${res.status}`);
        return null;
      }
      return (await res.json()) as T;
    } catch (err) {
      this.logger.warn(`Tax fetch error: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
}
