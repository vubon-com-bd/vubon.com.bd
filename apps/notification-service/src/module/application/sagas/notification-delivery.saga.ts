/**
 * NotificationDeliverySaga — orchestrates post-send side effects
 * @module notification-service/application/sagas
 *
 * Reacts to:
 *  - NotificationCreatedEvent → dispatch to provider
 *  - NotificationSentEvent → analytics, webhook
 *  - NotificationDeliveredEvent → analytics, read-status tracking
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  NotificationCreatedEvent,
  NotificationSentEvent,
  NotificationDeliveredEvent,
} from '@domain/events/notification.events.js';

import { SendEmailCommand } from '@application/commands/email/send-email.command.js';
import { SendSmsCommand } from '@application/commands/sms/send-sms.command.js';
import { SendPushCommand } from '@application/commands/push/send-push.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class NotificationDeliverySaga {
  private readonly logger = new Logger(NotificationDeliverySaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onCreated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationCreatedEvent),
      tap((e: NotificationCreatedEvent) => {
        this.logger.log(`Saga: notification created → ${e.payload.notificationId}`);
      }),
      map((e: NotificationCreatedEvent) => {
        // Fire-and-forget analytics
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.notificationId, 'notification.created', {
            type: e.payload.type,
            category: e.payload.category,
            channel: e.payload.channel,
          }),
        );

        // Route to channel-specific command (email by default)
        // In real impl, use ChannelSelectorService to decide
        return new SendEmailCommand(
          {
            to: [e.payload.userId],
            subject: 'Notification',
            text: 'Please check your notifications',
          },
          'system',
        );
      }),
    );
  };

  @Saga()
  onSent = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationSentEvent),
      tap((e: NotificationSentEvent) => {
        this.logger.log(`Saga: notification sent → ${e.payload.notificationId}`);
      }),
      map((e: NotificationSentEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.notificationId, 'notification.sent', {
            channel: e.payload.channel,
            providerName: e.payload.providerName,
          }),
        );
        // Trigger webhook if subscribed
        return new UpdateAnalyticsCommand(
          e.payload.notificationId,
          'notification.webhook_triggered',
          { channel: e.payload.channel },
        );
      }),
    );
  };

  @Saga()
  onDelivered = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationDeliveredEvent),
      map((e: NotificationDeliveredEvent) => {
        this.logger.log(`Saga: notification delivered → ${e.payload.notificationId}`);
        return new UpdateAnalyticsCommand(
          e.payload.notificationId,
          'notification.delivered',
          { deliveredAt: e.payload.deliveredAt },
        );
      }),
    );
  };
}
