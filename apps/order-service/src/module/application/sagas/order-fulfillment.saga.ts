import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { FulfillmentStartedEvent } from '../../domain/events/order-fulfillment.events';
import { NotifyVendorCommand } from './commands/notify-vendor.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class OrderFulfillmentSaga extends BaseSaga {
  readonly name = 'OrderFulfillmentSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  notifyVendor = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FulfillmentStartedEvent as never),
      map((event) => {
        const e = event as unknown as FulfillmentStartedEvent;
        return new NotifyVendorCommand(e.payload.orderId, e.payload.vendorId ?? '');
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(FulfillmentStartedEvent as never),
      map(
        (event) =>
          new UpdateAnalyticsCommand(
            'fulfillment.started',
            (event as unknown as FulfillmentStartedEvent).payload.orderId,
          ),
      ),
    );
  };
}
