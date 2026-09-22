import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import {
  KycVerifiedEvent,
  KycRejectedEvent,
} from '../../domain/events/user-kyc.events';
import { NotifyKycStatusCommand } from './commands/notify-kyc-status.command';

@Injectable()
export class KycVerificationSaga extends BaseSaga {
  readonly name = 'KycVerificationSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  verified = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(KycVerifiedEvent),
      map(
        (event: KycVerifiedEvent) =>
          new NotifyKycStatusCommand(event.payload.userId, 'verified'),
      ),
    );
  };

  @Saga()
  rejected = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(KycRejectedEvent),
      map(
        (event: KycRejectedEvent) =>
          new NotifyKycStatusCommand(event.payload.userId, 'rejected'),
      ),
    );
  };
}
