/**
 * NotificationRetrySaga — retry orchestration with backoff
 * @module notification-service/application/sagas
 *
 * Flow:
 *   NotificationFailedEvent → compute backoff → RetryNotificationSagaCommand
 *   DeliveryRetryScheduledEvent → (log)
 *   DeliveryRetryExhaustedEvent → (log)
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

import { NOTIFICATION_LIMIT } from '@vubon/shared-constants/platform/notification';

import { NotificationFailedEvent } from '../../domain/events/notification.events.js';
import {
  DeliveryRetryScheduledEvent,
  DeliveryRetryExhaustedEvent,
} from '../../domain/events/delivery.events.js';

import { RetryNotificationSagaCommand } from './commands/retry-notification-saga.command.js';

@Injectable()
export class NotificationRetrySaga {
  private readonly logger = new Logger(NotificationRetrySaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onNotificationFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationFailedEvent),
      filter((e: NotificationFailedEvent) => {
        // Only retry if under limit
        return e.payload.attempt < NOTIFICATION_LIMIT.RETRY_ATTEMPTS;
      }),
      map((e: NotificationFailedEvent) => {
        const delayMs = Math.min(60_000 * Math.pow(2, e.payload.attempt - 1), 3_600_000);
        this.logger.warn(
          `Retry scheduled for ${e.payload.notificationId} (attempt ${e.payload.attempt + 1}, delay ${delayMs}ms)`,
        );
        return new RetryNotificationSagaCommand(
          e.payload.notificationId,
          e.payload.attempt + 1,
          delayMs,
        );
      }),
    );
  };

  @Saga()
  onRetryScheduled = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DeliveryRetryScheduledEvent),
      tap((e: DeliveryRetryScheduledEvent) => {
        this.logger.debug(
          `Retry scheduled: ${e.payload.notificationId} → next at ${e.payload.nextAttemptAt}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };

  @Saga()
  onRetryExhausted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DeliveryRetryExhaustedEvent),
      tap((e: DeliveryRetryExhaustedEvent) => {
        this.logger.error(
          `Retry exhausted for ${e.payload.notificationId} after ${e.payload.attempts} attempt(s)`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };
}
