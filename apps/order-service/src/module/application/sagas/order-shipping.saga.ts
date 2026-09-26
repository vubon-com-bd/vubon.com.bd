import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { OrderShippedEvent } from '../../domain/events/order.events';
import { CreateShipmentCommand } from './commands/create-shipment.command';
import { NotifyCustomerCommand } from './commands/notify-customer.command';

@Injectable()
export class OrderShippingSaga extends BaseSaga {
  readonly name = 'OrderShippingSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  createShipment = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderShippedEvent as never),
      map((event) => {
        const e = event as unknown as OrderShippedEvent;
        return new CreateShipmentCommand(e.payload.orderId, e.payload.orderId);
      }),
    );
  };

  @Saga()
  notifyCustomer = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderShippedEvent as never),
      map((event) => {
        const e = event as unknown as OrderShippedEvent;
        return new NotifyCustomerCommand(e.payload.orderId, '', 'order.shipped');
      }),
    );
  };
}
