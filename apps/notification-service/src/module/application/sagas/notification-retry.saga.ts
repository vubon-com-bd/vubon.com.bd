/**
 * NotificationRetrySaga — retry failed deliveries with backoff
 * @module notification-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NotificationDeliveryFailedEvent } from '@domain/events/notification-failed.events.js';
import { RetryPolicyService } from '@domain/services/retry-policy.service.js';

import { RetryDeliveryCommand } from './commands/retry-delivery.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class NotificationRetrySaga {
  private readonly logger = new Logger(NotificationRetrySaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onDeliveryFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationDeliveryFailedEvent),
      tap((e: NotificationDeliveryFailedEvent) => {
        this.logger.warn(
          `Saga: delivery failed → ${e.payload.notificationId} (attempt ${e.payload.attemptNumber})`,
        );
      }),
      map((e: NotificationDeliveryFailedEvent) => {
        const decision = RetryPolicyService.decide({
          attemptNumber: e.payload.attemptNumber,
          errorCode: e.payload.reason,
        });

        if (decision.shouldRetry) {
          this.logger.log(
            `Saga: scheduling retry in ${decision.nextDelayMs}ms for ${e.payload.notificationId}`,
          );
          return new RetryDeliveryCommand(
            e.payload.notificationId,
            e.payload.attemptNumber + 1,
            decision.nextDelayMs,
          );
        }

        this.logger.error(
          `Saga: retry exhausted for ${e.payload.notificationId} — ${decision.reason}`,
        );
        return new UpdateAnalyticsCommand(
          e.payload.notificationId,
          'notification.retry_exhausted',
          { reason: decision.reason, attempts: e.payload.attemptNumber },
        );
      }),
    );
  };
}
