/**
 * User Verification Saga
 * @module identity-service/application/sagas
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import {
  UserEmailVerifiedEvent,
  UserPhoneVerifiedEvent,
} from '../../domain/events/user.events.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class UserVerificationSaga extends BaseSaga {
  readonly name = 'UserVerificationSaga';
  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  emailVerifiedSaga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      filter((e): e is UserEmailVerifiedEvent => e instanceof UserEmailVerifiedEvent),
      mergeMap((event) => {
        const payload = event.payload as { userId: string };
        return [new UpdateAnalyticsCommand('user.email_verified', payload.userId)];
      }),
    );
  };

  @Saga()
  phoneVerifiedSaga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      filter((e): e is UserPhoneVerifiedEvent => e instanceof UserPhoneVerifiedEvent),
      mergeMap((event) => {
        const payload = event.payload as { userId: string };
        return [new UpdateAnalyticsCommand('user.phone_verified', payload.userId)];
      }),
    );
  };
}
