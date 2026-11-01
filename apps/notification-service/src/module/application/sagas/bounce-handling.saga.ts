/**
 * BounceHandlingSaga — processes bounces, updates suppression
 * @module notification-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NotificationDeliveryFailedEvent } from '@domain/events/notification-failed.events.js';
import { BounceHandlerService } from '@domain/services/bounce-handler.service.js';

import { MarkBouncedCommand } from './commands/mark-bounced.command.js';

@Injectable()
export class BounceHandlingSaga {
  private readonly logger = new Logger(BounceHandlingSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onDeliveryFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationDeliveryFailedEvent),
      tap((e: NotificationDeliveryFailedEvent) => {
        this.logger.debug(`Saga: bounce check for ${e.payload.notificationId}`);
      }),
      map((e: NotificationDeliveryFailedEvent) => {
        const classification = BounceHandlerService.classify({
          errorCode: e.payload.reason,
          reason: e.payload.reason,
          attemptNumber: e.payload.attemptNumber,
        });

        this.logger.log(
          `Saga: bounce classified as "${classification.type}" — action="${classification.action}"`,
        );

        return new MarkBouncedCommand(
          e.payload.notificationId,
          classification.type,
          classification.action,
          classification.reason,
        );
      }),
    );
  };
}
