/**
 * OrderClient — HTTP client for order-service (vendor order counts)
 * @module vendor-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface VendorOrderStatsDTO {
  readonly vendorId: string;
  readonly totalOrders: number;
  readonly totalSales: number;
  readonly averageOrderValue: number;
}

@Injectable()
export class OrderClient {
  private readonly logger = new Logger(OrderClient.name);
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor() {
    this.baseUrl = getOptionalEnv('ORDER_SERVICE_URL', 'http://localhost:3007');
    this.timeoutMs = Number(getOptionalEnv('ORDER_SERVICE_TIMEOUT', '5000'));
  }

  async getVendorStats(vendorId: string): Promise<VendorOrderStatsDTO | null> {
    try {
      const res = await fetch(`${this.baseUrl}/orders/stats/vendor/${vendorId}`, {
        signal: AbortSignal.timeout(this.timeoutMs),
      });
      if (!res.ok) return null;
      return (await res.json()) as VendorOrderStatsDTO;
    } catch {
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
}
