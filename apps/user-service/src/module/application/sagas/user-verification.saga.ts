import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas/base.saga';
import { UserActivatedEvent } from '../../domain/events/user.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command';

@Injectable()
export class UserVerificationSaga extends BaseSaga {
  readonly name = 'UserVerificationSaga';

  async execute(_input: unknown): Promise<void> {}

  async compensate(): Promise<void> {}

  @Saga()
  analytics = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserActivatedEvent),
      map(
        (event: UserActivatedEvent) =>
          new UpdateAnalyticsCommand('user.activated', event.payload.userId),
      ),
    );
  };
}
