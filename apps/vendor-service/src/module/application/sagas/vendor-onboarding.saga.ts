import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { VendorRegisteredEvent } from '../../domain/events/vendor.events';
import { NotifyVendorRegisteredCommand } from './commands/notify-vendor-registered.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';
import { UpdateSearchIndexCommand } from './commands/update-search-index.command';

@Injectable()
export class VendorOnboardingSaga {
  @Saga()
  onboarding = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorRegisteredEvent),
      mergeMap((event: VendorRegisteredEvent) => [
        new NotifyVendorRegisteredCommand(event.payload.vendorId),
        new UpdateAnalyticsCommand(event.payload.vendorId),
        new UpdateSearchIndexCommand(event.payload.vendorId),
      ]),
    );
  };
}
