/**
 * OrderFulfillmentSaga — react to order confirmation → fulfillment
 * @module order-service/application/sagas
 *
 * Flow:
 *   OrderConfirmedEvent → NotifyCustomer
 *                       → UpdateAnalytics
 *   OrderCompletedEvent → NotifyCustomer
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  OrderConfirmedEvent,
  OrderCompletedEvent,
} from '../../domain/events/order.events.js';
import { NotifyCustomerCommand } from './commands/notify-customer.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class OrderFulfillmentSaga {
  private readonly logger = new Logger(OrderFulfillmentSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onOrderConfirmed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderConfirmedEvent),
      tap((e: OrderConfirmedEvent) => {
        this.logger.log(`Order confirmed: ${e.payload.orderId}`);
      }),
      map((e: OrderConfirmedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.orderId, 'order.confirmed'),
        );
        return new NotifyCustomerCommand(
          'customer',
          e.payload.orderId,
          'order_confirmed',
        );
      }),
    );
  };

  @Saga()
  onOrderCompleted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCompletedEvent),
      tap((e: OrderCompletedEvent) => {
        this.logger.log(`Order completed: ${e.payload.orderId}`);
      }),
      map(
        (e: OrderCompletedEvent) =>
          new UpdateAnalyticsCommand(e.payload.orderId, 'order.completed'),
      ),
    );
  };
}
