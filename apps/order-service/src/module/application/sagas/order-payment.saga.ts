/**
 * OrderPaymentSaga — react to order creation → payment flow
 * @module order-service/application/sagas
 *
 * Flow:
 *   OrderCreatedEvent → ReserveInventory
 *                     → NotifyCustomer (pending payment)
 *                     → UpdateAnalytics
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrderCreatedEvent } from '../../domain/events/order.events.js';
import { NotifyCustomerCommand } from './commands/notify-customer.command.js';
import { ReserveInventoryCommand } from './commands/reserve-inventory.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class OrderPaymentSaga {
  private readonly logger = new Logger(OrderPaymentSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onOrderCreated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreatedEvent),
      tap((e: OrderCreatedEvent) => {
        this.logger.log(
          `Order created: ${e.payload.orderId} (${e.payload.orderNumber}), total=${e.payload.total}`,
        );
      }),
      map((e: OrderCreatedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.orderId, 'order.created', {
            itemCount: e.payload.itemCount,
            total: e.payload.total,
            currency: e.payload.currency,
          }),
        );
        void this.commandBus.execute(
          new ReserveInventoryCommand(e.payload.orderId, []),
        );
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
