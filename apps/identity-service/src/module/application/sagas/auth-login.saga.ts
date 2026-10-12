/**
 * Auth Login Saga
 * @module identity-service/application/sagas
 *
 * NOTE: Uses `filter()` with type predicate instead of `ofType()` for
 * cross-version @nestjs/cqrs compatibility. Behaves identically at runtime.
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { LoginAttemptSucceededEvent } from '../../domain/events/login-attempt.events.js';
import { NotifyLoginCommand } from './commands/notify-login.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class AuthLoginSaga extends BaseSaga {
  readonly name = 'AuthLoginSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  loginSaga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      filter((e): e is LoginAttemptSucceededEvent => e instanceof LoginAttemptSucceededEvent),
      mergeMap((event) => {
        const payload = event.payload as {
          userId: string;
          ipAddress?: string;
          userAgent?: string;
        };
        return [
          new NotifyLoginCommand(payload.userId, payload.ipAddress, payload.userAgent),
          new UpdateAnalyticsCommand('auth.login', payload.userId),
        ];
      }),
    );
  };
}
