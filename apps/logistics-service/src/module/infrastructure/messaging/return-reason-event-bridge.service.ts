/**
 * ReturnReasonEventBridge — ReturnReason aggregate event bridge
 */
import { Injectable, Logger } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { ReturnReasonEntity } from '@domain/entities/return-reason.entity';

@Injectable()
export class ReturnReasonEventBridge {
  private readonly logger = new Logger(ReturnReasonEventBridge.name);
  constructor(private readonly eventBus: EventBusService) {}
  async publishFromEntity(entity: ReturnReasonEntity): Promise<void> {
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
