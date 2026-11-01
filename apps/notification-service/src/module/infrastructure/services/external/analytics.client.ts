/**
 * Analytics Service Client — sends notification events to analytics
 * @module notification-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { getOptionalEnv } from '@vubon/shared-config/common';

export interface AnalyticsEventPayload {
  readonly name: string;
  readonly userId?: string;
  readonly entityId: string;
  readonly properties?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}

@Injectable()
export class AnalyticsClient {
  private readonly logger = new Logger(AnalyticsClient.name);
  private readonly baseUrl: string;
  private readonly enabled: boolean;

  constructor() {
    this.baseUrl = getOptionalEnv('ANALYTICS_SERVICE_URL', 'http://localhost:3006');
    this.enabled = getOptionalEnv('ANALYTICS_EVENTS_ENABLED', 'true') === 'true';
  }

  async track(event: AnalyticsEventPayload): Promise<void> {
    if (!this.enabled) return;
    try {
      await fetch(`${this.baseUrl}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
        signal: AbortSignal.timeout(2000),
      });
    } catch (err) {
      // Fire-and-forget — never throw
      this.logger.debug(`Analytics track failed: ${String(err).slice(0, 100)}`);
    }
  }

  async trackBatch(events: readonly AnalyticsEventPayload[]): Promise<void> {
    if (!this.enabled || events.length === 0) return;
    try {
      await fetch(`${this.baseUrl}/events/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events }),
        signal: AbortSignal.timeout(3000),
      });
    } catch (err) {
      this.logger.debug(`Analytics batch track failed: ${String(err).slice(0, 100)}`);
    }
  }
}
