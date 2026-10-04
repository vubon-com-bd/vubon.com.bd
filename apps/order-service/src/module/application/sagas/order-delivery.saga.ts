/**
 * OrderDeliverySaga — react to delivery completion
 * @module order-service/application/sagas
 *
 * Flow:
 *   OrderDeliveredEvent → SendOrderEmail (delivered)
 *                       → NotifyCustomer
 *                       → UpdateAnalytics
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrderDeliveredEvent } from '../../domain/events/order.events.js';
import { SendOrderEmailCommand } from './commands/send-order-email.command.js';
import { NotifyCustomerCommand } from './commands/notify-customer.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class OrderDeliverySaga {
  private readonly logger = new Logger(OrderDeliverySaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onOrderDelivered = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderDeliveredEvent),
      tap((e: OrderDeliveredEvent) => {
        this.logger.log(
          `Order delivered: ${e.payload.orderId} at ${e.payload.deliveredAt}`,
        );
      }),
      map((e: OrderDeliveredEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.orderId, 'order.delivered'),
        );
        void this.commandBus.execute(
          new SendOrderEmailCommand(
            e.payload.orderId,
            'customer@example.com',
            'delivered',
          ),
        );
        return new NotifyCustomerCommand('customer', e.payload.orderId, 'order_delivered');
      }),
    );
  };
}
