/**
 * DeliveryAttemptSaga
 * Events: logistics.delivery.failed, logistics.delivery.delivered, logistics.delivery.rescheduled
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { NotifyCustomerCommand } from './commands/notify-customer.command.js';
import { UpdateOrderStatusCommand } from './commands/update-order-status.command.js';
import { SendTrackingUpdateCommand } from './commands/send-tracking-update.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

interface EvtLike {
  readonly type: string;
  readonly payload?: {
    readonly deliveryId?: string;
    readonly shipmentId?: string;
    readonly orderId?: string;
    readonly reason?: string;
    readonly attemptCount?: number;
    readonly [k: string]: unknown;
  };
}

@Injectable()
export class DeliveryAttemptSaga implements OnModuleInit {
  private readonly logger = new Logger(DeliveryAttemptSaga.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler('logistics.delivery.failed', async (e) => {
      try { await this.onFailed(e as EvtLike); }
      catch (err) { this.logError('delivery.failed', err); }
    });
    this.eventBus.registerHandler('logistics.delivery.delivered', async (e) => {
      try { await this.onDelivered(e as EvtLike); }
      catch (err) { this.logError('delivery.delivered', err); }
    });
    this.eventBus.registerHandler('logistics.delivery.rescheduled', async (e) => {
      try { await this.onRescheduled(e as EvtLike); }
      catch (err) { this.logError('delivery.rescheduled', err); }
    });
    this.logger.log('✅ DeliveryAttemptSaga registered (3 events)');
  }

  private async onFailed(evt: EvtLike): Promise<void> {
    const id = evt.payload?.deliveryId;
    if (!id) return;
    const attempts = evt.payload?.attemptCount ?? 1;
    this.logger.log(`[saga] delivery.failed — deliveryId=${id}, attempts=${attempts}`);

    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'delivery.failed', deliveryId: id, reason: evt.payload?.reason, attempts },
      }),
    );
    await this.commandBus.execute(
      new SendTrackingUpdateCommand({
        sagaId: id,
        metadata: { type: 'delivery.failed', deliveryId: id, attemptCount: attempts },
      }),
    );
    await this.commandBus.execute(
      new UpdateAnalyticsCommand({
        sagaId: id,
        metadata: { type: 'delivery.failed', deliveryId: id, attemptCount: attempts },
      }),
    );
  }

  private async onDelivered(evt: EvtLike): Promise<void> {
    const id = evt.payload?.deliveryId;
    if (!id) return;
    this.logger.log(`[saga] delivery.delivered — deliveryId=${id}`);
    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'delivery.delivered', deliveryId: id, orderId: evt.payload?.orderId },
      }),
    );
    await this.commandBus.execute(
      new UpdateOrderStatusCommand({
        sagaId: id,
        metadata: { type: 'delivery.delivered', deliveryId: id, orderId: evt.payload?.orderId, status: 'delivered' },
      }),
    );
    await this.commandBus.execute(
      new UpdateAnalyticsCommand({
        sagaId: id,
        metadata: { type: 'delivery.delivered', deliveryId: id },
      }),
    );
  }

  private async onRescheduled(evt: EvtLike): Promise<void> {
    const id = evt.payload?.deliveryId;
    if (!id) return;
    this.logger.log(`[saga] delivery.rescheduled — deliveryId=${id}`);
    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'delivery.rescheduled', deliveryId: id },
      }),
    );
  }

  private logError(action: string, err: unknown): void {
    const msg = err instanceof Error ? err.message : 'unknown';
    this.logger.error(`[saga] ${action} failed: ${msg}`);
  }
}
