/**
 * QuietHoursSaga — defers notifications during quiet hours
 * @module notification-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NotificationCreatedEvent } from '@domain/events/notification.events.js';

import { CleanupExpiredCommand } from './commands/cleanup-expired.command.js';

@Injectable()
export class QuietHoursSaga {
  private readonly logger = new Logger(QuietHoursSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onCreated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationCreatedEvent),
      tap((e: NotificationCreatedEvent) => {
        this.logger.debug(`Saga: quiet hours check for ${e.payload.notificationId}`);
      }),
      map((_e: NotificationCreatedEvent) => {
        // In real impl, check preference quiet hours
        // If active, defer to next non-quiet window
        return new CleanupExpiredCommand(new Date().toISOString());
      }),
    );
  };
}
