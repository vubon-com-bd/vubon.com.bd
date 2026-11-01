/**
 * OrderCheckoutSaga — orchestrates checkout → order flow
 * @module order-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderCreatedEvent } from '../../domain/events/order.events.js';
import { NotifyCustomerCommand } from './commands/notify-customer.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class OrderCheckoutSaga {
  private readonly logger = new Logger(OrderCheckoutSaga.name);

  @Saga()
  onOrderCreated = (events$: Observable<unknown>): Observable<unknown> => {
    return events$.pipe(
      ofType(OrderCreatedEvent),
      map((e: OrderCreatedEvent) => {
        this.logger.log(`Order created: ${e.payload.orderId}`);
        void new UpdateAnalyticsCommand(e.payload.orderId, 'order.created', {
          totalAmount: e.payload.totalAmount,
        });
        return new NotifyCustomerCommand(
          e.payload.customerId,
          e.payload.orderId,
          'order_created',
          { orderNumber: e.payload.orderNumber },
        );
      }),
    );
  };
}
