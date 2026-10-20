/**
 * OrderAnalyticsService — sends events to analytics-service
 * @module order-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export const ORDER_ANALYTICS_SERVICE = Symbol('ORDER_ANALYTICS_SERVICE');

export interface OrderAnalyticsEvent {
  readonly orderId: string;
  readonly event: string;
  readonly data: Readonly<Record<string, unknown>>;
}

export interface IOrderAnalyticsService {
  track(event: OrderAnalyticsEvent): Promise<boolean>;
}

@Injectable()
export class OrderAnalyticsService implements IOrderAnalyticsService {
  private readonly logger = new Logger(OrderAnalyticsService.name);
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor() {
    this.baseUrl = getOptionalEnv(
      'ANALYTICS_SERVICE_URL',
      'http://localhost:3010',
    );
    this.timeout = Number(getOptionalEnv('ANALYTICS_SERVICE_TIMEOUT', '3000'));
  }

  async track(event: OrderAnalyticsEvent): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
        signal: AbortSignal.timeout(this.timeout),
      });
      return res.ok;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.warn(`Analytics track failed: ${msg.slice(0, 100)}`);
      return false;
    }
  }
}
