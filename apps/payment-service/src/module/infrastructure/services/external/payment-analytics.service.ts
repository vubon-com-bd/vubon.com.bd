/**
 * PaymentAnalyticsService — external adapter (event tracking)
 * @module payment-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';

export const PAYMENT_ANALYTICS_SERVICE = Symbol('PAYMENT_ANALYTICS_SERVICE');

export interface IPaymentAnalyticsService {
  track(
    eventName: string,
    properties?: Readonly<Record<string, unknown>>,
  ): Promise<void>;
  identify(
    userId: string,
    traits?: Readonly<Record<string, unknown>>,
  ): Promise<void>;
}

@Injectable()
export class PaymentAnalyticsService implements IPaymentAnalyticsService {
  private readonly logger = new Logger(PaymentAnalyticsService.name);

  async track(
    eventName: string,
    properties?: Readonly<Record<string, unknown>>,
  ): Promise<void> {
    this.logger.debug(`track ${eventName} ${JSON.stringify(properties ?? {})}`);
  }

  async identify(
    userId: string,
    traits?: Readonly<Record<string, unknown>>,
  ): Promise<void> {
    this.logger.debug(`identify ${userId} ${JSON.stringify(traits ?? {})}`);
  }
}
