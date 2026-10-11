/**
 * BounceHandlingSaga — react to hard bounces (email) and invalid push tokens
 * @module notification-service/application/sagas
 *
 * Flow:
 *   DeliveryAttemptFailedEvent (permanent) → MarkBounce
 *   DeviceInvalidatedEvent                 → (log)
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

import { DeliveryAttemptFailedEvent } from '../../domain/events/delivery.events.js';
import { DeviceInvalidatedEvent } from '../../domain/events/device.events.js';

import { MarkBounceCommand } from './commands/mark-bounce.command.js';

@Injectable()
export class BounceHandlingSaga {
  private readonly logger = new Logger(BounceHandlingSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onDeliveryAttemptFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DeliveryAttemptFailedEvent),
      // Only react to permanent failures
      filter((e: DeliveryAttemptFailedEvent) => !e.payload.retryable),
      map((e: DeliveryAttemptFailedEvent) => {
        this.logger.warn(
          `Permanent delivery failure: ${e.payload.notificationId} on ${e.payload.channel} — ${e.payload.reason}`,
        );
        return new MarkBounceCommand(
          e.payload.notificationId,
          e.payload.reason,
          e.payload.attempt,
        );
      }),
    );
  };

  @Saga()
  onDeviceInvalidated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(DeviceInvalidatedEvent),
      tap((e: DeviceInvalidatedEvent) => {
        this.logger.warn(
          `Device invalidated: ${e.payload.deviceId} — ${e.payload.reason}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };
}
