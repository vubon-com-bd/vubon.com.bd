import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { CheckoutCompletedEvent } from '../../domain/events/checkout.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class OrderCheckoutSaga extends BaseSaga {
  readonly name = 'OrderCheckoutSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  analytics = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(CheckoutCompletedEvent as never),
      map(
        (event) =>
          new UpdateAnalyticsCommand(
            'checkout.completed',
            (event as unknown as CheckoutCompletedEvent).payload.orderId,
          ),
      ),
    );
  };
}
