/**
 * DomainEventBridgeService — cross-service event bridge
 * @module shared-kernel/infrastructure/messaging/event-bridge
 *
 * Two channels:
 *   1. In-process (CQRS EventBus) — for local sagas
 *   2. Cross-service (Kernel EventBusService → BullMQ) — always available
 *
 * Implementation note:
 *   EventBridgeModule is @Global and loads before CqrsModule.forRoot().
 *   To avoid breaking CQRS_MODULE_OPTIONS, we inject EventBus via
 *   ModuleRef (lazy) inside onModuleInit — this works regardless of load order.
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { EventBus } from '@nestjs/cqrs';
import { EventBusService } from '../event-bus/event-bus.service.js';
import type { DomainEvent } from '../../../domain/base/base.event.js';

interface HasDomainEvents {
  readonly id: string;
  pullDomainEvents(): readonly DomainEvent[];
}

@Injectable()
export class DomainEventBridgeService implements OnModuleInit {
  private readonly logger = new Logger(DomainEventBridgeService.name);
  private cqrsEventBus: EventBus | undefined;

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly persistentBus: EventBusService,
  ) {}

  /**
   * Resolve CQRS EventBus lazily after all modules are initialized.
   * This avoids the @Global + CqrsModule.forRoot() ordering problem.
   */
  onModuleInit(): void {
    try {
      this.cqrsEventBus = this.moduleRef.get<EventBus>(EventBus, {
        strict: false,
      });
      this.logger.log('✅ CQRS EventBus resolved — in-process sagas active');
    } catch {
      this.logger.warn(
        '⚠️  CQRS EventBus not available — in-process sagas will be skipped',
      );
      this.cqrsEventBus = undefined;
    }
  }

  /** In-process — sagas and local handlers. */
  publishInProcess(event: DomainEvent): void {
    if (!this.cqrsEventBus) {
      this.logger.debug(`publishInProcess skipped (no CQRS EventBus): ${event.type}`);
      return;
    }
    try {
      this.cqrsEventBus.publish(event);
      this.logger.debug(`publishInProcess → ${event.type}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.warn(`publishInProcess failed (${event.type}): ${msg}`);
    }
  }

  /** Cross-service — goes through BullMQ. */
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
    for (const event of events) this.publishInProcess(event);
    await this.persistentBus.publishBatch(events);
  }
}
