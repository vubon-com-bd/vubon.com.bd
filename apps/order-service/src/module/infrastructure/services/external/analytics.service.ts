/**
 * AnalyticsService — external adapter (event tracking)
 * @module order-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';

export const ANALYTICS_SERVICE = Symbol('ANALYTICS_SERVICE');

export interface IAnalyticsService {
  track(eventName: string, properties?: Readonly<Record<string, unknown>>): Promise<void>;
  identify(userId: string, traits?: Readonly<Record<string, unknown>>): Promise<void>;
}

@Injectable()
export class AnalyticsService implements IAnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  async track(eventName: string, properties?: Readonly<Record<string, unknown>>): Promise<void> {
    this.logger.debug?.(`track ${eventName} ${JSON.stringify(properties ?? {})}`);
  }

  async identify(userId: string, traits?: Readonly<Record<string, unknown>>): Promise<void> {
    this.logger.debug?.(`identify ${userId} ${JSON.stringify(traits ?? {})}`);
  }
}
