import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VerificationSubmittedEvent } from '../../domain/events/vendor-verification.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class VendorVerificationSaga {
  @Saga()
  verification = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VerificationSubmittedEvent),
      map((event: VerificationSubmittedEvent) =>
        new UpdateAnalyticsCommand(event.payload.vendorId),
      ),
    );
  };
}
