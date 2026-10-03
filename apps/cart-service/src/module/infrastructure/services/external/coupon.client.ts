/**
 * CouponClient — HTTP client for marketing/coupon-service
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { APP_URL_CONFIG } from '@vubon/shared-config/common';

export interface CouponValidationResponse {
  readonly valid: boolean;
  readonly couponId?: string;
  readonly code: string;
  readonly discountType: string;
  readonly discountValue: number;
  readonly maxDiscountAmount?: number;
  readonly minOrderAmount?: number;
  readonly applicableTo?: readonly string[];
  readonly reason?: string;
}

export const COUPON_CLIENT = Symbol('COUPON_CLIENT');

@Injectable()
export class CouponClient {
  private readonly logger = new Logger(CouponClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs = 5_000;

  constructor() {
    this.baseUrl = `${APP_URL_CONFIG.api}/coupons`;
  }

  async validate(params: {
    code: string;
    userId?: string;
    subtotal: number;
    itemIds?: readonly string[];
  }): Promise<CouponValidationResponse | null> {
    return this.fetchJson<CouponValidationResponse>(`${this.baseUrl}/validate`, 'POST', params);
  }

  async redeem(code: string, userId: string, orderId: string): Promise<boolean> {
    const res = await this.fetchJson<{ success: boolean }>(`${this.baseUrl}/redeem`, 'POST', {
      code,
      userId,
      orderId,
    });
    return res?.success ?? false;
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
        this.logger.warn(`Coupon fetch failed ${res.status}`);
        return null;
      }
      return (await res.json()) as T;
    } catch (err) {
      this.logger.warn(`Coupon fetch error: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    } finally {
      clearTimeout(timer);
    }
  }
}
