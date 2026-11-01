/**
 * OrderPaymentSaga — reacts to payment events
 * @module order-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderStatusChangedEvent } from '../../domain/events/order.events.js';
import { NotifyCustomerCommand } from './commands/notify-customer.command.js';

@Injectable()
export class OrderPaymentSaga {
  private readonly logger = new Logger(OrderPaymentSaga.name);

  @Saga()
  onStatusChanged = (events$: Observable<unknown>): Observable<unknown> => {
    return events$.pipe(
      ofType(OrderStatusChangedEvent),
      map((e: OrderStatusChangedEvent) => {
        this.logger.log(
          `Order ${e.payload.orderId} → ${e.payload.toStatus}`,
        );
        return new NotifyCustomerCommand(
          'system',
          e.payload.orderId,
          'order_status_changed',
          { toStatus: e.payload.toStatus },
        );
      }),
    );
  };
}
