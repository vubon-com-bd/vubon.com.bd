import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PayoutProcessedEvent } from '../../domain/events/vendor-payout.events';
import { NotifyPayoutProcessedCommand } from './commands/notify-payout-processed.command';

@Injectable()
export class VendorPayoutSaga {
  @Saga()
  payout = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(PayoutProcessedEvent),
      map((event: PayoutProcessedEvent) =>
        new NotifyPayoutProcessedCommand(event.payload.payoutId),
      ),
    );
  };
}
