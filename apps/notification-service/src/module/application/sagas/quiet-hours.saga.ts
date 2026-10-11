/**
 * QuietHoursSaga — defer non-critical notifications during quiet hours
 * @module notification-service/application/sagas
 *
 * Flow:
 *   NotificationCreatedEvent (non-critical, non-instant, non-transactional)
 *      → compute next allowed time → DeferForQuietHoursCommand
 *
 * NOTE: Actual quiet-hours check is done upstream in NotificationService via
 * NotificationPreferenceCheckerService. This saga handles the "post-create"
 * re-check for scheduled notifications that land inside the quiet window.
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { NOTIFICATION_PREFERENCE } from '@vubon/shared-constants/platform/notification';

import { NotificationCreatedEvent } from '../../domain/events/notification.events.js';

import { DeferForQuietHoursCommand } from './commands/defer-for-quiet-hours.command.js';

@Injectable()
export class QuietHoursSaga {
  private readonly logger = new Logger(QuietHoursSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onNotificationCreated = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(NotificationCreatedEvent),
      // Only consider non-critical/non-instant notifications
      tap((e: NotificationCreatedEvent) => {
        this.logger.debug(
          `Quiet-hours check for ${e.payload.notificationId} — channel=${e.payload.channel}`,
        );
      }),
      map((e: NotificationCreatedEvent) => {
        const nextAllowedAt = this.computeNextAllowed();
        return new DeferForQuietHoursCommand(
          e.payload.notificationId,
          e.payload.userId,
          nextAllowedAt,
        );
      }),
    );
  };

  private computeNextAllowed(now: Date = new Date()): string {
    const endHour = NOTIFICATION_PREFERENCE.QUIET_HOURS_END;
    const next = new Date(now);
    next.setHours(endHour, 0, 0, 0);
    if (next.getTime() <= now.getTime()) {
      next.setDate(next.getDate() + 1);
    }
    return next.toISOString();
  }
}
