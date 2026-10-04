/**
 * UserOnboardingSaga — orchestrates onboarding flow
 * @module user-service/application/sagas
 */
import { Injectable } from '@nestjs/common';
import { Saga, ICommand, IEvent, ofType } from '@nestjs/cqrs';
import { Observable, map, mergeMap } from 'rxjs';
import { UserCreatedEvent } from '@domain/events/user.events';
import { ProfileUpdatedEvent } from '@domain/events/user-profile.events';
import { SendWelcomeEmailCommand } from './commands/send-welcome-email.command.js';
import { SendProfileCompleteEmailCommand } from './commands/send-profile-complete-email.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class UserOnboardingSaga {
  @Saga()
  userCreated = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserCreatedEvent),
      map((event: UserCreatedEvent) => {
        return new SendWelcomeEmailCommand(
          event.payload.userId,
          event.payload.email,
          event.payload.name
        );
      })
    );
  };

  @Saga()
  profileCompleted = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProfileUpdatedEvent),
      mergeMap((event: ProfileUpdatedEvent) => {
        const commands: ICommand[] = [];

        commands.push(
          new UpdateAnalyticsCommand(event.payload.userId, 'profile.updated', {
            changedFields: [...event.payload.changedFields],
          })
        );

        if (event.payload.changedFields.length > 0) {
          commands.push(
            new SendProfileCompleteEmailCommand(
              event.payload.userId,
              'user@example.com',
              100
            )
          );
        }

        return commands;
      })
    );
  };
}
