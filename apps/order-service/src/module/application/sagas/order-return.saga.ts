/**
 * OrderReturnSaga — react to return lifecycle
 * @module order-service/application/sagas
 *
 * Flow:
 *   OrderReturnRequestedEvent → NotifyVendor
 *                             → UpdateAnalytics
 *   OrderReturnCompletedEvent → ProcessRefund
 *                             → SendOrderEmail (returned)
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  OrderReturnRequestedEvent,
  OrderReturnCompletedEvent,
} from '../../domain/events/order-return.events.js';
import { NotifyVendorCommand } from './commands/notify-vendor.command.js';
import { ProcessRefundCommand } from './commands/process-refund.command.js';
import { SendOrderEmailCommand } from './commands/send-order-email.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class OrderReturnSaga {
  private readonly logger = new Logger(OrderReturnSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onReturnRequested = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderReturnRequestedEvent),
      tap((e: OrderReturnRequestedEvent) => {
        this.logger.log(
          `Return requested: ${e.payload.returnId} for order ${e.payload.orderId}`,
        );
      }),
      map((e: OrderReturnRequestedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.orderId, 'order.return_requested'),
        );
        return new NotifyVendorCommand(
          'vendor',
          e.payload.orderId,
          `return_requested: ${e.payload.reason}`,
        );
      }),
    );
  };

  @Saga()
  onReturnCompleted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderReturnCompletedEvent),
      tap((e: OrderReturnCompletedEvent) => {
        this.logger.log(
          `Return completed: ${e.payload.returnId}, refund=${e.payload.refundAmount}`,
        );
      }),
      map((e: OrderReturnCompletedEvent) => {
        void this.commandBus.execute(
          new ProcessRefundCommand(
            e.payload.orderId,
            e.payload.refundAmount,
            e.payload.currency,
            'return_completed',
          ),
        );
        return new SendOrderEmailCommand(
          e.payload.orderId,
          'customer@example.com',
          'returned',
        );
      }),
    );
  };
}
