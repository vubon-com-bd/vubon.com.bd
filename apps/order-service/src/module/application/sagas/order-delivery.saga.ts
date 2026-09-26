import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { OrderDeliveredEvent } from '../../domain/events/order.events';
import { NotifyCustomerCommand } from './commands/notify-customer.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class OrderDeliverySaga extends BaseSaga {
  readonly name = 'OrderDeliverySaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  notifyCustomer = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderDeliveredEvent as never),
      map((event) => {
        const e = event as unknown as OrderDeliveredEvent;
        return new NotifyCustomerCommand(e.payload.orderId, '', 'order.delivered');
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderDeliveredEvent as never),
      map(
        (event) =>
          new UpdateAnalyticsCommand(
            'order.delivered',
            (event as unknown as OrderDeliveredEvent).payload.orderId,
          ),
      ),
    );
  };
}
