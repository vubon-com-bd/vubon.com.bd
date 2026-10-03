/**
 * EventPublisherService — publishes domain events to the event bus.
 * @module product-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';

export const EVENT_PUBLISHER_SERVICE = Symbol('EVENT_PUBLISHER_SERVICE');

@Injectable()
export class EventPublisherService {
  private readonly logger = new Logger(EventPublisherService.name);

  async publish(event: DomainEvent): Promise<void> {
    this.logger.debug(`Publishing event ${event.type} for ${event.aggregateId}`);
    // In real impl: publish to EventBus (Kafka / RabbitMQ / in-process)
  }

  async publishBatch(events: readonly DomainEvent[]): Promise<void> {
    for (const e of events) {
      await this.publish(e);
    }
  }
}
