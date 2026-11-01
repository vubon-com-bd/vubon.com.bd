/**
 * ScheduleTriggerSaga — executes schedules when due
 * @module notification-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType, CommandBus, ICommand } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ScheduleExecutedEvent } from '@domain/events/schedule.events.js';

import { SendNotificationCommand } from '@application/commands/notification/send-notification.command.js';
import { UpdateAnalyticsCommand } from './commands/update-analytics.command.js';

@Injectable()
export class ScheduleTriggerSaga {
  private readonly logger = new Logger(ScheduleTriggerSaga.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Saga()
  onScheduleExecuted = (events$: Observable<unknown>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ScheduleExecutedEvent),
      tap((e: ScheduleExecutedEvent) => {
        this.logger.log(
          `Saga: schedule executed → ${e.payload.scheduleId} (run #${e.payload.runCount})`,
        );
      }),
      map((e: ScheduleExecutedEvent) => {
        void this.commandBus.execute(
          new UpdateAnalyticsCommand(e.payload.scheduleId, 'schedule.executed', {
            runCount: e.payload.runCount,
            recipientsProcessed: e.payload.recipientsProcessed,
          }),
        );

        return new SendNotificationCommand(
          {
            userId: 'system',
            type: 'transactional',
            category: 'system',
            channels: ['email'],
            subject: 'Scheduled notification',
            body: `Schedule ${e.payload.scheduleId} executed`,
          },
          'system',
          'system',
        );
      }),
    );
  };
}
