/**
 * ScheduleTriggerSaga — turn schedule triggers into notification sends
 * @module notification-service/application/sagas
 *
 * Flow:
 *   ScheduleTriggeredEvent → SendScheduledNotification
 *   ScheduleCompletedEvent → (log)
 *   ScheduleFailedEvent    → (log)
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  ScheduleTriggeredEvent,
  ScheduleCompletedEvent,
  ScheduleFailedEvent,
} from '../../domain/events/schedule.events.js';

import { SendScheduledNotificationCommand } from './commands/send-scheduled-notification.command.js';

@Injectable()
export class ScheduleTriggerSaga {
  private readonly logger = new Logger(ScheduleTriggerSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onScheduleTriggered = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ScheduleTriggeredEvent),
      tap((e: ScheduleTriggeredEvent) => {
        this.logger.log(
          `Schedule triggered: ${e.payload.scheduleId} occurrence #${e.payload.occurrence}`,
        );
      }),
      map((e: ScheduleTriggeredEvent) => {
        return new SendScheduledNotificationCommand(
          e.payload.scheduleId,
          undefined,
          undefined,
          e.payload.occurrence,
        );
      }),
    );
  };

  @Saga()
  onScheduleCompleted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ScheduleCompletedEvent),
      tap((e: ScheduleCompletedEvent) => {
        this.logger.log(
          `Schedule completed: ${e.payload.scheduleId} — ${e.payload.totalOccurrences} occurrences`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };

  @Saga()
  onScheduleFailed = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ScheduleFailedEvent),
      tap((e: ScheduleFailedEvent) => {
        this.logger.error(
          `Schedule failed: ${e.payload.scheduleId} — ${e.payload.reason}`,
        );
      }),
      map(() => null as unknown as ICommand),
    );
  };
}
