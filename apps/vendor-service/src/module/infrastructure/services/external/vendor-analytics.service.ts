/**
 * VendorAnalyticsService — record business events for analytics
 * @module vendor-service/infrastructure/services/external
 *
 * In production: publishes to analytics pipeline (Kafka/Kinesis/HTTP).
 * Sandbox: logs events.
 */
import { Injectable, Logger } from '@nestjs/common';

export interface AnalyticsEvent {
  readonly name: string;
  readonly vendorId?: string;
  readonly userId?: string;
  readonly properties?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}

@Injectable()
export class VendorAnalyticsService {
  private readonly logger = new Logger(VendorAnalyticsService.name);

  private async track(event: Omit<AnalyticsEvent, 'occurredAt'>): Promise<void> {
    const full: AnalyticsEvent = {
      ...event,
      occurredAt: new Date().toISOString(),
    };
    this.logger.log(`[analytics] ${full.name} vendor=${full.vendorId ?? '-'}`);
    // Real: POST to analytics endpoint or publish to event bus
  }

  async trackRegistration(vendorId: string, userId: string, type: string): Promise<void> {
    await this.track({
      name: 'vendor.registered',
      vendorId,
      userId,
      properties: { type },
    });
  }

  async trackActivation(vendorId: string): Promise<void> {
    await this.track({ name: 'vendor.activated', vendorId });
  }

  async trackPayout(vendorId: string, amount: number, currency: string): Promise<void> {
    await this.track({
      name: 'vendor.payout.completed',
      vendorId,
      properties: { amount, currency },
    });
  }

  async trackSuspension(vendorId: string, reason: string, durationDays: number): Promise<void> {
    await this.track({
      name: 'vendor.suspended',
      vendorId,
      properties: { reason, durationDays },
    });
  }

  async trackSubscriptionChange(vendorId: string, fromPlan: string, toPlan: string): Promise<void> {
    await this.track({
      name: 'vendor.subscription.changed',
      vendorId,
      properties: { fromPlan, toPlan },
    });
  }

  async trackTierChange(vendorId: string, fromTier: string, toTier: string): Promise<void> {
    await this.track({
      name: 'vendor.tier.changed',
      vendorId,
      properties: { fromTier, toTier },
    });
  }

  async trackFunnelStep(step: string, vendorId?: string, userId?: string): Promise<void> {
    await this.track({
      name: `vendor.onboarding.${step}`,
      vendorId,
      userId,
    });
  }
}
