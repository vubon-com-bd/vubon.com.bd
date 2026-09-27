/**
 * KycVerificationSaga — reacts to KYC state changes
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable, mergeMap } from 'rxjs';
import {
  KycSubmittedEvent,
  KycVerifiedEvent,
  KycRejectedEvent,
} from '@domain/events/user-kyc.events';
import { NotifyKycStatusCommand } from './commands/notify-kyc-status.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class KycVerificationSaga {
  @Saga()
  kycSubmitted = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(KycSubmittedEvent),
      mergeMap((event: KycSubmittedEvent) => [
        new NotifyKycStatusCommand(
          event.payload.userId,
          event.payload.kycId,
          'pending'
        ),
        new UpdateAnalyticsCommand(event.payload.userId, 'kyc.submitted', {
          kycId: event.payload.kycId,
          document: event.payload.document,
        }),
      ])
    );
  };

  @Saga()
  kycVerified = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(KycVerifiedEvent),
      mergeMap((event: KycVerifiedEvent) => [
        new NotifyKycStatusCommand(
          event.payload.userId,
          event.payload.kycId,
          'approved'
        ),
        new UpdateAnalyticsCommand(event.payload.userId, 'kyc.verified', {
          kycId: event.payload.kycId,
          verifiedAt: event.payload.verifiedAt,
        }),
      ])
    );
  };

  @Saga()
  kycRejected = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(KycRejectedEvent),
      mergeMap((event: KycRejectedEvent) => [
        new NotifyKycStatusCommand(
          event.payload.userId,
          event.payload.kycId,
          'rejected',
          event.payload.reason
        ),
        new UpdateAnalyticsCommand(event.payload.userId, 'kyc.rejected', {
          kycId: event.payload.kycId,
          reason: event.payload.reason,
        }),
      ])
    );
  };
}
