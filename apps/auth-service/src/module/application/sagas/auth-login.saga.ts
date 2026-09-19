import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { SessionCreatedEvent } from '../../domain/events/auth-session.events';
import { NotifyLoginCommand } from './commands/notify-login.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class AuthLoginSaga extends BaseSaga {
  readonly name = 'AuthLoginSaga';

  async execute(_input: unknown): Promise<void> {
    // saga driven by event stream — no direct execute
  }

  async compensate(): Promise<void> {
    // no compensation needed for notification sagas
  }

  @Saga()
  login = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SessionCreatedEvent),
      map((event: SessionCreatedEvent) => {
        return new NotifyLoginCommand(event.payload.userId, event.payload.ip);
      }),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(SessionCreatedEvent),
      map((event: SessionCreatedEvent) => {
        return new UpdateAnalyticsCommand('auth.session.created', event.payload.userId);
      }),
    );
  };
}
