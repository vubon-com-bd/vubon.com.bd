/**
 * UserVerificationSaga — reacts to user status changes
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable, map } from 'rxjs';
import {
  UserActivatedEvent,
  UserSuspendedEvent,
} from '@domain/events/user.events';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class UserVerificationSaga {
  @Saga()
  userActivated = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserActivatedEvent),
      map(
        (event: UserActivatedEvent) =>
          new UpdateAnalyticsCommand(event.payload.userId, 'user.activated', {
            activatedAt: event.payload.activatedAt,
          })
      )
    );
  };

  @Saga()
  userSuspended = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserSuspendedEvent),
      map(
        (event: UserSuspendedEvent) =>
          new UpdateAnalyticsCommand(event.payload.userId, 'user.suspended', {
            reason: event.payload.reason,
          })
      )
    );
  };
}
