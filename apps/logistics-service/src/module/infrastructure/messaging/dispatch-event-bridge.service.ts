/**
 * DispatchEventBridge — Dispatch aggregate event bridge
 */
import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { DispatchEntity } from '@domain/entities/dispatch.entity';

@Injectable()
export class DispatchEventBridge {
  private readonly logger = new Logger(DispatchEventBridge.name);
  constructor(private readonly eventBus: EventBusService) {}
  async publishFromEntity(entity: DispatchEntity): Promise<void> {
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
