/**
 * LogisticsDomainEventBridge — Shipment aggregate event bridge
 */
import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { ShipmentEntity } from '@domain/entities/shipment.entity';

export interface IDomainEventBridge {
  publishFromEntity(entity: ShipmentEntity): Promise<void>;
}

@Injectable()
export class LogisticsDomainEventBridge implements IDomainEventBridge {
  private readonly logger = new Logger(LogisticsDomainEventBridge.name);
  constructor(private readonly eventBus: EventBusService) {}
  async publishFromEntity(entity: ShipmentEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    if (events.length === 0) return;
    for (const event of events) {
      try {
        await this.eventBus.publish(event as unknown as DomainEvent);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`Failed to publish ${event.type}: ${msg}`);
      }
    }
  }
}
