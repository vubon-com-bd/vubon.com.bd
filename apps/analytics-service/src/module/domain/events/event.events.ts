/**
 * Event Domain Events
 * @module analytics-service/domain/events
 *
 * Event aggregate-এর domain events।
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base';
import type { Timestamp } from '@vubon/shared-types/common';

export class EventReceivedEvent extends BaseDomainEvent<'analytics.event.received', {
  readonly eventId: string;
  readonly eventName: string;
  readonly eventSource: string;
}> {
  constructor(
    eventId: string,
    eventName: string,
    eventSource: string,
    occurredAt: string
  ) {
    super({
      id: `evt-received-${eventId}-${Date.now()}`,
      type: 'analytics.event.received',
      aggregateId: eventId,
      aggregateType: 'Event',
      payload: { eventId, eventName, eventSource },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 1,
    });
  }
}

export class EventProcessedEvent extends BaseDomainEvent<'analytics.event.processed', {
  readonly eventId: string;
  readonly eventName: string;
}> {
  constructor(
    eventId: string,
    eventName: string,
    occurredAt: string
  ) {
    super({
      id: `evt-processed-${eventId}-${Date.now()}`,
      type: 'analytics.event.processed',
      aggregateId: eventId,
      aggregateType: 'Event',
      payload: { eventId, eventName },
      occurredAt: occurredAt as unknown as Timestamp,
      version: 2,
    });
  }
}
