/**
 * KYC Verification Saga
 * @module identity-service/application/sagas
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import {
  KycSubmittedEvent,
  KycVerifiedEvent,
} from '../../domain/events/user-kyc.events.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class KycVerificationSaga extends BaseSaga {
  readonly name = 'KycVerificationSaga';
  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  kycSubmittedSaga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      filter((e): e is KycSubmittedEvent => e instanceof KycSubmittedEvent),
      mergeMap((event) => {
        const payload = event.payload as { userId: string };
        return [new UpdateAnalyticsCommand('kyc.submitted', payload.userId)];
      }),
    );
  };

  @Saga()
  kycVerifiedSaga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      filter((e): e is KycVerifiedEvent => e instanceof KycVerifiedEvent),
      mergeMap((event) => {
        const payload = event.payload as { userId: string };
        return [new UpdateAnalyticsCommand('kyc.verified', payload.userId)];
      }),
    );
  };
}
