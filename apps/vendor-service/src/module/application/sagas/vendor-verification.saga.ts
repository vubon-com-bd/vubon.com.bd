/**
 * VendorVerificationSaga — orchestrates verification side effects
 * @module vendor-service/application/sagas
 *
 * Reacts to:
 *  - VendorVerificationSubmittedEvent  → analytics
 *  - VendorVerificationApprovedEvent   → analytics + index
 *  - VendorVerificationRejectedEvent   → analytics + notify
 *  - VendorVerificationExpiredEvent    → analytics
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  VendorVerificationSubmittedEvent,
  VendorVerificationApprovedEvent,
  VendorVerificationRejectedEvent,
  VendorVerificationExpiredEvent,
} from '../../domain/events/vendor-verification.events.js';

import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class VendorVerificationSaga {
  private readonly logger = new Logger(VendorVerificationSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onSubmitted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorVerificationSubmittedEvent),
      tap((e: VendorVerificationSubmittedEvent) => {
        this.logger.log(
          `Saga: verification submitted → vendor=${e.payload.vendorId} type=${e.payload.type}`,
        );
      }),
      map((e: VendorVerificationSubmittedEvent) =>
        new UpdateAnalyticsCommand(
          e.payload.vendorId,
          'verification.submitted',
          { verificationId: e.payload.verificationId, type: e.payload.type },
          e.payload.submittedAt,
        ),
      ),
    );
  };

  @Saga()
  onApproved = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorVerificationApprovedEvent),
      map(
        (e: VendorVerificationApprovedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'verification.approved',
            {
              verificationId: e.payload.verificationId,
              type: e.payload.type,
              approvedBy: e.payload.approvedBy,
            },
            e.payload.approvedAt,
          ),
      ),
    );
  };

  @Saga()
  onRejected = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorVerificationRejectedEvent),
      map(
        (e: VendorVerificationRejectedEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'verification.rejected',
            {
              verificationId: e.payload.verificationId,
              type: e.payload.type,
              reason: e.payload.reason,
            },
            e.payload.rejectedAt,
          ),
      ),
    );
  };

  @Saga()
  onExpired = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(VendorVerificationExpiredEvent),
      map(
        (e: VendorVerificationExpiredEvent) =>
          new UpdateAnalyticsCommand(
            e.payload.vendorId,
            'verification.expired',
            { verificationId: e.payload.verificationId, type: e.payload.type },
            e.payload.expiredAt,
          ),
      ),
    );
  };
}
