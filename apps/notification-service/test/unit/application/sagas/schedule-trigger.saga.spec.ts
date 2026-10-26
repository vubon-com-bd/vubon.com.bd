import { ScheduleTriggerSaga } from '@application/sagas/schedule-trigger.saga.js';
import { ScheduleExecutedEvent } from '@domain/events/schedule.events.js';
import { SendNotificationCommand } from '@application/commands/notification/send-notification.command.js';
import { UpdateAnalyticsCommand } from '@application/sagas/commands/update-analytics.command.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';
import { of, firstValueFrom } from 'rxjs';
import { jest } from '@jest/globals';

describe('ScheduleTriggerSaga', () => {
  it('emits SendNotificationCommand + fires analytics', async () => {
    const bus = { execute: jest.fn().mockResolvedValue(undefined) };
    const saga = new ScheduleTriggerSaga(bus as never);
    const ev = new ScheduleExecutedEvent({
      aggregateId: IDS.scheduleId,
      payload: { scheduleId: IDS.scheduleId, runCount: 1, executedAt: DATES.now, recipientsProcessed: 100 },
    });
    const cmd = await firstValueFrom(saga.onScheduleExecuted(of(ev)));
    expect(cmd).toBeInstanceOf(SendNotificationCommand);
    expect(bus.execute.mock.calls[0]![0]).toBeInstanceOf(UpdateAnalyticsCommand);
  });
});
