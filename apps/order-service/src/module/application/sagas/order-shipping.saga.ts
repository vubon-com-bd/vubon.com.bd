/**
 * OrderShippingSaga
 * @module order-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderStatusChangedEvent } from '../../domain/events/order.events.js';
import { NotifyCustomerCommand } from './commands/notify-customer.command.js';

@Injectable()
export class OrderShippingSaga {
  private readonly logger = new Logger(OrderShippingSaga.name);

  @Saga()
  onShipped = (events$: Observable<unknown>): Observable<unknown> => {
    return events$.pipe(
      ofType(OrderStatusChangedEvent),
      map((e: OrderStatusChangedEvent) => {
        if (e.payload.toStatus !== 'shipped') {
          return null;
        }
        this.logger.log(`Order ${e.payload.orderId} shipped`);
        return new NotifyCustomerCommand(
          'system',
          e.payload.orderId,
          'order_shipped',
          {},
        );
      }),
    );
  };
}
