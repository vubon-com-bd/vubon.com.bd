import { Injectable, Logger } from '@nestjs/common';
import axios, { type AxiosInstance } from 'axios';

export interface CouponValidationResult {
  readonly valid: boolean;
  readonly code: string;
  readonly discountType: 'percentage' | 'fixed';
  readonly discount: number;
  readonly reason?: string;
}

@Injectable()
export class CouponClient {
  private readonly logger = new Logger(CouponClient.name);
  private readonly http: AxiosInstance;

  constructor() {
    const baseURL = process.env['MARKETING_SERVICE_URL'] ?? 'http://localhost:3006';
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async validate(input: {
    readonly code: string;
    readonly userId: string;
    readonly subtotal: number;
    readonly currency: string;
  }): Promise<CouponValidationResult | null> {
    try {
      const { data } = await this.http.post<CouponValidationResult>(
        '/api/v1/coupons/validate',
        input,
      );
      return data;
    } catch {
      this.logger.warn(`Coupon validation failed for ${input.code}`);
      return null;
    }
  }
}
