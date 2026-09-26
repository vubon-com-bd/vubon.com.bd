import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SubscriptionCreatedEvent } from '../../domain/events/vendor-subscription.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class VendorSubscriptionSaga {
  @Saga()
  subscription = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SubscriptionCreatedEvent),
      map((event: SubscriptionCreatedEvent) =>
        new UpdateAnalyticsCommand(event.payload.vendorId),
      ),
    );
  };
}
