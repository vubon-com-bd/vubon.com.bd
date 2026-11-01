/**
 * CouponClient — HTTP client for coupon-service
 * @module cart-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface CouponMetadataDTO {
  readonly id: string;
  readonly code: string;
  readonly discountType: 'percentage' | 'fixed';
  readonly discountValue: number;
  readonly maxDiscountAmount?: number;
  readonly minOrderAmount?: number;
  readonly expiresAt: string;
  readonly status: string;
}

export interface VoucherMetadataDTO {
  readonly id: string;
  readonly code: string;
  readonly remainingAmount: number;
  readonly currency: string;
  readonly expiresAt: string;
  readonly status: string;
}

@Injectable()
export class CouponClient {
  private readonly logger = new Logger(CouponClient.name);
  private readonly baseUrl = getOptionalEnv('COUPON_SERVICE_URL', 'http://localhost:3011');
  private readonly timeout = Number(getOptionalEnv('COUPON_TIMEOUT', '5000'));

  async getCouponByCode(code: string): Promise<CouponMetadataDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/coupons/by-code/${code}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return null;
      return (await res.json()) as CouponMetadataDTO;
    } catch {
      this.logger.warn(`Coupon ${code} fetch failed`);
      return null;
    }
  }

  async getVoucherByCode(code: string): Promise<VoucherMetadataDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/vouchers/by-code/${code}`, {
        signal: AbortSignal.timeout(this.timeout),
      });
      if (!res.ok) return null;
      return (await res.json()) as VoucherMetadataDTO;
    } catch {
      return null;
    }
  }
}
