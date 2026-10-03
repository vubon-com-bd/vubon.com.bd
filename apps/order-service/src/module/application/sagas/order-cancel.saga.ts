/**
 * OrderCancelSaga — react to order cancellation
 * @module order-service/application/sagas
 *
 * Flow:
 *   OrderCancelledEvent → ReleaseInventory
 *                       → ProcessRefund (if paid)
 *                       → NotifyVendor
 *                       → SendOrderEmail (cancelled)
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { OrderCancelledEvent } from '../../domain/events/order.events.js';
import { ReleaseInventoryCommand } from './commands/release-inventory.command.js';
import { ProcessRefundCommand } from './commands/process-refund.command.js';
import { NotifyVendorCommand } from './commands/notify-vendor.command.js';
import { SendOrderEmailCommand } from './commands/send-order-email.command.js';

@Injectable()
export class OrderCancelSaga {
  private readonly logger = new Logger(OrderCancelSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onOrderCancelled = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCancelledEvent),
      tap((e: OrderCancelledEvent) => {
        this.logger.warn(
          `Order cancelled: ${e.payload.orderId}, reason=${e.payload.reason}`,
        );
      }),
      filter((e: OrderCancelledEvent) => !!e.payload.orderId),
      map((e: OrderCancelledEvent) => {
        void this.commandBus.execute(
          new ReleaseInventoryCommand(e.payload.orderId, e.payload.reason),
        );
        if (e.payload.refundAmount && e.payload.refundAmount > 0) {
          void this.commandBus.execute(
            new ProcessRefundCommand(
              e.payload.orderId,
              e.payload.refundAmount,
              e.payload.currency ?? 'BDT',
              e.payload.reason,
            ),
          );
        }
        void this.commandBus.execute(
          new NotifyVendorCommand('vendor', e.payload.orderId, 'order_cancelled'),
        );
        return new SendOrderEmailCommand(
          e.payload.orderId,
          'customer@example.com',
          'cancelled',
        );
      }),
    );
  };
}
