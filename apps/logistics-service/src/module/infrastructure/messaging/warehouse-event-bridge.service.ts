/**
 * WarehouseEventBridge — Warehouse aggregate event bridge
 */
import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { WarehouseEntity } from '@domain/entities/warehouse.entity';

@Injectable()
export class WarehouseEventBridge {
  private readonly logger = new Logger(WarehouseEventBridge.name);
  constructor(private readonly eventBus: EventBusService) {}
  async publishFromEntity(entity: WarehouseEntity): Promise<void> {
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
