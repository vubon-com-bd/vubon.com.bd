import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { OrderConfirmedEvent } from '../../domain/events/order.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class OrderPaymentSaga extends BaseSaga {
  readonly name = 'OrderPaymentSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  analytics = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderConfirmedEvent as never),
      map(
        (event) =>
          new UpdateAnalyticsCommand(
            'order.confirmed',
            (event as unknown as OrderConfirmedEvent).payload.orderId,
          ),
      ),
    );
  };
}
