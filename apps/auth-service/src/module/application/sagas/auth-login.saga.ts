/**
 * AuthLoginSaga — Reacts to successful login
 * @module auth-service/application/sagas
 *
 * Flow:
 *   UserLoggedInEvent → NotifyLoginCommand + UpdateAnalyticsCommand
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { UserLoggedInEvent } from '../../domain/events/user.events';
import { NotifyLoginCommand } from './commands/notify-login.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class AuthLoginSaga extends BaseSaga<void> {
  readonly name = 'AuthLoginSaga';

  @Saga()
  login = (events$: Observable<unknown>): Observable<ICommand> => {
    const notify$ = events$.pipe(
      ofType(UserLoggedInEvent),
      map(
        (event) =>
          new NotifyLoginCommand(
            event.aggregateId,
            (event.payload as { ipAddress?: string }).ipAddress ?? 'unknown',
            (event.payload as { userAgent?: string }).userAgent ?? 'unknown',
            event.occurredAt as unknown as string,
          ),
      ),
    );

    const analytics$ = events$.pipe(
      ofType(UserLoggedInEvent),
      map(
        (event) =>
          new UpdateAnalyticsCommand(
            'login',
            event.aggregateId,
          ),
      ),
    );

    return merge(notify$, analytics$);
  };

  async execute(_input: unknown): Promise<void> {
    // Reactive saga — no imperative step required.
  }

  async compensate(): Promise<void> {
    // No compensation — notifications are fire-and-forget.
  }
}
