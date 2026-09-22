import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { OrderCancelledEvent } from '../../domain/events/order.events';
import { ReleaseInventoryCommand } from './commands/release-inventory.command';
import { NotifyCustomerCommand } from './commands/notify-customer.command';

@Injectable()
export class OrderCancelSaga extends BaseSaga {
  readonly name = 'OrderCancelSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  releaseInventory = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCancelledEvent as never),
      map(
        (event) =>
          new ReleaseInventoryCommand(
            (event as unknown as OrderCancelledEvent).payload.orderId,
          ),
      ),
    );
  };

  @Saga()
  notifyCustomer = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCancelledEvent as never),
      map((event) => {
        const e = event as unknown as OrderCancelledEvent;
        return new NotifyCustomerCommand(e.payload.orderId, '', 'order.cancelled');
      }),
    );
  };
}
