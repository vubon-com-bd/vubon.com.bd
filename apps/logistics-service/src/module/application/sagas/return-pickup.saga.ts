/**
 * ReturnPickupSaga
 * Events: logistics.return_shipment.approved, picked_up, received, completed
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { NotifyCustomerCommand } from './commands/notify-customer.command.js';
import { ProcessRefundCommand } from './commands/process-refund.command.js';
import { ReleaseInventoryCommand } from './commands/release-inventory.command.js';
import { UpdateOrderStatusCommand } from './commands/update-order-status.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

interface EvtLike {
  readonly type: string;
  readonly payload?: {
    readonly returnId?: string;
    readonly orderId?: string;
    readonly refundAmount?: number;
    readonly refundCurrency?: string;
    readonly [k: string]: unknown;
  };
}

@Injectable()
export class ReturnPickupSaga implements OnModuleInit {
  private readonly logger = new Logger(ReturnPickupSaga.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler('logistics.return_shipment.approved', async (e) => {
      try { await this.onApproved(e as EvtLike); }
      catch (err) { this.logError('return.approved', err); }
    });
    this.eventBus.registerHandler('logistics.return_shipment.completed', async (e) => {
      try { await this.onCompleted(e as EvtLike); }
      catch (err) { this.logError('return.completed', err); }
    });
    this.eventBus.registerHandler('logistics.return_shipment.cancelled', async (e) => {
      try { await this.onCancelled(e as EvtLike); }
      catch (err) { this.logError('return.cancelled', err); }
    });
    this.logger.log('✅ ReturnPickupSaga registered (3 events)');
  }

  private async onApproved(evt: EvtLike): Promise<void> {
    const id = evt.payload?.returnId;
    if (!id) return;
    this.logger.log(`[saga] return.approved — returnId=${id}`);
    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'return.approved', returnId: id, orderId: evt.payload?.orderId },
      }),
    );
  }

  private async onCompleted(evt: EvtLike): Promise<void> {
    const id = evt.payload?.returnId;
    if (!id) return;
    this.logger.log(`[saga] return.completed — returnId=${id}, refund=${evt.payload?.refundAmount}`);
    await this.commandBus.execute(
      new ReleaseInventoryCommand({
        sagaId: id,
        metadata: { type: 'return.completed', returnId: id, orderId: evt.payload?.orderId },
      }),
    );
    await this.commandBus.execute(
      new ProcessRefundCommand({
        sagaId: id,
        metadata: {
          type: 'return.completed',
          returnId: id,
          orderId: evt.payload?.orderId,
          refundAmount: evt.payload?.refundAmount,
          refundCurrency: evt.payload?.refundCurrency,
        },
      }),
    );
    await this.commandBus.execute(
      new UpdateOrderStatusCommand({
        sagaId: id,
        metadata: { type: 'return.completed', returnId: id, orderId: evt.payload?.orderId, status: 'returned' },
      }),
    );
    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'return.completed', returnId: id, orderId: evt.payload?.orderId },
      }),
    );
    await this.commandBus.execute(
      new UpdateAnalyticsCommand({
        sagaId: id,
        metadata: { type: 'return.completed', returnId: id },
      }),
    );
  }

  private async onCancelled(evt: EvtLike): Promise<void> {
    const id = evt.payload?.returnId;
    if (!id) return;
    this.logger.log(`[saga] return.cancelled — returnId=${id}`);
    await this.commandBus.execute(
      new NotifyCustomerCommand({
        sagaId: id,
        metadata: { type: 'return.cancelled', returnId: id },
      }),
    );
  }

  private logError(action: string, err: unknown): void {
    const msg = err instanceof Error ? err.message : 'unknown';
    this.logger.error(`[saga] ${action} failed: ${msg}`);
  }
}
