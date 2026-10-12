/**
 * DomainEventBridgeService — cross-service event bridge
 * @module shared-kernel/infrastructure/messaging/event-bridge
 *
 * Two channels:
 *   1. In-process (CQRS EventBus) — optional, for local sagas
 *   2. Cross-service (Kernel EventBusService → BullMQ) — always available
 *
 * The CQRS EventBus is injected optionally because EventBridgeModule is
 * @Global and importing CqrsModule (regular) inside a @Global module
 * breaks CommandBus's CQRS_MODULE_OPTIONS resolution. When absent,
 * publishInProcess() is a no-op — cross-service publish still works.
 */
import { Injectable, Logger, Optional } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventBusService } from '../event-bus/event-bus.service.js';
import type { DomainEvent } from '../../../domain/base/base.event.js';

interface HasDomainEvents {
  readonly id: string;
  pullDomainEvents(): readonly DomainEvent[];
}

@Injectable()
export class DomainEventBridgeService {
  private readonly logger = new Logger(DomainEventBridgeService.name);

  constructor(
    @Optional() private readonly cqrsEventBus: EventBus | undefined,
    private readonly persistentBus: EventBusService,
  ) {}

  /** In-process — sagas and local handlers. No-op if CQRS EventBus is unavailable. */
  publishInProcess(event: DomainEvent): void {
    if (!this.cqrsEventBus) {
      this.logger.debug(`publishInProcess skipped (no CQRS EventBus): ${event.type}`);
      return;
    }
    this.cqrsEventBus.publish(event);
  }

  /** Cross-service — goes through BullMQ (domain-events queue). */
  async publish(event: DomainEvent): Promise<void> {
    await this.persistentBus.publish(event);
  }

  async publishBatch(events: readonly DomainEvent[]): Promise<void> {
    await this.persistentBus.publishBatch(events);
  }

  /**
   * Publish all domain events pulled from an aggregate.
   * Called by application services after `repo.save(entity)`.
   */
  async publishFromEntity(entity: HasDomainEvents): Promise<void> {
    const events = entity.pullDomainEvents();
    if (events.length === 0) return;
    this.logger.debug(
      `publishFromEntity → ${entity.id} → ${events.length} event(s): ${events.map((e) => e.type).join(', ')}`,
    );
    // In-process first (fast, local sagas), then cross-service (persisted)
    for (const event of events) this.publishInProcess(event);
    await this.persistentBus.publishBatch(events);
  }
}
