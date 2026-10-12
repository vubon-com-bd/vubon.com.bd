/**
 * Auth Register Saga
 * @module identity-service/application/sagas
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { AuthCreatedEvent } from '../../domain/events/auth.events.js';
import { UserCreatedEvent } from '../../domain/events/user.events.js';
import { SendWelcomeEmailCommand } from './commands/send-welcome-email.command.js';
import { SendVerificationEmailCommand } from './commands/send-verification-email.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class AuthRegisterSaga extends BaseSaga {
  readonly name = 'AuthRegisterSaga';

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}

  @Saga()
  registerSaga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      filter((e): e is UserCreatedEvent => e instanceof UserCreatedEvent),
      mergeMap((event) => {
        const payload = event.payload as { userId: string; email: string };
        return [
          new SendWelcomeEmailCommand(payload.userId, payload.email),
          new SendVerificationEmailCommand(payload.userId, payload.email),
          new UpdateAnalyticsCommand('auth.register', payload.userId),
        ];
      }),
    );
  };

  @Saga()
  authCreatedSaga = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      filter((e): e is AuthCreatedEvent => e instanceof AuthCreatedEvent),
      mergeMap((event) => {
        const payload = event.payload as { authId: string; userId: string };
        return [new UpdateAnalyticsCommand('auth.auth_created', payload.userId)];
      }),
    );
  };
}
