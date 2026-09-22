import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { OrderReturnCompletedEvent } from '../../domain/events/order-return.events';
import { ProcessRefundCommand } from './commands/process-refund.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class OrderReturnSaga extends BaseSaga {
  readonly name = 'OrderReturnSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  refund = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderReturnCompletedEvent as never),
      map(
        (event) =>
          new ProcessRefundCommand(
            (event as unknown as OrderReturnCompletedEvent).payload.orderId,
            '',
            0,
          ),
      ),
    );
  };

  @Saga()
  analytics = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderReturnCompletedEvent as never),
      map(
        (event) =>
          new UpdateAnalyticsCommand(
            'order.returned',
            (event as unknown as OrderReturnCompletedEvent).payload.orderId,
          ),
      ),
    );
  };
}
