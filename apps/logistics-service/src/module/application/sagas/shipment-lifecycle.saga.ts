/**
 * ShipmentLifecycleSaga — event-bus driven saga (string-based)
 * @module logistics-service/application/sagas
 *
 * Steps:
 *  - shipment.created     → analytics
 *  - shipment.confirmed   → reserve inventory
 *  - shipment.delivered   → notify customer + update order + analytics
 *  - shipment.failed      → notify customer + analytics
 *  - shipment.cancelled   → release inventory + update order
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { NotifyCustomerCommand } from './commands/notify-customer.command.js';
import { ReserveInventoryCommand } from './commands/reserve-inventory.command.js';
import { ReleaseInventoryCommand } from './commands/release-inventory.command.js';
import { UpdateOrderStatusCommand } from './commands/update-order-status.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

interface DomainEventLike {
  readonly type: string;
  readonly payload?: {
    readonly shipmentId?: string;
    readonly orderId?: string;
    readonly userId?: string;
    readonly [key: string]: unknown;
  };
}

@Injectable()
export class ShipmentLifecycleSaga implements OnModuleInit {
  private readonly logger = new Logger(ShipmentLifecycleSaga.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler('logistics.shipment.created', async (evt) => {
      try { await this.onCreated(evt as DomainEventLike); }
      catch (err) { this.logError('shipment.created', err); }
    });
    this.eventBus.registerHandler('logistics.shipment.confirmed', async (evt) => {
      try { await this.onConfirmed(evt as DomainEventLike); }
      catch (err) { this.logError('shipment.confirmed', err); }
    });
    this.eventBus.registerHandler('logistics.shipment.delivered', async (evt) => {
      try { await this.onDelivered(evt as DomainEventLike); }
      catch (err) { this.logError('shipment.delivered', err); }
    });
    this.eventBus.registerHandler('logistics.shipment.failed', async (evt) => {
      try { await this.onFailed(evt as DomainEventLike); }
      catch (err) { this.logError('shipment.failed', err); }
    });
    this.eventBus.registerHandler('logistics.shipment.cancelled', async (evt) => {
      try { await this.onCancelled(evt as DomainEventLike); }
      catch (err) { this.logError('shipment.cancelled', err); }
    });
    this.logger.log('✅ ShipmentLifecycleSaga registered (5 events)');
  }

  private async onCreated(evt: DomainEventLike): Promise<void> {
    const id = evt.payload?.shipmentId;
    if (!id) return;
    this.logger.log(`[saga] created — shipmentId=${id}`);
    await this.commandBus.execute(
      new UpdateAnalyticsCommand({
        sagaId: id,
        metadata: { type: 'shipment.created', shipmentId: id },
      }),
    );
  }

  private async onConfirmed(evt: DomainEventLike): Promise<void> {
    const id = evt.payload?.shipmentId;
    if (!id) return;
    this.logger.log(`[saga] confirmed — shipmentId=${id}`);
    await this.commandBus.execute(
      new ReserveInventoryCommand({
        sagaId: id,
        metadata: { type: 'shipment.confirmed', shipmentId: id, orderId: evt.payload?.orderId },
      }),
    );
  }

  private async onDelivered(evt: DomainEventLike): Promise<void> {
    const id = evt.payload?.shipmentId;
    if (!id) return;
    this.logger.log(`[saga] delivered — shipmentId=${id}`);
    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'shipment.delivered', shipmentId: id, orderId: evt.payload?.orderId },
      }),
    );
    await this.commandBus.execute(
      new UpdateOrderStatusCommand({
        sagaId: id,
        metadata: { type: 'shipment.delivered', shipmentId: id, orderId: evt.payload?.orderId, status: 'delivered' },
      }),
    );
    await this.commandBus.execute(
      new UpdateAnalyticsCommand({
        sagaId: id,
        metadata: { type: 'shipment.delivered', shipmentId: id },
      }),
    );
  }

  private async onFailed(evt: DomainEventLike): Promise<void> {
    const id = evt.payload?.shipmentId;
    if (!id) return;
    this.logger.log(`[saga] failed — shipmentId=${id}`);
    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'shipment.failed', shipmentId: id, orderId: evt.payload?.orderId },
      }),
    );
    await this.commandBus.execute(
      new UpdateAnalyticsCommand({
        sagaId: id,
        metadata: { type: 'shipment.failed', shipmentId: id },
      }),
    );
  }

  private async onCancelled(evt: DomainEventLike): Promise<void> {
    const id = evt.payload?.shipmentId;
    if (!id) return;
    this.logger.log(`[saga] cancelled — shipmentId=${id}`);
    await this.commandBus.execute(
      new ReleaseInventoryCommand({
        sagaId: id,
        metadata: { type: 'shipment.cancelled', shipmentId: id, orderId: evt.payload?.orderId },
      }),
    );
    await this.commandBus.execute(
      new UpdateOrderStatusCommand({
        sagaId: id,
        metadata: { type: 'shipment.cancelled', shipmentId: id, orderId: evt.payload?.orderId, status: 'cancelled' },
      }),
    );
  }

  private logError(action: string, err: unknown): void {
    const msg = err instanceof Error ? err.message : 'unknown';
    this.logger.error(`[saga] ${action} failed: ${msg}`);
  }
}
