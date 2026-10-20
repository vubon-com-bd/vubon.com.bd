/**
 * OrderCancelSaga — cancel → release inventory → refund
 * @module order-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderCancelledEvent } from '../../domain/events/order.events.js';
import { ProcessRefundCommand } from './commands/process-refund.command.js';
import { NotifyCustomerCommand } from './commands/notify-customer.command.js';

@Injectable()
export class OrderCancelSaga {
  private readonly logger = new Logger(OrderCancelSaga.name);

  @Saga()
  onCancelled = (events$: Observable<unknown>): Observable<unknown> => {
    return events$.pipe(
      ofType(OrderCancelledEvent),
      map((e: OrderCancelledEvent) => {
        this.logger.log(`Order ${e.payload.orderId} cancelled`);
        void new ProcessRefundCommand(
          e.payload.orderId,
          0,
          'BDT',
          e.payload.reason,
        );
        return new NotifyCustomerCommand(
          'system',
          e.payload.orderId,
          'order_cancelled',
          { reason: e.payload.reason },
        );
      }),
    );
  };
}
