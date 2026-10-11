/**
 * NotificationDeliverySaga — orchestrates notification dispatch side effects
 * @module notification-service/application/sagas
 *
 * Flow:
 *   NotificationCreatedEvent   → DispatchNotification
 *   NotificationSentEvent      → (log + analytics)
 *   NotificationDeliveredEvent → (log + analytics)
 *   NotificationReadEvent      → (analytics)
 *   NotificationCancelledEvent → (analytics)
 *   NotificationExpiredEvent   → (analytics)
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  NotificationCreatedEvent,
  NotificationSentEvent,
  NotificationDeliveredEvent,
  NotificationReadEvent,
  NotificationCancelledEvent,
  NotificationExpiredEvent,
} from '../../domain/events/notification.events.js';

import { DispatchNotificationCommand } from './commands/dispatch-notification.command.js';

@Injectable()
export class NotificationDeliverySaga {
  private readonly logger = new Logger(NotificationDeliverySaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onNotificationCreated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationCreatedEvent),
      tap((e: NotificationCreatedEvent) => {
        this.logger.log(
          `Notification created: ${e.payload.notificationId} → channel=${e.payload.channel} user=${e.payload.userId}`,
        );
      }),
      map((e: NotificationCreatedEvent) => {
        return new DispatchNotificationCommand(
          e.payload.notificationId,
          e.payload.channel,
          e.payload.userId,
        );
      }),
    );
  };

  @Saga()
  onNotificationSent = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationSentEvent),
      tap((e: NotificationSentEvent) => {
        this.logger.debug(
          `Notification sent: ${e.payload.notificationId} via ${e.payload.provider}`,
        );
      }),
      // No downstream command yet — pure observability hook
      map(() => null as unknown as ICommand),
    );
  };

  @Saga()
  onNotificationDelivered = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationDeliveredEvent),
      tap((e: NotificationDeliveredEvent) => {
        this.logger.debug(
          `Notification delivered: ${e.payload.notificationId} at ${e.payload.deliveredAt}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };

  @Saga()
  onNotificationRead = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationReadEvent),
      tap((e: NotificationReadEvent) => {
        this.logger.debug(
          `Notification read: ${e.payload.notificationId} by user=${e.payload.userId}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };

  @Saga()
  onNotificationCancelled = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationCancelledEvent),
      tap((e: NotificationCancelledEvent) => {
        this.logger.warn(
          `Notification cancelled: ${e.payload.notificationId} reason=${e.payload.reason ?? 'none'}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };

  @Saga()
  onNotificationExpired = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationExpiredEvent),
      tap((e: NotificationExpiredEvent) => {
        this.logger.warn(`Notification expired: ${e.payload.notificationId}`);
      }),
      map(() => null as unknown as ICommand),
    );
  };
}
