/**
 * OrderDeliverySaga
 * @module order-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderStatusChangedEvent } from '../../domain/events/order.events.js';
import { NotifyCustomerCommand } from './commands/notify-customer.command.js';

@Injectable()
export class OrderDeliverySaga {
  private readonly logger = new Logger(OrderDeliverySaga.name);

  @Saga()
  onDelivered = (events$: Observable<unknown>): Observable<unknown> => {
    return events$.pipe(
      ofType(OrderStatusChangedEvent),
      map((e: OrderStatusChangedEvent) => {
        if (e.payload.toStatus !== 'delivered') {
          return null;
        }
        this.logger.log(`Order ${e.payload.orderId} delivered`);
        return new NotifyCustomerCommand(
          'system',
          e.payload.orderId,
          'order_delivered',
          {},
        );
      }),
    );
  };
}
