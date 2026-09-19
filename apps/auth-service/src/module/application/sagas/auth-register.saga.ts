import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { UserCreatedEvent } from '../../domain/events/user.events';
import { SendWelcomeEmailCommand } from './commands/send-welcome-email.command';
import { SendVerificationEmailCommand } from './commands/send-verification-email.command';

@Injectable()
export class AuthRegisterSaga extends BaseSaga {
  readonly name = 'AuthRegisterSaga';

  async execute(_input: unknown): Promise<void> {
    // saga driven by event stream
  }

  async compensate(): Promise<void> {
    // no compensation needed
  }

  @Saga()
  welcome = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map((event: UserCreatedEvent) => {
        return new SendWelcomeEmailCommand(event.payload.userId);
      }),
    );
  };

  @Saga()
  verification = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map((event: UserCreatedEvent) => {
        return new SendVerificationEmailCommand(
          event.payload.userId,
          event.payload.email,
        );
      }),
    );
  };
}
