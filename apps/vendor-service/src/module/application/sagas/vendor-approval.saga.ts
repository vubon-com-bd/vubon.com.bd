/**
 * VendorApprovalSaga — orchestrates approval workflow side effects
 * @module vendor-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  VendorApprovalRequestedEvent,
  VendorApprovalInfoRequestedEvent,
  VendorApprovalResubmittedEvent,
  VendorApprovalAppealResolvedEvent,
} from '../../domain/events/vendor-approval.events.js';

import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class VendorApprovalSaga {
  private readonly logger = new Logger(VendorApprovalSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onRequested = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorApprovalRequestedEvent),
      tap((e: VendorApprovalRequestedEvent) => {
        this.logger.log(`Saga: approval requested → vendor=${e.payload.vendorId}`);
      }),
      map(
        (e: VendorApprovalRequestedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'approval.requested',
            { approvalId: e.payload.approvalId },
            e.payload.requestedAt,
          ),
      ),
    );
  };

  @Saga()
  onInfoRequested = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorApprovalInfoRequestedEvent),
      map(
        (e: VendorApprovalInfoRequestedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'approval.info_requested',
            { approvalId: e.payload.approvalId, infoNeeded: e.payload.infoNeeded },
            e.payload.requestedAt,
          ),
      ),
    );
  };

  @Saga()
  onResubmitted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorApprovalResubmittedEvent),
      map(
        (e: VendorApprovalResubmittedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'approval.resubmitted',
            { approvalId: e.payload.approvalId, attempt: e.payload.attempt },
            e.payload.resubmittedAt,
          ),
      ),
    );
  };

  @Saga()
  onAppealResolved = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorApprovalAppealResolvedEvent),
      map(
        (e: VendorApprovalAppealResolvedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'approval.appeal_resolved',
            {
              approvalId: e.payload.approvalId,
              outcome: e.payload.outcome,
              resolvedBy: e.payload.resolvedBy,
            },
            e.payload.resolvedAt,
          ),
      ),
    );
  };
}
