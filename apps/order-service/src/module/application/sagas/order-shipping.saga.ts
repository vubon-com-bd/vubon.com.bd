/**
 * OrderShippingSaga — react to shipping events
 * @module order-service/application/sagas
 *
 * Flow:
 *   OrderShippedEvent → CreateShipment
 *                     → SendOrderEmail (shipped)
 *                     → NotifyCustomer
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrderShippedEvent, OrderPackedEvent } from '../../domain/events/order.events.js';
import { CreateShipmentCommand } from './commands/create-shipment.command.js';
import { SendOrderEmailCommand } from './commands/send-order-email.command.js';
import { NotifyCustomerCommand } from './commands/notify-customer.command.js';

@Injectable()
export class OrderShippingSaga {
  private readonly logger = new Logger(OrderShippingSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onOrderPacked = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderPackedEvent),
      tap((e: OrderPackedEvent) => {
        this.logger.log(`Order packed: ${e.payload.orderId}`);
      }),
      map(
        (e: OrderPackedEvent) =>
          new NotifyCustomerCommand('customer', e.payload.orderId, 'order_packed'),
      ),
    );
  };

  @Saga()
  onOrderShipped = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderShippedEvent),
      tap((e: OrderShippedEvent) => {
        this.logger.log(
          `Order shipped: ${e.payload.orderId}, tracking=${e.payload.trackingNumber ?? 'N/A'}`,
        );
      }),
      map((e: OrderShippedEvent) => {
        void this.commandBus.execute(
          new CreateShipmentCommand(
            e.payload.orderId,
            e.payload.orderId,
            e.payload.courierId,
          ),
        );
        void this.commandBus.execute(
          new NotifyCustomerCommand('customer', e.payload.orderId, 'order_shipped', {
            trackingNumber: e.payload.trackingNumber,
          }),
        );
        return new SendOrderEmailCommand(
          e.payload.orderId,
          'customer@example.com',
          'shipped',
        );
      }),
    );
  };
}
