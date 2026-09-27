/**
 * DomainEventBridgeService
 * @module shared-kernel/infrastructure/messaging/event-bridge
 *
 * Dual-publish domain events:
 *  1. In-process CQRS EventBus — for sagas & event handlers within the same process.
 *  2. Persistent EventBusService (BullMQ) — for cross-service consumers.
 */
import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import type { DomainEvent } from '../../../domain/base/base.event.js';
import { EventBusService } from '../event-bus/event-bus.service.js';

@Injectable()
export class DomainEventBridgeService {
  constructor(
    private readonly cqrsEventBus: EventBus,
    private readonly persistentBus: EventBusService
  ) {}

  /** In-process — sagas and local handlers */
  publishInProcess(event: DomainEvent): void {
    this.cqrsEventBus.publish(event);
  }

  /** Cross-service — goes through BullMQ */
  async publishPersistent(event: DomainEvent): Promise<void> {
    await this.persistentBus.publish(event);
  }

  /** Both channels */
  async publish(event: DomainEvent): Promise<void> {
    this.publishInProcess(event);
    await this.publishPersistent(event);
  }

  /** Batch publish */
  async publishAll(events: readonly DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }
}
