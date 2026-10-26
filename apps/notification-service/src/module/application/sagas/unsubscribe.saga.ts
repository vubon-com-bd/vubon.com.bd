/**
 * UnsubscribeSaga — handles unsubscribe events
 * @module notification-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NotificationUnsubscribedEvent } from '@domain/events/action.events.js';

import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class UnsubscribeSaga {
  private readonly logger = new Logger(UnsubscribeSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onUnsubscribed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationUnsubscribedEvent),
      tap((e: NotificationUnsubscribedEvent) => {
        this.logger.log(
          `Saga: user ${e.payload.userId} unsubscribed from ${e.payload.channel}/${e.payload.category}`,
        );
      }),
      map((e: NotificationUnsubscribedEvent) => {
        return new UpdateAnalyticsCommand(
          e.payload.notificationId,
          'notification.unsubscribed',
          {
            userId: e.payload.userId,
            channel: e.payload.channel,
            category: e.payload.category,
          },
        );
      }),
    );
  };
}
