/**
 * BroadcastProcessingSaga — orchestrates broadcast lifecycle
 * @module notification-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  BroadcastStartedEvent,
  BroadcastCompletedEvent,
} from '@domain/events/broadcast.events.js';

import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';
import { SendNotificationCommand } from '@application/commands/notification/send-notification.command.js';

@Injectable()
export class BroadcastProcessingSaga {
  private readonly logger = new Logger(BroadcastProcessingSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onStarted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(BroadcastStartedEvent),
      tap((e: BroadcastStartedEvent) => {
        this.logger.log(
          `Saga: broadcast started → ${e.payload.broadcastId} (${e.payload.recipientCount} recipients)`,
        );
      }),
      map((e: BroadcastStartedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.broadcastId, 'broadcast.started', {
            recipientCount: e.payload.recipientCount,
          }),
        );
        return new SendNotificationCommand(
          {
            userId: 'system',
            type: 'promotional',
            category: 'marketing',
            channels: ['email'],
            subject: 'Broadcast',
            body: 'Broadcast message',
          },
          'system',
          'system',
        );
      }),
    );
  };

  @Saga()
  onCompleted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(BroadcastCompletedEvent),
      map((e: BroadcastCompletedEvent) => {
        this.logger.log(
          `Saga: broadcast completed → ${e.payload.broadcastId} sent=${e.payload.sentCount} failed=${e.payload.failedCount}`,
        );
        return new UpdateAnalyticsCommand(e.payload.broadcastId, 'broadcast.completed', {
          sentCount: e.payload.sentCount,
          failedCount: e.payload.failedCount,
        });
      }),
    );
  };
}
