/**
 * ZoneEventBridge — Zone aggregate event bridge
 */
import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { ZoneEntity } from '@domain/entities/zone.entity';

@Injectable()
export class ZoneEventBridge {
  private readonly logger = new Logger(ZoneEventBridge.name);
  constructor(private readonly eventBus: EventBusService) {}
  async publishFromEntity(entity: ZoneEntity): Promise<void> {
    for (const event of entity.pullDomainEvents()) {
      try {
        await this.eventBus.publish(event as unknown as DomainEvent);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(`Failed to publish ${event.type}: ${msg}`);
      }
    }
  }
}
