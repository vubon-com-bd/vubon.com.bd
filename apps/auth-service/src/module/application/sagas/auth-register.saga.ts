/**
 * AuthRegisterSaga — Reacts to new user creation
 * @module auth-service/application/sagas
 *
 * Flow:
 *   UserCreatedEvent → SendWelcomeEmailCommand + SendVerificationEmailCommand
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { UserCreatedEvent } from '../../domain/events/user.events';
import { SendWelcomeEmailCommand } from './commands/send-welcome-email.command';
import { SendVerificationEmailCommand } from './commands/send-verification-email.command';

@Injectable()
export class AuthRegisterSaga extends BaseSaga<void> {
  readonly name = 'AuthRegisterSaga';

  @Saga()
  register = (events$: Observable<unknown>): Observable<ICommand> => {
    const welcome$ = events$.pipe(
      ofType(UserCreatedEvent),
      map((event) => {
        const payload = event.payload as { userId: string; email: string };
        return new SendWelcomeEmailCommand(
          payload.userId,
          payload.email,
          'User',
        );
      }),
    );

    const verify$ = events$.pipe(
      ofType(UserCreatedEvent),
      map((event) => {
        const payload = event.payload as { userId: string; email: string };
        const code = String(Math.floor(100000 + Math.random() * 900000));
        return new SendVerificationEmailCommand(
          payload.userId,
          payload.email,
          code,
          new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        );
      }),
    );

    return merge(welcome$, verify$);
  };

  async execute(_input: unknown): Promise<void> {}
  async compensate(): Promise<void> {}
}
