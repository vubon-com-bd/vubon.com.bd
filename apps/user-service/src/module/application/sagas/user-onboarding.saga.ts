import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { UserCreatedEvent } from '../../domain/events/user.events';
import { SendWelcomeEmailCommand } from './commands/send-welcome-email.command';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class UserOnboardingSaga extends BaseSaga {
  readonly name = 'UserOnboardingSaga';

  async execute(_input: unknown): Promise<void> {
    // event-driven
  }

  async compensate(): Promise<void> {
    // no compensation
  }

  @Saga()
  welcome = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map((event: UserCreatedEvent) => new SendWelcomeEmailCommand(event.payload.userId)),
    );
  };

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map(
        (event: UserCreatedEvent) =>
          new UpdateAnalyticsCommand('user.created', event.payload.userId),
      ),
    );
  };
}
