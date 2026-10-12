/**
 * Traffic Domain Events
 * @module analytics-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base';
import type { Timestamp } from '@vubon/shared-types/common';

export class TrafficSourceIdentifiedEvent extends BaseDomainEvent<'analytics.traffic.source_identified', {
  readonly source: string;
  readonly medium?: string;
  readonly campaign?: string;
}> {
  constructor(
    source: string,
    medium: string | undefined,
    campaign: string | undefined,
    occurredAt: string
  ) {
    super({
      id: `traffic-source-${Date.now()}`,
      type: 'analytics.traffic.source_identified',
      aggregateId: source,
      aggregateType: 'TrafficSource',
      payload: { source, medium, campaign },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 1,
    });
  }
}
