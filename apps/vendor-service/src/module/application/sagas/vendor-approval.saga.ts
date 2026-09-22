import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import {
  VendorApprovedEvent,
  VendorRejectedEvent,
} from '../../domain/events/vendor-approval.events';
import { NotifyVendorApprovedCommand } from './commands/notify-vendor-approved.command';
import { NotifyVendorRejectedCommand } from './commands/notify-vendor-rejected.command';
import { UpdateSearchIndexCommand } from './commands/update-search-index.command';

@Injectable()
export class VendorApprovalSaga {
  @Saga()
  approved = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorApprovedEvent),
      mergeMap((event: VendorApprovedEvent) => [
        new NotifyVendorApprovedCommand(event.payload.vendorId),
        new UpdateSearchIndexCommand(event.payload.vendorId),
      ]),
    );
  };

  @Saga()
  rejected = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorRejectedEvent),
      map((event: VendorRejectedEvent) =>
        new NotifyVendorRejectedCommand(event.payload.vendorId),
      ),
    );
  };
}
