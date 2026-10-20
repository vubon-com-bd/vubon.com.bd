/**
 * OrderReturnSaga
 * @module order-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderReturnRequestedEvent } from '../../domain/events/order-return.events.js';
import { NotifyCustomerCommand } from './commands/notify-customer.command.js';

@Injectable()
export class OrderReturnSaga {
  private readonly logger = new Logger(OrderReturnSaga.name);

  @Saga()
  onReturnRequested = (events$: Observable<unknown>): Observable<unknown> => {
    return events$.pipe(
      ofType(OrderReturnRequestedEvent),
      map((e: OrderReturnRequestedEvent) => {
        this.logger.log(`Return requested for order ${e.payload.orderId}`);
        return new NotifyCustomerCommand(
          e.payload.customerId,
          e.payload.orderId,
          'return_requested',
          { reason: e.payload.reason },
        );
      }),
    );
  };
}
